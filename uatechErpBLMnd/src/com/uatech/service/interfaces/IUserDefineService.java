package com.uatech.service.interfaces;

import java.util.ArrayList;

import com.uatech.erp.entities.UserDefine;

public interface IUserDefineService extends IAccessDataLayerService<UserDefine, Long> {
 

	UserDefine getFindByUserAndPass(UserDefine t);
	ArrayList<UserDefine> getFindByUser(String u);  
	UserDefine getFindByPersonaId(Long u);
	//int getLastChildItem(Long upperId);   
	
}
