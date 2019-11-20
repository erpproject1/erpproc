$(document).ready(function() {
 
	 
});

$("#idApprovalofClient").on('change', function() {
	  if ($(this).is(':checked')) {
	    $(this).attr('value', 'true');
	  } else {
	    $(this).attr('value', 'false');
	  }
	  
});

function getExperience(hiddenval) {  

	var param = {
			 personalId : hiddenval
			}
	 var ser_data = JSON.stringify(param);
			$.ajax({
				type : "POST",
				contentType : 'application/json; charset=UTF-8',
				url : 'getExperience', 
				data : ser_data,
				success : function(data) {
 
			var listBody = "";
			$(data).each(
					function(i, val) {				
						
						var download = ' <a href="getPersonalFile/'+val.id+'"><button type="button"  class="btn btn-default btn-icon"><span class="fa fa-cloud-download"></span></button></a>';	
						var dow = '<button class="btn btn-default" onclick="createExpFileTable('+ val.id +')" data-toggle="modal" data-target="#modal-clean"><span class="fa fa-neuter"></span></button>';
							
						if (val.approvalDocURL == null || (val.approvalDocURL!=null && val.approvalDocURL.trim()=="")) { 
							download='';  
						}
						
						
						var j = i+1; 
						listBody = listBody + '<tr><td>' + j + '</td><td>'
						+ val.company + '</td><td>'
						+ val.position + '</td><td>'
						+ val.fStartDate+' - '+ val.fFinishDate+ '</td><td>' 
						+ getCount(val.country) +'</td><td>' 
						+ getCity(val.city) +'</td><td>' 
						+val.project+'</td><td>' 
						+val.client+'</td><td>' 
						+dow+'</td><td>' 
                        +'<button type="button"  onclick="updateExperienceInputs(this,'+val.id+','+val.approvalOfClient+','+val.city+','+val.country+')" class="btn btn-default btn-icon"><span class="fa fa-pencil"></span></button>'
                        +'<button  type="button" onclick="deleteExperience(this,'+val.id+')" class="btn btn-default btn-icon"><span class="fa fa-times"></span></button> </td></tr>';
						+ val.briefDescOfWorkDone + '</td><td>'
					});
			
			$("#listExperiences").html(listBody); 
		},
		error : function(data) {
			bildirim('e','get Experiences Error ');
		}

	});

}

function getExperiences() {  

	$.ajax({
		type : "GET",
		url : 'getExperiences',
		success : function(data) {

			
			var listBody = "";
			$(data).each(
					function(i, val) {				
						
						var download = ' <a href="getPersonalFile/'+val.id+'"><button type="button"  class="btn btn-default btn-icon"><span class="fa fa-cloud-download"></span></button></a>';	
						var dow = '<button class="btn btn-default" onclick="createExpFileTable('+ val.id +')" data-toggle="modal" data-target="#modal-clean"><span class="fa fa-neuter"></span></button>';
							
						if (val.approvalDocURL == null || (val.approvalDocURL!=null && val.approvalDocURL.trim()=="")) { 
							download='';  
						}
						
						
						var j = i+1; 
						listBody = listBody + '<tr><td>' + j + '</td><td>'
						+ val.company + '</td><td>'
						+ val.position + '</td><td>'
						+ val.fStartDate+' - '+ val.fFinishDate+ '</td><td>' 
						+val.country+'</td><td>' 
						+val.city+'</td><td>' 
						+val.project+'</td><td>' 
						+val.client+'</td><td>' 
						+dow+'</td><td>' 
                        +'<button type="button"  onclick="updateExperienceInputs(this,'+val.id+','+val.approvalOfClient+','+val.city+','+val.country+')" class="btn btn-default btn-icon"><span class="fa fa-pencil"></span></button>'
                        +'<button  type="button" onclick="deleteExperience(this,'+val.id+')" class="btn btn-default btn-icon"><span class="fa fa-times"></span></button> </td></tr>';

					});
			
			$("#listExperiences").html(listBody); 
		},
		error : function(data) {
			bildirim('e','get Experiences Error ');
		}

	});

}

