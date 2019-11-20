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
import com.uatech.erp.entities.Department;
import com.uatech.service.interfaces.IAccessDataLayerService;

@Service
@Component("DepartmentService")
@Transactional
public class DepartmentService implements IAccessDataLayerService<Department, Long> {

	@Autowired
	@Qualifier("DepartmentDAO")
	IDAO<Department, Long> iDAO; 
	Map map;

	@Override
	public Long insert(Department t) {
		return iDAO.insert(t);
	}

	@Override
	public boolean update(Department t) {
		return iDAO.update(t);

	}

	@Override
	public boolean delete(Department t) {
		return iDAO.delete(t);
	}

	@Override
	public boolean persist(Department t) {
		return iDAO.persist(t);

	}

	@Override
	public Department getFindById(Long id) {

		return iDAO.getFindById(id);
	}

	@Override
	public ArrayList<Department> getAll() {

		ArrayList<Department> list = iDAO.getAll();
		if (list != null) {
			map = new HashMap<Integer, String>(list.size());

			for (int i = 0; i < list.size(); i++) {
				map.put(list.get(i).getId(), list.get(i).getDepartment());
			}

			for (int i = 0; i < list.size(); i++) {
				String value = (String) map.get(list.get(i).getUpperDepartmentId());
				if (value != null)
					list.get(i).setUpperDepartment(value);
				else
					list.get(i).setUpperDepartment(""); 
			}

		}

		return list;
	}

	@Override
	public ArrayList<Department> getResults(Department id) {
		return iDAO.getResults(id);
	}

}
