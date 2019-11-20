package com.uatech.dao;
import java.util.ArrayList;

import javax.persistence.Query;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.uatech.dao.interfaces.IDAO; 
import com.uatech.erp.entities.UserFilterRuleRelation; 
  
@Repository
@Component("UserFilterRuleRelationDAO") 
public class UserFilterRuleRelationDAO implements IDAO<UserFilterRuleRelation, Long> {

	@Autowired
	private SessionFactory sessionFactory;

	@Override
	public Long insert(UserFilterRuleRelation t) {
		return (Long) sessionFactory.getCurrentSession().save(t);

	}

	@Override
	public boolean update(UserFilterRuleRelation t) {
		
		boolean dResult = true;
		try {
			sessionFactory.getCurrentSession().update(t);
		} catch (Exception e) {
			// TODO Loglama yapilacak
			dResult = false;
		}
		return dResult;
		 

	}

	@Override
	public boolean persist(UserFilterRuleRelation t) {
		boolean dResult = true;
		try {
			sessionFactory.getCurrentSession().persist(t);
		} catch (Exception e) {
			// TODO Loglama yapilacak
			dResult = false;
		}
		return dResult;

	}

	@Override
	public UserFilterRuleRelation getFindById(Long k) {

		Query query = sessionFactory.getCurrentSession().createQuery("From UserFilterRuleRelation where id=?");
		if (k != null) {
			query = query.setParameter(0, k);
		} else
			return null;

		return (UserFilterRuleRelation) query.getSingleResult();
	}

	@Override
	public ArrayList<UserFilterRuleRelation> getAll() { 
		
		Query query = sessionFactory.getCurrentSession().createQuery("From UserFilterRuleRelation   ");//
		

		return (ArrayList<UserFilterRuleRelation>) query.getResultList(); 
		
	}
	 
	
	@Override
	public ArrayList<UserFilterRuleRelation> getResults(UserFilterRuleRelation k) {
      
		 
		Query query  = sessionFactory.getCurrentSession().createQuery("From UserFilterRuleRelation where userTypeId=:a");//
		  query.setParameter("a", k.getUserTypeId());
	 
		return (ArrayList<UserFilterRuleRelation>) query.getResultList(); 
	}
	
	

	@Override
	public boolean delete(UserFilterRuleRelation t) {
		boolean dResult = true;
		try {
			sessionFactory.getCurrentSession().delete(t);
		} catch (Exception e) {
			// TODO Loglama yapilacak 
			dResult = false;
		}
		return dResult;
	}

}
