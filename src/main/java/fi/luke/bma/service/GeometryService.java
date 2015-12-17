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
    
    private Object[] getNearestRoad(Point point) {
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
            String sql = "SELECT ogc_fid, startnode, endnode FROM roadsegment r WHERE st_intersects(r.geometry, " + boundingBox + ")"
                    + " ORDER BY st_distance(r.geometry, " + toPoint(point) + ") ASC LIMIT 1";
            Query query = entityManager.createNativeQuery(sql);
            try {
                return (Object[]) query.getSingleResult();
            }
            catch (NoResultException e) {
                boxR *= 2;
            }
        }
        throw new NoSuchElementException("Could not find any roads near the given point");
    }
    
    private String reachableNodesQuery(int nodeId, float radius) {
        return "select id1 as node from pgr_drivingdistance('select ogc_fid as id, startnode as source, endnode as target, "
                + "length::float8 as cost from roadsegment', " + nodeId + ", " + radius + ", false, false)";
    }
    
    public String getRoadBuffer(Point point, float radius) {
        Object[] nearestRoad = getNearestRoad(point);
        int roadId = (int) nearestRoad[0];
        int startNode = (int) nearestRoad[1];
        int endNode = (int) nearestRoad[2];
        String reachableRoadsSql =
                "with reachable_nodes as ("
                + reachableNodesQuery(startNode, radius * 1000) + " union "
                + reachableNodesQuery(endNode, radius * 1000) + ")"
                + "select r.ogc_fid from roadsegment r "
                + "where (r.startnode in (select node from reachable_nodes) and r.endnode in (select node from reachable_nodes)) "
                + "or r.ogc_fid = " + roadId;
        String reachableCellsSql =
                "select st_astext(st_union(c.geometry)) from grid_cell c, roadsegment r"
                + " where c.grid_id = 1 and st_intersects(c.geometry, r.geometry) and r.ogc_fid in (" + reachableRoadsSql + ")";
        return (String) entityManager.createNativeQuery(reachableCellsSql).getSingleResult();
    }
    
}
