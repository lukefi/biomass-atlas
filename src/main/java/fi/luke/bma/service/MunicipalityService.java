package fi.luke.bma.service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Component;

@Component
public class MunicipalityService {
	@PersistenceContext
	private EntityManager entityManager;
	
	public void setEntityManager(EntityManager entityManager) {
		this.entityManager = entityManager;
	}
	
	public String getGeometry(String pointAsWkt){
		String sql = "SELECT ST_ASGEOJSON(v.geometry) FROM view_municipality_borders v"
				+ " WHERE (SELECT ST_within(ST_GeomFromText('" + pointAsWkt + "', 3067), v.geometry))";
		Query query = entityManager.createNativeQuery(sql);
		return (String) query.getSingleResult();
	}
}
