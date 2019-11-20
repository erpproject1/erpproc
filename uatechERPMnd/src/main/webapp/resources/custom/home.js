  var months = '{ "months" : [   {      "name": "January",      "short": "Jan",     "number": 1,      "days": 31   },   {     "name": "February",     "short": "Feb",     "number": 2,     "days": 28   },   {     "name": "March",     "short": "Mar",     "number": 3,     "days": 31   },    {     "name": "April",     "short": "Apr",     "number": 4,     "days": 30   },   {     "name": "May",     "short": "May",     "number": 5,     "days": 31   },   {     "name": "June",     "short": "Jun",     "number": 6,     "days": 30   },   {     "name": "July",     "short": "Jul",     "number": 7,     "days": 31   },    {     "name": "August",     "short": "Aug",     "number": 8,     "days": 31   },   {     "name": "September",     "short": "Sep",     "number": 9,     "days": 30   },    {     "name": "October",     "short": "Oct",     "number": 10,     "days": 31   },    {     "name": "November",     "short": "Nov",     "number": 11,     "days": 30   },    {     "name": "December",     "short": "Dec",     "number": 12,     "days": 31   }   ]   }';

  $(document).ready(function() {
	 
	var sDsh=sDash;
	
	

	setInterval(function(){   changeShow(); 	}, 3000);
	
	
	setTimeout(function(){   runFrame(sDsh); 	}, 100); 
	
	
	setTimeout(getTransmittalLogStatus,200);
	
});
 
 function runFrame(v)
 {
	 var disAllowed = v.split(",");
	 

	 setTimeout(getPQIStatistics, 100); 
	 
	 if(disAllowed.indexOf('1')>0)
	 {
		 $('#f1').hide();
	 }else
	 {
		 
	 }
	  
	 if(disAllowed.indexOf('2')>0)
	 {
		 $('#f2').hide();
	 }else
	 {
		 
	 }
	 
	 if(disAllowed.indexOf('3')>0)
	 { 
		 $('#f3').hide();
	 }
	 if(disAllowed.indexOf('4')>0)
	 {
		 $('#f4').hide();
	 }
	 if(disAllowed.indexOf('5')>0)
	 {
		 $('#f5').hide();
	 }
	 if(disAllowed.indexOf('6')>0)
	 {
		 $('#f6').hide();
	 }
	 if(disAllowed.indexOf('7')>0)
	 {
		 $('#f7').hide();
	 }
	 if(disAllowed.indexOf('8')>0)
	 {
		 $('#f8').hide();
	 }
	 if(disAllowed.indexOf('9')>0)
	 {
		 $('#f9').hide();
	 }
	 if(disAllowed.indexOf('10')>0)
	 {
		 $('#f10').hide();
	 }
	 
 }
  
function  changeShow(){
	
	var gallery = $('#shw1 > li:first').parents(".app-feature-gallery");
	$('#shw1 > li:first').appendTo(gallery);
	

	 gallery = $('#shw2 > li:first').parents(".app-feature-gallery");
	$('#shw2 > li:first').appendTo(gallery);
	

	 gallery = $('#shw3 > li:first').parents(".app-feature-gallery");
	$('#shw3 > li:first').appendTo(gallery);
}
 
