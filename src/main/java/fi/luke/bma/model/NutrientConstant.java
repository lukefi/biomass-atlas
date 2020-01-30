package fi.luke.bma.model;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import fi.rktl.common.model.NonInsertableEntityWithLongId;

@Entity
@Table(name = "nutrient_constant")
public class NutrientConstant extends NonInsertableEntityWithLongId {
    
    private Double TS;  // Total Solid percent

    private Double N_TS;
    
    private Double N_g_kgFM;
    
    private Double P_TS;
    
    private Double P_g_kgFM;
    
    private Double N_soluble_TS;
    
    private Double N_soluble_g_kgFM;
    
    @OneToOne
    @JoinColumn(name = "attribute_id")
    private Attribute attribute;
    
    public NutrientConstant() {
        super();
    }

    public NutrientConstant(Double n_TS, Double n_g_kgFM, Double p_TS, Double p_g_kgFM, Double n_soluble_TS,
            Double n_soluble_g_kgFM) {
        super();
        N_TS = n_TS;
        N_g_kgFM = n_g_kgFM;
        P_TS = p_TS;
        P_g_kgFM = p_g_kgFM;
        N_soluble_TS = n_soluble_TS;
        N_soluble_g_kgFM = n_soluble_g_kgFM;
    }

    public Double getTS() {
        return TS;
    }

    public void setTS(Double tS) {
        TS = tS;
    }

    public Double getN_TS() {
        return N_TS;
    }

    public void setN_TS(Double n_TS) {
        N_TS = n_TS;
    }

    public Double getN_g_kgFM() {
        return N_g_kgFM;
    }

    public void setN_g_kgFM(Double n_g_kgFM) {
        N_g_kgFM = n_g_kgFM;
    }

    public Double getP_TS() {
        return P_TS;
    }

    public void setP_TS(Double p_TS) {
        P_TS = p_TS;
    }

    public Double getP_g_kgFM() {
        return P_g_kgFM;
    }

    public void setP_g_kgFM(Double p_g_kgFM) {
        P_g_kgFM = p_g_kgFM;
    }

    public Double getN_soluble_TS() {
        return N_soluble_TS;
    }

    public void setN_soluble_TS(Double n_soluble_TS) {
        N_soluble_TS = n_soluble_TS;
    }

    public Double getN_soluble_g_kgFM() {
        return N_soluble_g_kgFM;
    }

    public void setN_soluble_g_kgFM(Double n_soluble_g_kgFM) {
        N_soluble_g_kgFM = n_soluble_g_kgFM;
    }

    public Attribute getAttribute() {
        return attribute;
    }

    public void setAttribute(Attribute attribute) {
        this.attribute = attribute;
    }
    
}
