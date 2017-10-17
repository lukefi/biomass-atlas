package fi.luke.bma.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import fi.rktl.common.model.NonInsertableEntityWithLongId;

@Entity(name = "attribute_unit_conversion")
public class AttributeUnitConversion extends NonInsertableEntityWithLongId {
    
    public enum UnitConversion {
        MULTIPLY_BY_2(1), DIVIDE_BY_2(2), FORMULA_3(3);
        
        private int value;

        private UnitConversion(int value) {
            this.value = value;
        }

        public int getValue() {
            return value;
        }
    }

    @Column(name = "name_fi")
    private String nameFI;
    
    @Column(name = "name_en")
    private String nameEN;
    
    @Column(name = "name_sv")
    private String nameSV;
    
    @Column(name = "unit_fi")
    private String unitFI;
    
    @Column(name = "unit_en")
    private String unitEN;
    
    @Column(name = "unit_sv")
    private String unitSV;
    
    @Column(name = "code")
    private Integer code;
    
    @ManyToOne
    @JoinColumn(name = "attribute_id")
    private Attribute attribute;

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

    public String getUnitSV() {
        return unitSV;
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public void setUnitSV(String unitSV) {
        this.unitSV = unitSV;
    }

    public Attribute getAttribute() {
        return attribute;
    }

    public void setAttribute(Attribute attribute) {
        this.attribute = attribute;
    }
    
}
