<%@ page contentType="text/html; charset=UTF-8" isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<!DOCTYPE html>
<html>
<head>
    <title><spring:message code="bma.title"/></title>
		<link rel="shortcut icon" href="${pageContext.request.contextPath}/favicon.ico" type="image/x-icon" />
    <script type="text/javascript" src="${pageContext.request.contextPath}/Oskari/libraries/jquery/jquery-1.10.2.js">
    </script>
    <!-- ############# css ################# -->   
    <style type="text/css">
        @media screen {
            body {
                margin: 0;
                padding: 0;
            }
            #content {
                height: 100%;
                margin-left: 153px;
            }
           
            #maptools {
                background-color: #333438;
                height: 100%;
                position: absolute;
                top: 0;
                width: 153px;
                z-index: 2;
            }          
            #etusivu {
				padding-top: 20px;
				text-align: center;				
			}
			#frontpage, #frontpage:visited {				
				color: #3399FF;
			}
			
			#registrationSuccess, #passwordChanged, #emailSent {
				padding-left: 25px;
			}
			
        
    </style>
    <!-- ############# /css ################# -->
</head>
<body>

<nav id="maptools">    
    <div id="etusivu"> 	
    	<a href="#" id="frontpage"><spring:message code="bma.backToFrontpage"/></a>
    </div>   
</nav>

<div id="content">
	<c:if test="${!empty registrationSuccess}">
		<div id="registrationSuccess">
			<h2><spring:message code="bma.register.thanks"/> <br/> <spring:message code="bma.register.passwordLink"/></h2>		
		</div>
	</c:if>
	
	<c:if test="${!empty passwordChanged}">
		<div id="passwordChanged">
			<h2><spring:message code="bma.passwordReset.passwordChanged"/></h2>		
		</div>
	</c:if>
	
	<c:if test="${!empty emailSent}">
		<div id="emailSent">
			<h2><spring:message code="bma.passwordReset.emailSentMessage"/></h2>		
		</div>
	</c:if>
	
	<c:if test="${!empty updateSuccess}">
		<div id="updateSuccess">
			<h2><spring:message code="bma.register.informationUpdated"/></h2>		
		</div>
	</c:if>
</div>

<script type="text/javascript">
$(document).ready(function () {
	$('#frontpage').click(function () {		
		var host = window.location.protocol + "//" + window.location.host; 
		window.location.replace(host);
	});
});

</script>
</body>
</html>
