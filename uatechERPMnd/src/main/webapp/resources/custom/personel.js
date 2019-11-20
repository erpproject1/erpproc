$(document).ready(function() {
	getCountry();
	getState('idKSACity',191);
	allMoney();
	setYear(); 
	//getDepartments();
	getDisciplines();
	
    var EmpId=$("#hidEmpId").val();
    if(EmpId!=null )
    {
    	 if(EmpId!='null' )
    	    {
    		  $("#hidPersonalID").val(EmpId);
    	       getPersonel(EmpId);
    	       getTraining(EmpId);
    	       getExperience(EmpId);
    	    }
    }
	
 
}); 



function addPersonel() {
alert("Ekleme");
	var hidPerID=$("#hidPersonalID").val();
	 
	if(hidPerID.length<1) 
	{ 
	var company=$('#idCompanyCheck').is(':checked') ? 1 : 0;
	var rental=$('#idRentalCheck').is(':checked') ? 1 : 0;
	var pertype='';
	
	if(rental==1){pertype='R'; }
	else if(company==1){pertype='C'; } 
	
	var date1 = setDateFormat($("#idBirthDate").val()); 
	var date2 = setDateFormat($("#idContDate").val()); 
	
	var flag =addPersonelKontrol();  
	if(flag)
	{
	var param = {   companyId :$("#idCompanyID").val(),
			        personType:pertype,
				    nationalityId : $("#idNationality").val(),
				    name : $("#idName").val(),
				    midName : $("#idMidName").val(),
				    lastName :$("#idLasName").val(),
				    nationalId : $("#idNationalId").val(),
				    passportNo : $("#idPasportNo").val() ,
				    fatherName:$("#idFatherName").val(),
				    motherName:$("#idMotherName").val(),
				    drivingLicence:$("#idDrivingLicence").val(),
				    placeOfBirth:$("#idPlaceofBird").val(),
				    
				    birthDate:date1  }
	 
	var ser_data = JSON.stringify(param);
	
	
	$.ajax({
		type : "POST",
		contentType : 'application/json; charset=UTF-8',
		url : 'addPersonel',
		data : ser_data,
		success : function(data) { 
			$("#hidPersonalID").val(data); 
			bildirim('s','Created Succes');
			$("#btn1add").html('Update'); 
			$("button[id='btn1clear']").attr("disabled", true); },
		error : function(data) {
			bildirim('e','Your transaction has failed'); }

	     });  
	   }//flag
	}
	else {
		var flag =addPersonelKontrol();  
		if(flag)
		{
		updatePersonal('personal');
		}
	}
}

function addPersonelKontrol()
{ alert("Kontrol");
	var flag=true;
	 
	var company=$('#idCompanyCheck').is(':checked') ? 1 : 0;
	var rental=$('#idRentalCheck').is(':checked') ? 1 : 0;
	var pertype='';
	
	if(rental==1){pertype='R'; }
	else if(company==1){pertype='C'; } 
	 
	var compId = $("#idCompanyID").val(); 
	var pname= $("#idName").val();
	var plastname= $("#idLasName").val();
	var pNatId=$("#idNationalId").val();

	if(pertype.length<1)
	{
		bildirim('e','Must be Selected Company or Rental');
		flag=false;
	}
	else if(compId.length<1)
	{
		bildirim('e','Company Id is Empty');
		document.getElementById("idCompanyID").focus();
		flag=false;
	}
	else if(pname.length<1)
	{
		bildirim('e','Name is Empty');
		document.getElementById("idName").focus();
		flag=false;
	}else if(plastname.length<1)
	{
		bildirim('e','Last Name is Empty');
		document.getElementById("idLasName").focus();
		flag=false;
	}
	else if(pNatId.length<1)
	{
		bildirim('e',' National Id is Empty');
		document.getElementById("idNationalId").focus();
		flag=false;
	}else if(pNatId.length!=10)
	{
		bildirim('e',' National Id must be 10 characters');
		document.getElementById("idNationalId").focus();
		flag=false;
	}	
	return flag;
}




function  mesajgoster(mTip,mText)
{   //setInterval(function(){getNotes();},3000);

	//app.loading('show',{value: [0,100],speed: 10,state: 'success'});
	//app.loading('destroy'); 
	
	if(mTip=='s')
	{
     var msg = document.getElementById("msgSucces");
	  msg.style.display = "block";
	  $("#msgSucces").html(mText);
	  setTimeout(function(){ 
	  var msg = document.getElementById("msgSucces");
	  msg.style.display = "none";},3000);
	}
	else if(mTip=='e')
	{
		 var msg = document.getElementById("msgError");
		  msg.style.display = "block";
		  $("#msgError").html(mText);
		  setTimeout(function(){ 
			  var msg = document.getElementById("msgError");
			  msg.style.display = "none";},3000);
	}
	
	 
	
	
	/*setInterval(function(){ 
	if(mTip=='s')
	{
     var msg = document.getElementById("msgSucces");
	  msg.style.display = "block";
	  $("#msgSucces").html(mText);
	}
	else if(mTip=='e')
	{
		 var msg = document.getElementById("msgError");
		  msg.style.display = "block";
		  $("#msgError").html(mText);
		
	}
	
	},2000);*/
}

