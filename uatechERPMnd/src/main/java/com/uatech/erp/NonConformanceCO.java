package com.uatech.erp; 

import java.util.ArrayList;
import java.util.Locale;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.google.gson.Gson;
import com.uatech.erp.entities.PersonalFiles;
import com.uatech.erp.entities.T00301NonConformance;
import com.uatech.erp.entities.T00301NonConformanceSet;
import com.uatech.erp.entities.UserDefine;
import com.uatech.file.service.UploadFilesToServer;
import com.uatech.service.interfaces.IAccessDataLayerService;
import com.uatech.service.interfaces.IPersonalFilesService;
import com.uatech.service.interfaces.IT00301NonConformanceService;
import com.uatech.service.interfaces.IUserDefineService; 
 

/**
 * Handles requests for the application home page.
 */
@Controller
public class NonConformanceCO {

	@Autowired
	@Qualifier("T00301NonConformanceService")
	private IT00301NonConformanceService t00301;
	
	@Autowired
	@Qualifier("T00301NonConformanceSetService")
	private IAccessDataLayerService<T00301NonConformanceSet, Long> t00301Set;
	
	@Autowired
	@Qualifier("UserDefineService")
	private IUserDefineService user_service;
	
	@Autowired
	@Qualifier("PersonalFilesService")
	private IPersonalFilesService personalFilesService;
	
	
	
	@RequestMapping(value = "/nonConformance", method = RequestMethod.GET)
	public String nonConformance(Locale locale, Model model,HttpServletRequest request) {
     

		request.getSession().setAttribute("nonConfPerA", "");
		request.getSession().setAttribute("nonConfPerS", ""); 
		
		return "nonConformance";
	}
	 
	@RequestMapping(value = "/nonConformanceSet", method = RequestMethod.GET)
	public String nonConformanceSet(Locale locale, Model model,HttpServletRequest request) {
     
       	 
		return "nonConformanceSet";
	}
	
	@RequestMapping(value = "/addNonConformance", method = RequestMethod.POST)
	public ResponseEntity<String> addNonConformance(@RequestParam("name") String[] names,
			@RequestParam("file") MultipartFile[] files,
			@RequestParam("jsonObjectData") String jsonString, HttpServletRequest request) {

		Gson g = new Gson();
		T00301NonConformance t = g.fromJson(jsonString, T00301NonConformance.class);
		ArrayList<PersonalFiles> personalFiles = null;
		
		int filecount=files.length;
		if (filecount>0) {
			personalFiles = new ArrayList<PersonalFiles>(files.length);
			ArrayList<String> paths = UploadFilesToServer.getInstance().uploadMultipleFile(names, files);
			
			if (paths != null)
				for (int i = 0; i < paths.size(); i++) {
					PersonalFiles tFiles = new PersonalFiles();
					tFiles.setFilePath(paths.get(i));
					tFiles.setClientFileName(names[i]); 
					tFiles.setParityType("nonConformance");
					tFiles.setActive(true); 
					personalFiles.add(tFiles);
				}

		}
		
		int n=t.getStepnumber();
		
		if(n==1)
		 {	
			long result = t00301.insert(t);
			if (filecount>0) {
				try {
					for (PersonalFiles tf : personalFiles) {
						tf.setPersonalId(result);
						tf.setParityId(result);
						personalFilesService.insert(tf);
					}
				} catch (Exception e) {
					// TODO: handle exception
				}
			}
			
			return new ResponseEntity<>(result+"", HttpStatus.CREATED);
		}
		else {
			 
		   T00301NonConformance t1= t00301.getFindById(t.getId());
		   if(n==2) 
			{
				
				t1.setConfirmation(t.getConfirmation());
				t1.setConfirmationReason( t.getConfirmationReason());
				t1.setStep(t.getStep()); 
			}
			else if(n==3) 
			{ 
				t1.setCorrection(t.getCorrection());
				t1.setCorrectionDetail(t.getCorrectionDetail());
				t1.setProposedCorAct(t.getProposedCorAct());
				t1.setActionCloseDate(t.getActionCloseDate());
				t1.setStep(t.getStep());
				 
			}
			
			else if(n==4) 
			{ 
				t1.setReview(t.getReview());
				t1.setReviewReason(t.getReviewReason()); 
				t1.setStep(t.getStep());
				 
			}
	 
			else if(n==5) 
			{
				 
				t1.setRootCausesAnalysis(t.getRootCausesAnalysis());
				t1.setCorrectiveActions(t.getCorrectiveActions());
				t1.setStep(t.getStep());
				 
			}
			
			else if(n==6) 
			{
				 
				t1.setEvaluation(t.getEvaluation()); 
				t1.setEvaluationReason(t.getEvaluationReason());
				t1.setStep(t.getStep());
				 
			}
			
			else if(n==7) 
			{ 
				t1.setClientEvaluation(t.getClientEvaluation()); 
				t1.setClientEvaluationReason(t.getClientEvaluationReason());
				t1.setStep(t.getStep());
				
				
			}
		   	
		     boolean result= t00301.update(t1);
		     if (filecount>0) {
	               try {
						for (PersonalFiles tf : personalFiles) {
							tf.setPersonalId(t1.getId());
							tf.setParityId(t1.getId());
							personalFilesService.insert(tf);
						}
					} catch (Exception e) {
						// TODO: handle exception
					}
		     	}
			if (result) {
				return new ResponseEntity<>("Created Successfuly.", HttpStatus.CREATED);
			}
			else return new ResponseEntity<>("Error.", HttpStatus.NOT_FOUND);
		   
			}
	 
	}

