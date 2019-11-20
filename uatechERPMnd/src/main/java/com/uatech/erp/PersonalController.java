package com.uatech.erp;
 
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Locale;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.sql.rowset.serial.SerialException;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;
import com.uatech.erp.entities.Department;
import com.uatech.erp.entities.Personal;
import com.uatech.erp.entities.PersonalExperience;
import com.uatech.erp.entities.PersonalFiles;
import com.uatech.erp.entities.PersonalTraining;
import com.uatech.erp.entities.WirSetting;
import com.uatech.file.service.UploadFilesToServer;
import com.uatech.service.interfaces.IAccessDataLayerService; 
import com.uatech.service.interfaces.IPersonalFilesService;
import com.uatech.service.interfaces.IPersonalTrainingService;


@Controller
public class PersonalController {
	   
	
	@Autowired
	@Qualifier("PersonalTrainingService")
	private IPersonalTrainingService<PersonalTraining, Long> trainingService;

	@Autowired  
	@Qualifier("PersonalExperienceService")
	private IAccessDataLayerService<PersonalExperience, Long> experienceService;
	  
	@Autowired  
	@Qualifier("PersonalService")
	private IAccessDataLayerService<Personal, Long> personalService;
  
	@Autowired  
	@Qualifier("PersonalFilesService") 
	private IPersonalFilesService personalFilesService;
	
	@Autowired
	@Qualifier("DepartmentService") 
	private IAccessDataLayerService<Department, Long> departmentService; 
	
	@Autowired
	@Qualifier("WirSettingService") 
	private IAccessDataLayerService<WirSetting, Long> wirsettingService; 
	
	@RequestMapping(value = "/personel", method = RequestMethod.GET)
	public String personal(Locale locale, Model model) {

		return "personel"; 
	}
	
	@RequestMapping(value = "/department", method = RequestMethod.GET)
	public String department(Locale locale, Model model) {
		 		
		return "department";
	}	
	
	@RequestMapping(value = "/getUpperDepartments", method = RequestMethod.GET) 
	public ResponseEntity<ArrayList<Department>> getUpperDepartments(){	  
			 
		return new ResponseEntity<>(departmentService.getAll(),HttpStatus.CREATED);    
	} 
	
	
//	@RequestMapping(value = "/addDepartment", method = RequestMethod.POST)
//	public  ResponseEntity<String> addDepartment(@RequestBody Department department, HttpServletRequest request) {
//		departmentService.insert(department);  		 
//		return new ResponseEntity<>("Department Created Successfuly.",HttpStatus.CREATED);  
//	}
	
//	@RequestMapping(value = "/updateDepartment", method = RequestMethod.POST)
//	public ResponseEntity<String> updateDepartment(@RequestBody Department department, HttpServletRequest request){	
//		
//		departmentService.update(department) ;	
//		return new ResponseEntity<>("Department updated succesfully.",HttpStatus.CREATED);    
//	}
	
//	@RequestMapping(value = "/deleteDepartment", method = RequestMethod.POST)
//	public ResponseEntity<String> deleteDepartment(@RequestBody Department department, HttpServletRequest request){	
//		
//		Department oldDepartment = departmentService.getFindById(department.getId()); 
//		departmentService.delete(oldDepartment); 
//		return new ResponseEntity<>("Department deleted succesfully.",HttpStatus.CREATED);    
//	}
	
	@RequestMapping(value = "/getTraining", method = RequestMethod.POST)
	public ResponseEntity<ArrayList<PersonalTraining>> getTraining(@RequestBody PersonalTraining personal,
			HttpServletRequest request) { 


		return new ResponseEntity<>(trainingService.getFindByIdAll(personal.getPersonalId()), HttpStatus.CREATED);
	}
	
	@RequestMapping(value = "/getPersonel", method = RequestMethod.POST)
	public ResponseEntity< Personal > getPersonel(@RequestBody Personal personal , HttpServletRequest request)
	{
		Long ii=personal.getId();
		return new ResponseEntity<>( personalService.getFindById(personal.getId()), HttpStatus.CREATED);
	} 
	

	@RequestMapping(value = "/getEmployees", method = RequestMethod.GET)
	public ResponseEntity<ArrayList<Personal>> getEmployees( )
	{
		return new ResponseEntity<>(personalService.getAll(), HttpStatus.CREATED);
	}
	
	@RequestMapping(value = "/getPersonal", method = RequestMethod.GET)
	public ResponseEntity<ArrayList<Personal>> getPersonal()
	{
		return new ResponseEntity<>(personalService.getResults(null), HttpStatus.CREATED);
	}
	 
