package com.uatech.dao;

import java.util.ArrayList;

import javax.persistence.Query;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;
 
import com.uatech.dao.interfaces.IT00301NonConformanceDAO;
import com.uatech.erp.entities.T00301NonConformance; 

@Repository
@Component("T00301NonConformanceDAO")  
public class T00301NonConformanceDAO implements IT00301NonConformanceDAO  {

	@Autowired
	private SessionFactory sessionFactory;

	@Override
	public Long insert(T00301NonConformance t) {
		return (Long) sessionFactory.getCurrentSession().save(t);

	}

	@Override
	public boolean update(T00301NonConformance t) {

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
	public boolean persist(T00301NonConformance t) {
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
	public T00301NonConformance getFindById(Long k) {

		Query query = sessionFactory.getCurrentSession().createQuery("From T00301NonConformance where id=:a");
		if (k != null) {
			query = query.setParameter("a", k);
		} else
			return null;

		return (T00301NonConformance) query.getSingleResult();
	}
	
  

	public ArrayList<T00301NonConformance> getResults(Long k1,Long k2,Long k3,Long k4) {
		
		Query query = sessionFactory.getCurrentSession().createNativeQuery("Select * FROM  T00301NonConformance t, " + 
				"(Select * From T00301NonConformanceSet where " + 
				"(userId=:p1 or ((departmentId=:p2  and departmentId<>0)  " + 
				"or (disciplineId=:p3 and disciplineId<>0) " + 
				"or (jobDescriptionId=:p4 and jobDescriptionId<>0))) ) t2 " + 
				"where t.step=t2.permissionArea",T00301NonConformance.class);

		  query.setParameter("p1", k1);
		  query.setParameter("p2", k2);
		  query.setParameter("p3", k3);
		  query.setParameter("p4", k4);
		 
		
		return (ArrayList<T00301NonConformance>) query.getResultList(); 
	}


	@Override
	public ArrayList<T00301NonConformance> getAll() { 
		
		Query query = sessionFactory.getCurrentSession().createQuery("From T00301NonConformance where active=1");
		

		return (ArrayList<T00301NonConformance>) query.getResultList(); 
		
	}
	
	
	@Override
	public ArrayList<T00301NonConformance> getResults(T00301NonConformance k) {
		
		Query query = sessionFactory.getCurrentSession().createQuery("From T00301NonConformance   ");
		if (k != null) {
			//query = query.setParameter("id", k.getItpListId());
		} else return null;
		
		return (ArrayList<T00301NonConformance>) query.getResultList(); 
	}

	@Override
	public boolean delete(T00301NonConformance t) {
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
