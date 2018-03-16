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
                margin-left: 153px;
            }
            #collection, #results {
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
    </style>
    <!-- ############# /css ################# -->
</head>
<body>

<nav id="maptools">    
    <div id="etusivu"> 	
    	<a href="#" id="frontpage">Takaisin etusivulle</a>
    </div>   
</nav>

<div id="content">
	<div id="collection" >
	<h2>Tietojen tarkastelu</h2>
	<span class="content-column">
		<label class="column-field-label">Attribute:</label> <br>
		<select id="selectAttribute" name="selectAttribute" type="text" required>
			<option value="">Valitse</option>
			<option value="2">Kuusi, elävät oksat</option>
		</select>
	</span>
	<span class="content-column">
		<label class="column-field-label">Vuosi:</label> <br>
		<select id="selectYear" name="selectYear" type="text" required>
			<option value="">Valitse</option>
			<option value="4">2015</option>
		</select>
	</span>
	<span class="content-column">
		<label class="column-field-label">Alue:</label> <br>
		<select id="selectArea" name="selectArea" type="text" required>
			<option value="">Valitse</option>
			<option value="743">Seinäjoki</option>
		</select>
	</span>
	<br/>	
	<span class="content-column">
		<button id="loadXlSXBtn">Lataa xlsx</button>
	</span>
	</div>
</div>
<script>
	$('#frontpage').click(function () {		
		var host = window.location.protocol + "//" + window.location.host; 
		window.location.replace(host);
	});
	$(document).ready(function () {	
		$('#loadXlSXBtn').click(function () {
			if( $("#selectAttribute").val() != null &&
				$("#selectYear").val() != null && $("#selectArea").val() != null) {
				var values = {
						attribute: $("#selectAttribute").val(),
						year: $("#selectYear").val(),
						area: $("#selectArea").val()
				};
				
				//TODO: create ajax request/response
			}
			
			
		});
	});
	
</script>
</body>
</html>
