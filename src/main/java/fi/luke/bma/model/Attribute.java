package fi.luke.bma.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import fi.rktl.common.model.NonInsertableEntityWithLongId;

@Entity(name = "attribute")
public class Attribute extends NonInsertableEntityWithLongId {
    @Column(name = "fi")
    private String nameFI;

    @Column(name = "en")
    private String nameEN;

    @Column(name = "unit_fi")
    private String unitFI;

    @Column(name = "unit_en")
    private String unitEN;

    @Column(name = "display_order")
    private Double displayOrder;

    @ManyToOne
    @JoinColumn(name = "biomass_category_id")
    private Category category;

    @ManyToOne
    @JoinColumn(name = "latest_validity_id")
    private Validity latestValidity;

    @OneToMany(mappedBy = "attribute", fetch = FetchType.EAGER)
    private List<AttributeUnitConversion> attributeUnitConversions;

    public String getNameFI() {
        return nameFI;
    }

    public void setNameFI(String nameFI) {
        this.nameFI = nameFI;
    }

    public String getNameEN() {
        return nameEN;
    }

    public void setNameEN(String nameEN) {
        this.nameEN = nameEN;
    }

    public String getUnitFI() {
        return unitFI;
    }

    public void setUnitFI(String unitFI) {
        this.unitFI = unitFI;
    }

    public String getUnitEN() {
        return unitEN;
    }

    public void setUnitEN(String unitEN) {
        this.unitEN = unitEN;
    }

    public Double getDisplayOrder() {
        return displayOrder;
    }

    public void setDisplayOrder(Double displayOrder) {
        this.displayOrder = displayOrder;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Validity getLatestValidity() {
        return latestValidity;
    }

    public void setLatestValidity(Validity latestValidity) {
        this.latestValidity = latestValidity;
    }

    public List<AttributeUnitConversion> getAttributeUnitConversions() {
        return attributeUnitConversions;
    }

    public void setAttributeUnitConversions(List<AttributeUnitConversion> attributeUnitConversions) {
        this.attributeUnitConversions = attributeUnitConversions;
    }

}
