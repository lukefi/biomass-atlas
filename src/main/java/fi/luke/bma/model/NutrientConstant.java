package fi.luke.bma.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import fi.rktl.common.model.NonInsertableEntityWithLongId;

@Entity
@Table(name = "nutrient_constant")
public class NutrientConstant extends NonInsertableEntityWithLongId {
    
    private Double TS;  // Total Solid percent
    
    @Column(name = "nutrient_type")
    private String nutrientType;
    
    private Double value;   // Nutrient Coefficient value

    @OneToOne
    @JoinColumn(name = "attribute_id")
    private Attribute attribute;
    
    public Double getTS() {
        return TS;
    }

    public void setTS(Double tS) {
        TS = tS;
    }
    
    public String getNutrientType() {
        return nutrientType;
    }
    
    public void setNutrientType(String nutrientType) {
        this.nutrientType = nutrientType;
    }
    
    public Double getValue() {
        return value;
    }
    
    public void setValue(Double value) {
        this.value = value;
    }
    public Attribute getAttribute() {
        return attribute;
    }
    
    public void setAttribute(Attribute attribute) {
        this.attribute = attribute;
    }
    
}