function getPersonel(EmpId)
{
	var param = {
			 id : EmpId
			}
	 var ser_data = JSON.stringify(param);
			$.ajax({
				type : "POST",
				contentType : 'application/json; charset=UTF-8',
				url : 'getPersonel', 
				data : ser_data,
				success : function(data) { 
					$("#btn1add").html('Update'); 
					$("button[id='btn1clear']").attr("disabled", true);
					
					if(data.personType=='R')
				    {$("input[id='idRentalCheck']").attr("checked", true);}
					else{$("input[id='idCompanyCheck']").attr("checked", true);}
					
					var text2 = document.getElementById("rentaliddiv");
					text2.style.display = "block";
					 
					$("#idName").val(data.name);
		            $("#idMidName").val(data.midName),
		            $("#idLasName").val(data.lastName),
					$("#idCompanyID").val(data.companyId);
					$("#idNationality").val(data.nationalityId);
                    $("#idNationalId").val(data.nationalId);
				    $("#idPasportNo").val(data.passportNo);
				    $("#idBirthDate").val(setDateFormatR(data.birthDate));

				    //$("#idKSACountry").val(countryId), //zaten seçili
				     $("#idKSACity").val(data.cityId).change(); 
				     $("#idAddress").val(data.address);
				     $("#idCompanyName").val(data.company); 
				     $("#idComPhone").val(data.companyPhone);
				     $("#idComEmail").val(data.companyEmail);
				     $("#idPerPhone").val(data.personalPhone);
				     $("#idPerEmail").val(data.personalEmail); 
				     $("#idEmePhone").val(data.emergencyPhone);  
				      $("#idEmeEmail").val(data.emergencyEmail); 
				      $("#idHomeCountry").val(data.homeCountryId).change(); 
				      $("#idHomeCity").val(data.homeCityId).change(); 
				      $("#idHomeAddress").val(data.homeAddress);  
				      $("#idHPerPhone").val(data.homePersonalPhone);   
				      $("#idHEmePhone").val(data.homeEmergencyPhone);   
				      $("#idHEmeEmail").val(data.homeEmergencyEmail);  
				    
				      $("#idGraduation").val(data.graduation).change();  
					  $("#idEduDegree").val(data.degree);   
					  $("#idEduSchool").val(data.nameOfSchool);
					  $("#idEduCountry").val(data.schoolCountry).change(); 
					  $("#idYearofGrad").val(data.yearOfGraduation).change(); 
					  
					  var gr = data.graduationScore.split("/");
					  $("#idGScore1").val(gr[0])+'/'+$("#idGScore2").val(gr[1]);

					     $("#idContDepart").val(data.departmentId).change(); 
					     
					     setTimeout(function(){
					     $("#idContJobDesc").val(data.jobId).change(); 
					     $("#idContDesig").val(data.designationId).change(); 
					     $("#idContDiscip").val(data.disciplineId).change(); 
					     },3000);
					      
					     $("#idContDate").val(setDateFormatR(data.contractDate));         
					     $("#idContDura").val(data.contractDuration); 
						 $("#idContDura2").val(data.contractDurationDesc).change();          
					          
					     $("#idContAnVaDa").val(data.vocationDays);  
						 $("#idContAnVaDa2").val(data.vocationDaysDesc).change(); 
					     $("#idContAnVaPer").val(data.vocationPeriod); 
						 $("#idContAnVaPer2").val(data.vocationPeriodDesc).change();          
					            
					     $("#idBasicSalary").val(data.basicSalary);   
						 $("#idMoney1").val(data.basicSalaryDesc).change();           
					     
					     $("#idHomeAllow").val(data.homeAllowance);      
						 $("#idMoney2").val(data.homeAllowanceDesc).change();       
					         
					     $("#idTransAllow").val(data.transAllowance); 
						 $("#idMoney3").val(data.transAllowanceDesc).change();          
					             
					     $("#idFoodAllow").val(data.foodAllowance);  
						 $("#idMoney4").val(data.foodAllowanceDesc).change();          
					      
						 var oall=data.otherAllowanceText;
						 if(oall.length>0)
					     {
							 $("input[id='idAllowCheck']").attr("checked", true);
							 var text3 = document.getElementById("idAllowanceDiv");
							 text3.style.display = "block";
								
							 $("#idOAllowText").val(data.otherAllowanceText);          
					         $("#idOAllowMoney").val(data.otherAllowance); 
							 $("#idMoney5").val(data.otherAllowanceDesc).change();         
					     }
						 
						 
						  var dow = ' <button class="btn btn-default" onclick="createEduFileTable('+ $("#hidPersonalID").val() +')" data-toggle="modal" data-target="#modal-clean"><span class="fa fa-neuter"></span></button>';
						  $("#showEduFile").html(dow); 
						  var div1 = document.getElementById("showEduDiv");
						  div1.style.display = "block";
						  
		},
		error : function(data) {
			bildirim('e','Error get Employee');
		}

	});
			
			var EmpId=$("#hidAllClose").val();
		    if(EmpId!=null )
		    {
		    	 if(EmpId!='null' )
		    	    {	 
			 $("button[id='btn1clear']").attr("disabled", true);
			 $("button[id='btn2clear']").attr("disabled", true);
			 $("button[id='btn3clear']").attr("disabled", true);
			 $("button[id='btn4clear']").attr("disabled", true);
			 $("button[id='btn5clear']").attr("disabled", true);
			 $("button[id='btn6clear']").attr("disabled", true);  	
			 $("button[id='btn2update']").attr("disabled", true); 	
			 $("button[id='btn6update']").attr("disabled", true); 	
			 $("button[id='btn4update']").attr("disabled", true);  
			 $("button[id='btn1add']").attr("disabled", true);   
			 $("button[id='btn3add']").attr("disabled", true);   
			 $("button[id='btn5add']").attr("disabled", true);  		
			    	    }
			    }
}
 
