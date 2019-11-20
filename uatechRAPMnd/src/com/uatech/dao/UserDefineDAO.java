package com.uatech.dao;

import java.util.ArrayList;

import javax.persistence.Query;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;
 
import com.uatech.dao.interfaces.IUserDefineDAO;
import com.uatech.erp.entities.UserDefine;  

@Repository
@Component("UserDefineDAO")  
public class UserDefineDAO implements IUserDefineDAO  {

	@Autowired
	private SessionFactory sessionFactory;

	@Override
	public Long insert(UserDefine t) {
		return (Long) sessionFactory.getCurrentSession().save(t);

	}

	@Override
	public boolean update(UserDefine t) {

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
	public boolean persist(UserDefine t) {
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
	public UserDefine getFindById(Long k) {

		Query query = sessionFactory.getCurrentSession().createQuery("From UserDefine where id=:a");
		if (k != null) {
			query = query.setParameter("a", k);
		} else
			return null;

		return (UserDefine) query.getSingleResult();
	}
	
	 
	public UserDefine getFindByPersonaId(Long k) {

		Query query = sessionFactory.getCurrentSession().createQuery("From UserDefine where personalId=:a");
		if (k != null) {
			query = query.setParameter("a", k);
		} else
			return null;

		return (UserDefine) query.getSingleResult();
	}
	
	public UserDefine getFindByUserAndPass(UserDefine u) {

	   	Query query = sessionFactory.getCurrentSession().createQuery("From UserDefine where active=1 and username=:a and pass=:b");
		 query = query.setParameter("a", u.getUsername());
		 query = query.setParameter("b", u.getPass());
		 
		 
       try {

    	   return (UserDefine) query.getSingleResult();
	    } catch (Exception e) {
		 return null;
	   }
	 	 
	}

	public ArrayList<UserDefine> getFindByUser(String u) {

	  u=" From UserDefine where active=1 and personalId in (select id From Personal where active=1 "+u+")  ";//and id not in (select userId From UserAndTypeRelation)
	  Query query = sessionFactory.getCurrentSession().createQuery(u);
		  
		 
       try {

    	   return  (ArrayList<UserDefine>) query.getResultList();
	    } catch (Exception e) {
		 return null;
	   }
	 	 
	}

	
	@Override
	public ArrayList<UserDefine> getAll() { 
		
		Query query = sessionFactory.getCurrentSession().createQuery("From UserDefine where active=1");
		

		return (ArrayList<UserDefine>) query.getResultList(); 
		
	}
	
	
	@Override
	public ArrayList<UserDefine> getResults(UserDefine k) {
		
		Query query = sessionFactory.getCurrentSession().createQuery("From UserDefine   ");
		if (k != null) {
			//query = query.setParameter("id", k.getItpListId());
		} else return null;
		
		return (ArrayList<UserDefine>) query.getResultList(); 
	}

	@Override
	public boolean delete(UserDefine t) {
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
