package fi.luke.bma.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import fi.luke.bma.dao.AttributeDao;
import fi.luke.bma.model.Attribute;

@Component
public class AttributeService {
	@Autowired
	private AttributeDao attributeDao;
		
	public List<String> getAttributeNameAndUnit(long attributeId){
		Attribute attribute = attributeDao.get(attributeId);
		List<String> result = new ArrayList<String>();
		result.add(attribute.getNameFI()); //TODO: Based on locale set
		result.add(attribute.getUnitFI());
		return result;
	}
}
