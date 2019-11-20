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

import com.uatech.erp.entities.Designation;
import com.uatech.erp.entities.JobDescription;
import com.uatech.service.interfaces.IAccessDataLayerService;

@Controller
public class DesignationController {	

	@Autowired
	@Qualifier("DesignationService")
	private IAccessDataLayerService desService; 

	@RequestMapping(value = "/designation", method = RequestMethod.GET)
	public String jobDescription(Locale locale, Model model) {

		return "designation"; 
	}


	@RequestMapping(value = "/getDesignations", method = RequestMethod.GET)
	public ResponseEntity<ArrayList<JobDescription>> getDesignations() { 

		return new ResponseEntity<>(desService.getAll(), HttpStatus.CREATED);
	}


	@RequestMapping(value = "/getDepartDesigns", method = RequestMethod.POST)
	public ResponseEntity<ArrayList<JobDescription>> getDepartDesigns(@RequestBody Designation designation, HttpServletRequest request) {
		 
		return new ResponseEntity<>(desService.getResults(designation), HttpStatus.CREATED);
	}

	@RequestMapping(value = "/addDesignation", method = RequestMethod.POST)
	public ResponseEntity<String> addDesignation(@RequestBody Designation designation, HttpServletRequest request) {
		desService.insert(designation); 
		return new ResponseEntity<>("Designation Created Successfuly.", HttpStatus.CREATED);
	}

	@RequestMapping(value = "/updateDesignation", method = RequestMethod.POST)
	public ResponseEntity<String> updateDesignation(@RequestBody Designation designation, HttpServletRequest request) {

		if (desService.update(designation))  
			return new ResponseEntity<>("Designation updated succesfully.", HttpStatus.CREATED);
		else
			return new ResponseEntity<>("Sorry! Designation coultn't updated!!!", HttpStatus.CREATED);
	}

	@RequestMapping(value = "/deleteDesignation", method = RequestMethod.POST)
	public ResponseEntity<String> deleteDesignation(@RequestBody Designation designation, HttpServletRequest request) {

		// JobDescription oldJob = (JobDescription)
		// jobService.getFindById(jobDescription.getId());
		if (desService.delete(designation)) 
			return new ResponseEntity<>("Designation deleted succesfully.", HttpStatus.CREATED);
		else
			return new ResponseEntity<>("Sorry! Designation couldn't deleted!!!", HttpStatus.CREATED);
	}


}
