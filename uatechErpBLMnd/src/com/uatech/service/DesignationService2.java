package com.uatech.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.uatech.dao.interfaces.IDAO;
import com.uatech.erp.entities.Designation2;
import com.uatech.service.interfaces.IAccessDataLayerService;  

@Service
@Component("DesignationService2") 
@Transactional
public class DesignationService2 implements IAccessDataLayerService<Designation2,Long> {

	 
	@Autowired
	@Qualifier("Designation2DAO")  
	IDAO<Designation2, Long> iDAO;    
	

	@Override 
	public Long insert(Designation2 t) {   
		return iDAO.insert(t);      
	}

	@Override
	public boolean update(Designation2 t) {
	 return  iDAO.update(t);    
		
	}

	@Override
	public boolean delete(Designation2 t) {
		return  iDAO.update(t); 
	} 
	
	@Override
	public boolean persist(Designation2 t) {
		return iDAO.persist(t);   
		
	}

	@Override
	public Designation2 getFindById(Long id) { 
		
		return iDAO.getFindById(id);      
	}

	@Override
	public ArrayList<Designation2> getAll() {
		
		return iDAO.getAll();    
	}
	
 
	 
	@Override
	public ArrayList<Designation2> getResults(Designation2 id) { 
		return iDAO.getResults(id);  
	}

	

}
