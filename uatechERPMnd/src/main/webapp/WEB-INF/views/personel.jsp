<!DOCTYPE html>
<html lang="en">
<head>
    <title>Personel</title>

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
    <!-- bootstrap toggle için (switch button) -->
    <link href="https://gitcdn.github.io/bootstrap-toggle/2.2.2/css/bootstrap-toggle.min.css"
          rel="stylesheet">
    <style>
    .dropzone-tiny .dz-message:before {
    content: "\f007";}
    
    
    .dividerBlue
    {
    border-top:1px solid #4FB5DD;padding-top:15px;
    }
    
    
        .toggle.ios, .toggle-on.ios, .toggle-off.ios {
            border-radius: 20px;
        }

            .toggle.ios .toggle-handle {
                border-radius: 20px;
            }

            .toggle.ios .toggle-group {
                transition: left 0.7s;
                -webkit-transition: left 0.7s;
            }

        .stepwizard-step p {
            margin-top: 10px;
        }

        .stepwizard-row {
            display: table-row;
        }

        .stepwizard {
            display: table;
            width: 100% !important;
            position: relative;
        }

        .stepwizard-step button[disabled] {
            opacity: 1 !important;
            filter: alpha(opacity = 100) !important;
        }

        .stepwizard-row:before {
            top: 14px;
            bottom: 0;
            position: absolute;
            content: " ";
            width: 100%;
            height: 1px;
            background-color: #ccc;
            z-order: 0;
        }

        .stepwizard-step {
            display: table-cell;
            text-align: center;
            position: relative;
        }

        .btn-circle {
            width: 30px;
            height: 30px;
            text-align: center;
            padding: 6px 0;
            font-size: 12px;
            line-height: 1.428571429;
            border-radius: 15px;
        }

        h3 {
            margin-top: 25px;
            margin-bottom: 25px;
            padding-top: 25px;
            padding-bottom: 25px;
            text-transform: uppercase;
            text-align: center;
            background: #4FB5DD;
            color: white;
            font-size: 30px;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        }
    </style>
