$(document).ready(function() {

	getDepartments();
	getDiscipline();
	getViolationType();
	getPFContPersonal('cqc', '#actionBy');
	getViolations();

	if ($("#signOffDate").val() != null && $("#signOffDate").val().length > 3) {
		$("#status").val('Closed');

	} else
		$("#status").val('Open');

	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
	var yyyy = today.getFullYear();

	var todayTxt = dd + '/' + mm + '/' + yyyy;
	
	$("#pDate").val(todayTxt);
	$('#acd').datetimepicker({format: "DD/MM/YYYY",minDate:today} ); 		 
	$('#acdExt').datetimepicker({format: "DD/MM/YYYY",minDate:today} ); 			
	$('#signOffDate').datetimepicker({format: "DD/MM/YYYY",minDate:today} );  	  
	

});

$('#pDate').on('dp.change', function(e) {
	
	console.log("date");
	$('#acd').datetimepicker("minDate", e.date); 	
	$('#acd').val(""); 
	
	$('#acdExt').datetimepicker("minDate", e.date); 	
	$('#acdExt').val("");
	
	$('#signOffDate').datetimepicker("minDate", e.date); 	
	$('#signOffDate').val("");
	
});

$('#acd').on('dp.change', function(e) {
	
	console.log("acd");
	$('#acdExt').datetimepicker("minDate", e.date); 	
	$('#acdExt').val("");
	
	$('#signOffDate').datetimepicker("minDate", e.date); 	
	$('#signOffDate').val("");
	
});


$('#acdExt').on('dp.change', function(e) {
	
	console.log("acdExt");
	$('#signOffDate').datetimepicker("minDate", e.date); 	
	$('#signOffDate').val("");
	
});

$('#signOffDate').on('click', function(e) {
	 
    var x=$('#acdExt').val();
	$('#signOffDate').datetimepicker("minDate", x); 	
	$('#signOffDate').val("");
	
});

 

function changeSignOff() {

	if ($("#signOffDate").val() != null && $("#signOffDate").val().length > 3) {
		$("#status").val('Closed');

	} else
		$("#status").val('Open');

}
 

function setPersonal(val) {

	if (val.trim() == 'GC' || val.trim() == 'SV' || val.trim() == 'PN'
			|| val.trim() == 'NRC') {

		getPFClientPersonal('qci', '#initiator');
	} else {

		getPFContPersonal('cqc', '#initiator');
	}

}
// this.value,1
function vCodeChange(v, x) {

	if (v == $('#vCode').val() && v == $('#vType').val()) {

		return;
	} else {
		if (x == 1) {
			$('#vType').val(v);
			$('#vType').trigger('change');
		}

		if (x == 0) {
			$('#vCode').val(v);
			$('#vCode').trigger('change');
		}
		var flag = document.getElementById("vCode");
		var val = flag.options[flag.selectedIndex].text;
		setPersonal(val);
		getMaxViolationNo(v);
	}

}
var uptViolationNoTxt;
function getMaxViolationNo(vCode) {
	if ($('#vCode').val() > 0) {
		if (!($("#vCodeId").val() != null && $("#vCodeId").val() == $('#vCode')
				.val())) {

			var flag = document.getElementById("vCode");
			var vCodeDesc = flag.options[flag.selectedIndex].text;

			var param = {
				violationCode : vCode
			}
			var ser_data = JSON.stringify(param);
			$.ajax({
				type : "POST",
				contentType : 'application/json; charset=UTF-8',
				url : 'getMaxViolationNo',
				data : ser_data,
				success : function(data) {

					var x = parseInt(data, 10);
					x++;
					var result = '';
					if (x < 10)
						result = vCodeDesc + '-00' + x;
					else if (x < 100)
						result = vCodeDesc + '-0' + x;
					else
						result = vCodeDesc + '-' + x;

					$("#violationNo").val(result);
					$("#violationNo").attr("disabled", true);

				},
				error : function(data2) {
					bildirim('Error', 'Max Violation No Could Not Read');
				},

			});

		} else
			$("#violationNo").val(uptViolationNoTxt);
	}
}

