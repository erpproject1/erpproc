<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<!DOCTYPE html>
<html lang="en">
    <head>                        
        <title>Client Violation</title>            
        
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
    <input type="text" hidden style="display: none" id="id" />
    <input type="text" hidden style="display: none" id="vCodeId" /> 
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
                            <h1>Client Violation</h1> 
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
                                <form class="form-horizontal">
                                
                                 <div class="form-group">
								    <div class="col-md-12"> 									   
									    <div class="col-md-6"> 
									    <label class="col-md-4 control-label">Date</label>
									    <div class="col-md-8"> 
									      <input id="pDate" type="text" class="form-control bs-datepicker" placeholder="..."   >
									    </div>
									    </div>
									     <div class="col-md-6"> 
									    <label class="col-md-4 control-label">Violation No</label>
									    <div class="col-md-8"> 
									     <input id="violationNo" disabled type="text" class="form-control"  placeholder="..."   >
									    </div>
									    </div>
								    </div>
								    </div>
								    
								    <div class="form-group">
								    <div class="col-md-12"> 
									    <div class="col-md-6"> 
									    <label class="col-md-4 control-label">Violation Code</label>
									    <div class="col-md-8"> 
									     <select class="s2-select-search form-control" id="vCode" onchange="vCodeChange(this.value,1)">
												 <option value="0" selected >Select...</option>                                
										  </select> 
									    </div>
									    </div>
									    <div class="col-md-6"> 
									    <label class="col-md-4 control-label">Violation Type</label>
									    <div class="col-md-8"> 
									     <select class="s2-select-search form-control" id="vType" onchange="vCodeChange(this.value,0)">
												 <option value="0" selected >Select...</option>                                 
										  </select> 
									    </div>
									    </div>
								    </div>
								    </div>
								    <div class="form-group">
								    <div class="col-md-12"> 
									    <div class="col-md-6"> 
									    <label class="col-md-4 control-label">Department</label>
									    <div class="col-md-8"> 
									     <select class="s2-select-search form-control" id="department"> 
												 <option value="0" selected >Select...</option>                                 
										  </select> 
									    </div>
									    </div>
									    <div class="col-md-6"> 
									    <label class="col-md-4 control-label">Discipline</label>
									    <div class="col-md-8"> 
									     <select id="discipline"   class="s2-select-search form-control"  >
														 <option value="0" selected >Select</option>                                
												 </select>
									    </div>
									    </div>
								    </div>
								    </div>
								    
								    
								    <div class="form-group">
								    <div class="col-md-12"> 
									    <div class="col-md-6"> 
									    <label class="col-md-4 control-label">Description</label>
									    <div class="col-md-8"> 
									      <input id="description" type="text" class="form-control"  placeholder="..."   >
									    </div>
									    </div>
									    <div class="col-md-6"> 
									    <label class="col-md-4 control-label">Reference</label>
									    <div class="col-md-8"> 
									      <input id="reference" type="text" class="form-control"  placeholder="..."   >
									    </div>
									    </div>
								    </div>
								    </div>
								    
								    
								    
								   <div class="form-group">
								    <div class="col-md-12"> 
									    <div class="col-md-6"> 
									    <label class="col-md-4 control-label">Subject</label>
									    <div class="col-md-8"> 
									      <input id="subject" type="text" class="form-control"  placeholder="..."   >
									    </div>
									    </div>
									    <div class="col-md-6"> 
									    <label class="col-md-4 control-label">Location</label>
									    <div class="col-md-8"> 
									      <input id="location" type="text" class="form-control"  placeholder="..."   >
									    </div>
									    </div>
								    </div>
								    </div>
								    
								    
								   <div class="form-group">
								    <div class="col-md-12"> 
									    <div class="col-md-6"> 
									    <label class="col-md-4 control-label">Initiator</label>
									    <div class="col-md-8"> 
									      <select id="initiator"   class="s2-select-search form-control"  >
														 <option value="0" selected >Select</option>                                
											 </select>
									    </div>
									    </div> 
									    <div class="col-md-6"> 
									    <label class="col-md-4 control-label">Correction</label>
									    <div class="col-md-8"> 
									      <input id="correction" type="text" class="form-control"  placeholder="..."   >
									    </div>
									    </div>
									     
								    </div>
								    </div>
								    
								     <div class="form-group">
								    <div class="col-md-12">
									    <div class="col-md-6"> 
									    <label class="col-md-4 control-label">Root Cause</label>
									    <div class="col-md-8"> 
									      <input id="rootcause" type="text" class="form-control"  placeholder="..."   >
									    </div>
									    </div>
									    <div class="col-md-6"> 
									    <label class="col-md-4 control-label">Corrective Action</label>
									    <div class="col-md-8"> 
									      <input id="correctiveAction" type="text" class="form-control"  placeholder="..."   >
									    </div>
									    </div>
								    </div>
								    </div>
								    
								     <div class="form-group">
								    <div class="col-md-12"> 
									    <div class="col-md-6"> 
									    <label class="col-md-4 control-label">ACD</label>
									    <div class="col-md-8"> 
									      <input id="acd" type="text" class="form-control bs-datepicker"  placeholder="..."   >
									       
									    </div>
									    </div>
									    <div class="col-md-6"> 
									    <label class="col-md-4 control-label">ACD EXT</label>
									    <div class="col-md-8"> 
									      <input id="acdExt" type="text" class="form-control bs-datepicker" placeholder="..."   >
									    </div>
									    </div>
								    </div>
								    </div>
								    
								     <div class="form-group">
								    <div class="col-md-12"> 
									    <div class="col-md-6"> 
									    <label class="col-md-4 control-label">Action By</label>
									    <div class="col-md-8">  
									      <select id="actionBy"   class="s2-select-search form-control"  >
														 <option value="0" selected >Select</option>                                
											 </select>
									    </div>
									    </div>
									    <div class="col-md-6"> 
									    <label class="col-md-4 control-label">Sign Off Date</label>
									    <div class="col-md-8"> 
									      <input id="signOffDate" type="text" class="form-control bs-datepicker"  placeholder="..."   >
									    </div>
									    </div> 
								    </div>
								    
								    </div><div class="form-group">
								    <div class="col-md-12"> 
									    <div class="col-md-6"> 
									    <label class="col-md-4 control-label">Status</label>
									    <div class="col-md-8"> 
									      <input id="status" disabled  type="text" class="form-control"  placeholder="..."   >
									    </div>
									    </div> 
									    <div class="col-md-6"> 
									    <label class="col-md-4 control-label">Remarks</label>
									    <div class="col-md-8"> 
									      <input id="remarks" type="text" class="form-control"  placeholder="..."   >
									    </div>
									    </div>
								    </div>
								    </div>
								    
								    <div class="form-group">
								    <div class="col-md-12"> 
									    <div class="col-md-6"> 
									    <div class="col-md-4"></div> 
									    <div class="col-md-8"> 
									     <button id="btnViolationForm" class=" btn btn-success btn-icon-fixed" type="button"
													onclick="violationAction()"> <span class="icon-arrow-down"></span>Save
												</button>
									    </div>
									    </div> 
								    </div>
								    </div>
									  
								  </form>
								  <div class="form-group" style="height: 30px"></div>
								  <div  class="table-responsive">
                                    <table  id="violationTable" class="table table-striped table-bordered "> 
                                        <thead>
											<tr> 	
												<th>Actions</th> 										 
												<th>Violation Code </th>
												<th>Violation Type </th> 
												<th> Violation No</th> 
												<th>Department</th> 
												<th>Discipline</th> 
												<th>Description</th> 
												<th>Reference </th> 
												<th>Subject</th> 
												<th>Location</th> 
												<th>Initiator</th> 
												<th>Correction</th> 
												<th>Root Cause</th> 
												<th>Corrective Action</th> 
												<th>ACD</th> 
												<th>ACD Ext</th> 
												<th>Action By</th> 
												<th>Sing Off Date</th> 
												<th>Status</th> 
												<th>Remarks</th>  						
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
            
            <div class="modal fade" id="modal-warning" tabindex="-1" role="dialog" aria-labelledby="modal-warning-header">                        
                <div class="modal-dialog modal-danger" role="document">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true" class="icon-cross"></span></button>

                    <div class="modal-content">
                        <div class="modal-header">                        
                            <h4 class="modal-title" id="modal-success-header">Warning: Audit Plan Update</h4>
                        </div>
                        <div class="modal-body">
                            <h3 id="uyaritext"> </h3>
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
          
		 <script type="text/javascript" src="custom/violationForm.js"></script> 
		 <script type="text/javascript" src="custom/navPage.js"></script>   
		  <!-- THIS PAGE SCRIPTS -->
        <script type="text/javascript" src="js/vendor/bootstrap-select/bootstrap-select.js"></script>
        <script type="text/javascript" src="js/vendor/select2/select2.full.min.js"></script>
        <script type="text/javascript" src="js/vendor/bootstrap-datetimepicker/bootstrap-datetimepicker.js"></script>
        <script type="text/javascript" src="js/vendor/bootstrap-daterange/daterangepicker.js"></script>
        <script type="text/javascript" src="js/vendor/multiselect/jquery.multi-select.js"></script>
        <!-- END THIS PAGE SCRIPTS -->
		 <script type="text/javascript" src="js/vendor/datatables/jquery.dataTables.min.js"></script>
        <script type="text/javascript" src="js/vendor/datatables/dataTables.bootstrap.min.js"></script>
		 
		  <script type="text/javascript" src="js/vendor/noty/jquery.noty.packaged.js"></script>
		  <script type="text/javascript" src="js/vendor/sweetalert/sweetalert.min.js"></script>
		  
        <!-- APP SCRIPTS -->
        <script type="text/javascript" src="js/app.js"></script>
        <script type="text/javascript" src="js/app_plugins.js"></script> 


		
        <!-- END APP SCRIPTS -->
        
        
		
        <script>
        
        
            $(document).ready(function(){
                SyntaxHighlighter.all(); 
                setTimeout(function(){
                    app.spy();
                },200);
            });
          //  $("#modal-warning").modal("show");
        
        </script>

		  
    </body>
</html>