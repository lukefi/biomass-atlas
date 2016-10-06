package fi.luke.bma.service;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import fi.luke.bma.dao.AttributeDao;
import fi.luke.bma.model.Attribute;

@Component
public class AttributeService {
	@Autowired
	private AttributeDao attributeDao;
	
	@PersistenceContext
	private EntityManager entityManager;
	
	public EntityManager getEntityManager() {
        return entityManager;
    }

    public void setEntityManager(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public List<String> getAttributeNameAndUnit(long attributeId){
		Attribute attribute = attributeDao.get(attributeId);
		List<String> result = new ArrayList<String>();
		result.add(attribute.getNameFI()); //TODO: Based on locale set
		result.add(attribute.getUnitFI());
		return result;
	}
	
	@SuppressWarnings("unchecked")
    public List<Attribute> getAllAttibutesWithIdsSortedByDisplayOrder(List<Long> attributeIds) {
	    String sql = "FROM attribute a WHERE a.id IN (:attributeIds) ORDER BY a.displayOrder ASC";
	    Query query = entityManager.createQuery(sql);
	    query.setParameter("attributeIds", attributeIds);
	    return (List<Attribute>)query.getResultList();
	}
}
