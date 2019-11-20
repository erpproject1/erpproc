<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page session="false"%>
<!DOCTYPE html>
<html lang="en">
<head>
<title>HOME</title>

<!-- META SECTION -->
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">

<link rel="shortcut icon" href="" type="image/x-icon">
<link rel="icon" href=" " type="image/x-icon">
<!-- END META SECTION -->

<!-- CSS INCLUDE -->

<link rel="stylesheet" href="css/styles.css">
<style>

#container {
	min-width: 360px;
	max-width: 600px;
	height: 400px;
	margin: 0 auto;
}
</style>

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


				<%
					String s = (String) request.getSession().getAttribute("sDash");
				%>
				<script type="text/javascript"> var sDash='<%=s%>';</script>

				<!-- START PAGE HEADING -->
				<div class="app-heading app-heading-bordered app-heading-page">
					<div class="title">
						<h1>HOME</h1>
					</div>
				</div>

				<!-- END PAGE HEADING -->

				<!-- START PAGE CONTAINER -->
				<div class="container">

					<div class="row">

						<div class="col-md-4">

							<ul
								class="app-feature-gallery app-feature-gallery-noshadow margin-bottom-0"
								id="shw1">
								<li>
									<!-- START WIDGET -->
									<div class="app-widget-tile">
										<div class="line">
											<div class="title">Design</div>
											<div class="title pull-right">
												<span class="label label-warning label-ghost label-bordered">Project
													Progress</span>
											</div>

										</div>
										<div>
											<table class="table table-striped table-bordered">
												<tr>
													<th>Planned</th>
													<th>Actual</th>
													<th>Deviation</th>
												</tr>
												<tr>
													<td>97,23%</td>
													<td>96,41%</td>
													<td>-0,82%</td>
												</tr>
											</table>
										</div>

									</div> <!-- END WIDGET -->
								</li>

								<li>
									<!-- START WIDGET -->
									<div class="app-widget-tile">
										<div class="line">
											<div class="title">Procurement</div>
											<div class="title pull-right">
												<span class="label label-warning label-ghost label-bordered">Project
													Progress</span>
											</div>

										</div>
										<div>
											<table class="table table-striped table-bordered">
												<tr>
													<th>Planned</th>
													<th>Actual</th>
													<th>Deviation</th>
												</tr>
												<tr>
													<td>18,11%</td>
													<td>15,95%</td>
													<td>-2,16%</td>
												</tr>
											</table>
										</div>

									</div> <!-- END WIDGET -->
								</li>

								<li>
									<!-- START WIDGET -->
									<div class="app-widget-tile">
										<div class="line">
											<div class="title">Construction</div>
											<div class="title pull-right">
												<span class="label label-warning label-ghost label-bordered">Project
													Progress</span>
											</div>

										</div>
										<div>
											<table class="table table-striped table-bordered">
												<tr>
													<th>Planned</th>
													<th>Actual</th>
													<th>Deviation</th>
												</tr>
												<tr>
													<td>4,6%</td>
													<td>2,35%</td>
													<td>-2,25%</td>
												</tr>
											</table>
										</div>

									</div> <!-- END WIDGET -->
								</li>



							</ul>

						</div>

						<div class="col-md-4">

							<ul
								class="app-feature-gallery app-feature-gallery-noshadow margin-bottom-0"
								id="shw2">
								<li>
									<!-- START WIDGET -->
									<div class="app-widget-tile">
										<div class="line">
											<div class="title">Client NCR</div>
											<div class="title pull-right">
												<span class="label label-warning label-ghost label-bordered">Violations</span>
											</div>

										</div>
										<div>
											<table class="table table-bordered">
												<tr>
													<td>Total</td>
													<td>2</td>
												</tr>
												<tr>
													<td>Open</td>
													<td>0</td>
												</tr>
											</table>
										</div>

									</div> <!-- END WIDGET -->
								</li>

								<li>
									<!-- START WIDGET -->
									<div class="app-widget-tile">
										<div class="line">
											<div class="title">Client Standard Violation</div>
											<div class="title pull-right">
												<span class="label label-warning label-ghost label-bordered">Violations</span>
											</div>

										</div>
										<div>
											<table class="table table-bordered">
												<tr>
													<td>Total</td>
													<td>33</td>
												</tr>
												<tr>
													<td>Open</td>
													<td>4</td>
												</tr>
											</table>
										</div>

									</div> <!-- END WIDGET -->
								</li>

								<li>
									<!-- START WIDGET -->
									<div class="app-widget-tile">
										<div class="line">
											<div class="title">Internal NCR</div>
											<div class="title pull-right">
												<span class="label label-warning label-ghost label-bordered">Violations</span>
											</div>

										</div>
										<div>
											<table class="table table-bordered">
												<tr>
													<td>Total</td>
													<td>85</td>
												</tr>
												<tr>
													<td>Open</td>
													<td>5</td>
												</tr>
											</table>
										</div>

									</div> <!-- END WIDGET -->
								</li>

							</ul>

						</div>

						<div class="col-md-4">

							<ul
								class="app-feature-gallery app-feature-gallery-noshadow margin-bottom-0"
								id="shw3">

								<li>
									<!-- START WIDGET -->
									<div class="app-widget-tile">
										<div class="line">
											<div class="title">Fatality</div>
											<div class="title pull-right">
												<span class="label label-warning label-ghost label-bordered">Safety
													Statistics</span>
											</div>

										</div>
										<div class="intval text-left">0</div>

									</div> <!-- END WIDGET -->
								</li>
								<li>
									<!-- START WIDGET -->
									<div class="app-widget-tile">
										<div class="line">
											<div class="title">Lost time injury</div>
											<div class="title pull-right">
												<span class="label label-warning label-ghost label-bordered">Safety
													Statistics</span>
											</div>

										</div>
										<div class="intval text-left">0</div>

									</div> <!-- END WIDGET -->
								</li>

								<li>
									<!-- START WIDGET -->
									<div class="app-widget-tile">
										<div class="line">
											<div class="title">Restricted duty Injury</div>
											<div class="title pull-right">
												<span class="label label-warning label-ghost label-bordered">Safety
													Statistics</span>
											</div>

										</div>
										<div class="intval text-left">0</div>

									</div> <!-- END WIDGET -->
								</li>


								<li>
									<!-- START WIDGET -->
									<div class="app-widget-tile">
										<div class="line">
											<div class="title">Mediacl Treatment Case</div>
											<div class="title pull-right">
												<span class="label label-warning label-ghost label-bordered">Safety
													Statistics</span>
											</div>

										</div>
										<div class="intval text-left">1</div>

									</div> <!-- END WIDGET -->
								</li>
								<li>
									<!-- START WIDGET -->
									<div class="app-widget-tile">
										<div class="line">
											<div class="title">Near Miss</div>
											<div class="title pull-right">
												<span class="label label-warning label-ghost label-bordered">Safety
													Statistics</span>
											</div>

										</div>
										<div class="intval text-left">6</div>

									</div> <!-- END WIDGET -->
								</li>

								</li>
								<li>
									<!-- START WIDGET -->
									<div class="app-widget-tile">
										<div class="line">
											<div class="title">Safe Man Hour</div>
											<div class="title pull-right">
												<span class="label label-warning label-ghost label-bordered">Safety
													Statistics</span>
											</div>

										</div>
										<div class="intval text-left">789.679</div>

									</div> <!-- END WIDGET -->
								</li>



							</ul>

						</div>


						<div class="col-md-6" id="f1" style="height: 550px">

							<!-- START PRODUCT SALES HISTORY -->
							<div class="block block-condensed">
								<div class="app-heading">
									<div class="title">
										<h2>Transmittal Status</h2>
										<p>Department Based</p>
									</div>

								</div>

								<div class="block-content">

									<div class="table-responsive">
										<table id="tLogStatus"
											class="table table-striped table-bordered ">
											<thead>
												<tr>
													<th>Department</th>
													<th>Submitted</th>
													<th>Approved</th>
													<th>Rejected</th>
													<th>Rejection Rate</th>
													<th>Open</th>
												</tr>
											</thead>
										</table>
									</div>
								</div>
							</div>
							<!-- END PRODUCT SALES HISTORY -->

						</div>

						<div class="col-md-6" id="f2" style="height: 550px">

							<!-- START PRODUCT SALES HISTORY -->
							<div class="block block-condensed">
								<div class="app-heading">
									<div class="title">
										<h2>Transmittal Status</h2>
										<p>Department Based</p>
									</div>

								</div>

								<div class="block-content">

									<div class="col-md-12">
										<div id="bar-chart-trans"></div>
									</div>

								</div>
							</div>

						</div>


						<div class="col-md-6" id="f3" style="height: 550px">

							<div class="block block-condensed">
								<div class="app-heading">
									<div class="title">
										<h2>Transmittal Status</h2>
										<p>Department Based</p>
									</div>

								</div>

								<div class="block-content">

									<div class="col-md-12" id="container1"></div>

								</div>
							</div>

						</div>

						<div class="col-md-6" id="f4" style="height: 550px">

							<!-- START LATEST TRANSACTIONS -->
							<div class="block block-condensed">
								<div class="app-heading">
									<div class="title">
										<h2>Transmittal Rejection Rates</h2>
										<p>Department Based</p>
									</div>

								</div>
								<div class="block-content" id="container2"></div>
							</div>
							<!-- END LATEST TRANSACTIONS -->

						</div>


						<div class="col-md-6" id="f5" style="height: 550px">

							<!-- START PRODUCT SALES HISTORY -->
							<div class="block block-condensed">
								<div class="app-heading">
									<div class="title">
										<h2>PQI</h2>
										<p>Last 3 Months</p>
									</div>

								</div>

								<div class="block-content">

									<div class="col-md-12" id="bar1">
										<div id="bar-chart" style="height: 250px;"></div>
									</div>

								</div>
							</div>
							<!-- END PRODUCT SALES HISTORY -->

						</div>

						<div class="col-md-6" id="f6" style="height: 550px">

							<!-- START LATEST TRANSACTIONS -->
							<div class="block block-condensed">
								<div class="app-heading">
									<div class="title">
										<h2>PQI</h2>
										<p>Last Months</p>
									</div>

								</div>
								<div class="block-content" id="projeYan"></div>
							</div>
							<!-- END LATEST TRANSACTIONS -->

						</div>


						<div class="col-md-4" id="f7">

							<!-- START PURCHASE STATISTICS -->
							<div class="block block-condensed" id="block_purchase">
								<div class="app-heading">
									<div class="title">
										<h2>Manpower</h2>
									</div>

								</div>

								<div class="block-content">
									<table class="table table-bordered">
										<tr>
											<td>Management</td>
											<td>13</td>
										</tr>
										<tr>
											<td>Construction</td>
											<td>674</td>
										</tr>
										<tr>
											<td>Office</td>
											<td>34</td>
										</tr>
										<tr>
											<td>Quality Control</td>
											<td>37</td>
										</tr>
										<tr>
											<td><b>Total</b></td>
											<td><b>58</b></td>
										</tr>
										<tr>
											<td></td>
											<td></td>
										</tr>
										<tr>
											<td>New hired today</td>
											<td>3</td>
										</tr>
										<tr>
											<td>New hired this week</td>
											<td>22</td>
										</tr>

									</table>
								</div>
							</div>
							<!-- END PURCHASE STATISTICS -->

						</div>

						<div class="col-md-4" id="f8">

							<!-- START PURCHASE STATISTICS -->
							<div class="block block-condensed" id="block_purchase">
								<div class="app-heading">
									<div class="title">
										<h2>RFI Status</h2>
									</div>

								</div>

								<div class="block-content">
									<table class="table table-bordered">
										<tr>
											<td>Civil</td>
											<td>2,987 (35 Rejection)</td>
										</tr>
										<tr>
											<td>Mechanical</td>
											<td>7,221 (128 Rejection)</td>
										</tr>
										<tr>
											<td>Electrical</td>
											<td>996,987 (43 Rejection)</td>
										</tr>
										<tr>
											<td></td>
											<td></td>
										</tr>
										<tr>
											<td>Today's rejection</td>
											<td>5</td>
										</tr>
										<tr>
											<td>This Week's Rejection</td>
											<td>13</td>
										</tr>

									</table>
								</div>
							</div>
							<!-- END PURCHASE STATISTICS -->

						</div>

						<div class="col-md-4" id="f9">

							<!-- START PURCHASE STATISTICS -->
							<div class="block block-condensed" id="block_purchase">
								<div class="app-heading">
									<div class="title">
										<h2>Document Approval Status</h2>
									</div>

								</div>

								<div class="block-content">
									<table class="table table-bordered">
										<tr>
											<td>MR</td>
											<td>31 (14 to be sumbitted)</td>
										</tr>
										<tr>
											<td>PO</td>
											<td>21 (23 to be sumbitted)</td>
										</tr>
										<tr>
											<td>IAP</td>
											<td>8 (36 to be sumbitted)</td>
										</tr>
										<tr>
											<td>IDR</td>
											<td>1 (44 to be sumbitted)</td>
										</tr>

									</table>
								</div>
							</div>
							<!-- END PURCHASE STATISTICS -->

						</div>
					</div>

				</div>
				<!-- END PAGE CONTAINER -->

			</div>
			<!-- END APP CONTENT -->

		</div>
		<!-- END APP CONTAINER -->

		<!-- START APP FOOTER -->
		<%@include file="footer.jsp"%>
		<!-- END APP FOOTER -->

		<!-- START APP SIDEPANEL -->
		<%@include file="sidepanel.jsp"%>
		<!-- END APP SIDEPANEL -->

		<!-- APP OVERLAY -->
		<%@include file="overlay.jsp"%>
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
	<!-- END IMPORTANT SCRIPTS  <script type="text/javascript" src="custom/navPage.js"></script>  -->

	<script type="text/javascript" src="custom/home.js"></script>
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
	<script type="text/javascript"
		src="js/vendor/form-validator/jquery.form-validator.min.js"></script>
	<script type="text/javascript"
		src="js/vendor/maskedinput/jquery.maskedinput.min.js"></script>
	<!-- END THIS PAGE SCRIPTS -->
	<script type="text/javascript"
		src="js/vendor/datatables/jquery.dataTables.min.js"></script>
	<script type="text/javascript"
		src="js/vendor/datatables/dataTables.bootstrap.min.js"></script>

	<script type="text/javascript"
		src="js/vendor/morris/Chart.bundle.min.js"></script>
	<script type="text/javascript" src="js/vendor/morris/raphael.min.js"></script>
	<script type="text/javascript" src="js/vendor/morris/morris.min.js"></script>

	<script type="text/javascript" src="js/app.js"></script>
	<script type="text/javascript" src="js/app_plugins.js"></script>


	<script src="js/vendor/highcharts/highcharts.js"></script>
	<script src="js/vendor/highcharts/highcharts-more.js"></script>


	<!-- END APP SCRIPTS -->


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
</html>