function createExpFileTable(pId) {
	
	var hiddenval=$("#hidPersonalID").val(); 
	var param = {
			parityId : pId,
			parityType:'experience',
			personalId:hiddenval
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
						+'<button  type="button" onclick="deleteExperienceFile(this,'+val.id+')" class="btn btn-default btn-icon"><span class="fa fa-times"></span></button> </td></tr>';
					});
			
			$("#trainingFileTable").html(listBody); 
		},
		error : function(data) {
			if(data.status=='401') bildirim('warning',"You are not authorized");    
			  else bildirim('error','Error');
			 
		}

	});


	
}
 
function peAction2() { 
	  if ($("#btn5add").text().indexOf("Update")>0) {
	    updateExperience();
	  }
	  else { 
		  addExperience2();
	  }
	 
}

function addExperience() { 
	
	var hiddenval=$("#hidPersonalID").val();
	
	var parts =$("#workPeriod").val().split('-');	
	var s= new Date(parts[0]);
	var f= new Date(parts[1]);
	var userTimezoneOffset = s.getTimezoneOffset() * 60000;
	var start=new Date(s.getTime() - userTimezoneOffset);
	var finish=new Date(f.getTime() - userTimezoneOffset);
	var param = {
			company :  $("#company").val(),	  		
			startDate : start,
			finishDate: finish,
			position :  $("#position").val() ,
			country :  $("#idDesgCountry").val() ,
			city :  $("#idDesgCity").val() , 
			project :  $("#project").val() , 
			client :  $("#client").val() , 
			approvalOfClient: $("#idApprovalofClient").val(),
			approvalDocURL: $("#idExpPath").val(),
			personalId:hiddenval
			
		}
		var ser_data = JSON.stringify(param);
		
		$.ajax({
			type : "POST",
			contentType : 'application/json; charset=UTF-8',
			url : 'addExperience',
			data : ser_data,
			success : function(data) {
				bildirim('success','Created Succes');
				 $("#idExpPath").val(""); 
				 getExperience(hiddenval);  
				
			},
			error : function(data) {
				if(data.status=='401') bildirim('warning',"You are not authorized");    
				  else bildirim('error','Error');
				 
			}

		});
	
}

function addExperience2() { 
	
	var hiddenval=$("#hidPersonalID").val();
	if(hiddenval.length>0)
	{	
	var formData = getExperiencesFiles();
	if (formData == null)
		addExperience(); 
	else {
	 
	var parts =$("#workPeriod").val().split('-');	
	var s= new Date(parts[0]);
	var f= new Date(parts[1]);
	var userTimezoneOffset = s.getTimezoneOffset() * 60000;
	var start=new Date(s.getTime() - userTimezoneOffset);
	var finish=new Date(f.getTime() - userTimezoneOffset);
	var param = {
			company :  $("#company").val(),	  		
			startDate : start,
			finishDate: finish,
			position :  $("#position").val() ,
			country :  $("#idDesgCountry").val() , 
			city :  $("#idDesgCity").val() , 
			project :  $("#project").val() , 
			client :  $("#client").val() , 
			approvalOfClient: $("#idApprovalofClient").val(),
			approvalDocURL: $("#idExpPath").val(),
			personalId:hiddenval }
	
		var ser_data = JSON.stringify(param);
		formData.append("jsonObjectData", ser_data + "");	
		
		app.loading('show',{value: [0,100],speed: 10,state: 'success'});
		
		$.ajax({
			type : "POST",
			contentType : false,
			processData : false,
			url : 'addExperienceAndFiles',
			data : formData, 
			success : function(data) {
				bildirim('success','Created Succes');
				 $("#idExpPath").val(""); 
				 getExperience(hiddenval);  
				 app.loading('destroy'); 
				
			},
			error : function(data) {
				if(data.status=='401') bildirim('warning',"You are not authorized");    
				  else bildirim('error',' Error');
			}

		});
	 }
	}else {bildirim('e','Please, before add Personal');}
	
	
}

