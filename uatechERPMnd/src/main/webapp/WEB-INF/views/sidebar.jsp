<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %> 
<%String sbs=(String)request.getSession().getAttribute("sbs");  %> 
                <div  class="app-sidebar app-navigation app-navigation-style-default app-navigation-open-hover dir-left" 
                data-type="close-other"  <%=sbs%>  > <!-- data-minimized="minimized" -->
                    <a href="#" class="app-navigation-logo"  >
                         UATECH 
                        <button class="app-navigation-logo-button mobile-hidden" data-sidepanel-toggle=".app-sidepanel"  >
						<span class="icon-alarm"></span>  </button> 
                    </a>
                    
    
               <nav id="navid"> <%=request.getSession().getAttribute("navid")%> 	</nav>
				 
                </div> 
                
                
                <script> 
              
                function setSideBarStatus(d)
                {  
                $.ajax({
        			type : "GET",
        			url : 'sideBarStatu/'+d,
        			success : function(data) { 
        				console.log(d);
        			},
        			error : function(data) {

        				console.log(d+' error');
        			}

        		});
                }  
                </script> 