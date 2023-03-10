<%@ page contentType="text/html; charset=UTF-8" isELIgnored="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<!DOCTYPE html>
<html>
<head>
<title><spring:message code="bma.title" /></title>
<link rel="shortcut icon" href="${pageContext.request.contextPath}/favicon.ico"
	type="image/x-icon" />
<script src="https://code.jquery.com/jquery-1.12.0.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">

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
	.content-column {
		display: block;
	}
	.column-field-label {
		font-size: 18px;
		line-height: 2;
	}
	.column-field-input {
		border-radius: 5px;
		font-size: 14px;
		height: 30px;
		padding-left: 10px;
		padding-right: 10px;
	}
	.column-field-input:focus {
		background-color: #ECF9EC;
	}
	#etusivu {
		padding-top: 20px;
		text-align: center;
	}
	#frontpage, #frontpage:visited, #deleteUser {
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
		margin: 10px 20px 0px 0px;
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
	h2 {
		color: #00b5e2;
		margin-bottom: 20px;
	}
	.change-password {
		font-size: 16px;
		margin-top: 30px;
	}
}
</style>
<!-- ############# /css ################# -->
</head>
<body>

	<nav id="maptools">
		<div id="etusivu">
			<a href="#" id="frontpage"><spring:message code="bma.backToFrontpage" /></a><br><br>
			<c:if test="${!empty id}">
				<a href="#" id="deleteUser"><spring:message code="bma.deleteUserAccount" /></a>
			</c:if>
		</div>
	</nav>

	<div id="content">
		<div id="register">
			<div id="errorGeneral" class="alert alert-danger hidden" role="alert"></div>
			<c:choose>
				<c:when test="${editExisting}">
					<h2>
						<spring:message code="bma.editYourInformationTitle" />
					</h2>
					<span class="content-column"> 
						<label class="column-field-label"><spring:message code="bma.firstname" /></label> <br>
						<input class="column-field-input" size="20" id="firstname" name="firstname"	type="text" required title='<spring:message code="bma.fillTheField" />'>
						<span id="errorFirstname" class="alert alert-danger hidden"	role="alert"></span>
					</span>
					<span class="content-column">
						<label class="column-field-label"><spring:message code="bma.lastname" /></label> <br>
						<input class="column-field-input" size="20" id="lastname" name="lastname"	type="text" required title='<spring:message code="bma.fillTheField" />'>
						<span id="errorLastname" class="alert alert-danger hidden" role="alert"></span>
					</span>
					<span class="content-column">
						<label class="column-field-label"><spring:message code="bma.email" /></label> <br>
						<input class="column-field-input" size="20" id="email" name="email"	type="email" required title='<spring:message code="bma.fillTheField" />'>
						<span id="errorEmail" class="alert alert-danger hidden"	role="alert"></span>
					</span>
					<br />
					<span>
						<button id="saveBtn"><spring:message code="bma.save" /></button>
					</span>
					<span>
						<button id="cancelBtn"><spring:message code="bma.cancel" /></button>
					</span>
					<span class="content-column change-password">
						<a href="#" id="changePassword"><spring:message	code="bma.passwordReset.submit" /></a>
					</span> 
				(<spring:message code="bma.linkForPasswordResetHelp" />)
			</c:when>
				<c:otherwise>
					<h2><spring:message code="bma.register" /></h2>
					<div>
						<spring:message code="bma.after_register_possiblility_message" />
					</div>
					<div id="registerLeaflet" class="customLink">
						<a href="https://www.luke.fi/wp-content/uploads/2016/04/rekisteriseloste_biomassa_atlas.pdf"
							target="_blank"> <spring:message code="bma.registerLeaflet" /></a>
					</div>
					<br>
					<span class="content-column">
						<label class="column-field-label"><spring:message code="bma.firstname" /></label> <br>
						<input class="column-field-input" size="20" id="firstname" name="firstname"	type="text" required title='<spring:message code="bma.fillTheField" />'>
						<span id="errorFirstname" class="alert alert-danger hidden"	role="alert"></span>
					</span>
					<span class="content-column">
						<label class="column-field-label"><spring:message code="bma.lastname" /></label> <br>
						<input class="column-field-input" size="20" id="lastname" name="lastname"	type="text" required title='<spring:message code="bma.fillTheField" />'>
						<span id="errorLastname" class="alert alert-danger hidden" role="alert"></span>
					</span>
					<span class="content-column">
						<label class="column-field-label"><spring:message code="bma.registerUsername" /></label> <br>
						<input class="column-field-input" size="20" id="username" name="username"	type="text" required title='<spring:message code="bma.fillTheField" />'>
						<span id="errorUsername" class="alert alert-danger hidden" role="alert"></span>
					</span>
					<span class="content-column">
						<label class="column-field-label"><spring:message code="bma.email" /></label> <br>
						<input class="column-field-input" size="20" id="email" name="email"	type="email" required title='<spring:message code="bma.fillTheField" />'>
						<span id="errorEmail" class="alert alert-danger hidden"	role="alert"></span>
					</span>
					<br />
					<span>
						<button id="registerBtn"><spring:message code="bma.register" /></button>
					</span>
					<span>
						<button id="cancelBtn"><spring:message code="bma.cancel" /></button>
					</span>
				</c:otherwise>
			</c:choose>
		</div>
	</div>

	<div id="deleteDialog" class="modal fade">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-body">
					<button type="button" class="close" data-dismiss="modal">&times;</button>
					<spring:message code="bma.userAccountWillBeDeleted" />
				</div>
				<div class="modal-footer">
					<button id="deleteOk"><spring:message code="bma.yes" /></button>
					<button data-dismiss="modal"><spring:message code="bma.no" /></button>
				</div>
			</div>
		</div>
	</div>

	<script type="text/javascript">
