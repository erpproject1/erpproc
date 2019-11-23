package com.uatech.erp;
 
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Locale;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

import com.uatech.erp.entities.DashboardSet;
import com.uatech.erp.entities.UserDefine;
import com.uatech.file.service.ZXingHelper;
import com.uatech.service.interfaces.IAccessDataLayerService;
 

/**
 * Handles requests for the application home page.
 * <%String s=(String)request.getSession().getAttribute("navid"); %> 
 <script type="text/javascript"> var navval='<%=s %>'; </script>
 */
@Controller
public class HomeCO {
	
	
	private static final Logger logger = LoggerFactory.getLogger(HomeCO.class);


	@Autowired
	@Qualifier("DashboardSetService")
	private IAccessDataLayerService<DashboardSet, Long> dash;
	
	
	public String getDashboard(HttpServletRequest request)
	{
		
	 String sDash="0,0";
	 try {
		
		UserDefine u= (UserDefine) request.getSession().getAttribute("user");   
		
		if ( u!=null  ) {
			DashboardSet t = new DashboardSet();
			t.setUserId(u.getId());
			t.setDepartmentId(u.getPer().getDepartmentId());
			t.setDisciplineId(u.getPer().getDisciplineId());
			t.setJobDescriptionId(u.getPer().getJobId());
			
			
			for (DashboardSet tt:dash.getResults(t)) {
				
				sDash=sDash+","+tt.getPermissionArea();
			}
			
			u=null; t=null;
		}

		} catch (Exception e) {
			// TODO: handle exception
		}

		return sDash; 
	}
	
 
	@RequestMapping(value = "/home", method = RequestMethod.GET)
	public String home(Locale locale, Model model,HttpServletRequest request) {
 
		request.getSession().setAttribute("sDash",getDashboard(request));
		return "home";
	}
	
	@RequestMapping(value = "/dashboardSet", method = RequestMethod.GET)
	public String dashboardSet(Locale locale, Model model,HttpServletRequest request) {
 
		return "dashboardSet";
	}
	
	@RequestMapping(value = "/personel2", method = RequestMethod.GET)
	public String stepperExample(Locale locale, Model model,HttpServletRequest request) {
     
       	 
		return "personel2";
	}
	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String root(Locale locale, Model model,HttpServletRequest request) {

	 
		return "home";
	}
	
	@RequestMapping(value = "/error_404", method = RequestMethod.GET)
	public String root3(Locale locale, Model model,HttpServletRequest request) {

		 
		 return "error_404";
	}
	
	@RequestMapping(value = "", method = RequestMethod.GET)
	public String root2(Locale locale, Model model,HttpServletRequest request) {
 
		 return "home";
	}
	
	@RequestMapping(value = "userAuthorized", method = RequestMethod.GET)
	public String userAuthorized(Locale locale, Model model,HttpServletRequest request) {
 
		 return "userAuthorized";
	}
	 
	@RequestMapping(value = "/employee", method = RequestMethod.GET)
	public String employee(Locale locale, Model model) {

		return "employee"; 
	} 
 
	@RequestMapping(value = "/qrcode/{id}", method = RequestMethod.GET)
	public void qrcode(@PathVariable("id") String id, HttpServletResponse response) throws Exception {
		
		response.setContentType("image/png");
		OutputStream outputStream = response.getOutputStream();
		byte[] b=ZXingHelper.getQRCodeImage(id, 200, 200);
		  
		outputStream.write(b);
		outputStream.flush();
		outputStream.close();
		
		 
	}
	 
	@RequestMapping(value = "/sideBarStatu/{step}", method = RequestMethod.GET)
	public @ResponseBody String stepAuthorized(@PathVariable("step") String step, HttpServletRequest request) {
 
		if(step.equals("open"))
		request.getSession().setAttribute("sbs","");
		else 
		 request.getSession().setAttribute("sbs","data-minimized=\"minimized\"");
		return "ok";
	}
	
	@RequestMapping(value = "/addDashboardSet", method = RequestMethod.POST)
	public ResponseEntity<String> addDashboardSet(@RequestBody  ArrayList<DashboardSet> t, HttpServletRequest request) {
		
		
		for (int i = 0; i < t.size(); i++) { 
			try {
				Long s=dash.insert(t.get(i));  
			} catch (Exception e) { 
				// TODO: handle exception
			 }
			
		  } 
		
		return new ResponseEntity<>("Created Successfuly.", HttpStatus.CREATED);
	}
	
