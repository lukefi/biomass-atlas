package fi.luke.bma.service;

import java.math.BigInteger;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.google.common.base.Joiner;
import com.vividsolutions.jts.geom.Geometry;

import fi.luke.bma.dao.ValidityDao;
import fi.luke.bma.model.AdministrativeAreaBiomassCalculationResult;
import fi.luke.bma.model.BiomassCalculationRequestModel.Point;
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

    public double getTotalBiomassForAttribute(long attributeId, long gridId, String polygonAsWkt) {
        Validity validity = validityDao.getLatest();
        Long validityId = validity.getId();
        String sql = "SELECT COALESCE(sum(d.value),0) FROM biomass_data d, grid_cell c"
                + " WHERE d.cell_id = c.id AND c.grid_id = " + gridId
                + " AND d.validity_id = " + validityId
                + " AND d.attribute_id = " + attributeId
                + " AND st_contains(st_geomfromtext('" + polygonAsWkt + "', 3067), st_centroid(c.geometry))";

        Query query = entityManager.createNativeQuery(sql);
        return (double) query.getSingleResult();
    }

    /**
     * Return total biomasses for municipalities and attributes using the latest available data for each attribute.
     * 
     * @param attributeIds
     * @param municipalityIds
     * @return
     */
    @SuppressWarnings("unchecked")
    public List<AdministrativeAreaBiomassCalculationResult> getTotalBiomassForMunicipalities(
            Collection<Long> attributeIds, Collection<Long> municipalityIds) {
        if (attributeIds.isEmpty() || municipalityIds.isEmpty()) {
            return Collections.emptyList();
        }
        Validity validity = validityDao.getLatest();
        String jpql = "SELECT new fi.luke.bma.model.AdministrativeAreaBiomassCalculationResult(d.attribute.id, c.cellId, d.value)"
                + " FROM Data d, GridCell c"
                + " WHERE d.cell.id = c.id AND c.grid.id = " + MunicipalityService.MUNICIPALITY_GRID
                + " AND d.validity.id = " + validity.getId()
                + " AND d.attribute.id IN (" + Joiner.on(',').join(attributeIds) + ")"
                + " AND c.cellId IN (" + Joiner.on(',').join(municipalityIds) + ")";

        Query query = entityManager.createQuery(jpql, AdministrativeAreaBiomassCalculationResult.class);
        return query. getResultList();
    }

    public double getAreaOfPolygon(String polygonAsWkt) {
        String sql = "SELECT ST_AREA(the_geom) FROM (SELECT ST_GEOMFROMTEXT('" + polygonAsWkt
                + "', 3067)) AS foo(the_geom)";
        Query query = entityManager.createNativeQuery(sql);
        return (double) query.getSingleResult();
    }

    public Integer getNumberOfCentroids(long gridId, String polygonAsWkt) {
        Long validityId = validityDao.getLatest().getId();
        String sql = "SELECT COUNT(DISTINCT c.id) FROM grid_cell c"
                + " LEFT OUTER JOIN biomass_data d ON c.id = d.cell_id"
                + " WHERE c.grid_id = " + gridId
                + " AND d.validity_id = " + validityId
                + " AND st_contains(st_geomfromtext('" + polygonAsWkt + "', 3067), st_centroid(c.geometry))";
        Query query = entityManager.createNativeQuery(sql);
        return ((BigInteger) query.getSingleResult()).intValue();
    }
    
    public String getGeometry(Point point, float radius) {
    	String sql = "SELECT ST_ASTEXT(the_geom) FROM (SELECT ST_Buffer(ST_MakePoint(" + point.getX() + "," + point.getY() + ", 3067)," + radius*1000 + ")) AS foo(the_geom)";
    	Query query = entityManager.createNativeQuery(sql);
        return (String) query.getSingleResult();
    }
}
