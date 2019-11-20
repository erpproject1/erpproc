package com.uatech.dao;

import java.util.ArrayList;

import javax.persistence.Query;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.uatech.dao.interfaces.IDAO;
import com.uatech.erp.entities.JobDescription;
@Repository
@Component("JobDescriptionDAO")
public class JobDescriptionDAO implements IDAO<JobDescription, Long> {

	@Autowired
	private SessionFactory sessionFactory;

	@Override
	public Long insert(JobDescription t) {
		return (Long) sessionFactory.getCurrentSession().save(t);

	}

	@Override
	public boolean update(JobDescription t) {
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
	public boolean persist(JobDescription t) {
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
	public JobDescription getFindById(Long k) {
		Query query = sessionFactory.getCurrentSession().createQuery("From JobDescription where id=:p1");
		if (k != null) {
			query = query.setParameter("p1", k);
		} else
			return null;

		return (JobDescription) query.getSingleResult();
	}

	@Override
	public ArrayList<JobDescription> getAll() {

		Query query = sessionFactory.getCurrentSession().createQuery("From JobDescription");

		return (ArrayList<JobDescription>) query.getResultList(); 
	}

	@Override
	public ArrayList<JobDescription> getResults(JobDescription k) {
		Query query = sessionFactory.getCurrentSession().createQuery("From JobDescription where departmentId=:p1");
		if (k != null) {
			query = query.setParameter("p1", k.getDepartmentId());
		} else
			return null;

		return (ArrayList<JobDescription>) query.getResultList();
	}

	@Override
	public boolean delete(JobDescription t) {
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
