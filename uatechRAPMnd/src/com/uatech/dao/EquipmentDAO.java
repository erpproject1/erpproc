package com.uatech.dao;

import java.util.ArrayList;

import javax.persistence.Query;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.uatech.dao.interfaces.IDAO;
import com.uatech.erp.entities.Equipment;
@Repository
@Component("EquipmentDAO")
public class EquipmentDAO implements IDAO<Equipment, Long> {

	@Autowired
	private SessionFactory sessionFactory;

	@Override
	public Long insert(Equipment t) {
		return (Long) sessionFactory.getCurrentSession().save(t);

	}

	@Override
	public boolean update(Equipment t) {
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
	public boolean persist(Equipment t) {
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
	public Equipment getFindById(Long k) {
		Query query = sessionFactory.getCurrentSession().createQuery("From Equipment where id=?");
		if (k != null) {
			query = query.setParameter(0, k);
		} else
			return null;

		return (Equipment) query.getSingleResult();
	}

	@Override
	public ArrayList<Equipment> getAll() {

		Query query = sessionFactory.getCurrentSession().createQuery("From Equipment");

		return (ArrayList<Equipment>) query.getResultList(); 
	}

	@Override
	public ArrayList<Equipment> getResults(Equipment k) {
		Query query = sessionFactory.getCurrentSession().createQuery("From Equipment where departmentId=?");
		if (k != null) {
			query = query.setParameter(0, k.getId());
		} else
			return null;

		return (ArrayList<Equipment>)  query.getResultList(); 
	}

	@Override
	public boolean delete(Equipment t) {
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