function getViolationType() {

	$.ajax({
		type : "GET",
		url : 'getViolationType',
		success : function(data) {
			tmpData = JSON.parse(JSON.stringify(data));
			var list = '<option value="0">Select ..</option> ';
			var list2 = '<option value="0">Select ..</option> ';

			$(data).each(
					function(i, val) {

						list = list + '<option value="' + val.id + '">'
								+ val.violationTypeCode + '</option> ';
						list2 = list2 + '<option value="' + val.id + '">'
								+ val.violationType + '</option> ';

					});
			$("#vCode").html(list);
			$("#vType").html(list2);
		},
		error : function(data) {
			bildirim('error', 'get getViolationType error ');
		}

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
			$("#department").html(list);
		},
		error : function(data) {
			bildirim('error', 'get department error ');
		}

	});

}

function getDiscipline() {

	var ptype = 'Discipline';

	var param = {
		type : ptype
	}
	var ser_data = JSON.stringify(param);
	$.ajax({
		type : "POST",
		contentType : 'application/json; charset=UTF-8',
		url : 'getWirSettings',
		data : ser_data,
		success : function(data) {

			var list = '<option value="0">Select ..</option> ';

			$(data).each(
					function(i, val) {

						list = list + '<option value="' + val.id + '">'
								+ val.description + '</option> ';

					});
			$("#discipline").html(list);
		},
		error : function(data2) {
			bildirim('information', 'please refresh this page ');
		},

	});

}

function getPFContPersonal(valu, d) {

	var param = {
		name : valu
	}
	var ser_data = JSON.stringify(param);
	$.ajax({
		type : "POST",
		contentType : 'application/json; charset=UTF-8',
		url : 'getPFContPersonal',
		data : ser_data,
		async : false,
		success : function(data) {
			var list = '<option value="' + 0 + '">Select ..</option> ';

			$(data).each(
					function(i, val) {

						list = list + '<option value="' + val.id + '">'
								+ val.name + ' ' + val.midName + ' '
								+ val.lastName + '</option> ';

					});

			$(d).html(list);

		},
		error : function(data2) {

		},

	});

}

function getPFClientPersonal(valu, d) {

	var param = {
		name : valu
	}
	var ser_data = JSON.stringify(param);
	$.ajax({
		type : "POST",
		contentType : 'application/json; charset=UTF-8',
		url : 'getPFClientPersonal',
		data : ser_data,
		async : false,
		success : function(data) {
			var list = '<option value="' + 0 + '">Select ..</option> ';

			$(data).each(
					function(i, val) {

						list = list + '<option value="' + val.id + '">'
								+ val.name + ' ' + val.midName + ' '
								+ val.lastName + '</option> ';

					});

			$(d).html(list);
		},
		error : function(data2) {

		},

	});

}

function violationAction() {
	if ($("#btnViolationForm").text().indexOf("Update") > 0) {
		updateViolation();
	} else {
		addViolation();
	}

}

