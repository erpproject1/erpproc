package com.uatech.erp;
 
import java.io.OutputStream; 
import java.util.Locale;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory; 
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.uatech.erp.entities.UserDefine;
import com.uatech.file.service.ZXingHelper; 
 

/**
 * Handles requests for the application home page.
 */
@Controller
public class HomeController {
	 
	
	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);

 
	/*@RequestMapping(value = "/home", method = RequestMethod.GET)
	public String home(Locale locale, Model model,HttpServletRequest request) {

       User u=(User) request.getSession().getAttribute("user");
      if (u!=null) 
       {
    	  return "home";
	   }else return "redirect:/login";
		 
		return "home";
	}*/
	
	/*@RequestMapping(value = "/personel2", method = RequestMethod.GET)
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
	
	 */
	 
	 
}
