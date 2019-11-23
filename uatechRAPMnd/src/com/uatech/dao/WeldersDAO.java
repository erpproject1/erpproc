package com.uatech.dao;

import java.util.ArrayList;

import javax.persistence.Query;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.uatech.dao.interfaces.IDAO;
import com.uatech.erp.entities.Welders;
@Repository
@Component("WeldersDAO")
public class WeldersDAO implements IDAO<Welders, Long> {

	@Autowired
	private SessionFactory sessionFactory;

	@Override
	public Long insert(Welders t) {
		return (Long) sessionFactory.getCurrentSession().save(t);

	}

	@Override
	public boolean update(Welders t) {
		boolean dResult = true;
		try {
			sessionFactory.getCurrentSession().update(t);
		} catch (Exception e) {
			// TODO Loglama yapilacak
			e.printStackTrace(); 
			dResult = false;
		}
		return dResult;
	}

	@Override
	public boolean persist(Welders t) {
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
	public Welders getFindById(Long k) {
		Query query = sessionFactory.getCurrentSession().createQuery("From Welders where id=?");
		if (k != null) {
			query = query.setParameter(0, k);
		} else
			return null;

		return (Welders) query.getSingleResult();
	}

	@Override
	public ArrayList<Welders> getAll() {

		Query query = sessionFactory.getCurrentSession().createQuery("From Welders");

		return (ArrayList<Welders>) query.getResultList(); 
	}

	@Override
	public ArrayList<Welders> getResults(Welders k) {
		Query query = sessionFactory.getCurrentSession().createQuery("From Welders where departmentId=?");
		if (k != null) {
			query = query.setParameter(0, k.getId());
		} else
			return null;

		return (ArrayList<Welders>)  query.getResultList(); 
	}

	@Override
	public boolean delete(Welders t) {
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
