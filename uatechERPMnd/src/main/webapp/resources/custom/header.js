 
var selectID='';
var selectURI='';
document.addEventListener('contextmenu', function(e) {
                 
                try 
                {
                     selectID= e.toElement.id;
                selectURI=e.toElement.baseURI;
                }
                catch (ex) 
                {

                    selectID= e.srcElement.id;
                    selectURI=e.srcElement.baseURI;
                }
                
                 console.log(selectID);  
                 
                
                if(selectID!=null && selectID.length>0)
                {
                	 $("#rmenu").show();
                     $("#rmenu").css(
                       {
                         position: "absolute",
                         top: e.pageY,
                         left: e.pageX 
                         
                       }
                     );
                     if(selectID.indexOf("select2")>-1){ var ss=selectID.split('-'); selectID=ss[1]; }
                     
                     $('#idgetINFO').prop('title', selectID);

                    
                } 
                e.preventDefault();
                
         }, false);
 
document.addEventListener('click', function(e) {
    $("#rmenu").hide();  
}, false);


function setchangeLang(a) {

	$.ajax({
		type : "GET",
		url : 'changeLang?lang='+a,
		success : function(data) { 
			location.reload();
		},
		error : function(data) { 
			bildirim('error','Error');
		}

	});

}
function getIDINFO()
{ 
	$("#rmenu").hide(); 
	getItemInfos(selectID,selectURI);
}

function getItemInfos(a,b) {

 
	var s=b.split('/');
	b=s[s.length-1];
	 

		var param = {
			  page:b.trim(),
			  itemId:a

		}
		var ser_data = JSON.stringify(param);

		$.ajax({
			type : "POST",
			contentType : 'application/json; charset=UTF-8',
			url : 'getItemInfoDesc',
			data : ser_data,
			success : function(data) {
				$("#minfoIDDesc").html(data);
				$("#modal-infoID").modal("show");
			},
			error : function(data) {
 
			}

		});
	 

}
