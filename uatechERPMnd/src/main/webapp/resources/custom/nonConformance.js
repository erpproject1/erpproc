$(document).ready(function() {
	  
// alert( $('#hidPermiss').val());
	/* $('#correction option').each(function(){
		 alert($(this).val());
		 alert($(this).html());
		 });*/
	setTimeout(function(){  
		getNonConformance();
		 getDicipline();
		 getDepartments();
	    }, 100);

	 
	
});

 
function nonConfSet()
{
	window.open("nonConformanceSet", "_blank");
	}

function allItemClear()
{ 
	 $('#stepDiv').find('select').prop('selectedIndex', 0);
	 $('#stepDiv').find('select').trigger('change');
	 $('#stepDiv').find('textarea').val('');
	 $("#nonDate").val('');
	 $("#actCloseDate").val('');
}
 
function createNew()
{
	 $('#stepDiv').show();
	 $('#hid1').val(1);
	 $('#hid2').val(1);
	 $('#wizard').find(".actionBar").hide();
	 
	 $('#createNew').attr("disabled", true); 
	 
	 $('#originatorDesc').val($('#originatorDesc2').val());
	 
	 $('#recordNumber').html('<h2>New Record</h2>'); 
	 allItemClear();
	 nowlevel(1);
	 closeAndExpand(10); 
}


function showStep(step)
{
	 $('#stepDiv').show(); 
	 $('#wizard').find(".actionBar").css("display","none");//alttaki action bar kapat
	 
	 nowlevel(step);
	 closeAndExpand(10); 
     
}


function nowlevel(lev)
{
	
	clearStepAll();	
	
	 var lvl=parseInt(lev);
	 $('#step-1').hide();
	 $('#step-8').hide();
	
	 for (i = 1; i <lvl+1; i++) { 

		    //$('#wizard').find("a[rel="+here+"]").removeClass("selected").removeClass("disabled").addClass("done");//bulundugu sekme
		    $('#wizard').find("a[rel="+(i-1)+"]").removeClass("selected").addClass("active done");// ileriki sekme
		    $('#wizard').find("a[rel="+i+"]").removeClass("disabled").removeClass("done").addClass("selected");// ileriki sekme
			$('#wizard').find("a[rel="+i+"]").parent("li").prev("li").find("a").addClass("active");
			$('#ileri'+i).attr("disabled", false);
			
			  
	 } 
	 $('#step-'+lvl).show();
	 $('#ileri'+lvl).attr("disabled", true);
	 $('#btnSave'+lvl).show();
	 
	 $('#hid1').val(lvl);
	 $('#hid2').val(lvl);
}

