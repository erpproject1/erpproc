$(document).ready(function() {

 setTimeout(function(){   
	  
 getDepartments();
 getDicipline();
 getNonConformanceSet(); 
	  }, 100);
	
});
	
function getNonConformanceSet() {

	$('#nonConforAuthTable').pleaseWait(); 
	 param = {
				id :0
		    }
	var ser_data = JSON.stringify(param); 
	
	$.ajax({
		type : "POST", 
		contentType : 'application/json; charset=UTF-8',
		data : ser_data,
		url : 'getNonConformanceSet',
		success : function(data) { 
		 
			app.loading('destroy'); 	
			 
		 $('#nonConforAuthTable').DataTable(
					{
						"bDestroy" : true,
						"aaData" : data,
						"columns" : [   
								{
									"data" : 'permissionArea'
								}, 
								{
									"data" : 'dep'
								}, 
								{
									"data" : 'dis'
								},
								{
									"data" : 'job'
								},
								{
									"data" : 'usee'
								}, 
								{
									"data" : null
								}],

						"aoColumnDefs" : [ { 
							"aTargets" : [ 5 ],  
							"mRender" : function(data, type, full) {
								 return '<button  type="button" onclick="deleteNonConformanceSet(this,'+data.id+')"  class="btn btn-default btn-icon btn-xs"><span class="fa fa-times"></span></button> ';
							}
						} 
						]

					});//onclick="deleteFormAuthorized(this,'+data.id+')"
		 $('#nonConforAuthTable').pleaseWait('stop'); 
		},
		error : function(data) {
		 $('#nonConforAuthTable').pleaseWait('stop'); 
			 
		}

	});
	

} 

function deleteNonConformanceSet(ctl,pId) 
{ 
	
	$('#nonConforAuthTable').pleaseWait(); 
	var param = {
		id : pId
	}
	var ser_data = JSON.stringify(param);
	$.ajax({
		type : "POST",
		contentType : 'application/json; charset=UTF-8',
		url : 'deleteNonConformanceSet',
		data : ser_data,
		success : function(data) {
			bildirim('s','Delete success');
			$(ctl).parents("tr").remove();
			
			$('#nonConforAuthTable').pleaseWait('stop'); 
		},
		error : function(data) {
			if(data.status=='401') bildirim('warning',"You are not authorized");    
			  else bildirim('error',data);
			
			$('#nonConforAuthTable').pleaseWait('stop'); 
		}

	});
	
}


function addNonConformanceSet()
{ 
	var flag=true;
    var hata='';
	var pperArea=$("#perArea").val()+'';   
 	var pperStatu=$("#perStatu").val()+'';
 	var pjobDescription=$("#jobDescription").val();  
 	var pdepartment=$("#department").val(); 
 	var pdiscipline=$("#discipline").val();  
 	var puserId=getAllOptionVal('username2'); 
 	
 	if(pperArea == '0') 
 	{
 		flag=false;  
 		hata='Please select Permission Area ';
 		
    }else if(pdepartment=='0' && pdiscipline=='0' && pjobDescription=='0') 
 	{
 		flag=false;  
 		hata='Please select Department or Discipline or Job Description or User ';
 		
    }
 	 
   if(flag){	
	  

		 var sDataList= [];
		 var param; 
	   		 if(puserId.length>0)
			 {
		   		 var i;   
				 
				 for (i = 0; i < puserId.length; i++) { 
				      
							 param = { 
										userId:puserId[i],
										departmentId:0,
										disciplineId:0, 
										jobDescriptionId:0,
										permissionArea:pperArea,
										permissionStatu:pperStatu
							 	      }
							 sDataList.push(param);
					 
				 }
			 }
	   		 else if(pjobDescription!='0')
				{
		   			var param = { 
		   					userId:0,
		   					departmentId:0,
		   					disciplineId:pdiscipline, 
		   					jobDescriptionId:pjobDescription,
		   					permissionArea:pperArea,
		   					permissionStatu:pperStatu
		   		 	 	 }
		   			sDataList.push(param);
				}
	   		 else 
	   		 	{
		   			var param = { 
		   					userId:0,
		   					departmentId:pdepartment,
		   					disciplineId:pdiscipline, 
		   					jobDescriptionId:0,
		   					permissionArea:pperArea,
		   					permissionStatu:pperStatu
		   		 	 	 }
		   			sDataList.push(param);
				}
	
		
	   		var ser_data = JSON.stringify(sDataList); 
	
	   	
	
		   $('#UUT').pleaseWait(); 
		   $.ajax({
				type : "POST",
				contentType : 'application/json; charset=UTF-8',
				url : "addNonConformanceSet",
				data : ser_data,
				success : function(data) {
					  
					bildirim('success', 'Save Success');
					 $('#UUT').pleaseWait('stop'); 
					getNonConformanceSet();
					 
				},
				error : function(data) {
					 if(data.status=='401')
							bildirim('warning',"You are not authorized");    
						 else 
		                  bildirim('error',data);  
					 
					 $('#UUT').pleaseWait('stop'); 
				}
				
			});
		    
	     
	 	}
	 	else{ 
	 		bildirim('warning',hata);
	 	}
	 
}