	@RequestMapping(value = "/getTrainings", method = RequestMethod.GET)
	public ResponseEntity<ArrayList<PersonalTraining>> getTrainings() { 


		return new ResponseEntity<>(trainingService.getAll(), HttpStatus.CREATED);
	}


 
	@RequestMapping(value = "/addTraining", method = RequestMethod.POST)
	public ResponseEntity<String> addTraining(@RequestBody PersonalTraining personalTraining,
			HttpServletRequest request) {
		trainingService.insert(personalTraining);
		return new ResponseEntity<>("Created Successfuly.", HttpStatus.CREATED);
	}

 
	@RequestMapping(value = "/getPersonalFiles", method = RequestMethod.POST)
	public ResponseEntity<ArrayList<PersonalFiles>> getSpacialTrainingFiles(@RequestBody PersonalFiles personalFiles,
			HttpServletRequest request) { 
 
		return new ResponseEntity<>(personalFilesService.getPersonalFiles(personalFiles), HttpStatus.CREATED);
	}
	 
	 
 
	@RequestMapping(value = "/addTrainingAndFiles", method = RequestMethod.POST)
	public ResponseEntity<String> addTrainingAndFiles(@RequestParam("name") String[] names,
			@RequestParam("file") MultipartFile[] files,@RequestParam("jsonObjectData") String jsonString,HttpServletRequest req  ) { 
		
		
		Gson g = new Gson();  
		PersonalTraining personalTraining = g.fromJson(jsonString, PersonalTraining.class);  
		ArrayList<PersonalFiles> personelFiles = new ArrayList<PersonalFiles>(files.length); 
		ArrayList<String> paths = UploadFilesToServer.getInstance().uploadMultipleFile(names, files);
		
		Long id = trainingService.insert(personalTraining); 
		
		if(paths!=null)
			for (int i = 0; i < paths.size(); i++) {
				PersonalFiles tFiles = new PersonalFiles();
				 tFiles.setFilePath(paths.get(i));   
				 tFiles.setClientFileName(names[i]); 
				 tFiles.setParityId(id);  
				 tFiles.setParityType("training"); 
				 tFiles.setActive(true);
				 tFiles.setPersonalId(personalTraining.getPersonalId());
				 personelFiles.add(tFiles); 	
				  
			}
		
		for (PersonalFiles  tf : personelFiles) {
			
			personalFilesService.insert(tf);  
		}
				
		return new ResponseEntity<>("Created Successfuly.", HttpStatus.CREATED);
	}

 
	@RequestMapping(value = "/addExperienceAndFiles", method = RequestMethod.POST)
	public ResponseEntity<String> addExperienceAndFiles(@RequestParam("name") String[] names,
			@RequestParam("file") MultipartFile[] files,@RequestParam("jsonObjectData") String jsonString,HttpServletRequest req  ) { 
		
		
		Gson g = new Gson();  
		PersonalExperience personalExperience = g.fromJson(jsonString, PersonalExperience.class);  
		ArrayList<PersonalFiles> personalFiles = new ArrayList<PersonalFiles>(files.length); 
		ArrayList<String> paths = UploadFilesToServer.getInstance().uploadMultipleFile(names, files);
		
		Long id = experienceService.insert(personalExperience); 
		
		if(paths!=null)
			for (int i = 0; i < paths.size(); i++) {
				PersonalFiles tFiles = new PersonalFiles(); 
				 tFiles.setFilePath(paths.get(i));   
				 tFiles.setClientFileName(names[i]); 
				 tFiles.setParityId(id);  
				 tFiles.setParityType("experience"); 
				 tFiles.setActive(true);
				 tFiles.setPersonalId(personalExperience.getPersonalId());
				 personalFiles.add(tFiles); 				 
			}
		
		for (PersonalFiles  tf : personalFiles) {
			
			personalFilesService.insert(tf);   
		}
				
		return new ResponseEntity<>("Created Successfuly.", HttpStatus.CREATED);
	}
	
	
	@RequestMapping(value = "/updateTraining", method = RequestMethod.POST)
	public ResponseEntity<String> updateTraining(@RequestBody PersonalTraining personalTraining,
			HttpServletRequest request) {
		PersonalTraining old = trainingService.getFindById(personalTraining.getId()); 
		if (personalTraining.getFilePath()==null || (personalTraining.getFilePath()!=null && personalTraining.getFilePath().trim().equals(""))) {
			personalTraining.setFilePath(old.getFilePath()); 
		}
		if (trainingService.update(personalTraining))
			return new ResponseEntity<>("Updated succesfully.", HttpStatus.CREATED); 
		else
			return new ResponseEntity<>("Sorry! Coultn't updated!!!", HttpStatus.CREATED);
	}

