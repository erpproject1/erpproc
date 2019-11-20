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

import com.uatech.erp.entities.WirSetting;
import com.uatech.service.interfaces.IAccessDataLayerService; 

@Controller
public class WirSettingController {
 
	@Autowired
	@Qualifier("WirSettingService")
	private IAccessDataLayerService<WirSetting, Long> wirSettingService;

	@RequestMapping(value = "/WIRsetting", method = RequestMethod.GET)
	public String wirtype(Locale locale, Model model) {

		return "WIRsetting";
	}
	
	
	@RequestMapping(value = "/getWirSetting", method = RequestMethod.GET)
	public ResponseEntity<ArrayList<WirSetting>> getProjectPhases() {

		return new ResponseEntity<>(wirSettingService.getAll(), HttpStatus.CREATED);
	}

	@RequestMapping(value = "/getWirSettings", method = RequestMethod.POST)
	public ResponseEntity<ArrayList<WirSetting>>  getWirSetting(@RequestBody WirSetting wirSetting,
			HttpServletRequest request) { 
 
		return new ResponseEntity<>(wirSettingService.getResults(wirSetting), HttpStatus.CREATED);
	}
	 
	 
	@RequestMapping(value = "/addWirSetting", method = RequestMethod.POST)
	public ResponseEntity<String> addProjectPhase(@RequestBody WirSetting wirSetting, HttpServletRequest request) {

		wirSetting.setActive(true);
		long result = wirSettingService.insert(wirSetting);
		 
		return new ResponseEntity<>("Created Successfuly.", HttpStatus.CREATED);
	}
	
	@RequestMapping(value = "/updateWirSetting", method = RequestMethod.POST)
	public ResponseEntity<String> updateWirSetting(@RequestBody WirSetting wirSetting, HttpServletRequest request) {
		wirSetting.setActive(true);
		
		boolean result = wirSettingService.update(wirSetting); 
		return new ResponseEntity<>("Update Successfuly.", HttpStatus.CREATED);
	}
	
	@RequestMapping(value = "/deleteWirSetting", method = RequestMethod.POST)
	public ResponseEntity<String> deletePersonal(@RequestBody WirSetting wirSetting ,
			HttpServletRequest request) {
 
		
		boolean dResult=wirSettingService.delete(wirSetting);
		if (dResult) {
			return new ResponseEntity<>("Delete successfully.", HttpStatus.CREATED); 
		}
		else
		{return new ResponseEntity<>("Sorry! Coultn't Delete!!!", HttpStatus.CREATED);}
		

	}
	 

}
