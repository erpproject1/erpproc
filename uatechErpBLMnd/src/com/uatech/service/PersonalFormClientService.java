package com.uatech.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.uatech.dao.interfaces.IDAO; 
import com.uatech.erp.entities.PersonalFormClient;
import com.uatech.service.interfaces.IAccessDataLayerService;  

@Service
@Component("PersonalFormClientService") 
@Transactional
public class PersonalFormClientService implements IAccessDataLayerService<PersonalFormClient,Long> {

	 
	@Autowired
	@Qualifier("PersonalFormClientDAO")  
	IDAO<PersonalFormClient, Long> iDAO;    
	

	@Override 
	public Long insert(PersonalFormClient t) {   
		return iDAO.insert(t);      
	}

	@Override
	public boolean update(PersonalFormClient t) {
	 return  iDAO.update(t);    
		
	}

	@Override
	public boolean delete(PersonalFormClient t) {
		return  iDAO.update(t); 
	} 
	
	@Override
	public boolean persist(PersonalFormClient t) {
		return iDAO.persist(t);   
		
	}

	@Override
	public PersonalFormClient getFindById(Long id) { 
		
		return iDAO.getFindById(id);      
	}

	@Override
	public ArrayList<PersonalFormClient> getAll() {
		
		return iDAO.getAll();    
	}
	 
	@Override
	public ArrayList<PersonalFormClient> getResults(PersonalFormClient id) { 
		return iDAO.getResults(id);  
	}

	

}
