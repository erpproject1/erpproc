package com.uatech.service;

import java.util.ArrayList;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.uatech.dao.PersonalFilesDAO; 
import com.uatech.erp.entities.PersonalFiles;
import com.uatech.service.interfaces.IPersonalFilesService; 

@Service
@Component("PersonalFilesService") 
@Transactional 
public class PersonalFilesService implements IPersonalFilesService {

	 
	@Autowired
	@Qualifier("PersonalFilesDAO")    
	PersonalFilesDAO iDAO;  
	

	@Override 
	public Long insert(PersonalFiles t) {   
		return iDAO.insert(t);      	
	}

	@Override
	public boolean update(PersonalFiles t) {
	 return  iDAO.update(t);    
		
	}

	@Override
	public boolean delete(PersonalFiles t) {
		return  iDAO.delete(t); 
	} 
	
	@Override
	public boolean persist(PersonalFiles t) {
		return iDAO.persist(t);   
		
	}

	@Override
	public PersonalFiles getFindById(Long id) { 
		
		return iDAO.getFindById(id);      
	}

	@Override
	public ArrayList<PersonalFiles> getAll() {
		
		return iDAO.getAll();    
	}
	 
	@Override
	public ArrayList<PersonalFiles> getResults(PersonalFiles id) { 
		return iDAO.getResults(id);  
	}

	@Override
	public ArrayList<PersonalFiles> getPersonalFiles(PersonalFiles t) {
		// TODO Auto-generated method stub
		return iDAO.getPersonalFiles(t);
	}
	
 

	

}
