<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<!DOCTYPE html>
<html lang="en">
    <head>                        
        <title>Login</title>            
        
        <!-- META SECTION -->
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        
        
        <link rel="icon" href="" type="image/x-icon">
        <!-- END META SECTION -->
        <!-- CSS INCLUDE -->        
        <link rel="stylesheet" href="css/styles.css">
        <!-- EOF CSS INCLUDE -->
            <style>
 
       		  .se-pre-con {
			            position: fixed;
			            left: 0px;
			            top: 0px;
			            width: 100%;
			            height: 100%;
			            z-index: 9999;
			            background: url('img/ua.gif') center no-repeat #fff;
        			}
   			 </style>
    </head>
    <body>        
        <div class="se-pre-con"></div>
        <!-- APP WRAPPER -->
        <div class="app">

            <!-- START APP CONTAINER -->
            <div class="app-container">
                
                <div class="app-login-box">                                        
                    <div class="app-login-box-user"><img src="img/user/no-image.png" alt=""></div>
                    <div class="app-login-box-title">
                        <!--  div class="subtitle">Already a member?</div>-->
                        <div class="title">Sign in to your account</div>                        
                    </div>
                    <div class="app-login-box-container">
                        <form action="login">
                            <div class="form-group">
                                <input type="text" class="form-control" name="username" placeholder="Username">
                            </div>
                            <div class="form-group">
                                <input type="password" class="form-control" name="password" placeholder="Password">
                            </div>
                            <div class="form-group">

                                <div class="row">
                                    <!--div class="col-md-6 col-xs-6">
                                        <div class="app-checkbox">
                                            <label><input type="checkbox" name="app-checkbox-1" value="0"> Remember me</label>
                                        </div>
                                    </div-->
                                    <div class="col-md-12 col-xs-6">
                                        <button class="btn btn-success btn-block" id="btn">Sign In</button>
                                    </div>
                                     <div class="col-md-12 col-xs-6" style="color: red"> ${sonuc}</div>
                                </div>
                                
                            </div>
                        </form>
                    </div>
                   
                    <div class="app-login-box-footer">
                         
                <div class="app-footer-line darken">                
                    <div class="copyright wide text-center" id="footerDesc"></div>                
                </div>
                    </div>
                </div>
                                
            </div>
            <!-- END APP CONTAINER -->
           
        </div>        
        <!-- END APP WRAPPER -->                
        
        <!--
        <div class="modal fade" id="modal-thanks" tabindex="-1" role="dialog">                        
            <div class="modal-dialog modal-sm" role="document">                    
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true" class="icon-cross"></span></button>
                <div class="modal-content">                    
                    <div class="modal-body">                
                        <p class="text-center margin-bottom-20">
                            <img src="assets/images/smile.png" alt="Thank you" style="width: 100px;">
                        </p>                
                        <h3 id="modal-thanks-heading" class="text-uppercase text-bold text-lg heading-line-below heading-line-below-short text-center"></h3>
                        <p class="text-muted text-center margin-bottom-10">Thank you so much for likes</p>
                        <p class="text-muted text-center">We will do our best to make<br> Boooya template perfect</p>                
                        <p class="text-center"><button class="btn btn-success btn-clean" data-dismiss="modal">Continue</button></p>
                    </div>                    
                </div>
            </div>            
        </div>-->
        
        <!-- IMPORTANT SCRIPTS -->
        <script type="text/javascript" src="js/vendor/jquery/jquery.min.js"></script>
        <script type="text/javascript" src="js/vendor/jquery/jquery-migrate.min.js"></script>
        <script type="text/javascript" src="js/vendor/jquery/jquery-ui.min.js"></script>
        <script type="text/javascript" src="js/vendor/bootstrap/bootstrap.min.js"></script>
        <script type="text/javascript" src="js/vendor/moment/moment.min.js"></script>
        <script type="text/javascript" src="js/vendor/customscrollbar/jquery.mCustomScrollbar.min.js"></script>
        <!-- END IMPORTANT SCRIPTS -->
        <!-- APP SCRIPTS -->
        <script type="text/javascript" src="js/app.js"></script>
        <script type="text/javascript" src="js/app_plugins.js"></script> 
        <!-- END APP SCRIPTS -->
        <script>
        $(window).load(function() {
       
            $(".se-pre-con").fadeOut("slow");
        });
        $(document).ready(function() {
        	
        	 $('#btn').focus();
        	
        	 $('.form-group').keypress(function (event) { 
        		  
        	  });
        	 
        	 $( "#btn" ).click(function() {
        		 $(".se-pre-con").fadeIn("slow");
        		});
        });

        
        </script>
    </body>
</html>