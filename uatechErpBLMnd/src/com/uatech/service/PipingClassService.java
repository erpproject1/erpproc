package com.uatech.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.uatech.dao.interfaces.IDAO;
import com.uatech.erp.entities.PipingClass;
import com.uatech.service.interfaces.IAccessDataLayerService;

@Service
@Component("PipingClassService") 
@Transactional
public class PipingClassService implements IAccessDataLayerService<PipingClass, Long> {

	@Autowired
	@Qualifier("PipingClassDAO")  
	IDAO iDAO;     
	

	@Override 
	public Long insert(PipingClass t) {   
		return iDAO.insert(t);      
	}

	@Override
	public boolean update(PipingClass t) {
	 return  iDAO.update(t);    
		
	}

	@Override
	public boolean delete(PipingClass t) {
		return  iDAO.delete(t); 
	} 
	
	@Override
	public boolean persist(PipingClass t) {
		return iDAO.persist(t);   
		
	}

	@Override
	public PipingClass getFindById(Long id) { 
		
		return (PipingClass) iDAO.getFindById(id);      
	}

	@Override
	public ArrayList<PipingClass> getAll() {
		
		return iDAO.getAll();    
	}
	 
	@Override
	public ArrayList<PipingClass> getResults(PipingClass id) {
		return iDAO.getResults(id);  
	}
	
	

}
