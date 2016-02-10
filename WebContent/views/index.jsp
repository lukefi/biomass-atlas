<%@ page contentType="text/html; charset=UTF-8" isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<!DOCTYPE html>
<html>
<head>
    <title><spring:message code="bma.title"/></title>
	<link rel="shortcut icon" href="${pageContext.request.contextPath}/Oskari${path}/icons/favicon.ico" type="image/x-icon" />
    <!-- ############# css ################# -->
    <link
            rel="stylesheet"
            type="text/css"
            href="${pageContext.request.contextPath}/Oskari${path}/css/icons.css"/>
    <link
            rel="stylesheet"
            type="text/css"
            href="${pageContext.request.contextPath}/Oskari${path}/css/forms.css"/>
    <link
            rel="stylesheet"
            type="text/css"
            href="${pageContext.request.contextPath}/Oskari${path}/css/portal.css"/>
    <link
            rel="stylesheet"
            type="text/css"
            href="${pageContext.request.contextPath}/Oskari${path}/css/overwritten.css"/>
    <script type="text/javascript" src="${pageContext.request.contextPath}/Oskari/libraries/jquery/jquery-1.10.2.js">
    </script>
    <script src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
   <!--  <script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
    <link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css"> -->
    <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
    <style type="text/css">
        @media screen {
            body {
                margin: 0;
                padding: 0;
            }

            #mapdiv {
                width: 100%;
            }

            #maptools {
                background-color: #333438;
                height: 100%;
                position: absolute;
                top: 0;
                width: 153px;
                z-index: 2;
            }

            #contentMap {
                height: 100%;
                margin-left: 153px;
            }

            #login {
                margin-left: 5px;
            }

            #login input[type="text"], #login input[type="password"] {
                width: 90%;
                margin-bottom: 5px;
                background-image: url("${pageContext.request.contextPath}/Oskari${path}/images/forms/input_shadow.png");
                background-repeat: no-repeat;
                padding-left: 5px;
                padding-right: 5px;
                border: 1px solid #B7B7B7;
                border-radius: 4px 4px 4px 4px;
                box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1) inset;
                color: #878787;
                font: 13px/100% Arial,sans-serif;
            }
            #login input[type="submit"] {
                width: 90%;
                margin-bottom: 5px;
                padding-left: 5px;
                padding-right: 5px;
                border: 1px solid #B7B7B7;
                border-radius: 4px 4px 4px 4px;
                box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1) inset;
                color: #878787;
                font: 13px/100% Arial,sans-serif;
            }
            #login p.error {
                font-weight: bold;
                color : red;
                margin-bottom: 10px;
            }

            #login a {
                color: #FFF;
                padding: 5px;
            }
            
            .error{
            	color: red;
            }
            .italic{
            	font-style: italic;
            }
             #register, #feedback{
            	text-align: center;
            	padding-top: 20px;
            }
            #user{
            	color: #c2c2c2;
            	font-style: italic;
            }
            #bmaLayerContent {
            	z-index: 1000;
            	position: absolute;
            	bottom: 0;
            	left: 50%;
            	width: 600px;
            	height: 500px;
            }
            #bmaLayerTabs {
            	display:none;
            	position: relative;
            	background: #ffffff;
            	height: 90%;
            }
            #bmaLayerSelectorBtn {
            	position: absolute;
            	bottom: 0;
            	top: 90%;
            	left: 63%;
            	width: 200px;
            	height: 50px;          	
            }
            .tab-content {
			    height: 90%; 
			    border-left: 2px solid #ccc ;
			    border-right: 2px solid #ccc ;
			    border-top: 2px solid #ccc ;
			    overflow-y: auto;
			    padding-left: 20px;			    
			}
			#bmaLayerTabs > ul > li {
				font-size: 18px;
			}
			.nav > li > a:hover,
			.nav > li > a:focus {
			    text-decoration: none;
			    background-color: #e0e0d1;
			}
			#forestLayerTable, #fieldLayerTable {
				margin-top: 20px; 			
				width: 90%;
			}			
			#forestLayerTable td, #fieldLayerTable td {
				text-align: center;
			}			
        	#forestLayerTable thead tr th {
	        	background-color: #004c99;
	        	color: #ffffff;
	        	text-align: center;
        	}
        	#forestLayerTable tbody tr th, #fieldLayerTable tbody tr th  {
        		background-color: #ffffff; 
        	}
        	
    </style>
    <!-- ############# /css ################# -->
