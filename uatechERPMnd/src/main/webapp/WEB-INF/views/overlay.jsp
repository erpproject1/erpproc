<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %> 
<div class="app-overlay"></div>
 <div  id="rmenu" style=" display: none; border: 1px solid black; background-color: white; width: 150px;z-index: 5;">
	            <ul style="list-style: none;">
	                <li style="list-style: none;">	<button class="btn btn-default btn-sm" id="idgetINFO" onclick="getIDINFO()" >What is This?</button></li>  
	            </ul>
	        </div>
<div class="modal fade" id="modal-infoID" tabindex="-1" role="dialog" aria-labelledby="modal-default-header">                        
                <div class="modal-dialog modal-info" role="document">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true" class="icon-cross"></span></button>

                    <div class="modal-content">
                        <div class="modal-header">                        
                            <h4 class="modal-title" id="">Information</h4>
                        </div>
                        <div class="modal-body">
                            <h3 id="minfoIDDesc"> </h3>
                         </div>
                    </div>
                </div>            
 </div>