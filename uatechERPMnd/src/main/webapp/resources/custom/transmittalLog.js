$(document).ready(function() {
 
	getDepartments();
	//getDocTypes();
	getTransVariants();
	getTransLog();
	

	
});

var transNo=0;

function getTransLog() {
	$.ajax({
				type : "GET",
				contentType : 'application/json; charset=UTF-8',
				url : 'getTransLog',
				success : function(data) {
					transNo=0;
					$(data).each(
							function(i, val) {
								if(val.id>transNo)
								{transNo=val.id;}

							});
					$("#idTransNo").val(transNo+1);
					
					$('#transTable')
							.DataTable(
									{
										"bDestroy" : true,
										"aaData" : data,
										"columns" : [
												{
													"data" : null
												},
												{
													"data" : 'id'
												},
												{
													"data" : 'fromdep.department'
												},
												{
													"data" : 'todep.department'
												},
												{
													"data" : 'transmittalNo'
												},
												{
													"data" : null
												},
												{
													"data" : 'doc.docCode'
												},
												{
													"data" : 'description'
												},
												{
													"data" : 'dep.department'
												},
												{
													"data" : 'preparationDate'
												},
												{
													"data" : 'submittalDate'
												},
												{
													"data" : 'act.description'
												},
												{
													"data" : 'replyDate'
												},
												{
													"data" : 'rep.description'
												},
												{
													"data" : 'sta.description'
												},
												{
													"data" : 'remarks'
												},
												{
													"data" : null//'attacmentFile'
												} ],

										"aoColumnDefs" : [ {
											
											"aTargets" : [ 0 ],  //"visible": false,
											"mRender" : function(data, type,
													full) {
												return '<button  type="button" onclick="deleteTransLog(this,'
														+ data.id
														+ ')"  class="btn btn-default btn-icon btn-xs"><span class="fa fa-times"></span></button> '
														+ '<button  type="button" onclick="updateTransLog(this,'
														+ data.id+','+data.fromDepart+','+data.toDepart+','+data.department
														+','+data.actionType+','+data.reply+','+data.status+','+data.documentType
														+ ')"  class="btn btn-default btn-icon btn-xs"><span class="fa fa-pencil"></span></button>';
											}
										}, {
											
											"aTargets" : [ 5 ],
											"mRender" : function(data, type, full) {
											 return  ('00'+data.revNo).slice(-2);
										}
										}, {
											
											"aTargets" : [ 16 ],
											"mRender" : function(data, type, full) {
												 var dow = '<button class="btn btn-default" onclick="createFileTable('+ data.id +')" data-toggle="modal" data-target="#modal-clean"><span  class="icon-paperclip"></span></button>';
											     if(data.attacmentFile==1)
											     { return dow;}
											     else{
												 return '';
												 }
										}
										}
										]

									});
				},
				error : function(data2) {
					bildirim('error', 'please this page refresh'); 
					
				},

			});

}

function updateTransLog(ctl,pid,pfromDepart,ptoDepart,pdepart,pacTyp,prep,pstat,pdocTyp)
{
	_row = $(ctl).parents("tr");
	var cols = _row.children("td");
	
	 $("#hidTransid").val(pid);
     $("#idFrom").val(pfromDepart).trigger('change');
	 $("#idTo").val(ptoDepart).trigger('change'); 
	 $("#idTransNo").val($(cols[4]).text());  
	 var c=parseInt($(cols[5]).text());
	 c=c+1;
	 $("#idRevNo").val(('00'+c).slice(-2));  
	 $("#idDepart").val(pdepart).trigger('change'); 
	 $("#idDesc").val($(cols[7]).text()); 
	 $("#idPreDate").val(setDateFormatR($(cols[9]).text())); 
	 $("#idSubDate").val(setDateFormatR($(cols[10]).text())); 
	 $("#idActType").val(pacTyp).trigger('change');  
	 $("#idRepDate").val(setDateFormatR($(cols[12]).text())); 
	 $("#idReply").val(prep).trigger('change');   
	 $("#idStatus").val(pstat).trigger('change'); 
	 $("#idRemarks").val($(cols[15]).text()); 
	 $("#btntranForm").html("<span class=icon-arrow-up></span> Update");
	 setTimeout(function(){  $("#idDocType").val(pdocTyp).trigger('change');   }, 2000);
}


 function deleteTransLog(ctl,pid)
 {
	 
		_row = $(ctl).parents("tr");
		var cols = _row.children("td");
		var param = {
			id : pid
		}
		var ser_data = JSON.stringify(param);
		$.ajax({
			type : "POST",
			contentType : 'application/json; charset=UTF-8',
			url : 'deleteTransLog',
			data : ser_data,
			success : function(data) {
				bildirim('success',data);
				$(ctl).parents("tr").remove();
			},
			error : function(data) {
				
				 if(data.status=='401') bildirim('warning',"You are not authorized");    
				  else bildirim('warning',data);  
			}

		});
 }

