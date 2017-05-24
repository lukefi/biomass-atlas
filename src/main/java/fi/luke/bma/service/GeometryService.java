package fi.luke.bma.service;

import java.io.IOException;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vividsolutions.jts.io.WKTWriter;

import fi.luke.bma.model.BiomassCalculationRequestModel.Point;
import fi.luke.bma.model.GridCell;
import fi.luke.bma.model.Roadsegment;

@Service
public class GeometryService {

    private EntityManager entityManager;
    
    private GridCellService gridCellService;
    
    @PersistenceContext
    public void setEntityManager(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Autowired
    public void setGridCellService(GridCellService gridCellService) {
        this.gridCellService = gridCellService;
    }
    
    public String getCircle(Point point, float radius) {
        String sql = "SELECT ST_ASTEXT(the_geom) FROM (SELECT ST_Buffer(" + toPoint(point) + "," + radius*1000 + ")) AS foo(the_geom)";
        Query query = entityManager.createNativeQuery(sql);
        return (String) query.getSingleResult();
    }
    
    public String toPoint(Point point) {
        return "st_setsrid(st_point(" + point.getX() + "," + point.getY() + "), 3067)";
    }
    
    private Roadsegment getNearestRoad(Point point) {
        int boxR = 500;
        while (boxR < 3000000) {
            String boundingBox = getBoundingBox(point, boxR);
            String sql = "SELECT id, geometry, startnode, endnode FROM roadsegment r WHERE st_intersects(r.geometry, " + boundingBox + ")"
                    + " ORDER BY st_distance(r.geometry, " + toPoint(point) + ") ASC LIMIT 1";
            Query query = entityManager.createNativeQuery(sql, Roadsegment.class);
            try {
                return (Roadsegment) query.getSingleResult();
            }
            catch (NoResultException e) {
                boxR *= 2;
            }
        }
        throw new NoSuchElementException("Could not find any roads near the given point");
    }

    private String getBoundingBox(Point point, float boxR) {
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
        return boundingBox;
    }
    
    private String reachableNodesQuery(int nodeId, double radius, Point origPoint, float origRadius) {
        return "select id1 as node from pgr_drivingdistance('select id, startnode as source, endnode as target, "
                + "length::float8 as cost from roadsegment where geometry && " + getBoundingBox(origPoint, origRadius).replace("'", "''")
                + "', " + nodeId + ", " + radius + ", false, false)";
    }
    
    public String getRoadBuffer(Point point, float radiusKm) {
        float radiusM = radiusKm * 1000;
        Roadsegment nearestRoad = getNearestRoad(point);
        double startRadius = radiusM - point.getDistanceTo(nearestRoad.getGeometry().getStartPoint());
        double endRadius = radiusM - point.getDistanceTo(nearestRoad.getGeometry().getEndPoint());
        String reachableRoadsSql =
                "with reachable_nodes as ("
                + reachableNodesQuery(nearestRoad.getStartNode(), startRadius, point, radiusM) + " union "
                + reachableNodesQuery(nearestRoad.getEndNode(), endRadius, point, radiusM) + ")"
                + "select r.id from roadsegment r "
                + "where r.linkkityyp <> 21 " // exclude "lautta/lossi" from biomass calculation
                + "and r.geometry && " + getBoundingBox(point, radiusM) + " "
                + "and ((r.startnode in (select node from reachable_nodes) and r.endnode in (select node from reachable_nodes)) "
                + "or r.id = " + nearestRoad.getId() + ")";
        String reachableCellsSql =
                "select st_astext(st_union(c.geometry)) from grid_cell c"
                + " where c.grid_id = 1 "
                + " and c.geometry && " + getBoundingBox(point, radiusM)
                + " and exists (select 1 from roadsegment r"
                + " where r.geometry && " + getBoundingBox(point, radiusM) + " "
                + " and st_intersects(c.geometry, r.geometry) and r.id in (" + reachableRoadsSql + "))";
        return (String) entityManager.createNativeQuery(reachableCellsSql).getSingleResult();
    }
    
    /**
     * Geometry of bounded area (like: municipality, drainage basin, etc) is calculated.
     * @param points is list of points that specifies which areas are to be returned
     * @param gridId is an integer id of bounded area.
     * @return list of maps which includes id and geometry of bounded area.
     * @throws IOException if writing fails
     */
    public List<Map<String, Object>> getBoundedAreas(List<Point> points, long gridId) throws IOException {
        Iterator<GridCell> cells = points.stream()
                .map(p -> gridCellService.getByLocation(gridId, p.getX().intValue(), p.getY().intValue())).iterator();
        return cellsToWkt(cells);
    }
    
    public List<Map<String, Object>> getBoundedAreas(long gridId) throws IOException {
        return cellsToWkt(gridCellService.getGrid(gridId).iterator());
    }

    private List<Map<String, Object>> cellsToWkt(Iterator<GridCell> cells) throws IOException {
        List<Map<String, Object>> result = new ArrayList<>();
        cells.forEachRemaining(cell -> {
            Map<String, Object> geometryMap = new HashMap<>();
            geometryMap.put("id", cell.getCellId());
            
            StringWriter stringWriter = new StringWriter();
            WKTWriter wktWriter = new WKTWriter();
            try {
                wktWriter.write(cell.getGeometry(), stringWriter);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
            
            geometryMap.put("geometry", stringWriter.toString());
            geometryMap.put("boundedAreaName", cell.getName());
            result.add(geometryMap);
        });
        return result;
    }
    
}
