package fi.luke.bma.model;

import java.util.List;

public class UnitConversionResponse {

    public static class UnitConversion {
        private Integer code;
        
        private String name;
        
        private String unit;

        public Integer getCode() {
            return code;
        }

        public void setCode(Integer code) {
            this.code = code;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getUnit() {
            return unit;
        }

        public void setUnit(String unit) {
            this.unit = unit;
        }
    }
    
    private Long attributeId;
    
    private String attributeName;
    
    private String attributeUnit;
    
    protected List<UnitConversion> unitConversions;

    public Long getAttributeId() {
        return attributeId;
    }

    public void setAttributeId(Long attributeId) {
        this.attributeId = attributeId;
    }

    public String getAttributeName() {
        return attributeName;
    }

    public void setAttributeName(String attributeName) {
        this.attributeName = attributeName;
    }

    public String getAttributeUnit() {
        return attributeUnit;
    }

    public void setAttributeUnit(String attributeUnit) {
        this.attributeUnit = attributeUnit;
    }

    public List<UnitConversion> getUnitConversions() {
        return unitConversions;
    }

    public void setUnitConversions(List<UnitConversion> unitConversions) {
        this.unitConversions = unitConversions;
    }
    
}
