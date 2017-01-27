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
    <script type="text/javascript" src="${pageContext.request.contextPath}/Oskari/libraries/jquery/jquery-ui-1.9.2.custom.min.js">
    </script>
  
    <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
    <style type="text/css">
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
           
			/* BMA tabs */
			.nav > li > a:hover,
			.nav > li > a:focus {
			    text-decoration: none;
			    background-color: #e0e0d1;
			}
			#bmaLayerContent table td {
				text-align: center;
				font-weight: bold;
			}			
        	.styled-heading {
        		/*background-color: #004c99;
	        	color: #ffffff;*/
	        	text-align: center;
	        	font-weight: bold; 
        	}
        	
        	/* Overrides for Oskari styles */
        	body .oskari-flyoutheading {
        		background-color: #2c2c2c;
        		height: 25px;
        		border: none;
        	}
        	body .oskari-flyouttoolbar {
        		height: 55px;
        		background-color: #fafafa;
        		color: #00b4e1;
        		font-size: 16px;
        		font-weight: bold;
        	}
        	body .oskari-flyoutcontent {
        		font-size: 12px;
        	}
        	body div.divmanazerpopup h3.popupHeader {
        		background-color: transparent;
        		border-bottom: 1px solid #c0d0d0;
        		padding-left: 0;
        		padding-right: 0;
        		padding-bottom: 20px;
        		margin-left: 8px;
        		margin-right: 8px;
        		margin-top: 8px;
        		font-size: 15px;
        		font-weight: bold;
        		color: #00b4e1;
        	}
        	body div.divmanazerpopup h4.indicator-msg-popup {
        		margin-top: 2px;
        		margin-bottom: 0;
        	}
        	body button.oskari-button, body input.oskari-button {
        		background-image: none;
        		background-color: #00b4e1;
        		color: #ffffff;
        		font-size: 15px;
        		border: none;
        		border-radius: 0;
        		text-shadow: none;
        	}
        	body button.oskari-button:hover:enabled, body input.oskari-button:hover:enabled {
        		background-image: none;
        		border: none;
        	}
        	body div.divmanazerpopup p {
        		font-size: 12px;
        	}
        	#logo {
        		margin-left: 10px;
        		top: 20px;
        	}
        	#biomass_selection_tool_title {
        		color: #F8FF42;
        		margin-left: 7px;
        	}
			#toolbar {
				margin-top: 20px !important;
				display: none;
			}        	
        	
    </style>
    <!-- ############# /css ################# -->
</head>
<body>

<nav id="maptools">
	<div id="logo">
    	<a href="http://www.luke.fi" target="_blank"><img alt="luke_logo" src="${pageContext.request.contextPath}/Oskari${path}/images/luke_logo.png"></a>
    </div>
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
    <%@include file="includes/biomassLayers.jsp" %>
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
	
	$('#closeBmaLayerContent').click(function () {
		 $('#biomass_layer_selector').trigger('click');	 
	});
	
	/* Click event for menubar's tile */
	$(document).on('click', '#menubar .oskari-tile', function() {
		var rootTile = $(this),
				TIME_OUT_MILLISECONDS = 100;
		
		if (rootTile.find('#biomass_layer_selector').length) {	// For biomass selector tile
			closeAllVisibleFlyouts();
			deactivateAllTilesExceptBiomassSelectorTile();
			
		} else {		// For all other tiles except biomass selector tile  
			$('#bmaLayerContent').hide();
			var biomassLayerSelectorTile = rootTile.closest('#menubar').find('#biomass_layer_selector').closest('.oskari-tile'),
					tileTitleName = rootTile.find('.oskari-tile-title').text();
			
			deactivateTile(biomassLayerSelectorTile);

			/* Time out is used to pause for some milli second so that internal Oskari code executes first
					and then out code run to workaround for activating tile and showing flyout */
			setTimeout(function () {
				showFlyoutForActiveTile(rootTile, tileTitleName);
			}, TIME_OUT_MILLISECONDS);
			
			/* Deactivate all attached tiles which are not active currently */
			$('#menubar .oskari-tile-attached').each(function() {
				var thisAttachedTile = $(this),
						thisAttachedTileName = thisAttachedTile.find('.oskari-tile-title').text();
				
				if (thisAttachedTileName != tileTitleName) {
					deactivateTile(thisAttachedTile);
				}
			});
			
			/* When a tile is clicked, but it is in active state and its flyout is also visible, 
				then deactivate current tile and hide its flyout */
			if (rootTile.hasClass('oskari-tile-attached')) {
				setTimeout(function () {
					deactivateTile(rootTile);
					closeAllVisibleFlyouts();
				}, TIME_OUT_MILLISECONDS);
			}
		}
	});
	
	var deactivateTile = function(object) {
		object.removeClass('oskari-tile-attached');
		object.addClass('oskari-tile-closed');
	}
	
	var activateTile = function(object) {
		object.removeClass('oskari-tile-closed');
		object.addClass('oskari-tile-attached');
	}
	
	var hideFlyout = function(object) {
		object.removeClass('oskari-attached');
		object.addClass('oskari-closed');
	}
	
	var showFlyout = function(object) {
		object.removeClass('oskari-closed');
		object.addClass('oskari-attached');
	}
	
	var closeAllVisibleFlyouts = function() {
		$('.oskari-flyout.oskari-attached').each(function() {
			var thisVisibleFlyout = $(this);
			hideFlyout(thisVisibleFlyout);
		});
	}
	
	var deactivateAllTilesExceptBiomassSelectorTile = function() {
		$('#menubar .oskari-tile').each(function() {
			var thisTile = $(this)
			if (!thisTile.find('#biomass_layer_selector').length) {
				deactivateTile(thisTile);
			}
		});
	}
	
	var showFlyoutForActiveTile = function(tile, tileName) {
		$('.oskari-flyout').each(function() {
			var thisFlyout = $(this),
					flyoutTitleText = thisFlyout.find('.oskari-flyout-title p').text();
			
			/* The later condition in if-clause is needed because the tile name and flyout title name
			   is not same for user guide. Tile name = Käyttöohjeet while flyout title = Käyttöohje */
			if (flyoutTitleText == tileName || (tileName.indexOf(flyoutTitleText) >= 0)) {
				showFlyout(thisFlyout);
				activateTile(tile);
				
			} else {
				hideFlyout(thisFlyout);
			}
		});
	}
	
});

