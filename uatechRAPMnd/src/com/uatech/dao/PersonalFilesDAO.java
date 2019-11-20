package com.uatech.dao;

import java.util.ArrayList;

import javax.persistence.Query;
 
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;
 
import com.uatech.dao.interfaces.IPersonalFilesDAO;
import com.uatech.erp.entities.PersonalFiles; 

@Repository
@Component("PersonalFilesDAO") 
public class PersonalFilesDAO implements IPersonalFilesDAO {

	@Autowired 
	private SessionFactory sessionFactory;

	@Override
	public Long insert(PersonalFiles t) {
		return (Long) sessionFactory.getCurrentSession().save(t);

	}

	@Override
	public boolean update(PersonalFiles t) {
        
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
	public boolean persist(PersonalFiles t) {
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
	public PersonalFiles getFindById(Long k) {

		Query query = sessionFactory.getCurrentSession().createQuery("From PersonalFiles where id=?");
		if (k != null) {
			query = query.setParameter(0, k);
		} else
			return null;

		return (PersonalFiles) query.getSingleResult();
	}

	@Override
	public ArrayList<PersonalFiles> getAll() { 
		
		Query query = sessionFactory.getCurrentSession().createQuery("From PersonalFiles");
		

		return (ArrayList<PersonalFiles>) query.getResultList(); 
		
	}
	
	 

	@Override
	public boolean delete(PersonalFiles t) {
		boolean dResult = true;
		try {
			sessionFactory.getCurrentSession().delete(t);
		} catch (Exception e) {
			// TODO Loglama yapilacak 
			dResult = false;
		}
		return dResult;
	}
	
	@Override
	public ArrayList<PersonalFiles> getPersonalFiles(PersonalFiles t) { 
		
		 
		Query query = sessionFactory.getCurrentSession().createQuery("From PersonalFiles Where active=1 and parityId=? and parityType=?");
		if (t != null) { 
			  query.setParameter(0, t.getParityId() ); 
			  query.setParameter(1, t.getParityType()); 
		} else
			return null;  

		return  (ArrayList<PersonalFiles>) query.getResultList();  
	}

	@Override
	public ArrayList<PersonalFiles> getResults(PersonalFiles k) {
		// TODO Auto-generated method stub
		return null;
	}

}
