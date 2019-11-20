$(document).ready(function() {
	 
	getDepartments();
	//getPFContractor();
	setTimeout(getPFContractor, 100);
	
 
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


function getPFContractor() { 
 
	var list2='';
	var arry = [''];
	$.ajax({
		type : "GET",
		url : 'getPFContractor', 
		success : function(data) { 
			 
			$('#idPFC').DataTable( {
				"bDestroy": true,
				"aaData": data,
				"columns" : [  
		            { "data" : 'budgeNo' },
		            { "data" : null }, 
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
                },
				{
                    "aTargets": [8],
                    "mRender": function (data, type, full) {
                   	 return '<button  type="button" onclick="deletePFC(this,'+data.id+')"  class="btn btn-default btn-icon btn-xs"><span class="fa fa-times"></span></button> '+
                   	 '<button  type="button" onclick="updatePFC(this,'+data.id+','+data.departmentId+')"  class="btn btn-default btn-icon btn-xs"><span class="fa fa-pencil"></span></button>';
                 }
                } 
              ]
	  
			} );
			
			$(data).each( function(i, val) {  
				var p=val.position;  
				if(p.length>0) { 
					var sr = arry.indexOf(p);
					if(sr==-1){
						arry.push(p); 
						list2 = list2 + '<option value="' +p+ '">';
					     }
					 }
			    });
			arry=[];
			$("#pfcPosotions").html(list2);
			  
			cancelPFContractor();
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
			url : 'deletePFContractor',
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

function cancelPFContractor(){ 
		  $("#hidPFC").val(''); 
		  $("#pfcName").val(''); 
		  $("#pfcMiddle").val('');  
		  $("#pfcLast").val('');  
		  $("#pfcDepart").val(0).change();    
		  $("#pfcBudge").val('');  
		  $("#pfcPosotion").val('');  
		  $("#pfcPhone").val( '');  
		  $("#pfcMail").val( '');
		  $("#btnadd").html("Add"); 
		  document.getElementById("pfcBudge").focus();  
		  document.getElementById("btncancel").style.display = "none";
	
}
function updatePFC (ctl,pId,pDept){ 
		 
		_row = $(ctl).parents("tr");
		var cols = _row.children("td");  
			  $("#hidPFC").val(pId); 
			  $("#pfcName").val($(cols[2]).text()); 
			  $("#pfcMiddle").val($(cols[3]).text());  
			  $("#pfcLast").val($(cols[4]).text());  
			  $("#pfcDepart").val(pDept).change();    
			  $("#pfcBudge").val($(cols[0]).text());  
			  $("#pfcPosotion").val($(cols[5]).text());  
			  $("#pfcPhone").val($(cols[6]).text());  
			  $("#pfcMail").val($(cols[7]).text());
			  $("#btnadd").html("<span class=icon-arrow-down></span> Update"); 
			  document.getElementById("pfcBudge").focus();  
			  document.getElementById("btncancel").style.display = "block";
			   
			  	
			
	 
}

function addPFContractor(){
	
	if ($("#btnadd").text().indexOf("Update")>0) {
	    updatePFContractor();
	  }
	  else { 
		  addPFContractor2();
	  }
}


function addpfcKontrol()
{ 
	var flag=true; 
	  
	var pfcName= $("#pfcName").val();
	var pfcLast= $("#pfcLast").val();
	var pfcDepart=$("#pfcDepart").val();
	var pfcBudge= $("#pfcBudge").val();
	var pfcPosotion=$("#pfcPosotion").val();
 
	 if(pfcBudge.length<1)
		{
			bildirim('warning','Budge No is Empty');
			document.getElementById("pfcBudge").focus();
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
		else if(pfcPosotion.length<1)
		{
			bildirim('warning','Posotion is Empty');
			document.getElementById("pfcPosotion").focus();
			flag=false;
		}
		else if(pfcDepart==0)
	{
		bildirim('warning',' Department not select');
		document.getElementById("pfcDepart").focus();
		flag=false;
	} 	
	return flag;
}

function addPFContractor2() { 
	 
	if(addpfcKontrol()){
	
	var param = {
			name : $("#pfcName").val(), 
			midName : $("#pfcMiddle").val(), 
			lastName : $("#pfcLast").val(), 
			budgeNo : $("#pfcBudge").val(),
			departmentId:$("#pfcDepart").val(),
			position:$("#pfcPosotion").val(),
			personalPhone:$("#pfcPhone").val(),
			personalEmail:$("#pfcMail").val() 
	}
	var ser_data = JSON.stringify(param); 
	
	$.ajax({
		type : "POST",
		contentType : 'application/json; charset=UTF-8',
		url : 'addPFContractor', 
		data : ser_data,
		success : function(data) {
			bildirim('success','Created Succes');
			getPFContractor();
			
		},
		error : function(data) {
			if(data.status=='401') bildirim('warning',"You are not authorized");    
			  else  bildirim('error','Created Error');
		}

	});
	
	}

}


function updatePFContractor()
{
	var pid=$("#hidPFC").val();
	if(pid.length>0){
		
	if(addpfcKontrol()){
		
		var param = {
				id: pid,
				name : $("#pfcName").val(), 
				midName : $("#pfcMiddle").val(), 
				lastName : $("#pfcLast").val(), 
				budgeNo : $("#pfcBudge").val(),
				departmentId:$("#pfcDepart").val(),
				position:$("#pfcPosotion").val(),
				personalPhone:$("#pfcPhone").val(),
				personalEmail:$("#pfcMail").val() 
		}
		var ser_data = JSON.stringify(param); 
		
		$.ajax({
			type : "POST",
			contentType : 'application/json; charset=UTF-8',
			url : 'updatePFContractor', 
			data : ser_data,
			success : function(data) {
				bildirim('success','Created Succes');
				getPFContractor();
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