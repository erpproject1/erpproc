package com.uatech.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.uatech.dao.interfaces.IDAO;
import com.uatech.erp.entities.WirSetting;
import com.uatech.service.interfaces.IAccessDataLayerService;  

@Service
@Component("WirSettingService") 
@Transactional
public class WirSettingService implements IAccessDataLayerService<WirSetting,Long> {

	 
	@Autowired
	@Qualifier("WirSettingDAO")  
	IDAO<WirSetting, Long> iDAO;    
	

	@Override 
	public Long insert(WirSetting t) {   
		return iDAO.insert(t);      
	}

	@Override
	public boolean update(WirSetting t) {
	 return  iDAO.update(t);    
		
	}

	@Override
	public boolean delete(WirSetting t) {
		return  iDAO.update(t); 
	} 
	
	@Override
	public boolean persist(WirSetting t) {
		return iDAO.persist(t);   
		
	}

	@Override
	public WirSetting getFindById(Long id) { 
		
		return iDAO.getFindById(id);      
	}

	@Override
	public ArrayList<WirSetting> getAll() {
		
		return iDAO.getAll();    
	}
	
 
	 
	@Override
	public ArrayList<WirSetting> getResults(WirSetting id) { 
		return iDAO.getResults(id);  
	}

	

}
