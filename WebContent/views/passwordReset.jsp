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
                    
            #passwordReset {
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
	<div id="passwordReset">
		<h2>Salasanan vaihto</h2>
		<form:form>
			<span class="content-column">
				<span class="content-column"><label class="column-field-label">Uusi salasana</label></span>
				<span class="content-column"><input class="column-field-input" size="16" id="password" name="password" type="password" autofocus required></span>
			</span>
			<span class="content-column">
				<span class="content-column"><label class="column-field-label">Vahvista uusi salasana</label></span>
				<span class="content-column"><input class="column-field-input" size="16" id="confirmPassword" name="confirmPassword" type="password" required>
				<label id="unmatchedPassword" class="error"></label></span>
			</span>			
			<span>				
				<span><input class="column-field-button" size="16" id="reset" type="button" value="Submit"></span>
			</span>
				
			<span class="error"><label id="serverError"></label></span>
		</form:form>
		
		
	</div>
</div>

<script type="text/javascript">
$(document).ready(function () {
	$('#frontpage, #cancel').click(function () {		
		var host = window.location.protocol + "//" + window.location.host; 
		window.location.replace(host);
	});
	
	$('#reset').click(function () {		
		var password = jQuery('#password').val();
		var confirmPassword = jQuery('#confirmPassword').val();
		
		if (password != confirmPassword) {
			jQuery('#unmatchedPassword').text("Confirm password doesn't match.");
			return;
		}
		
		var uuid = '${uuid}';
		var host = window.location.protocol + "//" + window.location.host; 
		jQuery.ajax({
			url: host + "/action?action_route=UserPasswordReset&password",
			type: 'POST',
			contentType: "application/json; charset=UTF-8",
			data: JSON.stringify({
					password: password,
					uuid: uuid					
				}),
			success: function(data) {
				var url = window.location.protocol + "//" + window.location.host + "/biomass/user/passwordChanged"; 
				window.location.replace(url);
			},
			error: function(jqXHR, textStatus, errorThrown) {
				//jQuery("#serverError").text("SERVER ERROR");
				alert(jqXHR.responseText);
			}
		});				
	});
	
});

</script>
</body>
</html>
