package fi.luke.bma.service.calculator;

import java.util.Map;

import fi.luke.bma.model.BiomassCalculationRequestModel;
import fi.luke.bma.service.AttributeService;
import fi.luke.bma.service.CalculationService;
import fi.luke.bma.service.GeometryService;
import fi.luke.bma.service.LocalizeService;
import fi.luke.bma.service.NutrientCalculationService;

public class RoadBufferCalculator extends RadiusCalculator {

    private final BiomassCalculationRequestModel requestModel;

    private final GeometryService geometryService;

    public RoadBufferCalculator(BiomassCalculationRequestModel requestModel, CalculationService calculationService,
            AttributeService attributeService, GeometryService geometryService, LocalizeService localizedService,
            NutrientCalculationService nutrientCalculationService) {
        super(calculationService, attributeService, localizedService, nutrientCalculationService);
        this.requestModel = requestModel;
        this.geometryService = geometryService;
    }

    @Override
    public Map<String, ?> calculateBiomass() {
        String roadBufferAsWkt = geometryService.getRoadBuffer(requestModel.getPoints().get(0), requestModel.getRadius());
        return calculateBiomassForWktGeometry(requestModel, roadBufferAsWkt);
    }

    @Override
    public String getSearchDescription() {
        return getSearchDescription(requestModel, "Tieverkon kautta");
    }

}
