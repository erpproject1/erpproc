<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>  
<%@ page session="false" %> 
               <div class="app-header app-header-design-default">
                        <ul class="app-header-buttons">
                            <li class="visible-mobile"><a href="#" class="btn btn-link btn-icon" data-sidebar-toggle=".app-sidebar.dir-left"><span class="icon-menu"></span></a></li>
                            <li class="hidden-mobile"><a href="#" class="btn btn-link btn-icon" data-sidebar-minimize=".app-sidebar.dir-left"><span class="icon-menu"></span></a></li>
                        </ul>
                        <form class="app-header-search" action="" method="post">        
                            <input type="text" name="keyword" placeholder="Search">
                        </form>    
                    
                        <ul class="app-header-buttons pull-right">        
                            <li>
                                <div class="contact contact-rounded contact-bordered contact-lg contact-ps-controls hidden-xs">
                                    <img src="" alt="">
                                    <div class="contact-container">
                                        <a href="#"><%=request.getSession().getAttribute("username")%></a>
                                        <span><%=request.getSession().getAttribute("usertype")%></span>
                                    </div>
                                    <div class="contact-controls">
                                        <div class="dropdown">
                                            <button type="button" class="btn btn-default btn-icon" data-toggle="dropdown"><span class="icon-layers"></span></button>                        
                                            <ul class="dropdown-menu dropdown-left">
                                                <li><a href="#"><span class="icon-users"></span> Account</a></li> 
                                                <li><a href="#"><span class="icon-envelope"></span> Messages</a></li>
                                                <li><a href="#"><span class="icon-users"></span> Contacts</a></li>
                                                <li class="divider"></li>
                                                <li><a href="#"><span class="icon-envelope"></span> E-mail</a></li> 
                                            </ul>
                                        </div>                    
                                    </div>
                                </div>
                            </li>        
                            <li>
                               <div class="dropdown">                                            
                                    <button class="btn btn-default btn-icon btn-informer" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"><span class="icon-alarm"></span><span class="informer informer-danger informer-sm informer-square">+3</span></button>
                                    <ul class="dropdown-menu dropdown-form dropdown-left dropdown-form-wide">
                                        <li class="padding-0">                        
                                            
                                            <div class="app-heading title-only app-heading-bordered-bottom">
                                                <div class="icon">
                                                    <span class="icon-text-align-left"></span>
                                                </div>
                                                <div class="title">
                                                    <h2>Notifications</h2>                            
                                                </div>
                                                <div class="heading-elements">
                                                    <a href="#" class="btn btn-default btn-icon"><span class="icon-sync"></span></a>
                                                </div>
                                            </div>
                                            
                                            <div class="app-timeline scroll app-timeline-simple text-sm" style="height: 240px;">
                    
                                                <div class="app-timeline-item">
                                                    <div class="dot dot-primary"></div>
                                                    <div class="content">                                    
                                                        <div class="title margin-bottom-0"><a href="#">Jessie Franklin</a> uploaded new file <strong>844_jswork.pdf</strong></div>
                                                    </div>                                                
                                                </div>
                    
                                                <div class="app-timeline-item">
                                                    <div class="dot dot-warning"></div>
                                                    <div class="content">
                                                        <div class="title margin-bottom-0"><a href="#">Taylor Watson</a> changed work status <strong>PSD Dashboard</strong></div>
                                                    </div>                                                
                                                </div>
                    
                                                <div class="app-timeline-item">
                                                    <div class="dot dot-success"></div>
                                                    <div class="content">
                                                        <div class="title margin-bottom-0"><a href="#">Dmitry Ivaniuk</a> approved project <strong>Boooya</strong></div>
                                                    </div>                                                
                                                </div>
                                                
                                                <div class="app-timeline-item">
                                                    <div class="dot dot-success"></div>
                                                    <div class="content">
                                                        <div class="title margin-bottom-0"><a href="#">Boris Shaw</a> finished work on <strong>Boooya</strong></div>
                                                    </div>                                                
                                                </div>
                                                
                                                <div class="app-timeline-item">
                                                    <div class="dot dot-danger"></div>
                                                    <div class="content">
                                                        <div class="title margin-bottom-0"><a href="#">Jasmine Voyer</a> declined order <strong>Project 155</strong></div>
                                                    </div>                                                
                                                </div>
                                                
                                            </div>
                                            
                                        </li>
                                        <li class="padding-top-0">
                                            <button class="btn btn-block btn-link">Preview All</button>
                                        </li>                     
                                    </ul>
                                </div>
                            </li>
                            <li>
                            <div class="dropdown">
                                            <button type="button" class="btn btn-default btn-icon" data-toggle="dropdown" title="Language"><span class="icon-earth"></span></button>                        
                                            <ul class="dropdown-menu dropdown-left">
                                                <li><a href="javascript:setchangeLang('en');"> English</a></li> 
                                                <li><a href="javascript:setchangeLang('tr');"> Türkçe</a></li>
                                                <li><a href="javascript:setchangeLang('arabic');"> العربية</a></li> 
                                            </ul>
                                             <%String lg=(String)request.getSession().getAttribute("language"); %> 
		          							 <script type="text/javascript"> var dil='<%=lg %>'; </script>
		          							  <script type="text/javascript" src="custom/header.js"></script>  
                                        </div>  
                            </li>
                            <li>
                                <a href="logout" class="btn btn-default btn-icon"><span class="icon-power-switch"></span></a>
                            </li>
                        </ul>
                    </div>
                    