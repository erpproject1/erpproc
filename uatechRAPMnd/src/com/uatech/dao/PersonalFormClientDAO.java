package com.uatech.dao;

import java.util.ArrayList;

import javax.persistence.Query;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.uatech.dao.interfaces.IDAO; 
import com.uatech.erp.entities.PersonalFormClient;

@Repository
@Component("PersonalFormClientDAO") 
public class PersonalFormClientDAO implements IDAO<PersonalFormClient, Long> {

	@Autowired
	private SessionFactory sessionFactory;

	@Override
	public Long insert(PersonalFormClient t) {
		return (Long) sessionFactory.getCurrentSession().save(t);

	}

	@Override
	public boolean update(PersonalFormClient t) {

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
	public boolean persist(PersonalFormClient t) {
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
	public PersonalFormClient getFindById(Long k) {

		Query query = sessionFactory.getCurrentSession().createQuery("From PersonalFormClient where id=?");
		if (k != null) {
			query = query.setParameter(0, k);
		} else
			return null;

		return (PersonalFormClient) query.getSingleResult();
	}

	@Override
	public ArrayList<PersonalFormClient> getAll() { 
		
		Query query = sessionFactory.getCurrentSession().createQuery("From PersonalFormClient where active=1");
		

		return (ArrayList<PersonalFormClient>) query.getResultList(); 
		
	}
	
	
	@Override
	public ArrayList<PersonalFormClient> getResults(PersonalFormClient k) {
		
		Query query = sessionFactory.getCurrentSession().createQuery("From PersonalFormClient where active=1 and departmentId=(select w.value from WirSetting w where w.type='IRS' and description=?) ");
		if (k != null) {
			query = query.setParameter(0, k.getName());
		} else
			return null;

		return (ArrayList<PersonalFormClient>) query.getResultList(); 
	}

	@Override
	public boolean delete(PersonalFormClient t) {
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
