package com.uatech.security;

import java.io.IOException; 

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
 
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.uatech.erp.entities.UserDefine; 
 

 
@Component
@Scope("session")
public class LoginFilter implements Filter {


 
	
    public LoginFilter() {
    	 
    } 
	 
	public void destroy() {
		 
	}
  
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
	 
		 
		HttpServletRequest req= (HttpServletRequest) request;
		HttpServletResponse res= (HttpServletResponse) response;
		System.out.println(req.getContextPath()+"  "+req.getMethod()+"   "+req.getServletPath());
		
		String key=req.getRequestURI();
		 
		if (key.contains("/js/")) {
			chain.doFilter(request, response);
			return;
			 
		}
		if (key.contains("css")) {
			chain.doFilter(request, response);
			return;
			 
		}
		if (key.contains("img")) {
			chain.doFilter(request, response);
			return;
			 
		}  
		if (key.contains("login")||key.contains("logout")) {
			chain.doFilter(request, response);
			return;
		}
		  
		

		 UserDefine u= (UserDefine) req.getSession().getAttribute("user"); 
	    
		if ( u!=null  ) {
			  
			if (key.contains("home")) {
				chain.doFilter(request, response);
				return;
			}
			   
			if (_containsP(req.getRequestURI(),req)) 
			{  
				res.sendRedirect("home");  
			}
			else if (_containsF(req.getRequestURI(),req))
			{  
				res.sendError(HttpServletResponse.SC_UNAUTHORIZED, "You are not authorized");
				return;
			}
			else 
			{ 
				chain.doFilter(request, response);
				return;
			}
			 
			chain.doFilter(request, response);
			return;
		}
		else 
		{ 
			res.sendRedirect("login");  
			 
		}
		 
		 
		try {
			chain.doFilter(request, response);
		    } catch (Exception e) {
			//res.sendRedirect("login");  
		} 
	}

	 
	@Override
	public void init(FilterConfig fConfig) throws ServletException {
		 
	}
	
	 
	public boolean _containsF(String s,HttpServletRequest req)
	{
		String f=(String) req.getSession().getAttribute("userfilterF");
		String[] ff=f.split(",");
		
		boolean r=false;
		for (int i = 0; i < ff.length; i++) {
			//System.out.println("***********function*************"+ff[i]);
			if(s.contains(ff[i])) {
				r=true;
				break;}
		} 
		
		
		return r;
	}

	public boolean _containsP(String s,HttpServletRequest req)
	{
		String f=(String) req.getSession().getAttribute("userfilterP");
		String[] ff=f.split(",");
		
		boolean r=false;
		for (int i = 0; i < ff.length; i++) { 
			if(s.contains(ff[i])) {
				r=true;
				break;}
		} 
		
		
		return r;
	}

}
