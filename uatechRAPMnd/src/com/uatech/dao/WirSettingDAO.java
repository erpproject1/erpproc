package com.uatech.dao;
import java.util.ArrayList;

import javax.persistence.Query;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.uatech.dao.interfaces.IDAO;
import com.uatech.erp.entities.WirSetting;
  
@Repository
@Component("WirSettingDAO") 
public class WirSettingDAO implements IDAO<WirSetting, Long> {

	@Autowired
	private SessionFactory sessionFactory;

	@Override
	public Long insert(WirSetting t) {
		return (Long) sessionFactory.getCurrentSession().save(t);

	}

	@Override
	public boolean update(WirSetting t) {
		
		boolean dResult = true;
		/*try {
			sessionFactory.getCurrentSession().update(t);
		} catch (Exception e) {
			// TODO Loglama yapilacak
			dResult = false;
		}
		return dResult;*/
	   Query query = sessionFactory.getCurrentSession().createQuery("From WirSetting where description=:p1 and type=:p2");//

		query.setParameter("p1", t.getDescription());  
		query.setParameter("p2", t.getType());
		
		ArrayList<WirSetting> w= (ArrayList<WirSetting>) query.getResultList();
		if(!w.isEmpty()) {
			   
				t.setId(w.get(0).getId());
				try { 
					sessionFactory.getCurrentSession().merge(t);
				} catch (Exception e) {
					 
					dResult = false;
				}
		}else {insert(t);}
		
		return dResult; 

	}

	@Override
	public boolean persist(WirSetting t) {
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
	public WirSetting getFindById(Long k) {

		Query query = sessionFactory.getCurrentSession().createQuery("From WirSetting where id=:p1");
		if (k != null) {
			query = query.setParameter("p1", k);
		} else
			return null;

		return (WirSetting) query.getSingleResult();
	}

	@Override
	public ArrayList<WirSetting> getAll() { 
		
		Query query = sessionFactory.getCurrentSession().createQuery("From WirSetting where active=1 ");//
		

		return (ArrayList<WirSetting>) query.getResultList(); 
		
	}
	 
	
	@Override
	public ArrayList<WirSetting> getResults(WirSetting k) {
      
		Query query = sessionFactory.getCurrentSession().createQuery("From WirSetting where active=1 and type=:p1");//
		
		query.setParameter("p1", k.getType());
		return (ArrayList<WirSetting>) query.getResultList(); 
	}

	@Override
	public boolean delete(WirSetting t) {
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