function clearStepAll()
{
	for (i = 1; i <8; i++) { 

	    $('#wizard').find("a[rel="+i+"]").removeClass("selected").removeClass("active done").removeClass("done").addClass("disabled");// ileriki sekme
	    $('#step-'+i).hide();	 
	    $('#ileri'+i).attr("disabled", true);
	    $('#btnSave'+i).hide();
 } 	
}


 function nextt(a) {
	 
    var sum=$('#wizard').find("ul > li").length+1;	
     
	var here=parseInt($('#hid1').val());
	var nxt=here+1;
	if(here<sum)
	{ 
	$('#wizard').find("a[rel="+here+"]").removeClass("selected").removeClass("disabled").addClass("done");//bulundugu sekme
    $('#wizard').find("a[rel="+nxt+"]").removeClass("disabled").removeClass("done").addClass("selected");// ileriki sekme
	$('#wizard').find("a[rel="+nxt+"]").parent("li").prev("li").find("a").addClass("active");
	 
	 $('#step-'+here).hide();
	 $('#step-'+nxt).show();
	 $('#hid1').val(nxt);
	 $('#hid2').val(nxt);
	}
}

 function backk(a) {
 
    var here=parseInt($('#hid1').val());
	var bck=here-1;
	if(bck>0)
	{	
	var end=parseInt($('#hid2').val());
    $('#wizard').find("a[rel="+bck+"]").removeClass("done").removeClass("selected").addClass("active selected");// geriki sekme
   // $('#wizard').find("a[rel="+end+"]").removeClass("selected").addClass("disabled");//bulundugu sekme
 
	 
	 $('#step-'+here).hide();
	 $('#step-'+bck).show();
	 $('#hid1').val(bck);
	}
	 
}  

 function getNonConformance() {

	  $('#nCTable').pleaseWait(); 
		 param = {
					id :0
			    }
		var ser_data = JSON.stringify(param); 
		
		$.ajax({
			type : "POST",
			contentType : 'application/json; charset=UTF-8',
			data : ser_data,
			url : 'getNonConformance',
			success : function(data) { 
			  
				 
			 $('#nCTable').DataTable(
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
										"data" : 'statementNCR'
									},
									{
										"data" : 'reference'
									},
									{
										"data" : null
									},
									{
										"data" : null
									}, 
									{
										"data" : 'repetedNCR'
									},
									{
										"data" : 'grading'
									},
									{
										"data" : null
									},
									{
										"data" : 'dep.department'
									},
									{
										"data" : 'discipline.description'
									},
									{
										"data" : null
									}],

							"aoColumnDefs" : [{ 
								"aTargets" : [ 8],  
								"mRender" : function(data, type, full) { 
									return  (data.per.name +' '+ data.per.lastName) ;
								}
							} ,{ 
								"aTargets" : [ 4],  
								"mRender" : function(data, type, full) { 
									return  setDateFormatR(data.statementDate);
								}
							} ,{ 
								"aTargets" : [ 5 ],  
								"mRender" : function(data, type, full) {
									if(data.source.includes('Other')) 
									 return data.sourceReason ;
									else  return data.source ;
								}
							} ,{ 
								"aTargets" : [ 0 ],  
								"mRender" : function(data, type, full) {
									 return '<a class="btn btn-default btn-icon" onclick="showNonConformance(this,'+data.id+')" data-toggle="tooltip" data-placement="top" title="Show This Record"><i class="fa fa-search"></i></a>' ;
								}
							} 
							,{ 
								"aTargets" : [ 11 ],  
								"mRender" : function(data, type, full) {
									 return ' <button type="button"  onclick="getNonConfFiles2('+data.id+')" class="btn btn-default btn-icon" data-toggle="modal" data-target="#modal-File2" ><span class="fa fa-cloud-download"></span></button>';
								}
							} 
							] 
						});//onclick="deleteFormAuthorized(this,'+data.id+')" href="reports/'+data.id+'"
			//'
			 $('#nCTable_length').append('<button  type="button" onclick="getNonConformance()"  class="btn btn-default btn-icon "  title="REFRESH"><span class="icon-sync"></span></button>');
			 $('#nCTable').pleaseWait('stop'); 
			},
			error : function(data) {
			  $('#nCTable').pleaseWait('stop'); 
				 
			}

		});
		

	} 
 
 function showNonConformance(ths,pid){
	 
   $('#conteyner').pleaseWait(); 
   
   allItemClear();
   
	 param = {
				id :pid
		    }
	var ser_data = JSON.stringify(param); 
	
	$.ajax({
		type : "POST",
		contentType : 'application/json; charset=UTF-8',
		data : ser_data,
		url : 'showNonConformance',
		success : function(data) {  
		  
			$("#hidNCRID").val(data.id); 
			$('#recordNumber').html('<h2 style="color:red" >Record Number: '+data.id+' </h2>');
			
			var step= parseInt(data.step);
			 
			if(step>0)
			{ 
				 $("#stateNonCon").val(data.statementNCR);
			 	 $("#reference").val(data.reference);
			     $("#nonDate").val(setDateFormatR(data.statementDate)); 
			 	 $("#source").val(data.source).trigger("change");
			 	 $("#repeted").val(data.repetedNCR).trigger("change");  
			 	 $("#grading").val(data.grading).trigger("change");   
			 	 $("#originatorDesc").val(data.per.name+' '+data.per.midName+' '+data.per.lastName); 
			 	 $("#department").val(data.departmentId).trigger("change");
			 	 $("#discipline").val(data.disciplineId).trigger("change"); 
			 	 //$('#source').prop('disabled', true);
			}

			if(step>1)
			{  
			 	 $("#nonConStep2").val(data.confirmation).trigger("change"); 
			 	 $("#justifStep2").val(data.confirmationReason);  
			}

			if(step>2)
			{  
			 	 $("#correction").val(data.correction).trigger("change"); 
			 	 $("#correcDetail").val(data.correctionDetail);  
			 	 $("#proCorAction").val(data.proposedCorAct);  
			 	 $("#actCloseDate").val(setDateFormatR(data.actionCloseDate));   
			}
			if(step>3)
			{  
			 	 $("#statusStep4").val(data.review).trigger("change"); 
			 	 $("#justifStep4").val(data.reviewReason);   
			}
			if(step>4)
			{  
			 	 $("#rootCauseAnalysis").val(data.rootCausesAnalysis); 
			 	 $("#correctiveActions").val(data.correctiveActions);   
			}

			if(step>5)
			{  
			 	 $("#statusStep6").val(data.evaluation).trigger("change"); ; 
			 	 $("#justifStep6").val(data.evaluationReason);   
			}

			if(step>6)
			{  
			 	 $("#statusStep7").val(data.clientEvaluation).trigger("change"); ; 
			 	 $("#justifStep7").val(data.clientEvaluationReason);   
			}
			 
			 step=step+1;
			showStep(step);
			 
		  $('#conteyner').pleaseWait('stop'); 
		},
		error : function(data) { 

		  $('#conteyner').pleaseWait('stop'); 
		}

	});
	 
 }
 
 function btnSave(number)
 {
	    var flag=true;
		var hata='';
		
	 	if(number==1)
	 	{
	 		 
	 	var pstateNonCon=$("#stateNonCon").val();
	 	var preference=$("#reference").val();
	 	var pnonDate=$("#nonDate").val(); 
	 	var psource=$("#source").val();   
	 	var prepeted=$("#repeted").val(); 
	 	var pgrading=$("#grading").val();  
	 	var poriginator=$("#originator").val(); 
	 	var pdepartment=$("#department").val(); 
	 	var pdiscipline=$("#discipline").val();  
	 	 
	 	var param = { 
	 			statementNCR:pstateNonCon,
	 			reference:preference,
	 			statementDate:setDateFormat(pnonDate),
	 			source:psource,
	 			sourceReason:psource,
	 			repetedNCR:prepeted,
	 			grading:pgrading,
	 			originator:poriginator,
	 			departmentId:pdepartment,
	 			disciplineId:pdiscipline,
	 			step:1,
	 			stepnumber:1
	 			
	 	}
	 	 
	 	if(pstateNonCon!=null&&pstateNonCon.length<1)
	 	{
	 		flag=false;
	 		hata='Statement Of Non-Conformity is Empty';
	 		
	 	}else if(preference!=null&&preference.length<1) 
	 	{
	 		flag=false;
	 		hata='Preference is Empty';
	 		
	 	}else if(pnonDate!=null&&pnonDate.length<10) 
	 	{
	 		flag=false;  
	 		hata='Please select Date  ';
	 		
	    }else if(psource=='0') 
	 	{
	 		flag=false;  
	 		hata='Please select Source  ';
	 		
	    }else if(pgrading=='0') 
	 	{
	 		flag=false;  
	 		hata='Please select Grading  ';
	 		
	    }else  if(pdepartment=='0')
	 	{
	 		flag=false;  
	 		hata='Please select  Department  ';
	 		
	    }else if(pdiscipline=='0')
	 	{
	 		flag=false;  
	 		hata='Please select Discipline ';
	    }
	 	else{
	 		flag=true;
	 		hata='';
	 	}
	 	 
	 	addNonConformance(param,flag,hata,1);
	   
	 	}//step1	 	
	 	
	 	else if(number==2)
	 	{
	 		var pnonConStep2=$("#nonConStep2").val(); 
	 		var pjustifStep2=$("#justifStep2").val()+'';
	 		var pId=$("#hidNCRID").val();
	 		 
	 		var param = { 
		 			id:pId,
		 			confirmation:pnonConStep2,
		 			confirmationReason:pjustifStep2,
		 			step:2,
		 			stepnumber:2
		 	}
		 	 
	 	   if(pnonConStep2=='0') 
	 	 	{
	 	 		flag=false;  
	 	 		hata='Please select Non conformance  ';
	 	 		
	 	    }else if(pnonConStep2=='No'&& pjustifStep2.length<1){
	 	    	flag=false;  
	 	 		hata='Justification is empty';
	 	    }
	 	    else{
		 		flag=true;
		 		hata='';
		 	}
	 		
	 		if(pId!=null&&pId.length>0)
	 		{
	 			addNonConformance(param,flag,hata,2);
	 			}
	 		else bildirim('error','Please Page refresh'); 
	 		
	  }//step2
	 	
	 	else if(number==3)
	 	{
	 		var pcorrection=$("#correction").val(); 
	 		var pcorrecDetail=$("#correcDetail").val(); 
	 		var pproCorAction=$("#proCorAction").val();
	 		var pactCloseDate=$("#actCloseDate").val();
	 		 
	 		var pId=$("#hidNCRID").val();
	 		
	 	 
	 		var param = { 
		 			id:pId,
		 			correction:pcorrection,
		 			correctionDetail:pcorrecDetail,
		 			proposedCorAct:pproCorAction,
		 			actionCloseDate:setDateFormat(pactCloseDate),
		 			step:3,
		 			stepnumber:3
		 	}
		 	 
	 	   if(pcorrection=='0') 
	 	 	{
	 	 		flag=false;  
	 	 		hata='Please select  Correction  ';
	 	 		
	 	    }else if(pcorrecDetail!=null&&pcorrecDetail.length<1){
	 	    	
	 	    	flag=false;  
	 	 		hata='Correction Detail is empty';
	 	 		
	 	    }else if(pproCorAction!=null&&pproCorAction.length<1){
	 	    	
	 	    	flag=false;  
	 	 		hata='Proposed Corrective Action is empty';
	 	 		
	 	    }else if(pactCloseDate!=null&&pactCloseDate.length<10) 
		 	{
		 		flag=false;  
		 		hata='Please select Action Close Date  ';
		 		
		    }
	 	    else{
		 		flag=true;
		 		hata='';
		 	}
	 		
	 		if(pId!=null&&pId.length>0)
	 		{
	 			addNonConformance(param,flag,hata,3);
	 			}
	 		else bildirim('error','Please Page refresh'); 
	 		
	  }//step3

	 	else if(number==4)
	 	{
	 		var pstatusStep4=$("#statusStep4").val(); 
	 		var pjustifStep4=$("#justifStep4").val();  
	 		 
	 		var pId=$("#hidNCRID").val();
	 		
	 	 
	 		var param = { 
		 			id:pId,
		 			review:pstatusStep4,
		 			reviewReason:pjustifStep4, 
		 			step:4,
		 			stepnumber:4
		 	}
		 	 
	 	   if(pstatusStep4=='0') 
	 	 	{
	 	 		flag=false;  
	 	 		hata='Please select  Statu  ';
	 	 		
	 	    } else if(pstatusStep4=='No'&& pjustifStep4.length<1){
	 	    	flag=false;  
	 	 		hata='Justification is empty';
	 	    }
	 	    else{
		 		flag=true;
		 		hata='';
		 	}
	 		
	 		if(pId!=null&&pId.length>0)
	 		{
	 			addNonConformance(param,flag,hata,4);
	 			}
	 		else bildirim('error','Please Page refresh'); 
	 		
	  }//step4

	 	else if(number==5)
	 	{
	 		var prootCauseAnalysis=$("#rootCauseAnalysis").val(); 
	 		var pcorrectiveActions=$("#correctiveActions").val();  
	 		 
	 		var pId=$("#hidNCRID").val();
	 		
	 	 
	 		var param = { 
		 			id:pId,
		 			rootCausesAnalysis:prootCauseAnalysis,
		 			correctiveActions :pcorrectiveActions,
		 			step:5,
		 			stepnumber:5
		 	}
		 	 
	 	   if(prootCauseAnalysis==null||prootCauseAnalysis.length<1) 
	 	 	{
	 	 		flag=false;  
	 	 		hata='Root-Cause Analysis is empty ';
	 	 		
	 	    } else if(pcorrectiveActions==null||pcorrectiveActions.length<1) {
	 	    	flag=false;  
	 	 		hata='Corrective Actions is empty';
	 	    }
	 	    else{
		 		flag=true;
		 		hata='';
		 	}
	 		
	 		if(pId!=null&&pId.length>0)
	 		{
	 			addNonConformance(param,flag,hata,5);
	 			}
	 		else bildirim('error','Please Page refresh'); 
	 		
	  }//step5

	 	else if(number==6)
	 	{
	 		var pstatusStep6=$("#statusStep6").val(); 
	 		var pjustifStep6=$("#justifStep6").val();  
	 		 
	 		var pId=$("#hidNCRID").val();
	 		
	 	 
	 		var param = { 
		 			id:pId,
		 			evaluation:pstatusStep6,
		 			evaluationReason:pjustifStep6, 
		 			step:6,
		 			stepnumber:6
		 	}
		 	 
	 	   if(pstatusStep6=='0') 
	 	 	{
	 	 		flag=false;  
	 	 		hata='Please select  Statu  ';
	 	 		
	 	    } else if(pstatusStep6=='No'&& pjustifStep6.length<1){
	 	    	flag=false;  
	 	 		hata='Justification is empty';
	 	    }
	 	    else{
		 		flag=true;
		 		hata='';
		 	}
	 		
	 		if(pId!=null&&pId.length>0)
	 		{
	 			addNonConformance(param,flag,hata,6);
	 			}
	 		else bildirim('error','Please Page refresh'); 
	 		
	  }//step6
	  
	 
	 	else if(number==7)
	 	{
	 		var pstatusStep7=$("#statusStep7").val(); 
	 		var pjustifStep7=$("#justifStep7").val();  
	 		 
	 		var pId=$("#hidNCRID").val();
	 		
	 	 
	 		var param = { 
		 			id:pId,
		 			clientEvaluation:pstatusStep7,
		 			clientEvaluationReason:pjustifStep7, 
		 			step:7,
		 			stepnumber:7
		 	}
		 	 
	 	   if(pstatusStep7=='0') 
	 	 	{
	 	 		flag=false;  
	 	 		hata='Please select  Statu  ';
	 	 		
	 	    } else if(pstatusStep7=='No'&& pjustifStep7.length<1){
	 	    	flag=false;  
	 	 		hata='Justification is empty';
	 	    }
	 	    else{
		 		flag=true;
		 		hata='';
		 	}
	 		
	 		if(pId!=null&&pId.length>0)
	 		{
	 			addNonConformance(param,flag,hata,7);
	 			}
	 		else bildirim('error','Please Page refresh'); 
	 		
	  }//step7
	  
	 
 }
 
 
 function addNonConformance(param,flag,hata,n)
 {
	 var ser_data = JSON.stringify(param);			
	
	 var formData = getFiles('nonFile'+n);
	 
	 if (formData != null)
		{ 
		 formData.append("jsonObjectData", ser_data + "");
		}
	 else 
	 {
		 formData = new FormData();
		 formData.append('file', null);
		 formData.append('name', null);
         
         formData.append("jsonObjectData", ser_data + "");
	 }
	 
	 
	    
	   if(flag){	
	  
		   $('#stepDiv').pleaseWait(); 
		   $.ajax({
			    type : "POST",
				contentType : false,
				processData : false,
				url : "addNonConformance",
				data : formData,
				success : function(data) {
					if(n==1)
					{$("#hidNCRID").val(data);}
				 
					 bildirim('success', 'Save Success'); 
					 $('#stepDiv').pleaseWait('stop'); 
					 
					 getNonConformance();
					 closeAndExpand(11);
				},
				error : function(data) {
					 if(data.status=='401')
							bildirim('warning',"You are not authorized");    
						 else 
		                  bildirim('error','Error try again later');  
					 
					 $('#stepDiv').pleaseWait('stop');  
				}
				
			});
		    
	     
	 	}
	 	else{ 
	 		bildirim('warning',hata);
	 	}
	   
		 
	 
 }

 var orderAttach;
 var orderAttachDesc;
 function getCheckValue(x,y)
 {
	 _row = $(x).parents("tr");
	 var cols = _row.children("td");
	 var filename=$(cols[2]).text();
	 var a=$(x).is(':checked') ? 1 : 0;
	 if(a==1)
		 {
		 orderAttach.push(y);
		 orderAttachDesc.push(filename);
		  
		 }
	 else{
		 for (var i = 0; i < orderAttach.length; i++) {
			 if(orderAttach[i]==y)
			 {
				 orderAttach.splice(i, 1);  
			 }
		   }
		 for (var i = 0; i < orderAttachDesc.length; i++) {
			 if(orderAttachDesc[i]==filename)
			 {
				 orderAttachDesc.splice(i, 1);  
			 }
		  }
	     }
	 document.getElementById("sirasi").innerHTML = 'File Order : '+orderAttachDesc; 
 }
 function getNCRreport(vl){
	  
	 var arry ='0,'+orderAttach;
	 
	/* $('#FileTable2 tr td input[type=checkbox]').each(function() {
		     var a=$(this).is(':checked') ? 1 : 0;
		     
		     if(a==1)   {  arry=arry+','+ $(this).val() ;   }
		});*/
	 
	 window.location.href = 'NCRreports?id='+vl+'&fList='+arry; 
	 
 }
 
 
 function getNonConfFiles2(vl) {

     orderAttach=[];//ek dosya sırası için
     orderAttachDesc=[];//ek dosya sırası için
     
	 		pId=vl+'';  
	     
	    	var param = {
		        parityId : pId,
				parityType:'nonConformance',
				personalId:pId
			}
			var ser_data = JSON.stringify(param);
	    	
	    	 $('#modal-File2').pleaseWait(); 	 
	    	
	    	$.ajax({
			type : "POST",
			contentType : 'application/json; charset=UTF-8',
			url : 'getPersonalFiles', 
			data : ser_data,
			success : function(data) {
 
		    	console.log('girdi2');
				var listBody = "";
				$(data).each(
						function(i, val) {				
							
							var download = ' <a href="getPersonalFile/'+val.id+'"><button type="button"  class="btn btn-default btn-icon"><span class="fa fa-cloud-download"></span></button></a>';	
													
							var j = i+1; 
							listBody = listBody + '<tr><td> <input type="checkbox" name="app-checkbox-1" onclick="getCheckValue(this,'+val.id+')" >  </td><td>'+ j + '</td><td>'
							+ val.clientFileName + '</td><td>'						
							+ download+'</td><td>';
						 	});

				$("#FileTable2").html(listBody); 
				$("#modalButton").html('<p id="sirasi"></p><button class="btn btn-default" data-dismiss="modal">Close</button> <button class="btn btn-success" data-dismiss="modal" onclick="getNCRreport('+vl+')">View</button>'); 
				
			    $('#modal-File2').pleaseWait('stop'); 	 
			    
			},
			error : function(data) {
				
				$("#FileTable2").html(''); 

				$('#modal-File2').pleaseWait('stop'); 
				
				bildirim('error',  'Open file list  Error ');
			}

		});


		 
	    
	}
 
