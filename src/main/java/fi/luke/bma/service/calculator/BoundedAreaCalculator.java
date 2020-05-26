package fi.luke.bma.service.calculator;

import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Map.Entry;
import java.util.stream.Collectors;

import fi.luke.bma.model.AdministrativeAreaBiomassCalculationResult;
import fi.luke.bma.model.Attribute;
import fi.luke.bma.model.BiomassCalculationRequestModel;
import fi.luke.bma.model.BiomassCalculationRequestModel.CalculateRule;
import fi.luke.bma.model.Grid.GridType;
import fi.luke.bma.model.GridCell;
import fi.luke.bma.model.NutrientConstant;
import fi.luke.bma.model.TabularReportData;
import fi.luke.bma.model.ValueAndUnit;
import fi.luke.bma.service.AttributeService;
import fi.luke.bma.service.BoundedAreaService;
import fi.luke.bma.service.CalculationService;
import fi.luke.bma.service.GridCellService;
import fi.luke.bma.service.LocalizeService;
import fi.luke.bma.service.NutrientCalculationService;
import fi.rktl.common.model.DataCell;

public class BoundedAreaCalculator extends Calculator {

    private final BiomassCalculationRequestModel requestModel;

    private final CalculationService calculationService;

    private final BoundedAreaService boundedAreaService;

    private final AttributeService attributeService;

    private final GridCellService gridCellService;

    private final LocalizeService localizeService;
    
    private final NutrientCalculationService nutrientCalculationService;

    public BoundedAreaCalculator(BiomassCalculationRequestModel requestModel, CalculationService calculationService,
            BoundedAreaService boundedAreaService, AttributeService attributeService, GridCellService gridCellService,
            LocalizeService localizeService, NutrientCalculationService nutrientCalculationService) {
        this.requestModel = requestModel;
        this.calculationService = calculationService;
        this.boundedAreaService = boundedAreaService;
        this.attributeService = attributeService;
        this.gridCellService = gridCellService;
        this.localizeService = localizeService;
        this.nutrientCalculationService = nutrientCalculationService;
    }

