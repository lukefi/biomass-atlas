<%@ page contentType="text/html; charset=UTF-8" isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

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
                    
            #register {
            	padding-left: 25px;
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
            		
			.column-field-button{
				-moz-box-shadow:inset 0px 1px 0px 0px #ffffff;
				-webkit-box-shadow:inset 0px 1px 0px 0px #ffffff;
				box-shadow:inset 0px 1px 0px 0px #ffffff;
				background:-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #ededed), color-stop(1, #dfdfdf));
				background:-moz-linear-gradient(top, #ededed 5%, #dfdfdf 100%);
				background:-webkit-linear-gradient(top, #ededed 5%, #dfdfdf 100%);
				background:-o-linear-gradient(top, #ededed 5%, #dfdfdf 100%);
				background:-ms-linear-gradient(top, #ededed 5%, #dfdfdf 100%);
				background:linear-gradient(to bottom, #ededed 5%, #dfdfdf 100%);
				filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ededed', endColorstr='#dfdfdf',GradientType=0);
				background-color:#ededed;
				-moz-border-radius:6px;
				-webkit-border-radius:6px;
				border-radius:6px;
				border:1px solid #dcdcdc;
				display:inline-block;
				cursor:pointer;
				color:#777777;
				font-family:Arial;
				font-size:15px;
				font-weight:bold;
				padding:6px 24px;
				text-decoration:none;
				text-shadow:0px 1px 0px #ffffff;
				position: relative;
				top: 20px;
			}
			.column-field-button:hover {
				background:-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #dfdfdf), color-stop(1, #ededed));
				background:-moz-linear-gradient(top, #dfdfdf 5%, #ededed 100%);
				background:-webkit-linear-gradient(top, #dfdfdf 5%, #ededed 100%);
				background:-o-linear-gradient(top, #dfdfdf 5%, #ededed 100%);
				background:-ms-linear-gradient(top, #dfdfdf 5%, #ededed 100%);
				background:linear-gradient(to bottom, #dfdfdf 5%, #ededed 100%);
				filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#dfdfdf', endColorstr='#ededed',GradientType=0);
				background-color:#dfdfdf;
			}
			.column-field-button:active {
				position:relative;
				top:20px;
			}
			
			#etusivu {
				padding-top: 20px;
				text-align: center;				
			}
			#frontpage, #frontpage:visited {				
				color: #3399FF;
			}
			
			#forgotPassword {
				padding-top: 25px;
				font-size: 20px;
				display: block;
			}
			.error {
				color: red;
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
	<div id="register">
		<h1>Rekisteröidy palveluun</h1>
		<span class="content-column">
			<label class="column-field-label">Etunimi</label> <br>
			<input class="column-field-input" size="20" id="firstname" name="firstname" type="text" required>
			<span id="errorFirstname" class="error"></span>
		</span>
		<span class="content-column">
			<label class="column-field-label">Sukunimi</label> <br>
			<input class="column-field-input" size="20" id="lastname" name="lastname" type="text" required>
			<span id="errorLastname" class="error"></span>
		</span>
		<span class="content-column">
			<label class="column-field-label">Nimimerkki</label> <br>
			<input class="column-field-input" size="20" id="username" name="username" type="text" required>
			<span id="errorUsername" class="error"></span>
		</span>
		<span class="content-column">
			<label class="column-field-label">Sähköpostiosoite</label> <br>
			<input class="column-field-input" size="20" id="email" name="email" type="email" required>
			<span id="errorEmail" class="error"></span>
		</span>
		<span>				
			<input class="column-field-button" id="registerBtn" type="button" value="Rekisteröidy">
		</span>			
		<span>				
			<input class="column-field-button" id="cancel" type="button" value="Peruuta">
		</span>			
		
		<br><br>
		<a href="#" id="forgotPassword"> Salasana unohtunut</a>
	
	</div>
</div>

<script type="text/javascript">
$(document).ready(function () {
	$('#frontpage, #cancel').click(function () {		
		var host = window.location.protocol + "//" + window.location.host; 
		window.location.replace(host);
	});
	
	$('#forgotPassword').click(function () {		
		var host = window.location.protocol + "//" + window.location.host + "/biomass/user/forgotPassword"; 
		window.location.replace(host);
	});
	
	jQuery('#registerBtn').click(function () {
		var data = { 
					firstname: jQuery('#firstname').val(),
				 	lastname: jQuery('#lastname').val(),				
					username: jQuery('#username').val(),				
					email: jQuery('#email').val()
				   };
		var host = window.location.protocol + "//" + window.location.host;
		if (validate()) { 
			jQuery.ajax({
				url: host + "/action?action_route=UserRegistration&register",
				type: 'POST',
				data: data,
				success: function(data) {
					var url = window.location.protocol + "//" + window.location.host + "/biomass/user/registrationSuccess"; 
					window.location.replace(url);
				},
				error: function(jqXHR, textStatus, errorThrown) {
					alert(jqXHR.responseText);
				}
			});
		}
	}); 
});

function isEmailValid(email) {
	var pattern =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	return pattern.test(email);  // returns a boolean 
}

//Validates the form values
function validate() {
	var firstname = $('#firstname').val();
 	var lastname = $('#lastname').val();			
	var username = $('#username').val();				
	var email = $('#email').val();
	var flag = true;
	clearErrorMessage();
	
	if(!firstname.trim()) {
		$('#errorFirstname').html("*Required");	
		flag = false;
	} 
	
	if(!lastname.trim()) {
		$('#errorLastname').html("*Required");
		flag = false;
	} 
	
	if(!username.trim()) {
		$('#errorUsername').html("*Required");
		flag = false;
	} 
		
	if(!isEmailValid(email)){
		$('#errorEmail').html("*Please enter valid email address.");
		flag = false;
	}
	return flag;
}

function clearErrorMessage() {
	$('#errorFirstname').html("");
	$('#errorLastname').html("");
	$('#errorUsername').html("");
	$('#errorEmail').html("");
}
</script>
</body>
</html>
