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
            return new NutrientConstant(
                    nutrientConstant.get().getN_TS() * biomassAmount,
                    nutrientConstant.get().getN_g_kgFM() * biomassAmount,
                    nutrientConstant.get().getP_TS() * biomassAmount,
                    nutrientConstant.get().getP_g_kgFM() * biomassAmount,
                    nutrientConstant.get().getN_soluble_TS() * biomassAmount,
                    nutrientConstant.get().getN_soluble_g_kgFM() * biomassAmount);
        }
        return new NutrientConstant(null, null, null, null, null, null);
    }
    
    @SuppressWarnings("unchecked")
    public List<NutrientConstant> getAll() {
        String sql = "SELECT n.* FROM nutrient_constant n";
        Query query = entityManager.createNativeQuery(sql, NutrientConstant.class);
        return (List<NutrientConstant>) query.getResultList();
    }
    
}
