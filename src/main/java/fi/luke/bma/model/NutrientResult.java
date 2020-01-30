package fi.luke.bma.model;

public class NutrientResult {

    private Long N;
    
    private Long P;
    
    private Long N_soluble;
    
    public NutrientResult(Long n, Long p, Long n_soluble) {
        super();
        N = n;
        P = p;
        N_soluble = n_soluble;
    }

    public Long getN() {
        return N;
    }

    public void setN(Long n) {
        N = n;
    }

    public Long getP() {
        return P;
    }

    public void setP(Long p) {
        P = p;
    }

    public Long getN_soluble() {
        return N_soluble;
    }

    public void setN_soluble(Long n_soluble) {
        N_soluble = n_soluble;
    }
    
}