$(document).ready(function () {
	<c:if test="${editExisting}">
	    $("body").hide();
	    $.ajax({
			url: "/action?action_route=UserRegistration&edit=yes",
			type: 'POST',			
			success: function(data) {				
				$("#firstname").val(data.firstName);
				$("#lastname").val(data.lastName);
				$("#email").val(data.email);
				$("body").show();
			},
			error: function(jqXHR, textStatus, errorThrown) {
				alert(jqXHR.responseText);
			}
		});	
	</c:if>
	$('#frontpage, #cancelBtn').click(function () {		
		var host = window.location.protocol + "//" + window.location.host; 
		window.location.replace(host);
	});
	
	$('#changePassword').click(function () {		
		var host = window.location.protocol + "//" + window.location.host;		
		jQuery.ajax({
			url: host + "/action?action_route=UserPasswordReset&email=" + jQuery('#email').val(),
			type: 'POST',			
			success: function(data) {
				var url = window.location.protocol + "//" + window.location.host + "/biomass/user/emailSent"; 
				window.location.replace(url);
			},
			error: function(jqXHR, textStatus, errorThrown) {
				errorMsg("#errorGeneral", "SERVER ERROR");
			} 
		});			
	});
	
	$('#registerBtn').click(function () {
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
					var errorResponse = jqXHR.responseText;
					if (errorResponse.toLowerCase().indexOf("email") >= 0) {
						errorMsg("#errorEmail", '<spring:message code="bma.emailExists"/>');
					} else if (errorResponse.toLowerCase().indexOf("username") >= 0) {
						errorMsg("#errorUsername", '<spring:message code="bma.usernameExists"/>');
					} else {
						errorMsg("#errorGeneral", jqXHR.responseText);
					}					
				}
			});
		}
	});
	
	$('#saveBtn').click(function () {
		var data = { 
					id: "${id}",
					firstname: jQuery('#firstname').val(),
				 	lastname: jQuery('#lastname').val(),				
					email: jQuery('#email').val()
				   };
		var host = window.location.protocol + "//" + window.location.host;
		if (validate()) { 
			jQuery.ajax({
				url: host + "/action?action_route=UserRegistration&update=yes",
				type: 'POST',
				data: data,
				success: function(data) {
					var url = window.location.protocol + "//" + window.location.host + "/biomass/user/updateSuccess"; 
					window.location.replace(url);
				},
				error: function(jqXHR, textStatus, errorThrown) {
					errorMsg("#errorGeneral", jqXHR.responseText);
				} 
			});	
		} 		
	});
	
	$('#deleteUser').click(function () {		
		var data = {id : '${id}'},
			host = window.location.protocol + "//" + window.location.host;
		
	    $("#deleteDialog").on("show.bs.modal", function() {
	        $("#deleteOk").on("click", function(e) {
	        	jQuery.ajax({
	    			url: host + "/action?action_route=UserRegistration&delete",
	    			type: 'POST',
	    			data: data,
	    			success: function(data) {		    				
	    				window.location.href = '/logout';
	    			},
	    			error: function(jqXHR, textStatus, errorThrown) {
	    				errorMsg("#errorGeneral", jqXHR.responseText);
	    			}
	    		});
	            $("#deleteDialog").modal('hide');
	        });
	    });
	    
	    $("#deleteDialog").on("hide.bs.modal", function() {
	        $("#deleteDialog .btn").off("click");
	    });
	    
		$("#deleteDialog").modal({"backdrop": "static", "keyboard": true, "show": true});
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
		errorMsg('#errorFirstname', '<spring:message code="bma.fieldIsRequired"/>');	
		flag = false;
	} 
	
	if(!lastname.trim()) {
		errorMsg('#errorLastname', '<spring:message code="bma.fieldIsRequired"/>');
		flag = false;
	} 
	
	if($('#username').length && !username.trim()) {
		errorMsg('#errorUsername', '<spring:message code="bma.fieldIsRequired"/>');
		flag = false;
	} 
		
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
