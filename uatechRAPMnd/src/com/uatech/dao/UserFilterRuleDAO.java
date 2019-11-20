package com.uatech.dao;
import java.util.ArrayList;

import javax.persistence.Query;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.uatech.dao.interfaces.IDAO;
import com.uatech.erp.entities.UserFilterRule; 
  
@Repository
@Component("UserFilterRuleDAO") 
public class UserFilterRuleDAO implements IDAO<UserFilterRule, Long> {

	@Autowired
	private SessionFactory sessionFactory;

	@Override
	public Long insert(UserFilterRule t) {
		return (Long) sessionFactory.getCurrentSession().save(t);

	}

	@Override
	public boolean update(UserFilterRule t) {
		
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
	public boolean persist(UserFilterRule t) {
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
	public UserFilterRule getFindById(Long k) {

		Query query = sessionFactory.getCurrentSession().createQuery("From UserFilterRule where id=?");
		if (k != null) {
			query = query.setParameter(0, k);
		} else
			return null;

		return (UserFilterRule) query.getSingleResult();
	}

	@Override
	public ArrayList<UserFilterRule> getAll() { 
		
		Query query = sessionFactory.getCurrentSession().createQuery("From UserFilterRule   ");//
		

		return (ArrayList<UserFilterRule>) query.getResultList(); 
		
	}
	 
	
	@Override
	public ArrayList<UserFilterRule> getResults(UserFilterRule k) {
      
		String t=k.getFilType();
		Query query;
		if (t.equals("0")) {
			query = sessionFactory.getCurrentSession().createQuery("From UserFilterRule where utid=:a");//
			//query.setParameter("a", k.getUtid());
		}
		else {
			query = sessionFactory.getCurrentSession().createQuery("From UserFilterRule where utid=:a and filType=:b");//
			//query.setParameter("a", k.getUtid());
			query.setParameter("b",t);
		}
		
		return (ArrayList<UserFilterRule>) query.getResultList(); 
	}

	@Override
	public boolean delete(UserFilterRule t) {
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
