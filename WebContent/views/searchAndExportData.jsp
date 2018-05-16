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
  	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
	<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.12.4/js/bootstrap-select.min.js"></script>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.12.4/css/bootstrap-select.min.css">
  	<!-- ############# css ################# -->   
  	<style type="text/css">
  		@media screen {
      		body {
		        margin: 0;
		        padding: 0;
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
				margin: 10px 20px 0px 15px;
				font-weight: normal;
				min-height: 3em;
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
		}
	</style>
  	<!-- ############# /css ################# -->
</head>
<body>

<nav id="maptools">    
    <div id="etusivu"> 	
    	<a href="#" id="frontpage">Takaisin etusivulle</a>
    </div>   
</nav>

<div class="container" role="main" style="margin-left: 170px;">
	<h2>Tietojen tarkastelu</h2>
	<div class="row">
		<label>Attribute:</label> <br>
		<div class="col-sm-11 col-md-11">
			<select id="selectAttribute" class="form-control selectpicker" multiple>
				<option value="">Valitse</option>
				<c:forEach var="attribute" items="${attributes}">
					<option value="${attribute.id}">${attribute.nameFI}</option>
				</c:forEach>
			</select>
		</div>
	</div>
	<br/>	<br/>	
	<div class="row">
		<label>Vuosi:</label> <br>
		<div class="col-sm-2 col-md-2">
			<select id="selectYear" name="selectAttribute" class="form-control selectpicker" data-width="fit" multiple>
			</select>
		</div>
	</div>
	<br/>	<br/>
	<div class="row">
		<button id="loadXlSXBtn">Lataa xlsx</button>
	</div>
</div>

<script>
	$('#frontpage').click(function () {		
		var host = window.location.protocol + "//" + window.location.host; 
		window.location.replace(host);
	});
	
	$(document).ready(function () {	
		$('#loadXlSXBtn').click(function () {
			if( $("#selectAttribute").val() != null && $("#selectYear").val() != null) {
				var url = "${pageContext.request.contextPath}/user/search/download";				
				var form = document.createElement("form");
			    form.setAttribute("method", "post");
			    form.setAttribute("action", url);
			    form.setAttribute("modelAttribute", "searchModel");			    
			    var inputHidden1 = document.createElement("input"); 
			    inputHidden1.setAttribute("type", "hidden");
			    inputHidden1.setAttribute("name", "attributeIds");
			    inputHidden1.setAttribute("value", $("#selectAttribute").val());
			    form.appendChild(inputHidden1);				    
			    var inputHidden2 = document.createElement("input"); 
			    inputHidden2.setAttribute("type", "hidden");
			    inputHidden2.setAttribute("name", "years");
			    inputHidden2.setAttribute("value", $("#selectYear").val());
			    form.appendChild(inputHidden2);			    
			    document.body.appendChild(form); // For Firefox to work.
			    form.submit();
			    document.body.removeChild(form); // For IE to work.	
			}
		});
		
		var createArray = function(selectorId) {
			var selectedValues = $(selectorId).val();
			var select = document.getElementById(selectorId);
			var optArray = [];
			for (var i = 0; i < select.length; i++) {
				var selectedVal = select.options[select.selectedIndex].value;
				if (select[i].value == selectedVal) {
					 optArray.push(select[i].value);
				}
			}
			return optArray;
		}
		
		var generateDynamicYearList = function() {
			var startYear = year = 2013,
				currentYear = (new Date()).getFullYear(),
				yearDiff = currentYear - startYear;
			for (i = 0; i <= yearDiff; i++) {        
		    $("#selectYear").get(0).options[$("#selectYear").get(0).options.length] = new Option(year, year);
		        year = year + 1;
			}
		}();
	});
	
</script>
</body>
</html>
