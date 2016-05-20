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
            	right: 20px;
            	height: 450px;
            	width: 500px;
            	display: none;
            	background-color: #ffffff;
            }
            /* #bmaLayerButtonDiv {
            	z-index: 1001;
            	position: absolute;
            	float: right;
            	bottom: 0;
            	right: 100px;
            } */
            /* Style for button */
            /* #bmaLayerSelectorBtn {
            	width: 150px;
            	background: #017a24;
				background-image: -webkit-linear-gradient(top, #017a24, #034710);
				background-image: -moz-linear-gradient(top, #017a24, #034710);
				background-image: -ms-linear-gradient(top, #017a24, #034710);
				background-image: -o-linear-gradient(top, #017a24, #034710);
				background-image: linear-gradient(to bottom, #017a24, #034710);
				-webkit-border-radius:10;
				-moz-border-radius: 10;
				border-radius: 10px;
				font-family: Arial;
				color: #ffffff;
				font-size: 20px;
				padding: 10px 25px 10px 25px;
				text-decoration: none;
			}
			#bmaLayerSelectorBtn:hover {
				background: #034710;
				background-image: -webkit-linear-gradient(top, #034710, #017a24);
				background-image: -moz-linear-gradient(top, #034710, #017a24);
				background-image: -ms-linear-gradient(top, #034710, #017a24);
				background-image: -o-linear-gradient(top, #034710, #017a24);
				background-image: linear-gradient(to bottom, #034710, #017a24);
				text-decoration: none;
			} */
           
            .tab-content {
			    height: 90%; 
			    border-left: 2px solid #ccc ;
			    border-right: 2px solid #ccc ;
			    border-top: 2px solid #ccc ;
			    overflow-y: auto;
			    padding-left: 20px;			    
			}
			/* BMA tabs */
			#bmaLayerContent > ul > li {
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
	   	    	<span><a href="/biomass/user/edit">(<spring:message code="bma.edit"/>)</a></span><br>
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
    	<a href="${pageContext.request.contextPath}/biomass/feedback">Palaute</a>
    </div>
    <div id="registerLeaflet">   	    
    	<a href="${pageContext.request.contextPath}/download/registerLeaflet">Henkilörekisteriseloste</a>
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
    
    <!-- BMA Layer Content div -->
    <div id="bmaLayerContent">
		<ul class="nav nav-pills">	   
		    <li class="active" ><a data-toggle="tab" href="#forestLayer">Metsä</a></li>
		    <li><a data-toggle="tab" href="#fieldLayer">Pelto</a></li>	    
		 </ul>
		 <div class="tab-content table-responsive" >
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
				      <td><input type="checkbox" name="forest" value='1002'></td>
				      <td><input type="checkbox" name="forest" value='1009'></td>
				      <td><input type="checkbox" name="forest" value='1016'></td>
				    </tr>
				    <tr>
				      <th scope="row">Hukkapuuosa</th>
				      <td><input type="checkbox" name="forest" value='1003'></td>
				      <td><input type="checkbox" name="forest" value='1010'></td>
				      <td><input type="checkbox" name="forest" value='1017'></td>
				    </tr>
				    <tr>
				      <th scope="row">Juuret, d > 1 cm</th>
				      <td><input type="checkbox" name="forest" value='1004'></td>
				      <td><input type="checkbox" name="forest" value='1011'></td>
				      <td><input type="checkbox" name="forest" value='1018'></td>
				    </tr>
				    <tr>
				      <th scope="row">Kanto</th>
				      <td><input type="checkbox" name="forest" value='1005'></td>
				      <td><input type="checkbox" name="forest" value='1012'></td>
				      <td><input type="checkbox" name="forest" value='1019'></td>
				    </tr>
				    <tr>
				      <th scope="row">Kuolleet oksat</th>
				      <td><input type="checkbox" name="forest" value='1006'></td>
				      <td><input type="checkbox" name="forest" value='1013'></td>
				      <td><input type="checkbox" name="forest" value='1020'></td>
				    </tr>
				    <tr>
				      <th scope="row">Kuorellinen runkopuu</th>
				      <td><input type="checkbox" name="forest" value='1007'></td>
				      <td><input type="checkbox" name="forest" value='1014'></td>
				      <td><input type="checkbox" name="forest" value='1021'></td>
				    </tr>
				    <tr>
				      <th scope="row">Neulaset</th>
				      <td><input type="checkbox" name="forest" value='1008'></td>
				      <td></td>
				      <td><input type="checkbox" name="forest" value='1022'></td>
				    </tr>
				    <tr>
				      <th scope="row">Lehvästö</th>
				      <td></td>
				      <td><input type="checkbox" name="forest" value='1015'></td>
				      <td></td>
				    </tr>
				  </tbody>
				</table>	             
	        </div> <!-- forestLayer div ends -->
	        <div id="fieldLayer" class="tab-pane fade">
	           <table class="table table-hover table-bordered" id="fieldLayerTable">				  
				  <tbody>
				    <tr>
				      <th scope="row">Juurekset ja vihannekset</th>
				      <td><input type="checkbox" name="field" value='1043'></td>				      
				    </tr>
				    <tr>
				      <th scope="row">Kasvihuonekasvit</th>
				      <td><input type="checkbox" name="field" value='1044'></td>
				    </tr>
				    <tr>
				      <th scope="row">Kesanto</th>
				      <td><input type="checkbox" name="field" value='1045'></td>
				    </tr>
				    <tr>
				      <th scope="row">Kuitu- ja energiakasvit</th>
				      <td><input type="checkbox" name="field" value='1046'></td>
				    </tr>
				    <tr>
				      <th scope="row">Maisema- ja metsäpellot</th>
				      <td><input type="checkbox" name="field" value='1047'></td>
				    </tr>
				    <tr>
				      <th scope="row">Nurmi</th>
				      <td><input type="checkbox" name="field" value='1048'></td>
				    </tr>
				    <tr>
				      <th scope="row">Peruna</th>
				      <td><input type="checkbox" name="field" value='1049'></td>
				    </tr>
				    <tr>
				      <th scope="row">Siemenviljely</th>
				      <td><input type="checkbox" name="field" value='1050'></td>
				    </tr>
				    <tr>
				      <th scope="row">Sokerijuurikas</th>
				      <td><input type="checkbox" name="field" value='1051'></td>
				    </tr>
				    <tr>
				      <th scope="row">Suojavyöhyke- ja kaista</th>
				      <td><input type="checkbox" name="field" value='1052'></td>
				    </tr>
				    <tr>
				      <th scope="row">Valkuaiskasvit</th>
				      <td><input type="checkbox" name="field" value='1053'></td>
				    </tr>
				    <tr>
				      <th scope="row">Viljat</th>
				      <td><input type="checkbox" name="field" value='1054'></td>
				    </tr>
				    <tr>
				      <th scope="row">Viljelemätön</th>
				      <td><input type="checkbox" name="field" value='1055'></td>
				    </tr>
				    <tr>
				      <th scope="row">Öljykasvit</th>
				      <td><input type="checkbox" name="field" value='1056'></td>
				    </tr>
				  </tbody>
				</table>	  
	        </div><!-- fieldLayer div ends -->
	     </div> <!-- tab-content div ends -->
    </div> <!-- BMA Layer Content div ends -->
    
 	<!-- <div id="bmaLayerButtonDiv">   
    	<button type="button" id="bmaLayerSelectorBtn" > Biomassat </button>     	     
 	</div>  -->
 	
