package com.uatech.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.uatech.dao.interfaces.IDAO; 
import com.uatech.erp.entities.UserFilterRuleRelation;
import com.uatech.service.interfaces.IAccessDataLayerService;  

@Service
@Component("UserFilterRuleRelationService") 
@Transactional
public class UserFilterRuleRelationService implements IAccessDataLayerService<UserFilterRuleRelation,Long> {

	 
	@Autowired
	@Qualifier("UserFilterRuleRelationDAO")  
	IDAO<UserFilterRuleRelation, Long> iDAO;    
	

	@Override 
	public Long insert(UserFilterRuleRelation t) {   
		return iDAO.insert(t);      
	}

	@Override
	public boolean update(UserFilterRuleRelation t) {
	 return  iDAO.update(t);    
		
	}

	@Override
	public boolean delete(UserFilterRuleRelation t) {
		return  iDAO.delete(t); 
	} 
	
	@Override
	public boolean persist(UserFilterRuleRelation t) {
		return iDAO.persist(t);   
		
	}

	@Override
	public UserFilterRuleRelation getFindById(Long id) { 
		
		return iDAO.getFindById(id);      
	}

	@Override
	public ArrayList<UserFilterRuleRelation> getAll() {
		
		return iDAO.getAll();    
	}
	
 
	 
	@Override
	public ArrayList<UserFilterRuleRelation> getResults(UserFilterRuleRelation id) { 
		return iDAO.getResults(id);  
	}

	

}
