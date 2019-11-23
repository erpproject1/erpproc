$(document).ready(function() {
	getWelders();
	
});



function getWelders()
{
	$.ajax({
		type : "GET",
		url : 'getWelders', 
		success : function(data) { 			 
			//GETTABLE
		     	$('#actTable').DataTable( {		     		 
					"bDestroy": true,
					"aaData": data,
					"columns" : [
						{ "data" : 'id','title':'#' }, 
						{ "data" : 'badgeNo','title':'Badge No' }, 
						{ "data" : 'name','title':'Name' },
						{ "data" : 'jobDescription','title':'Job Description' },
						{ "data" : 'designation','title':'Designation' },
			            { "data" : 'discipline','title':'Discipline'},
			            { "data" : 'location','title':'Location'}, 
			            { "data" : 'activities','title':'Activities'},
			            { "data" : 'mobileNumber','title':'Mobile Number'},
			            { "data" : 'remarks','title':'Remarks'},
			            { "data" : null,"render":function (data) {
		                   	 return '<button  type="button" onclick="deleteWelders(this,'+data.id+') "  class="btn btn-default btn-icon"><span class="fa fa-times"></span></button> ';
		                 } } 
			            ]
			        
				} );
			 
			
		},
		error : function(data) {
			alert("Error!");
		},
       

	});
}



function addWelder() {

		var param = {
			name : $("#txtName").val(),
			activities:$("#txtActivities").val(),
			badgeNo:$("#txtBageNo").val(),
			designation:$("#txtDesignation").val(),
			discipline:$("#txtDiscipline").val(),
			jobDescription:$("#txtJobDescription").val(),
			location:$("#txtLocation").val(),
			mobileNumber:$("#txtMobileNumber").val(),
			remarks:$("#txtRemarks").val()
		}
		console.log(param);
		var ser_data = JSON.stringify(param);
		$.ajax({
			type : "POST",
			contentType : 'application/json; charset=UTF-8',
			url : 'addWelders',
			data : ser_data,
			success : function(data) {
				bildirim('s',data);
				getWelders();
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