function addPersonel1() { //şuanluık kullanılmıyor

	var company=$('#idCompanyCheck').is(':checked') ? 1 : 0;
	var rental=$('#idRentalCheck').is(':checked') ? 1 : 0;
	var pertype='';
	if(rental==1){pertype='R'; }
	else if(company==1){pertype='C'; }

	var date1 = setDateFormat($("#idBirthDate").val()); 
	var date2 = setDateFormat($("#idContDate").val()); 
	var compId = $("#idCompanyID").val(); 
	
	var param = {   companyId :compId,
			        personType:pertype,
				    nationalityId : $("#idNationality").val(),
				    name : $("#idName").val(),
				    midName : $("#idMidName").val(),
				    lastName : $("#idLasName").val(),
				    nationalId : $("#idNationalId").val(),
				    passportNo : $("#idPasportNo").val() ,
				    birthDate:date1,
				    countryId: $("#idKSACountry").val(),
				    cityId: $("#idKSACity").val(),
				    address: $("#idAddress").val(),
				    company: $("#idCompanyName").val(),  
				    companyPhone: $("#idComPhone").val(),
				    companyEmail: $("#idComEmail").val(),
				    personalPhone: $("#idPerPhone").val(),
				    personalEmail: $("#idPerEmail").val(),   
				    emergencyPhone: $("#idEmePhone").val(),   
				    emergencyEmail: $("#idEmeEmail").val(),   
				    homeCountryId: $("#idHomeCountry").val(),   
				    homeCityId: $("#idHomeCity").val(),   
				    homeAddress: $("#idHomeAddress").val(),   
				    homePersonalPhone: $("#idHPerPhone").val(),   
				    homeEmergencyPhone: $("#idHEmePhone").val(),   
				    homeEmergencyEmail: $("#idHEmeEmail").val(),   
				    graduation: $("#idGraduation").val(),       
				    degree: $("#idEduDegree").val(),       
				    nameOfSchool: $("#idEduSchool").val(),       
				    schoolCountry: $("#idEduCountry").val(),       
				    yearOfGraduation: $("#idYearofGrad").val(),       
				    graduationScore: $("#idGScore1").val()+'/'+$("#idGScore2").val(),       
				    departmentId: $("#idContDepart").val(),          
				    jobId: $("#idContJobDesc").val(),          
				    designationId: $("#idContDesig").val(),   
				    disciplineId: $("#idContDiscip").val(),   
				    contractDate: date2,          
				    contractDuration: $("#idContDura").val(),          
				    contractDurationDesc: $("#idContDura2").val(),          
				    vocationDays: $("#idContAnVaDa").val(),          
				    vocationDaysDesc: $("#idContAnVaDa2").val(),          
				    vocationPeriod: $("#idContAnVaPer").val(),          
				    vocationPeriodDesc: $("#idContAnVaPer2").val(),          
				    basicSalary: $("#idBasicSalary").val(),          
				    basicSalaryDesc: $("#idMoney1").val(),          
				    homeAllowance: $("#idHomeAllow").val(),          
				    homeAllowanceDesc: $("#idMoney2").val(),          
				    transAllowance: $("#idTransAllow").val(),          
				    transAllowanceDesc: $("#idMoney3").val(),          
				    foodAllowance: $("#idFoodAllow").val(),          
				    foodAllowanceDesc: $("#idMoney4").val(),          
				    otherAllowanceText: $("#idOAllowText").val(),          
				    otherAllowance: $("#idOAllowMoney").val(),          
				    otherAllowanceDesc: $("#idMoney5").val() ,
				    
	}
	 
	var ser_data = JSON.stringify(param);
	
	$.ajax({
		type : "POST",
		contentType : 'application/json; charset=UTF-8',
		url : 'addPersonel',
		data : ser_data,
		success : function(data) { 
			alert('Created Succes');
			$("#hidPersonalID").val(data);
			setTab('tabs-3');
		},
		error : function(data) {
			alert('Tekrar deneyiniz..!')
		}

	});  
}

