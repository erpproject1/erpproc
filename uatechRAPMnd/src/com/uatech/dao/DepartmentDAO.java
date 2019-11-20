package com.uatech.dao;

import java.util.ArrayList;

import javax.persistence.Query;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.uatech.dao.interfaces.IDAO;
import com.uatech.erp.entities.Department;
@Repository
@Component("DepartmentDAO")
public class DepartmentDAO implements IDAO<Department, Long> {

	@Autowired
	private SessionFactory sessionFactory;

	@Override
	public Long insert(Department t) {
		return (Long) sessionFactory.getCurrentSession().save(t);

	}

	@Override
	public boolean update(Department t) {
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
	public boolean persist(Department t) {
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
	public Department getFindById(Long k) {
		Query query = sessionFactory.getCurrentSession().createQuery("From Department where id=?");
		if (k != null) {
			query = query.setParameter(0, k);
		} else
			return null;

		return (Department) query.getSingleResult();
	}

	@Override
	public ArrayList<Department> getAll() {

		Query query = sessionFactory.getCurrentSession().createQuery("From Department");

		return (ArrayList<Department>) query.getResultList(); 
	}

	@Override
	public ArrayList<Department> getResults(Department k) {
		// TODO Auto-generated method stub
		Query query=null;
		if (k != null) {
			if(k.getId()==0)
			{
				query = sessionFactory.getCurrentSession().createQuery("From T0034TransmittalLog where department=? ");
			
				query = query.setParameter(0,k.getDepartment()); 
			}
 	
		} else return null;
		
		return (ArrayList<Department>) query.getResultList(); 
	}

	@Override
	public boolean delete(Department t) {
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
