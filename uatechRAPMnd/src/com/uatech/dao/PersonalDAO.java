package com.uatech.dao;

import java.util.ArrayList;

import javax.persistence.Query;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.uatech.dao.interfaces.IDAO;
import com.uatech.erp.entities.Personal;

@Repository
@Component("PersonalDAO") 
public class PersonalDAO implements IDAO<Personal, Long> {

	@Autowired
	private SessionFactory sessionFactory;

	@Override
	public Long insert(Personal t) {
		return (Long) sessionFactory.getCurrentSession().save(t);

	}

	@Override
	public boolean update(Personal t) {

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
	public boolean persist(Personal t) {
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
	public Personal getFindById(Long k) {

		Query query = sessionFactory.getCurrentSession().createQuery("From Personal where id=?");
		if (k != null) {
			query = query.setParameter(0, k);
		} else
			return null;

		return (Personal) query.getSingleResult();
	}

	@Override
	public ArrayList<Personal> getAll() { 
		
		Query query = sessionFactory.getCurrentSession().createQuery("From Personal where active=1");
		

		return (ArrayList<Personal>) query.getResultList(); 
		
	}
	
	
	@Override
	public ArrayList<Personal> getResults(Personal k) {
				
		Query query = sessionFactory.getCurrentSession().createQuery("From Personal where active=1 and id not in (SELECT personalId FROM UserDefine where active=1)"); 
		return (ArrayList<Personal>) query.getResultList(); 
	}

	@Override
	public boolean delete(Personal t) {
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
