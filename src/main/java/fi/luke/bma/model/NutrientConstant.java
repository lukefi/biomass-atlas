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
    
	@Column(name = "ts")
    private Double TS;  // Total Solid percent
    
    @Column(name = "nutrient_type")
    private String nutrientType;
    
    @Column(name = "value")
    private Double value;   // Nutrient Coefficient value
    
    @Column(name = "fm")
    private Double FM;
    
    @Column(name = "nutrient_id")
    private Long nutrientId;
    
    @Column(name = "wms_style")
    private String wmsStyle;
    
    @Column(name = "fi")
    private String nameFI;
    
    @Column(name = "en")
    private String nameEN;
    
    @Column(name = "sv")
    private String nameSV;

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
    
	public Double getFM() {
		return FM;
	}

	public void setFM(Double fM) {
		FM = fM;
	}

	public Long getNutrientId() {
		return nutrientId;
	}

	public void setNutrientId(Long nutrientId) {
		this.nutrientId = nutrientId;
	}

	public String getWmsStyle() {
		return wmsStyle;
	}

	public void setWmsStyle(String wmsStyle) {
		this.wmsStyle = wmsStyle;
	}

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

	public String getNameSV() {
		return nameSV;
	}

	public void setNameSV(String nameSV) {
		this.nameSV = nameSV;
	}

	public Attribute getAttribute() {
        return attribute;
    }
    
    public void setAttribute(Attribute attribute) {
        this.attribute = attribute;
    }
    
}
