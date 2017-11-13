package fi.luke.bma.service;

import java.util.Arrays;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestBody;

import fi.luke.bma.model.Attribute;
import fi.luke.bma.model.BiomassCalculationRequestModel;
import fi.luke.bma.model.BiomassCalculationRequestModel.Point;
import fi.luke.bma.model.Grid.GridType;
import fi.luke.bma.model.GridCell;
import fi.luke.bma.model.UserActivityLog;

@Transactional
@Component
public class UserActivityLogService {

    public enum UserActivityFunction {
        BOUNDED_AREA, FREE_SELECTION, CIRCLE_RADIUS, CIRCLE_ROAD;
    }

    @Autowired
    private BoundedAreaService boundedAreaService;

    @Autowired
    private AttributeService attributeService;

    @PersistenceContext
    private EntityManager entityManager;

    public EntityManager getEntityManager() {
        return entityManager;
    }

    public void setEntityManager(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public void createUserActivityLog(@RequestBody BiomassCalculationRequestModel requestBody,
            HttpServletRequest request, UserActivityFunction function) {
        Map<String, String> requestHeaders = getRequestHeaders(request);
        String attributeNames = getAttributeNamesFromRequestModel(requestBody);
        String boundedAreas = "";
        String functionName = "";
        switch (function) {
            case BOUNDED_AREA:
                boundedAreas = getBoundedAreaNamesFromRequestModel(requestBody);
                for (GridType gridType : GridType.values()) {
                    if (gridType.getValue() == requestBody.getBoundedAreaGridId()) {
                        functionName = "Bounded area - " + gridType.name();
                    }
                }
                break;

            case FREE_SELECTION:
                boundedAreas = getGeometryForFreeform(requestBody);
                functionName = "Free selection";

            default:
                break;
        }
        UserActivityLog log = createNewUserActivityLog(requestHeaders, attributeNames, boundedAreas, functionName);
        saveLog(log);
    }

    private Map<String, String> getRequestHeaders(HttpServletRequest request) {
        Map<String, String> result = new HashMap<>();
        Enumeration<String> headerNames = request.getHeaderNames();
        while (headerNames.hasMoreElements()) {
            String key = (String) headerNames.nextElement();
            String value = request.getHeader(key);
            result.put(key, value);
        }
        return result;
    }

    private String getAttributeNamesFromRequestModel(BiomassCalculationRequestModel requestBody) {
        String content = "";
        List<Attribute> attributes = attributeService
                .getAllAttibutesWithIdsSortedByDisplayOrder(requestBody.getAttributes());
        for (Attribute attribute : attributes) {
            content += attribute.getNameFI() + "; ";
        }
        return content;
    }

    private String getBoundedAreaNamesFromRequestModel(BiomassCalculationRequestModel requestBody) {
        String content = "";
        List<GridCell> gridCells = boundedAreaService.getBoundedAreasById(requestBody.getAreaIds(),
                requestBody.getBoundedAreaGridId());
        for (GridCell gridCell : gridCells) {
            content += gridCell.getName() + "; ";
        }
        return content;
    }

    private String getGeometryForFreeform(BiomassCalculationRequestModel requestBody) {
        String content = "";
        List<Point> points = requestBody.getPoints();
        for (Point point : points) {
            content += "(" + point.getX().toString() + ", " + point.getY().toString() + "); ";
        }
        return content;
    }

    private UserActivityLog createNewUserActivityLog(Map<String, String> requestHeaders, String attributeNames,
            String boundedAreaNames, String function) {
        UserActivityLog log = new UserActivityLog();
        log.setUserInfo(createUserInfo(requestHeaders));
        log.setAttributeName(attributeNames);
        log.setBoundedArea(boundedAreaNames);
        log.setFunctionName(function);
        return log;
    }

    private String createUserInfo(Map<String, String> requestHeaders) {
        String content = "";
        // List of values from HttpServletRequest header that are to be stored in database.
        List<String> columns = Arrays.asList("Origin", "Cookie", "User-Agent", "Referer", "Host", "Accept-Language");
        for (Map.Entry<String, String> entry : requestHeaders.entrySet()) {
            if (columns.contains(entry.getKey()))
                content += entry.getKey() + " : " + entry.getValue() + "\n";
        }
        return content;
    }

    public void saveLog(UserActivityLog userActivityLog) {
        entityManager.persist(userActivityLog);
    }

}
