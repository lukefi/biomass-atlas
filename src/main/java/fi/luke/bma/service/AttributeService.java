package fi.luke.bma.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.i18n.LocaleContextHolder;
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
		Locale locale = LocaleContextHolder.getLocale();
    	String language = locale.getLanguage();
    	
    	if (language == "en" && (attribute.getNameEN() != null)) {
    		result.add(attribute.getNameEN());
    		result.add(getAttributeValueWithSuperscript(attribute.getUnitEN()));
    	}else if(language == "sv" && (attribute.getNameSV() != null)) {
    		result.add(attribute.getNameSV());
    		result.add(getAttributeValueWithSuperscript(attribute.getUnitSV()));
    	}else{
    		result.add(attribute.getNameFI());
    		result.add(getAttributeValueWithSuperscript(attribute.getUnitFI()));
    	}
		//result.add(attribute.getNameFI()); //TODO: Based on locale set
		//result.add(getAttributeValueWithSuperscript(attribute.getUnitFI()));
		return result;
	}
	
	@SuppressWarnings("unchecked")
    public List<Attribute> getAllAttibutesWithIdsSortedByDisplayOrder(List<Long> attributeIds) {
	    String sql = "FROM attribute a WHERE a.id IN (:attributeIds) ORDER BY a.displayOrder ASC";
	    Query query = entityManager.createQuery(sql);
	    query.setParameter("attributeIds", attributeIds);
	    return (List<Attribute>)query.getResultList();
	}
	
	/**
	 * Creates superscript for attribute passed. ONLY one superscript conversion is possible and that should be 2 or 3.
	 * @param value attribute unit as input
	 * @return String  
	 */
	private String getAttributeValueWithSuperscript(String value) {
		String superscriptSymbol = "^";
		if (value.contains(superscriptSymbol)) {
			String firstPart, secondPart, superscriptValue;
			int index = value.indexOf(superscriptSymbol);
			firstPart = value.substring(0, index);
			secondPart = value.substring(index+2, value.length());
			superscriptValue = value.substring(index+1, index+2);
			if (superscriptValue.equals("2")) {
				superscriptValue = "\u00b2";
			} else if (superscriptValue.equals("3")) {
				superscriptValue = "\u00b3";
			} else {
				//Nothing
			}
			value = firstPart + superscriptValue + secondPart;
		}
		return value;
	}
}