</head>
<body>

<nav id="maptools">
    <div id="loginbar">
    </div>
    <div id="menubar">
    </div>
    <div id="divider">
    </div>
    <div id="toolbar">
    </div>
    <div id="register">
   	    <c:if test="${empty _logout_uri}"> 
    		<a href="${pageContext.request.contextPath}/biomass/user/register"><spring:message code="bma.register"/></a>
   	    </c:if>
    </div>
    <div id="login">
        <c:choose>
            <c:when test="${!empty loginState}">
                <p class="error"><spring:message code="bma.invalidPassword"/></p>
            </c:when>
        </c:choose>
        <c:set var="user" value="fi.nls.oskari.domain.User" />
        <%-- when test="${!empty sessionScope[user]}" --%>
        <c:choose>
           <c:when test="${!empty _logout_uri && empty _login_uri}">            
	   	    	<span id="user">${sessionScope[user].firstname} ${sessionScope[user].lastname}</span>
	   	    	<span><a href="#" id="edit">(<spring:message code="bma.edit"/>)</a></span><br>
                <a href="${_logout_uri}"><spring:message code="bma.logout"/></a>
            </c:when>            
            <c:otherwise>
                <form action='${_login_uri}' method="post" accept-charset="UTF-8">
                    <input size="16" id="username" name="${_login_field_user}" type="text" placeholder="<spring:message code="bma.username"/>" autofocus
                           required>
                    <input size="16" id="password" name="${_login_field_pass}" type="password" placeholder="<spring:message code="bma.password"/>" required>
                    <input type="submit" id="submit" value="<spring:message code="bma.login"/>">
                </form>
            </c:otherwise>           
        </c:choose>
    </div>
    <div id="feedback">   	    
    	<a href="${pageContext.request.contextPath}/biomass/feedback">Feedback</a>
    </div>
</nav>
<div id="contentMap" class="oskariui container-fluid">
    <div id="menutoolbar" class="container-fluid"></div>
    <div class="row-fluid oskariui-mode-content" style="height: 100%; background-color:white;">
        <div class="oskariui-left"></div>
        <div class="span12 oskariui-center" style="height: 100%; margin: 0;">
            <div id="mapdiv"></div>
        </div>
        <div class="oskari-closed oskariui-right">
            <div id="mapdivB"></div>
        </div>
    </div>
</div>

