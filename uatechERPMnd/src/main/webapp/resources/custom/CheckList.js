$(document).ready(function() {
	
	
});

function CheckListAction() {
	  if ($("#dptBtn").text().indexOf("Update")>0) {
	    updateCheckList();
	  }
	  else {
		  addCheckList();
	  }
	 
}

function addCheckList() {

		var param = {
			CheckList : $("#CheckList").val(),
			upperCheckListId : $("#upperCheckList").val()
		}
		var ser_data = JSON.stringify(param);
		$.ajax({
			type : "POST",
			contentType : 'application/json; charset=UTF-8',
			url : 'addCheckList',
			data : ser_data,
			success : function(data) {
				bildirim('s',data);
				getUpperCheckList();
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
		  $("#CheckList").val($(cols[1]).text());		 		 
		 $("#upperCheckList").val(pUpperId).change(); 		
		 $("#dptBtn").html("<span class=icon-arrow-up></span> Update"); 
		 document.getElementById("CheckList").focus(); 

		
}

function updateCheckList(){

		var param = {
			id :  $("#id").val(),
			CheckList : $("#CheckList").val(),
			upperCheckListId : $("#upperCheckList").val()
		}
		var ser_data = JSON.stringify(param);
		$.ajax({
			type : "POST",
			contentType : 'application/json; charset=UTF-8',
			url : 'updateCheckList',
			data : ser_data,
			success : function(data) {
				bildirim('s',data);
				clearInputs();
				getUpperCheckList();
			},
			error : function(data) {
				if(data.status=='401') bildirim('warning',"You are not authorized");    
				  else bildirim('error',data);
			}

		});
	
		
}
function clearInputs(){
	
	 $("#id").val(""); 
	  $("#CheckList").val("");
	  document.getElementById("upperCheckList").selectedIndex=0;	 		 
	 $("#upperCheckList").val(0).change(); 	 		
	 $("#dptBtn").html("<span class=icon-arrow-up></span> Save");
	 document.getElementById("listBody").focus();  
	
}
function deleteCheckList(ctl,pId){
	
	  _row = $(ctl).parents("tr");
	  var cols = _row.children("td");
	  var param = {
				id : pId
			}
	 var ser_data = JSON.stringify(param);
			$.ajax({
				type : "POST",
				contentType : 'application/json; charset=UTF-8',
				url : 'deleteCheckList',
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
