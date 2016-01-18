package fi.luke.bma.service.calculator;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import fi.luke.bma.model.AdministrativeAreaBiomassCalculationResult;
import fi.luke.bma.model.BiomassCalculationRequestModel;
import fi.luke.bma.model.GridCell;
import fi.luke.bma.model.TabularReportData;
import fi.luke.bma.service.AttributeService;
import fi.luke.bma.service.BoundedAreaService;
import fi.luke.bma.service.CalculationService;
import fi.rktl.common.model.DataCell;

public class BoundedAreaCalculator extends Calculator {

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
        
        Map<Long, Map<String, String>> attributeMap = new HashMap<>();
        for (Long attributeId : requestModel.getAttributes()) {
            List<String> attributeNameAndUnit = attributeService.getAttributeNameAndUnit(attributeId);
            Map<String, String> m = new HashMap<>();
            m.put("name", attributeNameAndUnit.get(0));
            m.put("unit", attributeNameAndUnit.get(1));
            attributeMap.put(attributeId, m);
        }
        root.put("attributes", attributeMap);

        for (AdministrativeAreaBiomassCalculationResult result : boundedAreaBiomasses) {
            Map<String, Object> boundedArea = boundedAreaMap.get(result.getAreaId());
            Long calculatedResult = Math.round(result.getValue());
            boundedArea.put(Long.toString(result.getAttributeId()), calculatedResult);
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

    @Override
    public TabularReportData calculateBiomassInTabularFormat() {
        @SuppressWarnings("unchecked")
        List<Map<String, ?>> biomassData = (List<Map<String, ?>>) calculateBiomass().get("boundedAreas");
        List<String> columnNames = new ArrayList<>();
        columnNames.add(""); // for the empty cell at the intersection of row and column headers
        List<List<DataCell>> data = new ArrayList<>();
        List<DataCell> unitRow = new ArrayList<>();
        data.add(unitRow);
        /*for (Entry<String, ValueAndUnit<Long>> attributeEntry : biomassData.get(0).entrySet()) {
            columnNames.add(attributeEntry.getKey());
            unitRow.add(new DataCell(attributeEntry.getValue().getUnit()));
        }*/
        return new TabularReportData(columnNames, data);
    }

}