function addTransLog()
 {
	 
	 if ($("#btntranForm").text().indexOf("Update") > 0) {
			updateTransLogs();
		 
		} else {
			addTransLogs();
		}
 }
 
function updateTransLogs()
{
	var flag=true;
	var hata='';
	
	var hid=$("#hidTransid").val();
	var pFrom=$("#idFrom").val();
	var pTo=$("#idTo").val(); 
	var pTransNo=$("#idTransNo").val();   
	var pRevNo=$("#idRevNo").val(); 
	var pDocType=$("#idDocType").val();  
	var pDesc=$("#idDesc").val(); 
	var pDepart=$("#idDepart").val(); 
	var pPreDate=$("#idPreDate").val(); 
	var pSubDate=$("#idSubDate").val(); 
	var pActType=$("#idActType").val(); 
	var pRepDate=$("#idRepDate").val(); 
	var pReply=$("#idReply").val();  
	var pStatus=$("#idStatus").val(); 
	var pRemarks=$("#idRemarks").val();  
	 
	var param = {
	 id:hid,
	 fromDepart:pFrom,  
	 toDepart:pTo, 
	 transmittalNo:pTransNo,
	 revNo:pRevNo,
	 documentType:pDocType,
	 description: pDesc,
	 department:pDepart,
	 preparationDate:setDateFormat(pPreDate) ,
	 submittalDate:setDateFormat(pSubDate),
	 actionType:pActType,
	 replyDate:setDateFormat(pRepDate) , 
	 reply:pReply,
	 status:pStatus ,
	 remarks:pRemarks 
	}
	 
	if(pFrom=='0')
	{
		flag=false;
		hata='From is Empty';
	}else if(pTo=='0')
	{
		flag=false;
		hata='To is Empty';
	}else if(pDepart=='0')
	{
		flag=false;
		hata='Department is Empty';
	}else if(pActType=='0')
	{
		flag=false;
		hata='Activity Type is Empty';
	}else if(pReply=='0')
	{
		flag=false;
		hata='Reply is Empty';
	}else if(pStatus=='0')
	{
		flag=false;
		hata='Status is Empty';
	}else if(hid.length<1) 
	{
		flag=false; hata='Please refresh';
		}
	else{
		flag=true;
		hata='';
	}
	 
  var ser_data = JSON.stringify(param);			
 if(flag){	
 
 var formData = getFiles();
 if (formData != null)
	{
	 
	 formData.append("jsonObjectData", ser_data + "");
		 
	$.ajax({
		type : "POST",
		contentType : false,
		processData : false,
		url : 'addTransLog2',
		data : formData,
		success : function(data) {
		 
			bildirim('success', data);
			getTransLog();
			 $("#btntranForm").html("<span class=icon-arrow-up></span> Save");
			 clearAll();
			   
		},
		error : function(data) {
			 if(data.status=='401')
					bildirim('warning',"You are not authorized");    
				 else 
               bildirim('warning',data);  

		}

	});
	}else {
		
		
		$.ajax({
			type : "POST",
			contentType : 'application/json; charset=UTF-8',
			url : "updateTransLog",
			data : ser_data,
			success : function(data) {
				bildirim('success', data);
				getTransLog(); 
				 $("#btntranForm").html("<span class=icon-arrow-up></span> Save");
				 clearAll();
			},
			error : function(data) {
				bildirim('error', data);
			}
			
		});
		
	}
    
	}
	else{bildirim('warning',hata);}

}

function clearAll()
{

	 $('#div1').find('select').prop('selectedIndex', 0);
	 $('#div1').find('select').trigger('change');
 
	 $("#idDesc").val(''); 
	 $("#idPreDate").val(''); 
	 $("#idSubDate").val('');  
	 $("#idRepDate").val('');  
	 $("#idRemarks").val(''); 
	 

}

