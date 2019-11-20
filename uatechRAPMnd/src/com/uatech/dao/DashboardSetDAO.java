package com.uatech.dao;
import java.util.ArrayList;

import javax.persistence.Query;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.uatech.dao.interfaces.IDAO;
import com.uatech.erp.entities.DashboardSet; 
  
@Repository
@Component("DashboardSetDAO") 
public class DashboardSetDAO implements IDAO<DashboardSet, Long> {

	@Autowired
	private SessionFactory sessionFactory;

	@Override
	public Long insert(DashboardSet t) {
		return (Long) sessionFactory.getCurrentSession().save(t);

	}

	@Override
	public boolean update(DashboardSet t) {
		
		boolean dResult = true;
		 try {
			sessionFactory.getCurrentSession().update(t);
		} catch (Exception e) { 
			dResult = false;
		}
		return dResult;

	}

	@Override
	public boolean persist(DashboardSet t) {
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
	public DashboardSet getFindById(Long k) {

		Query query = sessionFactory.getCurrentSession().createQuery("From DashboardSet where userId=?");
		if (k != null) {
			query = query.setParameter(0, k);
		} else
			return null;

		return (DashboardSet) query.getSingleResult();
	}

	@Override
	public ArrayList<DashboardSet> getAll() { 
		
		Query query = sessionFactory.getCurrentSession()
				.createNativeQuery("Select id,userId,departmentId,disciplineId, jobDescriptionId,permissionArea, permissionStatu,active,create_date, " + 
						"(SELECT department FROM  Department d where d.id=t.departmentId) dep, " + 
						"(SELECT description FROM  WirSetting w where w.id=t.disciplineId) dis, " + 
						"(SELECT jobDescription FROM  JobDescription j where j.id=t.jobDescriptionId) job, " + 
						"(SELECT username FROM  UserDefine u where u.id=t.userId) usee From DashboardSet t",
						DashboardSet.class);
		

		return (ArrayList<DashboardSet>) query.getResultList(); 
		
	}
	 
	
	@Override
	public ArrayList<DashboardSet> getResults(DashboardSet k) {
      
		Query query = sessionFactory.getCurrentSession().createQuery("From DashboardSet where " + //permissionArea=:p1 and  
				"(userId=:p2 or ((departmentId=:p3  and departmentId<>0)  " + 
				"or (disciplineId=:p4 and disciplineId<>0) " + 
				"or (jobDescriptionId=:p5 and jobDescriptionId<>0)))" );//
 
		query.setParameter("p2", k.getUserId());
		query.setParameter("p3", k.getDepartmentId());
		query.setParameter("p4", k.getDisciplineId());
		query.setParameter("p5", k.getJobDescriptionId()); 
		return (ArrayList<DashboardSet>) query.getResultList(); 
	}

	@Override
	public boolean delete(DashboardSet t) {
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
