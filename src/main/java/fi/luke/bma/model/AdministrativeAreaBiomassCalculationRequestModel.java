package fi.luke.bma.model;

import java.util.List;

public class AdministrativeAreaBiomassCalculationRequestModel {

    private List<Long> attributeIds;
    
    private List<Long> areaIds;

    public List<Long> getAttributeIds() {
        return attributeIds;
    }

    public void setAttributeIds(List<Long> attributeIds) {
        this.attributeIds = attributeIds;
    }

    public List<Long> getAreaIds() {
        return areaIds;
    }

    public void setAreaIds(List<Long> areaIds) {
        this.areaIds = areaIds;
    }
    
}
