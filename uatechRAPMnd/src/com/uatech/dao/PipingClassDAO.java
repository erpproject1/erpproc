package com.uatech.dao;

import java.util.ArrayList;

import javax.persistence.Query;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.uatech.dao.interfaces.IDAO;
import com.uatech.erp.entities.PipingClass;
@Repository
@Component("PipingClassDAO")
public class PipingClassDAO implements IDAO<PipingClass, Long> {

	@Autowired
	private SessionFactory sessionFactory;

	@Override
	public Long insert(PipingClass t) {
		return (Long) sessionFactory.getCurrentSession().save(t);

	}

	@Override
	public boolean update(PipingClass t) {
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
	public boolean persist(PipingClass t) {
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
	public PipingClass getFindById(Long k) {
		Query query = sessionFactory.getCurrentSession().createQuery("From PipingClass where id=?");
		if (k != null) {
			query = query.setParameter(0, k);
		} else
			return null;

		return (PipingClass) query.getSingleResult();
	}

	@Override
	public ArrayList<PipingClass> getAll() {

		Query query = sessionFactory.getCurrentSession().createQuery("From PipingClass");

		return (ArrayList<PipingClass>) query.getResultList(); 
	}

	@Override
	public ArrayList<PipingClass> getResults(PipingClass k) {
		Query query = sessionFactory.getCurrentSession().createQuery("From PipingClass where departmentId=?");
		if (k != null) {
			query = query.setParameter(0, k.getId());
		} else
			return null;

		return (ArrayList<PipingClass>)  query.getResultList(); 
	}

	@Override
	public boolean delete(PipingClass t) {
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
