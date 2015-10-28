package fi.luke.bma.model;

public class ValueAndUnit<ValueType> {

    private ValueType value;
    
    private String unit;

    public ValueAndUnit(ValueType value, String unit) {
        this.value = value;
        this.unit = unit;
    }

    public ValueType getValue() {
        return value;
    }

    public void setValue(ValueType value) {
        this.value = value;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }
    
}