</div> <!-- ContentMap div ends -->


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
	/* $('#bmaLayerSelectorBtn').click(function () {
		$('#bmaLayerContent').toggle("slow", function() {});		
	});	 */
		
	$(document).on('change', '.tab-content input:checkbox', function() {
		var app = Oskari.app,
		 	sandbox = app.bundleInstances.mapfull.sandbox;		  
       if ($(this).is(':checked')) {
           sandbox.postRequestByName('AddMapLayerRequest', [this.value, false, false]);
       } else {
           sandbox.postRequestByName('RemoveMapLayerRequest', [this.value]);
       }	    
	});
	
});

$(document).bind('afterReady', function() {
	var initialSynchonizeLayersCheckbox = function(){		
		var app = Oskari.app,
			sandbox = app.bundleInstances.mapfull.sandbox,	 
		 	selectedLayers = sandbox._modulesByName.LayerSelection.getPlugins()['Oskari.userinterface.Flyout']._sliders,
		 	selectedLayersSize = _.size(selectedLayers);
		for (var i = 0; i < selectedLayersSize ; i++){
			$('#forestLayerTable input[type=checkbox], #fieldLayerTable input[type=checkbox]').each(function () {
				if (this.value == Object.keys(selectedLayers)[i]) 
					this.checked = true;			   
			});
		 }
	}();
	
	
	(function (sb) {
		var removeLayerModule = {
			init: function (sb) {
		    	sb.registerForEventByName(this, 'AfterMapLayerRemoveEvent');
		    },
		    getName: function () {
		    	return 'removeLayerModule';
		    }, 
		    onEvent: function (event) {		        	
		    	setCheckboxState(event, false);
			}
		};
		
		var addLayerModule = {
			init: function (sb) {
		    	sb.registerForEventByName(this, 'AfterMapLayerAddEvent');
		    },
		    getName: function () {
		    	return 'addLayerModule';
		    }, 
		    onEvent: function (event) {		        	
		    	setCheckboxState(event, true);
			}
		};
		
		var setCheckboxState = function(event, state) {
			var mapLayer = event.getMapLayer();
			if ((mapLayer.getLayerName().toLowerCase().indexOf("bma") >= 0) && 
					(mapLayer.getLayerType().toLowerCase() == "wms")) {							
				var attributeId = mapLayer.getId();
		       	$('#forestLayerTable input[type=checkbox], #fieldLayerTable input[type=checkbox]').each(function () {
				   if (this.value == attributeId) 
					   this.checked = state;			   
				});	        
			}
		};
		
		sb.register(removeLayerModule);
		sb.register(addLayerModule);
	})(Oskari.getSandbox());	
});

</script>

<!-- ############# /Javascript ################# -->
</body>
</html>