function addTransLogs()
{
	var flag=true;
	var hata='';
	
	var pFrom=$("#idFrom").val();
	var pTo=$("#idTo").val(); 
	var pTransNo=$("#idTransNo").val();   
	var pRevNo=$("#idRevNo").val(); 
	var pDocType=$("#idDocType").val();  
	var pDesc=$("#idDesc").val(); 
	var pDepart=$("#idDepart").val(); 
	var pPreDate=$("#idPreDate").val(); 
	var pSubDate=$("#idSubDate").val(); 
	var pActType=$("#idActType").val(); 
	var pRepDate=$("#idRepDate").val(); 
	var pReply=$("#idReply").val();  
	var pStatus=$("#idStatus").val(); 
	var pRemarks=$("#idRemarks").val();  
	 
	var param = {
	 fromDepart:pFrom,  
	 toDepart:pTo, 
	 transmittalNo:pTransNo,
	 revNo:pRevNo,
	 documentType:pDocType,
	 description: pDesc,
	 department:pDepart,
	 preparationDate:setDateFormat(pPreDate) ,
	 submittalDate:setDateFormat(pSubDate),
	 actionType:pActType,
	 replyDate:setDateFormat(pRepDate) , 
	 reply:pReply,
	 status:pStatus ,
	 remarks:pRemarks 
	}
	 
	if(pFrom=='0')
	{
		flag=false;
		hata='From is Empty';
	}else if(pTo=='0')
	{
		flag=false;
		hata='To is Empty';
	}else if(pDepart=='0')
	{
		flag=false;
		hata='Department is Empty';
	}else if(pActType=='0')
	{
		flag=false;
		hata='Activity Type is Empty';
	}else if(pReply=='0')
	{
		flag=false;
		hata='Reply is Empty';
	}else if(pStatus=='0')
	{
		flag=false;
		hata='Status is Empty';
	}else {
		flag=true;
		hata='';
	}
	 
  var ser_data = JSON.stringify(param);			
 if(flag){	
 
 var formData = getFiles();
 if (formData != null)
	{
	 console.log("filevar");
	 formData.append("jsonObjectData", ser_data + "");
		 
	$.ajax({
		type : "POST",
		contentType : false,
		processData : false,
		url : 'addTransLog2',
		data : formData,
		success : function(data) {
		 
			bildirim('success', data);
			getTransLog();
			clearAll();
			   
		},
		error : function(data) {
			 if(data.status=='401')
					bildirim('warning',"You are not authorized");    
				 else 
               bildirim('error',data);  

		}

	});
	}else {
		
		
		$.ajax({
			type : "POST",
			contentType : 'application/json; charset=UTF-8',
			url : "addTransLog",
			data : ser_data,
			success : function(data) {
				bildirim('success', data);
				getTransLog();
				clearAll();
			},
			error : function(data) {
				 if(data.status=='401')
						bildirim('warning',"You are not authorized");    
					 else 
	                  bildirim('error',data);  
			}
			
		});
		
	}
    
	}
	else{bildirim('warning',hata);}

}

function getFiles() {

	input = document.getElementById('transFile');
	var data = new FormData();
	var fileNames = [];
	var files = [];
	if (!input) {
		return null;
	} else if (!input.files) {
		return null;
	} else if (!input.files[0]) {
		return null;
	} else {

		for (var i = 0; i < input.files.length; i++) {
			fileNames[i] = input.files[i].name;
			data.append('file', input.files[i]);
		}
		data.append('name', fileNames);

	}

	return data;
}


function getTransVariants() {
   
	$.ajax({
		type : "GET",  
		url : 'getTransVariant',   
		success : function(data) {

			var list = '<option value="0">Select ..</option> ';
			var list1 = '<option value="0">Select ..</option> ';
			var list2 = '<option value="0">Select ..</option> ';
			var s='';
			$(data).each(
					function(i, val) {

						s= '<option value="' + val.id + '">' + val.description + '</option> ';
						if(val.type=='Action Type')
						{list = list +s;}
						else if (val.type=='Reply') 
						{list1 = list1 +s;}
						else if (val.type=='Status') 
						{list2 = list2 +s;}

					});
			$('#idActType').html(list);
			$('#idReply').html(list1);
			$('#idStatus').html(list2);
		},
		error : function(data2) {
			bildirim('information', 'please refresh this page ');
		},

	});

}


