$(document).ready(function() {
	 
	getDepartments();
	//getPFClient();

	setTimeout(getPFClient, 100);
	
 
});

var tmpData=null;
function getDisciplineDesc(deg)
{
	var d='';
	if(tmpData!=null)
	{ for (i = 0; i < tmpData.length; i++) { 
		 if(tmpData[i].id==deg) {
			 d=tmpData[i].department;
			 break;
			}
		} 
	}else {d=deg;}
	return d; 
}

function getPFClient() { 

	var list1='';
	var list2='';
	var arry = [''];
	var arry2 = [''];
	$.ajax({
		type : "GET",
		url : 'getPFClient', 
		success : function(data) { 
			 
			$('#idPFC').DataTable( {
				"bDestroy": true,
				"aaData": data,
				"columns" : [  
		            { "data" : 'company' },
		            { "data" :  null }, 
		            { "data" : 'name' },
		            { "data" : 'midName' },
		            { "data" : 'lastName' },
		            { "data" : 'position' },  
		            { "data" : 'personalPhone' },  
		            { "data" : 'personalEmail' } ,  
		            { "data" : null } 
		            ], 
			"aoColumnDefs": [
				{
                    "aTargets": [1],
                    "mRender": function (data, type, full) {
                   	 return getDisciplineDesc(data.departmentId);
                 }
                } ,	{
                    "aTargets": [8],
                    "mRender": function (data, type, full) {
                   	 return '<button  type="button" onclick="deletePFC(this,'+data.id+')"  class="btn btn-default btn-icon btn-xs"><span class="fa fa-times"></span></button> '+
                   	 '<button  type="button" onclick="updatePFC(this,'+data.id+','+data.departmentId+')"  class="btn btn-default btn-icon btn-xs"><span class="fa fa-pencil"></span></button>';
                 }
                }  
              ]
	  
			} );
			
			$(data).each( function(i, val) { //
				var c=val.company;
				var p=val.position;
				var sr = arry.indexOf(c);
				var sr2 = arry2.indexOf(p);
				if(c.length>0) { 
					if(sr==-1){ 
						arry.push(c); 
						list1 = list1 + '<option value="' +c+ '">'; }
					}
				if(p.length>0) { 
					if(sr2==-1){ 
						arry2.push(p);
						list2 = list2 + '<option value="' +p	+ '">'; }}
			    });

			$("#pfcCompanys").html(list1);
			$("#pfcPosotions").html(list2);
			arry=[];
			arry2=[];
			cancelPFClient();
		},
		error : function(data) {
			alert("Error!");
		},
       

	});

}



function deletePFC(ctl,pId) { 
		
	alert(pId);
		_row = $(ctl).parents("tr");
		var cols = _row.children("td");
		var param = {
			id : pId
		}
		var ser_data = JSON.stringify(param);
		$.ajax({
			type : "POST",
			contentType : 'application/json; charset=UTF-8',
			url : 'deletePFClient',
			data : ser_data,
			success : function(data) {
				bildirim('success','Delete Succes');
				$(ctl).parents("tr").remove();
			},
			error : function(data) {
				if(data.status=='401') bildirim('warning',"You are not authorized");    
				  else bildirim('error','Delete Error');
				 
			}

		});
 

}

function cancelPFClient(){ 
		  $("#hidPFC").val(''); 
		  $("#pfcName").val(''); 
		  $("#pfcMiddle").val('');  
		  $("#pfcLast").val('');  
		  $("#pfcDepart").val(0).change();    
		  $("#pfcCompany").val('');  
		  $("#pfcPosotion").val('');  
		  $("#pfcPhone").val( '');  
		  $("#pfcMail").val( '');
		  $("#btnadd").html("Add"); 
		  document.getElementById("pfcCompany").focus();  
		  document.getElementById("btncancel").style.display = "none";
	
}
function updatePFC (ctl,pId,pDept){//},pcompany,pdepartmentId,pname,pmidName,pastName,pposition,ppersonalPhone,ppersonalEmail){
		 
		_row = $(ctl).parents("tr");
		var cols = _row.children("td");  
			  $("#hidPFC").val(pId); 
			  $("#pfcName").val($(cols[2]).text()); 
			  $("#pfcMiddle").val($(cols[3]).text());  
			  $("#pfcLast").val($(cols[4]).text());  
			  $("#pfcDepart").val(pDept).change();    
			  $("#pfcCompany").val($(cols[0]).text());  
			  $("#pfcPosotion").val($(cols[5]).text());  
			  $("#pfcPhone").val($(cols[6]).text());  
			  $("#pfcMail").val($(cols[7]).text());
			  $("#btnadd").html("<span class=icon-arrow-down></span> Update"); 
			  document.getElementById("pfcCompany").focus();  
			  document.getElementById("btncancel").style.display = "block";
			   
			  	
			
	 
}

