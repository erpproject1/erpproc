package com.uatech.dao;

import java.util.ArrayList;

import javax.persistence.Query;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.uatech.dao.interfaces.IDAO;
import com.uatech.erp.entities.CheckList;
@Repository
@Component("CheckListDAO")
public class CheckListDAO implements IDAO<CheckList, Long> {

	@Autowired
	private SessionFactory sessionFactory;

	@Override
	public Long insert(CheckList t) {
		return (Long) sessionFactory.getCurrentSession().save(t);

	}

	@Override
	public boolean update(CheckList t) {
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
	public boolean persist(CheckList t) {
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
	public CheckList getFindById(Long k) {
		Query query = sessionFactory.getCurrentSession().createQuery("From CheckList where id=?");
		if (k != null) {
			query = query.setParameter(0, k);
		} else
			return null;

		return (CheckList) query.getSingleResult();
	}

	@Override
	public ArrayList<CheckList> getAll() {

		Query query = sessionFactory.getCurrentSession().createQuery("From CheckList");

		return (ArrayList<CheckList>) query.getResultList(); 
	}

	@Override
	public ArrayList<CheckList> getResults(CheckList k) {
		Query query = sessionFactory.getCurrentSession().createQuery("From CheckList where departmentId=?");
		if (k != null) {
			query = query.setParameter(0, k.getId());
		} else
			return null;

		return (ArrayList<CheckList>)  query.getResultList(); 
	}

	@Override
	public boolean delete(CheckList t) {
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