	@RequestMapping(value = "/getDashboardSet", method = RequestMethod.POST)
	public ResponseEntity<ArrayList<DashboardSet>> getDashboardSet(@RequestBody DashboardSet t, HttpServletRequest request) {

		 
		return new ResponseEntity<>(dash.getAll(), HttpStatus.CREATED);
		
		 
	}
	
	@RequestMapping(value = "/deleteDashboardSet", method = RequestMethod.POST)
	public ResponseEntity<String> deleteDashboardSet(@RequestBody DashboardSet t, HttpServletRequest request) {
  
		boolean result =dash.delete(t);
		
		if (result) {
			return new ResponseEntity<>("Success.", HttpStatus.CREATED);
		}
		else {
		return new ResponseEntity<>("Error.", HttpStatus.BAD_REQUEST);}
	}
	
	@RequestMapping(value = "/changeLang", method = RequestMethod.GET)
	public void changeLang(@RequestParam(value="lang",required=false) String lang,
			HttpServletRequest request,HttpServletResponse response) throws Exception {

		 request.getSession().setAttribute("language", lang);
		
		 
	}
	
	
	@RequestMapping(value = "/activity", method = RequestMethod.GET)
	public String activity(Locale locale, Model model) {

		return "activity"; 
	}
	
	
	@RequestMapping(value = "/projects", method = RequestMethod.GET)
	public String projects(Locale locale, Model model) {

		return "projects"; 
	}
	
	
	@RequestMapping(value = "/projectactivity", method = RequestMethod.GET)
	public String projectactivity(Locale locale, Model model) {

		return "projectactivity"; 
	}
	
	@RequestMapping(value = "/assignment", method = RequestMethod.GET)
	public String assignment(Locale locale, Model model) {

		return "assignment"; 
	}
	
	@RequestMapping(value = "/personnel", method = RequestMethod.GET)
	public String personnel(Locale locale, Model model) {

		return "personnel"; 
	}
	@RequestMapping(value = "/coordinatesProject", method = RequestMethod.GET)
	public String coordinatesProject(Locale locale, Model model) {

		return "coordinatesProject"; 
	}
	@RequestMapping(value = "/coordinatesPersonnel", method = RequestMethod.GET)
	public String coordinatesPersonnel(Locale locale, Model model) {

		return "coordinatesPersonnel"; 
	}

	@RequestMapping(value = "/Codification", method = RequestMethod.GET)
	public String Codification(Locale locale, Model model) {

		return "Codification"; 
	}

	@RequestMapping(value = "/Codification2", method = RequestMethod.GET)
	public String Codification2(Locale locale, Model model) {

		return "Codification2"; 
	}

	@RequestMapping(value = "/Documentation", method = RequestMethod.GET)
	public String Documentation(Locale locale, Model model) {

		return "Documentation"; 
	}

	@RequestMapping(value = "/DocumentTemplates", method = RequestMethod.GET)
	public String DocumentTemplates(Locale locale, Model model) {

		return "DocumentTemplates"; 
	}

	@RequestMapping(value = "/gantt", method = RequestMethod.GET)
	public String gantt(Locale locale, Model model) {

		return "gantt"; 
	}

	@RequestMapping(value = "/ganttTest", method = RequestMethod.GET)
	public String ganttTest(Locale locale, Model model) {

		return "ganttTest"; 
	}

	@RequestMapping(value = "/PipingClass", method = RequestMethod.GET)
	public String PipingClass(Locale locale, Model model) {

		return "PipingClass"; 
	}
	@RequestMapping(value = "/Welders", method = RequestMethod.GET)
	public String Welders(Locale locale, Model model) {

		return "Welders"; 
	}
	@RequestMapping(value = "/Equipment", method = RequestMethod.GET)
	public String Equipment(Locale locale, Model model) {

		return "Equipment"; 
	}
	@RequestMapping(value = "/CheckList", method = RequestMethod.GET)
	public String CheckList(Locale locale, Model model) {

		return "CheckList"; 
	}
}
