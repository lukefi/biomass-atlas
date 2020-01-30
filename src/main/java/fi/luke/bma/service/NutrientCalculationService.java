package fi.luke.bma.service;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Component;

import fi.luke.bma.model.NutrientConstant;

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

    public NutrientConstant getNutrientValue(Long attributeId, Double biomassAmount,
            List<NutrientConstant> nutrientConstants) {
        Optional<NutrientConstant> nutrientConstant = nutrientConstants.stream()
                .filter(nc -> nc.getAttribute().getId().equals(attributeId)).findFirst();
        if (nutrientConstant.isPresent()) {
            NutrientConstant nc = nutrientConstant.get();
            return new NutrientConstant(calculateNutrientForTotalSolid(nc.getTS(), nc.getN_TS(), biomassAmount),
                    calculateNutrientForFreshMatter(nc.getTS(), nc.getN_g_kgFM(), biomassAmount),
                    calculateNutrientForTotalSolid(nc.getTS(), nc.getP_TS(), biomassAmount),
                    calculateNutrientForFreshMatter(nc.getTS(), nc.getP_g_kgFM(), biomassAmount),
                    calculateNutrientForTotalSolid(nc.getTS(), nc.getN_soluble_TS(), biomassAmount),
                    calculateNutrientForFreshMatter(nc.getTS(), nc.getN_soluble_g_kgFM(), biomassAmount));
        }
        return new NutrientConstant(null, null, null, null, null, null);
    }

    @SuppressWarnings("unchecked")
    public List<NutrientConstant> getAll() {
        String sql = "SELECT n.* FROM nutrient_constant n";
        Query query = entityManager.createNativeQuery(sql, NutrientConstant.class);
        return (List<NutrientConstant>) query.getResultList();
    }

    private Double calculateNutrientForTotalSolid(Double totalSolidPercent, Double coefficent_TS,
            Double biomassAmount) {
        if (coefficent_TS == null || coefficent_TS == 0) {
            return null; 
        }
        Double totalSolid = (biomassAmount * totalSolidPercent) / 100;
        Double nutrient = (totalSolid * coefficent_TS) / 100;
        return nutrient * 1000; // Convert ton to kg
    }

    private Double calculateNutrientForFreshMatter(Double totalSolidPercent, Double coefficent_g_per_kg,
            Double biomassAmount) {
        if (coefficent_g_per_kg == null || coefficent_g_per_kg == 0) {
            return null; 
        }
        Double biomassAmount_kg = biomassAmount * 1000;
        Double totalSolid = (biomassAmount_kg * totalSolidPercent) / 100;
        Double nutrient_g = totalSolid * coefficent_g_per_kg;
        return nutrient_g / 1000; // Convert gram to kg
    }

}
