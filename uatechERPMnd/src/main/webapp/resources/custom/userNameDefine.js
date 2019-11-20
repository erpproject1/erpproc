$(document).ready(function() {

	setTimeout(getPersonal, 100); 
	getUserDefine();
	 /*$('#selectPersonaldiv').pleaseWait();
	 $('#selectPersonaldiv').pleaseWait('stop');*/
});
	
 
function addUserNameDefine()
{

	var un=$('#userName').val().trim()+'';
	var ps=$('#Pass').val().trim()+'';
	var rps=$('#rePass').val().trim()+'';
	var sp=$('#selectPersonal').val();
	
	if(un==null||un.length<1){
		bildirim('e','username is empty');
	}
	else if(ps==null||ps.length<1){
		bildirim('e','Password is empty');
	}
	else if(rps==null||rps.length<1){
		bildirim('e','Re-Password is empty');
	}
	else if(sp==0){
		bildirim('e','Please select Personal');
	}
	else if(ps!=rps){
		bildirim('e','Password different.Please check');
	}
	else{
		$('#saveUsernamediv').pleaseWait();
		   param = {
				   username: un,
				   pass :ps, 
				   personalId :sp 
			 }
		   
		var ser_data = JSON.stringify(param); 
		
		$.ajax({
			type : "POST",
			contentType : 'application/json; charset=UTF-8',
			url : 'addUserNameDefine', 
			data : ser_data,
			success : function(data) {
				
				if(data.includes("Success"))
				bildirim('success','Save Username'); 
				else bildirim('error','Not save Username');
				$('#saveUsernamediv').pleaseWait('stop');
				getPersonal();
				
				$('#userName').val('');
			    $('#Pass').val('');
				$('#rePass').val('');
				getUserDefine();
				
			},
			error : function(data) {
				if(data.status=='401') bildirim('warning',"You are not authorized");    
				  else  
				bildirim('error','Not save Username');
				$('#saveUsernamediv').pleaseWait('stop');
				 
				bildirim('error', JSON.stringify(data));
			}

		});  
		

		
		} 
	
}

 

function getPersonal()
{ 
	$('#selectPersonaldiv').pleaseWait();
		$.ajax({
			type : "GET",
			url : 'getPersonal', 
			success : function(data) { 
				
				var list = '<option value="0">Select ..</option>';

				$(data).each(
						function(i, val) {

							list = list + '<option value="' + val.id + '">'
							+ val.name +' ' + val.midName +' ' + val.lastName +' (' +val.nationalId+ ')</option> ';

						});
				$("#selectPersonal").html(list);
				$('#selectPersonaldiv').pleaseWait('stop');
				 
			},
			error : function(data) {
				$('#selectPersonaldiv').pleaseWait('stop');
			}

		});    
}
 
function getUserDefine()
{ 
	$('#userDefineTable').pleaseWait();
		$.ajax({
			type : "GET",
			url : 'getUserDefine', 
			success : function(data) { 
				 
				 $('#userDefineTable').DataTable(
							{
								"bDestroy" : true,
								"aaData" : data,
								"columns" : [
										{
											"data" : 'id'
										},
										{
											"data" : 'username'
										},
										{
											"data" : 'per.name'
										},
										{
											"data" : 'per.midName'
										},
										{
											"data" : 'per.lastName'
										},
										{
											"data" : null
										} ],

								"aoColumnDefs" : [  {
									
									"aTargets" : [ 5 ],  
									"mRender" : function(data, type, full) {
										 return '<button  type="button" onclick="deleteUserNameDefine(this,'+data.id+')"  class="btn btn-default btn-icon btn-xs"><span class="fa fa-times"></span></button> ';
									}
								} 
								]

							});
				$('#userDefineTable').pleaseWait('stop');
				 
			},
			error : function(data) {
				$('#userDefineTable').pleaseWait('stop');
			}

		});    
}

function deleteUserNameDefine(ctl,pId) 
{ 
	
	$('#userDefineTable').pleaseWait();
	var param = {
		id : pId
	}
	var ser_data = JSON.stringify(param);
	$.ajax({
		type : "POST",
		contentType : 'application/json; charset=UTF-8',
		url : 'deleteUserNameDefine',
		data : ser_data,
		success : function(data) {
			bildirim('s','Delete success');
			$(ctl).parents("tr").remove();
			$('#userDefineTable').pleaseWait('stop');
		},
		error : function(data) {
			if(data.status=='401') bildirim('warning',"You are not authorized");    
			  else bildirim('error',data);
			
			$('#userDefineTable').pleaseWait('stop');
		}

	});
}

  