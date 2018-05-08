package fi.luke.bma.model;

import java.util.List;

public class SearchModel {
    private List<Long> attributeIds;
   
    private List<Integer> years;

    public List<Long> getAttributeIds() {
        return attributeIds;
    }

    public void setAttributeIds(List<Long> attributeIds) {
        this.attributeIds = attributeIds;
    }

    public List<Integer> getYears() {
        return years;
    }

    public void setYears(List<Integer> years) {
        this.years = years;
    }
}