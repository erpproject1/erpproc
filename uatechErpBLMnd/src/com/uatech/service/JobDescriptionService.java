package com.uatech.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.uatech.dao.interfaces.IDAO;
import com.uatech.erp.entities.JobDescription;
import com.uatech.service.interfaces.IAccessDataLayerService;

@Service
@Component("JobDescriptionService") 
@Transactional
public class JobDescriptionService implements IAccessDataLayerService<JobDescription, Long> {

	@Autowired
	@Qualifier("JobDescriptionDAO")  
	IDAO iDAO;     
	

	@Override 
	public Long insert(JobDescription t) {   
		return iDAO.insert(t);      
	}

	@Override
	public boolean update(JobDescription t) {
	 return  iDAO.update(t);    
		
	}

	@Override
	public boolean delete(JobDescription t) {
		return  iDAO.delete(t); 
	} 
	
	@Override
	public boolean persist(JobDescription t) {
		return iDAO.persist(t);   
		
	}

	@Override
	public JobDescription getFindById(Long id) { 
		
		return (JobDescription) iDAO.getFindById(id);      
	}

	@Override
	public ArrayList<JobDescription> getAll() {
		
		return iDAO.getAll();    
	}
	 
	@Override
	public ArrayList<JobDescription> getResults(JobDescription id) {
		return iDAO.getResults(id);  
	}
	
	

}