</head>
<body>
    <!-- APP WRAPPER -->

    <input type="text" style="display: none" id="id" />
    <input type="text" style="display: none" id="idpt" />
    <input type="text" style="display: none" id="idpe" />
    <input type="text" style="display: none" id="idPath" value="${path}" />
    <input type="text" style="display: none" id="idExpPath" />
    <input type="text" style="display: none" id="hidPersonalID" />


    <input type="text" style="display: none" id="hidEmpId"
           value="<%=request.getParameter(" EmpId")%>" />
    <input type="text" style="display: none" id="hidAllClose"
           value="<%=request.getParameter(" _c")%>" />

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
                        <h1>PERSONEL</h1>
                    </div>
                </div>

                <!-- END PAGE HEADING -->
                <!-- START PAGE CONTAINER -->
                <div class="container">
                <div class="row">
                <div class="col-md-12">

                    <div class="app-heading app-heading-small app-heading-condensed padding-left-0">
                        <div class="title">
                            <h2>New Employee</h2>
                        </div>

                        <div id="msgSucces" style="display: none;"
                             class="app-tip app-tip-success"></div>

                        <div id="msgError" style="display: none;"
                             class="app-tip app-tip-warning"></div>

                    </div>

                                      
                </div>
                <div class="col-md-12" style="position: relative;">

                <div class="block">
                <div class="stepwizard">
                    <div class="stepwizard-row setup-panel">
                        <div class="stepwizard-step">
                            <a href="#step-1" type="button"
                               class="btn btn-info btn-circle">1</a>
                            <p>Personal</p>
                        </div>
                        <div class="stepwizard-step">
                            <a href="#step-2" type="button"
                               class="btn btn-default btn-circle" disabled="disabled">2</a>
                            <p>Contact</p>
                        </div>
                        <div class="stepwizard-step">
                            <a href="#step-3" type="button"
                               class="btn btn-default btn-circle" disabled="disabled">3</a>
                            <p>Training</p>
                        </div>
                        <div class="stepwizard-step">
                            <a href="#step-4" type="button"
                               class="btn btn-default btn-circle" disabled="disabled">4</a>
                            <p>Contract</p>
                        </div>
                        <div class="stepwizard-step">
                            <a href="#step-5" type="button"
                               class="btn btn-default btn-circle" disabled="disabled">5</a>
                            <p>Experiences</p>
                        </div>
                        <div class="stepwizard-step">
                            <a href="#step-6" type="button"
                               class="btn btn-default btn-circle" disabled="disabled">6</a>
                            <p>Education</p>
                        </div>
                        <div class="stepwizard-step">
                            <a href="#step-7" type="button"
                               class="btn btn-default btn-circle" disabled="disabled">7</a>
                            <p>Language Skills</p>
                        </div>
                        <div class="stepwizard-step">
                            <a href="#step-8" type="button"
                               class="btn btn-default btn-circle" disabled="disabled">8</a>
                            <p>Bank Accounts</p>
                        </div>
                        <div class="stepwizard-step">
                            <a href="#step-9" type="button"
                               class="btn btn-default btn-circle" disabled="disabled">9</a>
                            <p>Social and Hobbies</p>
                        </div>
                        <div class="stepwizard-step">
                            <a href="#step-10" type="button"
                               class="btn btn-default btn-circle" disabled="disabled">10</a>
                            <p>References</p>
                        </div>
                        <div class="stepwizard-step">
                            <a href="#step-11" type="button"
                               class="btn btn-default btn-circle" disabled="disabled">11</a>
                            <p>Comments</p>
                        </div>
                    </div>
                </div>

                <div class="row setup-content" id="step-1">
									<div class="col-md-12">
										<h3>Personal</h3>
										<!-- FORM Personal -->
										<form class="form-horizontal">
											<div class="col-md-8">
												<div class="form-group">
													<label class="col-md-3 control-label">Name</label>
													<div class="col-md-4">
														<input id="idName" type="text" class="form-control"
															placeholder="..."> <span class="help-block">First
															Name</span>
													</div>
													<div class="col-md-4">
														<input id="idMidName" type="text" class="form-control"
															placeholder="..."> <span class="help-block">Middle
															Name</span>
													</div>
												</div>

												<div class="form-group">
													<label class="col-md-3 control-label">Last Name</label>
													<div class="col-md-4">
														<input id="idLasName" type="text" class="form-control"
															placeholder="..." data-validation="required">
													</div>
													<div class="col-md-4 text-center">
														<input class="text-center btnMaleFemale" id="toggle-event"
															type="checkbox" checked data-on="Male" data-off="Female"
															data-toggle="toggle" data-style="ios" data-onstyle="info"
															data-offstyle="success" data-size="mini">
													</div>
												</div>
												<div class="form-group">
													<label class="col-md-3 control-label">Father/Mother
														Name</label>
													<div class="col-md-4">
														<input id="idFatherName" type="text" class="form-control"
															placeholder="..." data-validation="required"> <span
															class="help-block">Father Name</span>
													</div>
													<div class="col-md-4">
														<input id="idMotherName" type="text" class="form-control"
															placeholder="..." data-validation="required"> <span
															class="help-block">Mother Name</span>
													</div>
												</div>
												<div class="form-group">
													<label class="col-md-3 control-label">Birth</label>
													<div class="col-md-4">
														<div class="input-group bs-datepicker">
															<input id="idBirthDate" type="text" class="form-control"
																placeholder="01/01/2001"> <span
																class="input-group-addon"> <span
																class="icon-calendar-full"></span>
															</span>
														</div>
														<span class="help-block">Date</span>
													</div>
													<div class="col-md-4">
														<input id="idPlaceofBird" type="text" class="form-control"
															placeholder="..." data-validation="required"> <span
															class="help-block">Place</span>
													</div>


												</div>
											</div>
											
											<div class="col-md-4">
													<!-- DEFAULT DROPZONE -->
													
													<div class="block">
														<div class="app-heading app-heading-small">
															<div class="title">
																<h2>Profile Photo</h2>
																  <p class="hidden">
																	Add class
																	<code>dropzone-tiny</code>
																	to
																	<code>dropzone</code>
																	form to get small dropzone form.
																  </p> 
														 	      
															</div>
														</div>
														
														<div  class="dropzone dropzone-tiny dz-clickable" id="profilepic" >
															<div class="dz-default dz-message" >
															      
																<div class="dropzone-preupload-title" >
																         Drop files
																	here or click to upload</div>
																<p>This is demo dropzone. Your files are not
																	actually uploaded.</p>
																	 
															</div>
														</div>
														
													</div>
													
													<!-- END DROPZONE -->
											</div>
											</form>

											<div class="form-group dividerBlue">
												<label class="col-md-2 control-label"> Iqama
													No/National </label>
												<div class="col-md-3">
													<input id="idNationalId" type="text"
														class="form-control error"
														data-validation="length,number,required"
														data-validation-length="10" maxlength="10" value="">
													<span class="help-block">ID</span>
												</div>
												<div class="col-md-3">
													<input id="idExpirityDateforIgamaNo" type="text"
														class="form-control" placeholder="..."
														data-validation="required"> <span
														class="help-block">Expirity Date</span>
												</div>
												<div class="col-md-1">
													<input id="browseExpirityDate" type="file" class="file"
														data-validation="size" data-validation-max-size="2048kb">
												</div>

											</div>
											<div class="form-group dividerBlue">
												<label class="col-md-2 control-label"> Driving
													Licence </label>
												<div class="col-md-3">
													<input id="idDrivingLicence" type="text"
														class="form-control error"
														data-validation="length,number,required"
														data-validation-length="10" maxlength="10" value="">

													<span class="help-block">Driving Licence</span>
												</div>
												<div class="col-md-3">
													<input id="idExpirityDateForDrivingLicence" type="text"
														class="form-control" placeholder="..."
														data-validation="required"> <span
														class="help-block"> Expirity Date Group</span>
												</div>
												<div class="col-md-1">
													<input id="browseExpirityDateGroup" type="file"
														class="file" data-validation="size"
														data-validation-max-size="2048kb">
												</div>

											</div>

											<div class="form-group dividerBlue">
												<label class="col-md-2 control-label">Passport</label>
												<div class="col-md-3">
													<input id="idPasportNo" type="text" class="form-control"
														placeholder="..." data-validation="required"> <span
														class="help-block">No</span>
												</div>
												<div class="col-md-3">
													<input id="idExpirityDateForPassport" type="text"
														class="form-control" placeholder="..."
														data-validation="required"> <span
														class="help-block">Expirity Date</span>
												</div>
												<div class="col-md-1">
													<input id="browseExpirityDateforPassword" type="file"
														class="file" data-validation="size"
														data-validation-max-size="2048kb">
												</div>
											</div>
											<div class="form-group dividerBlue">

												<label class="col-md-2 control-label">Blood Group</label>
												<div class="col-md-3">
													<select class="s2-select-search form-control"
														id="idBloodGroups">
														<option value='A +'>A +</option>
														<option value='A -'>A -</option>
														<option value='B +'>B +</option>
														<option value='B -'>B -</option>
														<option value='AB +'>AB +</option>
														<option value='AB -'>AB -</option>
														<option value='0 +'>0 +</option>
														<option value='0 -'>0 -</option>
														<option value='Unknown'>Unknown</option>
													</select>
												</div>

											</div>
											<div class="form-group">

												<label class="col-md-2 control-label"> Marital
													Status </label>
												<div class="col-md-3">
													<select class="s2-select-search form-control"
														id="idMaritalStatus">
														<option value="Single">Single</option>
														<option value="Married">Married</option>
														<option value="Widowed">Widowed</option>
														<option value="Separated">Separated</option>
														<option value="Divorced">Divorced</option>
													</select>
												</div>

											</div>
											<div class="form-group">
												<label class="col-md-2 control-label"> Number of
													Child </label>
												<div class="col-md-3">
													<input id="idNumberofChild" type="text"
														class="form-control" placeholder="..."
														data-validation="required">
												</div>
											</div>
											<div class="form-group">

												<label class="col-md-2 control-label"> Military
													Obligation </label>
												<div class="col-md-3">
													<select class="s2-select-search form-control"
														id="idMilitaryObligation">
													</select>
												</div>

											</div>

											<div class="form-group">
												<div class="col-md-6 text-center">
													<input class="text-center isSmoker" id="toggle-event"
														type="checkbox" checked data-on="Smoker"
														data-off="Not Smoker" data-toggle="toggle"
														data-style="ios" data-onstyle="danger"
														data-offstyle="success" data-size="mini">
												</div>

											</div>




										</form>
										<button class="btn btn-info nextBtn btn-lg pull-right"
											type="button" onclick="addPersonelForm();savePeriod()">Next</button>
									</div>
								</div>                
                <!--END FORM PERSONEL -->
                
                <!-- START FORM Contact -->
                <div class="row setup-content" id="step-2">
                <div class="col-md-12">
                <h3>Contact</h3>
                <form class="form-horizontal">

                <div class="form-group">
                    <div class="col-md-2"></div>
                    <label class="col-md-3 control-label">
                        Residence
                        
                    </label>
                </div>
                
                <div class="form-group">
                    <label class="col-md-2 control-label"></label>
                    <div class="col-md-3">
                        <select class="bs-select" id="idKSACountry" disabled>
                        </select><span class="help-block">Country</span>
                    </div>
                    
                    <div class="col-md-3">
                        <select class="s2-select-search form-control"
                                id="idKSACity">
                        </select><span class="help-block">City</span>
                    </div>

                </div>

                

                <div class="form-group">
                    <label class="col-md-2 control-label">Address</label>
                    <div class="col-md-6">
                        <input id="idAddress" type="text" class="form-control"
                               placeholder="...">
                    </div>
                </div>

                <div class="form-group">
                    <label class="col-md-2 control-label">Company</label>
                    <div class="col-md-6">
                        <input id="idCompanyName" type="text"
                               class="form-control" placeholder="...">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-md-2 control-label">
                        Personel
                        Phone
                    </label>
                    <div class="col-md-6">
                        <input id="idPerPhone" type="text"
                               class="mask_phone form-control"
                               placeholder="Example: 98 (765) 432-10-98">

                    </div>
                </div>
                <div class="form-group">
                    <label class="col-md-2 control-label">
                        Company
                        Email
                    </label>
                    <div class="col-md-6">
                        <input id="idComEmail" class="form-control"
                               data-validation="email"
                               placeholder="youremail@domain.com">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-md-2 control-label">
                        Personal
                        Email
                    </label>
                    <div class="col-md-6">
                        <input id="idPerEmail" class="form-control"
                               data-validation="email"
                               placeholder="youremail@domain.com">
                    </div>
                </div>

                <div class="form-group">
                    <label class="col-md-2 control-label">
                        Emergency
                        Phone
                    </label>
                    <div class="col-md-6">
                        <input id="idEmePhone" type="text"
                               class="mask_phone form-control"
                               placeholder="Example: 98 (765) 432-10-98">

                    </div>
                </div>


                <div class="form-group">
                    <label class="col-md-2 control-label">
                        Emergency
                        Email
                    </label>
                    <div class="col-md-6">
                        <input id="idEmeEmail" class="form-control"
                               data-validation="email"
                               placeholder="youremail@domain.com">
                    </div>
                </div>

                <div class="form-group">
                    <div class="col-md-2"></div>
                    <label class="col-md-3 control-label">
                        Home
                        Country
                    </label>
                </div>


                <div class="form-group">

                    <label class="col-md-2 control-label"></label>
                    <div class="col-md-3">

                        <select class="s2-select-search form-control"
                                id="idHomeCountry"
                                onchange="getHomeCity(this.value, 'idHomeCity')">
                        </select><span class="help-block">Country</span>
                    </div>
                    <div class="col-md-3">

                        <select class="s2-select-search form-control"
                                id="idHomeCity">
                        </select><span class="help-block">City</span>
                    </div>

                </div>

                
                <div class="form-group">
                    <label class="col-md-2 control-label">Address</label>
                    <div class="col-md-6">
                        <input id="idHomeAddress" type="text"
                               class="form-control" placeholder="...">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-md-2 control-label">
                        Personel
                        Phone
                    </label>
                    <div class="col-md-6">
                        <input id="idHPerPhone" type="text"
                               class="mask_phone form-control"
                               placeholder="Example: 98 (765) 432-10-98">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-md-2 control-label">
                        Emergency
                        Phone
                    </label>
                    <div class="col-md-6">
                        <input id="idHEmePhone" type="text"
                               class="mask_phone form-control"
                               placeholder="Example: 98 (765) 432-10-98">
                    </div>
                </div>

                <div class="form-group">
                    <label class="col-md-2 control-label">
                        Emergency
                        Email
                    </label>
                    <div class="col-md-6">
                        <input id="idHEmeEmail" class="form-control"
                               data-validation="email"
                               placeholder="youremail@domain.com">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-md-2 control-label">
                        Social
                        Media Accounts
                    </label>
                    <div class="col-md-3">
                        <select class="bs-select" id="idSocialMediaAccounts" >
                        <option value="1">Linkedin</option>
                        <option value="2">Github</option>
                        
                        </select>
                    </div>

                </div>
                <div class="form-group">
                    <label class="col-md-2 control-label">Social Media Accounts Url</label>
                    <div class="col-md-6">
                        <input id="idSocialMediaAccountsURL" type="text"
                               class="form-control" placeholder="...">
                    </div>
                </div>


                </form>
                <button class="btn btn-info prevBtn btn-lg pull-left"
                        type="button">
                    Previous
                </button>
                <button class="btn btn-btn-info nextBtn btn-lg pull-right"
                        type="button" onclick="addContact()">
                    Next
                </button>
                </div>
                </div>
                <!-- END CONTACT -->
                
                
                        <!-- START Training-->
                <div class="row setup-content" id="step-3">
                    <div class="col-md-12">
                        <h3>Training</h3>
                        <form class="form-horizontal">
                                <div class="form-group">
                                <label class="col-md-2 control-label">
                                    Name of
                                    Training
                                </label>
                                <div class="col-md-6">
                                    <input id="nameOfTraining" type="text"
                                           class="form-control" placeholder="">
                                </div>

                            </div>
                            <div class="form-group">
                                <label class="col-md-2 control-label">
                                    Date of
                                    Training
                                </label>
                                <div class="col-md-6">
                                    <div class="input-group">
                                        <div class="input-group-addon">
                                            <span class="fa fa-calendar"></span>
                                        </div>
                                        <input id="date" type="text"
                                               class="form-control daterange"
                                               placeholder="09/01/2017 - 09/20/2017">
                                    </div>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-md-2 control-label">Duration</label>
                                <div class="col-md-6">
                                    <input id="duration" type="text" class="form-control"
                                           placeholder="">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-2 control-label">Organizer</label>
                                <div class="col-md-6">
                                    <input id="organizer" type="text" class="form-control"
                                           placeholder="">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-md-2 control-label">
                                    Certificate
                                    Validity
                                </label>
                                <div class="col-md-3">
                                    <input id="certificateValidity" type="text"
                                           class="form-control" placeholder=""
                                           data-validation="number">
                                </div>
                                <div class="col-md-3">
                                    <select id="validityType" class="s2-select">
                                        <option value="0" selected>Select...</option>
                                        <option value="1">Day</option>
                                        <option value="2">Week</option>
                                        <option value="3">Month</option>
                                        <option value="4">Year</option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-md-2 control-label"></label>
                                <div class="col-md-6" style="padding-left: 383px">
                                    <input id="trainingFile" type="file" multiple
                                           class="file" data-validation="size"
                                           data-validation-max-size="2048kb">
                                    <span class="help-block">
                                        Validate that file isn't
                                        larger than 2048 kilo bytes.
                                    </span>

                                </div>
                            </div>


                        </form>

                        <div class="block-content">

                            <table class="table table-striped table-bordered datatable-extended table-responsive">
                                <thead>
                                <tr>
                                    <th>Index</th>
                                    <th>Training</th>
                                    <th>Date</th>
                                    <th>Organizer</th>
                                    <th>Certificate Validity</th>
                                    <th>Certificate File</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody id="listTrainings">
                                </tbody>
                            </table>
                        </div>

                        <button class="btn btn-info prevBtn btn-lg pull-left"
                                type="button">
                            Previous
                        </button>
                        <button class="btn btn-info nextBtn btn-lg pull-right"
                                type="button">
                            Next
                        </button>
                    </div>
                </div>                
                        <!-- END TRAINING -->
                        
                <div class="row setup-content" id="step-4">
                <div class="col-md-12">
                <h3>Contract</h3>
                <form class="form-horizontal">
                
                <div class="form-group">

                    <label class="col-md-2 control-label">Department</label>
                    <div class="col-md-4">

                        <select class="s2-select-search form-control"
                                id="idContDepart" onchange="getDepJobAndDesg()">
                            <option value="0" selected>Select...</option>
                        </select>
                    </div>

                </div>
                <div class="form-group">

                    <label class="col-md-2 control-label">
                        Job
                        Description
                    </label>
                    <div class="col-md-4">

                        <select class="s2-select-search form-control"
                                id="idContJobDesc">
                            <option value="0" selected>Select...</option>
                        </select>
                    </div>

                </div>
                <div class="form-group">

                    <label class="col-md-2 control-label">Designation</label>
                    <div class="col-md-4">

                        <select class="s2-select-search form-control"
                                id="idContDesig">
                            <option value="0" selected>Select...</option>
                        </select>
                    </div>

                </div>

                <div class="form-group">
                    <label class="col-md-2 control-label">
                        Contract
                        Date
                    </label>
                    <div class="col-md-4">
                        <div class="input-group bs-datepicker">
                            <input id="idContDate" type="text" class="form-control"
                                   placeholder="01/01/2001">
                            <span class="input-group-addon">
                                <span class="icon-calendar-full"></span>
                            </span>
                        </div>
                    </div>

                </div>

                <div class="form-group">
                    <label class="col-md-2 control-label">
                        Contract
                        Duration
                    </label>
                    <div class="col-md-2">
                        <input id="idContDura" min="1" type="number"
                               class="form-control" placeholder="..">
                    </div>

                    <div class="col-md-2">
                        <select class="s2-select" id="idContDura2">
                            <option value="0" selected>Select...</option>
                            <option value="Year">Year</option>
                            <option value="Month">Month</option>
                            <option value="Week">Week</option>
                            <option value="Day">Day</option>
                        </select>
                    </div>

                </div>

                <div class="form-group">
                    <label class="col-md-2 control-label">
                        Annual
                        Vacation Days
                    </label>
                    <div class="col-md-2">
                        <input id="idContAnVaDa" min="1" type="number"
                               class="form-control" placeholder="..">
                    </div>
                    <div class="col-md-2" hidden>
                        <select class="s2-select" id="idContAnVaDa2">
                            <option value="0" selected>Select...</option>
                            <option value="Year">Year</option>
                            <option value="Month">Month</option>
                            <option value="Week">Week</option>
                            <option value="Day">Day</option>
                        </select>
                    </div>
                </div>

                <div class="form-group">
                    <label class="col-md-2 control-label">
                        Annual
                        Vacation Period
                    </label>
                    <div class="col-md-2">
                        <input id="idContAnVaPer" min="1" type="number"
                               class="form-control" placeholder="..">
                    </div>
                    <div class="col-md-2">
                        <select class="s2-select" id="idContAnVaPer2">
                            <option value="0" selected>Select...</option>
                            <option value="Year">Year</option>
                            <option value="Month">Month</option>
                            <option value="Week">Week</option>
                            <option value="Day">Day</option>
                        </select>
                    </div>
                </div>

                <div class="form-group">
                    <label class="col-md-2 control-label">
                        Basic
                        Salary
                    </label>
                    <div class="col-md-2">
                        <input id="idBasicSalary" min="1" type="number"
                               class="form-control" placeholder="..">
                    </div>
                    <div class="col-md-2">
                        <select class="s2-select-search form-control moneyType"
                                id="idMoney1">
                        </select>
                    </div>
                </div>

                <div class="form-group">
                    <label class="col-md-2 control-label">
                        Home
                        Allowance
                    </label>
                    <div class="col-md-2">
                        <input id="idHomeAllow" min="1" type="number"
                               class="form-control" placeholder="..">
                    </div>
                    <div class="col-md-2">
                        <select class="s2-select-search form-control moneyType"
                                id="idMoney2">
                        </select>
                    </div>
                </div>

                <div class="form-group">
                    <label class="col-md-2 control-label">
                        Transportation
                        Allowance
                    </label>
                    <div class="col-md-2">
                        <input id="idTransAllow" min="1" type="number"
                               class="form-control" placeholder="..">
                    </div>
                    <div class="col-md-2">
                        <select class="s2-select-search form-control moneyType"
                                id="idMoney3">
                        </select>
                    </div>
                </div>

                <div class="form-group">
                    <label class="col-md-2 control-label">
                        Food
                        Allowance
                    </label>
                    <div class="col-md-2">
                        <input id="idFoodAllow" min="1" type="number"
                               class="form-control" placeholder="..">
                    </div>
                    <div class="col-md-2">
                        <select class="s2-select-search form-control moneyType"
                                id="idMoney4">
                        </select>
                    </div>
                </div>
                <div class="form-group">

                    <div class="col-md-2" style="margin-left: 162px">
                        <input id="idAddAllowenceforFile" type="file"
                               class="file" data-validation="size"
                               data-validation-max-size="2048kb">
                    </div>
                    <div class="col-md-2">
                        <select class="s2-select-search form-control "
                                id="idAddAllowenceforFileSelect">
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-md-2 control-label">Allowance</label>
                    <div class="col-md-2">
                        <input id="idAllowanceforFile" min="1" type="number"
                               class="form-control" placeholder="..">
                    </div>
                    <div class="col-md-2">
                        <select class="s2-select-search form-control moneyType"
                                id="slcAllowanceDesc">
                        </select>
                    </div>
                </div>
                </form>
                <button class="btn btn-info prevBtn btn-lg pull-left"
                        type="button">
                    Previous
                </button>
                <button class="btn btn-info nextBtn btn-lg pull-right"
                        type="button" onclick="addContract()">
                    Next
                </button>
                </div>
                </div>                
                <!-- END CONTRACT -->
                
                <!-- START EXPERIENCES -->
                <div class="row setup-content" id="step-5">
                    <div class="col-md-12">
                        <h3>Experiences</h3>
                        <form class="form-horizontal">                           
                            <div class="form-group">
                                <label class="col-md-2 control-label">Work Period</label>
                                <div class="col-md-3">
                                    <div class="input-group">
                                        <div class="input-group-addon">
                                            <span class="fa fa-calendar"></span>
                                        </div>
                                        <input id="workPeriod" type="text"
                                               class="form-control daterange"
                                               placeholder="09/01/2017 - 09/20/2017">
                                    </div>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-md-2 control-label">Company</label>
                                <div class="col-md-3">
                                    <input id="company" type="text" class="form-control"
                                           placeholder="...">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-md-2 control-label">Position</label>
                                <div class="col-md-3">
                                    <input id="position" type="text" class="form-control"
                                           placeholder="...">
                                </div>
                            </div>

                            <div class="form-group">

                                <label class="col-md-2 control-label">Country</label>
                                <div class="col-md-3">

                                    <select class="s2-select-search form-control"
                                            id="idDesgCountry"
                                            onchange="getHomeCity(this.value, 'idDesgCity')">
                                    </select>
                                </div>

                            </div>

                            <div class="form-group">

                                <label class="col-md-2 control-label">City</label>
                                <div class="col-md-3">

                                    <select class="s2-select-search form-control"
                                            id="idDesgCity">
                                    </select>
                                </div>

                            </div>


                            <div class="form-group">
                                <label class="col-md-2 control-label">Project</label>
                                <div class="col-md-3">
                                    <input id="project" type="text" class="form-control"
                                           placeholder="...">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-md-2 control-label">Client</label>
                                <div class="col-md-3">
                                    <input id="client" type="text" class="form-control"
                                           placeholder="...">
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-md-2 "></div>
                                <div class="col-md-3 ">
                                    <div class="app-checkbox">
                                        <label>
                                            <input type="checkbox"
                                                   name="app-checkbox-1" id="idApprovalofClient"
                                                   onclick="idApprovalofClientfunc()" value="0">Approval of Client
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group" id="idApprovalofClientFile"
                                 style="display: none;">
                                <label class="col-md-2 control-label">
                                    Certificate
                                    Upload
                                </label>
                                <div class="col-md-6">
                                    <input multiple id="expFile" type="file" class="file"
                                           data-validation="size"
                                           data-validation-max-size="2048kb">
                                    <span class="help-block">
                                        Validate that file isn't
                                        larger than 2048 kilo bytes.
                                    </span>

                                </div>
                            </div>
                            <div class="form-group" style="margin-bottom:10px">
                                <label class="col-md-2 control-label" >
                                    Brief
                                    Description of Work Done
                                </label>
                                <div class="col-md-3" >
                                    <input id="briefDescofWork" type="text"
                                           class="form-control" placeholder="...">
                                </div>
                            </div>

                        </form>

                        <div class="block-content">

                            <table class="table table-striped table-bordered datatable-extended table-responsive">
                                <thead>
                                <tr>
                                    <th>Index</th>
                                    <th>Company</th>
                                    <th>Position</th>
                                    <th>Work Period</th>
                                    <th>Country</th>
                                    <th>City</th>
                                    <th>Project</th>
                                    <th>Client</th>
                                    <th>Certificate</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody id="listExperiences">
                                </tbody>
                            </table>
                        </div>

                        <button class="btn btn-info prevBtn btn-lg pull-left"
                                type="button">
                            Previous
                        </button>
                        <button class="btn btn-info nextBtn btn-lg pull-right"
                                type="button">
                            Next
                        </button>
                    </div>
                </div>
                <!-- END EXPER -->
                
                <!-- START EDUCATION -->
                <div class="row setup-content" id="step-6">
                    <div class="col-md-12">
                        <h3>Education</h3>
                        <!-- BASIC INPUTS    Education-->
                        <form class="form-horizontal">
                            <div class="form-group">
                                <label class="col-md-2 control-label">Graduation</label>
                                <div class="col-md-3">
                                    <select class="s2-select-search form-control"
                                            id="idGraduation">
                                        <option value="0" selected>Select...</option>
                                        <option value="Doctorate">Doctorate</option>
                                        <option value="Master">Master</option>
                                        <option value="Bachelor">Bachelor</option>
                                        <option value="Diploma">Diploma</option>
                                        <option value="College">College</option>
                                        <option value="High School">High School</option>
                                    </select>
                                </div>

                            </div>
                            <div class="form-group">
                                <label class="col-md-2 control-label">Degree</label>
                                <div class="col-md-3">
                                    <select class="s2-select-search form-control"
                                            id="idEduDegree">
                                        <option value="0" selected>Select...</option>

                                    </select>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-md-2 control-label">
                                    Name of School
                                </label>
                                <div class="col-md-3">
                                    <input id="idEduSchool" type="text" class="form-control"
                                           placeholder="...">
                                </div>
                            </div>

                            <div class="form-group">

                                <label class="col-md-2 control-label">Country</label>
                                <div class="col-md-3">

                                    <select class="s2-select-search form-control"
                                            id="idEduCountry">
                                    </select>
                                </div>

                            </div>

                            <div class="form-group">
                                <label class="col-md-2 control-label">
                                    Date of
                                    Graduation
                                </label>
                                <div class="col-md-3">
                                    <div class="input-group bs-datepicker">
                                        <input id="idDateofGrad" type="text"
                                               class="form-control" placeholder="01/01/2001">
                                        <span class="input-group-addon">
                                            <span class="icon-calendar-full"></span>
                                        </span>
                                    </div>
                                </div>

                            </div>


                            <div class="form-group">

                                <label class="col-md-2 control-label">
                                    Graduation
                                    score
                                </label>

                                <div class="col-md-1">
                                    <input id="idGScore1" min="1" type="number"
                                           class="form-control" placeholder="...">
                                </div>
                                <label class="col-md-1 control-label">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;of</label>
                                <div class="col-md-1">
                                    <input id="idGScore2" min="1" type="number"
                                           class="form-control" placeholder="...">
                                </div>

                            </div>

                            <div class="form-group">
                                <label class="col-md-2 control-label"></label>
                                <div class="col-md-6" style="margin-left: 123px">
                                    <input id="educationFile" type="file" class="file"
                                           data-validation="size"
                                           data-validation-max-size="2048kb">
                                </div>

                            </div>


                        </form>

                        <div class="form-group" style="display: none;"
                             id="showEduDiv">
                            <label class="col-md-2 control-label">
                                Certificate
                                Files
                            </label>
                            <div class="col-md-2" id="showEduFile"></div>

                        </div>



                        <!-- END BASIC INPUTS -->
                        <button class="btn btn-info prevBtn btn-lg pull-left"
                                type="button">
                            Previous
                        </button>
                        <button class="btn btn-info nextBtn btn-lg pull-right"
                                type="button" onclick="addEducation()">
                            Next
                        </button>
                    </div>
                </div>
                <!-- END EDUCATION -->
                
                <!-- START LANGUAGE SKILLS -->
                <div class="row setup-content" id="step-7">
                    <div class="col-md-12">
                        <h3>Language Skills</h3>
                        <form class="form-horizontal">
                            <div class="form-group">

                                <label class="col-md-2 control-label">Language</label>
                                <div class="col-md-3">

                                    <select class="s2-select-search form-control"
                                            id="slcLanguage" onchange="" data-placeholder="Choose a Language...">
  <option value="AF">Afrikanns</option>
  <option value="SQ">Albanian</option>
  <option value="AR">Arabic</option>
  <option value="HY">Armenian</option>
  <option value="EU">Basque</option>
  <option value="BN">Bengali</option>
  <option value="BG">Bulgarian</option>
  <option value="CA">Catalan</option>
  <option value="KM">Cambodian</option>
  <option value="ZH">Chinese (Mandarin)</option>
  <option value="HR">Croation</option>
  <option value="CS">Czech</option>
  <option value="DA">Danish</option>
  <option value="NL">Dutch</option>
  <option value="EN">English</option>
  <option value="ET">Estonian</option>
  <option value="FJ">Fiji</option>
  <option value="FI">Finnish</option>
  <option value="FR">French</option>
  <option value="KA">Georgian</option>
  <option value="DE">German</option>
  <option value="EL">Greek</option>
  <option value="GU">Gujarati</option>
  <option value="HE">Hebrew</option>
  <option value="HI">Hindi</option>
  <option value="HU">Hungarian</option>
  <option value="IS">Icelandic</option>
  <option value="ID">Indonesian</option>
  <option value="GA">Irish</option>
  <option value="IT">Italian</option>
  <option value="JA">Japanese</option>
  <option value="JW">Javanese</option>
  <option value="KO">Korean</option>
  <option value="LA">Latin</option>
  <option value="LV">Latvian</option>
  <option value="LT">Lithuanian</option>
  <option value="MK">Macedonian</option>
  <option value="MS">Malay</option>
  <option value="ML">Malayalam</option>
  <option value="MT">Maltese</option>
  <option value="MI">Maori</option>
  <option value="MR">Marathi</option>
  <option value="MN">Mongolian</option>
  <option value="NE">Nepali</option>
  <option value="NO">Norwegian</option>
  <option value="FA">Persian</option>
  <option value="PL">Polish</option>
  <option value="PT">Portuguese</option>
  <option value="PA">Punjabi</option>
  <option value="QU">Quechua</option>
  <option value="RO">Romanian</option>
  <option value="RU">Russian</option>
  <option value="SM">Samoan</option>
  <option value="SR">Serbian</option>
  <option value="SK">Slovak</option>
  <option value="SL">Slovenian</option>
  <option value="ES">Spanish</option>
  <option value="SW">Swahili</option>
  <option value="SV">Swedish </option>
  <option value="TA">Tamil</option>
  <option value="TT">Tatar</option>
  <option value="TE">Telugu</option>
  <option value="TH">Thai</option>
  <option value="BO">Tibetan</option>
  <option value="TO">Tonga</option>
  <option value="TR">Turkish</option>
  <option value="UK">Ukranian</option>
  <option value="UR">Urdu</option>
  <option value="UZ">Uzbek</option>
  <option value="VI">Vietnamese</option>
  <option value="CY">Welsh</option>
  <option value="XH">Xhosa</option>