function addPFClient(){
	
	if ($("#btnadd").text().indexOf("Update")>0) {
	    updatePFClient();
	  }
	  else { 
		  addPFClient2();
	  }
}



function addpfcKontrol()
{ 
	var flag=true; 
	  
	var pfcName= $("#pfcName").val();
	var pfcLast= $("#pfcLast").val();
	var pfcDepart=$("#pfcDepart").val();
	var pfcCompany=$("#pfcCompany").val();
	var pfcPosotion=$("#pfcPosotion").val();
 
   if(pfcCompany.length<1)
	{
			bildirim('warning','Company is Empty');
			document.getElementById("pfcCompany").focus();
			flag=false;
	}else if(pfcName.length<1)
      {
			bildirim('warning','Name is Empty');
			document.getElementById("pfcName").focus();
			flag=false;
	}else if(pfcLast.length<1)
	{
		bildirim('warning','Last Name is Empty');
		document.getElementById("pfcLast").focus();
		flag=false;
	}
	else if(pfcDepart==0)
	{
		bildirim('warning',' Department not select');
		document.getElementById("pfcDepart").focus();
		flag=false;
	} 

	else if(pfcPosotion.length<1)
	{
		bildirim('warning',' Posotion not select');
		document.getElementById("pfcPosotion").focus();
		flag=false;
	} 
	return flag;
}


function addPFClient2() { 
	
 
	 
	if(addpfcKontrol()){
	
	var param = {
			name : $("#pfcName").val(), 
			midName : $("#pfcMiddle").val(), 
			lastName : $("#pfcLast").val(), 
			company : $("#pfcCompany").val(),
			departmentId:$("#pfcDepart").val(),
			position:$("#pfcPosotion").val(),
			personalPhone:$("#pfcPhone").val(),
			personalEmail:$("#pfcMail").val() 
	}
	var ser_data = JSON.stringify(param); 
	
	$.ajax({
		type : "POST",
		contentType : 'application/json; charset=UTF-8',
		url : 'addPFClient', 
		data : ser_data,
		success : function(data) {
			bildirim('success','Created Succes');
			getPFClient();
			
		},
		error : function(data) {
			if(data.status=='401') bildirim('warning',"You are not authorized");    
			  else  
			bildirim('error','Created Error');
		}

	});
	
	}

}


function updatePFClient()
{
	var pid=$("#hidPFC").val();
	if(pid.length>0){
		
	if(addpfcKontrol()){
		
		var param = {
				id: pid,
				name : $("#pfcName").val(), 
				midName : $("#pfcMiddle").val(), 
				lastName : $("#pfcLast").val(), 
				company : $("#pfcCompany").val(),
				departmentId:$("#pfcDepart").val(),
				position:$("#pfcPosotion").val(),
				personalPhone:$("#pfcPhone").val(),
				personalEmail:$("#pfcMail").val() 
		}
		var ser_data = JSON.stringify(param); 
		
		$.ajax({
			type : "POST",
			contentType : 'application/json; charset=UTF-8',
			url : 'updatePFClient', 
			data : ser_data,
			success : function(data) {
				bildirim('success','Created Succes');
				getPFClient();
				$("#btnadd").html("Add"); 
				$("#hidPFC").val('');
				document.getElementById("btncancel").style.display ="none";
				
			},
			error : function(data) {
				if(data.status=='401') bildirim('warning',"You are not authorized");    
				  else  
				bildirim('error','Created Error');
			}

		});
		
		}
	}
	else {bildirim('error','You couldn t update');}

}
 
function getDepartments() {

	$.ajax({
		type : "GET",
		url : 'getDepartments',
		success : function(data) { 
			tmpData = JSON.parse(JSON.stringify(data));
			var list = '<option value="' + 0 + '">Select ..</option> ';
			 
			$(data).each(
					function(i, val) {

						list = list + '<option value="' + val.id + '">'
								+ val.department + '</option> '; 
						 
					});  
			$("#pfcDepart").html(list);  
		},
		error : function(data) {
			bildirim('error','get department error ');
		}

	});
	

}