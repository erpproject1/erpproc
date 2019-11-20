$(document).ready(function() {
	
	getUpperDepartments();
	
	
});

function getUpperDepartments() {

	app.loading('show',{value: [0,100],speed: 10,state: 'success'});
	$.ajax({
		type : "GET",
		url : 'getUpperDepartments',
		success : function(data) {

			var list = '<option value="' + 0 + '">Select Department</option> ';
			var listBody = "";
			$(data).each(
					function(i, val) {

						list = list + '<option value="' + val.id + '">'
								+ val.department + '</option> ';
						var j = i+1; 
						listBody = listBody + '<tr><td>' + j + '</td><td>'
						+ val.department + '</td><td>'
						+ val.upperDepartment+ '</td>' 
                        +'<td><button type="button"  onclick="update(this,'+val.id+','+val.upperDepartmentId+')" class="btn btn-default btn-icon"><span class="fa fa-pencil"></span></button>'
                        +'<button  type="button" onclick="deleteDepartment(this,'+val.id+')" class="btn btn-default btn-icon"><span class="fa fa-times"></span></button> </td></tr>';

					});
			$("#upperDepartment").html(list);
			$("#listBody").html(listBody);
			$("#idContDepart").html(list);
			 app.loading('destroy'); 
		},
		error : function(data) {
			alert("Error!");
		}

	});

}

function departmentAction() {
	  if ($("#dptBtn").text().indexOf("Update")>0) {
	    updateDepartment();
	  }
	  else {
		  addDepartment();
	  }
	 
}

function addDepartment() {

		var param = {
			department : $("#department").val(),
			upperDepartmentId : $("#upperDepartment").val()
		}
		var ser_data = JSON.stringify(param);
		$.ajax({
			type : "POST",
			contentType : 'application/json; charset=UTF-8',
			url : 'addDepartment',
			data : ser_data,
			success : function(data) {
				bildirim('s',data);
				getUpperDepartments();
			},
			error : function(data) {
				if(data.status=='401') bildirim('warning',"You are not authorized");    
				  else bildirim('error',data);
			}

		});
	
}

function update(ctl,pId,pUpperId){
	 
	_row = $(ctl).parents("tr");
	var cols = _row.children("td"); 
		  $("#id").val(pId); 
		  $("#department").val($(cols[1]).text());		 		 
		 $("#upperDepartment").val(pUpperId).change(); 		
		 $("#dptBtn").html("<span class=icon-arrow-up></span> Update"); 
		 document.getElementById("department").focus(); 

		
}

function updateDepartment(){

		var param = {
			id :  $("#id").val(),
			department : $("#department").val(),
			upperDepartmentId : $("#upperDepartment").val()
		}
		var ser_data = JSON.stringify(param);
		$.ajax({
			type : "POST",
			contentType : 'application/json; charset=UTF-8',
			url : 'updateDepartment',
			data : ser_data,
			success : function(data) {
				bildirim('s',data);
				clearInputs();
				getUpperDepartments();
			},
			error : function(data) {
				if(data.status=='401') bildirim('warning',"You are not authorized");    
				  else bildirim('error',data);
			}

		});
	
		
}
function clearInputs(){
	
	 $("#id").val(""); 
	  $("#department").val("");
	  document.getElementById("upperDepartment").selectedIndex=0;	 		 
	 $("#upperDepartment").val(0).change(); 	 		
	 $("#dptBtn").html("<span class=icon-arrow-up></span> Save");
	 document.getElementById("listBody").focus();  
	
}
function deleteDepartment(ctl,pId){
	
	  _row = $(ctl).parents("tr");
	  var cols = _row.children("td");
	  var param = {
				id : pId
			}
	 var ser_data = JSON.stringify(param);
			$.ajax({
				type : "POST",
				contentType : 'application/json; charset=UTF-8',
				url : 'deleteDepartment',
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
