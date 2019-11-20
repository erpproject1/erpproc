package com.uatech.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
 
import com.uatech.dao.interfaces.IUserDefineDAO; 
import com.uatech.erp.entities.UserDefine; 
import com.uatech.service.interfaces.IUserDefineService;  

@Service
@Component("UserDefineService") 
@Transactional
public class UserDefineService implements IUserDefineService {

	 
	@Autowired
	@Qualifier("UserDefineDAO")  
	IUserDefineDAO  iDAO;    

	@Override 
	public UserDefine getFindByUserAndPass(UserDefine t)
	{ 
		return iDAO.getFindByUserAndPass(t);
	}
	

	@Override 
	public ArrayList<UserDefine> getFindByUser(String t)
	{ 
		return iDAO.getFindByUser(t);
	}
	
	@Override 
	public Long insert(UserDefine t) {   
		return iDAO.insert(t);      
	}

	@Override
	public boolean update(UserDefine t) {
	 return  iDAO.update(t);    
		
	}

	@Override
	public boolean delete(UserDefine t) {
		return  iDAO.update(t); 
	} 
	
	@Override
	public boolean persist(UserDefine t) {
		return iDAO.persist(t);   
		
	}

	@Override
	public UserDefine getFindById(Long id) { 
		
		return iDAO.getFindById(id);      
	}

	@Override
	public ArrayList<UserDefine> getAll() {
		
		return iDAO.getAll();    
	}
	 
	@Override
	public ArrayList<UserDefine> getResults(UserDefine id) { 
		return iDAO.getResults(id);  
	}


	@Override
	public UserDefine getFindByPersonaId(Long u) {
		// TODO Auto-generated method stub
		return iDAO.getFindByPersonaId(u);
	}

	

}
