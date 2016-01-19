package fi.luke.bma.service.calculator;

import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import fi.luke.bma.model.BiomassCalculationRequestModel;
import fi.luke.bma.model.BiomassCalculationRequestModel.Point;
import fi.luke.bma.model.ValueAndUnit;
import fi.luke.bma.service.AttributeService;
import fi.luke.bma.service.CalculationService;

public class FreeformPolygonCalculator extends SingleAreaCalculator {

    private final BiomassCalculationRequestModel requestModel;

    private final CalculationService calculationService;

    private final AttributeService attributeService;

    public FreeformPolygonCalculator(BiomassCalculationRequestModel requestModel, CalculationService calculationService,
            AttributeService attributeService) {
        this.requestModel = requestModel;
        this.calculationService = calculationService;
        this.attributeService = attributeService;
    }

    @Override
    public Map<String, ?> calculateBiomass() {
        TreeMap<String, Object> result = new TreeMap<>();
        String polygonAsWkt = polygonToWkt(requestModel.getPoints());
        final long gridId = GRID_ID_1KM_BY_1KM;
        double areaOfPolygon = calculationService.getAreaOfPolygon(polygonAsWkt) / 1000000; // For m2 converted to km2
        Integer numberOfCentroids = calculationService.getNumberOfCentroids(gridId, polygonAsWkt);
        if ((areaOfPolygon < (0.95 * numberOfCentroids)) || (areaOfPolygon > (1.05 * numberOfCentroids))) {
            result.put("error",
                    "Valittu alue on laskentatarkkuuteen nähden liian pieni, tuloksessa voi olla merkittävää virhettä.");
        }
        TreeMap<String, ValueAndUnit<Long>> attributeValues = new TreeMap<>();
        for (long attributeId : requestModel.getAttributes()) {
            double calculatedResult = calculationService.getTotalBiomassForAttribute(attributeId, gridId, polygonAsWkt);
            List<String> attributeNameAndUnit = attributeService.getAttributeNameAndUnit(attributeId);
            String attributeName = attributeNameAndUnit.get(0);
            String attributeUnit = attributeNameAndUnit.get(1);
            attributeValues.put(attributeName, new ValueAndUnit<Long>(Math.round(calculatedResult), attributeUnit));
        }
        result.put("values", attributeValues);
        return result;
    }

    @Override
    public String getSearchDescription() {
        StringBuilder sb = new StringBuilder();
        sb.append("Monikulmion alueelta lasketut biomassat. Monikulmion kulmapisteet ovat");
        for (Point point : requestModel.getPoints()) {
            sb.append(' ');
            sb.append(describePoint(point));
        }
        return sb.toString();
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

}