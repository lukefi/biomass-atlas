package fi.luke.bma.service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import fi.luke.bma.dao.DataDao;
import fi.luke.bma.dao.ValidityDao;
import fi.luke.bma.model.Validity;

@Component
public class CalculationService {
	@PersistenceContext
	private EntityManager entityManager;
	
	@Autowired
	public DataDao dataDao;
	
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
}
