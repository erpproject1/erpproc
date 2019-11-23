package com.uatech.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.uatech.dao.interfaces.IDAO;
import com.uatech.erp.entities.CheckList;
import com.uatech.service.interfaces.IAccessDataLayerService;

@Service
@Component("CheckListService") 
@Transactional
public class CheckListService implements IAccessDataLayerService<CheckList, Long> {

	@Autowired
	@Qualifier("CheckListDAO")  
	IDAO iDAO;     
	

	@Override 
	public Long insert(CheckList t) {   
		return iDAO.insert(t);      
	}

	@Override
	public boolean update(CheckList t) {
	 return  iDAO.update(t);    
		
	}

	@Override
	public boolean delete(CheckList t) {
		return  iDAO.delete(t); 
	} 
	
	@Override
	public boolean persist(CheckList t) {
		return iDAO.persist(t);   
		
	}

	@Override
	public CheckList getFindById(Long id) { 
		
		return (CheckList) iDAO.getFindById(id);      
	}

	@Override
	public ArrayList<CheckList> getAll() {
		
		return iDAO.getAll();    
	}
	 
	@Override
	public ArrayList<CheckList> getResults(CheckList id) {
		return iDAO.getResults(id);  
	}
	
	

}
