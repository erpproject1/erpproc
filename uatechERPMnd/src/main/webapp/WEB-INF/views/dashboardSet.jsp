<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %> 
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page session="false" %>
<!DOCTYPE html>
<html lang="en">
    <head>                        
        <title>Dashboard Settings</title>            
        
        <!-- META SECTION -->
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        
        <link rel="shortcut icon" href=" " type="image/x-icon">
        <link rel="icon" href="" type="image/x-icon">
        <!-- END META SECTION -->
        <!-- CSS INCLUDE -->        
        <link rel="stylesheet" href="css/styles.css">
        <!-- EOF CSS INCLUDE -->
    </head>
    <body>
        <!-- APP WRAPPER -->
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
                            <h1>Dashboard Settings</h1> 
                        </div>     
                    </div>
                   
                    <!-- END PAGE HEADING -->
                    
                    <!-- START PAGE CONTAINER -->
                    <div class="container">
                        
                         <div class="row">
                            <div class="col-md-12" style="position: relative;">
                          
                          
                        
                      <div class="block">
                              <div class="app-heading app-heading-small">
							<div class="title"> 
									<p></p>
								</div>
							</div>

                         <div class="row margin-top-10" id="UUT">
                              
                         <div class="col-md-12">
                             
                          <div class="form-group">
                          
	                      <div class="col-md-12" >  
	                      
	                        <div class="col-md-6">
	                        
							 	
							 	<div class="form-group">
	                            <div class="col-md-12"  >
								    <label class="col-md-4 control-label">Disallowed Area</label>
										 <div class="col-md-8">
										     <select class="s2-select " id="perArea"  >
											  <option value="0" selected >Select</option> 
											  </select>
			                              </div>
			                               
							 	</div>
							 	</div>  
							 	  
						     </div> 
						   
	                       <div class="col-md-6">
	                       
	                       <div class="form-group">
	                            <div class="col-md-12">
								    <label class="col-md-4 control-label">Department</label>
										 <div class="col-md-8">
										     <select class="s2-select-search" id="department" onchange="onchangeDep()">
										     <option value="0" selected >Select...</option> 
										     </select>
			                         </div>
			                               
							 	</div>
							 	</div>
							 	
							 	<div class="form-group">
	                            <div class="col-md-12">
								    <label class="col-md-4 control-label">Discipline</label>
										 <div class="col-md-8">
										     <select class="s2-select-search" id="discipline" onchange="onchangeDis()">
										     <option value="0" selected >Select...</option> 
										     </select>
			                              </div>
			                               
							 	</div>
							 	</div>
							 	
							 	<div class="form-group">
	                            <div class="col-md-12" id="jobDescriptionO">
								    <label class="col-md-4 control-label">Job Description</label>
										 <div class="col-md-8">
										     <select class="s2-select-search" id="jobDescription" onchange="onchangeDis()">
										     <option value="0" selected >Select...</option> 
										     </select>
			                              </div>
			                               
							 	</div>
							 	</div>
							 	
							 	
							 	<div class="form-group">
	                            <div class="col-md-12" id="userO">
								    <label class="col-md-4 control-label">Username</label>
										 <div class="col-md-8">
										     <select class="s2-select form-control" id="username2"   onchange="" multiple> 
										     </select>
			                              </div>
			                               
							 	</div>
							 	</div>
							 	
							 	
						   </div>
						   
	                    
	                     
	                        
							 </div>
							 
							
	                         </div> 
	                         
	                          <div class="form-group">
                                  <div class="col-md-12" >  
	                                 <div class="col-md-6">
	                                 <div class="col-md-4"></div> 
	                                  <div class="col-md-4">  
										  <button class=" btn btn-success col-md-12 " type="button"  
										 onclick="addDashboardSet()">Add</button>
					                  </div>
                                </div> 
                                </div>
                             </div> 
                             
                             <div class="form-group">
                                <div class="col-md-12" style="height: 20px">
                               	<!-- space -->
                               	 </div>
                             </div>
                             
                              <div class="form-group">
                                <div class="col-md-12">
								  <div class="table-responsive">
											  <table id="dashboardTable"
												class="table table-striped table-bordered ">
												<thead>
													<tr>   
														<th>Disallowed Area</th> 
														<th>Department</th>  
														<th>Discipline</th>  
														<th>Job Description</th>  
														<th>User</th>   
														<th></th> 
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
                             </div>

                    </div>
                    <!-- END PAGE CONTAINER -->
                    
                </div>
                <!-- END APP CONTENT -->
                                
            </div>
            <!-- END APP CONTAINER -->
          
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
        <script type="text/javascript" src="js/vendor/jquery/jquery.pleaseWait.js"></script>
        <!-- END IMPORTANT SCRIPTS -->
          
		 <script type="text/javascript" src="custom/dashboardSet.js"></script> 
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
	        <script type="text/javascript" src="js/vendor/sweetalert/sweetalert.min.js"></script>
	        <script type="text/javascript" src="js/aes.js"></script>
        <!-- APP SCRIPTS -->
        <script type="text/javascript" src="js/app.js"></script>
        <script type="text/javascript" src="js/app_plugins.js"></script>
        <!-- script type="text/javascript" src="js/app_demo.js"></script -->


		
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