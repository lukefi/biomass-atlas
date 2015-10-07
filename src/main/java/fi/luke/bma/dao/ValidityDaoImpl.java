package fi.luke.bma.dao;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

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
	public Validity getLatest() {
		String sql = "SELECT v FROM Validity v WHERE v.startDate = (SELECT MAX(v.startDate) FROM Validity v)";
		TypedQuery<Validity> query = entityManager.createQuery(sql, Validity.class);
		return query.getSingleResult();
	}

}
