package fi.luke.bma.model;

import java.util.List;

public class SearchModel {
    private List<Integer> attributeIds;
   
    private List<Integer> years;

    public List<Integer> getAttributeIds() {
        return attributeIds;
    }

    public void setAttributeIds(List<Integer> attributeIds) {
        this.attributeIds = attributeIds;
    }

    public List<Integer> getYears() {
        return years;
    }

    public void setYears(List<Integer> years) {
        this.years = years;
    }
}