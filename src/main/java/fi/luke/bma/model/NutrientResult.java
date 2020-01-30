package fi.luke.bma.model;

public class NutrientResult {

    private Double N;
    
    private Double P;
    
    private Double N_soluble;
    
    public NutrientResult(Double n, Double p, Double n_soluble) {
        super();
        N = n;
        P = p;
        N_soluble = n_soluble;
    }

    public Double getN() {
        return N;
    }

    public void setN(Double n) {
        N = n;
    }

    public Double getP() {
        return P;
    }

    public void setP(Double p) {
        P = p;
    }

    public Double getN_soluble() {
        return N_soluble;
    }

    public void setN_soluble(Double n_soluble) {
        N_soluble = n_soluble;
    }
    
}