function onchangeDep(){
	 
	getDepartmentJobs();
	getSelectUser(1); 
}

function onchangeDis(){
	  
	getSelectUser(2);
}
 
function getAllOptionVal(s)
{
	
	var b=$('#'+s).val()+'';
	var arry =[];
	if(b.length>0)
	{
		 arry =b.split(",");
		var bool=arry.indexOf('A');
		if(bool != -1)
		{ 
			arry =[];
			$('#'+s+' option').each(function(){ 
			 var a=$(this).val()+'';
			 if(a!='A' && a!='0')
				 arry.push(a); 
			 });
			
		 } 
	}
	
	return arry;
}
 



function getSelectUser(a)
{
	$("#username2").select2({ placeholder: "Choose Username"  });
	$('#userO').pleaseWait();
	
	var dep=$('#department').val(); 
	var dis=$('#discipline').val();  
	var job=$('#jobDescription').val();  
    var param;
    
    if(a==1){
  	  param = {
  				   departmentId:dep,
  				   discipline :dis,
  				   jobId:0
  			 }
  	   }
    else{
  	  param = {
  				   departmentId:dep,
  				   discipline :dis,
  				   jobId:job
  			 }
  	   }
  		
    var ser_data = JSON.stringify(param); 
		
		$.ajax({
			type : "POST",
			contentType : 'application/json; charset=UTF-8',
			url : 'getSelectUser', 
			data : ser_data,
			success : function(data) {
				
				var list = ' <option value="A">All Select User</option> ';

				$(data).each(
						function(i, val) {

							list = list + '<option value="' + val.id + '">'
							+ val.per.name +' ' + val.per.midName +' ' + val.per.lastName +' (' +val.per.nationalId+ ')'+'</option> ';

						});
				$("#username2").html(list);

				 $('#userO').pleaseWait('stop');
			},
			error : function(data) {

				 $('#userO').pleaseWait('stop');
			}

		});  
		
 
}
 
 
function getDepartments() {

	$.ajax({
		type : "GET",
		url : 'getDepartments',
		success : function(data) { 
			var list = '<option value="0">Select ..</option> ';

			$(data).each(
					function(i, val) {

						list = list + '<option value="' + val.id + '">'
								+ val.department + '</option> ';

					});
			$("#department").html(list);
		},
		error : function(data) {
			 
		}

	});

}

function getDicipline() {

	
	
	var param = {
		type : 'Discipline'
	}
	var ser_data = JSON.stringify(param);
	$.ajax({
		type : "POST",
		contentType : 'application/json; charset=UTF-8',
		url : 'getWirSettings',
		data : ser_data,
		success : function(data) { 
			var list = '<option value="' + 0 + '">Select.. </option> ';

			$(data).each(
					function(i, val) {

						list = list + '<option value="' + val.id + '">'
								+ val.description + '</option> ';

					});
			$("#discipline").html(list);
		},
		error : function(data2) {
			bildirim('error', data2);
		},

	});
	 
}

function getDepartmentJobs()
{
	
	$('#jobDescriptionO').pleaseWait();
	 var depId=$("#department").val();
	  
	 var param = {  departmentId : depId }
	 var ser_data = JSON.stringify(param);
	 var list = '<option value="' + 0 + '">Select ..</option> ';
	 
	$.ajax({
		type : "POST",
		contentType : 'application/json; charset=UTF-8',
		url : 'getDepartmentJobs', 
		data : ser_data,
		success : function(data) { 
			 
			$(data).each(  function(i, val) {
                   list = list + '<option value="' + val.id + '">' + val.jobDescription + '</option> ';
					 });
			
			$("#jobDescription").html(list);
			$('#jobDescriptionO').pleaseWait('stop');
		},
		error : function(data) {
			$('#jobDescriptionO').pleaseWait('stop');
		}

	});

	
}

