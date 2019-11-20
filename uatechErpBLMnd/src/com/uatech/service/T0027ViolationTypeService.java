package com.uatech.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.uatech.dao.interfaces.IDAO;
import com.uatech.erp.entities.T0027ViolationType;
import com.uatech.service.interfaces.IAccessDataLayerService;  

@Service
@Component("T0027ViolationTypeService") 
@Transactional
public class T0027ViolationTypeService implements IAccessDataLayerService<T0027ViolationType,Long> {

	 
	@Autowired
	@Qualifier("T0027ViolationTypeDAO")  
	IDAO<T0027ViolationType, Long> iDAO;    
	

	@Override 
	public Long insert(T0027ViolationType t) {   
		return iDAO.insert(t);      
	}

	@Override
	public boolean update(T0027ViolationType t) {
	 return  iDAO.update(t);    
		
	}

	@Override
	public boolean delete(T0027ViolationType t) {
		return  iDAO.update(t); 
	} 
	
	@Override
	public boolean persist(T0027ViolationType t) {
		return iDAO.persist(t);   
		
	}

	@Override
	public T0027ViolationType getFindById(Long id) { 
		
		return iDAO.getFindById(id);      
	}

	@Override
	public ArrayList<T0027ViolationType> getAll() {
		
		return iDAO.getAll();    
	}
	 
	@Override
	public ArrayList<T0027ViolationType> getResults(T0027ViolationType id) { 
		return iDAO.getResults(id);  
	}

	

}