function updatePersonal(u){
		
	var perID=$("#hidPersonalID").val(); 
	if(perID.length>0)
	{	
	 
	var param=null;
	var uri='updatePersonal';
	 		
		  if(u=='personal')
		  { 
			  var company=$('#idCompanyCheck').is(':checked') ? 1 : 0;
				var rental=$('#idRentalCheck').is(':checked') ? 1 : 0;
				var pertype='';
				if(rental==1){pertype='R'; }
				else if(company==1){pertype='C'; }

				var date1 = setDateFormat($("#idBirthDate").val());  
				var compId = $("#idCompanyID").val(); 
			  
			  param = {
				id: perID,
				companyId :compId,
		        personType:pertype,
			    nationalityId : $("#idNationality").val(),
			    name : $("#idName").val(),
			    midName : $("#idMidName").val(),
			    lastName : $("#idLasName").val(),
			    nationalId : $("#idNationalId").val(),
			    passportNo : $("#idPasportNo").val() ,
			    birthDate:date1 
			    } 
		  uri='updatePersonal';
		  var ser_data = JSON.stringify(param);
			 
			$.ajax({
				type : "POST",
				contentType : 'application/json; charset=UTF-8',
				url : uri,
				data : ser_data,
				success : function(data) {
					bildirim('s',u+' update Succesful');
				},
				error : function(data) {
					bildirim('e','Update Error');
				}
				
			});
		  }
		  else if(u=='contact')
		   {
			   param = {
						id: perID, 
					    countryId: $("#idKSACountry").val(),
					    cityId: $("#idKSACity").val(),
					    address: $("#idAddress").val(),
					    company: $("#idCompanyName").val(),  
					    companyPhone: $("#idComPhone").val(),
					    companyEmail: $("#idComEmail").val(),
					    personalPhone: $("#idPerPhone").val(),
					    personalEmail: $("#idPerEmail").val(),   
					    emergencyPhone: $("#idEmePhone").val(),   
					    emergencyEmail: $("#idEmeEmail").val(),   
					    homeCountryId: $("#idHomeCountry").val(),   
					    homeCityId: $("#idHomeCity").val(),   
					    homeAddress: $("#idHomeAddress").val(),   
					    homePersonalPhone: $("#idHPerPhone").val(),   
					    homeEmergencyPhone: $("#idHEmePhone").val(),   
					    homeEmergencyEmail: $("#idHEmeEmail").val(),
					    socialMediaAccounts:$("#idSocialMediaAc").val() //for contact page
					    }	
			   uri='updatePersonal1';
			   var ser_data = JSON.stringify(param);
				 
				$.ajax({
					type : "POST",
					contentType : 'application/json; charset=UTF-8',
					url : uri,
					data : ser_data,
					success : function(data) {
						bildirim('s',u+' update Succesful');
					},
					error : function(data) {
						bildirim('e','Update Error');
					}
					
				});
		   }
		  else if(u=='education')
		   {
			  var dow = '<button class="btn btn-default" onclick="createEduFileTable('+ perID 
			  +')" data-toggle="modal" data-target="#modal-clean"><span class="fa fa-neuter"></span></button>';
			  $("#showEduFile").html(dow); 
			  var div1 = document.getElementById("showEduDiv");
			  div1.style.display = "block";
			  
			  var formData = getEducationFiles();
			   param = {
						id: perID,  
					    graduation: $("#idGraduation").val(),       
					    degree: $("#idEduDegree").val(),       
					    nameOfSchool: $("#idEduSchool").val(),       
					    schoolCountry: $("#idEduCountry").val(),       
					    yearOfGraduation: $("#idYearofGrad").val(),       
					    graduationScore: $("#idGScore1").val()+'/'+$("#idGScore2").val(),
					    dateOfGrad:$("#idDateofGrad").val()
					    }	
			   
			   var ser_data = JSON.stringify(param);
				
			   if (formData != null)
				{
				   uri='updatePersonal2';
				   formData.append("jsonObjectData", ser_data + "");	
				 
				app.loading('show',{value: [0,100],speed: 10,state: 'success'});
				
				$.ajax({
					type : "POST",
					contentType : false,
					processData : false,
					url : uri,
					data : formData, 
					success : function(data) {
						bildirim('s',u+' update Succesful and added file');
						  
						 app.loading('destroy'); 
						
					},
					error : function(data) {
						bildirim('e',u+' update Error');
					}

				});
				}
				else{
					uri='updatePersonal22';
					$.ajax({
						type : "POST",
						contentType : 'application/json; charset=UTF-8',
						url : uri,
						data : ser_data,
						success : function(data) {
							bildirim('s',u+' update Succesful');
						},
						error : function(data) {
							bildirim('e',u+' Update Error');
						}
						
					});
				}
		   }
		  else if(u=='contract')
		   {
			   param = {
						id: perID,  
						departmentId: $("#idContDepart").val(),          
					    jobId: $("#idContJobDesc").val(),          
					    designationId: $("#idContDesig").val(),   
					    disciplineId: $("#idContDiscip").val(),           
					    contractDate: setDateFormat($("#idContDate").val()),          
					    contractDuration: $("#idContDura").val(),          
					    contractDurationDesc: $("#idContDura2").val(),          
					    vocationDays: $("#idContAnVaDa").val(),          
					    vocationDaysDesc: $("#idContAnVaDa2").val(),          
					    vocationPeriod: $("#idContAnVaPer").val(),          
					    vocationPeriodDesc: $("#idContAnVaPer2").val(),          
					    basicSalary: $("#idBasicSalary").val(),          
					    basicSalaryDesc: $("#idMoney1").val(),          
					    homeAllowance: $("#idHomeAllow").val(),          
					    homeAllowanceDesc: $("#idMoney2").val(),          
					    transAllowance: $("#idTransAllow").val(),          
					    transAllowanceDesc: $("#idMoney3").val(),          
					    foodAllowance: $("#idFoodAllow").val(),          
					    foodAllowanceDesc: $("#idMoney4").val(),          
					    otherAllowanceText: $("#idOAllowText").val(),          
					    otherAllowance: $("#idOAllowMoney").val(),          
					    otherAllowanceDesc: $("#idMoney5").val(),
					    allowance:$("#idAllowanceforFile").val(),
					    allowanceDesc:$("#idAllowanceforFileSelect").val()
					    }
			   
		     uri='updatePersonal3';
			   var ser_data = JSON.stringify(param);
				 
				$.ajax({
					type : "POST",
					contentType : 'application/json; charset=UTF-8',
					url : uri,
					data : ser_data,
					success : function(data) {
						bildirim('s',u+' update Succesful');
					},
					error : function(data) {
						bildirim('e','Update Error');
					}
					
				});
		   }
		
     }
	else if(u=='languageskills')
	   {
		   param = {
				   language:$("#language").val(),
				   understanding:$("#understanding").val(),
				   reading:$("#reading").val(),
				   writing:$("#writing").val(),
				   internationallangtest:$("#internationallangtest").val(),
				   score:$("#scoreoftest").val()
				   }
	   }
	else if(u=='bankaccounts')
	   {
		   param = {
				   nameOfBank:$("#nameofBank").val(),
				   branch:$("#branch").val(),
				   ıbanNo:$("#ıbanNo").val(),
				   nameOfBankcredit:$("#nameofBankforCredit").val(),
				   creditCardNo:$("#creditCardNo").val(),
				   cutOffDate:$("#cutoffDate").val(),
				   paymentDate:$("#paymentDate").val()
				   }
	   }
	else if(u=='socialHobbies')
		   {
			   param = {
					   social:$("#social").val(),
					   hobbies:$("#hobbies").val()
					   
					   }
	       }
	else if(u=='references')
	   {
		   param = {
				   nameReference:$("#nameofReference").val(),
				   jobDescReference:$("#jobDescofReference").val(),
				   companyReference:$("#companyofReference").val(),
				   countryReference:$("#countryofReference").val(),
				   emailReference:$("#emailofReference").val(),
				   relation:$("#relationwithReference").val(),
				   remarks:$("#remarkofreference").val()
				   
				   }
    }
	else if(u=='comments')
	   {
		   param = {
				   comments:$("#comments").val()
				   }
 }
	else {  bildirim('e','Please, before add Personal'); }
		
}