	@RequestMapping(value = "/deleteTraining", method = RequestMethod.POST)
	public ResponseEntity<String> deleteTraining(@RequestBody PersonalTraining personalTraining,
			HttpServletRequest request) {
		 
		PersonalFiles pfile= new PersonalFiles();
		pfile.setParityId(personalTraining.getId());
		pfile.setParityType("training");
		
		ArrayList<PersonalFiles> list = personalFilesService.getPersonalFiles(pfile); 
		if(list!=null && list.size()>0) 
			for (PersonalFiles pFiles : list) 
			{
			pFiles.setActive(false);  
			personalFilesService.update(pFiles);  
			} 
		 
		
		if (trainingService.delete(personalTraining))
			return new ResponseEntity<>("Deleted succesfully.", HttpStatus.CREATED);
		else
			return new ResponseEntity<>("Sorry! Couldn't deleted!!!", HttpStatus.CREATED);
	}
	
	
	@RequestMapping(value = "/getExperiences", method = RequestMethod.GET)
	public ResponseEntity<ArrayList<PersonalExperience>> getExperiences() {
 
		return new ResponseEntity<>(experienceService.getAll(), HttpStatus.CREATED);
	}
	
	 
	@RequestMapping(value = "/getExperience", method = RequestMethod.POST)
	public ResponseEntity<ArrayList<PersonalExperience>>  getExperience(@RequestBody PersonalExperience personal,
			HttpServletRequest request) { 


		return new ResponseEntity<>(experienceService.getResults(personal), HttpStatus.CREATED);
	}

 
	@RequestMapping(value = "/addExperience", method = RequestMethod.POST)
	public ResponseEntity<String> addExperience(@RequestBody PersonalExperience personalExperience,
			HttpServletRequest request) {
		experienceService.insert(personalExperience);
		return new ResponseEntity<>("Created Successfuly.", HttpStatus.CREATED);
	}

	@RequestMapping(value = "/updateExperience", method = RequestMethod.POST)
	public ResponseEntity<String> updateExperience(@RequestBody PersonalExperience personalExperience,
			HttpServletRequest request) {
		PersonalExperience old = experienceService.getFindById(personalExperience.getId()); 
		if (personalExperience.getApprovalDocURL()==null || (personalExperience.getApprovalDocURL()!=null && personalExperience.getApprovalDocURL().trim().equals(""))) {
			personalExperience.setApprovalDocURL(old.getApprovalDocURL());   
		}
		if (experienceService.update(personalExperience))
			return new ResponseEntity<>("Updated successfully.", HttpStatus.CREATED); 
		else
			return new ResponseEntity<>("Sorry! Coultn't updated!!!", HttpStatus.CREATED);
	}

	@RequestMapping(value = "/deleteExperience", method = RequestMethod.POST)
	public ResponseEntity<String> deleteExperience(@RequestBody PersonalExperience personalExperience,
			HttpServletRequest request) {

		PersonalFiles pfile= new PersonalFiles();
		pfile.setParityId(personalExperience.getId());
		pfile.setParityType("experience");
		
		ArrayList<PersonalFiles> list = personalFilesService.getPersonalFiles(pfile); 
		if(list!=null && list.size()>0) 
			for (PersonalFiles pFiles : list) 
			{
			pFiles.setActive(false);  
			personalFilesService.update(pFiles);  
			} 
		
		if (experienceService.delete(personalExperience))
			return new ResponseEntity<>("Deleted successfully.", HttpStatus.CREATED);
		else
			return new ResponseEntity<>("Sorry! Couldn't deleted!!!", HttpStatus.CREATED);
	}
	
	@RequestMapping(value = "/deletePersonal", method = RequestMethod.POST)
	public ResponseEntity<String> deletePersonal(@RequestBody Personal  personal ,
			HttpServletRequest request) {

		Personal p_old= new Personal();
		p_old=personalService.getFindById(personal.getId());
		p_old.setActive(false);
		
		boolean dResult=personalService.update(p_old);
		if (dResult) {
			return new ResponseEntity<>("Updated successfully.", HttpStatus.CREATED); 
		}
		else
		{return new ResponseEntity<>("Sorry! Coultn't updated!!!", HttpStatus.CREATED);}
		

	}
	

