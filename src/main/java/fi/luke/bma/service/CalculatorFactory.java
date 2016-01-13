package fi.luke.bma.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fi.luke.bma.model.BiomassCalculationRequestModel;
import fi.luke.bma.service.calculator.BoundedAreaCalculator;
import fi.luke.bma.service.calculator.Calculator;
import fi.luke.bma.service.calculator.CircleCalculator;
import fi.luke.bma.service.calculator.FreeformPolygonCalculator;
import fi.luke.bma.service.calculator.RoadBufferCalculator;

/**
 * Factory class that instantiates Calculator instances based on request model attributes
 */
@Service
public class CalculatorFactory {

    @Autowired
    private CalculationService calculationService;
    
    @Autowired
    private BoundedAreaService boundedAreaService;

    @Autowired
    private AttributeService attributeService;

    @Autowired
    private GeometryService geometryService;
    
    public Calculator getInstance(BiomassCalculationRequestModel requestModel) {
        Class<? extends Calculator> clazz;
        if (requestModel.getBoundedAreaGridId() != null) {
            clazz = BoundedAreaCalculator.class;
        }
        else if (requestModel.getRadius() != null){
            if ("road".equals(requestModel.getRadiusType())) {
                clazz = RoadBufferCalculator.class;
            }
            else {
                clazz = CircleCalculator.class;
            }
        } else {
            clazz = FreeformPolygonCalculator.class;
        }
        return getInstance(requestModel, clazz);
    }
    
    public Calculator getInstance(BiomassCalculationRequestModel requestModel, Class<? extends Calculator> clazz) {
        if (clazz == BoundedAreaCalculator.class) {
            return new BoundedAreaCalculator(requestModel, calculationService, boundedAreaService, attributeService);
        }
        if (clazz == RoadBufferCalculator.class) {
            return new RoadBufferCalculator(requestModel, calculationService, attributeService, geometryService);
        }
        if (clazz == CircleCalculator.class) {
            return new CircleCalculator(requestModel, calculationService, attributeService, geometryService);
        }
        if (clazz == FreeformPolygonCalculator.class) {
            return new FreeformPolygonCalculator(requestModel, calculationService, attributeService);
        }
        throw new IllegalArgumentException("Unknown calculator requested: " + clazz.getName());
    }
    
}
