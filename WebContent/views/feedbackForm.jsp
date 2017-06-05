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
                margin-left: 170px;
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
			#frontpage, #frontpage:visited, #deleteUser {				
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
	    	<a href="#" id="frontpage"><spring:message code="bma.backToFrontpage"/></a>
	    </div>   
	</nav>
	
	<div id="content">
		<h2><spring:message code="bma.feedback"/></h2>
	    <span class="content-column">
	        <label class="column-field-label"><spring:message code="bma.feedback.name"/></label> <br>
	        <input class="column-field-input" type="text" id="name" name="name" required/>
	         <span id="errorName" class="error"></span>
	    </span>
	    <span class="content-column">
	        <label class="column-field-label"><spring:message code="bma.feedback.email"/></label> <br>
	        <input class="column-field-input" type="text" id="email" name="email" />
	        <span id="errorEmail" class="error"></span>                 
	    </span>
	    <span class="content-column">
	        <label class="column-field-label"><spring:message code="bma.feedback.message"/></label> <br>
	        <textarea class="column-field-input" style="height:150px; width:500px" id="message" name="message"></textarea>
	        <span id="errorMessage" class="error"></span>
	    </span>
	    <span>
	    	<input class="column-field-button" id="sendBtn" type="button" value=<spring:message code="bma.feedback.send"/> />
	    </span>
	</div>

<script type="text/javascript">
	$(document).ready(function () {	
		$('#frontpage').click(function () {		
			var host = window.location.protocol + "//" + window.location.host; 
			window.location.replace(host);
		});
		
		$('#sendBtn').click(function () {
			 var data = {
					name : $('#name').val(),
					email : $('#email').val(),
					message : $('#message').val()
			 };		
			var host = window.location.protocol + "//" + window.location.host;
			if (validate()) { 
				jQuery.ajax({
					url: host + "/biomass/feedback",
					type: 'POST',
					data: JSON.stringify(data),			
					beforeSend: function(xhr) {
				        xhr.setRequestHeader("Accept", "application/json");
				        xhr.setRequestHeader("Content-Type", "application/json");
				    },
					success: function(response) {
						if (response) {
							var url = window.location.protocol + "//" + window.location.host; 
							window.location.replace(url); 	
						} else {
							alert("SERVER ERROR");
						}			
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
		var name = $('#name').val();
	 	var email = $('#email').val();	
	 	var message = $('#message').val();	
		var flag = true;
		clearErrorMessage();
		
		if($('#name').length && !name.trim()) {
			$('#errorName').html('<spring:message code="bma.fieldIsRequired"/>');	
			flag = false;
		}
		if($('#message').length && !message.trim()) {
			$('#errorMessage').html('<spring:message code="bma.fieldIsRequired"/>');
			flag = false;
		}		
		if($('#email').val() != '') {
			if(!isEmailValid(email)){
				$('#errorEmail').html('<spring:message code="bma.invalidEmailError"/>');
				flag = false;
			}
		}
		return flag;
	}
	
	function clearErrorMessage() {
		$('#errorName').html("");		
		$('#errorEmail').html("");
		$('#errorMessage').html("");
	}
</script>

<!-- Google Analytics --> 
<script>
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', '<spring:eval expression="@environment.getProperty('googleAnalyticsWebPropertyId')" />', 'auto');
ga('send', 'pageview');
</script>
<!-- End Google Analytics -->
	
</body>
</html>
