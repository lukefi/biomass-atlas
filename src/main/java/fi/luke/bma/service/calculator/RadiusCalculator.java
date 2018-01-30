package fi.luke.bma.service.calculator;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.stream.Collectors;

import fi.luke.bma.model.Attribute;
import fi.luke.bma.model.BiomassCalculationRequestModel;
import fi.luke.bma.model.ValueAndUnit;
import fi.luke.bma.service.AttributeService;
import fi.luke.bma.service.CalculationService;
import fi.luke.bma.service.LocalizeService;

public abstract class RadiusCalculator extends SingleAreaCalculator {

    private final CalculationService calculationService;
    
    private final AttributeService attributeService;
    
    private final LocalizeService localizedService;
    
    protected RadiusCalculator(CalculationService calculationService, AttributeService attributeService,
    		LocalizeService localizedService) {
    	super(localizedService); //TODO: Check this, can still use?
        this.calculationService = calculationService;
        this.attributeService = attributeService;
        this.localizedService = localizedService;
    }

    protected Map<String, ?> calculateBiomassForWktGeometry(BiomassCalculationRequestModel requestBody, String geometryAsWkt) {
        List<Long> requestedAttibuteIds = requestBody.getAttributes();
        List<Attribute> sortedAttributes = attributeService.getAllAttibutesWithIdsSortedByDisplayOrder(requestedAttibuteIds);
        List<Long> sortedAttributeIds = sortedAttributes.stream().map(Attribute::getId).collect(Collectors.toList());
        
        LinkedHashMap<String, ValueAndUnit<Long>> attributeValues = new LinkedHashMap<>();
        TreeMap<String, Object> result = new TreeMap<>();
        for(long attributeId : sortedAttributeIds){
            double calculatedResult =  calculationService.getTotalBiomassForAttribute(attributeId, GRID_ID_1KM_BY_1KM, geometryAsWkt);
            List<String> attributeNameAndUnit = attributeService.getAttributeNameAndUnit(attributeId);
            String attributeName = attributeNameAndUnit.get(0);
            String attributeUnit = attributeNameAndUnit.get(1);
            attributeValues.put(attributeName, new ValueAndUnit<Long>(Math.round(calculatedResult), attributeUnit));
        }
        result.put("values", attributeValues);
        result.put("geo", geometryAsWkt);
        
        Map<String, String> displayOrders = new LinkedHashMap<>();
        for (Attribute attribute : sortedAttributes) {
        	String localizedName = localizedService.getLocalizedAttributeName(attribute);
            displayOrders.put(Double.toString(attribute.getDisplayOrder()), localizedName);
        }
        result.put("displayOrders", displayOrders);
        double areaOfPolygon = calculationService.getAreaOfPolygon(geometryAsWkt) / 10000; // For m2 converted to hectare
        result.put("selectedArea", Math.round(areaOfPolygon));
        
        return result;
    }
    
    protected String getSearchDescription(BiomassCalculationRequestModel requestModel, String typeString) {
        return typeString + " saavutettavissa olevat alueet pisteestä " + describePoint(requestModel.getPoints().get(0)) +
               " säteellä " + requestModel.getRadius().intValue() + " km";
    }

}
