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
        Map<String, ValueAndUnit<String>> biomassData = (Map<String, ValueAndUnit<String>>) calculateBiomass().get("values");
        
        List<String> plainColumnNames = new ArrayList<>();
        List<List<DataCell>> data = new ArrayList<>();
        List<DataCell> dataRow = new ArrayList<>();
        List<DataCell> unitRow = new ArrayList<>();
        data.add(dataRow);
        data.add(unitRow);
        for (Entry<String, ValueAndUnit<String>> attributeEntry : biomassData.entrySet()) {
            plainColumnNames.add(attributeEntry.getKey());
            dataRow.add(new DataCell(Long.parseLong((attributeEntry.getValue().getValue().replaceAll("\\s", "")))));
            unitRow.add(new DataCell(attributeEntry.getValue().getUnit()));
        }
        return new TabularReportData(plainColumnNames, data);
    }

} 
