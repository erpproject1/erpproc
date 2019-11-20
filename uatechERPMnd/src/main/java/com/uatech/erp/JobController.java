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

import com.uatech.erp.entities.Department;
import com.uatech.erp.entities.JobDescription;
import com.uatech.service.interfaces.IAccessDataLayerService;

@Controller
public class JobController {
	@SuppressWarnings("rawtypes")
	@Autowired
	@Qualifier("DepartmentService")
	private IAccessDataLayerService departmentService;

	@SuppressWarnings("rawtypes")
	@Autowired
	@Qualifier("JobDescriptionService")
	private IAccessDataLayerService jobService;

	@RequestMapping(value = "/jobDescription", method = RequestMethod.GET)
	public String jobDescription(Locale locale, Model model) {

		return "jobDescription";
	}

	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/getDepartments", method = RequestMethod.GET)
	public ResponseEntity<ArrayList<Department>> getDepartments() {

		return new ResponseEntity<>(departmentService.getAll(), HttpStatus.CREATED);
	}

	@RequestMapping(value = "/getJobs", method = RequestMethod.GET)
	public ResponseEntity<ArrayList<JobDescription>> getJobs() {
		 
		return new ResponseEntity<>(jobService.getAll(), HttpStatus.CREATED);
	}
	
	
	
	
	@RequestMapping(value = "/getDepartmentJobs", method = RequestMethod.POST)
	public ResponseEntity<ArrayList<JobDescription>> getDepartmentJobs(@RequestBody JobDescription jobDescription, HttpServletRequest request) {
      
		return new ResponseEntity<>(jobService.getResults(jobDescription), HttpStatus.CREATED);
	}

	
	
	
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/addJob", method = RequestMethod.POST)
	public ResponseEntity<String> addJob(@RequestBody JobDescription jobDescription, HttpServletRequest request) {
		jobService.insert(jobDescription);
		return new ResponseEntity<>("Job Created Successfuly.", HttpStatus.CREATED);
	}

	@RequestMapping(value = "/updateJob", method = RequestMethod.POST)
	public ResponseEntity<String> updateJob(@RequestBody JobDescription jobDescription, HttpServletRequest request) {

		if (jobService.update(jobDescription))
			return new ResponseEntity<>("Job updated succesfully.", HttpStatus.CREATED);
		else
			return new ResponseEntity<>("Sorry! Job coultn't updated!!!", HttpStatus.CREATED);
	}

	@RequestMapping(value = "/deleteJob", method = RequestMethod.POST)
	public ResponseEntity<String> deleteJob(@RequestBody JobDescription jobDescription, HttpServletRequest request) {

		// JobDescription oldJob = (JobDescription)
		// jobService.getFindById(jobDescription.getId());
		if (jobService.delete(jobDescription))
			return new ResponseEntity<>("Job deleted succesfully.", HttpStatus.CREATED);
		else
			return new ResponseEntity<>("Sorry! Job couldn't deleted!!!", HttpStatus.CREATED);
	}

}
