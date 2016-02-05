<%@ page contentType="text/html; charset=UTF-8" isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<!DOCTYPE html>
<html>
<head>
    <title><spring:message code="bma.title"/></title>
	<link rel="shortcut icon" href="${pageContext.request.contextPath}/Oskari${path}/icons/favicon.ico" type="image/x-icon" />
    <!-- ############# css ################# -->
    <link
            rel="stylesheet"
            type="text/css"
            href="${pageContext.request.contextPath}/Oskari${path}/css/icons.css"/>
    <link
            rel="stylesheet"
            type="text/css"
            href="${pageContext.request.contextPath}/Oskari${path}/css/forms.css"/>
    <link
            rel="stylesheet"
            type="text/css"
            href="${pageContext.request.contextPath}/Oskari${path}/css/portal.css"/>
    <link
            rel="stylesheet"
            type="text/css"
            href="${pageContext.request.contextPath}/Oskari${path}/css/overwritten.css"/>
    <script type="text/javascript" src="${pageContext.request.contextPath}/Oskari/libraries/jquery/jquery-1.10.2.js">
    </script>
    <script src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
   <!--  <script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
    <link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css"> -->
    <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
    <style type="text/css">
        @media screen {
            body {
                margin: 0;
                padding: 0;
            }

            #mapdiv {
                width: 100%;
            }

            #maptools {
                background-color: #333438;
                height: 100%;
                position: absolute;
                top: 0;
                width: 153px;
                z-index: 2;
            }

            #contentMap {
                height: 100%;
                margin-left: 153px;
            }

            #login {
                margin-left: 5px;
            }

            #login input[type="text"], #login input[type="password"] {
                width: 90%;
                margin-bottom: 5px;
                background-image: url("${pageContext.request.contextPath}/Oskari${path}/images/forms/input_shadow.png");
                background-repeat: no-repeat;
                padding-left: 5px;
                padding-right: 5px;
                border: 1px solid #B7B7B7;
                border-radius: 4px 4px 4px 4px;
                box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1) inset;
                color: #878787;
                font: 13px/100% Arial,sans-serif;
            }
            #login input[type="submit"] {
                width: 90%;
                margin-bottom: 5px;
                padding-left: 5px;
                padding-right: 5px;
                border: 1px solid #B7B7B7;
                border-radius: 4px 4px 4px 4px;
                box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1) inset;
                color: #878787;
                font: 13px/100% Arial,sans-serif;
            }
            #login p.error {
                font-weight: bold;
                color : red;
                margin-bottom: 10px;
            }

            #login a {
                color: #FFF;
                padding: 5px;
            }
            
            .error{
            	color: red;
            }
            .italic{
            	font-style: italic;
            }
             #register, #feedback{
            	text-align: center;
            	padding-top: 20px;
            }
            #user{
            	color: #c2c2c2;
            	font-style: italic;
            }
            #bmaLayerContent {
            	z-index: 1000;
            	position: absolute;
            	bottom: 0;
            	left: 50%;
            	width: 600px;
            	height: 500px;
            }
            #bmaLayerTabs {
            	display:none;
            	position: relative;
            	background: #ffffff;
            	height: 90%;
            }
            #bmaLayerSelectorBtn {
            	position: absolute;
            	bottom: 0;
            	top: 90%;
            	left: 63%;
            	width: 200px;
            	height: 50px;          	
            }
            .tab-content {
			    height: 90%; 
			    border-left: 2px solid #ccc ;
			    border-right: 2px solid #ccc ;
			    border-top: 2px solid #ccc ;
			    overflow-y: auto;			    
			}
			#bmaLayerTabs > ul > li {
				font-size: 18px;
			}
			.nav > li > a:hover,
			.nav > li > a:focus {
			    text-decoration: none;
			    background-color: #e0e0d1;
			} 
			            
        }
    </style>
    <!-- ############# /css ################# -->
</head>
<body>

<nav id="maptools">
    <div id="loginbar">
    </div>
    <div id="menubar">
    </div>
    <div id="divider">
    </div>
    <div id="toolbar">
    </div>
    <div id="register">
   	    <c:if test="${empty _logout_uri}"> 
    		<a href="${pageContext.request.contextPath}/biomass/user/register"><spring:message code="bma.register"/></a>
   	    </c:if>
    </div>
    <div id="login">
        <c:choose>
            <c:when test="${!empty loginState}">
                <p class="error"><spring:message code="bma.invalidPassword"/></p>
            </c:when>
        </c:choose>
        <c:set var="user" value="fi.nls.oskari.domain.User" />
        <%-- when test="${!empty sessionScope[user]}" --%>
        <c:choose>
           <c:when test="${!empty _logout_uri && empty _login_uri}">            
	   	    	<span id="user">${sessionScope[user].firstname} ${sessionScope[user].lastname}</span>
	   	    	<span><a href="#" id="edit">(<spring:message code="bma.edit"/>)</a></span><br>
                <a href="${_logout_uri}"><spring:message code="bma.logout"/></a>
            </c:when>            
            <c:otherwise>
                <form action='${_login_uri}' method="post" accept-charset="UTF-8">
                    <input size="16" id="username" name="${_login_field_user}" type="text" placeholder="<spring:message code="bma.username"/>" autofocus
                           required>
                    <input size="16" id="password" name="${_login_field_pass}" type="password" placeholder="<spring:message code="bma.password"/>" required>
                    <input type="submit" id="submit" value="<spring:message code="bma.login"/>">
                </form>
            </c:otherwise>           
        </c:choose>
    </div>
    <div id="feedback">   	    
    	<a href="${pageContext.request.contextPath}/biomass/feedback">Feedback</a>
    </div>
