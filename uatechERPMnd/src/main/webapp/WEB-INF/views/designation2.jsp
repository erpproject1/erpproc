<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page session="false"%>
<!DOCTYPE html>
<html lang="en">
<head>
<title>Projects List</title>

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
			<%@include file="sidebar.jsp"%>
			<!-- END SIDEBAR -->

			<!-- START APP CONTENT -->
			<div class="app-content app-sidebar-left">

				<!-- START APP HEADER -->
				<%@include file="header.jsp"%>
				<!-- END APP HEADER  -->

				<!-- START PAGE HEADING -->
				<div class="app-heading app-heading-bordered app-heading-page">
					<div class="title">
						<h1>Designations</h1> 
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


												<div class="table-responsive">

													<table class="table table-striped table-bordered ">
														<!--    class="table table-striped table-bordered " -->
														<thead>
															<tr>
																<th>Designation</th>
																<th>Abbreviation</th>  
																<th></th>
															</tr>
														</thead>
														<tbody>
															<tr>
																<td id="p4"><input id="designation" type="text"
																	class="form-control" placeholder="Designation">  
																</td>
																<td id="p5"><input id="code" type="text"
																	class="form-control" placeholder="Abbreviation">  </td> 
																<td id="p8">
																	<div class="form-group"> 
																		<button id="ProjectsSave"
																			class=" btn btn-success btn-icon-fixed" type="button"
																			onclick="addDesignation()"> 
																			<span class="icon-arrow-down"></span>Add
																		</button>
																	</div>
																</td>

															</tr>
														</tbody>
													</table>

												</div>
												</div>
										</form>
										<div class="form-group" style="height: 30px"></div>
										<div class="table-responsive">

											<table id="designationTable"  
												class="table table-striped table-bordered ">
												<thead>
													<tr>
														<th>S/N</th>
														<th>Designation</th>
														<th>ShortName</th> 
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
							Project Update</h4>
					</div>
					<div class="modal-body">
						<h3 id="uyaritext"></h3>
					</div>
				</div>
			</div>
		</div>


		<!-- START APP FOOTER -->
		<div class="app-footer app-footer-default" id="footer">

			<div class="app-footer-line darken">
				<div class="copyright wide text-center">&copy; 2016-2017
					Boooya. All right reserved in the Ukraine and other countries.</div>
			</div>
		</div>
		<!-- END APP FOOTER -->

		<!-- START APP SIDEPANEL -->
		<div class="app-sidepanel scroll" data-overlay="show">
			<div class="container"></div>
		</div>
		<!-- END APP SIDEPANEL -->

		<!-- APP OVERLAY -->
		<div class="app-overlay"></div>
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

	<script type="text/javascript" src="custom/designation2.js"></script> 
	<script type="text/javascript" src="custom/navPage.js"></script>
	<!-- THIS PAGE SCRIPTS -->
	<script type="text/javascript"
		src="js/vendor/bootstrap-select/bootstrap-select.js"></script>
	<script type="text/javascript"
		src="js/vendor/select2/select2.full.min.js"></script>
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