package fi.luke.bma.service.calculator;

import java.util.Map;

import fi.luke.bma.model.BiomassCalculationRequestModel;
import fi.luke.bma.service.AttributeService;
import fi.luke.bma.service.CalculationService;
import fi.luke.bma.service.GeometryService;
import fi.luke.bma.service.LocalizeService;

public class CircleCalculator extends RadiusCalculator {

    private final BiomassCalculationRequestModel requestModel;

    private final GeometryService geometryService;

    public CircleCalculator(BiomassCalculationRequestModel requestModel, CalculationService calculationService,
            AttributeService attributeService, GeometryService geometryService, LocalizeService localizedService) {
        super(calculationService, attributeService, localizedService);
        this.requestModel = requestModel;
        this.geometryService = geometryService;
    }

    @Override
    public Map<String, ?> calculateBiomass() {
        String circleAsWkt = geometryService.getCircle(requestModel.getPoints().get(0), requestModel.getRadius());
        return calculateBiomassForWktGeometry(requestModel, circleAsWkt);
    }

    @Override
    public String getSearchDescription() {
        return getSearchDescription(requestModel, "Linnuntietä");
    }

}
