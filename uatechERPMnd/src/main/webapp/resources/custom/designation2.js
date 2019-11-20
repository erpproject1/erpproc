$(document).ready(function() {	
	fillDesignationTable(); 
//	FIRAT	 
});



function addDesignation() { 

	var flag=true;
	var hata='';
	   
	var param = {  
		designation:$("#designation").val(),
		code : $("#code").val()
	}
	
	if(param.designation.length<1)
	{
		flag=false;
		hata='Designation is Empty'; 
	}else {
		flag=true;
		hata='';
	}
		
		
	if(flag){	
	var ser_data = JSON.stringify(param); 
	$.ajax({
		type : "POST",
		contentType : 'application/json; charset=UTF-8',
		url : 'addDesignation2',  
		data : ser_data,
		success : function(data) {
			bildirim('success', data);
			 fillDesignationTable();
			 $("#designation").val('');
			 $("#code").val('');

		},
		error : function(data) {
			bildirim('error', data);

		}

	});
	}
	else{bildirim('warning',hata);}

}

function fillDesignationTable()
{ 
	
			$.ajax({
				type : "GET", 
				contentType : 'application/json; charset=UTF-8',
				url : 'fillDesignations',  
				success : function(data) {

			$('#designationTable').DataTable( { 
				"bDestroy": true,
				"aaData": data,
				"columns" : [
					{ "data" : 'id' }, 
		            { "data" : 'designation' },   
		            { "data" : 'code' }  ,
		            { "data" : null }  
		            ], 
		            
			"aoColumnDefs": [
				{
                    "aTargets": [3],
                    "mRender": function (data, type, full) {
                   	 return '<button  type="button" onclick="deleteDesignation(this,'+data.id+') "  class="btn btn-default btn-icon"><span class="fa fa-times"></span></button> ';
                 }
                } 
              ]
		        
			} );
			
			 
		},
		error : function(data2) {
			alert("Error!");
		},
       

	});
 

}

function deleteDesignation(ctl,pId) {  
 
	var param = {
		id : pId
	}
	var ser_data = JSON.stringify(param);
	$.ajax({
		type : "POST",
		contentType : 'application/json; charset=UTF-8',
		url : 'deleteDesignation2',
		data : ser_data, 
		success : function(data) {
			bildirim('success',data);
			$(ctl).parents("tr").remove();
			
		},
		error : function(data) {
			bildirim('warning',data);
		}

	});

}

