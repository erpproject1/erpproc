<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<!DOCTYPE html>
<html lang="en">
    <head>                        
        <title>Add User</title>            
        
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
                            <h1>Add User</h1> 
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
								<h2> Username Define</h2>
								<p></p>
							</div>
						</div>
                    <div class="row margin-top-10">
                              
                        <div class="col-md-12">
                     
                            <div class="form-group">
	                            <div class="col-md-12"  >
								    <label class="col-md-2 control-label">Personal</label>
										 <div class="col-md-4" id="selectPersonaldiv">
										     <select class="s2-select-search" id="selectPersonal"  >
										     <option value="0" selected >Select...</option> 
										     </select>
			                              </div>
			                               
							 	</div>
							 	</div>
	                       
							   <div class="form-group">
	                            <div class="col-md-12">
								    <label class="col-md-2 control-label">Username</label>
										 <div class="col-md-4">
										   <input type="text" id="userName" class="form-control" placeholder="username" >
			                              </div>
			                               
							 	</div>
							 	</div>
							 	
							 	<div class="form-group">
	                            <div class="col-md-12">
								    <label class="col-md-2 control-label">Password</label>
										 <div class="col-md-4">
										   <input type="password" id="Pass" class="form-control"  placeholder="password" >
			                              </div>
			                               
							 	</div>
							 	</div>
							 	
							 	<div class="form-group">
	                            <div class="col-md-12">
								    <label class="col-md-2 control-label">Re-Password</label>
										 <div class="col-md-4">
										   <input type="password" id="rePass" class="form-control"   placeholder="Re-password" >
			                              </div>
			                               
							 	</div>
							 	</div>
							 	
							 	
							 	
							 	 
							 
							 	
                             <div class="form-group">
	                            <div class="col-md-12"> 
										 <div class="col-md-2"></div>
										 <div class="col-md-2" id="saveUsernamediv">
										   <button class=" btn btn-success col-md-12 " type="button" id="saveUsername"
													onclick="addUserNameDefine()">Add</button>
			                              </div>
			                               
							 	</div>
							 	</div>	
							 
							  	
                             
                             <div class="form-group">
                                <div class="col-md-12" style="height: 50px">
                               	<!-- space -->
                               	 </div>
                             </div>
                             
                              <div class="form-group">
                                <div class="col-md-12">
								  <div class="table-responsive">
											  <table id="userDefineTable"
												class="table table-striped table-bordered ">
												<thead>
													<tr> 
														<th>UserId</th>
														<th>Username</th>
														<th>Name</th>
														<th>Middle Name</th>
														<th>Last Name</th>  
														<th> </th> 
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
         <div class="modal fade" id="modal-info" tabindex="-1" role="dialog" aria-labelledby="modal-warning-header">                        
                <div class="modal-dialog modal-warning" role="document">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true" class="icon-cross"></span></button>

                    <div class="modal-content">
                        <div class="modal-header">                        
                            <h4 class="modal-title" id="modal-info-header">Warning</h4>
                        </div>
                        <div class="modal-body">
                            <h2>Do you want to change the User Type?</h2>
                            <h3>Are You Sure?</h3>
                         </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-link" data-dismiss="modal">NO</button>
                            <button type="button" class="btn btn-warning" onclick="setUserType2()">YES</button>
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
        <script type="text/javascript" src="js/vendor/jquery/jquery.pleaseWait.js"></script>
        <!-- END IMPORTANT SCRIPTS -->
          
		 <script type="text/javascript" src="custom/userNameDefine.js"></script> 
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