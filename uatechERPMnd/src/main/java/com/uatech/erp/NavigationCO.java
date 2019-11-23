package com.uatech.erp;
  

import java.util.ArrayList;
import java.util.Arrays;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory; 
import org.springframework.stereotype.Controller; 
 
 

/**
 * Handles requests for the application home page.
 */
@Controller
public class NavigationCO {
	  
	private static final Logger logger = LoggerFactory.getLogger(NavigationCO.class);
 
	public static String nav(HttpServletRequest request)
	{
		
		String	yeni="<span class=\"label label-success label-bordered label-ghost\">new</span>";
		
		String f=(String) request.getSession().getAttribute("userfilterP");
		 
		ArrayList<String> page = new ArrayList<>( Arrays.asList(f.split(",")));
		 
		String nav="" ;
		
		if(page.indexOf("home")<0)
		{ 
		   nav=nav+"<ul> <li><a href=\"home\"><i class=\"fa fa-home\"></i> Home</a></li>";
				
				
				if(!f.contains("humanresources"))
				{	
				    nav=nav+"<li><a href=\"#\"><span class=\"nav-icon-hexa\">HUM</span>Human Resources</a>"
					+"<ul>";
					if(!f.contains("employee"))
					nav=nav+" <li><a href=\"employee\"><span class=\"nav-icon-hexa\">EMP</span>Employee List </a> </li>";
			
			        if(!f.contains("personel"))
			        nav=nav+"	<li><a href=\"personel\"><span class=\"nav-icon-hexa\">PER</span>Personal</a> </li>";//
			        
			        if(!f.contains("personelFormContractor"))
			        	nav=nav+"  <li><a href=\"personelFormContractor\"><span class=\"nav-icon-hexa\">PER</span>Personal Form Contractor</a></li> " ;
			        
			        if(!f.contains("department"))
			        	nav=nav+"	<li><a href=\"department\"><span class=\"nav-icon-hexa\">DEP</span>Department </a></li>";
	
			        if(!f.contains("jobDescription"))
			        	nav=nav+"	<li><a href=\"jobDescription\"><span class=\"nav-icon-hexa\">JOB</span>Job Description</a></li>";
					
					 if(!f.contains("designation"))
						 nav=nav+"	<li><a href=\"designation\"><span class=\"nav-icon-hexa\">DES</span>Designation</a></li> "	;
					
					 if(!f.contains("personelFormClient"))
						 nav=nav+"  <li><a href=\"personelFormClient\"><span class=\"nav-icon-hexa\">PER</span>Personal Form Client</a></li> ";
					 
					nav=nav+"</ul>"
					+"</li>" ;
				}
		        
				if(!f.contains("quality"))
				{	
			        nav=nav+"<li><a href=\"#\"><span class=\"nav-icon-hexa\">QUA</span>Quality</a>" 
					+"<ul>";
					
					if(!f.contains("inspectionAndTestPlan"))
						nav=nav+"  <li><a href=\"inspectionAndTestPlan\"><span class=\"nav-icon-hexa\">ITP</span>Inspection And Test Plan</a></li> ";
					
					if(!f.contains("inspectionRequest"))
						nav=nav+"  <li><a href=\"inspectionRequest\"><span class=\"nav-icon-hexa\">INS</span>Inspection Request</a></li> "; 
					
					if(!f.contains("auditPlan"))
						nav=nav+"  <li><a href=\"auditPlan\"><span class=\"nav-icon-hexa\">AUD</span>Audit Plan</a></li> ";
					
					if(!f.contains("projectQI"))  
						nav=nav+"  <li><a href=\"projectQI\"><span class=\"nav-icon-hexa\">PQI</span>PQI</a></li> " ;
					
					if(!f.contains("manpowerRequirement"))
						nav=nav+"  <li><a href=\"manpowerRequirement\"><span class=\"nav-icon-hexa\">MAN</span>Manpower Requirement</a></li> ";
					
					 
					if(!f.contains("transmittalLog"))
						nav=nav+"  <li><a href=\"transmittalLog\"><span class=\"nav-icon-hexa\">TRA</span>Transmittal Log</a></li> ";
					
					
					if(!f.contains("generalReport"))
						nav=nav+"  <li><a href=\"generalReport\"><span class=\"nav-icon-hexa\">GEN</span>General Report</a></li> " ; 
					
					if(!f.contains("violations"))
					{
						nav=nav+"<li><a href=\"#\"><span class=\"nav-icon-hexa\">VIO</span>Violations</a>" 
						+"<ul>";
	 

						if(!f.contains("violationForm"))
							nav=nav+"  <li><a href=\"violationForm\"><span class=\"nav-icon-hexa\">CLI</span>Client Violation</a></li> " ;

						if(!f.contains("nonConformance"))
							nav=nav+"  <li><a href=\"nonConformance\"><span class=\"nav-icon-hexa\">INT</span>Internal NCR</a></li> " ;
						
						
						nav=nav+"</ul>"
						+"</li>";
					}
					
					nav=nav+"</ul>"
					+"</li>";
				}
				
				 

				if(!f.contains("procurement"))
				{
					nav=nav+"<li><a href=\"#\"><span class=\"nav-icon-hexa\">PRO</span>Procurement</a>" 
					+"<ul>"; 
					
					nav=nav+"</ul>"
					+"</li>";
				}

				if(!f.contains("safety"))
				{
					nav=nav+"<li><a href=\"#\"><span class=\"nav-icon-hexa\">SAF</span>Safety</a>" 
					+"<ul>"; 
					
					nav=nav+"</ul>"
					+"</li>";
				}
				

				if(!f.contains("finance"))
				{
					nav=nav+"<li><a href=\"#\"><span class=\"nav-icon-hexa\">FIN</span>Finance</a>" 
					+"<ul>"; 
					
					nav=nav+"</ul>"
					+"</li>";
				}


				if(!f.contains("accounting"))
				{
					nav=nav+"<li><a href=\"#\"><span class=\"nav-icon-hexa\">ACC</span>Accounting</a>" 
					+"<ul>"; 
					
					nav=nav+"</ul>"
					+"</li>";
				}
				


				if(!f.contains("customerrelations"))
				{
					nav=nav+"<li><a href=\"#\"><span class=\"nav-icon-hexa\">CUS</span>Customer Relations</a>" 
					+"<ul>"; 
					
					nav=nav+"</ul>"
					+"</li>";
				}
				
				
				if(!f.contains("equipmentmanagement"))
				{
					nav=nav+"<li><a href=\"#\"><span class=\"nav-icon-hexa\">EQU</span>Equipment Management</a>" 
					+"<ul>"; 
					
					nav=nav+"</ul>"
					+"</li>";
				}
				
				if(!f.contains("Construction"))
				{
					nav=nav+"<li><a href=\"#\"><span class=\"nav-icon-hexa\">CON</span>Construction</a>" 
					+"<ul>"; 
					
					nav=nav+"</ul>"
					+"</li>";
				}
 
				
				if(!f.contains("settings"))
				{
					nav=nav+"<li><a href=\"#\"><span class=\"nav-icon-hexa\">SET</span>Settings</a>" 
					+"<ul>";

					
					if(!f.contains("userNameDefine"))
						nav=nav+"  <li><a href=\"userNameDefine\"><span class=\"nav-icon-hexa\">ADD</span>Add User </a></li> " ;
					
					if(!f.contains("userAuthorized"))
						nav=nav+"  <li><a href=\"userAuthorized\"><span class=\"nav-icon-hexa\">USE</span>User Authorized</a></li> " ;
					 
					if(!f.contains("dashboardSet"))
						nav=nav+"  <li><a href=\"dashboardSet\"><span class=\"nav-icon-hexa\">DAS</span>Dashboard Setting  </a></li> " ;

					if(!f.contains("WIRsetting"))  
						nav=nav+"  <li><a href=\"WIRsetting\"><span class=\"nav-icon-hexa\">WIR</span>WIR Setting</a></li> "  ;

					if(!f.contains("documentType"))
						nav=nav+"  <li><a href=\"documentType\"><span class=\"nav-icon-hexa\">DOC</span>Document Type</a></li> ";
					
					if(!f.contains("activityList"))
						nav=nav+"  <li><a href=\"activityList\"><span class=\"nav-icon-hexa\">ACT</span>Activity List</a></li> " ;

					if(!f.contains("transmittalVariants"))
						nav=nav+"  <li><a href=\"transmittalVariants\"><span class=\"nav-icon-hexa\">TRA</span>Transmittal Variants</a></li> " ;

					if(!f.contains("itemInfo"))
						nav=nav+"  <li><a href=\"itemInfo\"><span class=\"nav-icon-hexa\">ITE</span>Item Info"+yeni+"</a></li> " ;
					
					nav=nav+"</ul>"
					+"</li>";
				}
				

				if(!f.contains("codification"))
					nav=nav+"  <li><a href=\"codification\"><span class=\"nav-icon-hexa\">COD</span>Codification"+yeni+"</a></li> " ;
				
				
				if(!f.contains("eventDefine"))
					nav=nav+"  <li><a href=\"eventDefine\"><span class=\"nav-icon-hexa\">EVE</span>Event Define"+yeni+"</a></li> " ;//jsona eklenecek
				
				
				if(!f.contains("gantt"))
					nav=nav+"  <li><a href=\"gantt\"><span class=\"nav-icon-hexa\">EVE</span>GANTT ÞEMALARI"+yeni+"</a></li> " ;
								
					
					
					nav=nav+"<li><a href=\"#\"><span class=\"nav-icon-hexa\">WEL</span>Welding</a>" 
							+"<ul>";
					nav=nav+"  <li><a href=\"PipingClass\"><span class=\"nav-icon-hexa\">Pipe</span>PipingClass"+yeni+"</a></li> " ;
					nav=nav+"  <li><a href=\"Welders\"><span class=\"nav-icon-hexa\">Weld</span>Welders"+yeni+"</a></li> " ;
					nav=nav+"  <li><a href=\"Equipment\"><span class=\"nav-icon-hexa\">EQU</span>Equipment"+yeni+"</a></li> " ;
					nav=nav+"  <li><a href=\"CheckList\"><span class=\"nav-icon-hexa\">CHK</span>CheckList"+yeni+"</a></li> " ;
					nav=nav+"</ul>"
							+"</li>";
					
					if(!f.contains("settings"))
				{
					nav=nav+"<li><a href=\"#\"><span class=\"nav-icon-hexa\">COO</span>Fýrat Proje"+yeni+"</a>" 
					+"<ul>";

					
					if(!f.contains("activity"))
						nav=nav+"  <li><a href=\"activity\"><span class=\"nav-icon-hexa\">PRO</span>Activity List </a></li> " ;
					
					if(!f.contains("projects"))
						nav=nav+"  <li><a href=\"projects\"><span class=\"nav-icon-hexa\">USE</span>Projects</a></li> " ;
					
					if(!f.contains("projectactivity"))
						nav=nav+"  <li><a href=\"projectactivity\"><span class=\"nav-icon-hexa\">USE</span>Project Activity</a></li> " ;
					
					if(!f.contains("personnel"))
						nav=nav+"  <li><a href=\"personnel\"><span class=\"nav-icon-hexa\">USE</span>Personnel</a></li> " ;
					
					if(!f.contains("assignment"))
						nav=nav+"  <li><a href=\"assignment\"><span class=\"nav-icon-hexa\">COD</span>Assignment</a></li> " ;
					 				
	 				
					if(!f.contains("coordinates"))
					{
						nav=nav+"<li><a href=\"#\"><span class=\"nav-icon-hexa\">COO</span>Coordinates"+yeni+"</a>" 
						+"<ul>";

						
						if(!f.contains("coordinatesProject"))
							nav=nav+"  <li><a href=\"coordinatesProject\"><span class=\"nav-icon-hexa\">PRO</span>Projects </a></li> " ;
						
						if(!f.contains("coordinatesPersonnel"))
							nav=nav+"  <li><a href=\"coordinatesPersonnel\"><span class=\"nav-icon-hexa\">USE</span>Personnel</a></li> " ;
						 					
						nav=nav+"</ul>"
						+"</li>";
					}				

					if(!f.contains("Codification2"))
						nav=nav+"  <li><a href=\"Codification2\"><span class=\"nav-icon-hexa\">COD</span>Codification 2"+yeni+"</a></li> " ;
					

					if(!f.contains("Documantation"))
						nav=nav+"  <li><a href=\"Documentation\"><span class=\"nav-icon-hexa\">COD</span>Documentation "+yeni+"</a></li> " ;
					
					nav=nav+"</ul>"
					+"</li>";
				}	

				if(!f.contains("settings"))
				{
					nav=nav+"<li><a href=\"#\"><span class=\"nav-icon-hexa\">COO</span>Uður Proje"+yeni+"</a>" 
					+"<ul>";

					
					if(!f.contains("activity"))
						nav=nav+"  <li><a href=\"activity1\"><span class=\"nav-icon-hexa\">PRO</span>Activity List </a></li> " ;
					
					if(!f.contains("projects"))
						nav=nav+"  <li><a href=\"projects1\"><span class=\"nav-icon-hexa\">USE</span>Projects</a></li> " ;
					
					if(!f.contains("projectactivity"))
						nav=nav+"  <li><a href=\"projectactivity1\"><span class=\"nav-icon-hexa\">USE</span>Project Activity</a></li> " ;
					
					if(!f.contains("personnel"))
						nav=nav+"  <li><a href=\"personnel1\"><span class=\"nav-icon-hexa\">USE</span>Personnel</a></li> " ;
					
					if(!f.contains("assignment"))
						nav=nav+"  <li><a href=\"assignment1\"><span class=\"nav-icon-hexa\">COD</span>Assignment</a></li> " ;
					 				

					if(!f.contains("organizationChart"))
					{
						nav=nav+"<li><a href=\"#\"><span class=\"nav-icon-hexa\">ORG</span>Organization Chart"+yeni+"</a>" 
						+"<ul>";

						
						if(!f.contains("designation2"))
							nav=nav+"  <li><a href=\"designation2\"><span class=\"nav-icon-hexa\">DES</span>Designation</a> </li> " ;
						
						if(!f.contains("department2"))
							nav=nav+"  <li><a href=\"department2\"><span class=\"nav-icon-hexa\">DEP</span>Department</a> </li> " ;
						
						if(!f.contains("organizationChart"))
							nav=nav+"  <li><a href=\"organizationChart\"><span class=\"nav-icon-hexa\">OC</span>Organization Chart</a> </li> " ;
						
						if(!f.contains("organizationChart2"))
							nav=nav+"  <li><a href=\"organizationChart2\"><span class=\"nav-icon-hexa\">OC</span>Organization Chart2</a> </li> " ;
						 					
						nav=nav+"</ul>"
						+"</li>";
					}		
					
					if(!f.contains("inspectionLog"))
					{
						nav=nav+"<li><a href=\"#\"><span class=\"nav-icon-hexa\">IL</span>Inspection Log"+yeni+"</a>" 
						+"<ul>";

						
						if(!f.contains("inspectionLog"))
							nav=nav+"  <li><a href=\"inspectionLog\"><span class=\"nav-icon-hexa\">INS</span>Inspection Log</a> </li> " ;
						
						if(!f.contains("inspectionLogReport"))
							nav=nav+"  <li><a href=\"inspectionLogReport\"><span class=\"nav-icon-hexa\">REP</span>Inspection Log Export/Import Reports</a> </li> " ;
						
						 					
						nav=nav+"</ul>"
						+"</li>";
					}				
		
					
					if(!f.contains("dynamicPages"))
					{
						nav=nav+"<li><a href=\"#\"><span class=\"nav-icon-hexa\">DP</span>Dynamic Pages"+yeni+"</a>" 
						+"<ul>";

						
						if(!f.contains("adminDynamicPage"))
							nav=nav+"  <li><a href=\"adminDynamicPage\"><span class=\"nav-icon-hexa\">APS</span>Admin Page Settings</a> </li> " ;
						
						if(!f.contains("companyDynamicPage"))
							nav=nav+"  <li><a href=\"companyDynamicPage\"><span class=\"nav-icon-hexa\">CPS</span>Company Page Settings</a> </li> " ;
						
						if(!f.contains("companyDynamicPage"))
							nav=nav+"  <li><a href=\"staff\"><span class=\"nav-icon-hexa\">REP</span>Personnel</a> </li> " ;
						
						 					
						nav=nav+"</ul>"
						+"</li>";
					}			
		
					
					if(!f.contains("textEditor"))
					{
						nav=nav+"<li><a href=\"#\"><span class=\"nav-icon-hexa\">TE</span>Text Editor"+yeni+"</a>" 
						+"<ul>";

						
						if(!f.contains("textEditor"))
							nav=nav+"  <li><a href=\"textEditor\"><span class=\"nav-icon-hexa\">APS</span>Text Editor</a> </li> " ;
						
						 					
						nav=nav+"</ul>"
						+"</li>";
					}	
					
					nav=nav+"</ul>"
					+"</li>";
				}	
				nav=nav+"</ul>";
				
		 }	
	
		
		
		
		
		
 if(page.indexOf("TMhome")<0)
		{ 
			nav=nav+"<ul> <li><a href=\"TMhome\"><i class=\"fa fa-home\"></i>HOME</a></li>";
				 
			  
			if(!f.contains("TMshipment"))
			{
				nav=nav+"<li><a href=\"#\"><span class=\"nav-icon-hexa\">SHI</span>SHIPMENT</a>" 
				+"<ul>"; 
				
				nav=nav+"</ul>"
				+"</li>";
			} 

			
			  
			if(!f.contains("TMaccounting"))
			{
				nav=nav+"<li><a href=\"#\"><span class=\"nav-icon-hexa\">ACC</span>ACCOUNTING</a>" 
				+"<ul>"; 
				
				nav=nav+"</ul>"
				+"</li>";
			} 
			
			  
			if(!f.contains("TMequipment"))
			{
				nav=nav+"<li><a href=\"#\"><span class=\"nav-icon-hexa\">ACC</span>EQUIPMENT</a>" 
				+"<ul>"; 

				if(!f.contains("TMEquipment"))
					nav=nav+"  <li><a href=\"TMEquipment\"><span class=\"nav-icon-hexa\">EQU</span>Equipment Info</a></li> " ;
				

				if(!f.contains("TMAssignment"))
					nav=nav+"  <li><a href=\"TMAssignment\"><span class=\"nav-icon-hexa\">ASS</span>Assignment</a></li> " ;
				
				
				nav=nav+"</ul>"
				+"</li>";
			} 
			
			  
			if(!f.contains("TMpersonnel"))
			{
				nav=nav+"<li><a href=\"#\"><span class=\"nav-icon-hexa\">PER</span>PERSONNEL</a>" 
				+"<ul>"; 
				
				
				if(!f.contains("userNameDefine"))
					nav=nav+"  <li><a href=\"TMPersonnel\"><span class=\"nav-icon-hexa\">PER</span>Personel Info</a></li> " ;
				
				
				nav=nav+"</ul>"
				+"</li>";
			} 

			  
			if(!f.contains("TMsetting"))
			{
				nav=nav+"<li><a href=\"#\"><span class=\"nav-icon-hexa\">SET</span>SETTINGS</a>" 
				+"<ul>"; 
				
				nav=nav+"</ul>"
				+"</li>";
			}  
			
			
			if(!f.contains("TMpreferences"))
			{
				nav=nav+"<li><a href=\"#\"><span class=\"nav-icon-hexa\">PRE</span>PREFERENCES</a>" 
				+"<ul>"; 
				
				nav=nav+"</ul>"
				+"</li>";
			} 
			
			
			
				nav=nav+"</ul>";
				
		 }	
			 
				
		
				
		return nav;
		
	}
	 
	 
	 
}
