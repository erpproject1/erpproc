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

import com.uatech.erp.entities.CheckList;
import com.uatech.service.interfaces.IAccessDataLayerService;


@Controller
public class CheckListController {
	   
	  
	@Autowired  
	@Qualifier("CheckListService")
	private IAccessDataLayerService<CheckList, Long> CheckListService;  

	@RequestMapping(value = "/addCheckList", method = RequestMethod.POST)
	public  ResponseEntity<String> addCheckList(@RequestBody CheckList CheckList, HttpServletRequest request) {
		CheckListService.insert(CheckList);  		 
		return new ResponseEntity<>("CheckList Created Successfuly.",HttpStatus.CREATED);  
	}
	
	@RequestMapping(value = "/updateCheckList", method = RequestMethod.POST)
	public ResponseEntity<String> updateCheckList(@RequestBody CheckList CheckList, HttpServletRequest request){	
		
		CheckListService.update(CheckList) ;	
		return new ResponseEntity<>("CheckList updated succesfully.",HttpStatus.CREATED);    
	}
	
	@RequestMapping(value = "/deleteCheckList", method = RequestMethod.POST)
	public ResponseEntity<String> deleteCheckList(@RequestBody CheckList CheckList, HttpServletRequest request){	
		
		CheckList oldCheckList = CheckListService.getFindById(CheckList.getId()); 
		CheckListService.delete(oldCheckList); 
		return new ResponseEntity<>("CheckList deleted succesfully.",HttpStatus.CREATED);    
	}	
	
	@RequestMapping(value = "/getCheckList", method = RequestMethod.POST)
	public ResponseEntity< CheckList > getCheckList(@RequestBody CheckList checkList , HttpServletRequest request)
	{
		Long ii=checkList.getId();
		return new ResponseEntity<>( CheckListService.getFindById(checkList.getId()), HttpStatus.CREATED);
	} 
	
	
	} 