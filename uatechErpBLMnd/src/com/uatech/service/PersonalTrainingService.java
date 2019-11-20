package com.uatech.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.uatech.dao.interfaces.IPersonalTrainingDAO;
import com.uatech.erp.entities.PersonalTraining;
import com.uatech.service.interfaces.IPersonalTrainingService;  

@Service
@Component("PersonalTrainingService") 
@Transactional
public class PersonalTrainingService implements IPersonalTrainingService<PersonalTraining,Long> {
	 
	@Autowired
	@Qualifier("PersonalTrainingDAO")  
	IPersonalTrainingDAO iDAO;    
	

	@Override 
	public Long insert(PersonalTraining t) {   
		return iDAO.insert(t);      
	}

	@Override
	public boolean update(PersonalTraining t) {
	 return  iDAO.update(t);    
		
	}

	@Override
	public boolean delete(PersonalTraining t) {
		return  iDAO.delete(t); 
	} 
	
	@Override
	public boolean persist(PersonalTraining t) {
		return iDAO.persist(t);   
		
	}

	@Override
	public PersonalTraining getFindById(Long id) { 
		
		return (PersonalTraining) iDAO.getFindById(id);      
	}

	@Override
	public ArrayList<PersonalTraining> getFindByIdAll(Long id) {
		
		return iDAO.getFindByIdAll(id);    
	}
	 
	@Override
	public ArrayList<PersonalTraining> getAll() {
		
		return iDAO.getAll();    
	}
	 
	
	@Override
	public ArrayList<PersonalTraining> getResults(PersonalTraining id) { 
		return iDAO.getResults(id);  
	}

	

}
