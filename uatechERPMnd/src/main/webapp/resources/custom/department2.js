$(document).ready(function() {
	
	fillDeparments(); 
	fillDesignations();  
	
});



function addDepartment() { 

	var flag=true;
	var hata='';
	
	 
	var param = { 
		department:$("#department").val(),
		upperDepartmentId: $("#upperDepartment").val(),
		designationId: $("#headDepartment").val()  
	}
	
	if(param.department.length<1)
	{
		flag=false;
		hata='Department is Empty';
	}	
	
	
	if(param.designationId==null || param.designationId==-1)
	{
		flag=false;
		hata=hata+ 
		' Please Select Department Head !'; 
	}
	
	
		
		
	if(flag){	
	var ser_data = JSON.stringify(param); 
	$.ajax({
		type : "POST",
		contentType : 'application/json; charset=UTF-8',
		url : 'addDepartment2', 
		data : ser_data, 
		success : function(data) {
			bildirim('success', data);
			fillDeparments();		
			$("#department").val(""); 			
			$("#headDepartment").val(-1);   
			$("#headDepartment").trigger("change"); 

		},
		error : function(data) {
			bildirim('error', data);

		}

	});
	}
	else{bildirim('warning',hata);}

}

function fillDeparments() 
{ 
	var arry = [''];
	var dataChart = []; 
	var options=' <option value="0">Select Department</option>' ;  
	
			$.ajax({
				type : "GET", 
				url : 'getDepartments',   
				success : function(obj) { 
			var data = obj.list; 
			$('#departmentTable').DataTable( {  
				"bDestroy": true,
				"aaData": data,
				"columns" : [
					{ "data" : 'code' }, 
		            { "data" : 'department' },
		            { "data" : 'topDepartment' },     
		            { "data" : 'designation.designation' },   
		            { "data" : null } 
		            ], 
		            
			"aoColumnDefs": [
				{
                    "aTargets": [4],
                    "mRender": function (data, type, full) {
                   	 return '<button  type="button" onclick="deleteDepartment(this,'+data.id+') "  class="btn btn-default btn-icon"><span class="fa fa-times"></span></button> ';
                 }
                } 
              ]
		        
			} );
			
			

			var list = '<option value="' + 0 + '">Select Department</option> ';
			$(obj).each(
					function(i, val) {

						list = list + '<option value="' + val.id + '">'
								+ val.department + '</option> ';
						
					
					});
			
			
			$('#upperDepartment').html(list) ;
			$('#chart-container').html(''); 
			 var oc = $('#chart-container').orgchart({
			      	'data' : obj, 
			    	'pan':true,
			    	'zoom':true,
			    	'draggable': true,
			    	'createNode': function($node, data) { 
			    	 
			    	  var dep = '' ;
			    	  var dhead = '' ;
			    	  var name = '' ;
			    	  var gsm = '' ;
			    	  var photo = '' ;
			    	  
			    	  if($('#dep').is(':checked'))
			    		  dep= data.department;
			    	  if($('#dhead').is(':checked'))
			    		  dhead=data.designation.designation;
			    	  if($('#name').is(':checked'))
			    		  name=data.name;
			    	  if($('#gsm').is(':checked'))
			    		  gsm=data.gsm;
			    	  if($('#photo').is(':checked')) 
			    		  photo='<td align="left">'
		                   	+' <img src="orgchart/img/avatar/15.jpg' + ''+'" width="100px" height="100px">' 
		                   	+'</td> ';
			    	  
			          $node.children('.title').html('   <table onclick=updateDepartment2('+data.id+') style="width:100%"> ' 
			        		  +'  <tr> '
			        		 + photo +' ' 
			                  +	' <td align="left">   <table style="width:100%"> <tr>  <td align="left">'
			                          +'  <p>'+dep+'<br> '+dhead+'<br> '+name+ '<br> '+gsm+  '</p>'    
			                       
			      					+'  </td> </tr>   </table>  '
			      				+'</td> <input hidden id="id" value="'+data.id+'"/>' 
			      				 
			      				+' </tr> </table>' 
			                          
								
								);
			        },
			      'dropCriteria': function($draggedNode, $dragZone, $dropZone) {
			       
			        return true;
			      }
			    });

			    oc.$chart.on('nodedrop.orgchart', function(event, extraParams) {
			    	var draggedHTML = new DOMParser().parseFromString(extraParams.draggedNode.children('.title').html(), "text/html")
			    	var draggedId = draggedHTML.getElementById("id").value ; 
			    	
			    	var droppedHTML = new DOMParser().parseFromString(extraParams.dropZone.children('.title').html(), "text/html")
			    	var droppedId = droppedHTML.getElementById("id").value ;  
			    	
			    	updateDepartment(draggedId,droppedId);
			      
			    });
			    
			    
			},
		error : function(data2) {
			alert("Error!");
		},
       

	});
 

}