function getPQIStatistics() {    
	
 
	var countOfMonth =3;  
	var d= new Date();  	
	
	var month = d.getMonth() + 1
	var year = d.getFullYear(); 
	
	 
	
	if(month!=null && year!=null && month>0 && year>0 ) {
	var param = { 
			month:month,
			year:year 
			}
	 var ser_data = JSON.stringify(param);
	
			$.ajax({
				type : "POST",
				contentType : 'application/json; charset=UTF-8',
				url : 'getPQIStatistics/'+countOfMonth,  
				data : ser_data, 
				success : function(sdata) {
					  
					var dataChartBar = []; 
					
					$(sdata).each(function(i, val) { 
										var chartItemBar = {y:formatMonthYear(val.month,val.year), a:val.procurement, b:val.construction,c:val.overall,d:val.cumulative};// ,overall:val.overall,cumulative:val.cumulative
										dataChartBar[i]=chartItemBar;  
									 });
				
					
					var ln= sdata.length;

					var py='<div class="form-group"> '                                           
	                       + ' <label>Procurement</label><span class="pull-right text-bold">'+sdata[ln-1].procurement+'</span>'
	                       + '<div class="progress progress-sm" data-toggle="tooltip" data-placement="top" title="" data-original-title="'+sdata[ln-1].procurement+'%">'
	                       + '    <div class="progress-bar progress-bar-striped" role="progressbar" aria-valuenow="'+sdata[ln-1].procurement+'" aria-valuemin="0" aria-valuemax="100" style="width: '+sdata[ln-1].procurement+'%"></div>'
	                       +' </div>  </div>'
	                       +'<div class="form-group"> '                                           
	                       + ' <label>Construction</label><span class="pull-right text-bold">'+sdata[ln-1].construction+'</span>'
	                       + '<div class="progress progress-sm" data-toggle="tooltip" data-placement="top" title="" data-original-title="'+sdata[ln-1].construction+'%">'
	                       + '    <div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="'+sdata[ln-1].construction+'" aria-valuemin="0" aria-valuemax="100" style="width: '+sdata[ln-1].construction+'%"></div>'
	                       +' </div>  </div>'
	                       +'<div class="form-group"> '                                           
	                       + ' <label>Monthly Overall</label><span class="pull-right text-bold">'+sdata[ln-1].overall+'</span>'
	                       + '<div class="progress progress-sm" data-toggle="tooltip" data-placement="top" title="" data-original-title="'+sdata[ln-1].overall+'%">'
	                       + '    <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="'+sdata[ln-1].overall+'" aria-valuemin="0" aria-valuemax="100" style="width: '+sdata[ln-1].overall+'%"></div>'
	                       +' </div>  </div>'
	                       +'<div class="form-group"> '                                           
	                       + ' <label>Cumulative</label><span class="pull-right text-bold">'+sdata[ln-1].cumulative+'</span>'
	                       + '<div class="progress progress-sm" data-toggle="tooltip" data-placement="top" title="" data-original-title="'+sdata[ln-1].cumulative+'%">'
	                       + '    <div class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="'+sdata[ln-1].cumulative+'" aria-valuemin="0" aria-valuemax="100" style="width: '+sdata[ln-1].cumulative+'%"></div>'
	                       +' </div>  </div>'
	                       +'<div class="form-group"> '                                           
	                       + ' <label>Target</label><span class="pull-right text-bold">'+sdata[ln-1].target+'</span>'
	                       + '<div class="progress progress-sm" data-toggle="tooltip" data-placement="top" title="" data-original-title="'+sdata[ln-1].target+'%">'
	                       + '    <div class="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="'+sdata[ln-1].target+'" aria-valuemin="0" aria-valuemax="100" style="width: '+sdata[ln-1].target+'%"></div>'
	                       +' </div>  </div>';
					
				  
					$("#projeYan").append(py);
					 
					  			
					 
					var configBar = { 
						      data: dataChartBar, 
						      xkey: 'y',
						      ykeys: ['a', 'b','c', 'd'],  						     
						      labels:['Procurement', 'Construction', 'Overall','cumulative'], 
						      fillOpacity: 0.6,
						      hideHover: 'auto',
						      behaveLikeLine: true,
						      resize: true,
						      pointFillColors:['#ffffff'],
						      pointStrokeColors: ['black'],
						      barColors: ["#2D3349", "#76AB3C","#F21125", "#81F0E8"]
						  };
					 
					 
					 
						configBar.element = 'bar-chart';
						Morris.Bar(configBar); 
					
				},
		error : function(data) {
			bildirim('error', data);  
		},
       
	}); 
	}
 
	
}

function formatMonthYear(month,year){
	
	 var jsonObj =  JSON.parse(months); 

	
	 var result = ''; 
	 	
	 for (j = 0; j < jsonObj.months.length; j++) {   
		 	if(jsonObj.months[j].number==month)
		 		{result = jsonObj.months[j].short;
		 			break;
		 		}
			
		
	 }
	 
	 var val = year % 100; 
	 	if (val<10) { 
			val = "0"+val; 
		} 
	 	result = result +'-'+ val;  
	 	return result;  
	 
	
	
}

