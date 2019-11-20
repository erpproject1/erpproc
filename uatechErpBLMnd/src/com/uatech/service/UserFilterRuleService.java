package com.uatech.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.uatech.dao.interfaces.IDAO;
import com.uatech.erp.entities.UserFilterRule; 
import com.uatech.service.interfaces.IAccessDataLayerService;  

@Service
@Component("UserFilterRuleService") 
@Transactional
public class UserFilterRuleService implements IAccessDataLayerService<UserFilterRule,Long> {

	 
	@Autowired
	@Qualifier("UserFilterRuleDAO")  
	IDAO<UserFilterRule, Long> iDAO;    
	

	@Override 
	public Long insert(UserFilterRule t) {   
		return iDAO.insert(t);      
	}

	@Override
	public boolean update(UserFilterRule t) {
	 return  iDAO.update(t);    
		
	}

	@Override
	public boolean delete(UserFilterRule t) {
		return  iDAO.delete(t); 
	} 
	
	@Override
	public boolean persist(UserFilterRule t) {
		return iDAO.persist(t);   
		
	}

	@Override
	public UserFilterRule getFindById(Long id) { 
		
		return iDAO.getFindById(id);      
	}

	@Override
	public ArrayList<UserFilterRule> getAll() {
		
		return iDAO.getAll();    
	}
	
 
	 
	@Override
	public ArrayList<UserFilterRule> getResults(UserFilterRule id) { 
		return iDAO.getResults(id);  
	}

	

}