function getDepDocType() {
  
	var param = {
		department : $("#idDepart").val()
	}
	var ser_data = JSON.stringify(param);
	$.ajax({
		type : "POST",
		contentType : 'application/json; charset=UTF-8',
		url : 'getDepDocType',
		data : ser_data,
		success : function(data) {

			var list = '<option value="0">Select ..</option> ';

			$(data).each(
					function(i, val) {

						list = list + '<option value="' + val.id + '">'
								+ val.docCode + '</option> ';

					});
			$("#idDocType").html(list);
		},
		error : function(data2) {
			bildirim('information', 'please refresh this page ');
		},

	});

}


function getDepartments() {

	$.ajax({
		type : "GET",
		url : 'getDepartments',
		success : function(data) {
			tmpData = JSON.parse(JSON.stringify(data));
			var list = '<option value="0">Select ..</option> ';

			$(data).each(
					function(i, val) {

						list = list + '<option value="' + val.id + '">'
								+ val.department + '</option> ';

					});
			$("#idFrom").html(list);
			$("#idTo").html(list); 
			$("#idDepart").html(list);
		},
		error : function(data) {
			bildirim('error', 'get department error ');
		}

	});

} 
/*
function getDocTypes() { 

	$.ajax({
		type : "GET",
		url : 'getDocumentTypes',
		success : function(data) {
			tmpData = JSON.parse(JSON.stringify(data));
			var list = '<option value="0">Select ..</option> ';

			$(data).each(
					function(i, val) {

						list = list + '<option value="' + val.id + '">'
								+ val.docType + '</option> ';

					});
			
			$("#idDocType").html(list);  
		
		},
		error : function(data) {
			bildirim('error', 'get document type error '); 
		}

	});

}*/
function createFileTable(pId) {
	 
	
	var param = {
			parityId : pId,
			parityType:'transmittalLog',
			personalId:pId
		}
		var ser_data = JSON.stringify(param);
		 
	$.ajax({
		type : "POST",
		contentType : 'application/json; charset=UTF-8',
		url : 'getPersonalFiles',
		data : ser_data,
		success : function(data) {

			
			var listBody = "";
			$(data).each(
					function(i, val) {				
						
						var download = ' <a href="getPersonalFile/'+val.id+'"><button type="button"  class="btn btn-default btn-icon"><span class="fa fa-cloud-download"></span></button></a>';	
												
						var j = i+1; 
						listBody = listBody + '<tr><td>' + j + '</td><td>'
						+ val.clientFileName + '</td><td>'						
						+download+'</td><td>'
						+'<button  type="button" onclick="deleteTrainingFile(this,'+val.id+')" class="btn btn-default btn-icon"><span class="fa fa-times"></span></button> </td></tr>';
					});
			
			$("#FileTable").html(listBody); 
		},
		error : function(data) {
			bildirim('error',  'Open file list  Error ');
		}

	});


	
}

function deleteTrainingFile(ctl,pId){
	
	
	  var param = {
				id : pId
			}
	 var ser_data = JSON.stringify(param);
			$.ajax({
				type : "POST",
				contentType : 'application/json; charset=UTF-8',
				url : 'deletePersonelFile',
				data : ser_data,
				success : function(data) {
					bildirim('success',  'Delete File Succes');
					$(ctl).parents("tr").remove();
				},
				error : function(data) {

					 if(data.status=='401')
							bildirim('warning',"You are not authorized");    
						 else   
					bildirim('error', 'Delete File Error');
				}

	});
	
}


$('#idSubDate').on('click', function(e) {
	 
	var x=$('#idPreDate').val()+'';
	if(x.length>0)
	{ $('#idSubDate').datetimepicker("minDate", x);  
		 $('#idSubDate').val("");}
 }); 
$('#idRepDate').on('click', function(e) {
	 
	var x=$('#idSubDate').val()+'';
	if(x.length>0)
	{  $('#idRepDate').datetimepicker("minDate", x);  
		 $('#idRepDate').val("");}
 }); 

function openDocType(){
	
	$("#docTypeContent").load( "documentType  #docTypeContainer",function(){
		getDocTypeDepartments();
		getDocumentTypes();
	} ); 
	
}

