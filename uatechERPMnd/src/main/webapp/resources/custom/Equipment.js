$(document).ready(function() {
	
	
});

function EquipmentAction() {
	  if ($("#dptBtn").text().indexOf("Update")>0) {
	    updateEquipment();
	  }
	  else {
		  addEquipment();
	  }
	 
}

function addEquipment() {

		var param = {
			equipmentType: $("#txtEquipmentType").val(),
			equipmentCode : $("#txtEquipmentCode").val(),
			equipmentName:$("#txtEquipmentName").val(),
			calibrationDate:$("#dateCalibrationDate").val(),
			calibrationPeriod:$("#txtCalibrationPeriod").val(),
			status:$("#txtStatus").val()
		}
		var ser_data = JSON.stringify(param);
		$.ajax({
			type : "POST",
			contentType : 'application/json; charset=UTF-8',
			url : 'addEquipment',
			data : ser_data,
			success : function(data) {
				bildirim('s',data);
				getUpperEquipment();
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
		  $("#Equipment").val($(cols[1]).text());		 		 
		 $("#upperEquipment").val(pUpperId).change(); 		
		 $("#dptBtn").html("<span class=icon-arrow-up></span> Update"); 
		 document.getElementById("Equipment").focus(); 

		
}

function updateEquipment(){

		var param = {
			id :  $("#id").val(),
			Equipment : $("#Equipment").val(),
			upperEquipmentId : $("#upperEquipment").val()
		}
		var ser_data = JSON.stringify(param);
		$.ajax({
			type : "POST",
			contentType : 'application/json; charset=UTF-8',
			url : 'updateEquipment',
			data : ser_data,
			success : function(data) {
				bildirim('s',data);
				clearInputs();
				getUpperEquipment();
			},
			error : function(data) {
				if(data.status=='401') bildirim('warning',"You are not authorized");    
				  else bildirim('error',data);
			}

		});
	
		
}
function clearInputs(){
	
	 $("#id").val(""); 
	  $("#Equipment").val("");
	  document.getElementById("upperEquipment").selectedIndex=0;	 		 
	 $("#upperEquipment").val(0).change(); 	 		
	 $("#dptBtn").html("<span class=icon-arrow-up></span> Save");
	 document.getElementById("listBody").focus();  
	
}
function deleteEquipment(ctl,pId){
	
	  _row = $(ctl).parents("tr");
	  var cols = _row.children("td");
	  var param = {
				id : pId
			}
	 var ser_data = JSON.stringify(param);
			$.ajax({
				type : "POST",
				contentType : 'application/json; charset=UTF-8',
				url : 'deleteEquipment',
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
