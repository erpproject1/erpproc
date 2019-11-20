<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page session="false" %>
<!DOCTYPE html>
<html lang="en">
    <head>                        
        <title>Non Conformance</title>            
        
        <!-- META SECTION -->
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        
        <link rel="shortcut icon" href=" " type="image/x-icon">
        <link rel="icon" href=" " type="image/x-icon">
        <!-- END META SECTION -->
        <!-- CSS INCLUDE -->        
        <link rel="stylesheet" href="css/styles.css">
        <!-- EOF CSS INCLUDE -->
    </head>
    <body>
        <!-- APP WRAPPER -->
        <div class="app">            
			<input type="text" style="display: none" id="hidNCRID" />
			<input type="text" style="display: none" id="hidPermiss" value="<%=request.getSession().getAttribute("nonConfPerA").toString()%>"/>
			
            <!-- START APP CONTAINER style="display: block" -->
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
                            <h1>Non Conformance</h1> 
                        </div>     
                    </div>
                   
                    <!-- END PAGE HEADING -->
                    
                       <!-- START PAGE CONTAINER -->
                    <div class="container" id="conteyner">
                    
                    	 <div class="block">
                             
                              <div class="row margin-top-10">
                              
                                  <div class="col-md-12"> 
                                  
                                   <div class="form-group"> 
									  <div class="col-md-12"></div>
											 <div class="col-md-3" style="float: right;" align="right">
												   <button type="button" id="createNew"  onclick="createNew()" class="btn btn-facebook " >Create New</button>
												   <button type="button"  onclick="nonConfSet()" class="btn btn-warning ">Settings</button>
											 </div> 
										 
								    </div>
								    </div>
								    </div>
						  </div> 
								 
					
				 <div class="block block-condensed" id="stepDiv" style="display: none">
                          
							 
							 <div class="app-heading app-heading-small" style="border-bottom: 1px solid rgb(221, 221, 221)">
										<div class="title" style="width: 100%;">
												<div style="float: left;"id="recordNumber">
												<h2>Record</h2>
												<p></p>
												</div>
												<div style="float: right; " align="right">
												   <button type="button" id="close2" onclick="closeAndExpand(20)" class="btn btn-default btn-xs ">Close</button>
											  </div> 
										 </div>
										  
							 </div>
                         
                             <input type="number" style="display: none"  id="hid1" />
							 <input type="number" style="display: none"   id="hid2" />
                           <div class="block-content">
                                
                                <div class="wizard" id="wizard">
                                   
                                     <ul class="steps_7 anchor">
                                        <li>
                                            <a href="#step-1" class="selected" isdone="1" rel="1">
                                                <span class="stepNumber">1</span>
                                                <span class="stepDesc">Step 1<br><small></small></span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#step-2" class="disabled" isdone="0" rel="2">
                                                <span class="stepNumber">2</span>
                                                <span class="stepDesc">Step 2<br><small></small></span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#step-3" class="disabled" isdone="0" rel="3">
                                                <span class="stepNumber">3</span>
                                                <span class="stepDesc">Step 3<br><small></small></span>                   
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#step-4" class="disabled" isdone="0" rel="4">
                                                <span class="stepNumber">4</span>
                                                <span class="stepDesc">Step 4<br><small></small></span>                   
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#step-5" class="disabled" isdone="0" rel="5">
                                                <span class="stepNumber">5</span>
                                                <span class="stepDesc">Step 5<br> <small></small> </span>                   
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#step-6" class="disabled" isdone="0" rel="6">
                                                <span class="stepNumber">6</span>
                                                <span class="stepDesc">Step 6<br><small></small></span>                   
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#step-7" class="disabled" isdone="0" rel="7">
                                                <span class="stepNumber">7</span>
                                                <span class="stepDesc">Step 7<br><small></small></span>                   
                                            </a>
                                        </li>
                                    </ul> 
                                    
                                    <div id="step-1" >    
                                      <h4 class="text-uppercase text-bold text-rg heading-line-middle">&nbsp;<span>Non-Conformity</span></h4>                                        
                                        <div class="row">
                                           <div class="col-md-12">
                                           
                                               <div class="form-group"  >
												  	 <div class="col-md-3" style="float: right;" align="right"> 
															 <button class="btn btn-warning  btn-sm" onclick="backk(0)" disabled="disabled" id="geri1">Previous</button>
                                						     <button class="btn btn-warning  btn-sm"  onclick="nextt(2)" id="ileri1">Next</button>
														      
														</div>
									            </div>
                                              
												   
													  <div class="form-group">
															<label class="col-md-3 control-label">Statement Of Non-Conformity</label>
															<div class="col-md-6">
																<textarea id="stateNonCon"  class="form-control" rows="3" placeholder="....."></textarea>
																
															</div>
														</div>
													   <div class="form-group">
															<label class="col-md-3 control-label">Reference</label>
															<div class="col-md-6"> 
																<textarea id="reference"  class="form-control" rows="1" placeholder="....."></textarea>
																
															</div>
														</div>
														 <div class="form-group">
															 <label class="col-md-3 control-label">Date</label>
															  <div class="col-md-3">
																<div class="input-group bs-datepicker">
																	<input id="nonDate" type="text" class="form-control"
																		placeholder="01/01/2001"> 
																		<span class="input-group-addon"> <span class="icon-calendar-full"></span>
																	</span>
																</div>
															</div>
														</div>
														
														<div class="form-group">
															 <label class="col-md-3 control-label">Source</label>
															  <div class="col-md-3">
																<select class="s2-select form-control" id="source" >
																		 <option value="0" selected >Select ..</option>      
																		 <option value="Vendor" >Vendor</option>              
																		 <option value="Material Receiving" >Material Receiving</option>              
																		 <option value="Surveillence" >Surveillence</option>              
																		 <option value="Inspection" >Inspection</option>              
																		 <option value="Audit" >Audit</option>              
																		 <option value="Other" >Other</option>                                  
																 </select>
															</div>
														</div>
														<div class="form-group">
															 <label class="col-md-3 control-label">Repeted NCR</label>
															  <div class="col-md-3">
																<select class="s2-select  form-control" id="repeted" >     
																		 <option value="Yes" >Yes</option>              
																		 <option value="No" selected>No</option>                              
																 </select>
															</div>
														</div>
														
														<div class="form-group">
															 <label class="col-md-3 control-label">Grading</label>
															  <div class="col-md-3">
																<select class="s2-select  form-control" id="grading" >     
																		 <option value="0" selected >Select ..</option>  
																		 <option value="Minor" >Minor</option>               
																		 <option value="Moderate" >Moderate</option>               
																		 <option value="Major" >Major</option>                                     
																 </select>
															</div>
														</div>
														 
														
														<div class="form-group">
															<label class="col-md-3 control-label">Originator</label>
															<div class="col-md-3"  >
																<input id="originatorDesc" type="text" class="form-control" disabled="disabled"
																 value="<%=request.getSession().getAttribute("name")%> <%=request.getSession().getAttribute("surname")%>" >
																 <input id="originatorDesc2" type="text" class="form-control" style="display: none""
																 value="<%=request.getSession().getAttribute("name")%> <%=request.getSession().getAttribute("surname")%>" >
																 <input id="originator" type="text" class="form-control" style="display: none"
																 value="<%=request.getSession().getAttribute("personalid")%>"  >
															</div>
														</div>
														 
														<div class="form-group">
															<label class="col-md-3 control-label">Related Department</label>
															<div class="col-md-3">
																<select class="s2-select-search form-control" id="department" > 
																	 <option value="0" selected >Select...</option>                                 
															  </select> 
																 
															</div>
														</div> 
														<div class="form-group">
															<label class="col-md-3 control-label">Discipline </label>
															<div class="col-md-3">
																<select  
																	class="s2-select-search form-control" id="discipline">
																	<option value="0" selected>Select</option>
																</select>
																 
															</div>
														</div>
														<div class="form-group">
															<label class="col-md-3 control-label">Attachment </label>
														 
							                             <div class="col-md-3"> 
															 <button type="button" onclick="getNonConfFiles(0)" class="btn btn-default btn-icon" 
															  data-toggle="modal" data-target="#modal-File1" title="Show This Record">
															  <span class="icon-paperclip"></span></button>
														 	 <input  id="nonFile1" type="file" class="file"    multiple
																accept=".pdf, .PDF, .JPEG, .jpeg, .jpg, .JPG, .png, .PNG" 
																data-validation="size" data-validation-max-size="4096kb">
																<span class="help-block" style="font-size: 9"></span>
																
														 </div> 
														 
														</div>
														
														
														
														 <div class="form-group"> 
															 <div class="col-md-3"></div>
															 <div class="col-md-3">
															  <button type="button" id="btnSave1" onclick="btnSave(1)" class="btn btn-success ">SAVE AND POST </button>
														  </div>
													  </div>
														 
												 
                                        		
                                        </div>  
                                        </div>                                        
                                    </div>
                                    <div id="step-2">
                                        <h4 class="text-uppercase text-bold text-rg heading-line-middle">&nbsp;<span>Confirmation</span></h4>
                                         <div class="row">
                                           <div class="form-group">
												  	 <div class="col-md-3" style="float: right;" align="right"> 
															 <button class="btn btn-warning  btn-sm" onclick="backk(1)"  id="geri2">Previous</button>
                                						    <button class="btn btn-warning  btn-sm"  onclick="nextt(3)" id="ileri2">Next</button>
														    
														</div>
									            </div>
                                                    
														
														<div class="form-group">
															 <label class="col-md-2 control-label">Non conformance</label>
															  <div class="col-md-3">
																<select class="s2-select  form-control" id="nonConStep2" >     
																		 <option value="0" selected >Select ..</option>  
																		 <option value="Yes" >Accepted</option>               
																		 <option value="No" >Rejected</option>                                  
																 </select>
															</div>
														</div>
														  
													     <div class="form-group">
															<label class="col-md-2 control-label">Justification</label>
															<div class="col-md-8"> 
																 <textarea id="justifStep2"  class="form-control" rows="3" placeholder="....."></textarea>
																
															</div>
														</div>
														<div class="form-group">
															<label class="col-md-2 control-label">Attachment </label>
														 
							                             <div class="col-md-8"> 
																<button type="button" onclick="getNonConfFiles(0)" class="btn btn-default btn-icon"  data-toggle="modal" data-target="#modal-File1" title="Show This Record"><span class="icon-paperclip"></span></button>
														 	    <input  id="nonFile2" type="file" class="file"    multiple
																accept=".pdf, .PDF, .JPEG, .jpeg, .jpg, .JPG, .png, .PNG" 
																data-validation="size" data-validation-max-size="4096kb">
																<span class="help-block" style="font-size: 9"></span>
														 </div> 
														</div>
														 
														 <div class="form-group"> 
															<div class="col-md-2"></div>
															<div class="col-md-3">
																<button type="button" id="btnSave2" onclick="btnSave(2)" class="btn btn-success ">SAVE AND POST </button>
															</div>
													     </div>
														 
												  
                                        
                                       
                                             
                                        </div>    
                                    </div>                      
                                    <div id="step-3">
                                        <h4 class="text-uppercase text-bold text-rg heading-line-middle">&nbsp;<span>Planning</span></h4>
                                         <div class="row">
                                             <div class="form-group">
												  	 <div class="col-md-3" style="float: right;" align="right">   
															<button class="btn btn-warning  btn-sm" onclick="backk(2)"  id="geri3">Previous</button>
                                						   
															<button class="btn btn-warning  btn-sm"  onclick="nextt(4)" id="ileri3">Next</button>
														      
														</div>
									            </div> 
												   
														
														<div class="form-group">
															 <label class="col-md-2 control-label">Correction</label>
															  <div class="col-md-3">
																<select class="s2-select  form-control" id="correction" >     
																		 <option value="0" selected >Select ..</option>  
																		 <option value="Use As Is" >Use As Is</option>               
																		 <option value="Repair" >Repair</option>               
																		 <option value="Replace" >Replace</option>             
																		 <option value="Rework" >Rework</option>             
																		 <option value="Return" >Return</option>             
																		 <option value="Reject" >Reject</option>                                  
																 </select>
															</div>
														</div>
														  
													     <div class="form-group">
															<label class="col-md-2 control-label">Correction detail</label>
															<div class="col-md-8"> 
																 <textarea id="correcDetail"  class="form-control" rows="3" placeholder="....."></textarea>
																
															</div>
														</div>
													     <div class="form-group">
															<label class="col-md-2 control-label">Proposed Corrective Action</label>
															<div class="col-md-8"> 
																 <textarea id="proCorAction"  class="form-control" rows="3" placeholder="....."></textarea>
																
															</div>
														</div>
														
														  <div class="form-group">
															 <label class="col-md-2 control-label">Action Close Date</label>
															  <div class="col-md-3">
																<div class="input-group bs-datepicker">
																	<input id="actCloseDate" type="text" class="form-control"
																		placeholder="01/01/2001"> 
																		<span class="input-group-addon"> <span class="icon-calendar-full"></span>
																	</span>
																</div>
															</div>
														</div>
														<div class="form-group">
															<label class="col-md-2 control-label">Attachment </label>
														 
							                             <div class="col-md-3"> 
																<button type="button" onclick="getNonConfFiles(0)" class="btn btn-default btn-icon" data-toggle="modal" data-target="#modal-File1"  title="Show This Record"><span class="icon-paperclip"></span></button>
														 	   
																<input  id="nonFile3" type="file" class="file"    multiple
																accept=".pdf, .PDF, .JPEG, .jpeg, .jpg, .JPG, .png, .PNG" 
																data-validation="size" data-validation-max-size="4096kb">
																<span class="help-block" style="font-size: 9"></span>
														 </div> 
														</div>
														  <div class="form-group"> 
															<div class="col-md-2"></div>
															<div class="col-md-3">
																<button type="button" id="btnSave3" onclick="btnSave(3)" class="btn btn-success ">SAVE AND POST </button>
															</div>
													     </div>
														 
												 
                                            
                                        </div>    
                                    </div>
                                    <div id="step-4">
                                        <h4 class="text-uppercase text-bold text-rg heading-line-middle">&nbsp;<span>Review</span></h4>
                                        <div class="row">
                                         <div class="form-group">
												  	 <div class="col-md-3" style="float: right;" align="right">  
															<button class="btn btn-warning  btn-sm" onclick="backk(3)"  id="geri4">Previous</button>
                                						     
															<button class="btn btn-warning  btn-sm"  onclick="nextt(5)" id="ileri4">Next</button>
														       
														</div>
									                </div> 
												   
														
														<div class="form-group">
															 <label class="col-md-2 control-label">Statu</label>
															  <div class="col-md-3">
																<select class="s2-select  form-control" id="statusStep4" >     
																		 <option value="0" selected >Select ..</option>  
																		 <option value="Yes" >Acceptable</option>               
																		 <option value="No" >NOT Acceptable</option>                                  
																 </select>
															</div>
														</div>
														
														<div class="form-group">
															<label class="col-md-2 control-label">Justification</label>
															<div class="col-md-8"> 
																 <textarea id="justifStep4"  class="form-control" rows="3" placeholder="....."></textarea>
																
															</div>
														</div>
														 
														  <div class="form-group">
															<label class="col-md-2 control-label">Attachment </label>
														 
							                             <div class="col-md-8"> 
																<button type="button" onclick="getNonConfFiles(0)" class="btn btn-default btn-icon" data-toggle="modal" data-target="#modal-File1"  title="Show This Record"><span class="icon-paperclip"></span></button>
														 	   
																<input  id="nonFile4" type="file" class="file"    multiple
																accept=".pdf, .PDF, .JPEG, .jpeg, .jpg, .JPG, .png, .PNG" 
																data-validation="size" data-validation-max-size="4096kb">
																<span class="help-block" style="font-size: 9"></span>
														 </div> 
														</div>
														  <div class="form-group"> 
															<div class="col-md-2"></div>
															<div class="col-md-3">
																<button type="button" id="btnSave4" onclick="btnSave(4)" class="btn btn-success ">SAVE AND POST </button>
															</div>
													     </div>
														 
												  
                                              
                                        </div>    
                                    </div> 
                                    <div id="step-5">
                                        <h4 class="text-uppercase text-bold text-rg heading-line-middle">&nbsp;<span>Verification and Closure</span></h4>
                                        <div class="row">
                                             <div class="form-group">
												  	 <div class="col-md-3" style="float: right;" align="right">  
															<button class="btn btn-warning  btn-sm" onclick="backk(4)"  id="geri5">Previous</button>
                                						 
															<button class="btn btn-warning  btn-sm"  onclick="nextt(6)" id="ileri5">Next</button>
														   
														</div>
									            </div> 
												   
                                           <div class="form-group">
															<label class="col-md-2 control-label">Root-Cause Analysis</label>
															<div class="col-md-8">
																 <textarea id="rootCauseAnalysis"  class="form-control" rows="3" placeholder="....."></textarea>
															</div>
								           </div>
								           	 	   
                                           <div class="form-group">
											    <label class="col-md-2 control-label">Corrective Actions</label>
												  <div class="col-md-8">
													  <textarea id="correctiveActions"  class="form-control" rows="3" placeholder="....."></textarea>
												 </div>
								           </div>	
								           <div class="form-group">
															<label class="col-md-2 control-label">Attachment </label>
														 
							                             <div class="col-md-8">
																<button type="button" onclick="getNonConfFiles(0)" class="btn btn-default btn-icon" data-toggle="modal" data-target="#modal-File1"  title="Show This Record"><span class="icon-paperclip"></span></button>
														 	    
																<input  id="nonFile5" type="file" class="file"    multiple
																accept=".pdf, .PDF, .JPEG, .jpeg, .jpg, .JPG, .png, .PNG" 
																data-validation="size" data-validation-max-size="4096kb">
																<span class="help-block" style="font-size: 9"></span>
														 </div> 
														</div>
								           <div class="form-group"> 
															<div class="col-md-2"></div>
															<div class="col-md-3">
																<button type="button" id="btnSave5" onclick="btnSave(5)" class="btn btn-success ">SAVE AND POST </button>
															</div>
										     </div>
														 
								             
                                              
														 
                                             
                                        </div>    
                                    </div> 
                                    <div id="step-6">
                                        <h4 class="text-uppercase text-bold text-rg heading-line-middle">&nbsp;<span>Evaluation</span></h4>
                                        <div class="row">
                                              <div class="form-group">
												  	 <div class="col-md-3" style="float: right;" align="right">  
															<button class="btn btn-warning  btn-sm" onclick="backk(5)"  id="geri6">Previous</button>
                                						   
															<button class="btn btn-warning  btn-sm"  onclick="nextt(7)" id="ileri6">Next</button>
														      
														</div>
									            </div>
                                            
												      <div class="form-group">
															 <label class="col-md-2 control-label">Statu</label>
															  <div class="col-md-3">
																<select class="s2-select  form-control" id="statusStep6" >     
																		 <option value="0" selected >Select ..</option>  
																		 <option value="Yes" >NCR Completed</option>               
																		 <option value="No" >NCR Not Completed</option>                                  
																 </select>
															</div>
														</div>
														
														<div class="form-group">
															<label class="col-md-2 control-label">Justification</label>
															<div class="col-md-8"> 
																 <textarea id="justifStep6"  class="form-control" rows="3" placeholder="....."></textarea>
																
															</div>
														</div>
														 <div class="form-group">
															<label class="col-md-2 control-label">Attachment </label>
														 
							                             <div class="col-md-8"> 
																<button type="button" onclick="getNonConfFiles(0)" class="btn btn-default btn-icon" data-toggle="modal" data-target="#modal-File1" 
																 title="Show This Record"><span class="icon-paperclip"></span></button>
														 	   
																<input  id="nonFile6" type="file" class="file"    multiple
																accept=".pdf, .PDF, .JPEG, .jpeg, .jpg, .JPG, .png, .PNG" 
																data-validation="size" data-validation-max-size="4096kb">
																<span class="help-block" style="font-size: 9"></span>
														 </div> 
														</div>
														   
														 <div class="form-group"> 
															<div class="col-md-2"></div>
															<div class="col-md-3">
																<button type="button" id="btnSave6" onclick="btnSave(6)" class="btn btn-success ">SAVE AND POST </button>
															</div>
													     </div>
														 
												 
											
                                        </div>    
                                    </div>   
                                    <div id="step-7">
                                        <h4 class="text-uppercase text-bold text-rg heading-line-middle">&nbsp;<span>Client Evaluation</span></h4>
                                        <div class="row">
                                              <div class="form-group">
												  	 <div class="col-md-3" style="float: right;" align="right">  
															<button class="btn btn-warning  btn-sm" onclick="backk(6)"  id="geri7">Previous</button>
                                						    
															<button class="btn btn-warning  btn-sm"  onclick="nextt(0)" disabled="disabled" id="ileri7">Next</button>
														      
														</div>
									            </div>
                                              
												      <div class="form-group">
															 <label class="col-md-2 control-label">Statu</label>
															  <div class="col-md-3">
																<select class="s2-select  form-control" id="statusStep7" >     
																		 <option value="0" selected >Select ..</option>  
																		 <option value="Yes" >NCR Completed</option>               
																		 <option value="No" >NCR Not Completed</option>                                  
																 </select>
															</div>
														</div>
														
														<div class="form-group">
															<label class="col-md-2 control-label">Justification</label>
															<div class="col-md-8"> 
																 <textarea id="justifStep7"  class="form-control" rows="3" placeholder="....."></textarea>
																
															</div>
														</div>
														 <div class="form-group">
															<label class="col-md-2 control-label">Attachment </label>
														 
							                             <div class="col-md-8"> 
																<button type="button" onclick="getNonConfFiles(0)" class="btn btn-default btn-icon" data-toggle="modal" data-target="#modal-File1"  title="Show This Record"><span class="icon-paperclip"></span></button>
														 	   
																<input  id="nonFile7" type="file" class="file"    multiple
																accept=".pdf, .PDF, .JPEG, .jpeg, .jpg, .JPG, .png, .PNG" 
																data-validation="size" data-validation-max-size="4096kb">
																<span class="help-block" style="font-size: 9"></span>
														 </div> 
														</div>
														   
														 <div class="form-group"> 
															<div class="col-md-2"></div>
															<div class="col-md-3">
																<button type="button" id="btnSave7" onclick="btnSave(7)" class="btn btn-success ">SAVE AND POST </button>
															</div>
													     </div>
														 
												  
											
                                        </div>    
                                    </div> 
                                    <div id="step-8" style="display: none">
                                        <h4 class="text-uppercase text-bold text-rg heading-line-middle">&nbsp;<span>Result</span></h4>
                                        <div class="row">
                                              <div class="form-group">
												  	 <div class="col-md-3" style="float: right;" align="right">  
															<button class="btn btn-warning  btn-sm" onclick="backk(7)"  id="geri8">Previous</button>
                                					  </div>
									            </div>
                                              
												  <div class="form-group">
														 <div class="col-md-3">
														  <h1>This NCR Completed</h1> 
														 </div>
														</div>
													 
                                        </div>    
                                    </div>   
                                                                         
                                </div> 
                            </div>                             
                      
                        </div>
                       
					
								    
				  <div class="block" >
		                              <div class="app-heading app-heading-small" style="border-bottom: 1px solid rgb(221, 221, 221)">
										<div class="title" style="width: 100%;">
												<div style="float: left">
												<h2>Pending Transactions </h2>
												<p></p> 
												</div>
												<div style="float: right;" align="right">
												   <button type="button" id="close1" onclick="closeAndExpand(10)" class="btn btn-default btn-xs ">Close</button>
												   <button type="button" id="expand1" onclick="closeAndExpand(11)" style="display: none" class="btn btn-default btn-xs ">Expand</button>
											 </div> 
										 </div>
										  
										</div>
                              <div class="row margin-top-10">
                              
                                  <div class="col-md-12" id="space1"> 
                                  
								    <div class="form-group"> 
									  <div class="col-md-12">
									  		<div class="table-responsive">
											  <table id="nCTable" class="table table-striped table-bordered ">
												<thead>
													<tr>  
														<th></th> 
														<th>S/N</th> 
														<th>Statement Of Non-Conformity</th> 
														<th>Reference</th>  
														<th>Date</th>
														<th>Source</th>  
														<th>Repeted NCR</th>
														<th>Grading</th> 
														<th>Originator</th>  
														<th>Related Department</th>
														<th>Discipline</th> 
														<th>Report</th> 
													</tr>
												</thead>
											  </table> 
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
      
           
            
            <div class="modal fade" id="modal-File1" tabindex="-1" role="dialog">
			<div class="modal-dialog" role="document">
				<div id="modalContent" class="modal-content">
					<div id="idBodyofModal" class="modal-body">
						<div class="app-heading app-heading-small app-heading-condensed">
							<div class="title">
								<h5>Files</h5>
								<p></p>
							</div>
						</div>
						<div class="block-content">

							<table class="table table-striped">
								<thead>
									<tr>
										<th>Index</th>
										<th>File Name</th>
										<th>Download</th>
									</tr>
								</thead>
								<tbody id="FileTable">
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
		 <div class="modal fade" id="modal-File2" tabindex="-1" role="dialog">
			<div class="modal-dialog" role="document">
				<div id="modalContent" class="modal-content">
					<div id="idBodyofModal" class="modal-body">
						<div class="app-heading app-heading-small app-heading-condensed">
							<div class="title">
								<h5>Add a file to report</h5>
								<p></p>
							</div>
						</div>
						<div class="block-content">

							<table class="table table-striped">
								<thead>
									<tr>
										<th>Select</th>
										<th>Index</th>
										<th>File Name</th>
										<th>Download</th>
									</tr>
								</thead>
								<tbody id="FileTable2">
								</tbody>
							</table>
						</div>
						<p class="text-right" id="modalButton">
							 
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
        
		 
		<script type="text/javascript" src="custom/navPage.js"></script> 
	    <script type="text/javascript" src="js/vendor/bootstrap-select/bootstrap-select.js"></script>
        <script type="text/javascript" src="js/vendor/select2/select2.full.min.js"></script> 
        <script type="text/javascript" src="js/vendor/bootstrap-datetimepicker/bootstrap-datetimepicker2.js"></script>
	   <script type="text/javascript" src="js/vendor/bootstrap-daterange/daterangepicker.js"></script>
        <script type="text/javascript" src="js/vendor/multiselect/jquery.multi-select.js"></script>
		<script type="text/javascript" src="js/vendor/maskedinput/jquery.maskedinput.min.js"></script>
	    <script type="text/javascript" src="js/vendor/datatables/jquery.dataTables.min.js"></script>
        <script type="text/javascript" src="js/vendor/datatables/dataTables.bootstrap.min.js"></script> 
		<script type="text/javascript" src="js/vendor/form-validator/jquery.form-validator.min.js"></script>
	     <script type="text/javascript" src="js/vendor/jquery/jquery.pleaseWait.js"></script>
		 
        <script type="text/javascript" src="js/vendor/smartwizard/jquery.smartWizard.js"></script>
        <script type="text/javascript" src="js/vendor/noty/jquery.noty.packaged.js"></script>
	    <script type="text/javascript" src="js/vendor/sweetalert/sweetalert.min.js"></script>
        <!-- APP SCRIPTS -->
        <script type="text/javascript" src="js/app.js"></script>
        <script type="text/javascript" src="js/app_plugins.js"></script>
        <!-- script type="text/javascript" src="js/app_demo.js"></script --> 
  

		<script type="text/javascript" src="custom/nonConformance.js"></script> 

		
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