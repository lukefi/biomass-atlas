package fi.luke.bma.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import org.springframework.stereotype.Component;

import fi.luke.bma.model.NutrientConstant;
import fi.luke.bma.model.NutrientResult;

@Component
public class NutrientCalculationService {

    private final String N_TS = "n_ts";
    
    private final String N_FM = "n_g_kgfm";
    
    private final String N_SOLUBLE_TS = "n_soluble_ts";
    
    private final String N_SOLUBLE_FM = "n_soluble_g_kgfm";
    
    private final String P_TS = "p_ts";
    
    private final String P_FM = "p_g_kgfm";
    
   
    private EntityManager entityManager;

    @PersistenceContext
    public void setEntityManager(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public NutrientResult getNutrientValue(Long attributeId, Double biomassAmount,
            List<NutrientConstant> nutrientConstants) {
        List<NutrientConstant> validNutrientConstants = nutrientConstants.stream()
                .filter(nc -> nc.getAttribute().getId().equals(attributeId)).collect(Collectors.toList());
        if (validNutrientConstants.isEmpty()) {
            return new NutrientResult(null, null, null);
        }
        Optional<NutrientConstant> n_ts = validNutrientConstants.stream()
                .filter(nc -> nc.getNutrientType().equals(N_TS)).findFirst();
        Optional<NutrientConstant> n_fm = validNutrientConstants.stream()
                .filter(nc -> nc.getNutrientType().equals(N_FM)).findFirst();
        Optional<NutrientConstant> n_soluble_ts = validNutrientConstants.stream()
                .filter(nc -> nc.getNutrientType().equals(N_SOLUBLE_TS)).findFirst();
        Optional<NutrientConstant> n_soluble_fm = validNutrientConstants.stream()
                .filter(nc -> nc.getNutrientType().equals(N_SOLUBLE_FM)).findFirst();
        Optional<NutrientConstant> p_ts = validNutrientConstants.stream()
                .filter(nc -> nc.getNutrientType().equals(P_TS)).findFirst();
        Optional<NutrientConstant> p_fm = validNutrientConstants.stream()
                .filter(nc -> nc.getNutrientType().equals(P_FM)).findFirst();

        NutrientConstant nNutrient = getNutrientConstant(n_ts, n_fm);
        NutrientConstant n_solubleNutrient = getNutrientConstant(n_soluble_ts, n_soluble_fm);
        NutrientConstant pNutrient = getNutrientConstant(p_ts, p_fm);

        return getNutrientResult(nNutrient, n_solubleNutrient, pNutrient, biomassAmount);
    }

    @SuppressWarnings("unchecked")
    public List<NutrientConstant> getAll() {  	
    	String jpql = "SELECT n FROM " + NutrientConstant.class.getName() + " n";
        TypedQuery<NutrientConstant> query = entityManager.createQuery(jpql, NutrientConstant.class);        
        return query.getResultList();
    }

    private Double calculateNutrientForTotalSolid(Double totalSolidPercent, Double coefficient_TS,
            Double biomassAmount) {
        if (coefficient_TS == null || coefficient_TS == 0) {
            return null;
        }
        Double totalSolid = (biomassAmount * totalSolidPercent) / 100;
        Double nutrient = (totalSolid * coefficient_TS) / 100;
        return nutrient * 1000; // Convert ton to kg
    }

    private Double calculateNutrientForFreshMatter(Double totalSolidPercent, Double coefficient_g_per_kg,
            Double biomassAmount) {
        if (coefficient_g_per_kg == null || coefficient_g_per_kg == 0) {
            return null;
        }
        Double biomassAmount_kg = biomassAmount * 1000;
        Double totalSolid = (biomassAmount_kg * totalSolidPercent) / 100;
        Double nutrient_g = totalSolid * coefficient_g_per_kg;
        return nutrient_g / 1000; // Convert gram to kg
    }

    /**
     * Calculates nutrient from biomass. Rules: If nutrient type is 'n_ts' or 'n_soluble_ts' or 'p_ts', then calculate
     * nutrient for total solid. Else calculate nutrient for fresh matter
     * 
     * @param totalSolidPercent
     * @param value
     *            Nutrient coefficient value
     * @param nutrientType
     * @param biomassAmount
     * @return
     */
    private Long calculateNutrient(Double totalSolidPercent, Double value, String nutrientType, Double biomassAmount) {
        Double calculatedNutrient;
        if (nutrientType.equals(N_TS) || nutrientType.equals(N_SOLUBLE_TS) || nutrientType.equals(P_TS)) {
            calculatedNutrient = calculateNutrientForTotalSolid(totalSolidPercent, value, biomassAmount);
        } else {
            calculatedNutrient = calculateNutrientForFreshMatter(totalSolidPercent, value, biomassAmount);
        }
        return (calculatedNutrient == null ? null : calculatedNutrient.longValue());
    }

    /**
     * Get NutrientConstant between Total solid(ts) or Fresh matter(fm), whichever is not null.
     * 
     * @param nutrient_ts
     * @param nutrient_fm
     * @return
     */
    private NutrientConstant getNutrientConstant(Optional<NutrientConstant> nutrient_ts,
            Optional<NutrientConstant> nutrient_fm) {
        if (!nutrient_ts.isPresent() && !nutrient_fm.isPresent()) {
            return null;
        } else if (nutrient_ts.isPresent()) {
            return nutrient_ts.get();
        } else {
            return nutrient_fm.get();
        }
    }

    /**
     * Generate nutrient result which contains calculated value for nitrogen, nitrogen-soluble and phosphorus value
     * 
     * @param nNutrient
     * @param n_solubleNutrient
     * @param pNutrient
     * @param biomassAmount
     * @return
     */
    private NutrientResult getNutrientResult(NutrientConstant nNutrient, NutrientConstant n_solubleNutrient,
            NutrientConstant pNutrient, Double biomassAmount) {
        Long nitrogen, nitrogen_soluble, phosphorus;

        // Nitrogen
        if (nNutrient == null) {
            nitrogen = null;
        } else {
            nitrogen = calculateNutrient(nNutrient.getTS(), nNutrient.getValue(), nNutrient.getNutrientType(),
                    biomassAmount);
        }

        // Nitrogen-soluble
        if (n_solubleNutrient == null) {
            nitrogen_soluble = null;
        } else {
            nitrogen_soluble = calculateNutrient(n_solubleNutrient.getTS(), n_solubleNutrient.getValue(),
                    n_solubleNutrient.getNutrientType(), biomassAmount);
        }

        // Phosphorus
        if (pNutrient == null) {
            phosphorus = null;
        } else {
            phosphorus = calculateNutrient(pNutrient.getTS(), pNutrient.getValue(), pNutrient.getNutrientType(),
                    biomassAmount);
        }

        return new NutrientResult(nitrogen, phosphorus, nitrogen_soluble);
    }

}
