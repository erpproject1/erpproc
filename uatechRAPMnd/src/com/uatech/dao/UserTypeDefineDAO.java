package com.uatech.dao;
import java.util.ArrayList;

import javax.persistence.Query;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.uatech.dao.interfaces.IDAO;
import com.uatech.erp.entities.UserTypeDefine; 
  
@Repository
@Component("UserTypeDefineDAO") 
public class UserTypeDefineDAO implements IDAO<UserTypeDefine, Long> {

	@Autowired
	private SessionFactory sessionFactory;

	@Override
	public Long insert(UserTypeDefine t) {
		return (Long) sessionFactory.getCurrentSession().save(t);

	}

	@Override
	public boolean update(UserTypeDefine t) {
		
		boolean dResult = true;
		 try {
			sessionFactory.getCurrentSession().update(t);
		} catch (Exception e) { 
			dResult = false;
		}
		return dResult;

	}

	@Override
	public boolean persist(UserTypeDefine t) {
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
	public UserTypeDefine getFindById(Long k) {

		Query query = sessionFactory.getCurrentSession().createQuery("From UserTypeDefine where id=?");
		if (k != null) {
			query = query.setParameter(0, k);
		} else
			return null;

		return (UserTypeDefine) query.getSingleResult();
	}

	@Override
	public ArrayList<UserTypeDefine> getAll() { 
		
		Query query = sessionFactory.getCurrentSession().createQuery("From UserTypeDefine ");//
		

		return (ArrayList<UserTypeDefine>) query.getResultList(); 
		
	}
	 
	
	@Override
	public ArrayList<UserTypeDefine> getResults(UserTypeDefine k) {
      
		Query query = sessionFactory.getCurrentSession().createQuery("From UserTypeDefine  " );//
		
		query.setParameter(0, "");
		return (ArrayList<UserTypeDefine>) query.getResultList(); 
	}

	@Override
	public boolean delete(UserTypeDefine t) {
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
