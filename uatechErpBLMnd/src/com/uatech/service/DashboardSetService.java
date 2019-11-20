package com.uatech.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.uatech.dao.interfaces.IDAO;
import com.uatech.erp.entities.DashboardSet; 
import com.uatech.service.interfaces.IAccessDataLayerService;  

@Service
@Component("DashboardSetService") 
@Transactional
public class DashboardSetService implements IAccessDataLayerService<DashboardSet,Long> {

	 
	@Autowired
	@Qualifier("DashboardSetDAO")  
	IDAO<DashboardSet, Long> iDAO;    
	

	@Override 
	public Long insert(DashboardSet t) {   
		return iDAO.insert(t);      
	}

	@Override
	public boolean update(DashboardSet t) {
	 return  iDAO.update(t);    
		
	}

	@Override
	public boolean delete(DashboardSet t) {
		return  iDAO.delete(t); 
	} 
	
	@Override
	public boolean persist(DashboardSet t) {
		return iDAO.persist(t);   
		
	}

	@Override
	public DashboardSet getFindById(Long id) { 
		
		return iDAO.getFindById(id);      
	}

	@Override
	public ArrayList<DashboardSet> getAll() {
		
		return iDAO.getAll();    
	}
	 
	@Override
	public ArrayList<DashboardSet> getResults(DashboardSet id) { 
		return iDAO.getResults(id);  
	}

	

}