	@RequestMapping(value = "/addPersonel", method = RequestMethod.POST)
	public ResponseEntity<String> addPersonel(@RequestBody Personal personal , HttpServletRequest request)
	{
		Long per_id;
		if(personal.getId()==0)
		{
			personal.setActive(true);
			  per_id=	personalService.insert(personal);}
		else {
			  	personalService.update(personal);
			  	per_id=personal.getId();}
		return new ResponseEntity<>(per_id+"", HttpStatus.CREATED);
	} 
	
	
	@RequestMapping(value = "/updatePersonal", method = RequestMethod.POST)
	public ResponseEntity<String> updatePersonal(@RequestBody Personal personal, HttpServletRequest request) {
		 
		 Personal p_old=personalService.getFindById(personal.getId());
         
		  p_old.setCompanyId(personal.getCompanyId());
		  p_old.setPersonType(personal.getPersonType());
		  p_old.setName(personal.getName());
	 	  p_old.setMidName(personal.getMidName());
		  p_old.setLastName(personal.getLastName());
		  p_old.setNationalId(personal.getNationalId());
		  p_old.setNationalityId(personal.getNationalityId());
		  p_old.setPassportNo(personal.getPassportNo());
		  p_old.setBirthDate(personal.getBirthDate());
		   
		 
	 
		boolean dResult=personalService.update(p_old);
		if (dResult) {
			return new ResponseEntity<>("Updated successfully.", HttpStatus.CREATED); 
		}
		else
		{return new ResponseEntity<>("Sorry! Coultn't updated!!!", HttpStatus.CREATED);}
		
	 
	}
	
	@RequestMapping(value = "/updatePersonal1", method = RequestMethod.POST)
	public ResponseEntity<String> updatePersonal1(@RequestBody Personal personal, HttpServletRequest request) {
		 
		 Personal p_old=personalService.getFindById(personal.getId());
         
		  p_old.setCountryId( personal.getCountryId());
		  p_old.setCityId(personal.getCityId());
		  p_old.setAddress(personal.getAddress());
	 	  p_old.setCompany(personal.getCompany());
		  p_old.setCompanyPhone(personal.getCompanyPhone());
		  p_old.setCompanyEmail(personal.getCompanyEmail());
		  p_old.setPersonalPhone(personal.getPersonalPhone());
		  p_old.setPersonalEmail(personal.getPersonalEmail());
		  p_old.setEmergencyPhone(personal.getEmergencyPhone());
		  p_old.setEmergencyEmail(personal.getEmergencyEmail());
		  p_old.setHomeCountryId(personal.getHomeCountryId());
		  p_old.setHomeCityId(personal.getHomeCityId());
		  p_old.setHomeAddress(personal.getHomeAddress());
		  p_old.setHomePersonalPhone(personal.getHomePersonalPhone());
		  p_old.setHomeEmergencyPhone(personal.getHomeEmergencyPhone());
		  p_old.setHomeEmergencyEmail(personal.getHomeEmergencyEmail()); 
		  
		boolean dResult=personalService.update(p_old);
		if (dResult) {
			return new ResponseEntity<>("Updated successfully.", HttpStatus.CREATED); 
		}
		else
		{return new ResponseEntity<>("Sorry! Coultn't updated!!!", HttpStatus.CREATED);}
		 
	}
	
	
	@RequestMapping(value = "/updatePersonal22", method = RequestMethod.POST)
	public ResponseEntity<String> updatePersonal22(@RequestBody Personal personal, HttpServletRequest request)
	{ 
		 
		 Personal p_old=personalService.getFindById(personal.getId());
         
		  p_old.setGraduation( personal.getGraduation());
		  p_old.setDegree( personal.getDegree() );
		  p_old.setNameOfSchool(personal.getNameOfSchool());
	 	  p_old.setSchoolCountry(personal.getSchoolCountry());
		  p_old.setYearOfGraduation(personal.getYearOfGraduation());
		  p_old.setGraduationScore(personal.getGraduationScore()); 
		  
		boolean dResult=personalService.update(p_old);
		
		if (dResult) {
			return new ResponseEntity<>("Updated successfully.", HttpStatus.CREATED); 
		}
		else
		{return new ResponseEntity<>("Sorry! Coultn't updated!!!", HttpStatus.CREATED);}
		}
	
