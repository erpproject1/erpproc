package com.uatech.service.interfaces;

import java.util.ArrayList;

import com.uatech.erp.entities.T00301NonConformance; 

public interface IT00301NonConformanceService extends IAccessDataLayerService<T00301NonConformance, Long> {
 

	ArrayList<T00301NonConformance> getResults(Long k1,Long k2,Long k3,Long k4);
	//User getFindByUserAndPass(User t);

	//int getLastChildItem(Long upperId);   
	
}
