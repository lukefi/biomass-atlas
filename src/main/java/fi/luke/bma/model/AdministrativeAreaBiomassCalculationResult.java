package fi.luke.bma.model;

public final class AdministrativeAreaBiomassCalculationResult {
    
    private long attributeId;
    
    private long areaId;
    
    private Double value;
    
    private long displayOrder;

    public AdministrativeAreaBiomassCalculationResult(long attributeId, long areaId, Double value, long displayOrder) {
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

    public long getDisplayOrder() {
        return displayOrder;
    }

    public void setDisplayOrder(long displayOrder) {
        this.displayOrder = displayOrder;
    }
    
}