package fi.nls.oskari;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import fi.luke.bma.model.BiomassCalculationRequestModel;
import fi.luke.bma.model.BiomassCalculationRequestModel.Point;
import fi.luke.bma.service.AttributeService;
import fi.luke.bma.service.CalculationService;
import fi.luke.bma.service.MunicipalityService;

@RestController
@RequestMapping(value="biomass")
public class BiomassCalculationController {

    @Autowired
    private CalculationService calculationService;
    
    @Autowired
    private AttributeService attributeService;
    
    @Autowired
    private MunicipalityService municipalityService;
    
    @RequestMapping(value="area", method=RequestMethod.POST)
    public Map<?, ?> calculateBiomassForArea(@RequestBody BiomassCalculationRequestModel requestBody) {
        TreeMap<String, Object> result = new TreeMap<>();
        String polygonAsWkt = polygonToWkt(requestBody.getPoints());
        long gridId = 1;
        double areaOfPolygon =  calculationService.getAreaOfPolygon(polygonAsWkt)/1000000; // For m2 converted to km2
        Integer numberOfCentroids = calculationService.getNumberOfCentroids(gridId, polygonAsWkt);
        if((areaOfPolygon < (0.95 * numberOfCentroids)) || (areaOfPolygon > (1.05 * numberOfCentroids))){
        	result.put("Error", "Area selected is too small or too much of grid cell centroids.");
        }
        for(long attributeId : requestBody.getAttributes()){
        	double calculatedResult =  calculationService.getTotalBiomassForAttribute(attributeId, gridId, polygonAsWkt);
        	List<String> attributeNameAndUnit = attributeService.getAttributeNameAndUnit(attributeId);
        	String attributeName = attributeNameAndUnit.get(0);
        	String attributeUnit = attributeNameAndUnit.get(1);
        	result.put(attributeName, Math.round(calculatedResult) + " " + attributeUnit);
        }
        return result;
    }
    
    private String polygonToWkt(List<Point> points) {
        StringBuilder sb = new StringBuilder();
        sb.append("POLYGON((");
        boolean first = true;
        for (Point point : points) {
            if (!first) {
                sb.append(", ");
            }
            first = false;
            sb.append(point.getX());
            sb.append(" ");
            sb.append(point.getY());
        }
        sb.append("))");
        return sb.toString();
    }
    
    private String pointToWkt(Point point) {
        StringBuilder sb = new StringBuilder();
        sb.append("POINT(");
        sb.append(point.getX());
        sb.append(" ");
        sb.append(point.getY());
        sb.append(")");
        return sb.toString();
    }
    
    @RequestMapping(value="municipality/geometry", method=RequestMethod.POST)
    public Map<?, ?> getMunicipalityGeometry(@RequestBody BiomassCalculationRequestModel requestBody) {
    	String pointAsWkt = pointToWkt(requestBody.getPoints().get(0));
    	Map<String, String> geometryMap = new HashMap<String, String>();
    	geometryMap.put("geometry", municipalityService.getGeometry(pointAsWkt));
    	return geometryMap;
    }
    
}
