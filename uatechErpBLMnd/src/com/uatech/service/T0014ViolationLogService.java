package com.uatech.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.uatech.dao.interfaces.IDAO;
import com.uatech.erp.entities.T0014ViolationLog;
import com.uatech.service.interfaces.IAccessDataLayerService;  

@Service
@Component("T0014ViolationLogService") 
@Transactional
public class T0014ViolationLogService implements IAccessDataLayerService<T0014ViolationLog,Long> {

	 
	@Autowired
	@Qualifier("T0014ViolationLogDAO")  
	IDAO<T0014ViolationLog, Long> iDAO;    
	

	@Override 
	public Long insert(T0014ViolationLog t) {   
		return iDAO.insert(t);      
	}

	@Override
	public boolean update(T0014ViolationLog t) {
	 return  iDAO.update(t);    
		
	}

	@Override
	public boolean delete(T0014ViolationLog t) {
		return  iDAO.delete(t);  
	} 
	
	@Override
	public boolean persist(T0014ViolationLog t) {
		return iDAO.persist(t);   
		
	}

	@Override
	public T0014ViolationLog getFindById(Long id) { 
		
		return iDAO.getFindById(id);      
	}

	@Override
	public ArrayList<T0014ViolationLog> getAll() {
		
		return iDAO.getAll();    
	}
	 
	@Override
	public ArrayList<T0014ViolationLog> getResults(T0014ViolationLog id) { 
		return iDAO.getResults(id);  
	}

	

}
