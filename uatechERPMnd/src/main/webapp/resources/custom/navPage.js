$(document).ready(function() {

	// navpage(); 
	footerdesc();
	
	  
	
});

function footerdesc(){ 
	$('#footerDesc').html('&copy; 2019 AGS Tech. All right reserved ');
}
function navpage(){
	var yeni='<span class="label label-success label-bordered label-ghost">new</span>';
	 
	$("#navid").html('<ul>'
			+'<li><a href="home"><i class="fa fa-home"></i> Home</a></li>'
			+'<li><a href="#"><span class="nav-icon-hexa">HUM</span>Human Resources</a>'
			+'<ul>'
			+'	<li><a href="employee"><span class="nav-icon-hexa">PER</span>Employee List </a> </li>'
			+'	<li><a href="personel2"><span class="nav-icon-hexa">PER</span>Personel</a> </li>'
			+'  <li><a href="personelFormContractor"><span class="nav-icon-hexa">PCO</span>Personel Form Contractor</a></li> ' 
			+'	<li><a href="department"><span class="nav-icon-hexa">DEP</span>Department </a></li>'
			+'	<li><a href="jobDescription"><span class="nav-icon-hexa">JOB</span>Job Description</a></li>'
			+'	<li><a href="designation"><span class="nav-icon-hexa">DES</span>Designation</a></li> '	
			+'  <li><a href="personelFormClient"><span class="nav-icon-hexa">PCL</span>Personel Form Client</a></li> '
			+'</ul>'
			+'</li>' 
			+'<li><a href="#"><span class="nav-icon-hexa">QUA</span>Quality</a>' 
			+'<ul>'
			+'  <li><a href="inspectionAndTestPlan"><span class="nav-icon-hexa">ITP</span>Inspection And Test Plan</a></li> '	
			+'  <li><a href="inspectionRequest"><span class="nav-icon-hexa">INS</span>Inspection Request</a></li> '  
			+'  <li><a href="WIRsetting"><span class="nav-icon-hexa">WIR</span>WIR Setting</a></li> '  
			+'  <li><a href="auditPlan"><span class="nav-icon-hexa">WIR</span>Audit Plan</a></li> '  
			+'  <li><a href="projectQI"><span class="nav-icon-hexa">PQI</span>PQI</a></li> ' 
			+'  <li><a href="manpowerRequirement"><span class="nav-icon-hexa">MAN</span>Manpower Requirement</a></li> '
			+'  <li><a href="violationForm"><span class="nav-icon-hexa">VIO</span>Violation Form</a></li> ' 
			+'  <li><a href="activityList"><span class="nav-icon-hexa">ACT</span>Activity List</a></li> ' 
			+'  <li><a href="transmittalVariants"><span class="nav-icon-hexa">TRV</span>Transmittal Variants</a></li> ' 
			+'  <li><a href="transmittalLog"><span class="nav-icon-hexa">TRL</span>Transmittal Log</a></li> '
			+'  <li><a href="documentType"><span class="nav-icon-hexa">TRL</span>Document Type</a></li> '
			+'  <li><a href="generalReport"><span class="nav-icon-hexa">GR</span>General Report</a></li> '  
			+'</ul>'
			+'</li>' 
			+'<li><a href="#"><span class="nav-icon-hexa">SET</span>Settings</a>' 
			+'<ul>'
			+'  <li><a href="userNameDefine"><span class="nav-icon-hexa">ADD</span>Add User'+yeni+' </a></li> ' 
			+'  <li><a href="userAuthorized"><span class="nav-icon-hexa">USE</span>User Authorized</a></li> ' 
			+'</ul>'
			+'</li>'  
			+'  <li><a href="nonConformance"><span class="nav-icon-hexa">NON</span>Non Conformance '+yeni+' </a></li> ' 
			+'  <li><a href="dashboardSet"><span class="nav-icon-hexa">ITP</span>Dashboard Setting '+yeni+' </a></li> ' 
			+'</ul>');  
	

	
} 