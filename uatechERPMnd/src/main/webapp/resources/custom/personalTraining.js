$(document).ready(function() {
 
});

function getTraining(hiddenval) { 
 
	 var param = {
			 personalId : hiddenval
			}
	 var ser_data = JSON.stringify(param);
			$.ajax({
				type : "POST",
				contentType : 'application/json; charset=UTF-8',
				url : 'getTraining', 
				data : ser_data,
				success : function(data) {

			var listBody = "";
			$(data).each(
					function(i, val) {
						var download = ' <a href="getPersonalFile/'
								+ val.id
								+ '"><button type="button"  class="btn btn-default btn-icon"><span class="fa fa-cloud-download"></span></button></a>';
						 
						  var dow = '<button class="btn btn-default" onclick="createFileTable('+ val.id +')" data-toggle="modal" data-target="#modal-clean"><span class="fa fa-neuter"></span></button>';
						var j = i + 1;
						if (val.filePath == null
								|| (val.filePath != null && val.filePath
										.trim() == "")) {
							download = '';
						}
						listBody = listBody
								+ '<tr><td>'
								+ j
								+ '</td><td>'
								+ val.nameOfTraining
								+ '</td><td>'
								+ val.fStartDate
								+ ' - '
								+ val.fFinishDate
								+ '</td><td>'
								+ val.organizer
								+ '</td><td>'
								+ val.certificateValidity
								+ '</td><td>'
								+ dow
								+ '</td><td>'
								+ '<button type="button"  onclick="updateTrainingInputs(this,'
								+ val.id
								+ ','
								+ val.validityType
								+ ')" class="btn btn-default btn-icon"><span class="fa fa-pencil"></span></button>'
								+ '<button  type="button" onclick="deleteTraining(this,'
								+ val.id
								+ ')" class="btn btn-default btn-icon"><span class="fa fa-times"></span></button> </td></tr>';

					});
 
			$("#listTrainings").html(listBody);
		},
		error : function(data) {

			bildirim('error','get Training Error ');
		}

	});

}


function getTrainings() {

	$.ajax({ type : "GET",
				url : 'getTrainings',
				success : function(data) {

					var listBody = "";
					$(data) 
							.each(
									function(i, val) {
										var download = ' <a href="getPersonalFile/'
												+ val.id
												+ '"><button type="button"  class="btn btn-default btn-icon"><span class="fa fa-cloud-download"></span></button></a>';
										 
										  var dow = '<button class="btn btn-default" onclick="createFileTable('+ val.id +')" data-toggle="modal" data-target="#modal-clean"><span class="fa fa-neuter"></span></button>';
										var j = i + 1;
										if (val.filePath == null
												|| (val.filePath != null && val.filePath
														.trim() == "")) {
											download = '';
										}
										listBody = listBody
												+ '<tr><td>'
												+ j
												+ '</td><td>'
												+ val.nameOfTraining
												+ '</td><td>'
												+ val.fStartDate
												+ ' - '
												+ val.fFinishDate
												+ '</td><td>'
												+ val.duration
												+ '</td><td>'
												+ val.organizer
												+ '</td><td>'
												+ val.certificateValidity
												+ '</td><td>'
												+ dow
												+ '</td><td>'
												+ '<button type="button"  onclick="updateTrainingInputs(this,'
												+ val.id
												+ ','
												+ val.validityType
												+ ')" class="btn btn-default btn-icon"><span class="fa fa-pencil"></span></button>'
												+ '<button  type="button" onclick="deleteTraining(this,'
												+ val.id
												+ ')" class="btn btn-default btn-icon"><span class="fa fa-times"></span></button> </td></tr>';

									});

					$("#listTrainings").html(listBody);
				},
				error : function(data) {
					bildirim('error','get Training Error ');
				}

			});

}

function ptAction() { 
	  if ($("#btn3add").text().indexOf("Update")>0) {
	    updateTraining();
	  }
	  else { 
		  addTraining2();
	  }
	 
}

function createFileTable(pId) {
	
	var hiddenval=$("#hidPersonalID").val();  
	var param = {
			parityId : pId,
			parityType:'training',
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
						+'<button  type="button" onclick="deleteTrainingFile(this,'+val.id+')" class="btn btn-default btn-icon"><span class="fa fa-times"></span></button> </td></tr>';
					});
			
			$("#trainingFileTable").html(listBody); 
		},
		error : function(data) {
			if(data.status=='401') bildirim('warning',"You are not authorized");    
			  else bildirim('error' ,'Open file list  Error ');
		}

	});


	
}

function addTraining() { 
	var parts =$("#date").val().split('-');	
	var s= new Date(parts[0]);
	var f= new Date(parts[1]);
	var userTimezoneOffset = s.getTimezoneOffset() * 60000;
	var start=new Date(s.getTime() - userTimezoneOffset);
	var finish=new Date(f.getTime() - userTimezoneOffset);
	
	var hiddenval=$("#hidPersonalID").val();
	
	var param = {
			nameOfTraining :  $("#nameOfTraining").val() ,			
			startDate : start,
			finishDate: finish,
			organizer :  $("#organizer").val() ,
			certificateValidity :  $("#certificateValidity").val() ,
			validityType :  $("#validityType").val(),
			personalId:hiddenval,
			filePath: $("#idPath").val()
		}
		var ser_data = JSON.stringify(param);
 
		$.ajax({
			type : "POST",
			contentType : 'application/json; charset=UTF-8',
			url : 'addTraining',
			data : ser_data,
			success : function(data) { 
				$("#idPath").val("");
				getTraining(hiddenval);  
				bildirim('success','Created Succes');
			},
			error : function(data) { 
				if(data.status=='401') bildirim('warning',"You are not authorized");    
				  else bildirim('error', 'error AddTraining');
			}

		});
	
}

