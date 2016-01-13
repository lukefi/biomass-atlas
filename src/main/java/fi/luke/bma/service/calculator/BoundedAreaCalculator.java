package fi.luke.bma.service.calculator;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import fi.luke.bma.model.AdministrativeAreaBiomassCalculationResult;
import fi.luke.bma.model.BiomassCalculationRequestModel;
import fi.luke.bma.model.GridCell;
import fi.luke.bma.service.AttributeService;
import fi.luke.bma.service.BoundedAreaService;
import fi.luke.bma.service.CalculationService;

public class BoundedAreaCalculator implements Calculator {

    private final BiomassCalculationRequestModel requestModel;

    private final CalculationService calculationService;

    private final BoundedAreaService boundedAreaService;
    
    private final AttributeService attributeService;

    public BoundedAreaCalculator(BiomassCalculationRequestModel requestModel, CalculationService calculationService,
            BoundedAreaService boundedAreaService, AttributeService attributeService) {
        this.requestModel = requestModel;
        this.calculationService = calculationService;
        this.boundedAreaService = boundedAreaService;
        this.attributeService = attributeService;
    }

    @Override
    public Map<String, ?> calculateBiomass() {
        List<AdministrativeAreaBiomassCalculationResult> boundedAreaBiomasses = calculationService
                .getTotalBiomassForBoundedArea(requestModel.getAttributes(), requestModel.getAreaIds(),
                        requestModel.getBoundedAreaGridId());
        Map<String, Object> root = new TreeMap<>();
        List<Map<String, ?>> boundedAreaList = new ArrayList<>();
        Map<Long, Map<String, Object>> boundedAreaMap = new TreeMap<>();
        for (GridCell cell : boundedAreaService.getBoundedAreasById(requestModel.getAreaIds(),
                requestModel.getBoundedAreaGridId())) {
            Map<String, Object> boundedArea = new TreeMap<>();
            boundedArea.put("name", cell.getName());
            boundedArea.put("id", cell.getCellId());
            boundedAreaList.add(boundedArea);
            boundedAreaMap.put(cell.getCellId(), boundedArea);
        }
        root.put("boundedAreas", boundedAreaList);

        for (AdministrativeAreaBiomassCalculationResult result : boundedAreaBiomasses) {
            Map<String, Object> boundedArea = boundedAreaMap.get(result.getAreaId());
            List<String> attributeNameAndUnit = attributeService.getAttributeNameAndUnit(result.getAttributeId());
            String layerName = attributeNameAndUnit.get(0);
            String layerUnit = attributeNameAndUnit.get(1);
            Long calculatedResult = Math.round(result.getValue());
            String resultAndUnit = Long.toString(calculatedResult) + " " + layerUnit;

            boundedArea.put(layerName, resultAndUnit);
        }
        return root;
    }

    @Override
    public String getSearchDescription() {
        List<GridCell> areaList = boundedAreaService.getBoundedAreasById(requestModel.getAreaIds(), requestModel.getBoundedAreaGridId());
        if (areaList.size() == 0) {
            return "";
        }
        String gridName = areaList.get(0).getGrid().getName();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < areaList.size(); i++) {
            if (i > 0) {
                sb.append(", ");
            }
            sb.append(areaList.get(i).getName());
        }
        return "Aluejaon " + gridName + " alueilta " + areaList + " lasketut biomassat";
    }

}
