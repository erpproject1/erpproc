package com.uatech.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.uatech.dao.interfaces.IDAO;
import com.uatech.erp.entities.Welders;
import com.uatech.service.interfaces.IAccessDataLayerService;

@Service
@Component("WeldersService") 
@Transactional
public class WeldersService implements IAccessDataLayerService<Welders, Long> {

	@Autowired
	@Qualifier("WeldersDAO")  
	IDAO iDAO;     
	

	@Override 
	public Long insert(Welders t) {   
		return iDAO.insert(t);      
	}

	@Override
	public boolean update(Welders t) {
	 return  iDAO.update(t);    
		
	}

	@Override
	public boolean delete(Welders t) {
		return  iDAO.delete(t); 
	} 
	
	@Override
	public boolean persist(Welders t) {
		return iDAO.persist(t);   
		
	}

	@Override
	public Welders getFindById(Long id) { 
		
		return (Welders) iDAO.getFindById(id);      
	}

	@Override
	public ArrayList<Welders> getAll() {
		
		return iDAO.getAll();    
	}
	 
	@Override
	public ArrayList<Welders> getResults(Welders id) {
		return iDAO.getResults(id);  
	}
	
	

}
