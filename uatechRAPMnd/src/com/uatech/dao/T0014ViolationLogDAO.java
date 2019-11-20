package com.uatech.dao;

import java.util.ArrayList;

import javax.persistence.Query;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.uatech.dao.interfaces.IDAO;
import com.uatech.erp.entities.T0014ViolationLog; 

@Repository
@Component("T0014ViolationLogDAO")  
public class T0014ViolationLogDAO implements IDAO<T0014ViolationLog, Long> {

	@Autowired
	private SessionFactory sessionFactory;

	@Override
	public Long insert(T0014ViolationLog t) {
		return (Long) sessionFactory.getCurrentSession().save(t);

	}

	@Override
	public boolean update(T0014ViolationLog t) {

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
	public boolean persist(T0014ViolationLog t) {
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
	public T0014ViolationLog getFindById(Long k) {

		Query query = sessionFactory.getCurrentSession().createQuery("From T0014ViolationLog where id=?");
		if (k != null) {
			query = query.setParameter(0, k);
		} else
			return null;

		return (T0014ViolationLog) query.getSingleResult();
	}

	@Override
	public ArrayList<T0014ViolationLog> getAll() { 
		
		Query query = sessionFactory.getCurrentSession().createQuery("From T0014ViolationLog  where active=true order by violationCode,violationNo");
		

		return (ArrayList<T0014ViolationLog>) query.getResultList(); 
		
	}
	
	
	@Override
	public ArrayList<T0014ViolationLog> getResults(T0014ViolationLog k) {
		
		Query query = sessionFactory.getCurrentSession().createQuery("From T0014ViolationLog where  active=true and violationCode=? order by violationNo desc");
		if (k != null) {
		query = query.setParameter(0,k.getViolationCode()); 
		} else return null;
		
		return (ArrayList<T0014ViolationLog>) query.getResultList(); 
	}

	@Override
	public boolean delete(T0014ViolationLog t) {
		boolean dResult = true;
		t.setActive(false);  
		try {
			sessionFactory.getCurrentSession().update(t); 
		} catch (Exception e) {
			// TODO Loglama yapilacak 
			dResult = false;
		}
		return dResult;
	}

}