function updateExperienceInputs(ctl,pId,pAofClient,pCity,pCountry){
	 
	_row = $(ctl).parents("tr");
	var cols = _row.children("td");  
		  $("#idpe").val(pId); 
		  $("#company").val($(cols[1]).text()); 
		  $("#position").val($(cols[2]).text()); 
//		  var col3 = $(cols[3]).text().split("/"); 
//		  var strDate = col3[0].replace(/-/g,"/")+" - "+col3[1].replace(/-/g,"/");
		  $("#workPeriod").val($(cols[3]).text());  
		  $("#idDesgCountry").val(pCountry).change();   
		  $("#idDesgCity").val(pCity).change(); 	  
		  $("#project").val($(cols[6]).text());  
		  $("#client").val($(cols[7]).text());  
		  $("#idApprovalofClient").val(pAofClient); 
		 $("#btn5add").html("<span class=icon-arrow-up></span> Update"); 
		 document.getElementById("company").focus();  

		
}
 
function updateExperience(){
	
	    var hiddenval=$("#hidPersonalID").val();
		var parts =$("#workPeriod").val().split('-');		
		var s= new Date(parts[0]);
		var f= new Date(parts[1]);
		var userTimezoneOffset = s.getTimezoneOffset() * 60000;
		var start=new Date(s.getTime() - userTimezoneOffset);
		var finish=new Date(f.getTime() - userTimezoneOffset);
		var param = {
				id: $("#idpe").val(),
				company :  $("#company").val(),	  		
				startDate : start,
				finishDate: finish,
				position :  $("#position").val() ,
				country :  $("#idDesgCountry").val() , 
				city :  $("#idDesgCity").val() , 
				project :  $("#project").val() , 
				client :  $("#client").val(),
				approvalOfClient: $("#idApprovalofClient").val(),
				approvalDocURL: $("#idExpPath").val(),
				personalId:hiddenval
		}
		var ser_data = JSON.stringify(param);
		$.ajax({
			type : "POST",
			contentType : 'application/json; charset=UTF-8',
			url : 'updateExperience',
			data : ser_data,
			success : function(data) {
				 
				clearInputs();
				getExperience(hiddenval);
				bildirim('success','Update Succes ');
			},
			error : function(data) {	
				if(data.status=='401') bildirim('warning',"You are not authorized");    
			  else bildirim('error','Error');
				
			}
			
		});
	
		
}

function clearInputs(){
	
	  $("#idpe").val(""); 
	  $("#company").val(""); 
	  $("#position").val(""); 
	  $("#workPeriod").val("");  
	  $("#idDesgCountry").val("").change();   
	  $("#idDesgCity").val("").change();   
	  $("#project").val("");  
	  $("#client").val(""); 
	  $("#idApprovalofClient").val(""); 
	  $("#idExpPath").val(""); 
	 $("#btn5add").html("<span class=icon-arrow-up></span> Add"); 
	 document.getElementById("listExperiences").focus();   
	 
}

function deleteExperience(ctl,pId){
		
	  _row = $(ctl).parents("tr");
	  var cols = _row.children("td");
	  var param = {
				id : pId
			}
	 var ser_data = JSON.stringify(param);
			$.ajax({
				type : "POST",
				contentType : 'application/json; charset=UTF-8',
				url : 'deleteExperience',
				data : ser_data,
				success : function(data) {
					bildirim('success','Delete Succes ');
					$(ctl).parents("tr").remove();
				},
				error : function(data) {
					if(data.status=='401') bildirim('warning',"You are not authorized");    
					  else bildirim('error','Delete Error');
				}

	});
	
}

function deleteExperienceFile(ctl,pId){
	
	  _row = $(ctl).parents("tr");
	  var cols = _row.children("td");
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
					bildirim('success','Delete file Succes ');
					$(ctl).parents("tr").remove();
				},
				error : function(data) {
					if(data.status=='401') bildirim('warning',"You are not authorized");    
					  else bildirim('error','Delete Error');
				}

	});
	
}
  
function getExperiencesFiles() {

	input = document.getElementById('expFile');
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
