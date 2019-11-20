package com.uatech.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.uatech.dao.interfaces.IDAO;
import com.uatech.erp.entities.Designation;
import com.uatech.service.interfaces.IAccessDataLayerService;

@Service
@Component("DesignationService") 
@Transactional
public class DesignationService implements IAccessDataLayerService<Designation, Long> {

	@Autowired
	@Qualifier("DesignationDAO")  
	IDAO iDAO;     
	

	@Override 
	public Long insert(Designation t) {   
		return iDAO.insert(t);      
	}

	@Override
	public boolean update(Designation t) {
	 return  iDAO.update(t);    
		
	}

	@Override
	public boolean delete(Designation t) {
		return  iDAO.delete(t); 
	} 
	
	@Override
	public boolean persist(Designation t) {
		return iDAO.persist(t);   
		
	}

	@Override
	public Designation getFindById(Long id) { 
		
		return (Designation) iDAO.getFindById(id);      
	}

	@Override
	public ArrayList<Designation> getAll() {
		
		return iDAO.getAll();    
	}
	 
	@Override
	public ArrayList<Designation> getResults(Designation id) {
		return iDAO.getResults(id);  
	}
	
	

}
