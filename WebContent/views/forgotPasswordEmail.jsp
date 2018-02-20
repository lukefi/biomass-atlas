<%@ page contentType="text/html; charset=UTF-8" isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<!DOCTYPE html>
<html>
<head>
<title><spring:message code="bma.title"/></title>
<link rel="shortcut icon" href="${pageContext.request.contextPath}/favicon.ico" type="image/x-icon" />
<script type="text/javascript" src="${pageContext.request.contextPath}/Oskari/libraries/jquery/jquery-1.10.2.js">
</script>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
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
    .content-column{            	
    	display: block;
    }
    .column-field-label{
    	font-size: 20px;
    	line-height: 2;
    }
    .column-field-input{
    	border-radius: 5px;
    	font-size: 14px;
    	height: 30px;
    	padding-left:10px;
    	padding-right:10px;
    }
    .column-field-input:focus{
    	background-color: #ECF9EC;
    }
		button {
			background: #78be20;
			background-image: -webkit-linear-gradient(top, #78be20, #3d5c11);
			background-image: -moz-linear-gradient(top, #78be20, #3d5c11);
			background-image: -ms-linear-gradient(top, #78be20, #3d5c11);
			background-image: -o-linear-gradient(top, #78be20, #3d5c11);
			background-image: linear-gradient(to bottom, #78be20, #3d5c11);
			-webkit-border-radius: 5;
			-moz-border-radius: 5;
			border-radius: 5px;
			font-family: Arial;
			color: #ffffff;
			font-size: 13px;
			padding: 6px 12px 6px 12px;
			text-shadow: none;
			margin: 30px 20px 0px 0px;
			font-weight: normal;
			min-height: 3em;
		}
		button:hover {
			background: #64a019;
			background-image: -webkit-linear-gradient(top, #64a019, #507719);
			background-image: -moz-linear-gradient(top, #64a019, #507719);
			background-image: -ms-linear-gradient(top, #64a019, #507719);
			background-image: -o-linear-gradient(top, #64a019, #507719);
			background-image: linear-gradient(to bottom, #64a019, #507719);
			color: #ffffff;
		}
		#etusivu {
			padding-top: 20px;
			text-align: center;				
		}
		#frontpage, #frontpage:visited {				
			color: #3399FF;
		}
		#emailAddress {
     	padding-top: 25px;
     	padding-left: 25px;
    }
   	#error {
    	color: red;
     	font-size: 16px;
    }
    h2 {
			color: #00b5e2;
			margin-bottom: 20px;
		}
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
	<div id="emailAddress">
	    <h2><spring:message code="bma.passwordReset.title"/></h2>
		<span class="content-column">
			<span class="content-column"><label class="column-field-label"><spring:message code="bma.email"/></label></span>
			<span class="content-column"><input class="column-field-input" size="25" id="email" name="email" type="email" autofocus required>
			<span id="errorEmail" class="alert alert-danger hidden" role="alert"></span>
			</span>
		</span>			
		<span>				
			<button id="submit"><spring:message code="bma.next"/></button>
		</span>			
		<span>				
			<button id="cancel"><spring:message code="bma.cancel"/></button>
		</span>			
	</div>
</div>

<script type="text/javascript">
$(document).ready(function () {
	$('#frontpage, #cancel').click(function () {		
		var host = window.location.protocol + "//" + window.location.host; 
		window.location.replace(host);
	});
	
	$('#submit').click(function () {
		var email = jQuery('#email').val();
		var host = window.location.protocol + "//" + window.location.host;
		if (validate()) {
			jQuery.ajax({
				url: host + "/action?action_route=UserPasswordReset&email=" + email,
				type: 'POST',			
				success: function(data) {
					var url = window.location.protocol + "//" + window.location.host + "/biomass/user/emailSent"; 
					window.location.replace(url);
				},
				error: function(jqXHR, textStatus, errorThrown) {
					//jQuery("#error").text("SERVER ERROR");
					alert(jqXHR.responseText);
				}
			});		
		} else
			jQuery("#error").html('<spring:message code="bma.invalidEmailError"/>');
	});
});

function isEmailValid(email) {
	var pattern =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	return pattern.test(email);  // returns a boolean 
}

//Validates the form values
function validate() {
	var email = $('#email').val(),
		flag = true;
	clearErrorMessage();
	
	if(!isEmailValid(email)){
		errorMsg('#errorEmail', '<spring:message code="bma.invalidEmailError"/>');
		flag = false;
	}
	return flag;
}

function errorMsg(selector, str) {
	$(selector).text(str).removeClass("hidden");
}

function clearErrorMessage() {
	$('.alert').text("").addClass("hidden");
}
</script>
</body>
</html>