function addViolation() {

	var vTxt = $("#violationNo").val();
	var vNo;

	if (vTxt != null && vTxt.length > 0) {

		var myArray = vTxt.split('-');
		vNo = parseInt(myArray[myArray.length - 1], 10);
	}

	var date1, date2, date3;
	date1 = getDateFromText($("#acd").val());
	date2 = getDateFromText($("#acdExt").val());
	date3 = getDateFromText($("#signOffDate").val());

	if ($("#signOffDate").val() != null && $("#signOffDate").val().length > 3) {
		$("#status").val('Closed');

	} else
		$("#status").val('Open');

	if ($("#vCode").val() == null || $("#vCode").val() == 0
			|| $("#vCode").val() == '') {

		bildirim('warning', 'Please Select Violation Code!');
	} else if ($("#department").val() == null || $("#department").val() == '0'
			|| $("#department").val() == 0) {

		bildirim('warning', 'Please Select Department!');
	} else if ($("#discipline").val() == null || $("#discipline").val() == '0'
			|| $("#discipline").val() == 0) {

		bildirim('warning', 'Please Select Discipline!');
	} else if ($("#initiator").val() == null || $("#initiator").val() == '0'
			|| $("#initiator").val() == 0) {

		bildirim('warning', 'Please Select Initiator!');
	} else if ($("#actionBy").val() == null || $("#actionBy").val() == '0'
			|| $("#actionBy").val() == 0) {

		bildirim('warning', 'Please Select Action By!');
	} else if (date1 != null && date2 != null && date2 < date1) {

		bildirim('warning',
				'Please Select  an ACD EXT Date bigger than ACD Date!');
	} else if (date1 != null && date3 != null && date3 < date1) {

		bildirim('warning',
				'Please Select  a Sign Off Date bigger than ACD Date!');
	} else if (date2 != null && date3 != null && date3 < date2) {

		bildirim('warning',
				'Please Select  a Sign Off Date bigger than ACD EXT Date!');
	} else {

		var param = {
			violationCode : $("#vCode").val(),
			violationType : $("#vType").val(),
			violationNo : vNo,
			violationNoTxt : vTxt,
			department : $("#department").val(),
			discipline : $("#discipline").val(),
			description : $("#description").val(),
			reference : $("#reference").val(),
			subject : $("#subject").val(),
			location : $("#location").val(),
			initiator : $("#initiator").val(),
			correction : $("#correction").val(),
			rootCause : $("#rootcause").val(),
			correctiveAction : $("#correctiveAction").val(),
			acd : setDateFormat($("#acd").val()),
			acdExt : setDateFormat($("#acdExt").val()),
			actionBy : $("#actionBy").val(),
			signOffDate : setDateFormat($("#signOffDate").val()),
			date : setDateFormat($("#pDate").val()),
			status : $("#status").val(),
			remarks : $("#remarks").val()

		}
		var ser_data = JSON.stringify(param);

		$.ajax({
			type : "POST",
			contentType : 'application/json; charset=UTF-8',
			url : 'addViolation',
			data : ser_data,
			success : function(data) {
				bildirim("Success", data);
				clearInputs();
				getViolations();
			},
			error : function(data) {
				if(data.status=='401') bildirim('warning',"You are not authorized");    
				  else bildirim('error',data);
			}

		});
	}

}

function update(ctl, pId) {

	$("#id").val(pId);
	var param = {
		id : pId
	}
	var ser_data = JSON.stringify(param);
	$.ajax({
		type : "POST",
		contentType : 'application/json; charset=UTF-8',
		url : 'getViolation',
		data : ser_data,
		async : false,
		success : function(data) {

			setPersonal(data.violationDesc.violationTypeCode);
			uptViolationNoTxt = data.violationNoTxt;
			$("#pDate").val(setDateFormatR(data.date));
			$('#pDate').trigger('dp.change');
			$("#vCodeId").val(data.violationCode);
			$("#vCode").val(data.violationCode);
			$("#vType").val(data.violationType);
			$('#vCode').trigger('change');
			$('#vType').trigger('change');
			$("#violationNo").val(data.violationNoTxt);
			$("#department").val(data.department);
			$('#department').trigger('change');
			$("#discipline").val(data.discipline);
			$('#discipline').trigger('change');
			$("#description").val(data.description);
			$("#reference").val(data.reference);
			$("#subject").val(data.subject);
			$("#location").val(data.location);
			$("#initiator").val(data.initiator);
			$('#initiator').trigger('change');
			$("#correction").val(data.correction);
			$("#rootcause").val(data.rootCause);
			$("#correctiveAction").val(data.correctiveAction);
			$("#acd").val(setDateFormatR(data.acd));
			$('#acd').trigger('dp.change'); 
			$("#acdExt").val(setDateFormatR(data.acdExt));
			$('#acdExt').trigger('dp.change');
			$("#actionBy").val(data.actionBy);
			$('#actionBy').trigger('change');
			$("#signOffDate").val(setDateFormatR(data.signOffDate));			
			$("#status").val(data.status);
			$("#remarks").val(data.remarks);
			$("#btnViolationForm").html(
					"<span class=icon-arrow-up></span> Update");
			
			document.getElementById("vCode").focus();
		},
		error : function(data) {
			if(data.status=='401') bildirim('warning',"You are not authorized");    
			  else bildirim('error',data);
		}

	});

}

