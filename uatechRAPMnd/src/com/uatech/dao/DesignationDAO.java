package com.uatech.dao;

import java.util.ArrayList;

import javax.persistence.Query;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.uatech.dao.interfaces.IDAO;
import com.uatech.erp.entities.Designation;
@Repository
@Component("DesignationDAO")
public class DesignationDAO implements IDAO<Designation, Long> {

	@Autowired
	private SessionFactory sessionFactory;

	@Override
	public Long insert(Designation t) {
		return (Long) sessionFactory.getCurrentSession().save(t);

	}

	@Override
	public boolean update(Designation t) {
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
	public boolean persist(Designation t) {
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
	public Designation getFindById(Long k) {
		Query query = sessionFactory.getCurrentSession().createQuery("From Designation where id=?");
		if (k != null) {
			query = query.setParameter(0, k);
		} else
			return null;

		return (Designation) query.getSingleResult();
	}

	@Override
	public ArrayList<Designation> getAll() {

		Query query = sessionFactory.getCurrentSession().createQuery("From Designation");

		return (ArrayList<Designation>) query.getResultList(); 
	}

	@Override
	public ArrayList<Designation> getResults(Designation k) {
		Query query = sessionFactory.getCurrentSession().createQuery("From Designation where departmentId=?");
		if (k != null) {
			query = query.setParameter(0, k.getDepartmentId());
		} else
			return null;

		return (ArrayList<Designation>)  query.getResultList(); 
	}

	@Override
	public boolean delete(Designation t) {
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
