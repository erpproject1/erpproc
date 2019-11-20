

$(document).ready(function() {
	
 
 getforDashborad();	
 setTimeout(function(){   
	 	  
 getDepartments();
 getDicipline();
 getDashboardSet(); 
	  }, 100);
  
 
 
});

function encrypt(message = '', key = ''){
    var message = CryptoJS.AES.encrypt(message, key);
    
    return message.toString();
}

function decrypt(message = '', key = ''){
    var code = CryptoJS.AES.decrypt(message, key);
    var decryptedMessage = code.toString(CryptoJS.enc.Utf8);

    return decryptedMessage;
} 


 var temp;

 function getforDashborad(){
	 $.getJSON('json/forDashboard.json', function(data) {
		 temp=data;
		 var list='<option value="0" selected >Select ..</option> ';
		 $(data).each( function(i, val) { 
						list = list + '<option value="' + val.id + '">' + val.name +' </option> ';

		 });
		 $('#perArea').html(list); 
	 });
 }
 
function getDisAllow(a) {
	
	 var td= temp.filter(d => d.id === a); 
     return td[0].name; 
    
 
}

function getDashboardSet() {

	$('#dashboardTable').pleaseWait(); 
	 param = {
				id :0 
		    }
	var ser_data = JSON.stringify(param); 
	
	$.ajax({
		type : "POST", 
		contentType : 'application/json; charset=UTF-8',
		data : ser_data,
		url : 'getDashboardSet',
		success : function(data) { 
		 
			app.loading('destroy'); 	
			
		 $('#dashboardTable').DataTable(
					{
						"bDestroy" : true,
						"aaData" : data,
						"columns" : [   
								{
									"data" : null
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
							"aTargets" : [ 0 ],  
							"mRender" : function(data, type, full) {
								 return  getDisAllow(data.permissionArea);
							}
						} 
						,{ 
							"aTargets" : [ 5 ],  
							"mRender" : function(data, type, full) {
								 return '<button  type="button" onclick="deleteDashboardSet(this,'+data.id+')"  class="btn btn-default btn-icon btn-xs"><span class="fa fa-times"></span></button> ';
							}
						} 
						]

					});//onclick="deleteFormAuthorized(this,'+data.id+')"
		 $('#dashboardTable').pleaseWait('stop'); 
		},
		error : function(data) {
		 $('#dashboardTable').pleaseWait('stop'); 
			 
		}

	});
	

} 

function deleteDashboardSet(ctl,pId) 
{ 
	
	$('#dashboardTable').pleaseWait(); 
	var param = {
		id : pId
	}
	var ser_data = JSON.stringify(param);
	$.ajax({
		type : "POST",
		contentType : 'application/json; charset=UTF-8',
		url : 'deleteDashboardSet',
		data : ser_data,
		success : function(data) {
			bildirim('s','Delete success');
			$(ctl).parents("tr").remove();
			
			$('#dashboardTable').pleaseWait('stop'); 
		},
		error : function(data) {
			if(data.status=='401') bildirim('warning',"You are not authorized");    
			  else bildirim('error',data);
			
			$('#dashboardTable').pleaseWait('stop'); 
		}

	});
	
}


function addDashboardSet()
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
				url : "addDashboardSet",
				data : ser_data,
				success : function(data) {
					  
					bildirim('success', 'Save Success');
					 $('#UUT').pleaseWait('stop'); 
					 getDashboardSet();
					 
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

