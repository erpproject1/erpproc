package com.uatech.dao.interfaces;

import java.util.ArrayList;

import com.uatech.erp.entities.T00301NonConformance; 


public interface IT00301NonConformanceDAO extends IDAO<T00301NonConformance, Long> {
  
 
	ArrayList<T00301NonConformance> getResults(Long k1,Long k2,Long k3,Long k4);
	//User getReportContentByItemNo(int itemNo);    
	
	//ArrayList<User> getResults(int parseInt, Long i);   
   // ArrayList<User> getYoungItems(int parseInt, Long i);  

	
}
