package fi.luke.bma.service.calculator;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.stream.Collectors;

import fi.luke.bma.model.AdministrativeAreaBiomassCalculationResult;
import fi.luke.bma.model.Attribute;
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
        Map<Long, Map<String, String>> attributeMap = new LinkedHashMap<>();
        
        List<Long> requestedAttibuteIds = requestModel.getAttributes();
        List<Attribute> sortedAttributes = attributeService.getAllAttibutesWithIdsSortedByDisplayOrder(requestedAttibuteIds);
        List<Long> sortedAttributeIds = sortedAttributes.stream().map(Attribute::getId).collect(Collectors.toList());
        
        List<AdministrativeAreaBiomassCalculationResult> boundedAreaBiomasses = calculationService
                .getTotalBiomassForBoundedArea(sortedAttributeIds, requestModel.getAreaIds(),
                        requestModel.getBoundedAreaGridId());
        Map<String, Object> root = new LinkedHashMap<>();
        List<Map<String, ?>> boundedAreaList = new ArrayList<>();
        Map<Long, Map<String, Object>> boundedAreaMap = new LinkedHashMap<>();
        for (GridCell cell : boundedAreaService.getBoundedAreasById(requestModel.getAreaIds(),
                requestModel.getBoundedAreaGridId())) {
            Map<String, Object> boundedArea = new LinkedHashMap<>();
            boundedArea.put("name", cell.getName());
            boundedArea.put("id", cell.getCellId());
            boundedAreaList.add(boundedArea);
            boundedAreaMap.put(cell.getCellId(), boundedArea);
        }
        root.put("boundedAreas", boundedAreaList);
        
        for (Long attributeId : sortedAttributeIds) {
            List<String> attributeNameAndUnit = attributeService.getAttributeNameAndUnit(attributeId);
            Map<String, String> m = new LinkedHashMap<>();
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
        
        Map<String, String> displayOrders = new LinkedHashMap<>();
        for (AdministrativeAreaBiomassCalculationResult result : boundedAreaBiomasses) {
            displayOrders.put(Double.toString(result.getDisplayOrder()), Long.toString(result.getAttributeId()));
        }
        root.put("displayOrders", displayOrders);
        
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
        return "Aluejaon " + gridName + " alueilta " + sb.toString() + " lasketut biomassat";
    }

    @Override
    @SuppressWarnings("unchecked")
    public TabularReportData calculateBiomassInTabularFormat() {
        List<Map<String, ?>> biomassData = (List<Map<String, ?>>) calculateBiomass().get("boundedAreas");
        Map<Long, Map<String, String>> attributeMap = (Map<Long, Map<String, String>>) calculateBiomass().get("attributes");
        List<String> columnNames = new ArrayList<>();
        columnNames.add("Aluetunnus");
        columnNames.add("Alue");
        columnNames.add("Biomassan tyyppi");
        columnNames.add("Määrä");
        columnNames.add("Yksikkö");
        List<List<DataCell>> data = new ArrayList<>();
        
        for (Map<String, ?> boundedArea : biomassData) {
            for (Entry<String, ?> entry : boundedArea.entrySet()) {
                if ("id".equals(entry.getKey()) || "name".equals(entry.getKey())) {
                    continue;
                }
                long attributeId = Long.parseLong(entry.getKey());
                Map<String, String> attributeInfo = attributeMap.get(attributeId);
                List<DataCell> row = new ArrayList<>();
                row.add(new DataCell(boundedArea.get("id")));
                row.add(new DataCell(boundedArea.get("name")));
                row.add(new DataCell(attributeInfo.get("name")));
                row.add(new DataCell((Long)entry.getValue()));
                row.add(new DataCell(attributeInfo.get("unit")));
                data.add(row);
            }
        }
        
        return new TabularReportData(columnNames, data);
    }

}
