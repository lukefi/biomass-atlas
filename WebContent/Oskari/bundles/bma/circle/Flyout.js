/**
 * @class Oskari.bma.bundle.circle.CircleBundle.Flyout
 *
 */
Oskari.clazz.define('Oskari.bma.bundle.circle.CircleBundle.Flyout',

/**
 * @method create called automatically on construction
 * @static
 *
 * Always extend this class, never use as is.
 */
function(instance, locale, conf) {
	/* @property instance bundle instance */
	this.instance = instance;

	/* @property locale locale for this */
	this.locale = locale;

	/* @property conf conf for this */
	this.conf = conf;

	/* @property container the DIV element */
	this.container = null;
	
	this.template = null;
	
	/* These values are same as in localization file */
	this.SELECTION_CIRCLE = "circle";
	this.SELECTION_ROAD = "road";
	
	this.NUTRIENT_TOOLTIP = "nutrient";
	
	var flyoutLocalization = this.instance.getLocalization()["flyout"];
	this.templateCircleMessage = jQuery('<div id="circle-message">' + flyoutLocalization.message + 
			'<div class="horizontal-line">.</div></div>');
	this.templateCircleResult = jQuery('<div id="circle-result"></div>');
	this.templateCircleRadius = jQuery('<div id="circle-radius" style="display:none;"> <label id="circle-radius-label">' + flyoutLocalization.radius + ': </label>' + 
			'<input id="circle-radius-value" size="10" ></input> km</div>');
	this.templateRadiusType = jQuery('<div id="radius-type" style="display:none;"> <br>' + 
			'<label><input type="radio" name="radius-type" value="circle" checked id="circle-type"/> '+ flyoutLocalization["selectionType"][this.SELECTION_CIRCLE] + 
			'</label><div class="icon-info" id="circle-info-tool"></div><br />' +
			'<label><input type="radio" name="radius-type" value="road" id="road-type"/> '+ flyoutLocalization["selectionType"][this.SELECTION_ROAD] + 
			'</label><div class="icon-info" id="road-info-tool"></div></div> <div class="horizontal-line">.</div>');
	this.templateCirclePoint = jQuery('<div id="circle-point" style="display:none;"><label id="circle-point-label"> '+ flyoutLocalization.point + 
			': </label><span id="circle-point-value"></span></div>');
	this.templateCircleCalculateCancelTool = jQuery('<div id="circle-calclulate-tool" style="display:none;"><button class="oskari-button" id="circle-calculate"></button>' +
			'<span id="circle-cancel-tool"><button class="oskari-button" id="circle-cancel"></button></span> </div>');
	this.templateCircleBackCancelTool = jQuery('<div id="circle-back-tool" style="display:none;"><button class="oskari-button" id="circle-back"></button>' +
			'<span id="circle-cancel-tool"><button class="oskari-button" id="circle-cancel"></button></span> </div>');
	this.templateShowNutrientOption = jQuery('<div class="show-nutrient-option">'
			+' <label id="show-nutrient-text">' + flyoutLocalization.showNutrients + ' : </label>'
			+ '<label class="switch switch-left-right">'
			+ '<input class="switch-input" type="checkbox" id="show-nutrient-checkbox"/>'
			+ '<span class="switch-label"></span>' 
			+ '<span class="switch-handle"></span></label>'
			+ '<div class="icon-info" id="circle-nutrient-tooltip" style="display:inline-block;"></div></div> ');
}, {	
	/**
	 * @property template HTML templates for the User Interface
	 * @static
	 */
	templates : {
		content : "<div class='metadataflyout_content'></div>"
	},
	getName : function() {
		return 'Oskari.bma.bundle.circle.CircleBundle.Flyout';
	},
	setEl : function(el, width, height) {
		this.container = jQuery(el);
	},
	startPlugin : function() {
		this.template = jQuery('<div></div>');		
	},
	stopPlugin : function() {
		this.container.empty();
	},
	getTitle : function() {
		return this.instance.getLocalization()["flyout"]["title"];
	},
	getDescription : function() {

	},
	getOptions : function() {

	},
	/**
	 * Create Measurement UI
	 * @method createUI
	 * @public
	 */
	createUI: function(){
		var me = this,
			localization = me.instance.getLocalization()["flyout"],
			sandbox = me.instance.getSandbox();
		
		me.isAllowedMapClick = true;
		me.centerPointCircle = null;
        me._removeCircleFeature();
        
		// clear container
		var cel = jQuery(me.container);
		cel.empty();
        var content = me.template.clone();
        cel.append(content);

        var circleMessage = me.templateCircleMessage.clone();
        var circleResult = me.templateCircleResult.clone();
        var circleRadius = me.templateCircleRadius.clone();
        var radiusType = me.templateRadiusType.clone();
        var circlePoint = me.templateCirclePoint.clone();
        var calculateCancelTool = me.templateCircleCalculateCancelTool.clone();
        var backCancelTool = me.templateCircleBackCancelTool.clone();
        
        calculateCancelTool.find('#circle-calculate').html(localization.calculate);
        calculateCancelTool.find('#circle-calculate').unbind('click');
        calculateCancelTool.find('#circle-calculate').bind('click', function(){        	
        	me._calculateButtonClick();
        });
        
        calculateCancelTool.find('#circle-cancel').html(localization.quit);
        calculateCancelTool.find('#circle-cancel').unbind('click');
        calculateCancelTool.find('#circle-cancel').bind('click', function(){        	
        	me._cancelButtonClick();     	
        });
        
        circleRadius.find('#circle-radius-value').unbind('keyup');
        circleRadius.find('#circle-radius-value').bind('keyup', function(){        	
        	me._updateCalculateButtonVisibility(me);  
        });
        
        backCancelTool.find('#circle-back').html(localization.back);
        backCancelTool.find('#circle-back').unbind('click');
        backCancelTool.find('#circle-back').bind('click', function(){        	
        	me._backButtonClick();
        });
        
        backCancelTool.find('#circle-cancel').html(localization.quit);
        backCancelTool.find('#circle-cancel').unbind('click');
        backCancelTool.find('#circle-cancel').bind('click', function(){        	
        	me._cancelButtonClick();     	
        });
        
        radiusType.find('#circle-info-tool').unbind('click');
        radiusType.find('#circle-info-tool').bind('click', function(){        	
        	me._displayInfoTip(me.SELECTION_CIRCLE);     	
        });
        
        radiusType.find('#road-info-tool').unbind('click');
        radiusType.find('#road-info-tool').bind('click', function(){        	
        	me._displayInfoTip(me.SELECTION_ROAD);     	
        });
        
        radiusType.find('#road-type, #circle-type').unbind('change');
        radiusType.find('#road-type, #circle-type').bind('change', function(){        	
        	me._updateCalculateButtonVisibility(me);  
        });
        
        content.addClass('bma-circle-main-div');
        content.append(circleMessage);
        content.append(circleResult);
        content.append(circlePoint);
        content.append(circleRadius);
        content.append(radiusType);
        content.append(calculateCancelTool);
        content.append(backCancelTool);
    	
    	me._updateCalculateButtonVisibility(me);
    	    	
    	me._closeIconClickHandler();
	},
	
	_closeIconClickHandler: function() {
		var me = this,
			parent = me.container.parents('.oskari-flyout');
    	parent.find('.oskari-flyouttool-close').click(function(){
    		me._cancelButtonClick();
    	});
	},
	/**
     * @method close
     * Closes the flyout
     */
    _close : function() {    	
        var instance = this.instance,
        	sandbox = instance.getSandbox();
        sandbox.postRequestByName('userinterface.UpdateExtensionRequest', [instance, 'close']);  
    },
		
	_updateCalculateButtonVisibility : function(me) {
		var btn = $("#circle-calculate");
		if ($.trim($("#circle-radius-value").val()) == '' || 
				($('#road-type').is(':checked') && $.trim($("#circle-radius-value").val()) > 65)) {
			btn.attr("disabled", true);
		}
		else {
			btn.attr("disabled", false);
		}
	},
	
	_getVisibleBiomassAttributeIds : function() {
		//This is copy-paste from polygon biomass calculation tool
		var sandbox = this.instance.getSandbox(),
			layers = sandbox.findAllSelectedMapLayers(),
			biomassAttributeIds = [];
		for (var i = 0; i < layers.length; i++) {
			var layer = layers[i];
			if ("bma" in layer.getOptions()) {
				biomassAttributeIds.push(layer.getOptions()["bma"].id);
			}
		}
		return biomassAttributeIds;
	},
	
	
	_calculateButtonClick: function(){
		var me = this,
			sandbox = me.instance.getSandbox(),
			points = [],
			requestForAddFeature,
			localization = me.instance.getLocalization()["flyout"];
		
		if (me._validateRadiusValue()) {
			me.isAllowedMapClick = false;
			me._removeCircleFeature();
			points.push({x: me.centerPointCircle.x, y: me.centerPointCircle.y});
			var radiusType = $('input[name=radius-type]:checked').val();
			var radius = parseFloat(this._convertCommasToDots($('#circle-radius-value').val()));
			if (radiusType == me.SELECTION_ROAD) {
				var ajaxUrl = "/biomass/roadbuffer/calculate",
					userActivityUrl = "/biomass/useractivity/roadbuffer";
				if (parseInt(radius) > 65) {
					//alert(localization.error["roadRouteExceed"]);
					return;
				}
			}
			else {
				var ajaxUrl = "/biomass/circle/calculate",
					userActivityUrl = "/biomass/useractivity/circle";
			}
			
			var data = JSON.stringify({
							points: [me.centerPointCircle], 
							radius: radius, 
							attributes: me._getVisibleBiomassAttributeIds(sandbox)
						});
			me._saveUserActivity(data, userActivityUrl);
			jQuery.ajax({
				url: ajaxUrl,
				type: "POST",
				contentType: "application/json; charset=UTF-8",
				data: data,
				dataType: "json",
				success: function(results, status, xhr) {
					requestForAddFeature = sandbox.getRequestBuilder(
							"MapModulePlugin.AddFeaturesToMapRequest" );				
					var style = OpenLayers.Util.applyDefaults(
					        {fillColor: '#ffff00', fillOpacity: 0.5, strokeColor: '#eda740'},
					        OpenLayers.Feature.Vector.style["default"]);
		
					sandbox.request(me.instance, requestForAddFeature( results.geo, 'WKT', 
							{id: 'Main'}, null, null, true, style, false));
					
					var finalResult = "";
					if (radiusType == me.SELECTION_ROAD) {
						finalResult += "<div>" + radius + " " + localization.roadExtraInformation + "</div><br>"; 
					}
					finalResult += "<table class='biomass-result-table'><tr><th>"+ localization.biomassType + "</th>" +
							"<th colspan='2'>" + localization.amount + "</th>"
							+ "<th class='nutrient-value'>N (kg)</th>"
							+ "<th class='nutrient-value'>P (kg)</th>" + "</tr>";
					
					var displayOrders = results.displayOrders;
					for (var property in displayOrders) {
					    if (displayOrders.hasOwnProperty(property)) {
					    	for (var key in results.values) {
					    		if (key == displayOrders[property]) {
						    		finalResult += "<tr><td>" + key + "</td><td class='biomass-amount'>" 
							    		+ formatBiomassValue(results.values[key].valueAndUnit.value)
						    			+ "&nbsp;</td><td class='biomass-unit'>" + results.values[key].valueAndUnit.unit + "</td>"
						    			+ "<td class='nutrient-value'>" + ((results.values[key].nutrientResult.n == null) ? ' - ' : formatBiomassValue(results.values[key].nutrientResult.n)) + "</td>"
						    			+ "<td class='nutrient-value'>" + ((results.values[key].nutrientResult.p == null) ? ' - ' : formatBiomassValue(results.values[key].nutrientResult.p)) + "</td>"
						    			+ "</tr>";
						    		delete results.values[key];
						    		break;
						    	}
							}
					    }
					}
					finalResult += "</table>";
					finalResult += '<div id="show-nutrient"></div>';
					finalResult += '<div id="selected-area">' + localization.selectedArea + " : " + formatBiomassValue(results.selectedArea) + " ha </div>";
					
					var	queryData = JSON.stringify({
							points: points, 
							radius: radius,
							radiusType: radiusType,
							attributes: me._getVisibleBiomassAttributeIds(sandbox)
					});
					
					finalResult += localization.saveResults + " : "
						+ "<form method='POST' action='/biomass/area/xlsx' style='display: inline-block'>" 
						+ "<input type='hidden' name='query' value= " + queryData + "/>" 
						+ "<input type='submit' name='submit' value='XLSX' />" 
						+ "</form>&nbsp;"
						+ "<form method='POST' action='/biomass/area/csv' style='display: inline-block'>" 
						+ "<input type='hidden' name='query' value= " + queryData + "/>" 
						+ "<input type='submit' name='submit' value='CSV' />" 
						+ "</form>"
						+ "<br>";
					
					me._showResult(finalResult);
				}
			});
		} else {
			alert(localization.error["radiusNotNumber"]);
		}
	},
	
	_cancelButtonClick: function(){
		var me = this,
			instance = me.instance,
			sandbox = instance.getSandbox(),
			toolbarRequest = sandbox.getRequestBuilder('Toolbar.SelectToolButtonRequest')();
        sandbox.request(instance, toolbarRequest);
        me.isAllowedMapClick = false;
        me.removeMarker();
        me._removeCircleFeature();
        me._close();
	},
	
	_backButtonClick: function(){
		var me = this,
			instance = me.instance,
			sandbox = instance.getSandbox();
		me._showInputsAndButtons();
        jQuery("#circle-message").show();		
		jQuery("#circle-back-tool").hide();
		jQuery("#circle-result").html("").hide();
		me.isAllowedMapClick = true;
	},
	
	mapClickedEvent: function(event){
		var me = this,
			lonlat = event.getLonLat();	
		var point = new OpenLayers.Geometry.Point(lonlat.lon, lonlat.lat);
		if (me.isAllowedMapClick) {
			me.addMarker(point);
		}
	},
	
	addMarker: function(point) {
		var me = this;
		var sandbox = me.instance.getSandbox();
		$('#circle-point-value').html("" + point);
		me.removeMarker();
		me._addMarker(sandbox, point.x, point.y);
		me._showInputsAndButtons();
		me.centerPointCircle = point;
	},
			
	syncToolbarButtonVisibility : function() {
		var me = this,
			instance = me.instance,
			sandbox = instance.getSandbox();
		me._setToolbarButtonVisibility(sandbox, me._getVisibleBiomassAttributeIds().length > 0);
	},
	
	_setToolbarButtonVisibility : function(sandbox, state) {
		var stateReqBuilder = sandbox.getRequestBuilder("Toolbar.ToolButtonStateRequest"),
			stateRequest = stateReqBuilder("bmaCircleCalculator", "basictools", state);
		sandbox.request("Circle", stateRequest);
	},
	
	_showResult: function(result){
		jQuery("#circle-message").hide();
		jQuery("#circle-point").hide();
		jQuery("#circle-radius").hide();
		jQuery("#radius-type").hide();
		jQuery("#circle-calclulate-tool").hide();
		jQuery("#circle-result").html(result).show();
		jQuery("#circle-back-tool").show();
		//this._showNutrientOptionDiv();
	},
	
	_addMarker: function(sandbox, x, y) {
		var reqBuilder = sandbox.getRequestBuilder('MapModulePlugin.AddMarkerRequest');
		if (reqBuilder) {
		    var data = {
		        x: x,
		        y: y,
		        color: "ff0000",
		        shape: 2,
		        size: 3
		        //iconUrl: '/Oskari/bundles/bma/circle/resources/images/marker.png',
		    };
		    var request = reqBuilder(data);
		    sandbox.request('MainMapModule', request);
		}
	},
	
	removeMarker: function() {
		var sandbox = this.instance.getSandbox();
		var reqBuilder = sandbox.getRequestBuilder('MapModulePlugin.RemoveMarkersRequest');
		if (reqBuilder) {
			sandbox.request('MainMapModule', reqBuilder());
		}
	},	
	
	_validateRadiusValue: function() {		
		var num = this._convertCommasToDots($('#circle-radius-value').val());
		if (!isNaN(parseFloat(num)) && isFinite(num))
			return true;
		else
			return false;
	},
	
	_convertCommasToDots: function(value) {
		return num = value.replace(/,/g , '.');
	},
	
	_removeCircleFeature: function() {
		var instance = this.instance,
			sandbox = instance.getSandbox();
		var requestForRemoveFeature = sandbox.getRequestBuilder(
			"MapModulePlugin.RemoveFeaturesFromMapRequest");
		sandbox.request(instance, requestForRemoveFeature("id", "Main", null));
	},
	
	_showInputsAndButtons: function() {
		jQuery(".horizontal-line").show();
		jQuery("#circle-point").show();
		jQuery("#circle-radius").show();
		jQuery("#radius-type").show();
		jQuery("#circle-calclulate-tool").show();
	},
	
	getContentState: function() {
		var me = this;
		var state = {};
		if (jQuery(me.container).is(":visible")) {
			state.radius = jQuery("#circle-radius-value").val();
			state.radiusType = jQuery('input[name=radius-type]:checked').val();
			state.point = jQuery("#circle-point-value").text();
		}
        return state;
    },
    
    setContentState: function(state) {
    	var me = this;
    	me.removeMarker();
    	if ("radius" in state) {
    		jQuery("#circle-radius-value").val(state.radius);
    	}
    	if ("radiusType" in state && /^[a-z]+$/.test(state.radiusType)) {
    		$("input[name=radius-type][value=" + state.radiusType + "]").prop('checked', true);
    	}
    	if ("point" in state) {
    		var point = OpenLayers.Geometry.fromWKT(state.point);
    		me.addMarker(point);
    		me._showInputsAndButtons();
    	}
    	me._updateCalculateButtonVisibility(me);
    },
    
    _displayInfoTip: function (selectionType) {
    	var selectionTypeIconLocalization,
    		title,
    		desc,
    		dialog = Oskari.clazz.create(
                'Oskari.userinterface.component.Popup'
            ),
            okBtn = Oskari.clazz.create(
                'Oskari.userinterface.component.Button'
            );
    	
    	if (selectionType === this.SELECTION_CIRCLE || selectionType === this.SELECTION_ROAD) {
    		selectionTypeIconLocalization = this.instance.getLocalization()["flyout"].selectionTypeInfo;
        	title = selectionTypeIconLocalization.title[selectionType];
        	desc = selectionTypeIconLocalization.description[selectionType];
    	} else if (selectionType === this.NUTRIENT_TOOLTIP) {
        	title = this.instance.getLocalization()["flyout"].showNutrients;
        	desc = this.instance.getLocalization()["flyout"].showNutrientTooltip;
    	}
        	           
        okBtn.addClass('default area-button');
        okBtn.setTitle('Ok');
        okBtn.setHandler(function () {
            dialog.close(true);
        });
        dialog.show(title, desc, [okBtn]);       
    },
    
    //User activity
    _saveUserActivity : function(queryData, url) {
    	var me = this,
			sandbox = me.instance.getSandbox();

    	jQuery.ajax({
			url: url,
			type: "POST",
			contentType: "application/json; charset=UTF-8",
			data: queryData,
			dataType: "json",
			success: function(results, status, xhr) {
				//Nothing
			}
		});
    },
    
    /**
     * Add checkbox to hide/show nutrient values
     */
    _showNutrientOptionDiv: function () {
    	var me = this,
    		localization = me.instance.getLocalization()["flyout"],
			showNutrientOption = me.templateShowNutrientOption.clone();
    	
    	showNutrientOption.find('#show-nutrient-text').text(localization.showNutrients + " : ");
    	showNutrientOption.find('.switch-label').attr('data-on', localization.yes);
    	showNutrientOption.find('.switch-label').attr('data-off', localization.no);
		showNutrientOption.find('#show-nutrient-checkbox').unbind('change');
	    showNutrientOption.find('#show-nutrient-checkbox').bind('change', function() {        	
	    	me._hideShowNutrientValuesInTable(this);     	
	    });
	    
	    showNutrientOption.find('#circle-nutrient-tooltip').unbind('click');
	    showNutrientOption.find('#circle-nutrient-tooltip').bind('click', function(){        	
        	me._displayInfoTip(me.NUTRIENT_TOOLTIP);     	
        });
       
	    jQuery(me.container).find("#show-nutrient").append(showNutrientOption);
    },
    
    _hideShowNutrientValuesInTable: function(object) {
    	if (jQuery(object).is(':checked')) {
    		$('.nutrient-value').show();
    	} else {
    		$('.nutrient-value').hide();
    	}
    }
	
}, {
	'protocol' : ['Oskari.userinterface.Flyout']
});
