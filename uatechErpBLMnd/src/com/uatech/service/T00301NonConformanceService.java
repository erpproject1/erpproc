package com.uatech.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.uatech.dao.interfaces.IT00301NonConformanceDAO;
import com.uatech.erp.entities.T00301NonConformance;
import com.uatech.service.interfaces.IT00301NonConformanceService;   

@Service
@Component("T00301NonConformanceService") 
@Transactional
public class T00301NonConformanceService implements IT00301NonConformanceService {

	 
	@Autowired
	@Qualifier("T00301NonConformanceDAO")  
	IT00301NonConformanceDAO  iDAO;    
	
	 
	@Override 
	public Long insert(T00301NonConformance t) {   
		return iDAO.insert(t);      
	}

	@Override
	public boolean update(T00301NonConformance t) {
	 return  iDAO.update(t);    
		
	}

	@Override
	public boolean delete(T00301NonConformance t) {
		return  iDAO.update(t); 
	} 
	
	@Override
	public boolean persist(T00301NonConformance t) {
		return iDAO.persist(t);   
		
	}

	@Override
	public T00301NonConformance getFindById(Long id) { 
		
		return iDAO.getFindById(id);      
	}

	@Override
	public ArrayList<T00301NonConformance> getAll() {
		
		return iDAO.getAll();    
	}
	 
	@Override
	public ArrayList<T00301NonConformance> getResults(T00301NonConformance id) { 
		return iDAO.getResults(id);  
	}

	@Override
	public ArrayList<T00301NonConformance> getResults(Long k1, Long k2, Long k3, Long k4) {
		// TODO Auto-generated method stub
		return iDAO.getResults(k1, k2, k3, k4);
	}

	

}
