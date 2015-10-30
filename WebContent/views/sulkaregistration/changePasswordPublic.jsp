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
    				var submitButton = $(this);
    				var newPw = $("#newPassword");
    				var confirmPw = $("#confirmPassword");
    				if (newPw.val() != confirmPw.val()) {
    					alert("Uusi salasanasi ja vahvistuskenttÃ¤Ã¤n kirjoittamasi salasana eivÃ¤t tÃ¤smÃ¤Ã¤. YritÃ¤ uudestaan.");
    					newPw.val("");
    					confirmPw.val("");
    					return false;
    				}
    				submitButton.prop("disabled", true);
    				$.ajax({
    					url: "${pageContext.request.contextPath}/user/changePasswordWithToken",
						type: "POST",
						data: {userId: "${model.userId}", token: "${model.token}", newPassword: newPw.val()},
						success: function() {
							submitButton.hide();
							$("#passwordChanged").show();
						},
						error: function() {
							alert("Salasanan vaihto ei onnistunut. Varmista, ettÃ¤ kÃ¤yttÃ¤mÃ¤si salasanan vaihtolinkki on vielÃ¤ voimassa");
							submitButton.prop("disabled", false);
						}
    				});
    			});
    		});
    	</script>
    </jsp:attribute>
    <jsp:body>
        <div class="pageContent">
    	<h2>Salasanan vaihto</h2>
    	<div class="belowTitle"></div>
    	<table>
    	<tr><td>Uusi salasana</td><td><input type="password" name="newPassword" id="newPassword" /></td></tr>
    	<tr><td>Vahvista uusi salasana</td><td><input type="password" id="confirmPassword" /></td></tr>
    	</table>
    	<button id="submitButton">Vaihda salasana</button>
    	<p id="passwordChanged" style="display:none">Salasanasi on vaihdettu.
    	Nyt voit <a href="${pageContext.request.contextPath}/">kirjautua sisÃ¤Ã¤n jÃ¤rjestelmÃ¤Ã¤n</a>.</p>
    	</div>
    	<div class="pageFooter">
        </div>
    </jsp:body>
</t:defaultlayout>