function getEducationFiles() {

	input = document.getElementById('educationFile');
	var data = new FormData();
	var fileNames = [];
	var files = [];
	if (!input) {
		return null;
	} else if (!input.files) {
		return null;
	} else if (!input.files[0]) {
		return null;
	} else {

		for (var i = 0; i < input.files.length; i++) {
			fileNames[i] = input.files[i].name;
			data.append('file', input.files[i]);
		}
		data.append('name', fileNames);

	}

	return data;
}
 
function rentalOpen() {
	var checkBox = document.getElementById("idRentalCheck"); 
	var checkBox2 = document.getElementById("idCompanyCheck"); 
	var text2 = document.getElementById("rentaliddiv");
	
	if (checkBox.checked == true){ 
		text2.style.display = "block";
	}
	else if (checkBox2.checked == true){ 
		text2.style.display = "block";
	} 
	else { 
		text2.style.display = "none";
	}
	 
	}
		
function idAllowancefunck() {
		  var checkBox = document.getElementById("idAllowCheck");
		  var text = document.getElementById("idAllowanceDiv");
		  if (checkBox.checked == true){
			text.style.display = "block";
		  } else {
			 text.style.display = "none";
		  }
}
		

function idApprovalofClientfunc() {
		
		  var checkBox = document.getElementById("idApprovalofClient");
		  var text = document.getElementById("idApprovalofClientFile");
		  if (checkBox.checked == true){
			text.style.display = "block";
		  } else {
			 text.style.display = "none";
		  }
}
		
function setTab(tab) { 
	$('.nav-tabs a[href="#' + tab + '"]').tab('show');
}

 
function getCountry()
{
	 var list = getCountry2();
	$('#idNationality').html(list);
	$('#idHomeCountry').html(list);
	$('#idDesgCountry').html(list);
	$('#idEduCountry').html(list);
	$('#idKSACountry').html('<option value="191" selected>Saudi Arabia</option>');
	
}

function getState(alan,stateid)
{
	 var list2 =getState2(stateid);
	  $('#'+alan+'').html(list2);
}

function getHomeCity(valu,area)
{  
	getState(area,valu);
}

var monay_array= new Array("USD","TRY","EUR","GBP","CHF","CNY","JPY","SAR","NOK","DKK","AUD","CAD","SEK","KWD","IRR","RUB","AFN","AOA","ARS","ALL","AWG","AZN","AED","BSD","BHD","BDT","BBD","BYR","BZD","BMD","BTN","BOB","BAM","BWP","BRL","BND","BGN","BIF","XAF","CVE","GIP","DZD","DJF","CZK","DOP","XCD","SVC","IDR","ERN","AMD","ETB","FKP","MAD","FJD","PHP","GMD","GHS","GNF","GTQ","GYD","ZAR","KRW","GEL","HTG","INR","ANG","HNL","HKD","HRK","IQD","ILS","ISK","JMD","KHR","QAR","KYD","KZT","KES","COP","KMF","CDF","CRC","KPW","CUP","KGS","LAK","LSL","LVL","LRD","LYD","LTL","LBP","HUF","MGA","MOP","MKD","MWK","MVR","MYR","MUR","MXN","MDL","MRO","MZN","MNT","MMK","EGP","NAD","NPR","NGN","NIO","UZS","PAB","PGK","PYG","PEN","PLN","RON","RWF","SHP","WST","STD","SCR","SLL","SGD","SBD","SOS","LKR","SDG","SRD","SYP","SZL","RSD","CLP","TJS","TZS","THB","TWD","TOP","TTD","TND","TMT","UGX","UAH","OMR","UYU","JOD","VUV","VEF","VND","YER","NZD","ZMW","ZWL");

function allMoney()
{
	var list3='<option value="0"  selected>Select...</option> <optgroup label="Most Selected"><option value="SAR">SAR</option><option value="USD">USD</option> <option value="EURO">EURO</option> <option value="GBP">GBP</option> </optgroup><optgroup label="Select Money"> ';

	for (var i=0; i<monay_array.length; i++) {
		 
		list3 = list3 + '<option value="'+monay_array[i]+'">'+monay_array[i]+'</option> ' ;
	}
	list3 = list3 + '</optgroup>';
	$('.moneyType').html(list3);
}

function setYear()
{
	var dt = new Date();
    var i=dt.getFullYear();
    var list4='<option value="0" selected>Select...</option>';
    for (var j=i; j>1930; j--) {
		 
		list4 = list4 + '<option value="'+j+'">'+j+'</option> ' ;
	}
    $('#idYearofGrad').html(list4);
}

function setDateFormat(date) { //01/02/2011 ->2011/02/01
	
	if(date.length>3)
	{	
	var newdate = date.split("/");
	date=newdate[2]+'-'+newdate[1]+'-'+newdate[0];}
	else{date='';}
	return date;
	}

function setDateFormatR(date) { // 2011/02/01-> 01/02/2011
	
	if(date.length>3)
	{	
	var newdate = date.split("-");
	date=newdate[2]+'/'+newdate[1]+'/'+newdate[0];}
	else{date='';}
	return date;
	}

