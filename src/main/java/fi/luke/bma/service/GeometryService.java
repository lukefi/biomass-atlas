package fi.luke.bma.service;

import java.util.NoSuchElementException;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Service;

import fi.luke.bma.model.BiomassCalculationRequestModel.Point;

@Service
public class GeometryService {

    @PersistenceContext
    private EntityManager entityManager;
    
    public void setEntityManager(EntityManager entityManager) {
        this.entityManager = entityManager;
    }
    
    public String getCircle(Point point, float radius) {
        String sql = "SELECT ST_ASTEXT(the_geom) FROM (SELECT ST_Buffer(" + toPoint(point) + "," + radius*1000 + ")) AS foo(the_geom)";
        Query query = entityManager.createNativeQuery(sql);
        return (String) query.getSingleResult();
    }
    
    public String toPoint(Point point) {
        return "st_setsrid(st_point(" + point.getX() + "," + point.getY() + "), 3067)";
    }
    
    public int getNearestRoad(Point point) {
        int boxR = 500;
        while (boxR < 3000000) {
            String boundingBox = "st_setsrid(ST_GeomFromText('POLYGON(("
                    + (point.getX()-boxR) + " "
                    + (point.getY()-boxR) + ","
                    + (point.getX()-boxR) + " "
                    + (point.getY()+boxR) + ","
                    + (point.getX()+boxR) + " "
                    + (point.getY()+boxR) + ","
                    + (point.getX()+boxR) + " "
                    + (point.getY()-boxR) + ","
                    + (point.getX()-boxR) + " "
                    + (point.getY()-boxR) + "))'), 3067)";
            String sql = "SELECT ogc_fid FROM roadsegment r WHERE st_intersects(r.geometry, " + boundingBox + ")"
                    + " ORDER BY st_distance(r.geometry, " + toPoint(point) + ") ASC LIMIT 1";
            Query query = entityManager.createNativeQuery(sql);
            try {
                return (Integer) query.getSingleResult();
            }
            catch (NoResultException e) {
                boxR *= 2;
            }
        }
        throw new NoSuchElementException("Could not find any roads near the given point");
    }
    
    public String getRoadBuffer(Point point, float radius) {
        int nearestRoad = getNearestRoad(point);
        return null; // TODO
    }
    
}