function getNonConfFiles(vl) {
	 
	 	console.log(vl);
	 	
	    var pId=null
	 	
	    if(vl>0)  {  pId=vl+'';}
	    else {pId=$("#hidNCRID").val();}
	    
	    if(pId!=null&&pId.length>0)
		{ 
	    	console.log('girdi1');
	    	var param = {
		        parityId : pId,
				parityType:'nonConformance',
				personalId:pId
			}
			var ser_data = JSON.stringify(param);
	    	 $('#modal-clean').pleaseWait(); 	 
	    	
		$.ajax({
			type : "POST",
			contentType : 'application/json; charset=UTF-8',
			url : 'getPersonalFiles', 
			data : ser_data,
			success : function(data) {


		    	console.log('girdi2');
				var listBody = "";
				$(data).each(
						function(i, val) {				
							
							var download = ' <a href="getPersonalFile/'+val.id+'"><button type="button"  class="btn btn-default btn-icon"><span class="fa fa-cloud-download"></span></button></a>';	
													
							var j = i+1; 
							listBody = listBody + '<tr><td>' + j + '</td><td>'
							+ val.clientFileName + '</td><td>'						
							+download+'</td><td>'
							+'<button  type="button" onclick="deleteNonConfFile(this,'+val.id+')" class="btn btn-default btn-icon"><span class="fa fa-times"></span></button> </td></tr>';
						});
				
				$("#FileTable").html(listBody); 
				 $('#modal-clean').pleaseWait('stop'); 	 
			},
			error : function(data) {
				$("#FileTable").html(''); 

				 $('#modal-clean').pleaseWait('stop'); 
				bildirim('error',  'Open file list  Error ');
			}

		});


		}
	    
	}

 function deleteNonConfFile(ctl,pId){
		
		
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
				//bildirim('error', 'get department error ');
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
				//bildirim('error', data2);
			},

		});

	}
 
 function getFiles(ss) {

		input = document.getElementById(ss);
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
 
 function setDateFormat(date) { //01/02/2011 ->2011/02/01
		
		if(date.length>3)
		{	
		var newdate = date.split("/");
		date=newdate[2]+'-'+newdate[1]+'-'+newdate[0];}
		else{date='';}
		return date;
		}

function setDateFormatR(date) { // 2011/02/01-> 01/02/2011
		
		if(date!=null && date.length>3)
		{	
		var newdate = date.split("-");
		date=newdate[2]+'/'+newdate[1]+'/'+newdate[0];}
		else{date='';}
		return date;
		}

function closeAndExpand(valu)
{
	if(valu==10)
	{ 
		 $('#close1').hide();
		 $('#expand1').show(); 
		 $('#space1').hide(); 
		
	}
	if(valu==11)
	{ 
		 $('#expand1').hide();
		 $('#close1').show(); 
		 $('#space1').show(); 
		 
	}
	if(valu==20)
	{ 
		$('#stepDiv').hide(); 
		$('#createNew').attr("disabled", false);
	}
}

/* 
function stepAuthorized(step) {

		$.ajax({
			type : "GET",
			url : 'stepAuthorized/'+step,
			success : function(data) { 
				bildirim('success', data); 
			},
			error : function(data) {
				if(data.status=='401') 
				{	
					bildirim('warning',"You are not authorized");
				}    
				else
				{
				 bildirim('error', 'xxx ');
				 }
			}

		});

	}
*/