function addTraining2() {
	var hiddenval=$("#hidPersonalID").val();
	if(hiddenval.length>0)
	{	
	 
	var formData = getTrainingFiles();
	
	if (formData == null)
		addTraining();
	else {
	
		
		var parts = $("#date").val().split('-');
		var s = new Date(parts[0]);
		var f = new Date(parts[1]);
		var userTimezoneOffset = s.getTimezoneOffset() * 60000;
		var start = new Date(s.getTime() - userTimezoneOffset);
		var finish = new Date(f.getTime() - userTimezoneOffset);
		var param = {
			nameOfTraining : $("#nameOfTraining").val(),
			startDate : start,
			finishDate : finish,
			organizer : $("#organizer").val(),
			certificateValidity : $("#certificateValidity").val(),
			validityType : $("#validityType").val(),
			filePath : $("#idPath").val(),
			personalId:hiddenval
		}
		var ser_data = JSON.stringify(param);
		
		app.loading('show',{value: [0,100],speed: 10,state: 'success'});
		 
		formData.append("jsonObjectData", ser_data + "");	
		$.ajax({
			type : "POST",
			contentType : false,
			processData : false,
			url : 'addTrainingAndFiles',
			data : formData,
			success : function(data) { 
			   	bildirim('success','Success');
				 getTraining(hiddenval);  
				 app.loading('destroy'); 
			},
			error : function(data) {
				
				if(data.status=='401') bildirim('warning',"You are not authorized");    
				  else bildirim('error',data);
			}

		});
	}
	}else {bildirim('error','Please, before add Personal');}
}


function updateTrainingInputs(ctl, pId, pValType)
{

	_row = $(ctl).parents("tr");
	var cols = _row.children("td");
	$("#idpt").val(pId);
	$("#nameOfTraining").val($(cols[1]).text()); 
	$("#date").val($(cols[2]).text());
	$("#organizer").val($(cols[3]).text());
	$("#certificateValidity").val($(cols[4]).text());
	$("#validityType").val(pValType).change();
	$("#btn3add").html("<span class=icon-arrow-up></span> Update");
	document.getElementById("nameOfTraining").focus();

}

function updateTraining() {
	
	var hiddenval=$("#hidPersonalID").val();
	var parts = $("#date").val().split('-');
	var s = new Date(parts[0]);
	var f = new Date(parts[1]);
	var userTimezoneOffset = s.getTimezoneOffset() * 60000;
	var start = new Date(s.getTime() - userTimezoneOffset);
	var finish = new Date(f.getTime() - userTimezoneOffset);
	var param = {
		id : $("#idpt").val(),
		nameOfTraining : $("#nameOfTraining").val(),
		startDate : start,
		finishDate : finish,
		organizer : $("#organizer").val(),
		certificateValidity : $("#certificateValidity").val(),
		validityType : $("#validityType").val(),
		filePath : $("#idPath").val(),
		personalId:hiddenval
	}
	var ser_data = JSON.stringify(param);
	$.ajax({
		type : "POST",
		contentType : 'application/json; charset=UTF-8',
		url : 'updateTraining',
		data : ser_data,
		success : function(data) { 
			clearTrainingInputs();
			getTraining(hiddenval);
			mesajgoster('s','Update Succes');
		},
		error : function(data) {
			if(data.status=='401') bildirim('warning',"You are not authorized");    
			  else bildirim('error','Update Error');
		}

	});

}

function clearTrainingInputs() {

	$("#idpt").val("");
	$("#nameOfTraining").val("");
	$("#date").val("");
	$("#organizer").val("");
	$("#certificateValidity").val("");
	$("#validityType").val("").change();
	$("#idPath").val("");
	$("#trainingFile").val("");
	$("#btn3add").html("<span class=icon-arrow-up></span> Add");
	document.getElementById("listTrainings").focus();

}

function deleteTraining(ctl, pId) {
	_row = $(ctl).parents("tr");
	var cols = _row.children("td");
	var param = {
		id : pId
	}
	var ser_data = JSON.stringify(param);
	$.ajax({
		type : "POST",
		contentType : 'application/json; charset=UTF-8',
		url : 'deleteTraining',
		data : ser_data,
		success : function(data) {
			mesajgoster('s','Delete Succes');
			$(ctl).parents("tr").remove();
		},
		error : function(data) {
			if(data.status=='401') bildirim('warning',"You are not authorized");    
			  else bildirim('error','Delete Error');
		}

	});

}

function deleteTrainingFile(ctl,pId){
	
	
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
					mesajgoster('s','Delete File Succes');
					$(ctl).parents("tr").remove();
				},
				error : function(data) {
					if(data.status=='401') bildirim('warning',"You are not authorized");    
					  else bildirim('error','Delete File Error'); 
				}

	});
	
}

 
function getTrainingFiles() {

	input = document.getElementById('trainingFile');
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

