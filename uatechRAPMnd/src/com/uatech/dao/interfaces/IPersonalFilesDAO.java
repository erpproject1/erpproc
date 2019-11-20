package com.uatech.dao.interfaces;

import java.util.ArrayList;

import com.uatech.erp.entities.PersonalFiles; 


public interface IPersonalFilesDAO extends IDAO<PersonalFiles,Long> {

	ArrayList<PersonalFiles> getPersonalFiles(PersonalFiles t);

	 

	 

}
