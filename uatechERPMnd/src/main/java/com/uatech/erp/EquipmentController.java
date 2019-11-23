package com.uatech.erp;
 

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.uatech.erp.entities.Equipment;
import com.uatech.service.interfaces.IAccessDataLayerService;


@Controller
public class EquipmentController {
	   
	  
	@Autowired  
	@Qualifier("EquipmentService")
	private IAccessDataLayerService<Equipment, Long> EquipmentService;  

	@RequestMapping(value = "/addEquipment", method = RequestMethod.POST)
	public  ResponseEntity<String> addEquipment(@RequestBody Equipment Equipment, HttpServletRequest request) {
		EquipmentService.insert(Equipment);  		 
		return new ResponseEntity<>("Equipment Created Successfuly.",HttpStatus.CREATED);  
	}
	
	@RequestMapping(value = "/updateEquipment", method = RequestMethod.POST)
	public ResponseEntity<String> updateEquipment(@RequestBody Equipment Equipment, HttpServletRequest request){	
		
		EquipmentService.update(Equipment) ;	
		return new ResponseEntity<>("Equipment updated succesfully.",HttpStatus.CREATED);    
	}
	
	@RequestMapping(value = "/deleteEquipment", method = RequestMethod.POST)
	public ResponseEntity<String> deleteEquipment(@RequestBody Equipment Equipment, HttpServletRequest request){	
		
		Equipment oldEquipment = EquipmentService.getFindById(Equipment.getId()); 
		EquipmentService.delete(oldEquipment); 
		return new ResponseEntity<>("Equipment deleted succesfully.",HttpStatus.CREATED);    
	}	
	
	@RequestMapping(value = "/getEquipment", method = RequestMethod.POST)
	public ResponseEntity< Equipment > getEquipment(@RequestBody Equipment equipment , HttpServletRequest request)
	{
		Long ii=equipment.getId();
		return new ResponseEntity<>( EquipmentService.getFindById(equipment.getId()), HttpStatus.CREATED);
	} 
	
	
	} 