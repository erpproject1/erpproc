package com.uatech.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.uatech.dao.interfaces.IDAO;
import com.uatech.erp.entities.UserTypeDefine;
import com.uatech.service.interfaces.IAccessDataLayerService;  

@Service
@Component("UserTypeDefineService") 
@Transactional
public class UserTypeDefineService implements IAccessDataLayerService<UserTypeDefine,Long> {

	 
	@Autowired
	@Qualifier("UserTypeDefineDAO")  
	IDAO<UserTypeDefine, Long> iDAO;    
	

	@Override 
	public Long insert(UserTypeDefine t) {   
		return iDAO.insert(t);      
	}

	@Override
	public boolean update(UserTypeDefine t) {
	 return  iDAO.update(t);    
		
	}

	@Override
	public boolean delete(UserTypeDefine t) {
		return  iDAO.delete(t); 
	} 
	
	@Override
	public boolean persist(UserTypeDefine t) {
		return iDAO.persist(t);   
		
	}

	@Override
	public UserTypeDefine getFindById(Long id) { 
		
		return iDAO.getFindById(id);      
	}

	@Override
	public ArrayList<UserTypeDefine> getAll() {
		
		return iDAO.getAll();    
	}
	 
	@Override
	public ArrayList<UserTypeDefine> getResults(UserTypeDefine id) { 
		return iDAO.getResults(id);  
	}

	

}
