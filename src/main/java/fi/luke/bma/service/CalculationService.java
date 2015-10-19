package fi.luke.bma.service;

import java.math.BigInteger;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import fi.luke.bma.dao.ValidityDao;
import fi.luke.bma.model.Validity;

@Component
public class CalculationService {
	@PersistenceContext
	private EntityManager entityManager;
	
	@Autowired
	public ValidityDao validityDao;
	
	public void setEntityManager(EntityManager entityManager) {
		this.entityManager = entityManager;
	}

	public double getTotalBiomassForAttribute(long attributeId, long gridId, String polygonAsWkt){
		Validity validity = validityDao.getLatest();
		Long validityId = validity.getId();
		String sql =
                 "SELECT COALESCE(sum(d.value),0) FROM biomass_data d, grid_cell c" +
                 " WHERE d.cell_id = c.id AND c.grid_id = " + gridId +
                 " AND d.validity_id = " + validityId +
                 " AND d.attribute_id = " + attributeId +
                 " AND st_contains(st_geomfromtext('" + polygonAsWkt + "', 3067), st_centroid(c.geometry))";
		 
		 Query query = entityManager.createNativeQuery(sql);
		 return (double) query.getResultList().get(0);
	}
	
	public double getAreaOfPolygon(String polygonAsWkt){
		String sql = "SELECT ST_AREA(the_geom) FROM (SELECT ST_GEOMFROMTEXT('" + polygonAsWkt + "', 3067)) AS foo(the_geom)";
		Query query = entityManager.createNativeQuery(sql);
		return (double) query.getSingleResult();
	}
	
	public Integer getNumberOfCentroids(long gridId, String polygonAsWkt){
		Long validityId = validityDao.getLatest().getId();
		String sql = "SELECT COUNT(DISTINCT c.id) FROM grid_cell c" +
				 " LEFT OUTER JOIN biomass_data d ON c.id = d.cell_id" +
                 " WHERE c.grid_id = " + gridId +
                 " AND d.validity_id = " + validityId +
                 " AND st_contains(st_geomfromtext('" + polygonAsWkt + "', 3067), st_centroid(c.geometry))";
		Query query = entityManager.createNativeQuery(sql);
		return ((BigInteger)query.getSingleResult()).intValue();
	}
}
