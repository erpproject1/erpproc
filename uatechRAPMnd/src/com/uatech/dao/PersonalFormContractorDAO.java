package com.uatech.dao;

import java.util.ArrayList;

import javax.persistence.Query;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.uatech.dao.interfaces.IDAO;
import com.uatech.erp.entities.PersonalFormContractor;

@Repository
@Component("PersonalFormContractorDAO") 
public class PersonalFormContractorDAO implements IDAO<PersonalFormContractor, Long> {

	@Autowired
	private SessionFactory sessionFactory;

	@Override
	public Long insert(PersonalFormContractor t) {
		return (Long) sessionFactory.getCurrentSession().save(t);

	}

	@Override
	public boolean update(PersonalFormContractor t) {

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
	public boolean persist(PersonalFormContractor t) {
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
	public PersonalFormContractor getFindById(Long k) {

		Query query = sessionFactory.getCurrentSession().createQuery("From PersonalFormContractor where id=?");
		if (k != null) {
			query = query.setParameter(0, k);
		} else
			return null;

		return (PersonalFormContractor) query.getSingleResult();
	}

	@Override
	public ArrayList<PersonalFormContractor> getAll() { 
		
		Query query = sessionFactory.getCurrentSession().createQuery("From PersonalFormContractor where active=1");
		

		return (ArrayList<PersonalFormContractor>) query.getResultList(); 
		
	}
	
	
	@Override
	public ArrayList<PersonalFormContractor> getResults(PersonalFormContractor k) {
		Query query = sessionFactory.getCurrentSession().createQuery("From PersonalFormContractor where active=1 and departmentId=(select w.value from WirSetting w where w.type='IRS' and description=?) ");
		if (k != null) {
			query = query.setParameter(0, k.getName());
		} else
			return null;

		return (ArrayList<PersonalFormContractor>) query.getResultList(); 
	}

	@Override
	public boolean delete(PersonalFormContractor t) {
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
