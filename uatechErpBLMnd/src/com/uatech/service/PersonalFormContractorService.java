package com.uatech.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.uatech.dao.interfaces.IDAO;  
import com.uatech.erp.entities.PersonalFormContractor;
import com.uatech.service.interfaces.IAccessDataLayerService;  

@Service
@Component("PersonalFormContractorService") 
@Transactional
public class PersonalFormContractorService implements IAccessDataLayerService<PersonalFormContractor,Long> {

	 
	@Autowired
	@Qualifier("PersonalFormContractorDAO")  
	IDAO<PersonalFormContractor, Long> iDAO;    
	

	@Override 
	public Long insert(PersonalFormContractor t) {   
		return iDAO.insert(t);      
	}

	@Override
	public boolean update(PersonalFormContractor t) {
	 return  iDAO.update(t);    
		
	}

	@Override
	public boolean delete(PersonalFormContractor t) {
		return  iDAO.update(t); 
	} 
	
	@Override
	public boolean persist(PersonalFormContractor t) {
		return iDAO.persist(t);   
		
	}

	@Override
	public PersonalFormContractor getFindById(Long id) { 
		
		return iDAO.getFindById(id);      
	}

	@Override
	public ArrayList<PersonalFormContractor> getAll() {
		
		return iDAO.getAll();    
	}
	 
	@Override
	public ArrayList<PersonalFormContractor> getResults(PersonalFormContractor id) { 
		return iDAO.getResults(id);  
	}

	

}