	@RequestMapping(value = "/updatePersonal2", method = RequestMethod.POST)
	public ResponseEntity<String> updatePersonal2(@RequestParam("name") String[] names,
			@RequestParam("file") MultipartFile[] files,@RequestParam("jsonObjectData") String jsonString,HttpServletRequest req  ){
		 
		Gson g = new Gson(); 
		Personal personal = g.fromJson(jsonString, Personal.class); 
		ArrayList<PersonalFiles> personalFiles = new ArrayList<PersonalFiles>(files.length); 
		ArrayList<String> paths = UploadFilesToServer.getInstance().uploadMultipleFile(names, files);
		 
		 Personal p_old=personalService.getFindById(personal.getId());
         
		  p_old.setGraduation( personal.getGraduation());
		  p_old.setDegree( personal.getDegree() );
		  p_old.setNameOfSchool(personal.getNameOfSchool());
	 	  p_old.setSchoolCountry(personal.getSchoolCountry());
		  p_old.setYearOfGraduation(personal.getYearOfGraduation());
		  p_old.setGraduationScore(personal.getGraduationScore()); 
		  
		boolean dResult=personalService.update(p_old);
		
		if(paths!=null)
			for (int i = 0; i < paths.size(); i++) {
				PersonalFiles tFiles = new PersonalFiles(); 
				 tFiles.setFilePath(paths.get(i));   
				 tFiles.setClientFileName(names[i]); 
				 tFiles.setParityId(personal.getId());  
				 tFiles.setParityType("education"); 
				 tFiles.setActive(true);
				 tFiles.setPersonalId(personal.getId());
				 personalFiles.add(tFiles); 				 
			}
		
		for (PersonalFiles  tf : personalFiles) {
			
			personalFilesService.insert(tf);   
		}
		
		
		if (dResult) {
			return new ResponseEntity<>("Updated successfully.", HttpStatus.CREATED); 
		}
		else
		{return new ResponseEntity<>("Sorry! Coultn't updated!!!", HttpStatus.CREATED);}
		  
	}
	
	@RequestMapping(value = "/updatePersonal3", method = RequestMethod.POST)
	public ResponseEntity<String> updatePersonal3(@RequestBody Personal personal, HttpServletRequest request) {
		 
		 Personal p_old=personalService.getFindById(personal.getId());
         
		  p_old.setDepartmentId( personal.getDepartmentId());
		  p_old.setJobId( personal.getJobId()  ); 
		  p_old.setDesignationId( personal.getDesignationId()  ); 
		  p_old.setContractDate(personal.getContractDate()  ); 
		  p_old.setContractDuration( personal.getContractDuration()  ); 
		  p_old.setContractDurationDesc( personal.getContractDurationDesc()  ); 
		  p_old.setVocationDays( personal.getVocationDays() ); 
		  p_old.setVocationDaysDesc(  personal.getVocationDaysDesc()  ); 
		  p_old.setVocationPeriod( personal.getVocationPeriod()  ); 
		  p_old.setVocationPeriodDesc( personal.getVocationPeriodDesc()  ); 
		  p_old.setBasicSalary( personal.getBasicSalary()  ); 
		  p_old.setBasicSalaryDesc( personal.getBasicSalaryDesc()  ); 
		  p_old.setHomeAllowance( personal.getHomeAllowance()  ); 
		  p_old.setHomeAllowanceDesc( personal.getHomeAllowanceDesc() ); 
		  p_old.setTransAllowance( personal.getTransAllowance()  ); 
		  p_old.setTransAllowanceDesc( personal.getTransAllowanceDesc()  ); 
		  p_old.setFoodAllowance( personal.getFoodAllowance()  ); 
		  p_old.setFoodAllowanceDesc( personal.getFoodAllowanceDesc()  ); 
		  p_old.setOtherAllowanceText( personal.getOtherAllowanceText()  ); 
		  p_old.setOtherAllowance(  personal.getOtherAllowance()  ); 
		  p_old.setOtherAllowanceDesc( personal.getOtherAllowanceDesc()  ); 
		   
		  
		boolean dResult=personalService.update(p_old);
		if (dResult) {
			return new ResponseEntity<>("Updated successfully.", HttpStatus.CREATED); 
		}
		else
		{return new ResponseEntity<>("Sorry! Coultn't updated!!!", HttpStatus.CREATED);}
		  
		 
		 
	}
	@RequestMapping(value = "/exportInspectionLogExcel", method = RequestMethod.POST) 
	public @ResponseBody void transmittalLogExcel(@RequestParam("name") String[] names,
			@RequestParam("file") MultipartFile[] files, @RequestParam("serData") String jsonString, HttpServletResponse response) 
			throws IOException, IllegalAccessException, IllegalArgumentException, InvocationTargetException {

		ArrayList<String> paths = UploadFilesToServer.getInstance().uploadMultipleFile(names, files); 
		Gson g = new Gson();  	
		Personal doc = g.fromJson(jsonString, Personal.class); 	
		doc.setFileName(names[0]);
		doc.setPath(paths.get(0)); 
		
		personalService.insert(doc) ; 
		
		

	}
 
	
	
	} 

	
	