function getDepartments() {

	$.ajax({
		type : "GET",
		url : 'getDepartments',
		success : function(data) {

			var list = '<option value="' + 0 + '">Select ..</option> ';
			 
			$(data).each(
					function(i, val) {

						list = list + '<option value="' + val.id + '">'
								+ val.department + '</option> ';
						 
					}); 
			$("#idContDepart").html(list);
		},
		error : function(data) {
			bildirim('e','get department error ');
		}

	});

}

function getDisciplines() {

	var param = {
			 type : "Discipline"
			}
	 var ser_data = JSON.stringify(param);
	
	$.ajax({
		type : "POST",
		contentType : 'application/json; charset=UTF-8',
		url : 'getWirSettings', 
		data : ser_data,
		success : function(data) {
			
			
			var list = '<option value="0">Select ..</option> ';
			 
			$(data).each( function(i, val) {

			 list = list + '<option value="' + val.id+ '">' + val.description + '</option> ';
						 
					}); 
			$("#idContDiscip").html(list);
		},
		error : function(data) {
			bildirim('e','get Discipline error ');
		}

	});

}

function getDepJobAndDesg()
{
	getDepartmentJobs();
	getDepartDesign();
}


function getDepartmentJobs()
{
	 var depId=$("#idContDepart").val();
	  
	 var param = {  departmentId : depId }
	 var ser_data = JSON.stringify(param);
	 var list = '<option value="' + 0 + '">Select ..</option> ';
	 
	$.ajax({
		type : "POST",
		contentType : 'application/json; charset=UTF-8',
		url : 'getDepartmentJobs', 
		data : ser_data,
		success : function(data) { 
			 
			$(data).each(
					function(i, val) {

			 list = list + '<option value="' + val.id + '">' + val.jobDescription + '</option> ';
						
					
					});
			
			$("#idContJobDesc").html(list);
		},
		error : function(data) {
			bildirim('e','get department error');
		}

	});

	
}

function getDepartDesign()
{
	 var depId=$("#idContDepart").val();
	 
	 var param = {  departmentId : depId }
	 var ser_data = JSON.stringify(param);
	 var list = '<option value="' + 0 + '">Select ..</option> ';
	 
	$.ajax({
		type : "POST",
		contentType : 'application/json; charset=UTF-8',
		url : 'getDepartDesigns', 
		data : ser_data,
		success : function(data) { 
			 
			$(data).each(
					function(i, val) {

			 list = list + '<option value="' + val.id + '">' + val.designation + '</option> ';
						
					
					});
			
			$("#idContDesig").html(list);
		},
		error : function(data) {
			bildirim('e','get departDesign error');
		}

	});

	
}
 
function clearArea(class_name) {
    $div_ec = jQuery("#" + class_name);
    $div_ec.find(':input').each(function () {
        switch (this.type) {
            case 'password':
            case 'text':
            case 'textarea':
            case 'file':
            case 'select-one':
            case 'select-multiple':
            case 'date':
            case 'number':
            case 'tel':
            case 'email':
                jQuery(this).val('');
                break;
            case 'checkbox':
            case 'radio':
                this.checked = false;
                break;
        }
    });
    $div_ec.find('select').prop('selectedIndex', 0);
   
}

function createEduFileTable(pId) {
	
	  
	var param = {
			parityId : pId,
			parityType:'education',
			personalId:pId
		}
		var ser_data = JSON.stringify(param);
		 
	$.ajax({
		type : "POST",
		contentType : 'application/json; charset=UTF-8',
		url : 'getPersonalFiles',
		data : ser_data,
		success : function(data) {

			
			var listBody = "";
			$(data).each(
					function(i, val) {				
						
						var download = ' <a href="getPersonalFile/'+val.id+'"><button type="button"  class="btn btn-default btn-icon"><span class="fa fa-cloud-download"></span></button></a>';	
												
						var j = i+1; 
						listBody = listBody + '<tr><td>' + j + '</td><td>'
						+ val.clientFileName + '</td><td>'						
						+download+'</td><td>'
						+'<button  type="button" onclick="deleteEduFile(this,'+val.id+')" class="btn btn-default btn-icon"><span class="fa fa-times"></span></button> </td></tr>';
					});
			
			$("#trainingFileTable").html(listBody); 
		},
		error : function(data) {
			bildirim('e','File error');
		}

	});
}



function deleteEduFile(ctl,pId){
	
	
	  var param = {
				id : pId
			}
	 var ser_data = JSON.stringify(param);
			$.ajax({
				type : "POST",
				contentType : 'application/json; charset=UTF-8',
				url : 'deletePersonelFile',
				data : ser_data,
				success : function(data) {
					bildirim('e','Delete Succes');
					$(ctl).parents("tr").remove();
				},
				error : function(data) {
					bildirim('e','Delete error');
				}

	});
	
}


function addPersonelForm() {
	var param = {

		name : $("#idName").val(),
		midName : $("#idMidName").val(),
		lastName : $("#idLasName").val(),
		isMaleFemale : $(".btnMaleFemale").val() == "on" ? true : false,
		fatherName : $("#idFatherName").val(),
		motherName : $("#idMotherName").val(),
		placeOfBirth : $("#idPlaceofBird").val(),
		birthDate : setDateFormat($("#idBirthDate").val()),
		nationalId : $("#idNationalId").val(),
		passportNo : $("#idPasportNo").val(),
		fileName:$("#profilepic").val(),
		drivingLicence : $("#idDrivingLicence").val(),
		
	}

	var ser_data = JSON.stringify(param);

	$.ajax({
		type : "POST",
		contentType : 'application/json; charset=UTF-8',
		url : 'addPersonel',
		data : ser_data,
		success : function(data) {
			$("#hidPersonalID").val(data);
			bildirim('s', 'Created Succes');
			$("#btn1add").html('Update');
			$("button[id='btn1clear']").attr("disabled", true);
		},
		error : function(data) {
			bildirim('e', 'Your transaction has failed');
		}

	});
}

