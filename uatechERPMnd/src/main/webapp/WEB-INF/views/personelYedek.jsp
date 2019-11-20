<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %> 
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page session="false" %>

<!DOCTYPE html>
<html lang="en">
    <head>                        
        <title>Personel</title>            
        
        <!-- META SECTION -->
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
        <link rel="icon" href="favicon.ico" type="image/x-icon">
        <!-- END META SECTION -->
        <!-- CSS INCLUDE -->        
        <link rel="stylesheet" href="css/styles.css">
        <!-- EOF CSS INCLUDE -->
    </head>
    <body>
        <!-- APP WRAPPER -->
		
		<input type="text" style="display: none" id="id" />
	    <input type="text" style="display: none" id="idpt" />
	    <input type="text" style="display: none" id="idpe" />
	    <input type="text" style="display: none" id="idPath" value="${path}" /> 
	    <input type="text" style="display: none" id="idExpPath" /> 
	    <input type="text" style="display: none" id="hidPersonalID" /> 
	    
	     
	    <input type="text" style="display: none" id="hidEmpId" value="<%=request.getParameter("EmpId")%>" /> 
	    <input type="text" style="display: none" id="hidAllClose" value="<%=request.getParameter("_c")%>" /> 
      
        <div class="app">           
	 
			
            <!-- START APP CONTAINER -->
            <div class="app-container">
               <!-- START SIDEBAR -->
                 <%@include file="sidebar.jsp" %>
                <!-- END SIDEBAR -->
                
                <!-- START APP CONTENT -->
                <div class="app-content app-sidebar-left">
                
                     <!-- START APP HEADER -->
                    <%@include file="header.jsp" %>
                    <!-- END APP HEADER  -->
                    
                    <!-- START PAGE HEADING -->
                    <div class="app-heading app-heading-bordered app-heading-page">                        
                        <div class="title">
                            <h1>PERSONEL</h1> 
                        </div>     
                    </div>
                   
                    <!-- END PAGE HEADING -->
                    
                    <!-- START PAGE CONTAINER -->
                    <div class="container">
                        
                        <div class="row">
                            <div class="col-md-12" style="position: relative;">
                                  
                             <div class="block">

                              <div class="row margin-top-10">
                                <div class="col-md-12">

                                    <div class="app-heading app-heading-small app-heading-condensed padding-left-0">
                                        <div class="title">
                                            <h2>New Employee</h2> 
                                        </div>   
										
										<div id="msgSucces"  style="display:none;" class="app-tip app-tip-success"> </div>
										              
										<div id="msgError"  style="display:none;" class="app-tip app-tip-warning"> </div>
										  
                                    </div>
                                    
                                    <div>
                                        <ul class="nav nav-tabs nav-justified"> <!--nav nav-pills nav-justified-->
                                            <li class="active"><a href="#tabs-1" data-toggle="tab">Personal</a></li>
                                            <li><a href="#tabs-2" data-toggle="tab">Contact</a></li>
                                            <li><a href="#tabs-6" data-toggle="tab">Education</a></li> 
                                            <li><a href="#tabs-4" data-toggle="tab">Contract</a></li>
                                            <li><a href="#tabs-3" data-toggle="tab">Training</a></li>
                                            <li><a href="#tabs-5" data-toggle="tab">Experiences</a></li>
                                            
                                            
                                        </ul>
                                        <div class="tab-content">
                                        <div class="tab-pane active" id="tabs-1">
											
											   <!-- BASIC INPUTS   Personal -->  
											    <form class="form-horizontal">
												 
												    <div class="form-group">
															<div class="col-sm-1 col-md-1 col-lg-1">
															</div>
															<div class="col-sm-9 col-md-10 col-lg-10 text-right">
																<button type="button" id="btn1clear" onclick="clearArea('tabs-1')" class="btn btn-info btn-sm">Clear
																</button>
																<button type="button" id="btn1add" onclick="addPersonel()" class="btn btn-success btn-sm">Add
																</button>
																<button type="button"   onclick="setTab('tabs-2')" class="btn btn-warning btn-sm">Next
																</button>
															</div>
														</div>

													 <div class="form-group">
														<div class="col-md-2"> 
															 
														</div>
														 <div class="col-md-2"> 
															<div class="app-checkbox primary inline"> 
																<label><input id="idCompanyCheck" type="radio" name="app-checkbox-1" onclick="rentalOpen()" > Company</label> 
															</div> 
														 </div>
														 <div class="col-md-2"> 
															<div class="app-checkbox primary inline"> 
																<label><input id="idRentalCheck" type="radio" name="app-checkbox-1"  onclick="rentalOpen()"> Rental</label> 
															</div> 
														 </div>
														<div class="col-md-2" id="rentaliddiv" style="display:none;">
															<input type="text" class="form-control" id="idCompanyID" name="CompanyID"
																   placeholder="Company ID no" data-validation="number,required"  value="">
														</div>

													 </div>
													 			 
														<div class="form-group">
															 
																<label class="col-md-2 control-label">Nationality</label>
																<div class="col-md-3"> 
																<select class="s2-select-search form-control" id="idNationality">                                      
																</select>
																</div>
															       
														</div>
													  
													    
														<div class="form-group">
															<label class="col-md-2 control-label">Name</label>
															<div class="col-md-6">
																<input id="idName" type="text" class="form-control"  placeholder="..." data-validation="required" >
															</div>
														</div>
														
														<div class="form-group">
															<label class="col-md-2 control-label">Middle Name</label>
															<div class="col-md-6">
																<input id="idMidName" type="text" class="form-control" placeholder="...">
															</div>
														</div>
														
														
														<div class="form-group">
															<label class="col-md-2 control-label">Last Name</label>
															<div class="col-md-6">
																<input id="idLasName" type="text" class="form-control" placeholder="..." data-validation="required">
															</div>
														</div>
														
														<div class="form-group">
															<label class="col-md-2 control-label">National ID</label>
															<div class="col-md-6">
																<input id="idNationalId" type="text" class="form-control error" data-validation="length,number,required"
                                                                  data-validation-length="10" maxlength="10"  value="">

															</div>
														</div>
														
														<div class="form-group">
															<label class="col-md-2 control-label">Pasport No</label>
															<div class="col-md-6">
																<input id="idPasportNo" type="text" class="form-control" placeholder="..." data-validation="required">
															</div>
														</div>
														
														 <div class="form-group">
														  <label class="col-md-2 control-label">Birth Date</label>
															<div class="col-md-3">
																<div class="input-group bs-datepicker">
																	<input id="idBirthDate" type="text" class="form-control" placeholder="01/01/2001">
																	<span class="input-group-addon">
																		<span class="icon-calendar-full"></span>
																	</span>
																</div>
															</div>
																
														 </div>
														 
												 </form>
												         
														 
														   
												 
												<!-- END BASIC INPUTS -->
                                           
										   </div>
                                       
									   <div class="tab-pane" id="tabs-2">
                                             <!-- BASIC INPUTS  Contact-->
												    <form class="form-horizontal">
													
													
													   <div class="form-group">
															<div class="col-sm-1 col-md-1 col-lg-1">
															</div>
															<div class="col-sm-9 col-md-10 col-lg-10 text-right">
																<button type="button"  id="btn2clear" onclick="clearArea('tabs-2')" class="btn btn-info btn-sm">Clear </button>
																<button type="button" id="btn2update"  onclick="updatePersonal('contact')" class="btn btn-success btn-sm">Update</button>
																 <button type="button"  onclick="setTab('tabs-1')" class="btn btn-warning btn-sm">Previous</button>
																 <button type="button" onclick="setTab('tabs-6')" class="btn btn-warning btn-sm">Next
																</button>
															</div>
														</div>

														<div class="form-group">
															  <label class="col-md-2 control-label">Country</label>
																<div class="col-md-3"> 
																<select class="bs-select"  id="idKSACountry" disabled>  
																																
																</select>
																</div>
															       
														</div>
														
														<div class="form-group">
															 
																<label class="col-md-2 control-label">City</label>
																<div class="col-md-3"> 
															
																<select class="s2-select-search form-control" id="idKSACity">                             
																</select>
																</div>
															       
														</div>
													 
														<div class="form-group">
															<label class="col-md-2 control-label">Address</label>
															<div class="col-md-6">
																<input id="idAddress" type="text" class="form-control" placeholder="...">
															</div>
														</div>
														
														<div class="form-group">
															<label class="col-md-2 control-label">Company</label>
															<div class="col-md-6">
																<input id="idCompanyName" type="text" class="form-control" placeholder="...">
															</div>
														</div>
														<div class="form-group">
															<label class="col-md-2 control-label">Company Phone</label>
															<div class="col-md-6">
																<input id="idComPhone" type="text" class="mask_phone form-control" placeholder="Example: 98 (765) 432-10-98"  > 
																 
															</div>
														</div>
														<div class="form-group">
															<label class="col-md-2 control-label">Company Email</label>
															<div class="col-md-6"> 
															  <input  id="idComEmail" class="form-control" data-validation="email" placeholder="youremail@domain.com">
															</div>
														</div>
														
														<div class="form-group">
															<label class="col-md-2 control-label">Personel Phone</label>
															<div class="col-md-6">
																<input id="idPerPhone" type="text" class="mask_phone form-control" placeholder="Example: 98 (765) 432-10-98"> 
																 
															</div>
														</div>
														  
														<div class="form-group">
															<label class="col-md-2 control-label">Personal Email</label>
															 <div class="col-md-6"> 
															  <input id="idPerEmail" class="form-control" data-validation="email" placeholder="youremail@domain.com">
															</div>
														</div>
														<div class="form-group">
															<label class="col-md-2 control-label">Emergency Phone</label>
															<div class="col-md-6">
																<input id="idEmePhone" type="text" class="mask_phone form-control"  placeholder="Example: 98 (765) 432-10-98">
																 
															</div>
														</div>
														 
														
														<div class="form-group">
															<label class="col-md-2 control-label">Emergency Email</label>
															 <div class="col-md-6"> 
															  <input id="idEmeEmail"  class="form-control" data-validation="email" placeholder="youremail@domain.com">
															</div>
														</div>
														
														<div class="form-group">
															   <div class="col-md-2"> </div>
																<label class="col-md-3 control-label">Home Country</label>
														</div>
														
														
														<div class="form-group">
															 
																<label class="col-md-2 control-label">Country</label>
																<div class="col-md-3"> 
															
																<select class="s2-select-search form-control" id="idHomeCountry" onchange="getHomeCity(this.value,'idHomeCity')">
																	                                     
																</select>
																</div>
															       
														</div>
														
														<div class="form-group">
															 
																<label class="col-md-2 control-label">City</label>
																<div class="col-md-3"> 
															
																<select class="s2-select-search form-control" id="idHomeCity">
																	                                     
																</select>
																</div>
															       
														</div>
														 <div class="form-group">
															<label class="col-md-2 control-label">Address</label>
															<div class="col-md-6">
																<input id="idHomeAddress" type="text" class="form-control" placeholder="...">
															</div>
														</div> 
														<div class="form-group">
															<label class="col-md-2 control-label">Personel Phone</label>
															<div class="col-md-6">
																<input id="idHPerPhone" type="text" class="mask_phone form-control"  placeholder="Example: 98 (765) 432-10-98">
															 </div>
														</div>
														<div class="form-group">
															<label class="col-md-2 control-label">Emergency Phone</label>
															<div class="col-md-6">
																<input id="idHEmePhone" type="text" class="mask_phone form-control"  placeholder="Example: 98 (765) 432-10-98">
															 </div>
														</div>
														
														<div class="form-group">
															<label class="col-md-2 control-label">Emergency Email</label>
															 <div class="col-md-6"> 
															  <input id="idHEmeEmail" class="form-control" data-validation="email" placeholder="youremail@domain.com">
															</div>
														</div>
														
														 
												 </form>
												 
												 
												<!-- END BASIC INPUTS -->
										     </div>
											
										<div class="tab-pane" id="tabs-6">
                                             <!-- BASIC INPUTS    Education-->
												   <form class="form-horizontal"> 
												   
												   <div class="form-group">
															<div class="col-sm-1 col-md-1 col-lg-1">
															</div>
															<div class="col-sm-9 col-md-10 col-lg-10 text-right">
																<button type="button" id="btn6clear" onclick="clearArea('tabs-6')" class="btn btn-info btn-sm">Clear </button>
																<button type="button" id="btn6update" onclick="updatePersonal('education')" class="btn btn-success btn-sm">Update </button>
																 <button type="button"  onclick="setTab('tabs-2')" class="btn btn-warning btn-sm">Previous</button>
																 <button type="button" onclick="setTab('tabs-4')" class="btn btn-warning btn-sm">Next
																</button>
															</div>
														</div>
													  <div class="form-group">
															 
																<label class="col-md-2 control-label">Graduation</label>
																<div class="col-md-3">  
																<select class="s2-select-search form-control" id="idGraduation">
																<option value="0" selected>Select...</option>
																	<option value="Doctorate" >Doctorate</option>
																	<option value="Master">Master</option>
																	<option value="Bachelor">Bachelor</option>
																	<option value="Diploma">Diploma</option>
																	<option value="College">College</option>
																	<option value="High School">High School </option>                                      
																</select>
																</div>
															       
														</div>
														<div class="form-group">
															<label class="col-md-2 control-label">Degree</label>
															<div class="col-md-6">
																<input id="idEduDegree"  type="text" class="form-control" placeholder="...">
															</div>
														</div>
														
														<div class="form-group">
															<label class="col-md-2 control-label">Name of School</label>
															<div class="col-md-6">
																<input id="idEduSchool"  type="text" class="form-control" placeholder="...">
															</div>
														</div>
														
														<div class="form-group">
															 
																<label class="col-md-2 control-label">Country</label>
																<div class="col-md-3"> 
															
																<select class="s2-select-search form-control" id="idEduCountry">
																	                                      
																</select>
																</div>
															       
														</div>
														
														<div class="form-group">                                                                
															<label class="col-md-2 control-label">Year of Graduation</label>
															<div class="col-md-2">
																<select class="bs-select" id="idYearofGrad">
																	<option value="2019">2019</option>     
																	<option value="2018">2018</option>     
																	<option value="2017">2017</option>     
																	<option value="2016">2016</option>     
																	<option value="2015">2015</option>                              
																</select>
															</div>  
														 </div>
														
														
														<div class="form-group">
														
															<label class="col-md-2 control-label">Graduation score</label>
															 
															<div class="col-md-1">
																<input id="idGScore1" min="1" type="number" class="form-control" placeholder="...">
															</div> 
															<label class="col-md-1 control-label">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;of</label>
															<div class="col-md-1">
																<input id="idGScore2" min="1" type="number" class="form-control" placeholder="...">
															</div>
															 
														</div>
														 
														 <div class="form-group" > 
														 <label class="col-md-2 control-label">Certificate Upload</label>
														  <div class="col-md-6"> 
																<input id="educationFile" type="file" class="file"   data-validation="size" data-validation-max-size="2048kb">
																<span class="help-block">Validate that file isn't larger than 2048 kilo bytes.</span>
																  
														 </div> 
														 
														 </div>  
														 
														  
													  </form>	
													  
													  <div class="form-group" style="display:none;" id="showEduDiv" > 
														   <label class="col-md-2 control-label">Certificate Files </label>
														  <div class="col-md-2" id="showEduFile"> </div> 
														 
														 </div> 
														
													 
												 
												<!-- END BASIC INPUTS -->
										    </div> 
										
										<div class="tab-pane" id="tabs-4">
                                                    <!-- BASIC INPUTS     Contract-->
												      <form class="form-horizontal"> 
													   <div class="form-group">
															<div class="col-sm-1 col-md-1 col-lg-1">
															</div>
															<div class="col-sm-9 col-md-10 col-lg-10 text-right">
																<button type="button" id="btn4clear" onclick="clearArea('tabs-4')" class="btn btn-info btn-sm">Clear </button>
																<button type="button"  id="btn4update" onclick="updatePersonal('contract')" class="btn btn-success btn-sm">Update </button>
																 <button type="button"  onclick="setTab('tabs-6')" class="btn btn-warning btn-sm">Previous</button>
																 <button type="button" onclick="setTab('tabs-3')" class="btn btn-warning btn-sm">Next
																</button>
															</div>
														</div>
														<div class="form-group">
															 
																<label class="col-md-2 control-label">Department</label>
																<div class="col-md-3"> 
															
																<select class="s2-select-search form-control" id="idContDepart" onchange="getDepJobAndDesg()">
																	<option value="0" selected >Select...</option>                                
																</select>
																</div>
															       
														</div>
													 	<div class="form-group">
															 
																<label class="col-md-2 control-label">Job Description</label>
																<div class="col-md-3"> 
															
																<select class="s2-select-search form-control" id="idContJobDesc" >
																	<option value="0"  selected>Select...</option>                             
																</select>
																</div>
															       
														</div>
													 	<div class="form-group">
															 
																<label class="col-md-2 control-label">Designation</label>
																<div class="col-md-3"> 
															
																<select class="s2-select-search form-control" id="idContDesig">
																	<option value="0"  selected>Select...</option>                                     
																</select>
																</div>
															       
														</div>
													 	<div class="form-group">
															 
																<label class="col-md-2 control-label">Discipline</label>
																<div class="col-md-3"> 
															
																<select class="s2-select-search form-control" id="idContDiscip">
																	<option value="0"  selected>Select...</option>                                     
																</select>
																</div>
															       
														</div>
														<div class="form-group">
														  <label class="col-md-2 control-label">Contract Date</label>
															<div class="col-md-3">
																<div class="input-group bs-datepicker">
																	<input id="idContDate" type="text" class="form-control" placeholder="01/01/2001">
																	<span class="input-group-addon">
																		<span class="icon-calendar-full"></span>
																	</span>
																</div>
															</div>
																
														 </div>
													    
														<div class="form-group">                                                                
															<label class="col-md-2 control-label">Contract Duration</label>
															<div class="col-md-2">
																<input  id="idContDura" min="1" type="number" class="form-control" placeholder="..">
															</div>
															
															<div class="col-md-2">
																<select class="s2-select" id="idContDura2"> 
																<option value="0" selected>Select...</option>
																	<option value="Year">Year</option>
																	<option value="Month">Month</option>
																	<option value="Week">Week</option>
																	<option value="Day">Day</option>                                 
																</select>
															</div>
															 
														 </div>
														 
														 <div class="form-group">                                                                
															<label class="col-md-2 control-label">Annual Vacation Days/Year</label>
															<div class="col-md-2">
																<input id="idContAnVaDa" min="1" type="number" class="form-control" placeholder="..">
															</div>
															<div class="col-md-2" hidden>
																<select class="s2-select" id="idContAnVaDa2">
																<option value="0" selected>Select...</option>
																	<option value="Year">Year</option>
																	<option value="Month">Month</option>
																	<option value="Week">Week</option>
																	<option value="Day">Day</option>                                          
																</select>
															</div>
														 </div>
														 
														 <div class="form-group">                                                                
															<label class="col-md-2 control-label">Annual Vacation Period</label>
															<div class="col-md-2">
																<input id="idContAnVaPer" min="1" type="number" class="form-control" placeholder="..">
															</div>
															<div class="col-md-2">
																<select class="s2-select" id="idContAnVaPer2">
																<option value="0" selected>Select...</option>
																	<option value="Year">Year</option>
																	<option value="Month">Month</option>
																	<option value="Week">Week</option>
																	<option value="Day">Day</option>                                         
																</select>
															</div>
														 </div>
														 
														  <div class="form-group">                                                                
															<label class="col-md-2 control-label">Basic Salary</label>
															<div class="col-md-2">
																<input id="idBasicSalary" min="1" type="number" class="form-control" placeholder="..">
															</div>
															<div class="col-md-2">
																<select class="s2-select-search form-control" id="idMoney1">                                      
																</select>
															</div>
														 </div>
														 
														 <div class="form-group">                                                                
															<label class="col-md-2 control-label">Home Allowance</label>
															<div class="col-md-2">
																<input id="idHomeAllow" min="1" type="number" class="form-control" placeholder="..">
															</div>
															<div class="col-md-2">
																<select class="s2-select-search form-control" id="idMoney2">                                    
																</select>
															</div>
														 </div>
														 
														 <div class="form-group">                                                                
															<label class="col-md-2 control-label">Transportation Allowance</label>
															<div class="col-md-2">
																<input id="idTransAllow"  min="1" type="number" class="form-control" placeholder="..">
															</div>
															<div class="col-md-2">
																<select class="s2-select-search form-control" id="idMoney3">                                      
																</select>
															</div>
														 </div>
														 
														 <div class="form-group">                                                                
															<label class="col-md-2 control-label">Food Allowance</label>
															<div class="col-md-2">
																<input id="idFoodAllow" min="1" type="number" class="form-control" placeholder="..">
															</div>
															<div class="col-md-2">
																<select class="s2-select-search form-control" id="idMoney4">                                     
																</select>
															</div>
														 </div>
														 
														<div class="form-group">
															<div class="col-md-2 "></div>
															<div class="col-md-4 ">
																<div class="app-checkbox"> 
																	<label><input type="checkbox" name="app-checkbox-1" id="idAllowCheck"  onclick="idAllowancefunck()" value="0">Other Allowance</label> 
																</div>
															</div>
														</div>
														
														<div class="form-group " id="idAllowanceDiv" style="display:none;" > 
															<div class="col-md-2">
																<input id="idOAllowText"  type="text" class="form-control" placeholder=" Other Allowance">
															</div>
															<div class="col-md-2">
																<input id="idOAllowMoney" min="1" type="number" class="form-control" placeholder="..">
															</div>
															<div class="col-md-2">
																<select class="s2-select-search form-control" id="idMoney5">                                     
																</select>
															</div>
														 </div>
														 
														 
												 </form>
												 
												 
												<!-- END BASIC INPUTS -->
										    </div>
		
									    <div class="tab-pane" id="tabs-3">
                                               <!-- BASIC INPUTS    Training-->
												   <form class="form-horizontal"> 
												   <div class="form-group">
															<div class="col-sm-1 col-md-1 col-lg-1">
															</div>
															<div class="col-sm-9 col-md-10 col-lg-10 text-right">
																<button type="button" id="btn3clear" onclick="clearArea('tabs-3')" class="btn btn-info btn-sm">Clear </button>
																<button type="button" id="btn3add"  onclick="ptAction()" class="btn btn-success btn-sm">Add </button>
																 <button type="button"  onclick="setTab('tabs-4')" class="btn btn-warning btn-sm">Previous</button>
																 <button type="button" onclick="setTab('tabs-5')" class="btn btn-warning btn-sm">Next
																</button>
															</div>
														</div>
														
														<div class="form-group">
															<label class="col-md-2 control-label">Name of Training</label>
															<div class="col-md-6">
																<input id="nameOfTraining" type="text" class="form-control" placeholder=""> 
															</div> 
															 
														</div>
														 <div class="form-group">                                       
																<label class="col-md-2 control-label">Date of Training</label>
																<div class="col-md-3">
																<div class="input-group">
																	<div class="input-group-addon">
																		<span class="fa fa-calendar"></span>
																	</div>
																	<input id="date"  type="text" class="form-control daterange" placeholder="09/01/2017 - 09/20/2017">
																</div>
																</div>
														 </div>
														 
														
														<div class="form-group">
															<label class="col-md-2 control-label">Organizer</label>
															<div class="col-md-6">
																<input id="organizer" type="text" class="form-control" placeholder="">
															</div> 
														</div>
														
														<div class="form-group">                                                                
															<label class="col-md-2 control-label">Certificate Validity</label>
															<div class="col-md-2">
																<input id="certificateValidity" type="text" class="form-control" placeholder="" data-validation="number"> 
															</div>
															<div class="col-md-2">
																<select id="validityType" class="s2-select">
																<option value="0" selected>Select...</option>
																	<option value="1">Day</option>
																	<option value="2">Week</option> 
																	<option value="3">Month</option>
																	<option value="4">Year</option>                                        
																</select>
															</div> 
														 </div>
														
														 <div class="form-group"> 
														 <label class="col-md-2 control-label">Certificate Upload</label>
														  <div class="col-md-6"> 
																<input id="trainingFile" type="file" multiple class="file" data-validation="size" data-validation-max-size="2048kb">
																<span class="help-block">Validate that file isn't larger than 2048 kilo bytes.</span>
																
														 </div>   
														 </div> 
														 
														
													 </form>	 
														  
														<div class="block-content">

														<table
															class="table table-striped table-bordered datatable-extended table-responsive">
															<thead>
																<tr>
																	<th>Index</th>
																	<th>Training</th>
																	<th>Date</th>
																	<th>Organizer</th>
																	<th>Certificate Validity</th>
																	<th>Certificate File</th>
																	<th>Actions</th>
																</tr>
															</thead>
															<tbody id="listTrainings">
															</tbody>
														</table>
													</div>
													 
												 
												<!-- END BASIC INPUTS -->
										    </div>

										<div class="tab-pane" id="tabs-5">
                                             <!-- BASIC INPUTS     Experiences-->
											  <form class="form-horizontal"> 
											   <div class="form-group">
															<div class="col-sm-1 col-md-1 col-lg-1">
															</div>
															<div class="col-sm-9 col-md-10 col-lg-10 text-right">
																<button type="button"  id="btn5clear" onclick="clearArea('tabs-5')" class="btn btn-info btn-sm">Clear </button>
																<button type="button"  id="btn5add" onclick="peAction2()" class="btn btn-success btn-sm">Add </button>
																 <button type="button"  onclick="setTab('tabs-3')" class="btn btn-warning btn-sm">Previous</button> 
																 
															</div>
														</div>
														 <div class="form-group">                                       
																<label class="col-md-2 control-label">Work Period</label>
																<div class="col-md-3">
																<div class="input-group">
																	<div class="input-group-addon">
																		<span class="fa fa-calendar"></span>
																	</div>
																	<input id="workPeriod" type="text" class="form-control daterange" placeholder="09/01/2017 - 09/20/2017">
																</div>
																</div>
														 </div>
														 
														 
														<div class="form-group">
															<label class="col-md-2 control-label">Company</label>
															<div class="col-md-6">
																<input id="company" type="text" class="form-control" placeholder="...">
															</div>
														</div>
														
														<div class="form-group">
															<label class="col-md-2 control-label">Position</label>
															<div class="col-md-6">
																<input id="position" type="text" class="form-control" placeholder="...">
															</div>
														</div>
														
														<div class="form-group">
															 
																<label class="col-md-2 control-label">Country</label>
																<div class="col-md-3"> 
															
																<select class="s2-select-search form-control"  id="idDesgCountry" onchange="getHomeCity(this.value,'idDesgCity')">
																	                                    
																</select>
																</div>
															       
														</div>
														
														<div class="form-group">
															 
																<label class="col-md-2 control-label">City</label>
																<div class="col-md-3"> 
															
																<select class="s2-select-search form-control" id="idDesgCity">                                    
																</select>
																</div>
															       
														</div>
														
														
														<div class="form-group">
															<label class="col-md-2 control-label">Project</label>
															<div class="col-md-6">
																<input id="project" type="text" class="form-control" placeholder="...">
															</div>
														</div>
														
														<div class="form-group">
															<label class="col-md-2 control-label">Client</label>
															<div class="col-md-6">
																<input id="client" type="text" class="form-control" placeholder="...">
															</div>
														</div>
														
														 
														 <div class="form-group">
															<div class="col-md-2 "></div>
															<div class="col-md-4 ">
																<div class="app-checkbox"> 
																	<label><input type="checkbox" name="app-checkbox-1" id="idApprovalofClient"  onclick="idApprovalofClientfunc()" value="0">Approval of Client</label> 
																</div>
															</div>
														</div>
														 <div class="form-group" id="idApprovalofClientFile" style="display:none;"> 
														 <label class="col-md-2 control-label">Certificate Upload</label>
														  <div class="col-md-6"> 
																<input multiple id="expFile"type="file" class="file" data-validation="size" data-validation-max-size="2048kb">
																<span class="help-block">Validate that file isn't larger than 2048 kilo bytes.</span>
																
														 </div>  
														 </div> 
														  
														  
												 </form>		 
												 
												 <div class="block-content">

														<table
															class="table table-striped table-bordered datatable-extended table-responsive">
															<thead>
																<tr>
																	<th>Index</th>
																	<th>Company</th>
																	<th>Position</th>
																	<th>Work Period</th>
																	<th>Country</th>
																	<th>City</th>
																	<th>Project</th>
																	<th>Client</th>
																	<th>Certificate</th>
																	<th>Actions</th>
																</tr>
															</thead>
															<tbody id="listExperiences">
															</tbody>
														</table>
													</div>
												 
												<!-- END BASIC INPUTS -->
									    </div>
															
                                        </div>
                                    </div>                                    
									
                                </div>
                               
                            </div>
                            
                         </div>
                                
                                
                                
                            </div>
                        </div>

                    </div>
                    <!-- END PAGE CONTAINER -->
                    
                </div>
                <!-- END APP CONTENT -->
                
           
                                
            </div>
            <!-- END APP CONTAINER -->
                        
            
            <div class="modal fade" id="modal-clean" tabindex="-1" role="dialog">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-body">

						<div class="app-heading app-heading-small app-heading-condensed">
							<div class="title">
								<h5>Files</h5>
								<p></p>
							</div>
						</div>
						<div class="block-content">

							<table
								class="table table-striped">
								<thead>
									<tr>
										<th>Index</th>
										<th>File Name</th>
										<th>Download</th>										
									</tr>
								</thead>
								<tbody id="trainingFileTable">
								</tbody>
							</table>
						</div>
						<p class="text-right">
							<button class="btn btn-default" data-dismiss="modal">Close</button>
						</p>
					</div>
				</div>
			</div>
		</div>
	       
	        
           <!-- START APP FOOTER -->
            <%@include file="footer.jsp" %>
            <!-- END APP FOOTER -->
            
            <!-- START APP SIDEPANEL -->
            <%@include file="sidepanel.jsp" %>
            <!-- END APP SIDEPANEL -->
            
            <!-- APP OVERLAY -->
            <%@include file="overlay.jsp" %>
            <!-- END APP OVERLAY -->
        </div>        
        <!-- END APP WRAPPER -->                
        
		
        <!-- CODEMIRROR -->
        <script type="text/javascript" src="js/vendor/syntaxhighlight/shCore.js"></script>
        <script type="text/javascript" src="js/vendor/syntaxhighlight/shBrushXml.js"></script>
        <!-- END CODEMIRROR -->
        
       
         
        <!-- IMPORTANT SCRIPTS -->
        <script type="text/javascript" src="js/vendor/jquery/jquery.min.js"></script>
        <script type="text/javascript" src="js/vendor/jquery/jquery-migrate.min.js"></script>
        <script type="text/javascript" src="js/vendor/jquery/jquery-ui.min.js"></script>
        <script type="text/javascript" src="js/vendor/bootstrap/bootstrap.min.js"></script>
        <script type="text/javascript" src="js/vendor/moment/moment.min.js"></script>
        <script type="text/javascript" src="js/vendor/customscrollbar/jquery.mCustomScrollbar.min.js"></script>
        <!-- END IMPORTANT SCRIPTS -->
        
		  <script type="text/javascript" src="custom/country.js"></script> 
		  <script type="text/javascript" src="custom/personel.js"></script> 
		  <script type="text/javascript" src="custom/navPage.js"></script> 
		<script type="text/javascript" src="js/vendor/bootstrap-select/bootstrap-select.js"></script>
        <script type="text/javascript" src="js/vendor/select2/select2.full.min.js"></script>
        <script type="text/javascript" src="js/vendor/bootstrap-datetimepicker/bootstrap-datetimepicker.js"></script>
        <script type="text/javascript" src="js/vendor/bootstrap-daterange/daterangepicker.js"></script>
        <script type="text/javascript" src="js/vendor/multiselect/jquery.multi-select.js"></script>
		<script type="text/javascript" src="js/vendor/maskedinput/jquery.maskedinput.min.js"></script>
	   <script type="text/javascript" src="js/vendor/datatables/jquery.dataTables.min.js"></script>
       <script type="text/javascript" src="js/vendor/datatables/dataTables.bootstrap.min.js"></script> 
		<script type="text/javascript" src="js/vendor/form-validator/jquery.form-validator.min.js"></script>
		
	    <script type="text/javascript" src="js/vendor/noty/jquery.noty.packaged.js"></script>
		
        <!-- APP SCRIPTS -->
        <script type="text/javascript" src="js/app.js"></script>
        <script type="text/javascript" src="js/app_plugins.js"></script> 
		<script type="text/javascript" src="custom/personalTraining.js"></script> 
		<script type="text/javascript" src="custom/personalExperience.js"></script>

		
        <!-- END APP SCRIPTS -->
        
        
		
        <script>
            $(document).ready(function(){
                SyntaxHighlighter.all(); 
                setTimeout(function(){
                    app.spy();
                },200);
            });
        </script>
		
		<script type="text/javascript">
            $.validate({
                modules : 'date,file,location',
                onValidate: function(){
                    
                    delayBeforeFire(function(){                                                
                        app.spy();
                    },100);
                                        
                }
            });
  
        </script>
		 
           
		  
    </body>
</html>