function getTransmittalLogStatus() {
	$.ajax({
				type : "GET",
				contentType : 'application/json; charset=UTF-8',
				url : 'getTransmittalLogStatus',
				success : function(data) {
					  
					
					$('#tLogStatus')
							.DataTable(
									{
										"searching": false,
										"info":false, 
										"bLengthChange": false,
										"bDestroy": true,
										"aaData" : data,
										"columns" : [
												{
													"data" : 'department'
												},
												{
													"data" : 'submitted'
												},
												{
													"data" : 'approved'
												},
												{
													"data" : 'rejected'
												},
												{
													"data" : 'rejectionrate'
												},
												{
													"data" : 'open'
												}  ] 

									});
					

					var dataChartBar = []; 
					var chartItemBar;
					var dataChartBar2 = []; 
					var chartItemBar2; 
					var dataChartBar3 = []; 
					var p1=0,p2=0,p3=0,p4=0,p5=0;
					
				   var j=0;
					$(data).each(function(i, val) { 
						 j=i+1;
						 chartItemBar = {y:val.department, a:val.submitted, b:val.approved,c:val.rejected,d:val.open }; 
						 dataChartBar[j]=chartItemBar;  
						 
						p1=p1+parseInt(val.submitted);
						p2=p2+parseInt(val.approved);
						p3=p3+parseInt(val.rejected);
						p4=p4+parseInt(val.open);
						
						
						chartItemBar2 = {name:val.department, data: [parseInt(val.submitted), parseInt(val.approved),parseInt(val.rejected),parseInt(val.open)],pointPlacement: 'on' }; 
						dataChartBar2[j]=chartItemBar2; 
						
						dataChartBar3[j]={  name: val.department,  data: [parseFloat(val.rejectionrate)]} ;
						 
						 
					 });

				     chartItemBar = {y:'Total', a:p1, b:p2,c:p3,d:p4 }; 
					 dataChartBar[0]=chartItemBar; 
					 
				     chartItemBar2 ={name:'Total', data: [p1,p2,p3,p4],pointPlacement: 'on' }; 
					 dataChartBar2[0]=chartItemBar2; 
					 
					 p5=((p3/(p1-p4))*100);
					 dataChartBar3[0]={  name:'Total',  data:[parseFloat(p5.toFixed(2) )]} ;
 
					  var table = $('#tLogStatus').DataTable();
					  table.row.add( { "department":"Total", "submitted": p1,"approved":p2, "rejected": p3, "rejectionrate":p5.toFixed(2),  "open":p4  } ).draw();
					
					  var configBar = { 
						      data: dataChartBar, 
						      xkey: 'y',
						      ykeys: ['a', 'b','c', 'd'],  						     
						      labels:['Submitted', 'Approved','Rejected','Open'], 
						      fillOpacity: 0.6,
						      hideHover: 'auto',
						      behaveLikeLine: true,
						      resize: true,
						      pointFillColors:['#ffffff'],
						      pointStrokeColors: ['black'],
						      barColors: ["#2D3349", "#76AB3C","#F21125", "#81F0E8"],
						      maxHeight: 600
						  };
					
					configBar.element = 'bar-chart-trans';
					Morris.Bar(configBar); 
					
					

					Highcharts.chart('container1', {

					    chart: {
					        polar: true,
					        type: 'line'
					    },

					    accessibility: {
					        description: ''
					    },

					    title: {
					        text: '',
					        x: -80
					    },

					    pane: {
					        size: '80%'
					    },

					    xAxis: {
					        categories: ['Submitted', 'Approved','Rejected','Open'],
					        tickmarkPlacement: 'on',
					        lineWidth: 0
					    },

					    yAxis: {
					        gridLineInterpolation: 'polygon',
					        lineWidth: 0,
					        min: 0
					    },

					    tooltip: {
					        shared: true,
					        pointFormat: '<span style="color:{series.color}">{series.name}: <b>${point.y:,.0f}</b><br/>'
					    },

					    legend: {
					        align: 'right',
					        verticalAlign: 'middle'
					    },

					    series: dataChartBar2,

					    responsive: {
					        rules: [{
					            condition: {
					                maxWidth: 600
					            },
					            chartOptions: {
					                legend: {
					                    align: 'center',
					                    verticalAlign: 'bottom'
					                },
					                pane: {
					                    size: '100%'
					                }
					            }
					        }]
					    }

					});
					
					
					
					Highcharts.chart('container2', {
					    chart: {
					        type: 'column'
					    },
					    title: {
					        text: 'Transmittal Rejection Rates'
					    },
					    subtitle: {
					        text: ''
					    },
					    xAxis: {
					        categories: ['Total','Submitted', 'Approved','Rejected','Open'],
					        crosshair: true
					    },
					    yAxis: {
					        min: 0,
					        title: {
					            text: 'Rainfall (mm)'
					        }
					    },
					    tooltip: {
					        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
					        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
					            '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
					        footerFormat: '</table>',
					        shared: true,
					        useHTML: true
					    },
					    plotOptions: {
					        column: {
					            pointPadding: 0.2,
					            borderWidth: 0
					        }
					    },
					    series:  dataChartBar3
					});
					 
					
				},
				error : function(data2) { 
					
				},

			});

}