<div id="bmaLayerContent">
	<div id="bmaLayerTabs">
		<ul class="nav nav-pills red">	   
		    <li class="active" ><a data-toggle="tab" href="#forestLayer">Forest</a></li>
		    <li><a data-toggle="tab" href="#fieldLayer">Field</a></li>	    
		 </ul>
		 <div class="tab-content" >
	        <div id="forestLayer" class="tab-pane fade in active">
	            <table class="table table-hover table-bordered" id="forestLayerTable">
				  <thead class="thead-default">
				    <tr>
				      <th></th>
				      <th>Kuusi</th>
				      <th>Lehtipuut</th>
				      <th>Mänty</th>
				    </tr>
				  </thead>
				  <tbody>
				    <tr>
				      <th scope="row">Elävät oksat</th>
				      <td><input type="checkbox" name="forest" value='244'></td>
				      <td><input type="checkbox" name="forest" value='251'></td>
				      <td><input type="checkbox" name="forest" value='258'></td>
				    </tr>
				    <tr>
				      <th scope="row">Hukkapuuosa</th>
				      <td><input type="checkbox" name="forest" value='245'></td>
				      <td><input type="checkbox" name="forest" value='252'></td>
				      <td><input type="checkbox" name="forest" value='259'></td>
				    </tr>
				    <tr>
				      <th scope="row">Juuret, d > 1 cm</th>
				      <td><input type="checkbox" name="forest" value='246'></td>
				      <td><input type="checkbox" name="forest" value='253'></td>
				      <td><input type="checkbox" name="forest" value='260'></td>
				    </tr>
				    <tr>
				      <th scope="row">Kanto</th>
				      <td><input type="checkbox" name="forest" value='247'></td>
				      <td><input type="checkbox" name="forest" value='254'></td>
				      <td><input type="checkbox" name="forest" value='261'></td>
				    </tr>
				    <tr>
				      <th scope="row">Kuolleet oksat</th>
				      <td><input type="checkbox" name="forest" value='248'></td>
				      <td><input type="checkbox" name="forest" value='255'></td>
				      <td><input type="checkbox" name="forest" value='262'></td>
				    </tr>
				    <tr>
				      <th scope="row">Kuorellinen runkopuu</th>
				      <td><input type="checkbox" name="forest" value='249'></td>
				      <td><input type="checkbox" name="forest" value='256'></td>
				      <td><input type="checkbox" name="forest" value='263'></td>
				    </tr>
				    <tr>
				      <th scope="row">Neulaset</th>
				      <td><input type="checkbox" name="forest" value='250'></td>
				      <td></td>
				      <td><input type="checkbox" name="forest" value='264'></td>
				    </tr>
				    <tr>
				      <th scope="row">Lehvästö</th>
				      <td></td>
				      <td><input type="checkbox" name="forest" value='257'></td>
				      <td></td>
				    </tr>
				  </tbody>
				</table>	             
	        </div>
	        <div id="fieldLayer" class="tab-pane fade">
	           <table class="table table-hover table-bordered" id="fieldLayerTable">				  
				  <tbody>
				    <tr>
				      <th scope="row">Juurekset ja vihannekset</th>
				      <td><input type="checkbox" name="field" value='285'></td>				      
				    </tr>
				    <tr>
				      <th scope="row">Kasvihuonekasvit</th>
				      <td><input type="checkbox" name="field" value='286'></td>
				    </tr>
				    <tr>
				      <th scope="row">Kesanto</th>
				      <td><input type="checkbox" name="field" value='287'></td>
				    </tr>
				    <tr>
				      <th scope="row">Kuitu- ja energiakasvit</th>
				      <td><input type="checkbox" name="field" value='288'></td>
				    </tr>
				    <tr>
				      <th scope="row">Maisema- ja metsäpellot</th>
				      <td><input type="checkbox" name="field" value='289'></td>
				    </tr>
				    <tr>
				      <th scope="row">Nurmi</th>
				      <td><input type="checkbox" name="field" value='290'></td>
				    </tr>
				    <tr>
				      <th scope="row">Peruna</th>
				      <td><input type="checkbox" name="field" value='291'></td>
				    </tr>
				    <tr>
				      <th scope="row">Siemenviljely</th>
				      <td><input type="checkbox" name="field" value='292'></td>
				    </tr>
				    <tr>
				      <th scope="row">Sokerijuurikas</th>
				      <td><input type="checkbox" name="field" value='293'></td>
				    </tr>
				    <tr>
				      <th scope="row">Suojavyöhyke- ja kaista</th>
				      <td><input type="checkbox" name="field" value='294'></td>
				    </tr>
				    <tr>
				      <th scope="row">Valkuaiskasvit</th>
				      <td><input type="checkbox" name="field" value='295'></td>
				    </tr>
				    <tr>
				      <th scope="row">Viljat</th>
				      <td><input type="checkbox" name="field" value='296'></td>
				    </tr>
				    <tr>
				      <th scope="row">Viljelemätön</th>
				      <td><input type="checkbox" name="field" value='297'></td>
				    </tr>
				    <tr>
				      <th scope="row">Öljykasvit</th>
				      <td><input type="checkbox" name="field" value='298'></td>
				    </tr>
				  </tbody>
				</table>	  
	        </div>
	      </div>
      </div>
      <button type="button" class="btn btn-primary btn-lg glyphicon glyphicon-triangle-right" id="bmaLayerSelectorBtn" > BMA Layers</button>     	     
 </div> 	

<!-- ############# Javascript ################# -->

<!--  OSKARI -->

<script type="text/javascript">
    var ajaxUrl = '${ajaxUrl}';
    var viewId = '${viewId}';
    var language = '${language}';
    var preloaded = ${preloaded};
    var controlParams = ${controlParams};
</script>

<script type="text/javascript"
        src="${pageContext.request.contextPath}/Oskari/bundles/bundle.js">
</script>

<!--  OPENLAYERS -->
<script type="text/javascript"
        src="${pageContext.request.contextPath}/Oskari/packages/openlayers/startup.js">
