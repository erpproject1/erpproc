package com.uatech.erp;

import java.util.ArrayList;
import java.util.Locale;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.uatech.erp.entities.T0014ViolationLog;
import com.uatech.erp.entities.T0027ViolationType;
import com.uatech.service.interfaces.IAccessDataLayerService; 

@Controller
public class ViolationFormCO {
 
	@Autowired
	@Qualifier("T0027ViolationTypeService")
	private IAccessDataLayerService<T0027ViolationType, Long> violaType;
	
	@Autowired
	@Qualifier("T0014ViolationLogService")
	private IAccessDataLayerService<T0014ViolationLog, Long> violationLogService;
	

	@RequestMapping(value = "/violationForm", method = RequestMethod.GET)
	public String violationForm(Locale locale, Model model) {

		return "violationForm";
	}
	
	
	@RequestMapping(value = "/getViolationType", method = RequestMethod.GET)
	public ResponseEntity<ArrayList<T0027ViolationType>> getViolationType() {

		return new ResponseEntity<>(violaType.getAll(), HttpStatus.CREATED);
	}
	
	@RequestMapping(value = "/getViolations", method = RequestMethod.GET)
	public ResponseEntity<ArrayList<T0014ViolationLog>> getViolations(HttpServletRequest request) {  
 
		return new ResponseEntity<>(violationLogService.getAll(), HttpStatus.CREATED);
	}
	
	@RequestMapping(value = "/getViolation", method = RequestMethod.POST)
	public ResponseEntity<T0014ViolationLog> getViolation(@RequestBody T0014ViolationLog violationLog, HttpServletRequest request) {  
 
		return new ResponseEntity<>(violationLogService.getFindById(violationLog.getId()), HttpStatus.CREATED);
	}
 
	@RequestMapping(value = "/addViolation", method = RequestMethod.POST)
	public ResponseEntity<String> addViolation(@RequestBody T0014ViolationLog violationLog, HttpServletRequest request) {  
 
		String dResult = "";
		violationLog.setActive(true); 
		if(violationLogService.insert(violationLog)>0) 
			dResult = "Violation Saved Successfully.";
		else dResult = "Violation Could not Saved !";
		
		return new ResponseEntity<>(dResult, HttpStatus.CREATED); 
	}
	
	@RequestMapping(value = "/updateViolation", method = RequestMethod.POST)
	public ResponseEntity<String> updateViolation(@RequestBody T0014ViolationLog violationLog, HttpServletRequest request) {  
 
		String dResult = ""; 
		violationLog.setActive(true); 
		if(violationLogService.update(violationLog))
			dResult = "Violation Updated Successfully.";
		else dResult = "Violation Could not Update !";  
		return new ResponseEntity<>(dResult, HttpStatus.CREATED); 
	}
	
	@RequestMapping(value = "/deleteViolation", method = RequestMethod.POST)
	public ResponseEntity<String> deleteViolation(@RequestBody T0014ViolationLog violationLog, HttpServletRequest request) {  
		String dResult = "";  
		violationLog = violationLogService.getFindById(violationLog.getId());
		if(violationLogService.delete(violationLog))  
			dResult = "Violation Deleted Successfully.";
		else dResult = "Violation Could not Delete !";  
		return new ResponseEntity<>(dResult, HttpStatus.CREATED); 
	}//
 
	@RequestMapping(value = "/getMaxViolationNo", method = RequestMethod.POST)
	public ResponseEntity<Integer> getMaxViolationNo(@RequestBody T0014ViolationLog violationLog, HttpServletRequest request) {  
		int dResult = 0;  
		ArrayList<T0014ViolationLog> violations = violationLogService.getResults(violationLog);
		if(violations!=null && violations.size()>0)    
			dResult = violations.get(0).getViolationNo(); 
		
		return new ResponseEntity<>(dResult, HttpStatus.CREATED);  
	}
	

}
