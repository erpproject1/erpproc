package com.uatech.dao;
import java.util.ArrayList;

import javax.persistence.Query;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.uatech.dao.interfaces.IDAO;
import com.uatech.erp.entities.T00301NonConformanceSet; 
  
@Repository
@Component("T00301NonConformanceSetDAO") 
public class T00301NonConformanceSetDAO implements IDAO<T00301NonConformanceSet, Long> {

	@Autowired
	private SessionFactory sessionFactory;

	@Override
	public Long insert(T00301NonConformanceSet t) {
		return (Long) sessionFactory.getCurrentSession().save(t);

	}

	@Override
	public boolean update(T00301NonConformanceSet t) {
		
		boolean dResult = true;
		 try {
			sessionFactory.getCurrentSession().update(t);
		} catch (Exception e) { 
			dResult = false;
		}
		return dResult;

	}

	@Override
	public boolean persist(T00301NonConformanceSet t) {
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
	public T00301NonConformanceSet getFindById(Long k) {

		Query query = sessionFactory.getCurrentSession().createQuery("From T00301NonConformanceSet where userId=?");
		if (k != null) {
			query = query.setParameter(0, k);
		} else
			return null;

		return (T00301NonConformanceSet) query.getSingleResult();
	}

	@Override
	public ArrayList<T00301NonConformanceSet> getAll() { 
		
		Query query = sessionFactory.getCurrentSession()
				.createNativeQuery("Select id,userId,departmentId,disciplineId, jobDescriptionId,permissionArea, permissionStatu,active,create_date, " + 
						"(SELECT department FROM  Department d where d.id=t.departmentId) dep, " + 
						"(SELECT description FROM  WirSetting w where w.id=t.disciplineId) dis, " + 
						"(SELECT jobDescription FROM  JobDescription j where j.id=t.jobDescriptionId) job, " + 
						"(SELECT username FROM  UserDefine u where u.id=t.userId) usee From T00301NonConformanceSet t",
						T00301NonConformanceSet.class);
		

		return (ArrayList<T00301NonConformanceSet>) query.getResultList(); 
		
	}
	 
	
	@Override
	public ArrayList<T00301NonConformanceSet> getResults(T00301NonConformanceSet k) {
      
		Query query = sessionFactory.getCurrentSession().createQuery("From T00301NonConformanceSet where " + //permissionArea=:p1 and  
				"(userId=:p2 or ((departmentId=:p3  and departmentId<>0)  " + 
				"or (disciplineId=:p4 and disciplineId<>0) " + 
				"or (jobDescriptionId=:p5 and jobDescriptionId<>0)))" );//
 
		query.setParameter("p2", k.getUserId());
		query.setParameter("p3", k.getDepartmentId());
		query.setParameter("p4", k.getDisciplineId());
		query.setParameter("p5", k.getJobDescriptionId()); 
		return (ArrayList<T00301NonConformanceSet>) query.getResultList(); 
	}

	@Override
	public boolean delete(T00301NonConformanceSet t) {
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
