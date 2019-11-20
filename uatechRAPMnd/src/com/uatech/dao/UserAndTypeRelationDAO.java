package com.uatech.dao;
import java.util.ArrayList;

import javax.persistence.Query;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.uatech.dao.interfaces.IDAO;
import com.uatech.erp.entities.UserAndTypeRelation; 
  
@Repository
@Component("UserAndTypeRelationDAO") 
public class UserAndTypeRelationDAO implements IDAO<UserAndTypeRelation, Long> {

	@Autowired
	private SessionFactory sessionFactory;

	@Override
	public Long insert(UserAndTypeRelation t) {
		return (Long) sessionFactory.getCurrentSession().save(t);

	}

	@Override
	public boolean update(UserAndTypeRelation t) {
		
		boolean dResult = true;
		 try {
			sessionFactory.getCurrentSession().update(t);
		} catch (Exception e) { 
			dResult = false;
		}
		return dResult;

	}

	@Override
	public boolean persist(UserAndTypeRelation t) {
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
	public UserAndTypeRelation getFindById(Long k) {

		Query query = sessionFactory.getCurrentSession().createQuery("From UserAndTypeRelation where userId=:a");
		if (k != null) {
			query = query.setParameter("a", k);
		} else
			return null;

		return (UserAndTypeRelation) query.getSingleResult();
	}

	@Override
	public ArrayList<UserAndTypeRelation> getAll() { 
		
		Query query = sessionFactory.getCurrentSession().createQuery("From UserAndTypeRelation ");//
		

		return (ArrayList<UserAndTypeRelation>) query.getResultList(); 
		
	}
	 
	
	@Override
	public ArrayList<UserAndTypeRelation> getResults(UserAndTypeRelation k) {
      
		Query query = sessionFactory.getCurrentSession().createQuery("From UserAndTypeRelation where userId=:a  " );//
		
		query.setParameter("a", k.getUserId());
		return (ArrayList<UserAndTypeRelation>) query.getResultList(); 
	}

	@Override
	public boolean delete(UserAndTypeRelation t) {
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