function addContact() {

	if($("#hidPersonalID").val()=="")
	{
	bildirim('e', 'Not read Personnel');
	}
	else{
		var param = {
			id: $("#hidPersonalID").val(),
			address:$("#idAddress").val(),
			company:$("#idCompanyName").val(),
			companyPhone: $("#idComPhone").val(),
			personalPhone: $("#idPerPhone").val(),
		    companyEmail: $("#idComEmail").val(),
		    personalEmail: $("#idPerEmail").val(),   
		    emergencyPhone: $("#idEmePhone").val(),   
		    emergencyEmail: $("#idEmeEmail").val(),   
		    homeCountryId: $("#idHomeCountry").val(),   
		    homeCityId: $("#idHomeCity").val(),   
		    homeAddress: $("#idHomeAddress").val(),   
		    homePersonalPhone: $("#idHPerPhone").val(),   
		    homeEmergencyPhone: $("#idHEmePhone").val(),   
		    homeEmergencyEmail: $("#idHEmeEmail").val(),
		    socialMediaAccounts:$("#idSocialMediaAccounts").val()
	
		}

		var ser_data = JSON.stringify(param);

		$.ajax({
			type : "POST",
			contentType : 'application/json; charset=UTF-8',
			url : 'addPersonel',
			data : ser_data,
			success : function(data) {
				$("#hidPersonalID").val(data);
				bildirim('s', 'Created Succes');
				$("#btn1add").html('Update');
				$("button[id='btn1clear']").attr("disabled", true);
			},
			error : function(data) {
				bildirim('e', 'Your transaction has failed');
			}

		});
	}
	}


function addContract() 

{

	if($("#hidPersonalID").val()=="")
	{
	bildirim('e', 'Not read Personnel');
	}
	else{
		var param = {
			id: $("#hidPersonalID").val(),
			departmentId: $("#idContDepart").val(),          
		    jobId: $("#idContJobDesc").val(),          
		    designationId: $("#idContDesig").val(),   
		    //disciplineId: $("#idContDiscip").val(),           
		    contractDate: setDateFormat($("#idContDate").val()),          
		    contractDuration: $("#idContDura").val(),          
		    contractDurationDesc: $("#idContDura2").val(),          
		    vocationDays: $("#idContAnVaDa").val(),          
		    vocationDaysDesc: $("#idContAnVaDa2").val(),          
		    vocationPeriod: $("#idContAnVaPer").val(),          
		    vocationPeriodDesc: $("#idContAnVaPer2").val(),          
		    basicSalary: $("#idBasicSalary").val(),          
		    basicSalaryDesc: $("#idMoney1").val(),          
		    homeAllowance: $("#idHomeAllow").val(),          
		    homeAllowanceDesc: $("#idMoney2").val(),          
		    transAllowance: $("#idTransAllow").val(),          
		    transAllowanceDesc: $("#idMoney3").val(),          
		    foodAllowance: $("#idFoodAllow").val(),          
		    foodAllowanceDesc: $("#idMoney4").val(),          
		    //otherAllowanceText: $("#idOAllowText").val(),          
		    //otherAllowance: $("#idOAllowMoney").val(),          
		    //otherAllowanceDesc: $("#idMoney5").val(),
		    allowance:$("#idAllowanceforFile").val(),
		    allowanceDesc:$("#slcAllowanceDesc").val()
			
	
		}

		var ser_data = JSON.stringify(param);

		$.ajax({
			type : "POST",
			contentType : 'application/json; charset=UTF-8',
			url : 'addPersonel',
			data : ser_data,
			success : function(data) {
				$("#hidPersonalID").val(data);
				bildirim('s', 'Created Succes');
				$("#btn1add").html('Update');
				$("button[id='btn1clear']").attr("disabled", true);
			},
			error : function(data) {
				bildirim('e', 'Your transaction has failed');
			}

		});
	}
}
function addEducation() 
{

	if($("#hidPersonalID").val()=="")
	{
	bildirim('e', 'Not read Personnel');
	}
	else{
		var param = {
			id: $("#hidPersonalID").val(),
			graduation: $("#idGraduation").val(),       
		    degree: $("#idEduDegree").val(),       
		    nameOfSchool: $("#idEduSchool").val(),       
		    schoolCountry: $("#idEduCountry").val(),       
		    //yearOfGraduation: $("#idYearofGrad").val(),  
		    dateOfGrad:setDateFormat($("#idDateofGrad").val()),
		    graduationScore: $("#idGScore1").val()+'/'+$("#idGScore2").val()
		}

		var ser_data = JSON.stringify(param);

		$.ajax({
			type : "POST",
			contentType : 'application/json; charset=UTF-8',
			url : 'addPersonel',
			data : ser_data,
			success : function(data) {
				$("#hidPersonalID").val(data);
				bildirim('s', 'Created Succes');
				$("#btn1add").html('Update');
				$("button[id='btn1clear']").attr("disabled", true);
			},
			error : function(data) {
				bildirim('e', 'Your transaction has failed');
			}

		});
	}
}	
function addLanguageSkills() 
{

	if($("#hidPersonalID").val()=="")
	{
	bildirim('e', 'Not read Personnel');
	}
	else{
		var param = {
			id: $("#hidPersonalID").val(),
			language:$("#slcLanguage").val(),
			understanding:$("#understanding").val(),
			reading:$("#reading").val(),
			writing:$("#writing").val(),
			internationallangtest:$("#internationallangtest").val(),
			score:$("#scoreoftest").val()
	
		}

		var ser_data = JSON.stringify(param);

		$.ajax({
			type : "POST",
			contentType : 'application/json; charset=UTF-8',
			url : 'addPersonel',
			data : ser_data,
			success : function(data) {
				$("#hidPersonalID").val(data);
				bildirim('s', 'Created Succes');
				$("#btn1add").html('Update');
				$("button[id='btn1clear']").attr("disabled", true);
			},
			error : function(data) {
				bildirim('e', 'Your transaction has failed');
			}

		});
	}
}
function addBankAccounts() 
{

		if($("#hidPersonalID").val()=="")
		{
		bildirim('e', 'Not read Personnel');
		}
		else{
			var param = {
				id: $("#hidPersonalID").val(),
				nameOfBank:$("#nameofBank").val(),
				branch:$("#branch").val(),
				ibanNo:$("#ibanNo").val(),
				nameOfBankcredit:$("#nameofBankforCredit").val(),
				creditCardNo:$("#creditCardNo").val(),
				cutOffDate:setDateFormat($("#cutoffDate").val()),
				paymentDate:setDateFormat($("#paymentDate").val())
			}

			var ser_data = JSON.stringify(param);

			$.ajax({
				type : "POST",
				contentType : 'application/json; charset=UTF-8',
				url : 'addPersonel',
				data : ser_data,
				success : function(data) {
					$("#hidPersonalID").val(data);
					bildirim('s', 'Created Succes');
					$("#btn1add").html('Update');
					$("button[id='btn1clear']").attr("disabled", true);
				},
				error : function(data) {
					bildirim('e', 'Your transaction has failed');
				}

			});
		}
		}