function updateViolation() {

	var vTxt = $("#violationNo").val();
	var vNo;
	if (vTxt != null && vTxt.length > 0) {
		var myArray = vTxt.split('-');
		vNo = parseInt(myArray[myArray.length - 1], 10);
	}

	var date1, date2, date3;
	date1 = getDateFromText($("#acd").val());
	date2 = getDateFromText($("#acdExt").val());
	date3 = getDateFromText($("#signOffDate").val());

	if ($("#signOffDate").val() != null && $("#signOffDate").val().length > 3) {
		$("#status").val('Closed');

	} else
		$("#status").val('Open');

	if ($("#vCode").val() == null || $("#vCode").val() == 0
			|| $("#vCode").val() == '') {

		bildirim('warning', 'Please Select Violation Code!');
	} else if ($("#department").val() == null || $("#department").val() == '0'
			|| $("#department").val() == 0) {

		bildirim('warning', 'Please Select Department!');
	} else if ($("#discipline").val() == null || $("#discipline").val() == '0'
			|| $("#discipline").val() == 0) {

		bildirim('warning', 'Please Select Discipline!');
	} else if ($("#initiator").val() == null || $("#initiator").val() == '0'
			|| $("#initiator").val() == 0) {

		bildirim('warning', 'Please Select Initiator!');
	} else if ($("#actionBy").val() == null || $("#actionBy").val() == '0'
			|| $("#actionBy").val() == 0) {

		bildirim('warning', 'Please Select Action By!');
	} else if (date1 != null && date2 != null && date2 < date1) {

		bildirim('warning',
				'Please Select  an ACD EXT Date bigger than ACD Date!');
	} else if (date1 != null && date3 != null && date3 < date1) {

		bildirim('warning',
				'Please Select  a Sign Off Date bigger than ACD Date!');
	} else if (date2 != null && date3 != null && date3 < date2) {

		bildirim('warning',
				'Please Select  a Sign Off Date bigger than ACD EXT Date!');
	}

	else {
		var param = {
			id : $("#id").val(),
			violationCode : $("#vCode").val(),
			violationType : $("#vType").val(),
			violationNo : vNo,
			violationNoTxt : vTxt,
			department : $("#department").val(),
			discipline : $("#discipline").val(),
			description : $("#description").val(),
			reference : $("#reference").val(),
			subject : $("#subject").val(),
			location : $("#location").val(),
			initiator : $("#initiator").val(),
			correction : $("#correction").val(),
			rootCause : $("#rootcause").val(),
			correctiveAction : $("#correctiveAction").val(),
			acd : setDateFormat($("#acd").val()),
			acdExt : setDateFormat($("#acdExt").val()),
			actionBy : $("#actionBy").val(),
			signOffDate : setDateFormat($("#signOffDate").val()),
			date : setDateFormat($("#pDate").val()),
			status : $("#status").val(),
			remarks : $("#remarks").val()
		}
		var ser_data = JSON.stringify(param);

		$.ajax({
			type : "POST",
			contentType : 'application/json; charset=UTF-8',
			url : 'updateViolation',
			data : ser_data,
			success : function(data) {
				bildirim("success", data);
				clearInputs();
				getViolations();
			},
			error : function(data) {
				if(data.status=='401') bildirim('warning',"You are not authorized");    
				  else bildirim('error',data);
			}

		});
	}

}
function clearInputs() {

	$("#id").val("");
	$("#vCode").val(0);
	$('#vCode').trigger('change');
	$("#vType").val(0);
	$('#vType').trigger('change');
	$("#violationNo").val("");
	$("#department").val(0);
	$('#department').trigger('change');
	$("#discipline").val(0);
	$('#discipline').trigger('change');
	$("#description").val("");
	$("#reference").val("");
	$("#subject").val("");
	$("#location").val("");
	$("#initiator").val(0);
	$('#initiator').trigger('change');
	$("#correction").val("");
	$("#rootcause").val("");
	$("#correctiveAction").val("");
	$("#acd").val("");
	$("#acdExt").val("");
	$("#actionBy").val(0);
	$('#actionBy').trigger('change');
	$("#signOffDate").val("");
	$("#pDate").val("");
	$("#status").val("");
	$("#remarks").val("");
	$("#btnViolationForm").html("<span class=icon-arrow-down></span> Save");
	document.getElementById("violationTable").focus();
}
function deleteViolation(ctl, pId) {

	_row = $(ctl).parents("tr");
	var cols = _row.children("td");
	var param = {
		id : pId
	}
	var ser_data = JSON.stringify(param);
	$.ajax({
		type : "POST",
		contentType : 'application/json; charset=UTF-8',
		url : 'deleteViolation',
		data : ser_data,
		success : function(data) {
			bildirim('success', data);
			$(ctl).parents("tr").remove();
		},
		error : function(data) {
			if(data.status=='401') bildirim('warning',"You are not authorized");    
			  else bildirim('error',data);
		}

	});

}

