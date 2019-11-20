package com.uatech.service.interfaces;

import java.util.ArrayList;

import com.uatech.erp.entities.PersonalTraining;

public interface IPersonalTrainingService<T,K> extends IAccessDataLayerService<PersonalTraining, Long> {
    

	ArrayList<T> getFindByIdAll(K k);  
}
