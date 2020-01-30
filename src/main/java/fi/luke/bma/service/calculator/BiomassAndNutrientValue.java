package fi.luke.bma.service.calculator;

import fi.luke.bma.model.NutrientResult;
import fi.luke.bma.model.ValueAndUnit;

public class BiomassAndNutrientValue {
    
    private ValueAndUnit<Long> valueAndUnit;
    
    private NutrientResult nutrientResult;
    
    public BiomassAndNutrientValue(ValueAndUnit<Long> valueAndUnit, NutrientResult nutrientResult) {
        super();
        this.valueAndUnit = valueAndUnit;
        this.nutrientResult = nutrientResult;
    }
    
    public BiomassAndNutrientValue(NutrientResult nutrientResult) {
        super();
        this.nutrientResult = nutrientResult;
    }

    public ValueAndUnit<Long> getValueAndUnit() {
        return valueAndUnit;
    }

    public void setValueAndUnit(ValueAndUnit<Long> valueAndUnit) {
        this.valueAndUnit = valueAndUnit;
    }

    public NutrientResult getNutrientResult() {
        return nutrientResult;
    }

    public void setNutrientResult(NutrientResult nutrientResult) {
        this.nutrientResult = nutrientResult;
    }   
    
}
