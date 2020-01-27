package fi.luke.bma.service.calculator;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import fi.luke.bma.model.TabularReportData;
import fi.luke.bma.model.ValueAndUnit;
import fi.luke.bma.service.LocalizeService;
import fi.rktl.common.model.DataCell;

public abstract class SingleAreaCalculator extends Calculator {
	
	
	private final LocalizeService localizedService;
	
	protected SingleAreaCalculator(LocalizeService localizedService) {
        this.localizedService = localizedService;
    }
	
    @Override
    public TabularReportData calculateBiomassInTabularFormat() {
        @SuppressWarnings("unchecked")
        Map<String, ValueAndUnit<Long>> biomassData = (Map<String, ValueAndUnit<Long>>) calculateBiomass().get("values");
        
        List<String> plainColumnNames = new ArrayList<>();
        List<List<DataCell>> data = new ArrayList<>();
        List<DataCell> dataRow = new ArrayList<>();
        List<DataCell> unitRow = new ArrayList<>();
        data.add(dataRow);
        data.add(unitRow);
        for (Entry<String, ValueAndUnit<Long>> attributeEntry : biomassData.entrySet()) {
            plainColumnNames.add(attributeEntry.getKey());
            dataRow.add(new DataCell(attributeEntry.getValue().getValue()));
            unitRow.add(new DataCell(attributeEntry.getValue().getUnit()));
        }
        return new TabularReportData(plainColumnNames, data);
    }
    
    @SuppressWarnings("unchecked")
    @Override
    public TabularReportData calculateBiomassInTabularFormatForReport() {
        Map<String, ?> biomassDataMap =   (Map<String, ?>) calculateBiomass();
        Map<String, BiomassAndNutrientValue> biomassData = (Map<String, BiomassAndNutrientValue>) biomassDataMap.get("values");
        // Display order's Map<Order number, attribute name>
        Map<String, String> displayOrders =  (Map<String, String>) biomassDataMap.get("displayOrders");
        Long selectedArea = (Long) biomassDataMap.get("selectedArea");
        List<String> plainColumnNames = new ArrayList<String>();
        List<String> localMessages = localizedService.getLocalizedMessageSourceForReport();
        plainColumnNames.add(localMessages.get(0));
        plainColumnNames.add(localMessages.get(1));
        plainColumnNames.add(localMessages.get(2));
        plainColumnNames.add("N (%TS)");
        plainColumnNames.add("N (g/kgFM)");
        plainColumnNames.add("P (%TS)");
        plainColumnNames.add("P (g/kgFM)");
        plainColumnNames.add("N-soluble (%TS)");
        plainColumnNames.add("N-soluble (g/kgFM)");
        plainColumnNames.add(localMessages.get(3));
        plainColumnNames.add(localMessages.get(4) + " = " + selectedArea + " " + localMessages.get(5));
        List<List<DataCell>> data = new ArrayList<>();
        for (Entry<String, BiomassAndNutrientValue> attributeEntry : biomassData.entrySet()) {
            List<DataCell> dataRow = new ArrayList<>();
            dataRow.add(new DataCell(attributeEntry.getKey()));
            dataRow.add(new DataCell(attributeEntry.getValue().getValueAndUnit().getValue()));
            dataRow.add(new DataCell(attributeEntry.getValue().getValueAndUnit().getUnit()));
            dataRow.add(new DataCell(attributeEntry.getValue().getNutrientResult().getN_TS()));
            dataRow.add(new DataCell(attributeEntry.getValue().getNutrientResult().getN_g_kgFM()));
            dataRow.add(new DataCell(attributeEntry.getValue().getNutrientResult().getP_TS()));
            dataRow.add(new DataCell(attributeEntry.getValue().getNutrientResult().getP_g_kgFM()));
            dataRow.add(new DataCell(attributeEntry.getValue().getNutrientResult().getN_soluble_TS()));
            dataRow.add(new DataCell(attributeEntry.getValue().getNutrientResult().getN_soluble_g_kgFM()));
            // Include order number
            for (Entry<String, String> orderEntry : displayOrders.entrySet()) {
                if (orderEntry.getValue().equals(attributeEntry.getKey())) {
                    dataRow.add(new DataCell(orderEntry.getKey()));
                    break;
                }
            }
            dataRow.add(new DataCell(""));  // Empty string for 5th column name
            data.add(dataRow);
        }   
        return new TabularReportData(plainColumnNames, data);
    }
}