$(document).bind('afterReady', function() {
	var initialClearAllSelectedBiomassLayersCheckbox = function(){		
		var app = Oskari.app,
			sandbox = app.bundleInstances.mapfull.sandbox,	 
		 	selectedLayers = sandbox._modulesByName.LayerSelection.getPlugins()['Oskari.userinterface.Flyout']._sliders,
		 	selectedLayersSize = _.size(selectedLayers);
		for (var i = 0; i < selectedLayersSize; i++){
			$('#bmaLayerContent input[type=checkbox]').each(function () {
				if (this.value == Object.keys(selectedLayers)[i]){
					this.checked = false;
				} 
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
		    	if (jQuery("#bmaLayerContent input[type='checkbox']:checked").length == 0) {
		    		jQuery("#closeAllBmaLayersBtn").addClass("hidden");
		    	}
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
		    	if (jQuery("#bmaLayerContent input[type='checkbox']:checked").length > 0) {
		    		jQuery("#closeAllBmaLayersBtn").removeClass("hidden");
		    	}
			}
		};
		
		var setCheckboxState = function(event, state) {
			var mapLayer = event.getMapLayer();
			if ((mapLayer.getLayerName().toLowerCase().indexOf("bma") >= 0) && 
					(mapLayer.getLayerType().toLowerCase() == "wms")) {							
				var attributeId = mapLayer.getId();
		       	$('#bmaLayerContent input[type=checkbox]').each(function () {
				   if (this.value == attributeId) {
					   this.checked = state;
					   var boxesRow = $(this).parents("tr").first();
					   if (boxesRow.find("input[type='checkbox']:not(:checked)").length) {
						   boxesRow.find(".selectAllIcon").removeClass("selected");
					   }
					   else {
						   boxesRow.find(".selectAllIcon").addClass("selected");
					   }
					   var cellClasses = $(this).parents("td").first().prop("class").split(" ");
					   for (var i = 0; i < cellClasses.length; i++) {
						   var cellClass = cellClasses[i];
						   if (cellClass.startsWith("colIndex")) {
							   var columnCells = $(this).parents("table").first().find("." + cellClass);
							   if (columnCells.find("input[type='checkbox']:not(:checked)").length) {
								   columnCells.find(".selectAllIcon").removeClass("selected");
							   }
							   else {
								   columnCells.find(".selectAllIcon").addClass("selected");
							   }
						   }
					   }
				   }
				});	        
			}
		};
		
		sb.register(removeLayerModule);
		sb.register(addLayerModule);
	})(Oskari.getSandbox());	
	
	if ($('#oskari_toolbar_basictools_bmacalculator').length) {
		$('<div id="biomass_selection_tool_title" class="oskari-tile-title">Aluevalinta</div>').insertBefore('#oskari_toolbar_basictools_bmacalculator');
	}
	
	var movePositionOfBiomassSelectionTools = function() {
		$('.toolrow:nth-child(2)').insertBefore('.toolrow:first-child');
		$('#biomass_selection_tool_title').insertBefore('.toolrow:first-child .tool:first-child');
		$('#oskari_toolbar_basictools_bmacalculator').insertBefore('.toolrow:first-child .tool:nth-child(2)');
		$('#oskari_toolbar_basictools_bmaBoundaryCalculator').insertBefore('.toolrow:first-child .tool:nth-child(3)');
		$('#oskari_toolbar_basictools_bmaCircleCalculator').insertBefore('.toolrow:first-child .tool:nth-child(4)');
		$('.toolrow:first-child .tool:nth-child(4)').after('<div><br><br></div>');
		$('#toolbar').css('display', 'block');
	}();
	
});

</script>

<!-- ############# /Javascript ################# -->
</body>
</html>