function getViolations() {
	$
			.ajax({
				type : "GET",
				contentType : 'application/json; charset=UTF-8',
				url : 'getViolations',
				success : function(data) {

					$('#violationTable')
							.DataTable(
									{
										"bDestroy" : true,
										"aaData" : data,
										"columns" : [
												{
													"data" : null
												},
												{
													"data" : 'violationDesc.violationTypeCode'
												},
												{
													"data" : 'violationDesc.violationType'
												},
												{
													"data" : 'violationNoTxt'
												},
												{
													"data" : 'departmentDesc.department'
												},
												{
													"data" : 'disciplineDesc.description'
												},
												{
													"data" : 'description'
												},
												{
													"data" : 'reference'
												},
												{
													"data" : 'subject'
												},
												{
													"data" : 'location'
												},
												{
													"data" : 'initiatorPer.fullName'
												},
												{
													"data" : 'correction'
												},
												{
													"data" : 'rootCause'
												},
												{
													"data" : 'correctiveAction'
												},
												{
													"data" : 'acd'
												},
												{
													"data" : 'acdExt'
												},
												{
													"data" : 'actionByPer.fullName'
												}, {
													"data" : 'signOffDate'
												}, {
													"data" : 'status'
												}, {
													"data" : 'remarks'
												} ],

										"aoColumnDefs" : [ {
											"aTargets" : [ 0 ],
											"mRender" : function(data, type,
													full) {
												return '<button  type="button" onclick="deleteViolation(this,'
														+ data.id
														+ ')"  class="btn btn-default btn-icon btn-xs"><span class="fa fa-times"></span></button> '
														+ '<button  type="button" onclick="update(this,'
														+ data.id
														+ ')"  class="btn btn-default btn-icon btn-xs"><span class="fa fa-pencil"></span></button>';
											}
										} ]

									});
				},
				error : function(data2) {
					bildirim('error', 'please this page refresh');
				},

			});

}

function setDateFormat(date) { // 01/02/2011 ->2011/02/01

	if (date != null && date.length > 3) {
		var newdate = date.split("/");
		date = newdate[2] + '-' + newdate[1] + '-' + newdate[0];
	} else {
		date = '';
	}
	return date;
}

function setDateFormatR(date) { // 2011/02/01-> 01/02/2011

	if (date != null && date.length > 3) {
		var newdate = date.split("-");
		date = newdate[2] + '/' + newdate[1] + '/' + newdate[0];
	} else {
		date = '';
	}
	return date;
}

function getDateFromText(date) {
	var result = null;
	if (date != null && date.length > 3 && date.indexOf("/") > 0) {
		var arrayOfDate = date.split("/");
		if (arrayOfDate.length == 3)
			result = new Date(arrayOfDate[2], arrayOfDate[1], arrayOfDate[0]);
		else
			return null;
	} else {
		return null;
	}
	return result;
}

function getDateFromDBText(date) {
	var result = null;
	if (date != null && date.length > 3 && date.indexOf("/") > 0) {
		var arrayOfDate = date.split("/");
		if (arrayOfDate.length == 3)
			result = new Date(arrayOfDate[0], arrayOfDate[1], arrayOfDate[2]);
		else
			return null;
	} else {
		return null;
	}
	return result;
}
