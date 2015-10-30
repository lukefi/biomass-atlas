<%@ page isELIgnored ="false" pageEncoding="UTF-8" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
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
    			$("#updateContactInfo").click(function() {
    				$("#contactInfoTable .forUpdate").each(function() {
    					var td = $(this);
    					td.prop("originalText", td.text());
    					var input = $("<input type='text'></input>");
    					input.attr("name", td.attr("data-name"));
    					input.val(td.prop("originalText"));
    					td.empty();
    					td.append(input);
    				});
    				$("#updateContactInfo").hide();
    				$("#saveContactInfo").show();
    				$("#cancelContactInfo").show();
    			});
    			$("#cancelContactInfo").click(function() {
    				$("#contactInfoTable .forUpdate").each(function() {
    					var td = $(this);
    					td.empty();
    					td.text(td.prop("originalText"));
    				});
    				$("#saveContactInfo").hide();
    				$("#cancelContactInfo").hide();
    				$("#updateContactInfo").show();
    			});
    			$("#saveContactInfo").click(function() {
    				var postData = {};
    				$("#contactInfoTable .forUpdate input").each(function() {
    					var input = $(this);
    					postData[input.attr("name")] = input.val();
    				});
    				$.ajax({
    				    url: "${pageContext.request.contextPath}/user/updateSelf",
					    type: "POST",
					    data: postData,
					    success: function() {
						   window.location = window.location;
					    },
					    error: function() {
						   alert("TODO yhteystietojen pÃ¤ivitys epÃ¤onnistui");
					    }
    				});
    			});
    		});
    	</script>
    </jsp:attribute>
    <jsp:body>
    <div class="pageContent">
    <h2>Yhteystietoni</h2>
    <div class="belowTitle"></div>
    
    <table id="contactInfoTable">
    <tr><td>Nimi</td><td><c:out value="${model.firstName}"/> <c:out value="${model.lastName}"/></td></tr>
    <tr><td>OrganisaatioyksikkÃ¶ tms. (ei pakollinen)</td><td class="forUpdate" data-name="address1"><c:out value="${model.address1}"/></td></tr>
    <tr><td>Jakeluosoite</td><td class="forUpdate" data-name="address2"><c:out value="${model.address2}"/></td></tr>
    <tr><td>Postinumero ja postitoimipaikka</td><td class="forUpdate" data-name="address3"><c:out value="${model.address3}"/></td></tr>
    <tr><td>Puhelinnumero</td><td class="forUpdate" data-name="phone"><c:out value="${model.phone}"/></td></tr>
    <tr>
    	<td>SÃ¤hkÃ¶postiosoite</td><td><c:out value="${model.email}"/>
    	</td>
    </tr>
    <tr><td>KÃ¤yttÃ¤jÃ¤tunnus</td><td><sec:authentication property="principal.username" /></td></tr>
    </table>
    <p><a href="${pageContext.request.contextPath}/account/changePassword">Salasanan vaihto</a></p>
    
	</div>
	
	<div class="pageFooter">
		<a class="backButton" href="${pageContext.request.contextPath}/${model.returnPath}">Palaa</a>
		<button id="updateContactInfo" class="forwardButton floatRight">PÃ¤ivitÃ¤ tietoja</button>
    	<button id="saveContactInfo" class="forwardButton floatRight" style="display:none">Tallenna</button>
    	<!-- <button id="cancelContactInfo" style="display:none">Peruuta</button>  -->
	</div>
    </jsp:body>
</t:defaultlayout>
