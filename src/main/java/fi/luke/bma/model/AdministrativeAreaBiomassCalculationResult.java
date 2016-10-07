package fi.luke.bma.model;

public final class AdministrativeAreaBiomassCalculationResult {
    
    private long attributeId;
    
    private long areaId;
    
    private Double value;
    
    private Double displayOrder;

    public AdministrativeAreaBiomassCalculationResult(long attributeId, long areaId, Double value, Double displayOrder) {
        this.attributeId = attributeId;
        this.areaId = areaId;
        this.value = value;
        this.displayOrder = displayOrder;
    }

    public long getAttributeId() {
        return attributeId;
    }

    public void setAttributeId(long attributeId) {
        this.attributeId = attributeId;
    }

    public long getAreaId() {
        return areaId;
    }

    public void setAreaId(long areaId) {
        this.areaId = areaId;
    }

    public Double getValue() {
        return value;
    }

    public void setValue(Double value) {
        this.value = value;
    }

    public Double getDisplayOrder() {
        return displayOrder;
    }

    public void setDisplayOrder(Double displayOrder) {
        this.displayOrder = displayOrder;
    }
    
}