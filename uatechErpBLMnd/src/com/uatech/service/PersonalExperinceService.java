package com.uatech.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.uatech.dao.interfaces.IDAO;
import com.uatech.erp.entities.PersonalExperience;
import com.uatech.service.interfaces.IAccessDataLayerService;  

@Service
@Component("PersonalExperienceService") 
@Transactional
public class PersonalExperinceService implements IAccessDataLayerService<PersonalExperience,Long> {

	 
	@Autowired
	@Qualifier("PersonalExperienceDAO")  
	IDAO iDAO;
	

	@Override 
	public Long insert(PersonalExperience t) {   
		return iDAO.insert(t);      
	}

	@Override
	public boolean update(PersonalExperience t) {
	 return  iDAO.update(t);    
		
	}

	@Override
	public boolean delete(PersonalExperience t) {
		return  iDAO.delete(t); 
	} 
	
	@Override
	public boolean persist(PersonalExperience t) {
		return iDAO.persist(t);   
		
	}

	@Override
	public PersonalExperience getFindById(Long id) { 
		
		return (PersonalExperience) iDAO.getFindById(id);      
	}

	@Override
	public ArrayList<PersonalExperience> getAll() {
		
		return iDAO.getAll();    
	}
	 
	@Override
	public ArrayList<PersonalExperience> getResults(PersonalExperience id) { 
		return iDAO.getResults(id);  
	}

	

}
