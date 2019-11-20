package com.uatech.dao;

import java.util.ArrayList;

import javax.persistence.Query;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.uatech.dao.interfaces.IDAO;
import com.uatech.erp.entities.T0027ViolationType; 

@Repository
@Component("T0027ViolationTypeDAO")  
public class T0027ViolationTypeDOA implements IDAO<T0027ViolationType, Long> {

	@Autowired
	private SessionFactory sessionFactory;

	@Override
	public Long insert(T0027ViolationType t) {
		return (Long) sessionFactory.getCurrentSession().save(t);

	}

	@Override
	public boolean update(T0027ViolationType t) {

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
	public boolean persist(T0027ViolationType t) {
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
	public T0027ViolationType getFindById(Long k) {

		Query query = sessionFactory.getCurrentSession().createQuery("From T0027ViolationType where id=?");
		if (k != null) {
			query = query.setParameter(0, k);
		} else
			return null;

		return (T0027ViolationType) query.getSingleResult();
	}

	@Override
	public ArrayList<T0027ViolationType> getAll() { 
		
		Query query = sessionFactory.getCurrentSession().createQuery("From T0027ViolationType ");
		

		return (ArrayList<T0027ViolationType>) query.getResultList(); 
		
	}
	
	
	@Override
	public ArrayList<T0027ViolationType> getResults(T0027ViolationType k) {
		
		Query query = sessionFactory.getCurrentSession().createQuery("From T0027ViolationType  ");
		if (k != null) {
			//query = query.setParameter("id", k.getItpListId());
		} else return null;
		
		return (ArrayList<T0027ViolationType>) query.getResultList(); 
	}

	@Override
	public boolean delete(T0027ViolationType t) {
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
