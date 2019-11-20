<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<!DOCTYPE html>
<html lang="en">
    <head>                        
        <title>WIR Table Type </title>            
        
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
                            <h1>WIR Setting</h1> 
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
								<div class="col-md-5">
                                    <div class="form-group">                                                                
										 <label class="col-md-4 control-label">Type</label>
											 <div class="col-md-8">
												 <select class="bs-select" id="idWirType" onchange="getWirSettingCh()">
													 <option value="1">WIR Result</option>     
													 <option value="2">WIR Status</option>    
													 <option value="3">Discipline</option>    
													 <option value="4">Project Phase</option>         
													 <option value="5">ITP Inspection Level</option>  
													 <option value="6">Inspection Request Setting</option>                          
													 </select>
											 </div>  
									  </div>
									  <div class="form-group">
										 <label class="col-md-4 control-label">Description</label>
										 <div class="col-md-8">
											 <input type="text" id="wirDesc" data-validation="required" class="form-control"  >
											</div>
									 </div> 
									  <div class="form-group" id="wirDivVal" style="display: none">
										 <label class="col-md-4 control-label">Value</label>
										 <div class="col-md-8">
											 <input type="number" id="wirVal" data-validation="required" class="form-control"  >
											</div>
									 </div> 
									  
									  <div class="form-group" id="wirDivCod" style="display: none">
										 <label class="col-md-4 control-label">Code</label>
										 <div class="col-md-8">
											 <input type="text" id="wirCode" data-validation="required" class="form-control"  >
											</div>
									 </div> 
									 
									 
									 
									 <div class="form-group">
										 <div class="col-md-4"></div>
											 <div class="col-md-8">
											  <button id="btn1"  class=" btn btn-success " type="button" onclick="addWirSetting()"> Add </button>
									         </div>
								     	</div>
								 </div>
								 
								 <div class="col-md-6" id="div1">  
								 <div>
								   
								   <div  class="table-responsive">
                                    <table  id="wirSetTable" class="table table-striped table-bordered "> 
                                        <thead>
											<tr >  
												<th>Type</th>
												<th>Description</th> 
												<th>Value</th> 
												<th> </th> 
											</tr>
											</thead>  
										</table>
								  
                                       </div>
                                       </div>
								 </div>
								 
								 <div class="col-md-6" style="display:none" id="div2">
                             
                                  <div class="form-group">                                                                
											 <label class="col-md-4 control-label">QC Inspector</label>
											  <div class="col-md-6"> 
												 <select id="IrQRIns"  class="s2-select-search form-control"  >
														 <option value="0" selected >Select...</option>                                
												 </select>
											 </div>
											  <div class="col-md-2"> 
											  <button id="btn2" class=" btn btn-success " type="button" onclick="addWirSetting2(1)"> Update </button>
											 </div>
									  </div> 
									  
 							        <div class="form-group">                                                                
											 <label class="col-md-4 control-label">PMT</label>
											  <div class="col-md-6"> 
												 <select id="IrPMT"  class="s2-select-search form-control"  >
														 <option value="0" selected >Select...</option>                                
												 </select>
											 </div>
											  <div class="col-md-2"> 
											  <button id="btn2" class=" btn btn-success " type="button" onclick="addWirSetting2(2)"> Update </button>
											 </div>
									  </div> 
 							        <div class="form-group">                                                                
											 <label class="col-md-4 control-label">Client QC</label>
											  <div class="col-md-6"> 
												 <select id="IrCliQC"  class="s2-select-search form-control"  >
														 <option value="0" selected >Select...</option>                                
												 </select>
											 </div>
											  <div class="col-md-2"> 
											  <button id="btn2" class=" btn btn-success " type="button" onclick="addWirSetting2(3)"> Update </button>
											 </div>
									  </div>
									   <!--  div class="form-group">                                                                
											 <label class="col-md-4 control-label"></label>
											  <div class="col-md-6"> 
											  <button id="btn2" class=" btn btn-success " type="button" onclick="addWirSetting2()"> Add </button>
											 </div>
									  </div-->
									   
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
        <!-- END IMPORTANT SCRIPTS -->
          
		 <script type="text/javascript" src="custom/wirSetting.js"></script> 
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
		 
</script>
		  
    </body>
</html>