    @Override
    public Map<String, ?> calculateBiomass() {
        Map<Long, Map<String, String>> attributeMap = new LinkedHashMap<>();

        List<Long> requestedAttibuteIds = requestModel.getAttributes();
        List<Attribute> sortedAttributes = attributeService
                .getAllAttibutesWithIdsSortedByDisplayOrder(requestedAttibuteIds);
        List<Long> sortedAttributeIds = sortedAttributes.stream().map(Attribute::getId).collect(Collectors.toList());

        modifyRequestModelBasedOnCalculateRule(requestModel);
        List<AdministrativeAreaBiomassCalculationResult> boundedAreaBiomasses = calculationService
                .getTotalBiomassForBoundedArea(sortedAttributeIds, requestModel.getAreaIds(),
                        requestModel.getBoundedAreaGridId());

        Map<String, Object> root = new LinkedHashMap<>();
        List<Map<String, ?>> boundedAreaList = new ArrayList<>();
        Map<Long, Map<String, Object>> boundedAreaMap = new LinkedHashMap<>();
        List<GridCell> cells = boundedAreaService.getBoundedAreasById(requestModel.getAreaIds(),
                requestModel.getBoundedAreaGridId());

        List<Long> areaIds = boundedAreaBiomasses.stream().map(AdministrativeAreaBiomassCalculationResult::getAreaId)
                .collect(Collectors.toList());
        for (GridCell cell : cells) {
            Map<String, Object> boundedArea = new LinkedHashMap<>();
            long cellId = cell.getCellId();
            boundedArea.put("name", gridCellService.getBoundedAreaName(cell));
            boundedArea.put("id", cellId);
            /* Include only those bounded areas which have values (omitted empty rows in 'calculate by municipality') */
            if (areaIds.contains(cellId)) {
                boundedAreaList.add(boundedArea);
                boundedAreaMap.put(cellId, boundedArea);
            }
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

        List<NutrientConstant> nutrientConstants = nutrientCalculationService.getAll();
        for (AdministrativeAreaBiomassCalculationResult result : boundedAreaBiomasses) {
            Map<String, Object> boundedArea = boundedAreaMap.get(result.getAreaId());
            Double value = result.getValue();
            Double calculatedResult = getCalculateResult(value);
            
            BiomassAndNutrientValue biomassAndNutrientValue = new BiomassAndNutrientValue(
                    new ValueAndUnit<Long>(Math.round(calculatedResult), null),
                    nutrientCalculationService.getNutrientValue(result.getAttributeId(), calculatedResult, nutrientConstants));
            boundedArea.put(Long.toString(result.getAttributeId()), biomassAndNutrientValue);
        }

        Map<String, String> displayOrders = new LinkedHashMap<>();
        for (AdministrativeAreaBiomassCalculationResult result : boundedAreaBiomasses) {
            Double displayOrder = result.getDisplayOrder();
            if (displayOrder == null) {
                displayOrder = 0.0; // Use zero as order number in case order has not been set
            }
            displayOrders.put(Double.toString(displayOrder.doubleValue()), Long.toString(result.getAttributeId()));
        }
        root.put("displayOrders", displayOrders);
        double totalSumOfBoundedArea = calculationService.getTotalSumOfBoundedArea(requestModel.getAreaIds(),
                requestModel.getBoundedAreaGridId()) / 10000; // For m2 converted to hectare
        root.put("selectedArea", Math.round(totalSumOfBoundedArea));

        return root;
    }

    @Override
    public String getSearchDescription() {
        List<GridCell> areaList = boundedAreaService.getBoundedAreasById(requestModel.getAreaIds(),
                requestModel.getBoundedAreaGridId());
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
        Map<String, ?> calculateBiomasses = calculateBiomass();
        List<Map<String, ?>> biomassData = (List<Map<String, ?>>) calculateBiomasses.get("boundedAreas");
        Map<Long, Map<String, String>> attributeMap = (Map<Long, Map<String, String>>) calculateBiomasses
                .get("attributes");
        // Display order's Map<Order number, attribute id>
        Map<String, String> displayOrders =  (Map<String, String>) calculateBiomasses.get("displayOrders");
        Long selectedArea = (Long) calculateBiomasses.get("selectedArea");
        List<String> columnNames = new ArrayList<>();
        List<String> localizedMessages = localizeService.getLocalizedMessageSource();
        columnNames.add(localizedMessages.get(0));
        columnNames.add(localizedMessages.get(1));
        columnNames.add(localizedMessages.get(2));
        columnNames.add(localizedMessages.get(3));
        columnNames.add(localizedMessages.get(4));
        columnNames.add("N (kg)");
        columnNames.add("P (kg)");
        columnNames.add(localizedMessages.get(5));
        columnNames.add(localizedMessages.get(6) + " = " + selectedArea + " " + localizedMessages.get(7));
        List<List<DataCell>> data = new ArrayList<>();

        for (Map<String, ?> boundedArea : biomassData) {
            for (Entry<String, ?> entry : boundedArea.entrySet()) {
                if ("id".equals(entry.getKey()) || "name".equals(entry.getKey())) {
                    continue;
                }
                long attributeId = Long.parseLong(entry.getKey());
                BiomassAndNutrientValue biomassAndNutrientValue = (BiomassAndNutrientValue) entry.getValue();
                Map<String, String> attributeInfo = attributeMap.get(attributeId);
                List<DataCell> row = new ArrayList<>();
                row.add(new DataCell(boundedArea.get("id")));
                row.add(new DataCell(boundedArea.get("name")));
                row.add(new DataCell(attributeInfo.get("name")));
                row.add(new DataCell(biomassAndNutrientValue.getValueAndUnit().getValue()));
                row.add(new DataCell(attributeInfo.get("unit")));                
                row.add(new DataCell(biomassAndNutrientValue.getNutrientResult().getN()));
                row.add(new DataCell(biomassAndNutrientValue.getNutrientResult().getP()));
                // Include order number
                for (Entry<String, String> orderEntry : displayOrders.entrySet()) {
                    if (orderEntry.getValue().equals(String.valueOf(attributeId))) {
                        row.add(new DataCell(orderEntry.getKey()));
                        break;
                    }
                }
                row.add(new DataCell("")); // Empty string for 7th column
                data.add(row);
            }
        }

        return new TabularReportData(columnNames, data);
    }

    @Override
    public TabularReportData calculateBiomassInTabularFormatForReport() {
        return calculateBiomassInTabularFormat();
    }

    /**
     * If the calculate rule is defined (i.e; Not 'Calculate.None'), then the values (areaIds and boundedAreaGridId) of
     * request model is modified with new areaIds (i.e; grid_cell_id) for list of municipalities
     * 
     * @param requestModel
     *            BiomassCalculationRequestModel
     */
    public void modifyRequestModelBasedOnCalculateRule(BiomassCalculationRequestModel requestModel) {
        List<Long> requestAreaIds = requestModel.getAreaIds();
        List<Long> areaIds = new ArrayList<>();
        if (CalculateRule.CALCULATE_BY_MUNICIPALITY_FOR_PROVINCE == requestModel.getCalculateRule()) {
            for (Long areaId : requestAreaIds) {
                List<GridCell> cells = gridCellService.getAllMunicipalitiesForBoundaryAreaId(areaId,
                        GridType.PROVINCE.getValue());
                areaIds.addAll(cells.stream().map(GridCell::getCellId).collect(Collectors.toList()));
            }
            requestModel.setAreaIds(areaIds);
            requestModel.setBoundedAreaGridId(Long.valueOf(GridType.MUNICIPALITY.getValue()));
        } else if (CalculateRule.CALCULATE_BY_MUNICIPALITY_FOR_ELY == requestModel.getCalculateRule()) {
            for (Long areaId : requestAreaIds) {
                List<GridCell> cells = gridCellService.getAllMunicipalitiesForBoundaryAreaId(areaId,
                        GridType.ELY_CENTER.getValue());
                areaIds.addAll(cells.stream().map(GridCell::getCellId).collect(Collectors.toList()));
            }
            requestModel.setAreaIds(areaIds);
            requestModel.setBoundedAreaGridId(Long.valueOf(GridType.MUNICIPALITY.getValue()));
        } else if (CalculateRule.CALCULATE_BY_SUB_DRAINAGE_BASIN == requestModel.getCalculateRule()) {
            for (Long areaId : requestAreaIds) {
                List<GridCell> cells = gridCellService.getAllSubDrainageBasinsForBoundaryAreaId(areaId);
                areaIds.addAll(cells.stream().map(GridCell::getCellId).collect(Collectors.toList()));
            }
            requestModel.setAreaIds(areaIds);
            requestModel.setBoundedAreaGridId(Long.valueOf(GridType.SUB_DRAINAGE_BASIN.getValue()));
        }
    }

    /**
     * If the value is less than 10, 2 decimal place is returned, else value is rounded to nearest long value.
     * 
     * @param value
     *            Result value which is to be rounded
     * @return Object which would be either String or Long value
     */
    private Double getCalculateResult(Double value) {
        Double calculatedResult;
        NumberFormat numberFormat = NumberFormat.getIntegerInstance(Locale.US);
        numberFormat.setMaximumFractionDigits(2);
        if (value < 10.0) {
            calculatedResult = Double.parseDouble(numberFormat.format(value));
        } else {
            calculatedResult = ((Long) Math.round(value)).doubleValue();
        }
        return calculatedResult;
    }

}