</nav>
<div id="contentMap" class="oskariui container-fluid">
    <div id="menutoolbar" class="container-fluid"></div>
    <div class="row-fluid oskariui-mode-content" style="height: 100%; background-color:white;">
        <div class="oskariui-left"></div>
        <div class="span12 oskariui-center" style="height: 100%; margin: 0;">
            <div id="mapdiv"></div>
        </div>
        <div class="oskari-closed oskariui-right">
            <div id="mapdivB"></div>
        </div>
    </div>
</div>

<div id="bmaLayerContent">
	<div id="bmaLayerTabs">
		<ul class="nav nav-pills red">	   
		    <li class="active" ><a data-toggle="tab" href="#forestLayer">Forest</a></li>
		    <li><a data-toggle="tab" href="#fieldLayer">Field</a></li>	    
		 </ul>
		 <div class="tab-content" >
	        <div id="forestLayer" class="tab-pane fade in active">
	            <h4>Forest Layer</h4>	           
	        </div>
	        <div id="fieldLayer" class="tab-pane fade">
	            <h4>Field Layer</h4>
	        </div>
	      </div>
      </div>
      <button type="button" class="btn btn-primary btn-lg glyphicon glyphicon-triangle-right" id="bmaLayerSelectorBtn" > BMA Layers</button>     	     
 </div> 	

<!-- ############# Javascript ################# -->

<!--  OSKARI -->

<script type="text/javascript">
    var ajaxUrl = '${ajaxUrl}';
    var viewId = '${viewId}';
    var language = '${language}';
    var preloaded = ${preloaded};
    var controlParams = ${controlParams};
</script>

<script type="text/javascript"
        src="${pageContext.request.contextPath}/Oskari/bundles/bundle.js">
</script>

<!--  OPENLAYERS -->
<script type="text/javascript"
        src="${pageContext.request.contextPath}/Oskari/packages/openlayers/startup.js">
</script>

<c:if test="${preloaded}">
    <!-- Pre-compiled application JS, empty unless created by build job -->
    <script type="text/javascript"
            src="${pageContext.request.contextPath}/Oskari${path}/oskari.min.js">
    </script>
    <!-- Minified CSS for preload -->
    <link
            rel="stylesheet"
            type="text/css"
            href="${pageContext.request.contextPath}/Oskari${path}/oskari.min.css"
            />
    <%--language files --%>
    <script type="text/javascript"
            src="${pageContext.request.contextPath}/Oskari${path}/oskari_lang_all.js">
    </script>
    <script type="text/javascript"
            src="${pageContext.request.contextPath}/Oskari${path}/oskari_lang_${language}.js">
    </script>
</c:if>

<script type="text/javascript"
        src="${pageContext.request.contextPath}/Oskari${path}/index.js">
</script>

<script type="text/javascript">
$(document).ready(function () {
	$('#edit').click(function () {		
		var host = window.location.protocol + "//" + window.location.host; 
		jQuery.ajax({
			url: host + "/action?action_route=UserRegistration&edit=yes",
			type: 'POST',			
			success: function(data) {				
				var url = window.location.protocol + "//" + window.location.host + "/biomass/user/edit";				 
				/* Create a dynamic form and submit it. This helps to move ahead 
				 * to new view */				 
				var form = $('<form>', {action: url, method: 'POST'}).appendTo('body');
				form.append("<input type='text' name='userId' id='userId' value=" + data.id + ">");
				form.append("<input type='text' name='firstname' id='firstname' value=" + data.firstName + ">");
			    form.append("<input type='text' id='lastname' name='lastname' value=" + data.lastName + ">");
			    form.append("<input type='text' id='email' name='email' value=" + data.email + ">");
			    form.submit();
			},
			error: function(jqXHR, textStatus, errorThrown) {
				alert(jqXHR.responseText);
			}
		});		
	});
	
	$('#bmaLayerSelectorBtn').click(function () {
		$(this).toggleClass('glyphicon-triangle-right glyphicon-triangle-top');
		$('#bmaLayerTabs').toggle("slow", function() {
		});	
	});	
});
</script>

<!-- ############# /Javascript ################# -->
</body>
</html>
