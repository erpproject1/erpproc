package com.uatech.service.interfaces;

import java.util.ArrayList;

import com.uatech.erp.entities.PersonalFiles; 

public interface IPersonalFilesService  extends IAccessDataLayerService<PersonalFiles, Long> {
    
	ArrayList<PersonalFiles> getPersonalFiles(PersonalFiles t); 
	
}