$('#modal-docType').on('hidden.bs.modal', function () {
	
	getDepDocType();
	});

function setDateFormat(date) { //01/02/2011 ->2011/02/01
	
	if(date.length>3)
	{	
	var newdate = date.split("/");
	date=newdate[2]+'-'+newdate[1]+'-'+newdate[0];}
	else{date=null;}
	return date;
	}

function setDateFormatR(date) { // 2011/02/01-> 01/02/2011
	
	if(date.length>3)
	{	
	var newdate = date.split("-");
	date=newdate[2]+'/'+newdate[1]+'/'+newdate[0];}
	else{date='';}
	return date;
	}

 

function uploadExcel()
{
	var formData=getExcel();
	
	  param = { user: ''}	
	  var ser_data = JSON.stringify(param);
 
	if (formData != null)
	{  
		 formData.append("jsonObjectData", ser_data + "");	
		 
		// app.loading('show',{value: [0,100],speed: 100,state: 'success'});
		 
		  $('#statusbar_22').val('Uploading...Please wait until loaded');          
         if($('#statusbar_2').is(":hidden")) $('#statusbar_2').fadeIn();    
		
		$.ajax({
			type : "POST",
			contentType : false,
			processData : false,
			url : 'uploadExcel',
			data : formData, 
			success : function(data) {
				
				 
					 bildirim('success', data);  
					 getTransLogRep();
					 getTransLog();
				  
				 $(".app-statusbar").hide(); 
			},
			error : function(data) { 
			
				 $(".app-statusbar").hide(); 
				 
				 if(data.status=='401')
					bildirim('warning',"You are not authorized");    
				 else 
                  bildirim('warning',data);    
			}

		});
	}
	else {
		bildirim('warning', 'Please select Excel file'); 
	}
}

function getExcel() {

	input = document.getElementById('browseExcel');
	var data = new FormData();
	var fileNames = [];
	var files = [];
	if (!input) {
		return null;
	} else if (!input.files) {
		return null;
	} else if (!input.files[0]) {
		return null;
	} else {

	 fileNames[0] = input.files[0].name;
	 data.append('file', input.files[0]);
	 data.append('name', fileNames);

	}

	return data;
}

function openBrowse(){
	 var div1 = document.getElementById("impExcl1");
	 var div2 = document.getElementById("impExcl2");
	 div1.style.display = "none";
	 div2.style.display = "block";
	 getTransLogRep();
	 
	
}
function closeBrowse(){
	
	var div1 = document.getElementById("impExcl1");
	var div2 = document.getElementById("impExcl2");
	 div1.style.display = "block";
	 div2.style.display = "none";
}


function openRepTable(){

	var div1 = document.getElementById("repTable"); 
	var div11 = document.getElementById("repTable1"); 
	 div1.style.display = "block"; 
	 div11.style.display = "block"; 
}

function closeRepTable(){
	
	var div1 = document.getElementById("repTable");  
	var div11 = document.getElementById("repTable1"); 
	 div1.style.display = "none"; 
	 div11.style.display = "none"; 
}


