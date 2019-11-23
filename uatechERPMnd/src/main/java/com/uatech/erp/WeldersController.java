package com.uatech.erp;
 

import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.uatech.erp.entities.Welders;
import com.uatech.service.interfaces.IAccessDataLayerService;


@Controller
public class WeldersController {
	   
	  
	@Autowired  
	@Qualifier("WeldersService")
	private IAccessDataLayerService<Welders, Long> WeldersService;  

	@RequestMapping(value = "/addWelders", method = RequestMethod.POST)
	public  ResponseEntity<String> addWelders(@RequestBody Welders Welders, HttpServletRequest request) {
		WeldersService.insert(Welders);  		 
		return new ResponseEntity<>("Welders Created Successfuly.",HttpStatus.CREATED);  
	}
	
	@RequestMapping(value = "/updateWelders", method = RequestMethod.POST)
	public ResponseEntity<String> updateWelders(@RequestBody Welders Welders, HttpServletRequest request){	
		
		WeldersService.update(Welders) ;	
		return new ResponseEntity<>("Welders updated succesfully.",HttpStatus.CREATED);    
	}
	
	@RequestMapping(value = "/deleteWelders", method = RequestMethod.POST)
	public ResponseEntity<String> deleteWelders(@RequestBody Welders Welders, HttpServletRequest request){	
		
		Welders oldWelders = WeldersService.getFindById(Welders.getId()); 
		WeldersService.delete(oldWelders); 
		return new ResponseEntity<>("Welders deleted succesfully.",HttpStatus.CREATED);    
	}	
	 
	
	@RequestMapping(value = "/getWelders", method = RequestMethod.GET)
	public ResponseEntity<ArrayList<Welders>> getWelders(HttpServletRequest request) { 
		return new ResponseEntity<>(WeldersService.getAll(), HttpStatus.OK);
	}
	
	} 