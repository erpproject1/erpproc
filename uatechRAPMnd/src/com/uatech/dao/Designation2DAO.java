package com.uatech.dao;

import java.util.ArrayList;

import javax.persistence.Query;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.uatech.dao.interfaces.IDAO;
import com.uatech.erp.entities.Designation2;
@Repository
@Component("Designation2DAO")
public class Designation2DAO implements IDAO<Designation2, Long> {

	@Autowired
	private SessionFactory sessionFactory;

	@Override
	public Long insert(Designation2 t) {
		return (Long) sessionFactory.getCurrentSession().save(t);

	}

	@Override
	public boolean update(Designation2 t) {
		boolean dResult = true;
		try {
			sessionFactory.getCurrentSession().update(t);
		} catch (Exception e) {
			
			e.printStackTrace(); 
			dResult = false;
		}
		return dResult;
	}

	@Override
	public boolean persist(Designation2 t) {
		boolean dResult = true;
		try {
			sessionFactory.getCurrentSession().persist(t);
		} catch (Exception e) {
		
			dResult = false;
		}
		return dResult;
	}

	@Override
	public Designation2 getFindById(Long k) {
		Query query = sessionFactory.getCurrentSession().createQuery("From Designation2 where id=?");
		if (k != null) {
			query = query.setParameter(0, k);
		} else
			return null;

		return (Designation2) query.getSingleResult();
	}

	@Override
	public ArrayList<Designation2> getAll() {

		Query query = sessionFactory.getCurrentSession().createQuery("From Designation2");

		return (ArrayList<Designation2>) query.getResultList(); 
	}

	@Override
	public ArrayList<Designation2> getResults(Designation2 k) {
		Query query = sessionFactory.getCurrentSession().createQuery("From Designation2 where active=1");		

		return (ArrayList<Designation2>)  query.getResultList(); 
	}

	@Override
	public boolean delete(Designation2 t) {
		boolean dResult = true;
		try {
			sessionFactory.getCurrentSession().delete(t);
		} catch (Exception e) {
		
			dResult = false;
		}
		return dResult;
	}

}
