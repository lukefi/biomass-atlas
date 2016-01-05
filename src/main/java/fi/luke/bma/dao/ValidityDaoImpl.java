package fi.luke.bma.dao;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import fi.luke.bma.model.Attribute;
import fi.luke.bma.model.Validity;
import fi.rktl.common.service.BaseStoreLongIdEntityManager;

@Repository
@Transactional(propagation=Propagation.MANDATORY)
public class ValidityDaoImpl extends BaseStoreLongIdEntityManager<Validity> implements ValidityDao{
	@PersistenceContext
	private EntityManager entityManager;
	
	@Override
	public Class<Validity> getEntityClass() {
		return Validity.class;
	}
		
	@Override
	public EntityManager getEntityManager() {
		return entityManager;
	}

	@Override
	public void setEntityManager(EntityManager entitymanager) {
		this.entityManager = entitymanager;
	}

	@Override
	public Validity getLatest(long attributeId) {
		String jpql = "SELECT v FROM " + Validity.class.getName() + " v, " + Attribute.class.getName() + " a "
		        + "WHERE v.id = a.latestValidity.id AND a.id = " + attributeId;
		TypedQuery<Validity> query = entityManager.createQuery(jpql, Validity.class);
		return query.getSingleResult();
	}

}
