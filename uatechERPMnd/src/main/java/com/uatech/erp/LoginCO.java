package com.uatech.erp;
 
 

import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest; 

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
 
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model; 
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.uatech.erp.entities.UserAndTypeRelation;
import com.uatech.erp.entities.UserDefine; 
import com.uatech.erp.entities.UserFilterRuleRelation;
import com.uatech.service.interfaces.IAccessDataLayerService;
import com.uatech.service.interfaces.IUserDefineService; 
 

/**
 * Handles requests for the application home page.
 */
@Controller
public class LoginCO {
	 
	@Autowired
	@Qualifier("UserDefineService")
	private IUserDefineService user_service;

	@Autowired
	@Qualifier("UserFilterRuleRelationService")
	private IAccessDataLayerService<UserFilterRuleRelation, Long> user_fil_rule_re;
	
	@Autowired
	@Qualifier("UserAndTypeRelationService")
	private IAccessDataLayerService<UserAndTypeRelation, Long> user_a_type_re;
	
	private static final Logger logger = LoggerFactory.getLogger(LoginCO.class);

	

	
	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public String login(@RequestParam(value="username",required=false) String username,
			@RequestParam(value="password",required=false) String password, Model model,HttpServletRequest request) {

		
		  request.getSession().setAttribute("user", null);
		  request.getSession().setAttribute("username",""); 
		  request.getSession().setAttribute("name", "");
		  request.getSession().setAttribute("surname","");
		  request.getSession().setAttribute("userid","");
		  request.getSession().setAttribute("personalid",""); 
          request.getSession().setAttribute("userfilterP", "");
		  request.getSession().setAttribute("userfilterF", ""); 
		 
		if (username!=null &&password!=null ) 
		{
			if( !username.equals("") && !password.equals(""))
			{
				 UserDefine u=new UserDefine();
				 u.setUsername(username); 
				 u.setPass(password);
				 
				try {
					u=user_service.getFindByUserAndPass(u);
				} catch (Exception e) {
					// TODO: handle exception
				}
				 
				 
				 
				if (u!=null) {
  
					try {
						 request.getSession().setAttribute("user", u);
						 request.getSession().setAttribute("username", u.getUsername()); 
						 request.getSession().setAttribute("name", u.getPer().getName());
						 request.getSession().setAttribute("surname", u.getPer().getLastName());
						 request.getSession().setAttribute("userid", u.getId());
						 request.getSession().setAttribute("personalid", u.getPersonalId());
						 request.getSession().setAttribute("language", "en");
						 request.getSession().setAttribute("sbs","");
						  
						 uFilter(u.getId(),request); 

						 request.getSession().setAttribute("navid", NavigationCO.nav(request));
						 
					} catch (Exception e) {
						return "login";
					}
					
					 
					 return "redirect:/home";
				  }
				else {
					model.addAttribute("sonuc","ERROR : Please check Username and Password ");
					return "login";
				}
				
			}
			else 
			{
				model.addAttribute("sonuc","Please fill in the fields ");
				return "login";
			}	
			
		}
		else {
			
			 UserDefine u= (UserDefine) request.getSession().getAttribute("user"); 
			 if (u!=null) 
			 { return "redirect:/home";}
			 else
			 {
			// request.getSession().setAttribute("userid","0");
			 return "login";
			 }
			}
	}

	
	@RequestMapping(value = "/logout", method = RequestMethod.GET)
	public String logout(Model model,HttpServletRequest request) {
 

		  request.getSession().setAttribute("user", null);
		  request.getSession().setAttribute("username", "");
		  request.getSession().setAttribute("usertype", "");
          request.getSession().setAttribute("userfilterP", "");
		  request.getSession().setAttribute("userfilterF", "");
		  request.getSession().setAttribute("name", "");
		  request.getSession().setAttribute("surname", "");
		  request.getSession().setAttribute("userid", ""); 
		  request.getSession().setAttribute("personalid", "");
		  
		  return "redirect:/login";
	}
	  
	 
	public void uFilter(long userid,HttpServletRequest request)
	{
		
		UserAndTypeRelation uat=new UserAndTypeRelation();
		uat.setUserId(userid);
		
		 ArrayList<UserAndTypeRelation> uatt= new ArrayList<UserAndTypeRelation>();
		 ArrayList<UserFilterRuleRelation> t= new ArrayList<UserFilterRuleRelation>();
		 
		try {
			uatt=user_a_type_re.getResults(uat) ;
		} catch (Exception e) {
			// TODO: handle exception
		}
		
		
		if(!uatt.isEmpty()) 
		 {

			     request.getSession().setAttribute("usertype", uatt.get(0).getUsrtpy().getUsertype());
				 UserFilterRuleRelation uf= new UserFilterRuleRelation();
				 uf.setUserTypeId( uatt.get(0).getUserTypeId()); 
				  
				 try {
					 t=user_fil_rule_re.getResults(uf) ;
				} catch (Exception e) {
					// TODO: handle exception
				}
		 }
		 String sP="0,0";
		 String sF="0,0"; 
		 if(!t.isEmpty()) 
			 {
				 for(UserFilterRuleRelation ufr:t)
				 {
					 if(ufr.getUsrfilrul().getFilType().equals("P"))
					 {
						 sP=sP+","+ufr.getUsrfilrul().getFilterKey();
						 }
					 else
					 	{
						 sF=sF+","+ufr.getUsrfilrul().getFilterKey();
						 }
				 }
				  
				 
			 }
	   
		   request.getSession().setAttribute("userfilterP",sP);
		   request.getSession().setAttribute("userfilterF", sF);
		   System.out.println(sP+"  -  "+sF);
		 
	} 
	  	 
	 
}
