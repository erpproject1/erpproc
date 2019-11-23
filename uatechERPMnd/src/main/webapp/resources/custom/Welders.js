$(document).ready(function() {
	
	
});


function addWelder() {

		var param = {
			name : $("#txtName").val(),
			activities:$("txtActivities").val(),
			badgeNo:$("#txtBageNo").val(),
			designation:$("#txtDesignation").val(),
			discipline:$("#txtDiscipline").val(),
			jobDescription:$("#txtJobDescription").val(),
			location:$("#txtLocation").val(),
			mobileNumber:$("#txtMobileNumber").val(),
			remarks:$("#txtRemarks").val()
		}
		var ser_data = JSON.stringify(param);
		$.ajax({
			type : "POST",
			contentType : 'application/json; charset=UTF-8',
			url : 'addWelders',
			data : ser_data,
			success : function(data) {
				bildirim('s',data);
				//getUpperWelders();
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
		  $("#Welders").val($(cols[1]).text());		 		 
		 $("#upperWelders").val(pUpperId).change(); 		
		 $("#dptBtn").html("<span class=icon-arrow-up></span> Update"); 
		 document.getElementById("Welders").focus(); 

		
}
function deleteWelders(ctl,pId){
	
	  _row = $(ctl).parents("tr");
	  var cols = _row.children("td");
	  var param = {
				id : pId
			}
	 var ser_data = JSON.stringify(param);
			$.ajax({
				type : "POST",
				contentType : 'application/json; charset=UTF-8',
				url : 'deleteWelders',
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
