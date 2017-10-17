package fi.luke.bma.service;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.google.common.base.Joiner;

import fi.luke.bma.model.Attribute;
import fi.luke.bma.model.AttributeUnitConversion;
import fi.luke.bma.model.UnitConversionResponse;
import fi.luke.bma.model.UnitConversionResponse.UnitConversion;

@Component
public class AttributeUnitConversionService {

    @Autowired
    private LocalizeService localizeService;

    @PersistenceContext
    private EntityManager entityManager;

    public EntityManager getEntityManager() {
        return entityManager;
    }

    public void setEntityManager(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public List<UnitConversionResponse> getUnitConversionsForAttributes(Long[] attributeIds) {
        String jpql = "SELECT a FROM " + Attribute.class.getName() + " a  WHERE a.id IN ("
                + Joiner.on(',').join(attributeIds) + ")";
        TypedQuery<Attribute> query = entityManager.createQuery(jpql, Attribute.class);
        List<Attribute> attributes = query.getResultList();
        List<UnitConversionResponse> unitConversionResponses = new ArrayList<>();
        attributes.forEach(attribute -> {
            UnitConversionResponse response = new UnitConversionResponse();
            List<UnitConversion> unitConversions = new ArrayList<>();
            List<AttributeUnitConversion> attributeUnitConversions = attribute.getAttributeUnitConversions();
            if (attributeUnitConversions.size() > 0) { 
                response.setAttributeId(attribute.getId());
                response.setAttributeName(localizeService.getLocalizedName(attribute, Attribute.class, "getName"));
                response.setAttributeUnit(localizeService.getLocalizedName(attribute, Attribute.class, "getUnit"));
                attributeUnitConversions.forEach(attributeUnitConversion -> {
                    UnitConversion unitConverion = new UnitConversion();
                    unitConverion.setName(localizeService.getLocalizedName(attributeUnitConversion,
                            AttributeUnitConversion.class, "getName"));
                    unitConverion.setUnit(localizeService.getLocalizedName(attributeUnitConversion,
                            AttributeUnitConversion.class, "getUnit"));
                    unitConverion.setCode(attributeUnitConversion.getCode());
                    unitConversions.add(unitConverion);
                });
                response.setUnitConversions(unitConversions);
                unitConversionResponses.add(response);
            }
        });
        return unitConversionResponses;
    }

}