</select>
                                </div>

                            </div>
                            <div class="form-group">

                                <label class="col-md-2 control-label">Understanding</label>
                                <div class="col-md-3">

                                    <select class="s2-select-search form-control"
                                            id="understanding" onchange=" ">
                                            <option value="1">a1</option>
                                            <option value="2">a2</option>
                                            <option value="3">b1</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">

                                <label class="col-md-2 control-label">Reading</label>
                                <div class="col-md-3">

                                    <select class="s2-select-search form-control"
                                            id="reading" onchange=" ">
                                            <option value="1">a1</option>
                                            <option value="2">a2</option>
                                            <option value="3">b1</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">

                                <label class="col-md-2 control-label">Writing</label>
                                <div class="col-md-3">

                                    <select class="s2-select-search form-control"
                                            id="writing" onchange=" ">
                                            <option value="1">a1</option>
                                            <option value="2">a2</option>
                                            <option value="3">b1</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">

                                <label class="col-md-2 control-label">
                                    International
                                    Language Test
                                </label>
                                <div class="col-md-3">

                                    <select class="s2-select-search form-control"
                                            id="internationallangtest" onchange=" ">
                                            <option value="1">IELTS</option>
                                            <option value="2">TOEFL</option>
                                            
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-2 control-label">Score</label>
                                <div class="col-md-3">
                                    <input id="scoreoftest" type="text" class="form-control"
                                           placeholder="...">
                                </div>
                            </div>
                             <div class="form-group">
                            <div class="col-md-6" style="padding-left: 300px">
                                <input multiple id="languageTestfile" type="file"
                                       class="file" data-validation="size"
                                       data-validation-max-size="2048kb">

                            </div></div>

                        </form>

                        <button class="btn btn-info prevBtn btn-lg pull-left"
                                type="button">
                            Previous
                        </button>
                        <button class="btn btn-info nextBtn btn-lg pull-right"
                                type="button" onclick="addLanguageSkills()">
                            Next
                        </button>
                    </div>
                </div>
                <!-- END LANGUAGE SKILLS -->
                
                <!-- START BANK ACCOUNTS -->                
                <div class="row setup-content" id="step-8">
                    <div class="col-md-12">
                        <h3>Bank Accounts</h3>
                        <form class="form-horizontal">
                            <div class="form-group">
                                <div class="col-md-2"></div>
                                <label class="col-md-3 control-label">
                                    Bank
                                    Accounts
                                </label>
                            </div>
                            <div class="form-group">
                                <label class="col-md-2 control-label">
                                    Name of
                                    Bank
                                </label>
                                <div class="col-md-3">
                                    <select class="s2-select-search form-control"
                                            id="nameofBank" onchange=" ">
                                            <option value="1">Ziraat</option>
                                            <option value="2">Yapı Kredi</option>
                                            <option value="3">Garanti</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">

                                <label class="col-md-2 control-label">Branch</label>
                                <div class="col-md-3">
                                    <select class="s2-select-search form-control"
                                            id="branch" onchange=" ">
                                            <option value="1">12</option>
                                            <option value="2">24</option>
                                            <option value="3">48</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-2 control-label">IBAN No</label>
                                <div class="col-md-3">
                                    <input id="ibanNo" type="text" class="form-control"
                                           placeholder="...">
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-md-2"></div>
                                <label class="col-md-3 control-label">
                                    Credit Card
                                    Accounts
                                </label>
                            </div>
                            <div class="form-group">

                                <label class="col-md-2 control-label">
                                    Name of
                                    Bank
                                </label>
                                <div class="col-md-3">

                                    <select class="s2-select-search form-control"
                                            id="nameofBankforCredit" onchange=" ">
                                            <option value="1">Deniz Bank</option>
                                            <option value="2">ING Bank</option>
                                            <option value="3">Finans Bank</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">

                                <label class="col-md-2 control-label">
                                    Credit Card
                                    No
                                </label>
                                <div class="col-md-3">

                                    <select class="s2-select-search form-control"
                                            id="creditCardNo" onchange=" ">
                                            <option value="1">12345</option>
                                            <option value="2">56789</option>
                                            <option value="3">37895</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-2 control-label">
                                    Cut off
                                    Date
                                </label>
                                <div class="col-md-3">
                                    <div class="input-group bs-datepicker">
                                        <input id="cutoffDate" type="text" class="form-control"
                                               placeholder="01/01/2001">
                                        <span class="input-group-addon">
                                            <span class="icon-calendar-full"></span>
                                        </span>
                                    </div>
                                </div>

                            </div>
                            <div class="form-group">
                                <label class="col-md-2 control-label">
                                    Payment
                                    Date
                                </label>
                                <div class="col-md-3">
                                    <div class="input-group bs-datepicker">
                                        <input id="paymentDate" type="text"
                                               class="form-control" placeholder="01/01/2001">
                                        <span class="input-group-addon">
                                            <span class="icon-calendar-full"></span>
                                        </span>
                                    </div>
                                </div>

                            </div>
                        </form>
                        <button class="btn btn-info prevBtn btn-lg pull-left"
                                type="button">
                            Previous
                        </button>
                        <button class="btn btn-info nextBtn btn-lg pull-right"
                                type="button" onclick="addBankAccounts()">
                            Next
                        </button>
                    </div>
                </div>
                <!-- END BANK ACCOUNT -->
                
                <!-- START SOCIAL AND HOBBIES -->
                <div class="row setup-content" id="step-9">
                    <div class="col-md-12">
                        <h3>Social and Hobbies</h3>
                        <form class="form-horizontal">
                            <div class="form-group">
                                <label class="col-md-2 control-label">Social</label>
                                <div class="col-md-3">
                                    <input id="social" type="text" class="form-control"
                                           placeholder="...">
                                </div>
                            </div>
                            <div class="form-group">

                                <label class="col-md-2 control-label">Hobbies</label>
                                <div class="col-md-3">

                                    <select class="s2-select-search form-control"
                                            id="hobbies" onchange=" ">
                                            <option value="1">Swimming</option>
                                            <option value="2">Jogging</option>
                                            <option value="3">Drawing</option>
                                    </select>
                                </div>
                            </div>
                        </form>


                        <button class="btn btn-info prevBtn btn-lg pull-left"
                                type="button">
                            Previous
                        </button>
                        <button class="btn btn-info nextBtn btn-lg pull-right"
                                type="button" onclick="addSocialAndHobbies()">
                            Next
                        </button>
                    </div>
                </div>
                <div class="row setup-content" id="step-10">
                    <div class="col-md-12">
                        <h3>References</h3>
                        <form class="form-horizontal">
                            <div class="form-group">
                                <label class="col-md-2 control-label">Name</label>
                                <div class="col-md-3">
                                    <input id="nameofReference" type="text"
                                           class="form-control" placeholder="...">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-2 control-label">
                                    Job
                                    Description
                                </label>
                                <div class="col-md-3">
                                    <input id="jobDescofReference" type="text"
                                           class="form-control" placeholder="...">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-2 control-label">Company</label>
                                <div class="col-md-3">
                                    <input id="companyofReference" type="text"
                                           class="form-control" placeholder="...">
                                </div>
                            </div>
                            <div class="form-group">

                                <label class="col-md-2 control-label">Country</label>
                                <div class="col-md-3">

                                    <select class="s2-select-search form-control"
                                            id="countryofReference" onchange=" ">
                                            <option value="1">Turkey</option>
                                            <option value="2">England</option>
                                            <option value="3">Spain</option>
                                            
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-2 control-label">E-Mail</label>
                                <div class="col-md-3">
                                    <input id="emailofReference" type="text"
                                           class="form-control" placeholder="...">
                                </div>
                            </div>
                            <div class="form-group">

                                <label class="col-md-2 control-label">Relation</label>
                                <div class="col-md-3">

                                    <select class="s2-select-search form-control"
                                            id="relationwithReference" onchange=" ">
                                            <option value="1">aunt</option>
                                            <option value="2">nephew</option>
                                            
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-2 control-label">Remarks</label>
                                <div class="col-md-3">
                                    <input id="remarkofreference" type="text"
                                           class="form-control" placeholder="...">
                                </div>
                            </div>
                        </form>

                        <button class="btn btn-info prevBtn btn-lg pull-left"
                                type="button">
                            Previous
                        </button>
                        <button class="btn btn-info nextBtn btn-lg pull-right"
                                type="button" onclick="addReferences()">
                            Next
                        </button>
                    </div>
                </div>
                <div class="row setup-content" id="step-11">
                    <div class="col-md-12">
                        <h3>Comments</h3>
                        <form class="form-horizontal">
                            <div class="form-group">
                                <label class="col-md-2 control-label">Comments</label>
                                <div class="col-md-3">
                                    <input id="comments" type="text" class="form-control"
                                           placeholder="...">
                                </div>
                            </div>
                        </form>

                        <button class="btn btn-info prevBtn btn-lg pull-left"
                                type="button">
                            Previous
                        </button>
                        <button class="btn btn-info nextBtn btn-lg pull-right"
                                type="button" onclick="addComments()">
                            Next
                        </button>
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


        <div class="modal fade" id="modal-clean" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-body">

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
                                <tbody id="trainingFileTable">
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
    <!-- END IMPORTANT SCRIPTS -->

    <script type="text/javascript" src="custom/country.js"></script>
    <script type="text/javascript" src="custom/personel.js"></script>
    <script type="text/javascript" src="custom/navPage.js"></script>
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
            src="js/vendor/maskedinput/jquery.maskedinput.min.js"></script>
    <script type="text/javascript"
            src="js/vendor/datatables/jquery.dataTables.min.js"></script>
    <script type="text/javascript"
            src="js/vendor/datatables/dataTables.bootstrap.min.js"></script>
    <script type="text/javascript"
            src="js/vendor/form-validator/jquery.form-validator.min.js"></script>

    <script type="text/javascript"
            src="js/vendor/noty/jquery.noty.packaged.js"></script>

    <!-- APP SCRIPTS -->
    <script type="text/javascript" src="js/app.js"></script>
    <script type="text/javascript" src="js/app_plugins.js"></script>
    <script type="text/javascript" src="custom/personalTraining.js"></script>
    <script type="text/javascript" src="custom/personalExperience.js"></script>


    <!-- END APP SCRIPTS -->
    <!-- bootstrap toggle için (switch button) -->
    <script src="https://gitcdn.github.io/bootstrap-toggle/2.2.2/js/bootstrap-toggle.min.js"></script>
    <!-- bootstrap toggle için (switch button) -->
    
    <script type="text/javascript" src="js/vendor/dropzone/dropzone.js"></script>
    <script>
     Dropzone.options.profilepic = {
    		 
    		 url:'exportInspectionLogExcel'
    		  
    		};
    

    </script>
    <script>
