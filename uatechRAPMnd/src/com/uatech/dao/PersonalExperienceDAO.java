package com.uatech.dao;

import java.util.ArrayList;

import javax.persistence.Query;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.uatech.dao.interfaces.IDAO;
import com.uatech.erp.entities.PersonalExperience;

@Repository
@Component("PersonalExperienceDAO") 
public class PersonalExperienceDAO implements IDAO<PersonalExperience, Long> {

	@Autowired
	private SessionFactory sessionFactory;

	@Override
	public Long insert(PersonalExperience t) {
		return (Long) sessionFactory.getCurrentSession().save(t);

	}

	@Override
	public boolean update(PersonalExperience t) {

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
	public boolean persist(PersonalExperience t) {
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
	public PersonalExperience getFindById(Long k) {

		Query query = sessionFactory.getCurrentSession().createQuery("From PersonalExperience where id=?");
		if (k != null) {
			query = query.setParameter(0, k);
		} else
			return null;

		return (PersonalExperience) query.getSingleResult();
	}

	@Override
	public ArrayList<PersonalExperience> getAll() { 
		
		Query query = sessionFactory.getCurrentSession().createQuery("From PersonalExperience");
		

		return (ArrayList<PersonalExperience>) query.getResultList(); 
		
	}
	
	
	@Override
	public ArrayList<PersonalExperience> getResults(PersonalExperience k) {
		Query query = sessionFactory.getCurrentSession().createQuery("From PersonalExperience where PersonalId=?");
		if (k != null) {
			query = query.setParameter(0, k.getPersonalId());
		} else
			return null;

		return (ArrayList<PersonalExperience>)  query.getResultList();
	}

	@Override
	public boolean delete(PersonalExperience t) {
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
