package fi.luke.bma.service.calculator;

import fi.luke.bma.model.NutrientConstant;
import fi.luke.bma.model.ValueAndUnit;

public class BiomassAndNutrientValue {
    
    private ValueAndUnit<Long> valueAndUnit;
    
    private NutrientConstant nutrientResult;
    
    private Double value;   // For Administrative border's value

    public BiomassAndNutrientValue(ValueAndUnit<Long> valueAndUnit, NutrientConstant nutrientResult) {
        super();
        this.valueAndUnit = valueAndUnit;
        this.nutrientResult = nutrientResult;
    }
    
    public BiomassAndNutrientValue(Double value,NutrientConstant nutrientResult) {
        super();
        this.value = value;
        this.nutrientResult = nutrientResult;
    }

    public ValueAndUnit<Long> getValueAndUnit() {
        return valueAndUnit;
    }

    public void setValueAndUnit(ValueAndUnit<Long> valueAndUnit) {
        this.valueAndUnit = valueAndUnit;
    }

    public NutrientConstant getNutrientResult() {
        return nutrientResult;
    }

    public void setNutrientResult(NutrientConstant nutrientResult) {
        this.nutrientResult = nutrientResult;
    }

    public Double getValue() {
        return value;
    }

    public void setValue(Double value) {
        this.value = value;
    }
    
    
    
}
