<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>    	
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>  
<%@ page session="false" %>

<!DOCTYPE html>
<html lang="en">
    <head>                        
        <title>EMPLOYEE LIST</title>            
        
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
                            <h1 >EMPLOYEE LIST</h1> 
                        </div>     
                    </div>
                   
                    <!-- END PAGE HEADING -->
                    
                    <!-- START PAGE CONTAINER -->
                    <div class="container">
                        
                      <div class="row">
						<div class="col-md-12" style="position: relative;">
						  <div class="block">
							  
								   <div class="title" style="float: right">
										<a href="personel" id="btnCreateNew" class="btn btn-facebook btn-sm">Create New</a>
								     </div>
							  
							<div  class="table-responsive">
                                    <table  id="idtable" class="table table-striped table-bordered "><!-- datatable-extended -->
                                        <thead>
											<tr > 
												<th></th>
												<th>No</th>
												<th>Company ID</th>
												<th>Type</th>
												<th>Name</th>
												<th>M. Name</th>
												<th>L. Name</th>
												<th>National Id</th>
												<th>Passport No</th>
												<th>Country</th> 
												<th></th>
											</tr>
											</thead>  
										</table>
								  
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
        <!-- END IMPORTANT SCRIPTS -->
        <script type="text/javascript" src="custom/employee.js"></script>  
        <script type="text/javascript" src="custom/navPage.js"></script>
        	<script type="text/javascript"
		src="js/vendor/noty/jquery.noty.packaged.js"></script>
        <!-- THIS PAGE SCRIPTS -->
        <script type="text/javascript" charset="utf8"  src="js/vendor/datatables/jquery.dataTables.min.js"></script>
        <script type="text/javascript" src="js/vendor/datatables/dataTables.bootstrap.min.js"></script>
        <!-- END THIS PAGE SCRIPTS -->
        <!-- APP SCRIPTS -->
        <script type="text/javascript" src="js/app.js"></script>
        <script type="text/javascript" src="js/app_plugins.js"></script>
      
     
		 
   
        
        
		
        <script>
            $(document).ready(function(){
                SyntaxHighlighter.all(); 
                setTimeout(function(){
                    app.spy();
                },200);
            });
            
            
        </script>
		 
			
		
		 
		  
    </body>
</html>