</script>

<c:if test="${preloaded}">
    <!-- Pre-compiled application JS, empty unless created by build job -->
    <script type="text/javascript"
            src="${pageContext.request.contextPath}/Oskari${path}/oskari.min.js">
    </script>
    <!-- Minified CSS for preload -->
    <link
            rel="stylesheet"
            type="text/css"
            href="${pageContext.request.contextPath}/Oskari${path}/oskari.min.css"
            />
    <%--language files --%>
    <script type="text/javascript"
            src="${pageContext.request.contextPath}/Oskari${path}/oskari_lang_all.js">
    </script>
    <script type="text/javascript"
            src="${pageContext.request.contextPath}/Oskari${path}/oskari_lang_${language}.js">
    </script>
</c:if>

<script type="text/javascript"
        src="${pageContext.request.contextPath}/Oskari${path}/index.js">
</script>

<script type="text/javascript">
$(document).ready(function () {
	$('#edit').click(function () {		
		var host = window.location.protocol + "//" + window.location.host; 
		jQuery.ajax({
			url: host + "/action?action_route=UserRegistration&edit=yes",
			type: 'POST',			
			success: function(data) {				
				var url = window.location.protocol + "//" + window.location.host + "/biomass/user/edit";				 
				/* Create a dynamic form and submit it. This helps to move ahead 
				 * to new view */				 
				var form = $('<form>', {action: url, method: 'POST'}).appendTo('body');
				form.append("<input type='text' name='userId' id='userId' value=" + data.id + ">");
				form.append("<input type='text' name='firstname' id='firstname' value=" + data.firstName + ">");
			    form.append("<input type='text' id='lastname' name='lastname' value=" + data.lastName + ">");
			    form.append("<input type='text' id='email' name='email' value=" + data.email + ">");
			    form.submit();
			},
			error: function(jqXHR, textStatus, errorThrown) {
				alert(jqXHR.responseText);
			}
		});		
	});
	
	
	$('#bmaLayerSelectorBtn').click(function () {
		$(this).toggleClass('glyphicon-triangle-right glyphicon-triangle-top');
		$('#bmaLayerTabs').toggle("slow", function() {});		
	});	
	
	
	$(document).on('change', '.tab-content input:checkbox', function() {
		var app = Oskari.app,
		 	sandbox = app.bundleInstances.mapfull.sandbox;		  
       if ($(this).is(':checked')) {
           sandbox.postRequestByName('AddMapLayerRequest', [this.value, false, false]);
       } else {
           sandbox.postRequestByName('RemoveMapLayerRequest', [this.value]);
       }	    
	});
	
	/* 	//close icon click event in layerselection
		 $(document).on('click', '.layer-info .layer-tool-remove', function () {		
		   var attributeId = $(this).parent().parent()[0].attributes.layer_id.nodeValue;
		   $('#forestLayerTable input[type=checkbox], #fieldLayerTable input[type=checkbox]').each(function () {
			   if (this.value == attributeId) 
				   this.checked = false;			   
		   });		   
	 }); 	 */	
	 	
});

$(window).load(function() {
	 setTimeout(function() {
	        $(document).trigger('afterReady');
	  }, 5000);	
});

$(document).bind('afterReady', function() {
	 var app = Oskari.app,
	 	sandbox = app.bundleInstances.mapfull.sandbox;
	 (function (sb) {
		var removeLayerModule = {
			init: function (sb) {
		    	sb.registerForEventByName(this, 'AfterMapLayerRemoveEvent');
		    },
		    getName: function () {
		    	return 'removeLayerModule';
		    }, 
		    onEvent: function (event) {		        	
		    	var mapLayer = event.getMapLayer();
				if ((mapLayer.getLayerName().toLowerCase().indexOf("bma") >= 0) && 
						(mapLayer.getLayerType().toLowerCase() == "wms")) {
					var attributeId = mapLayer.getId();
			       	$('#forestLayerTable input[type=checkbox], #fieldLayerTable input[type=checkbox]').each(function () {
					   if (this.value == attributeId) 
						   this.checked = false;			   
					});	        
				}
			}
		};
		sb.register(removeLayerModule);
	})(Oskari.getSandbox());	
});

</script>

<!-- ############# /Javascript ################# -->
</body>
</html>
