package fi.luke.bma.service;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.google.common.base.Joiner;

import fi.luke.bma.dao.ValidityDao;
import fi.luke.bma.model.AdministrativeAreaBiomassCalculationResult;
import fi.luke.bma.model.Attribute;
import fi.luke.bma.model.Data;
import fi.luke.bma.model.Grid.GridType;
import fi.luke.bma.model.GridCell;
import fi.luke.bma.model.SearchReport;
import fi.luke.bma.model.Validity;

@Transactional
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
        if (polygonAsWkt == null) {
            return 0;
        }
        Validity validity = validityDao.getLatest(attributeId);
        Long validityId = validity.getId();
        String sql = "SELECT COALESCE(sum(d.value),0) FROM biomass_data d, grid_cell c"
                + " WHERE d.cell_id = c.id AND c.grid_id = " + gridId
                + " AND d.validity_id = " + validityId
                + " AND d.attribute_id = " + attributeId
                + " AND st_contains(st_geomfromtext('" + polygonAsWkt + "', 3067), st_centroid(c.geometry))";

        Query query = entityManager.createNativeQuery(sql);
        return (double) query.getSingleResult();
    }

   
    public double getAreaOfPolygon(String polygonAsWkt) {
        String sql = "SELECT ST_AREA(the_geom) FROM (SELECT ST_GEOMFROMTEXT('" + polygonAsWkt
                + "', 3067)) AS foo(the_geom)";
        Query query = entityManager.createNativeQuery(sql);
        return (double) query.getSingleResult();
    }

    public Integer getNumberOfCentroids(long gridId, String polygonAsWkt) {
        String sql = "SELECT COUNT(c.id) FROM grid_cell c"
                + " WHERE c.grid_id = " + gridId
                + " AND st_contains(st_geomfromtext('" + polygonAsWkt + "', 3067), st_centroid(c.geometry))";
        Query query = entityManager.createNativeQuery(sql);
        return ((BigInteger) query.getSingleResult()).intValue();
    }
    
       
    /**
     * Return total biomasses for bounded areas (like: municipalities, drainage basin, etc) and 
     * attributes using the latest available data for each attribute.
     * ONLY municipality of manure data is calculated based on area without sea.
     */
    @SuppressWarnings("unchecked")
    public List<AdministrativeAreaBiomassCalculationResult> getTotalBiomassForBoundedArea(
    		Collection<Long> attributeIds, Collection<Long> boundedAreaIds, long gridId) {
    	if (attributeIds.isEmpty() || boundedAreaIds.isEmpty()) {
    		return Collections.emptyList();
    	}
    	
    	List<AdministrativeAreaBiomassCalculationResult> allResultList = new ArrayList<AdministrativeAreaBiomassCalculationResult>();
    	
    	if(gridId == GridType.MUNICIPALITY.getValue()){
    		List<Integer> gridIdForMunicipality = Arrays.asList(GridType.MUNICIPALITY.getValue(), GridType.MUNICIPALITY_WITHOUT_SEA_AREA.getValue());
    		String jpql =
    				" SELECT new " + AdministrativeAreaBiomassCalculationResult.class.getName() + "(a.id, c.cellId, d.value, a.displayOrder)"
    		    	+ " FROM " + Data.class.getName() + " d, " + GridCell.class.getName() + " c, " + Attribute.class.getName() + " a"
    		    	+ " WHERE d.cell.id = c.id AND d.attribute.id = a.id AND c.grid.id IN (" + Joiner.on(',').join(gridIdForMunicipality) + ")"
    		    	+ " AND d.validity.id = a.latestValidity.id "
    		    	+ " AND a.id IN (" + Joiner.on(',').join(attributeIds) + ")"
    		    	+ " AND c.cellId IN (" + Joiner.on(',').join(boundedAreaIds) + ") ORDER BY a.displayOrder ";
    		Query query2 = entityManager.createQuery(jpql, AdministrativeAreaBiomassCalculationResult.class);	
    		allResultList = query2.getResultList();
    	}else {
    		String jpql = "SELECT new " + AdministrativeAreaBiomassCalculationResult.class.getName() + "(a.id, c.cellId, d.value, a.displayOrder)"
        			+ " FROM " + Data.class.getName() + " d, " + GridCell.class.getName() + " c, " + Attribute.class.getName() + " a"
        			+ " WHERE d.cell.id = c.id AND d.attribute.id = a.id AND c.grid.id = " + gridId
        			+ " AND d.validity.id = a.latestValidity.id "
        			+ " AND a.id IN (" + Joiner.on(',').join(attributeIds) + ")"
        			+ " AND c.cellId IN (" + Joiner.on(',').join(boundedAreaIds) + ") ORDER BY a.displayOrder";
    		Query query = entityManager.createQuery(jpql, AdministrativeAreaBiomassCalculationResult.class);
    		allResultList = query.getResultList();
    	}
    	return allResultList;
    }
    
    public double getTotalSumOfBoundedArea(Collection<Long> boundedAreaIds, long gridId) {
        if (boundedAreaIds.isEmpty()) {
            return 0L;
        }
        String sql = "SELECT SUM(boundedArea.area) FROM"
                + " (SELECT ST_AREA(the_geom) AS area FROM"
                + " (SELECT ST_GEOMFROMTEXT(ST_ASTEXT(c.geometry), 3067)"
                + " FROM grid_cell c"
                + " WHERE c.grid_id = " + gridId
                + " AND c.cell_id IN (" + Joiner.on(',').join(boundedAreaIds) + "))"
                + " AS foo(the_geom))"
                + " AS boundedArea";
        
        Query query = entityManager.createNativeQuery(sql);
        return (double) query.getSingleResult();
    }
    
    @SuppressWarnings("unchecked")
    public List<Data> getBiomassDataForAttributesAndYears(List<Long> attributeIds, List<Integer> years) {
        String jpql =
                " SELECT new " + SearchReport.class.getName() + "(v.startDate, a.nameFI, d.value, c.geometry)"
                + " FROM " + Data.class.getName() + " d, " + GridCell.class.getName() + " c, "
                + Attribute.class.getName() + " a" + Validity.class.getName() + " v"
                + " WHERE d.cell.id = c.id AND d.attribute.id = a.id AND c.grid.id = 1"
                + " AND d.validity.id = a.latestValidity.id AND d.validity.id = v.id"
                + " AND a.id IN (" + Joiner.on(',').join(attributeIds) + ")"
                + " AND v.id IN (" + Joiner.on(',').join(years) + ")"
                + " ORDER BY a.category.id, a.displayOrder ";
        Query query = entityManager.createQuery(jpql, SearchReport.class);
        return query.getResultList();
    }
}
