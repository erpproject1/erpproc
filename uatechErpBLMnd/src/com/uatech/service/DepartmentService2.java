package com.uatech.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.uatech.dao.interfaces.IDAO;
import com.uatech.erp.entities.Department2;
import com.uatech.service.interfaces.IAccessDataLayerService;  

@Service
@Component("DepartmentService2") 
@Transactional
public class DepartmentService2 implements IAccessDataLayerService<Department2,Long> {

	 
	@Autowired
	@Qualifier("Department2DAO")  
	IDAO<Department2, Long> iDAO;    
	

	@Override 
	public Long insert(Department2 t) {   
		return iDAO.insert(t);      
	}

	@Override
	public boolean update(Department2 t) {
	 return  iDAO.update(t);    
		
	}

	@Override
	public boolean delete(Department2 t) {
		return  iDAO.update(t); 
	} 
	
	@Override
	public boolean persist(Department2 t) {
		return iDAO.persist(t);   
		
	}

	@Override
	public Department2 getFindById(Long id) { 
		
		return iDAO.getFindById(id);      
	}

	@Override
	public ArrayList<Department2> getAll() {
		
		return iDAO.getAll();     
	
	}
	
 
	 
	@Override
	public ArrayList<Department2> getResults(Department2 id) { 
		ArrayList<Department2> result = iDAO.getResults(id);  
	   int sayac = 0; 
		Map map; 
		if (result != null) {
			map = new HashMap<Integer, Department2>(result.size()); 

			for (int i = 0; i < result.size(); i++) {
				map.put(result.get(i).getId(), result.get(i));
			}

			for (int i = 0; i < result.size(); i++) {
				Department2 value = (Department2) map.get(result.get(i).getUpperDepartmentId()); 
				if (value != null && value.getDepartment()!=null)
					result.get(i).setTopDepartment(value.getDepartment()); 
				else
					result.get(i).setTopDepartment("");   
				
				if(result.get(i).getUpperDepartmentId()==0) {
					sayac++;
					result.get(i).setCode(sayac+""); 
				}
				for (int j = 0; j < result.size(); j++) {
					
					if (result.get(i).getId()==result.get(j).getUpperDepartmentId()) {
						result.get(j).setCode(result.get(i).getCode()+"."+(result.get(i).getChildren().size()+1));  
						result.get(i).getChildren().add(result.get(j)); 
					}
					
				}
				
			}

		}
		
		return result ;
	}

	

}
