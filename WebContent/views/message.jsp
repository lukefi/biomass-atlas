<%@ page contentType="text/html; charset=UTF-8" isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html>
<head>
    <title>Biomassa-atlas</title>
	<link rel="shortcut icon" href="${pageContext.request.contextPath}/favicon.ico" type="image/x-icon" />
    <script type="text/javascript" src="${pageContext.request.contextPath}/Oskari/libraries/jquery/jquery-1.7.1.min.js">
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
			
			#registration, #passwordChanged, #emailSent {
				padding-left: 25px;
			}
			
        
    </style>
    <!-- ############# /css ################# -->
</head>
<body>

<nav id="maptools">    
    <div id="etusivu"> 	
    	<a href="#" id="frontpage">Etusivu</a>
    </div>   
</nav>

<div id="content">
	<c:if test="${!empty registration}">
		<div id="registration">
			<h2>Thank you for registration. <br> Please activate your account through the email being sent.</h2>		
		</div>
	</c:if>
	
	<c:if test="${!empty passwordChanged}">
		<div id="passwordChanged">
			<h2>Password has been changed successfully.</h2>		
		</div>
	</c:if>
	
	<c:if test="${!empty emailSent}">
		<div id="emailSent">
			<h2>Email has been sent to you email address. Please use that link to change password.</h2>		
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