function addSocialAndHobbies() {

			if($("#hidPersonalID").val()=="")
			{
			bildirim('e', 'Not read Personnel');
			}
			else{
				var param = {
					id: $("#hidPersonalID").val(),
					social:$("#social").val(),
					hobbies:$("#hobbies").val()
			
				}

				var ser_data = JSON.stringify(param);

				$.ajax({
					type : "POST",
					contentType : 'application/json; charset=UTF-8',
					url : 'addPersonel',
					data : ser_data,
					success : function(data) {
						$("#hidPersonalID").val(data);
						bildirim('s', 'Created Succes');
						$("#btn1add").html('Update');
						$("button[id='btn1clear']").attr("disabled", true);
					},
					error : function(data) {
						bildirim('e', 'Your transaction has failed');
					}

				});
}}
 
function addReferences() {

	if($("#hidPersonalID").val()=="")
	{
	bildirim('e', 'Not read Personnel');
	}
	else{
		var param = {
			id: $("#hidPersonalID").val(),
			nameReference:$("#nameofReference").val(),
			jobDescReference:$("#jobDescofReference").val(),
			companyReference:$("#companyofReference").val(),
			countryReference:$("#countryofReference").val(),
			emailReference:$("#emailofReference").val(),
			relation:$("#relationwithReference").val(),
			remarks:$("#remarkofreference").val()
		}

		var ser_data = JSON.stringify(param);

		$.ajax({
			type : "POST",
			contentType : 'application/json; charset=UTF-8',
			url : 'addPersonel',
			data : ser_data,
			success : function(data) {
				$("#hidPersonalID").val(data);
				bildirim('s', 'Created Succes');
				$("#btn1add").html('Update');
				$("button[id='btn1clear']").attr("disabled", true);
			},
			error : function(data) {
				bildirim('e', 'Your transaction has failed');
			}

		});
	}
	}
function addComments() 
{

		if($("#hidPersonalID").val()=="")
		{
		bildirim('e', 'Not read Personnel');
		}
		else{
			var param = {
				id: $("#hidPersonalID").val(),
				comments:$("#comments").val()
		
			}

			var ser_data = JSON.stringify(param);

			$.ajax({
				type : "POST",
				contentType : 'application/json; charset=UTF-8',
				url : 'addPersonel',
				data : ser_data,
				success : function(data) {
					$("#hidPersonalID").val(data);
					bildirim('s', 'Created Succes');
					$("#btn1add").html('Update');
					$("button[id='btn1clear']").attr("disabled", true);
				},
				error : function(data) {
					bildirim('e', 'Your transaction has failed');
				}

			});
		}
		}
function getFile() {

			input = document.getElementById('profilepic');  
			var data = new FormData();
			var fileNames = [];
			var files = [];
			if (!input) {
				return null;
			} else if (!input.files) {
				return null;
			} else if (!input.files[0]) {
				return null;
			} else {

			 fileNames[0] = input.files[0].name;
			 data.append('file', input.files[0]);
			 data.append('name', fileNames);

			}

			return data;
		}
function savePeriod() 

		{
			
			var valid=true;
			var errorMessage='';

			var formData=getFile();	
			
			param = {
					type : $("#type").val(),
					sequence : $("#sequence").val(),  
					frequency :  $("#period").val(), 
						};	
			
			var ser_data = JSON.stringify(param);	

			
			if (formData == null){
				valid = false ;
				errorMessage = errorMessage +" There is no excel file !";  
			}

				if (valid)
				{  
					 formData.append("serData", ser_data + "");	  
					 
					// app.loading('show',{value: [0,100],speed: 100,state: 'success'});
					 console.log(formData);
					
					$.ajax({
						type : "POST",
						contentType : false,
						processData : false,
						url : 'exportInspectionLogExcel',  
						data : formData,  
						success : function(data) {
							
							 bildirim('success', data); 
							  
							
							
						},
						error : function(data) {
										
						
						}

					});
				}
				else {
					
					bildirim('warning',errorMessage);   
				}

				 //window.location.href = 'exportInspectionLogExcel';   
				
		}