	@RequestMapping(value = "/addNonConformanceSet", method = RequestMethod.POST)
	public ResponseEntity<String> addNonConformanceSet(@RequestBody  ArrayList<T00301NonConformanceSet> t, HttpServletRequest request) {
		
		
		for (int i = 0; i < t.size(); i++) { 
			try {
				Long s=t00301Set.insert(t.get(i));  
			} catch (Exception e) { 
				// TODO: handle exception
			 }
			
		  } 
		
		return new ResponseEntity<>("Created Successfuly.", HttpStatus.CREATED);
	}
	
	@RequestMapping(value = "/stepAuthorized/{step}", method = RequestMethod.GET)
	public @ResponseBody String stepAuthorized(@PathVariable("step") Long step, HttpServletRequest request) {
 
		return step.toString();
	}

	@RequestMapping(value = "/getNonConformance", method = RequestMethod.POST)
	public ResponseEntity<ArrayList<T00301NonConformance>> getNonConformance(@RequestBody T00301NonConformance t,
																				HttpServletRequest request) {
  
		
		UserDefine u= (UserDefine) request.getSession().getAttribute("user"); 
		 
		
		return new ResponseEntity<>(t00301.getResults(u.getId(), u.getPer().getDepartmentId(), 
				u.getPer().getDisciplineId(), u.getPer().getJobId()), HttpStatus.CREATED);
		
		 
	}	
	
	@RequestMapping(value = "/showNonConformance", method = RequestMethod.POST)
	public ResponseEntity <T00301NonConformance> showNonConformance(@RequestBody T00301NonConformance t,
			HttpServletRequest request) {
 
			
			return new ResponseEntity<>(t00301.getFindById(t.getId()), HttpStatus.CREATED);
			 
     }
	
	@RequestMapping(value = "/getNonConformanceSet", method = RequestMethod.POST)
	public ResponseEntity<ArrayList<T00301NonConformanceSet>> getNonConformanceSet(@RequestBody T00301NonConformanceSet t,
																				HttpServletRequest request) {
  
		return new ResponseEntity<>(t00301Set.getAll(), HttpStatus.CREATED);
		
		 
	}
	
	@RequestMapping(value = "/deleteNonConformanceSet", method = RequestMethod.POST)
	public ResponseEntity<String> deleteNonConformanceSet(@RequestBody T00301NonConformanceSet t, HttpServletRequest request) {
  
		boolean result =t00301Set.delete(t);
		
		if (result) {
			return new ResponseEntity<>("Success.", HttpStatus.CREATED);
		}
		else {
		return new ResponseEntity<>("Error.", HttpStatus.BAD_REQUEST);}
	}
	
	
	@RequestMapping(value = "/NCRreports", method = RequestMethod.GET)
	public void reports(@RequestParam(value="id",required=false) long id,
			@RequestParam(value="fList",required=false) String fList,
			HttpServletRequest request,HttpServletResponse response) throws Exception {
		
		String [] ss= fList.split(",");
		ArrayList<PersonalFiles> pf= new ArrayList<PersonalFiles>();
		for (int i = 1; i < ss.length; i++) {
			pf.add(personalFilesService.getFindById(Long.parseLong(ss[i])));
		}
		 
       NonConformanceReportCO.report1(response,t00301.getFindById(id),pf);
		
		 
	}
	 
	
	 
	 
}