function refresh() {
	fillDeparments();
}

function fillDesignations()
{ 
	var options=' <option value="-1">Select Designation </option>' ; 
	
			$.ajax({
				type : "GET", 
				contentType : 'application/json; charset=UTF-8',
				url : 'fillDesignations',  
				success : function(data) {
	
					//var obj = JSON.parse(data);

					for (i = 0; i < data.length; i++) { 
						options = options+ ' <option value="'+ data[i].id+'">' +data[i].designation+ '</option>';  
					}
					
					$('#headDepartment').html(options) ;
			 
		},
		error : function(data2) {
			alert("Error!");
		},
       

	});
 

}

function deleteDepartment(ctl,pId) { 
 
	var param = { 
		id : pId
	}
	var ser_data = JSON.stringify(param);
	$.ajax({
		type : "POST",
		contentType : 'application/json; charset=UTF-8',
		url : 'deleteDepartment2', 
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

function updateDepartment(pId,upperId) { 
	 
	var param = { 
		id : pId,
		upperDepartmentId:upperId
	}
	
	var ser_data = JSON.stringify(param);
	$.ajax({
		type : "POST",
		contentType : 'application/json; charset=UTF-8',
		url : 'updateDepartment1', 
		data : ser_data,
		success : function(data) { 
			bildirim('success',data);
			
			
		},
		error : function(data) {
			bildirim('warning',data);
		}

	});

}

function updateDepartment2(pId) { 
	$("#modal-edit").modal("show");
	$("#depId").val(pId); 	
	var param = { 
			id : pId
			
		}
		
		var ser_data = JSON.stringify(param);
	$.ajax({
		type : "POST",
		contentType : 'application/json; charset=UTF-8',
		url : 'getDepartment2',  
		data : ser_data, 
		success : function(data) { 
			$("#department").val(data.department); 		
			$("#upperDepartment").val(data.upperDepartmentId);   
			$("#upperDepartment").trigger("change");  
			$("#headDepartment").val(data.designationId);    
			$("#headDepartment").trigger("change"); 
		},
		error : function(data) {
			bildirim('error', data);

		}

	});
	
		
}

function update() { 

	var flag=true;
	var hata='';
	 
	 
	var param = { 
		id:$("#depId").val(), 
		department:$("#department").val(),
		upperDepartmentId: $("#upperDepartment").val(),
		designationId: $("#headDepartment").val()  
	}
	
	if(param.department.length<1)
	{
		flag=false;
		hata='Department is Empty';
	}	
	
	
	if(param.designationId==null || param.designationId==-1)
	{
		flag=false;
		hata=hata+ 
		' Please Select Department Head !'; 
	}
	
	
		
		
	if(flag){	
	var ser_data = JSON.stringify(param); 
	$.ajax({
		type : "POST",
		contentType : 'application/json; charset=UTF-8',
		url : 'updateDepartment2',  
		data : ser_data, 
		success : function(data) { 
			bildirim('success', data);
			fillDeparments();		
			$("#department").val(""); 			
			$("#headDepartment").val(-1);   
			$("#headDepartment").trigger("change"); 

		},
		error : function(data) {
			bildirim('error', data);

		}

	});
	}
	else{bildirim('warning',hata);}

}


function SaveChanges() { 
	 
	  var hierarchy = $('#chart-container').orgchart('getHierarchy');
	  var data = JSON.stringify(hierarchy);
	  alert(data+'');

}

