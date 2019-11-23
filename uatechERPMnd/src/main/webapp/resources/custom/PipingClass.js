$(document).ready(function() {
	
	
});


function addPipingClass() {

		var param = {
			
		}
		var ser_data = JSON.stringify(param);
		$.ajax({
			type : "POST",
			contentType : 'application/json; charset=UTF-8',
			url : 'addPipingClass',
			data : ser_data,
			success : function(data) {
				bildirim('s',data);
				//getUpperPipingClass();
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
		  $("#PipingClass").val($(cols[1]).text());		 		 
		 $("#upperPipingClass").val(pUpperId).change(); 		
		 $("#dptBtn").html("<span class=icon-arrow-up></span> Update"); 
		 document.getElementById("PipingClass").focus(); 

		
}
function deletePipingClass(ctl,pId){
	
	  _row = $(ctl).parents("tr");
	  var cols = _row.children("td");
	  var param = {
				id : pId
			}
	 var ser_data = JSON.stringify(param);
			$.ajax({
				type : "POST",
				contentType : 'application/json; charset=UTF-8',
				url : 'deletePipingClass',
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
