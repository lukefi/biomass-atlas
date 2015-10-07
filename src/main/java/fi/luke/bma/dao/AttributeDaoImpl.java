package fi.luke.bma.dao;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import fi.luke.bma.model.Attribute;
import fi.rktl.common.service.BaseStoreLongIdEntityManager;

@Repository
@Transactional(propagation=Propagation.MANDATORY)
public class AttributeDaoImpl extends BaseStoreLongIdEntityManager<Attribute> implements AttributeDao{
	@PersistenceContext
	private EntityManager entityManager;
	
	@Override
	public Class<Attribute> getEntityClass() {
		return Attribute.class;
	}
	
	@Override
	public EntityManager getEntityManager() {
		return entityManager;
	}

	@Override
	public void setEntityManager(EntityManager entitymanager) {
		this.entityManager = entitymanager;
	}
}
