package com.uatech.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.uatech.dao.interfaces.IDAO;
import com.uatech.erp.entities.UserAndTypeRelation;
import com.uatech.service.interfaces.IAccessDataLayerService;  

@Service
@Component("UserAndTypeRelationService") 
@Transactional
public class UserAndTypeRelationService implements IAccessDataLayerService<UserAndTypeRelation,Long> {

	 
	@Autowired
	@Qualifier("UserAndTypeRelationDAO")  
	IDAO<UserAndTypeRelation, Long> iDAO;    
	

	@Override 
	public Long insert(UserAndTypeRelation t) {   
		return iDAO.insert(t);      
	}

	@Override
	public boolean update(UserAndTypeRelation t) {
	 return  iDAO.update(t);    
		
	}

	@Override
	public boolean delete(UserAndTypeRelation t) {
		return  iDAO.delete(t); 
	} 
	
	@Override
	public boolean persist(UserAndTypeRelation t) {
		return iDAO.persist(t);   
		
	}

	@Override
	public UserAndTypeRelation getFindById(Long id) { 
		
		return iDAO.getFindById(id);      
	}

	@Override
	public ArrayList<UserAndTypeRelation> getAll() {
		
		return iDAO.getAll();    
	}
	 
	@Override
	public ArrayList<UserAndTypeRelation> getResults(UserAndTypeRelation id) { 
		return iDAO.getResults(id);  
	}

	

}
