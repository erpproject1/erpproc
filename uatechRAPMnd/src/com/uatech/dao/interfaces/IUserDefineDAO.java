package com.uatech.dao.interfaces;

import java.util.ArrayList;
 
import com.uatech.erp.entities.UserDefine; 


public interface IUserDefineDAO extends IDAO<UserDefine, Long> {
  

	UserDefine getFindByUserAndPass(UserDefine u);  
	ArrayList<UserDefine> getFindByUser(String u);  
	UserDefine getFindByPersonaId(Long u);
	//User getReportContentByItemNo(int itemNo);    
	
	//ArrayList<User> getResults(int parseInt, Long i);   
   // ArrayList<User> getYoungItems(int parseInt, Long i);  

	
}
