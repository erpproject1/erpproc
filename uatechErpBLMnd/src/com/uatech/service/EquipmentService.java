package com.uatech.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.uatech.dao.interfaces.IDAO;
import com.uatech.erp.entities.Equipment;
import com.uatech.service.interfaces.IAccessDataLayerService;

@Service
@Component("EquipmentService") 
@Transactional
public class EquipmentService implements IAccessDataLayerService<Equipment, Long> {

	@Autowired
	@Qualifier("EquipmentDAO")  
	IDAO iDAO;     
	

	@Override 
	public Long insert(Equipment t) {   
		return iDAO.insert(t);      
	}

	@Override
	public boolean update(Equipment t) {
	 return  iDAO.update(t);    
		
	}

	@Override
	public boolean delete(Equipment t) {
		return  iDAO.delete(t); 
	} 
	
	@Override
	public boolean persist(Equipment t) {
		return iDAO.persist(t);   
		
	}

	@Override
	public Equipment getFindById(Long id) { 
		
		return (Equipment) iDAO.getFindById(id);      
	}

	@Override
	public ArrayList<Equipment> getAll() {
		
		return iDAO.getAll();    
	}
	 
	@Override
	public ArrayList<Equipment> getResults(Equipment id) {
		return iDAO.getResults(id);  
	}
	
	

}
