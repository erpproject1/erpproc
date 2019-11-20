<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page session="false"%>
<!DOCTYPE html>
<html lang="en">
<head>
<title>Transmittal Log</title>

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
	<input type="text" hidden style="display: none" id="hidTransid" />
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
						<h1>Transmittal Log</h1>
					</div>
				</div>

				<!-- END PAGE HEADING -->

				<!-- START PAGE CONTAINER -->
				<div class="container">

					<div class="row">
						<div class="col-md-12" style="position: relative;">




							<div class="block">
							<div class="row margin-top-10" id="div1">
									<div class="col-md-12">
									 <div class="form-group">
												<div class="col-md-12">
													<div class="col-md-6">
														 <div class="heading-elements">
							                                    <div class="btn-group">
							                                        <button class="btn btn-default "  ><span> <img src='img/icons/xls.png' width="24"></span><a href="transmittalLogExcel">Export Data</a> </button>
							                                        <!-- button class="btn btn-default " onClick ="$('#transTable').tableExport({type:'excel',escape:'false'});" ><span> <img src='img/icons/xls.png' width="24"></span> Export Data</button-->
							                                     </div> 
							                             </div>
													</div>
													<div class="col-md-6">
													
													  <button   id="impExcl1" class="btn btn-default" onClick ="openBrowse();" ><span> <img src='img/icons/xls.png' width="24"></span> Import Data</button>
							                           
							                          <div class="col-md-12" id="impExcl2" style="display:none;">
													    
 							                             <div class="col-md-7">
							                            <input id="browseExcel" onchange="" type="file" class="file" accept=".xls, .xlsx, .XLS, .XLSX"> 
							                                <span class="help-block" style="font-size: 9"></span>
							                            </div>  
							                            
							                             <div class="col-md-3">
							                             <button class="btn btn-success"  type="button" onclick="uploadExcel()" >Upload</button> 
 							                             </div> 
 							                             
							                             <div class="col-md-1">
							                             <button type="button" onclick="closeBrowse();"  class="btn btn-default btn-icon" ><span class="fa fa-close" ></span></button>  
 							                             </div>
							                                   
													 </div>
							                        
							                        </div>    
							                            
											 </div>
										<div class="col-md-12" style=" height: 30px"></div>	 
										<div class="col-md-12" style="display: none;" id="repTable1">
												<div class="col-md-4">
												    <button type="button" onclick="closeRepTable();"  class="btn btn-default btn-icon" ><span class="fa fa-close" ></span></button>
										            <button class="btn btn-success"  type="button" onclick="allimportTransLogRep()" >All Accept</button>
										            <button class="btn btn-danger"  type="button" onclick="alldeleteTransLogRep()" >All Ignore</button> 
										         </div>	
												 
										</div>	 
									    <div class="col-md-12" style="display: none;" id="repTable"> 
											 <div class="table-responsive">
											  <table id="transTableRep"
												class="table table-striped table-bordered ">
												<thead>
													<tr> 
														<th>Action</th>
														<th>Result</th> 
														<th>S/N</th>
														<th>From</th>
														<th>To</th>
														<th>Transmittal No</th>
														<th>Rev. No</th>
														<th>Document Type</th>
														<th>Description</th>
														<th>Department</th>
														<th>Preparation Date</th>
														<th>Submittal Date</th>
														<th>Action Type</th>
														<th>Reply Date</th>
														<th>Reply</th>
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
							
							
							
							
							
							<div class="block">

								<div class="row margin-top-10" id="div1">
									<div class="col-md-12">
										<form class="form-horizontal">
 
											<div class="form-group">
												<div class="col-md-12">
													<div class="col-md-6">
														<label class="col-md-4 control-label">From</label>
														<div class="col-md-8">
															<select class="s2-select-search form-control" id="idFrom">
																<option value="0" selected>Select...</option>
															</select>
														</div>
													</div>
													<div class="col-md-6">
														<label class="col-md-4 control-label">To</label>
														<div class="col-md-8">
															<select id="idTo" class="s2-select-search form-control">
																<option value="0" selected>Select</option>
															</select>
														</div>
													</div>
												</div>
											</div>


											<div class="form-group">
												<div class="col-md-12">
													<div class="col-md-6">
														<label class="col-md-4 control-label">Transmittal
															No</label>
														<div class="col-md-8">
															<input id="idTransNo" disabled="disabled"
																style="font-weight: bold; font-size: 15px;" type="text"
																class="form-control" placeholder="..." value="0">
														</div>
													</div>
													<div class="col-md-6">
														<label class="col-md-4 control-label">Rev. No</label>
														<div class="col-md-8">
															<input id="idRevNo" disabled="disabled"
																style="font-weight: bold; font-size: 15px;" type="text"
																class="form-control" placeholder="..." value="0">
														</div>
													</div>
												</div>
											</div>

											<div class="form-group">
												<div class="col-md-12">
													<div class="col-md-6">
														<label class="col-md-4 control-label">Department</label>
														<div class="col-md-8">
															<select class="s2-select-search form-control"
																id="idDepart" onchange="getDepDocType()">
																<option value="0" selected>Select...</option>
															</select>
														</div>
													</div>

													<div class="col-md-6">
														<label class="col-md-4 control-label">Description</label>
														<div class="col-md-8">
															<input id="idDesc" type="text" class="form-control"
																placeholder="...">
														</div>
													</div>
												</div>
											</div>

											<div class="form-group">
												<div class="col-md-12">
													<div class="col-md-6">
														<label class="col-md-4 control-label">Document Type</label>
														<div class="col-md-8" >
														<div class=" input-group">
															<select class="s2-select-search form-control"
																id="idDocType">
																<option value="0" selected>Select...</option>
															</select>
															<span class="input-group-btn">
															<button class="btn btn-success"  
																type="button" onclick="openDocType()"
																data-toggle="modal" data-target="#modal-docType">Add</button>
														</span>
														</div>
														</div>
														
													</div>
													<div class="col-md-6">
														<label class="col-md-4 control-label">Preparation
															Date</label>
														<div class="col-md-8">
															<input id="idPreDate" type="text"
																class="form-control bs-datepicker" placeholder="...">
														</div>
													</div>
												</div>
											</div>



											<div class="form-group">
												<div class="col-md-12">
													<div class="col-md-6">
														<label class="col-md-4 control-label">Submittal
															Date</label>
														<div class="col-md-8">
															<input id="idSubDate" type="text" style="width: 100%"
																class="form-control bs-datepicker" placeholder="...">
														</div>
													</div>
													<div class="col-md-6">
														<label class="col-md-4 control-label">Action Type</label>
														<div class="col-md-8">
															<select class="s2-select form-control" id="idActType">
																<option value="0" selected>Select...</option>
															</select>
														</div>
													</div>
												</div>
											</div>


											<div class="form-group">
												<div class="col-md-12">
													<div class="col-md-6">
														<label class="col-md-4 control-label">Reply Date</label>
														<div class="col-md-8">
															<input id="idRepDate" type="text"
																class="form-control bs-datepicker" placeholder="...">
														</div>
													</div>
													<div class="col-md-6">
														<label class="col-md-4 control-label">Reply</label>
														<div class="col-md-8">
															<select class="s2-select form-control" id="idReply">
																<option value="0" selected>Select...</option>
															</select>
														</div>
													</div>

												</div>
											</div>

											<div class="form-group">
												<div class="col-md-12">
													<div class="col-md-6">
														<label class="col-md-4 control-label">Status</label>
														<div class="col-md-8">
															<select class="s2-select form-control" id="idStatus">
																<option value="0" selected>Select...</option>
															</select>
														</div>
													</div>
													<div class="col-md-6">
														<label class="col-md-4 control-label">Remarks</label>
														<div class="col-md-8">
															<input id="idRemarks" type="text" class="form-control"
																placeholder="...">
														</div>
													</div>
												</div>
											</div>

											<div class="form-group">
												<div class="col-md-12">
													<div class="col-md-6">
														<label class="col-md-4 control-label">Attach File</label>
														<div class="col-md-8">
															<input id="transFile" type="file" class="file"
																data-validation="size" data-validation-max-size="2048kb">
															<span class="help-block" style="font-size: 9">Validate
																that file isn't larger than 2048 kilo bytes.</span>
															<!--  button type="button" class=" btn btn-default "><span  class="icon-paperclip"></span></button>-->
														</div>
													</div>
												</div>
											</div>

											<div class="form-group">
												<div class="col-md-12">
													<div class="col-md-6">
														<label class="col-md-4 control-label"></label>
														<div class="col-md-8">
															<button id="btntranForm"
																class=" btn btn-success btn-icon-fixed" type="button"
																onclick="addTransLog()">
																<span class="icon-arrow-down"></span>Save
															</button>
														</div>
													</div>
												</div>
											</div>



										</form>
										<div class="form-group" style="height: 30px"></div>
										<div class="table-responsive">
											<table id="transTable"
												class="table table-striped table-bordered ">
												<thead>
													<tr>
														<th></th>
														<th>S/N</th>
														<th>From</th>
														<th>To</th>
														<th>Transmittal No</th>
														<th>Rev. No</th>
														<th>Document Type</th>
														<th>Description</th>
														<th>Department</th>
														<th>Preparation Date</th>
														<th>Submittal Date</th>
														<th>Action Type</th>
														<th>Reply Date</th>
														<th>Reply</th>
														<th>Status</th>
														<th>Remarks</th>
														<th>Attach File</th>
													</tr>
												</thead>
											</table>

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

		<div class="modal fade" id="modal-warning" tabindex="-1" role="dialog"
			aria-labelledby="modal-warning-header">
			<div class="modal-dialog modal-danger" role="document">
				<button type="button" class="close" data-dismiss="modal"
					aria-label="Close">
					<span aria-hidden="true" class="icon-cross"></span>
				</button>

				<div class="modal-content">
					<div class="modal-header">
						<h4 class="modal-title" id="modal-success-header">Warning:
							Audit Plan Update</h4>
					</div>
					<div class="modal-body">
						<h3 id="uyaritext"></h3>
					</div>
				</div>
			</div>
		</div>

 

		<div class="modal fade" id="modal-clean" tabindex="-1" role="dialog">
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

		<div class="modal fade" id="modal-docType" tabindex="-1" role="dialog">
			<div class="modal-dialog" role="document">
				<div id="modalContentDocType" class="modal-content">
					<div class="modal-body">
						<div class="app-heading app-heading-small app-heading-condensed">
							<div class="title">
								<h5>Add Document Type</h5>
								<p></p>
							</div>
						</div>
						<div id="docTypeContent" class="block-content"></div>
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
	<script type="text/javascript"
		src="js/vendor/syntaxhighlight/shCore.js"></script>
	<script type="text/javascript"
		src="js/vendor/syntaxhighlight/shBrushXml.js"></script>
	<!-- END CODEMIRROR -->



	<!-- IMPORTANT SCRIPTS -->
	<script type="text/javascript" src="js/vendor/jquery/jquery.min.js"></script>
	<script type="text/javascript"
		src="js/vendor/jquery/jquery-migrate.min.js"></script>
	<script type="text/javascript" src="js/vendor/jquery/jquery-ui.min.js"></script>
	<script type="text/javascript"
		src="js/vendor/bootstrap/bootstrap.min.js"></script>
	<script type="text/javascript" src="js/vendor/moment/moment.min.js"></script>
	<script type="text/javascript"
		src="js/vendor/customscrollbar/jquery.mCustomScrollbar.min.js"></script>
	<!-- END IMPORTANT SCRIPTS -->

	<script type="text/javascript" src="custom/transmittalLog.js"></script>
	<script type="text/javascript" src="custom/navPage.js"></script>
	<script type="text/javascript" src="custom/documentType.js"></script>
	<!-- THIS PAGE SCRIPTS -->
	<script type="text/javascript"
		src="js/vendor/bootstrap-select/bootstrap-select.js"></script>
	<script type="text/javascript"
		src="js/vendor/select2/select2.full.min.js"></script>
	<script type="text/javascript"
		src="js/vendor/bootstrap-datetimepicker/bootstrap-datetimepicker.js"></script>
	<script type="text/javascript"
		src="js/vendor/bootstrap-daterange/daterangepicker.js"></script>
	<script type="text/javascript"
		src="js/vendor/multiselect/jquery.multi-select.js"></script>
	<!-- END THIS PAGE SCRIPTS -->
	<script type="text/javascript"
		src="js/vendor/datatables/jquery.dataTables.min.js"></script>
	<script type="text/javascript"
		src="js/vendor/datatables/dataTables.bootstrap.min.js"></script>

	<script type="text/javascript"
		src="js/vendor/noty/jquery.noty.packaged.js"></script>
	<script type="text/javascript"
		src="js/vendor/sweetalert/sweetalert.min.js"></script>
		 
        <script type="text/javascript" src="js/vendor/tableexport/tableExport.js"></script>
        <script type="text/javascript" src="js/vendor/tableexport/jquery.base64.js"></script>
        <script type="text/javascript" src="js/vendor/tableexport/html2canvas.js"></script>
        <script type="text/javascript" src="js/vendor/tableexport/jspdf/libs/sprintf.js"></script>
        <script type="text/javascript" src="js/vendor/tableexport/jspdf/jspdf.js"></script>
        <script type="text/javascript" src="js/vendor/tableexport/jspdf/libs/base64.js"></script>

	<!-- APP SCRIPTS -->
	<script type="text/javascript" src="js/app.js"></script>
	<script type="text/javascript" src="js/app_plugins.js"></script>



	<!-- END APP SCRIPTS -->



	<script>
		$(document).ready(function() {
			SyntaxHighlighter.all();
			setTimeout(function() {
				app.spy();
			}, 200);
		});
		//  $("#modal-warning").modal("show");
	</script>


</body>
</html>