$(document).ready(function(){
                SyntaxHighlighter.all();
                setTimeout(function(){
                    app.spy();
                },200);
            });</script>

    <script type="text/javascript">
$.validate({
                modules : 'date,file,location',
                onValidate: function(){

                    delayBeforeFire(function(){
                        app.spy();
                    },100);

                }
            });


$(document).ready(function () {
	  var navListItems = $('div.setup-panel div a'),
	          allWells = $('.setup-content'),
	          allNextBtn = $('.nextBtn'),
	  		  allPrevBtn = $('.prevBtn');

	  allWells.hide();

	  navListItems.click(function (e) {
	      e.preventDefault();
	      var $target = $($(this).attr('href')),
	              $item = $(this);

	      if (!$item.hasClass('disabled')) {
	          navListItems.removeClass('btn-info').addClass('btn-default');
	          $item.addClass('btn-info');
	          allWells.hide();
	          $target.show();
	          $target.find('input:eq(0)').focus();
	      }
	  });

	  allPrevBtn.click(function(){
	      var curStep = $(this).closest(".setup-content"),
	          curStepBtn = curStep.attr("id"),
	          prevStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().prev().children("a");

	          prevStepWizard.removeAttr('disabled').trigger('click');
	  });

	  allNextBtn.click(function(){
	      var curStep = $(this).closest(".setup-content"),
	          curStepBtn = curStep.attr("id"),
	          nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
	          curInputs = curStep.find("input[type='text'],input[type='url']"),
	          isValid = true;

	      $(".form-group").removeClass("has-error");
	      for(var i=0; i<curInputs.length; i++){
	          if (!curInputs[i].validity.valid){
	              isValid = false;
	              $(curInputs[i]).closest(".form-group").addClass("has-error");
	          }
	      }

	      if (isValid)
	          nextStepWizard.removeAttr('disabled').trigger('click');
	  });

	  $('div.setup-panel div a.btn-info').trigger('click');
	});
    </script>



</body>
</html>