<%@ page isELIgnored ="false" pageEncoding="UTF-8" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags" %>
<t:defaultlayout>
    <jsp:attribute name="header">
        <style type="text/css">
    		.pageContent {
    			padding-left: 30px;
    			padding-bottom: 30px;
    		}
    		h2 {
    			margin-bottom: 3px;
    			padding-top: 25px;
    			color: #394144;
    		}
    		div.belowTitle {
    			width: 1050px;
    			margin-bottom: 30px;
    			background-color: #ffffff;
    			height: 3px;
    		}
    	</style>
    	<script type="text/javascript">
    		$(document).ready(function() {
    			$("#submitButton").click(function() {
    				var newPw = $("#newPassword");
    				var confirmPw = $("#confirmPassword");
    				if (newPw.val() != confirmPw.val()) {
    					alert("Uusi salasanasi ja vahvistuskenttÃ¤Ã¤n kirjoittamasi salasana eivÃ¤t tÃ¤smÃ¤Ã¤. YritÃ¤ uudestaan.");
    					newPw.val("");
    					confirmPw.val("");
    					return false;
    				}
    				$.ajax({
    					url: "${pageContext.request.contextPath}/user/changePassword",
					    type: "POST",
					    data: {
					    	oldPassword: $("#oldPassword").val(),
					    	newPassword: $("#newPassword").val()
					    },
					    success: function() {
						   window.location = "${pageContext.request.contextPath}/${returnPath}";
					    },
					    error: function() {
						   alert("Salasanan vaihto epÃ¤onnistui. Tarkista antamasi salasanat.");
					    }
    				});
    				return true;
    			});
    		});
    	</script>
    </jsp:attribute>
    <jsp:body>
        <div class="pageContent">
    	<h2>Salasanan vaihto</h2>
    	<div class="belowTitle"></div>
    	<table>
    	<tr><td>Vanha salasana</td><td><input type="password" id="oldPassword" /></td></tr>
    	<tr><td>Uusi salasana</td><td><input type="password" id="newPassword" /></td></tr>
    	<tr><td>Vahvista uusi salasana</td><td><input type="password" id="confirmPassword" /></td></tr>
    	</table>
    	</div>
    	
    	<div class="pageFooter">
    		<a class="backButton" href="${pageContext.request.contextPath}/${returnPath}">Palaa</a>
    		<button type="button" id="submitButton" class="forwardButton floatRight">Vaihda salasana</button>
        </div>
    </jsp:body>
</t:defaultlayout>
