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

import com.uatech.erp.entities.PipingClass;
import com.uatech.service.interfaces.IAccessDataLayerService;


@Controller
public class PipingClassController {
	   
	  
	@Autowired  
	@Qualifier("PipingClassService")
	private IAccessDataLayerService<PipingClass, Long> PipingClassService;  

	@RequestMapping(value = "/addPipingClass", method = RequestMethod.POST)
	public  ResponseEntity<String> addPipingClass(@RequestBody PipingClass PipingClass, HttpServletRequest request) {
		PipingClassService.insert(PipingClass);  		 
		return new ResponseEntity<>("PipingClass Created Successfuly.",HttpStatus.CREATED);  
	}
	
	@RequestMapping(value = "/updatePipingClass", method = RequestMethod.POST)
	public ResponseEntity<String> updatePipingClass(@RequestBody PipingClass PipingClass, HttpServletRequest request){	
		
		PipingClassService.update(PipingClass) ;	
		return new ResponseEntity<>("PipingClass updated succesfully.",HttpStatus.CREATED);    
	}
	
	@RequestMapping(value = "/deletePipingClass", method = RequestMethod.POST)
	public ResponseEntity<String> deletePipingClass(@RequestBody PipingClass PipingClass, HttpServletRequest request){	
		
		PipingClass oldPipingClass = PipingClassService.getFindById(PipingClass.getId()); 
		PipingClassService.delete(oldPipingClass); 
		return new ResponseEntity<>("PipingClass deleted succesfully.",HttpStatus.CREATED);    
	}	
	
	@RequestMapping(value = "/getPipingClass", method = RequestMethod.POST)
	public ResponseEntity< PipingClass > getPipingClass(@RequestBody PipingClass pipingClass , HttpServletRequest request)
	{
		Long ii=pipingClass.getId();
		return new ResponseEntity<>( PipingClassService.getFindById(pipingClass.getId()), HttpStatus.CREATED);
	} 
	
	
	} 