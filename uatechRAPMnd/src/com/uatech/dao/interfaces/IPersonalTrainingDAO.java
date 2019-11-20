package com.uatech.dao.interfaces;

import java.util.ArrayList;

import com.uatech.erp.entities.PersonalTraining;

public interface IPersonalTrainingDAO<T,K> extends IDAO<PersonalTraining,Long> { 
	 	
	ArrayList<T> getFindByIdAll(K k);  

}

