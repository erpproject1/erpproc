$(document).ready(function() {

	getDepartments();
	getJobs(); 
	
});

function getDepartments() {
	app.loading('show',{value: [0,100],speed: 10,state: 'success'});
	$.ajax({
		type : "GET",
		url : 'getDepartments',
		success : function(data) {

			var list = '<option value="' + 0 + '">Select Department</option> ';
			var listBody = "";
			$(data).each(
					function(i, val) {

						list = list + '<option value="' + val.id + '">'
								+ val.department + '</option> ';
						
					
					});
			$("#department").html(list);
		
		},
		error : function(data) {
			alert("Error!");
		}

	});

}

function getJobs() {

	$.ajax({
		type : "GET",
		url : 'getJobs',
		success : function(data) {

			
			var listBody = "";
			$(data).each(
					function(i, val) {
				
						var j = i+1; 
						listBody = listBody + '<tr><td>' + j + '</td><td>'
						+ val.code + '</td><td>'
						+ val.jobDescription+ '</td><td>' 
						+val.department.department+'</td><td>' 
						+val.remarks+'</td><td>' 
                        +'<button type="button"  onclick="update(this,'+val.id+','+val.departmentId+')" class="btn btn-default btn-icon"><span class="fa fa-pencil"></span></button>'
                        +'<button  type="button" onclick="deleteJob(this,'+val.id+')" class="btn btn-default btn-icon"><span class="fa fa-times"></span></button> </td></tr>';

					});
			
			$("#listBody").html(listBody);
			 app.loading('destroy'); 
		},
		error : function(data) {
			alert("Error!");
		}

	});

}

function JobAction() { 
	  if ($("#jobBtn").text().indexOf("Update")>0) {
	    updateJob();
	  }
	  else { 
		  addJob();
	  }
	 
}

function addJob() {
	

		var param = {
			jobDescription :  $("#job").val() ,
			code : $("#code").val(),
			departmentId : $("#department").val(),
			remarks :$("#remarks").val() 
		}
		var ser_data = JSON.stringify(param);
		alert(ser_data)
		$.ajax({
			type : "POST",
			contentType : 'application/json; charset=UTF-8',
			url : 'addJob',
			data : ser_data,
			success : function(data) {
				bildirim('e',data); 
				getJobs(); 
			},
			error : function(data) {
				if(data.status=='401') bildirim('warning',"You are not authorized");    
				  else bildirim('error',data);
			}

		});
	
}

function update(ctl,pId,pDepId){
	 
	_row = $(ctl).parents("tr");
	var cols = _row.children("td"); 
		  $("#id").val(pId); 
		  $("#code").val($(cols[1]).text()); 
		  $("#job").val($(cols[2]).text()); 
		  $("#department").val(pDepId).change(); 	  
		  $("#remarks").val($(cols[4]).text());    
		  				
		 $("#jobBtn").html("<span class=icon-arrow-up></span> Update"); 
		 document.getElementById("department").focus(); 

		
}

function updateJob(){

		var param = {
			id :  $("#id").val(),
			jobDescription :  $("#job").val() ,
			code : $("#code").val(),
			departmentId : $("#department").val(),
			remarks :$("#remarks").val() 
		}
		var ser_data = JSON.stringify(param);
		$.ajax({
			type : "POST",
			contentType : 'application/json; charset=UTF-8',
			url : 'updateJob',
			data : ser_data,
			success : function(data) {
				bildirim('s',data);
				clearInputs();
				getJobs(); 
			},
			error : function(data) {
				if(data.status=='401') bildirim('warning',"You are not authorized");    
				  else bildirim('error',data);
			}

		});
	
		
}
function clearInputs(){
	
	 $("#id").val(""); 
	 $("#code").val(""); 
	  $("#job").val(""); 
	  $("#department").val(0).change(); 	  
	  $("#remarks").val("");
	 $("#jobBtn").html("<span class=icon-arrow-up></span> Save");
	 document.getElementById("listBody").focus();  
	 
}

function deleteJob(ctl,pId){
	
	  _row = $(ctl).parents("tr");
	  var cols = _row.children("td");
	  var param = {
				id : pId
			}
	 var ser_data = JSON.stringify(param);
			$.ajax({
				type : "POST",
				contentType : 'application/json; charset=UTF-8',
				url : 'deleteJob', 
				data : ser_data,
				success : function(data) {
					bildirim('s',data);
					$(ctl).parents("tr").remove();
				},
				error : function(data) {
					if(data.status=='401') bildirim('warning',"You are not authorized");    
					  else bildirim('error',data);
				}

	});
	
}
