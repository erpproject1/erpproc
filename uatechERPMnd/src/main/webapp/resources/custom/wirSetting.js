$(document).ready(function() {
	 
	var ty=getSelectVal();
	 
	getWirSetting();
	 
	
});


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
			$("#IrQRIns").html(list);  
			$("#IrPMT").html(list);  
			$("#IrCliQC").html(list);  
		},
		error : function(data) {
			mesajgoster('e','get department error ');
		}

	});
	

}

function getSelectVal()
{ 
	var dd=$("#idWirType option:selected").text(); 
	return dd;
}

 
 

function getWirSettingCh()
{
	var ty=$("#idWirType").val();
	
	

	var div1 = document.getElementById("wirDivVal");
	var div2 = document.getElementById("wirDivCod");
	var div11 = document.getElementById("div1");
	var div22 = document.getElementById("div2");
	
	if(ty==5)
	{ 
	 div1.style.display = "none";
	 div2.style.display = "block";
  
	} 
	else{
     div1.style.display = "block";
	 div2.style.display = "none"; 
	 
 
	}
	
	if(ty==6){
		 div11.style.display = "none";
		 div22.style.display = "block";
		 $("button[id='btn1']").attr("disabled", true);
		 getDepartments();
		 setTimeout(getWirSetting2, 100); 
	}else{
		 div11.style.display = "block";
		 div22.style.display = "none"; 
		 $("button[id='btn1']").attr("disabled", false);
		 getWirSetting();
		 }
	
	
	
}

function getWirSetting() { 
	
	var kol='value';
	var ty=$("#idWirType").val();
	if(ty==5)
	{  
 
	 kol='code';
	} 
	
	var ptype=getSelectVal();
	 
	var param = { 
			 type:ptype
			}
	 var ser_data = JSON.stringify(param);
			$.ajax({
				type : "POST",
				contentType : 'application/json; charset=UTF-8',
				url : 'getWirSettings', 
				data : ser_data,
				success : function(data) {
			 
			$('#wirSetTable').DataTable( {
				"searching": false,
				"info":false, 
				"bLengthChange": false,
				"bDestroy": true,
				"aaData": data,
				"columns" : [
		            { "data" : 'type' }, 
		            { "data" : 'description' }, 
		            { "data" : kol } , 
		            { "data" : null } ],
		        
			"aoColumnDefs": [
				{
                    "aTargets": [3],
                    "mRender": function (data, type, full) {
                   	 return '<button  type="button" onclick="deleteWirSetting(this,'+data.id+')"  class="btn btn-default btn-icon"><span class="fa fa-times"></span></button> ';
                 }
                },
                {
                    "aTargets": [2],
                    "sTitle": kol
                }  
              ]
		        
			} );
		},
		error : function(data2) {
			alert("Error!");
		},
       

	});
 

}
 
function addWirSetting() { 
	
	var ty=getSelectVal();
	
	var param = {
		type :ty ,
		description : $("#wirDesc").val(), 
		value : $("#wirVal").val(), 
		code : $("#wirCode").val() 
	}
	var ser_data = JSON.stringify(param); 
	$.ajax({
		type : "POST",
		contentType : 'application/json; charset=UTF-8',
		url : 'addWirSetting', 
		data : ser_data,
		success : function(data) {
			alert(data);
			getWirSetting();
		},
		error : function(data) {
			
			 if(data.status=='401') bildirim('warning',"You are not authorized");    
			  else bildirim('warning',data);
		}

	});

}

function addWirSetting2(d) { 
	var deger='';
	var desc='';
	if(d==1){
		deger=$("#IrQRIns").val();
		desc='qci';
	}
	if(d==2){
		deger=$("#IrPMT").val();
		desc='pmt';
	}
	if(d==3){
		deger=$("#IrCliQC").val();
		desc='cqc';
	}
	
	var param = {
		type :'IRS' ,
		description : desc, 
		value : deger, 
		code : '' 
	}
	var ser_data = JSON.stringify(param); 
	$.ajax({
		type : "POST",
		contentType : 'application/json; charset=UTF-8',
		url : 'updateWirSetting', 
		data : ser_data,
		success : function(data) {
			bildirim('success',data);
			//getWirSetting();
		},
		error : function(data) {
			 if(data.status=='401') bildirim('warning',"You are not authorized");    
			  else bildirim('warning',data);
		}

	});

}


function getWirSetting2() { 
 
	 
	var param = { 
			type :'IRS'
			}
	 var ser_data = JSON.stringify(param);
			$.ajax({
				type : "POST",
				contentType : 'application/json; charset=UTF-8',
				url : 'getWirSettings', 
				data : ser_data,
				success : function(data) {
					$(data).each(
							function(i, val) {

								if(val.description=='qci') {$("#IrQRIns").val(val.value).trigger('change');}
								if(val.description=='pmt') {$("#IrPMT").val(val.value).trigger('change');}
								if(val.description=='cqc') {$("#IrCliQC").val(val.value).trigger('change');}
									
								 
							});  
		},
		error : function(data2) {
			alert("Error!");
		},
       

	});
 

}
 
function deleteWirSetting(ctl,pId) { 
	
	_row = $(ctl).parents("tr");
	var cols = _row.children("td");
	var param = {
		id : pId
	}
	var ser_data = JSON.stringify(param);
	$.ajax({
		type : "POST",
		contentType : 'application/json; charset=UTF-8',
		url : 'deleteWirSetting',
		data : ser_data,
		success : function(data) {
			alert(data);
			$(ctl).parents("tr").remove();
		},
		error : function(data) {
			 if(data.status=='401') bildirim('warning',"You are not authorized");    
			  else bildirim('warning',data);
		}

	});

}