function getTransLogRep() {
  
	 app.loading('show',{value: [0,100],speed: 10,state: 'success'});
	$.ajax({
				type : "GET",
				contentType : 'application/json; charset=UTF-8',
				url : 'getTransLogRep',
				success : function(data) { 
					if(data.length>0){openRepTable();}
					app.loading('destroy'); 
					$('#transTableRep')
							.DataTable(
									{
										"searching": false,
										"info":false, 
										"bLengthChange": false,
										"bDestroy" : true,
										"aaData" : data,
										"columns" : [ 
												{
													"data" : null
												}, 
												{
													"data" : null
												},
												{
													"data" : 'serialNumber'
												},
												{
													"data" : 'fromDepart'
												},
												{
													"data" : 'toDepart'
												},
												{
													"data" : 'transmittalNo'
												},
												{
													"data" : null
												},
												{
													"data" : 'documentType'
												},
												{
													"data" : 'description'
												},
												{
													"data" : 'department'
												},
												{
													"data" : 'preparationDate'
												},
												{
													"data" : 'submittalDate'
												},
												{
													"data" : 'actionType'
												},
												{
													"data" : 'replyDate'
												},
												{
													"data" : 'reply'
												},
												{
													"data" : 'status'
												},
												{
													"data" : 'remarks'
												}
												],  
									"aoColumnDefs" : [  {
										
										"aTargets" : [ 1 ],
										"mRender" : function(data, type, full) {
										 return  '<div style="width: 300px">'+ data.result +'</div>';
									}},  {
										
										"aTargets" : [ 6 ],
										"mRender" : function(data, type, full) {
										 return  ('00'+data.revNo).slice(-2);
									}},{
										
										"aTargets" : [ 0 ],
										"mRender" : function(data, type, full) {
											if(data.resultaction==1)
											{ return  '<button type="button" onclick="acceptReportImport(this,'+data.id+')" class="btn btn-success btn-xs" >Accept</button>'+
											'<button type="button" onclick="acceptReportDelete(this,'+data.id+')" class="btn btn-danger  btn-xs" >Ignore </span></button>';}
											else if(data.resultaction==2)
											{ return '<button type="button" onclick="acceptReportDelete(this,'+data.id+')" class="btn btn-danger btn-xs" >Ignore </button>';}
											else if(data.resultaction==3)
											{ return '<button type="button" onclick="activeTransLogRep(this,'+data.id+','+data.serialNumber+')" class="btn btn-info btn-xs" >Active</button>'+
												'<button type="button" onclick="acceptReportDelete(this,'+data.id+')" class="btn btn-danger  btn-xs" >Ignore </span></button>';}
										    else return'';
									}}
									]
									});
				},
				error : function(data2) { 
					app.loading('destroy'); 
				},

			});

}

function activeTransLogRep(ctl,pId,sn)
{
	var param = {
			id : pId,
			serialNumber:sn
		}
		var ser_data = JSON.stringify(param);
		$.ajax({
			type : "POST",
			contentType : 'application/json; charset=UTF-8',
			url : 'activeTransLogRep',
			data : ser_data,
			success : function(data) {
				bildirim('success', data); 
				$(ctl).parents("tr").remove();
			},
			error : function(data) {
				bildirim('error', data); 
			}

		});
}

function acceptReportImport(ctl,pId)
{
	var param = {
			id : pId
		}
		var ser_data = JSON.stringify(param);
		$.ajax({
			type : "POST",
			contentType : 'application/json; charset=UTF-8',
			url : 'importTransLogRep',
			data : ser_data,
			success : function(data) {
				bildirim('success', data); 
				$(ctl).parents("tr").remove();
			},
			error : function(data) {
				bildirim('error', data); 
			}

		});
}


function acceptReportDelete(ctl,pId)
{
	var param = {
			id : pId
		}
		var ser_data = JSON.stringify(param);
		$.ajax({
			type : "POST",
			contentType : 'application/json; charset=UTF-8',
			url : 'deleteTransLogRep',
			data : ser_data,
			success : function(data) {
				bildirim('success', data); 
				$(ctl).parents("tr").remove();
			},
			error : function(data) {
				 if(data.status=='401')
						bildirim('warning',"You are not authorized");    
					 else 
	               bildirim('error',data);   
			}

		});
}

function allimportTransLogRep() {
	
	  $('#statusbar_22').val('Accepting...Please wait until loaded');          
      if($('#statusbar_2').is(":hidden")) $('#statusbar_2').fadeIn();    
      
	$.ajax({ type : "GET",
				contentType : 'application/json; charset=UTF-8',
				url : 'allimportTransLogRep',
				success : function(data) {
					bildirim('success', data); 
					$(".app-statusbar").hide(); 
					getTransLogRep();
				},
				error : function(data2) {
					bildirim('error', data); 
					$(".app-statusbar").hide(); 
					getTransLogRep();
					
				},

			});

}
function alldeleteTransLogRep() {
	
	  $('#statusbar_22').val('Deleting...Please wait until loaded');          
      if($('#statusbar_2').is(":hidden")) $('#statusbar_2').fadeIn();    
	$.ajax({ type : "GET",
				contentType : 'application/json; charset=UTF-8',
				url : 'alldeleteTransLogRep',
				success : function(data) {
					bildirim('success', data); 
					$(".app-statusbar").hide(); 
					getTransLogRep();
				},
				error : function(data2) {
					
					 if(data.status=='401')bildirim('warning',"You are not authorized");    
					 else bildirim('error',data);  
					 
					 
					$(".app-statusbar").hide(); 
					getTransLogRep();
					
				},

			});

}


