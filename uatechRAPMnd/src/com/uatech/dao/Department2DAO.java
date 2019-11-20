package com.uatech.dao;

import java.util.ArrayList;

import javax.persistence.Query;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.uatech.dao.interfaces.IDAO;
import com.uatech.erp.entities.Department2;

@Repository
@Component("Department2DAO")
public class Department2DAO implements IDAO<Department2, Long> {

	@Autowired
	private SessionFactory sessionFactory;

	@Override
	public Long insert(Department2 t) {
		return (Long) sessionFactory.getCurrentSession().save(t);

	}

	@Override
	public boolean update(Department2 t) {
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
	public boolean persist(Department2 t) {
		boolean dResult = true;
		try {
			sessionFactory.getCurrentSession().persist(t);
		} catch (Exception e) {
			
			dResult = false;
		}
		return dResult;
	}

	@Override
	public Department2 getFindById(Long k) {
		Query query = sessionFactory.getCurrentSession().createQuery("From Department2 where id=?");
		if (k != null) {
			query = query.setParameter(0, k);
		} else
			return null;

		return (Department2) query.getSingleResult();
	}

	@Override
	public ArrayList<Department2> getAll() {

		Query query = sessionFactory.getCurrentSession().createQuery("From Department2");

		return (ArrayList<Department2>) query.getResultList(); 
	}

	

	@Override
	public boolean delete(Department2 t) {
		boolean dResult = true;
		try {
			sessionFactory.getCurrentSession().delete(t);
		} catch (Exception e) {
			
			dResult = false;
		}
		return dResult;
	}

	@Override
	public ArrayList<Department2> getResults(Department2 t) {
		Query query = sessionFactory.getCurrentSession().createQuery("From Department2 where active = 1 order by upperDepartmentId,id"); 

		return (ArrayList<Department2>) query.getResultList(); 
	}

}
