package fi.luke.bma.service.calculator;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import fi.luke.bma.model.BiomassCalculationRequestModel;
import fi.luke.bma.model.ValueAndUnit;
import fi.luke.bma.model.BiomassCalculationRequestModel.Point;
import fi.luke.bma.service.AttributeService;
import fi.luke.bma.service.CalculationService;

public abstract class RadiusCalculator {

    private final Integer GRID_ID_1KM_BY_1KM = 1; // From database table 'grid' 
    
    private final CalculationService calculationService;
    
    private final AttributeService attributeService;
    
    protected RadiusCalculator(CalculationService calculationService, AttributeService attributeService) {
        this.calculationService = calculationService;
        this.attributeService = attributeService;
    }

    protected Map<String, ?> calculateBiomassForWktGeometry(BiomassCalculationRequestModel requestBody, String geometryAsWkt) {
        Map<String, String> value = new HashMap<String, String>();
        value.put("geo", geometryAsWkt);
        
        TreeMap<String, ValueAndUnit<Long>> attributeValues = new TreeMap<>();
        TreeMap<String, Object> result = new TreeMap<>();
        for(long attributeId : requestBody.getAttributes()){
            double calculatedResult =  calculationService.getTotalBiomassForAttribute(attributeId, GRID_ID_1KM_BY_1KM, geometryAsWkt);
            List<String> attributeNameAndUnit = attributeService.getAttributeNameAndUnit(attributeId);
            String attributeName = attributeNameAndUnit.get(0);
            String attributeUnit = attributeNameAndUnit.get(1);
            attributeValues.put(attributeName, new ValueAndUnit<Long>(Math.round(calculatedResult), attributeUnit));
        }
        result.put("values", attributeValues);
        result.put("geo", geometryAsWkt);
        return result;
    }
    
    protected String getSearchDescription(BiomassCalculationRequestModel requestModel, String typeString) {
        return typeString + " saavutettavissa olevat alueet pisteestä " + describePoint(requestModel.getPoints().get(0)) +
               " säteellä " + requestModel.getRadius().intValue() + " km";
    }
    
    static String describePoint(Point point) {
        return "(" + point.getX().intValue() + ", " + point.getY().intValue() + ")";
    }
}
