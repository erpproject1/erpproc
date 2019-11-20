<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page session="false"%>

<!DOCTYPE html>
<html lang="en">
<head>
<title>Boooya - Documentation</title>

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
	<input type="text" hidden style="display: none" id="id"/>
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
						<h1>DEPARTMENTS</h1>
						<p>Manage Departments</p>
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

										<div
											class="app-heading app-heading-small app-heading-condensed padding-left-0">
											<div class="title">
												<h2>New Department</h2>
												<p>Add New Department</p>
											</div>
										</div>

										<div>


											<div class="tab-pane active" id="tabs-1">

												<!-- BASIC INPUTS   Personal -->
												<form class="form-horizontal">

													<div class="form-group">
														<label class="col-md-2 control-label">Department
															Name</label>
														<div class="col-md-6">
															<input type="text" id="department"  data-validation="required" class="form-control" placeholder="Department Name">
														</div>
													</div>
													<div class="form-group">

														<label class="col-md-2 control-label">Upper
															Department</label>
														<div class="col-md-3">

															<select id="upperDepartment"
																class="s2-select-search form-control">
																
															</select>
														</div>

													</div>
													<div class="form-group">
														<div class="col-md-2"></div>
													</div>
													<div class="form-group">
														<div class="col-md-2">
														
														</div>
														<div class="col-md-3">
															<button id="dptBtn" class=" btn btn-success btn-icon-fixed" type="button"  onclick="departmentAction()">
																<span class="icon-arrow-up"></span>Save 
															</button>
														</div>

													</div>
													<div class="block-content">

														<table 
															class="table table-striped table-bordered datatable-extended table-responsive">
															<thead>
																<tr>
																	<th>Index</th>
																	<th>Department</th>
																	<th>Upper Department</th>
																	<th>Actions</th>

																</tr>
															</thead>
															<tbody id="listBody"> 																
															</tbody>
														</table>
													</div>


												</form>
												<!-- END BASIC INPUTS -->

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

 
	<script type="text/javascript" src="js/vendor/bootstrap-select/bootstrap-select.js"></script>
	
	<script type="text/javascript" src="js/vendor/select2/select2.full.min.js"></script>
	<script type="text/javascript" src="js/vendor/bootstrap-datetimepicker/bootstrap-datetimepicker.js"></script>
	<script type="text/javascript" src="js/vendor/bootstrap-daterange/daterangepicker.js"></script>
	<script type="text/javascript" src="js/vendor/multiselect/jquery.multi-select.js"></script>
	<script type="text/javascript" src="js/vendor/form-validator/jquery.form-validator.min.js"></script>
	<script type="text/javascript" src="js/vendor/maskedinput/jquery.maskedinput.min.js"></script>
	 <script type="text/javascript" src="js/vendor/datatables/jquery.dataTables.min.js"></script>
     <script type="text/javascript" src="js/vendor/datatables/dataTables.bootstrap.min.js"></script>

	  <script type="text/javascript" src="custom/navPage.js"></script> 
 	<script type="text/javascript"
		src="js/vendor/noty/jquery.noty.packaged.js"></script>
	<!-- APP SCRIPTS -->
	<script type="text/javascript" src="js/app.js"></script>
	<script type="text/javascript" src="js/app_plugins.js"></script> 
	<!-- END APP SCRIPTS -->
	<script type="text/javascript" src="custom/department.js"></script> 
	

	<script>
		$(document).ready(function() {
			
			SyntaxHighlighter.all();
			setTimeout(function() {
				app.spy();
			}, 200);
			
		});
	</script>

	<script type="text/javascript">
		$.validate({
			modules : 'date,file,location',
			onValidate : function() {

				delayBeforeFire(function() {
					app.spy();
				}, 100);

			}
		});
	</script>



</body>