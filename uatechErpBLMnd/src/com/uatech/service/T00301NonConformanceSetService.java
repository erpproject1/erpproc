package com.uatech.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.uatech.dao.interfaces.IDAO;
import com.uatech.erp.entities.T00301NonConformanceSet;
import com.uatech.service.interfaces.IAccessDataLayerService;  

@Service
@Component("T00301NonConformanceSetService") 
@Transactional
public class T00301NonConformanceSetService implements IAccessDataLayerService<T00301NonConformanceSet,Long> {

	 
	@Autowired
	@Qualifier("T00301NonConformanceSetDAO")  
	IDAO<T00301NonConformanceSet, Long> iDAO;    
	

	@Override 
	public Long insert(T00301NonConformanceSet t) {   
		return iDAO.insert(t);      
	}

	@Override
	public boolean update(T00301NonConformanceSet t) {
	 return  iDAO.update(t);    
		
	}

	@Override
	public boolean delete(T00301NonConformanceSet t) {
		return  iDAO.delete(t); 
	} 
	
	@Override
	public boolean persist(T00301NonConformanceSet t) {
		return iDAO.persist(t);   
		
	}

	@Override
	public T00301NonConformanceSet getFindById(Long id) { 
		
		return iDAO.getFindById(id);      
	}

	@Override
	public ArrayList<T00301NonConformanceSet> getAll() {
		
		return iDAO.getAll();    
	}
	 
	@Override
	public ArrayList<T00301NonConformanceSet> getResults(T00301NonConformanceSet id) { 
		return iDAO.getResults(id);  
	}

	

}
