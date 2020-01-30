package fi.luke.bma.service;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Component;

import fi.luke.bma.model.NutrientConstant;
import fi.luke.bma.model.NutrientResult;

@Component
public class NutrientCalculationService {

    @PersistenceContext
    private EntityManager entityManager;

    public EntityManager getEntityManager() {
        return entityManager;
    }

    public void setEntityManager(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public NutrientResult getNutrientValue(Long attributeId, Double biomassAmount,
            List<NutrientConstant> nutrientConstants) {
        Optional<NutrientConstant> nutrientConstant = nutrientConstants.stream()
                .filter(nc -> nc.getAttribute().getId().equals(attributeId)).findFirst();
        if (nutrientConstant.isPresent()) {
            NutrientConstant nc = nutrientConstant.get();
            return new NutrientResult(calculateNutrient(nc.getTS(), nc.getN_TS(), nc.getN_g_kgFM(), biomassAmount),
                    calculateNutrient(nc.getTS(), nc.getP_TS(), nc.getP_g_kgFM(), biomassAmount),
                    calculateNutrient(nc.getTS(), nc.getN_soluble_TS(), nc.getN_soluble_g_kgFM(), biomassAmount));
        }
        return new NutrientResult(null, null, null);
    }

    @SuppressWarnings("unchecked")
    public List<NutrientConstant> getAll() {
        String sql = "SELECT n.* FROM nutrient_constant n";
        Query query = entityManager.createNativeQuery(sql, NutrientConstant.class);
        return (List<NutrientConstant>) query.getResultList();
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
     * Calculates nutrient from biomass.
     * Rules: If coefficient for both total solid and fresh matter is null or zero, returns null.
     *        If coefficient for total solid is null or zero, then calculate nutrient for fresh matter
     *        Else calculate nutrient for total solid.
     * @param totalSolidPercent
     * @param coefficient_TS
     * @param coefficient_g_per_kg
     * @param biomassAmount
     * @return
     */
    private Double calculateNutrient(Double totalSolidPercent, Double coefficient_TS, Double coefficient_g_per_kg,
            Double biomassAmount) {
        if ((coefficient_TS == null || coefficient_TS == 0)
                && (coefficient_g_per_kg == null || coefficient_g_per_kg == 0)) {
            return null;
        } else if (coefficient_TS == null || coefficient_TS == 0) {
            return calculateNutrientForFreshMatter(totalSolidPercent, coefficient_g_per_kg, biomassAmount);
        } else {
            return calculateNutrientForTotalSolid(totalSolidPercent, coefficient_TS, biomassAmount);
        }
    }

}
