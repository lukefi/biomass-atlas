package fi.luke.bma.service.calculator;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import fi.luke.bma.model.TabularReportData;
import fi.luke.bma.model.ValueAndUnit;
import fi.rktl.common.model.DataCell;

public abstract class SingleAreaCalculator extends Calculator {

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
        Map<String, ValueAndUnit<Long>> biomassData = (Map<String, ValueAndUnit<Long>>) calculateBiomass().get("values");
        Long selectedArea = (Long) calculateBiomass().get("selectedArea");
        List<String> plainColumnNames = new ArrayList<String>();
        plainColumnNames.add("Biomassan tyyppi");
        plainColumnNames.add("Määrä");
        plainColumnNames.add("Yksikkö");
        plainColumnNames.add("Valittu alue = " + selectedArea + " ha");
        List<List<DataCell>> data = new ArrayList<>();
        for (Entry<String, ValueAndUnit<Long>> attributeEntry : biomassData.entrySet()) {
            List<DataCell> dataRow = new ArrayList<>();
            dataRow.add(new DataCell(attributeEntry.getKey()));
            dataRow.add(new DataCell(attributeEntry.getValue().getValue()));
            dataRow.add(new DataCell(attributeEntry.getValue().getUnit()));
            dataRow.add(new DataCell(""));  // Empty string for 4th column name
            data.add(dataRow);
        }
       
        return new TabularReportData(plainColumnNames, data);
    }

}
