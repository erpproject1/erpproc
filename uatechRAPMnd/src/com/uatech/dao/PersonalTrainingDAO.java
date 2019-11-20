package com.uatech.dao;

import java.util.ArrayList;

import javax.persistence.Query;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.uatech.dao.interfaces.IPersonalTrainingDAO;
import com.uatech.erp.entities.PersonalTraining;

@Repository
@Component("PersonalTrainingDAO") 
public class PersonalTrainingDAO implements IPersonalTrainingDAO<PersonalTraining, Long> {

	@Autowired 
	private SessionFactory sessionFactory;

	@Override
	public Long insert(PersonalTraining t) {
		return (Long) sessionFactory.getCurrentSession().save(t);

	}

	@Override
	public boolean update(PersonalTraining t) {

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
	public boolean persist(PersonalTraining t) {
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
	public PersonalTraining getFindById(Long k) {

		Query query = sessionFactory.getCurrentSession().createQuery("From PersonalTraining where id=?");
		if (k != null) {
			query = query.setParameter(0, k);
		} else
			return null;

		return (PersonalTraining) query.getSingleResult();
	}
	
	@Override
	public ArrayList<PersonalTraining> getFindByIdAll(Long k) {

		Query query = sessionFactory.getCurrentSession().createQuery("From PersonalTraining where personalId=?");
		if (k != null) {
			query = query.setParameter(0, k);
		} else
			return null;

		return (ArrayList<PersonalTraining>) query.getResultList(); 
	}

	@Override
	public ArrayList<PersonalTraining> getAll() { 
		
		Query query = sessionFactory.getCurrentSession().createQuery("From PersonalTraining");
		

		return (ArrayList<PersonalTraining>) query.getResultList(); 
		
	}
	
	
	@Override
	public ArrayList<PersonalTraining> getResults(PersonalTraining k) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean delete(PersonalTraining t) {
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
