/**
 * @class Oskari.bma.bundle.boundary.BoundaryBundle.Flyout
 *
 */
Oskari.clazz.define('Oskari.bma.bundle.boundary.BoundaryBundle.Flyout',

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
	
	/* For tooltip */
	this.AREA_TOOLTIP = "area";
	this.NUTRIENT_TOOLTIP = "nutrient";

	/* These string values must be same as value for radio button. */
	this.BOUNDARY_MUNICIPALITY = "municipality";
	this.BOUNDARY_PROVINCE = "province";
	this.BOUNDARY_ELY = "ely";
	this.BOUNDARY_DRAINAGE_BASIN = "drainageBasin";
	this.BOUNDARY_POSTAL_CODE = "postalCode";
	
	this.AREA_TYPES = [this.BOUNDARY_MUNICIPALITY, this.BOUNDARY_PROVINCE, this.BOUNDARY_ELY, this.BOUNDARY_DRAINAGE_BASIN, this.BOUNDARY_POSTAL_CODE];
	
	this.GRID_IDS = {};
	this.GRID_IDS[this.BOUNDARY_MUNICIPALITY] = 2;
	this.GRID_IDS[this.BOUNDARY_PROVINCE] = 3;
	this.GRID_IDS[this.BOUNDARY_ELY] = 6;
	this.GRID_IDS[this.BOUNDARY_DRAINAGE_BASIN] = 4;
	this.GRID_IDS[this.BOUNDARY_POSTAL_CODE] = 5;
	
	this.selectedIds = {};
	this.selectedIds[this.BOUNDARY_MUNICIPALITY] = [];
	this.selectedIds[this.BOUNDARY_PROVINCE] = [];
	this.selectedIds[this.BOUNDARY_ELY] = [];
	this.selectedIds[this.BOUNDARY_DRAINAGE_BASIN] = [];
	this.selectedIds[this.BOUNDARY_POSTAL_CODE] = [];
	this.selectedPoints = [];
	
	// Rules for calculate by municipality (Only in Province and ELY) 
	this.CALCULATE_RULE_NONE = "NONE";
	this.CALCULATE_RULE_FOR_PROVINCE = "CALCULATE_BY_MUNICIPALITY_FOR_PROVINCE";
	this.CALCULATE_RULE_FOR_ELY = "CALCULATE_BY_MUNICIPALITY_FOR_ELY";
	
	//Rule for calculate by sub drainage basin
	this.CALCULATE_RULE_FOR_DRAINAGE_BASIN = "CALCULATE_BY_SUB_DRAINAGE_BASIN";

	this.wmsUrl = "https://biomassa-atlas.luke.fi/geoserver/wms";	
	this.wmsName = null;
	this.wmsId = null;	

	this.template = null;
	this.templateBoundaryData = jQuery('<div id="boundary-data"></div>');
	this.templateBoundaryCalculateCancelTool = jQuery('<div class="boundary-horizontal-line">.</div>' + 
			'<div id="boundary-calculate-cancel-tool" style="display:none">' +
			'<button class="oskari-button" id="boundary-prev"></button>' +
			'<button class="oskari-button" id="boundary-calculate"></button>' +
			'<button class="oskari-button" id="boundary-calculateMunicipality" style="display:none"></button>' +
			'<button class="oskari-button" id="boundary-calculateSubDrainageBasin" style="display:none"></button>' +
			'<span id="boundary-cancel-tool"><button class="oskari-button" id="boundary-cancel"></button></span> </div>');
	
	{
		var flyoutLocalization = this.instance.getLocalization()["flyout"];
		var messageString = '<div id="boundary-message">' + flyoutLocalization["chooseAreaType"] + '</div>';
		messageString += '<div id="boundary-select-all" style="display: none"><button id="boundary-select-all-button" class="oskari-button">' 
			+ flyoutLocalization["selectAll"] + '</button></div>';
		/*messageString += '<br><div id="unit-conversion" style="display: none"><input type="checkbox" id="unit-conversion-checkbox"> ' 
			+ ' Unit Conversion' + '</input></div>'
			+ '<div><table class="biomass-unit-conversion-table"></table></div>';*/
		messageString += '<div id="boundary-radio">';
		for (var i = 0; i < this.AREA_TYPES.length; i++) {
			var areaType = this.AREA_TYPES[i];
			messageString += '<button name="boundary" class="oskari-button" value="' + areaType;
			messageString += '">' + flyoutLocalization["areaType"][areaType] + ' </button>';
		}
		messageString += '</div>';
		this.templateBoundaryMessage = jQuery(messageString);
	}
	
	this.templateShowNutrientOption = jQuery('<div class="show-nutrient-option">'
			+' <label id="show-nutrient-text">' + flyoutLocalization.showNutrients + ' : </label>'
			+ '<label class="switch switch-left-right">'
			+ '<input class="switch-input" type="checkbox" id="show-nutrient-checkbox"/>'
			+ '<span class="switch-label"></span>' 
			+ '<span class="switch-handle"></span></label>'
			+ '<div class="icon-info" id="nutrient-tooltip" style="display:inline-block;"></div></div>');
		
	this.selectedBoundaryType = null;
	this.selectedUnitConversions = {};
	
}, {	
	/**
	 * @property template HTML templates for the User Interface
	 * @static
	 */
	templates : {
		content : "<div class='metadataflyout_content'></div>"
	},
	getName : function() {
		return 'Oskari.bma.bundle.boundary.BoundaryBundle.Flyout';
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
		
		me.isBoundaryIconClickedForFirstTime = true;
		
		// clear container
		var cel = jQuery(me.container);
		cel.empty();
        var content = me.template.clone();
        cel.append(content);

        var boundaryMessage = me.templateBoundaryMessage.clone();
        var boundaryData = me.templateBoundaryData.clone();
        var calculateCancelTool = me.templateBoundaryCalculateCancelTool.clone();       
        
        boundaryMessage.find('button[name="boundary"]').unbind('click');
        boundaryMessage.find('button[name="boundary"]').bind('click', function(){
        	me._setSelectedBoundaryType(jQuery(this).val());
        	me._showBoundary(me);  	
        });
        
        boundaryMessage.find('#boundary-select-all-button').unbind('click');
        boundaryMessage.find('#boundary-select-all-button').bind('click', function(){        	
        	me._selectAllBoundaries(me);
        });
        
        /*boundaryMessage.find('#unit-conversion-checkbox').unbind('click');
        boundaryMessage.find('#unit-conversion-checkbox').bind('click', function(){
        	if (this.checked)
        		me._showUnitConversionOptions(me);
        	else
        		me._hideUnitConversionTable();
        });*/
        
        calculateCancelTool.find('#boundary-prev').html(localization.prev);
        calculateCancelTool.find('#boundary-prev').unbind('click');
        calculateCancelTool.find('#boundary-prev').bind('click', function() {
        	me._removeWmsLayer(sandbox);  
        	me._clearAllIdList();
        	me.stopPlugin();
        	me.startPlugin();
        	me.createUI();
        });
        
        calculateCancelTool.find('#boundary-calculate').html(localization.calculate);
        calculateCancelTool.find('#boundary-calculate').unbind('click');
        calculateCancelTool.find('#boundary-calculate').bind('click', function(){        	
        	me._calculateButtonClick(me);
        });
        
        calculateCancelTool.find('#boundary-calculateMunicipality').html(localization.calculateMunicipality);
        calculateCancelTool.find('#boundary-calculateMunicipality').unbind('click');
        calculateCancelTool.find('#boundary-calculateMunicipality').bind('click', function(){        	
        	me._calculateMunicipalityButtonClick(me);
        });
        
        calculateCancelTool.find('#boundary-calculateSubDrainageBasin').html(localization.calculateSubDrainageBasin);
        calculateCancelTool.find('#boundary-calculateSubDrainageBasin').unbind('click');
        calculateCancelTool.find('#boundary-calculateSubDrainageBasin').bind('click', function(){        	
        	me._calculateSubDrainageBasinButtonClick(me);
        });
        
        calculateCancelTool.find('#boundary-cancel').html(localization.quit);
        calculateCancelTool.find('#boundary-cancel').unbind('click');
        calculateCancelTool.find('#boundary-cancel').bind('click', function(){        	
        	me._cancelButtonClick();     	
        });
        
        /*boundaryMessage.find('#boundary-info-tool').unbind('click');
        boundaryMessage.find('#boundary-info-tool').bind('click', function(){        	
        	me._displayInfoTip();     	
        });*/
	
        content.addClass('bma-boundary-main-div');
        content.append(boundaryMessage);
        content.append(boundaryData);
        content.append(calculateCancelTool);    
        
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
	
    _showBoundary : function(me) {
    	var sandbox = me.instance.getSandbox();
    	var selectedValue = me._getSelectedBoundaryType();
    	
    	me._removeWmsLayer(sandbox);    	
    	if (selectedValue === this.BOUNDARY_MUNICIPALITY) {
    		this.wmsName = "bma:view_municipality_borders";
    		this.wmsId = "municipalityBorderId";    		
    	} else if (selectedValue === this.BOUNDARY_PROVINCE) {
    		this.wmsName = "bma:view_province_borders";
    		this.wmsId = "provinceBorderId";
    	} else if (selectedValue === this.BOUNDARY_ELY) {
    		this.wmsName = "bma:view_ely_borders";
    		this.wmsId = "elyBorderId";
    	}else if (selectedValue === this.BOUNDARY_DRAINAGE_BASIN){
    		this.wmsName = "bma:view_drainage_basin_borders";
    		this.wmsId = "drainageBasinBorderId";
    	} else if (selectedValue === this.BOUNDARY_POSTAL_CODE){
    		this.wmsName = "bma:view_postal_code_borders";
    		this.wmsId = "postalCodeBorderId";
    	} else {
    		alert("Error: Select the proper boundary type");
    		return;
    	}
    	me._updateMessageForBoundarySelection(me, selectedValue);
    	me._addWmsLayer(sandbox);
    	
    	// Changes the title of flyout 
    	/*me.container[0].offsetParent.firstElementChild.children[1].innerText = 
    		me.instance.getLocalization()["flyout"].secondTitle;*/
    },
    
    _updateMessageForBoundarySelection : function(me, selectedBoundary) {
    	var localization = me.instance.getLocalization()["flyout"].selectAreaType;
    	$('#boundary-message').html(localization[selectedBoundary]);
    	me._createInfoIcon(selectedBoundary);
    	jQuery("#boundary-select-all").show();
    	jQuery("#unit-conversion").show();
    	if (selectedBoundary === this.BOUNDARY_PROVINCE || selectedBoundary === this.BOUNDARY_ELY) {
    		jQuery("button#boundary-calculateMunicipality").show();
    	}
    	if (selectedBoundary === this.BOUNDARY_DRAINAGE_BASIN) {
    		jQuery("button#boundary-calculateSubDrainageBasin").show();
    	}
    	me._hideBoundaryOption();
    	me._showCalculateCancelButtons();
    	me._updateCalculateButtonVisibility(me);
    	return;
	},
	
	_showBoundaryOption : function() {
		$("#boundary-radio").show();
	},
	
	_hideBoundaryOption : function() {
		$("#boundary-radio").hide();
	},
	
	_showCalculateCancelButtons : function() {
		$("#boundary-calculate-cancel-tool").show();
	},
	
	_hideCalculateCancelButtons : function() {
		$("#boundary-calculate-cancel-tool").hide();
	},
    
	_updateCalculateButtonVisibility : function(me) {
		me._enableDisableCalulateButton(me, "#boundary-calculate");
		if ($("#boundary-calculateMunicipality").is(":visible")) {
			me._enableDisableCalulateButton(me, "#boundary-calculateMunicipality");
		}
		if ($("#boundary-calculateSubDrainageBasin").is(":visible")) {
			me._enableDisableCalulateButton(me, "#boundary-calculateSubDrainageBasin");
		}
	},
	
	_enableDisableCalulateButton : function(me, buttonId) {
		var btn = $(buttonId);
		for (var idList in me.selectedIds) {
			if (me.selectedIds[idList].length > 0) {
				btn.attr("disabled", false);
				return;
			}
		}
		btn.attr("disabled", true);
	},
	
	_getVisibleBiomassAttributeIds : function() {
		// TODO this is copy-paste from polygon biomass calculation tool
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
	
	_addWmsLayer: function(sandbox){
		var mapModule = sandbox.findRegisteredModuleInstance('MainMapModule'),
			wmsLayer = Oskari.clazz.create("Oskari.mapframework.domain.WmsLayer");
		wmsLayer.setWmsUrls([this.wmsUrl]);
		wmsLayer.setWmsName(this.wmsName);			
		wmsLayer.setType("wmslayer");		
		wmsLayer.setId(this.wmsId);		
		mapModule._layerPlugins.wmslayer.addMapLayerToMap(wmsLayer, true, false);
	},
	
	_removeWmsLayer: function(sandbox){
		 var mapModule = sandbox.findRegisteredModuleInstance('MainMapModule'),
	     	map = mapModule.getMap(),
	     	numLayers = map.getNumLayers(), 
	     	wmsLayer,
	     	vectorLayer,
	     	baseLayer;
	     for(var i = 0; i < numLayers; i++){
	     	var layer = mapModule.getMap().layers[i];
	     	if(layer.layerId === this.wmsName) {
	     	//if(layer.layerId === "bma:view_municipality_borders") {
	     		wmsLayer = layer;
	     	}                    	
	     	if(layer.name === "vectorlayer_VECTOR"){
	     		vectorLayer = layer;
	     	}
	     }                                       
	     
	     baseLayer = map.getLayer(0);
	     if(wmsLayer){
	     	map.removeLayer(wmsLayer, baseLayer);
	     }
	     if(vectorLayer){
	     	map.removeLayer(vectorLayer, baseLayer);
	     }
	},
	
	_calculateButtonClick: function() {		
		this._areaCalculate(this._getSelectedBoundaryType(), this.CALCULATE_RULE_NONE);
		this._saveUserActivity(this._getSelectedBoundaryType(), this.CALCULATE_RULE_NONE);
	},
	
	_calculateMunicipalityButtonClick: function() {
		var selectedBoundary = this._getSelectedBoundaryType();
		if (selectedBoundary === this.BOUNDARY_PROVINCE) {
			this._areaCalculate(selectedBoundary, this.CALCULATE_RULE_FOR_PROVINCE);
			this._saveUserActivity(this._getSelectedBoundaryType(), this.CALCULATE_RULE_FOR_PROVINCE);
		} else if (selectedBoundary === this.BOUNDARY_ELY) {
			this._areaCalculate(selectedBoundary, this.CALCULATE_RULE_FOR_ELY);
			this._saveUserActivity(this._getSelectedBoundaryType(), this.CALCULATE_RULE_FOR_ELY);
		}
			
	},
	
	_calculateSubDrainageBasinButtonClick: function() {
		var selectedBoundary = this._getSelectedBoundaryType();
		this._areaCalculate(selectedBoundary, this.CALCULATE_RULE_FOR_DRAINAGE_BASIN);
		this._saveUserActivity(selectedBoundary, this.CALCULATE_RULE_FOR_DRAINAGE_BASIN);
	},
	
	_areaCalculate: function(boundaryType, calculateRule) {
		var me = this,
			sandbox = me.instance.getSandbox();
		
		me._setSelectedUnitConverionsValue(me);
		
		jQuery.ajax({
			url: "/biomass/boundedarea/calculate",
			type: "POST",
			contentType: "application/json; charset=UTF-8",
			data: JSON.stringify({
				areaIds: me.selectedIds[boundaryType],
				attributes: me._getVisibleBiomassAttributeIds(sandbox),
				boundedAreaGridId: me.GRID_IDS[boundaryType],
				calculateRule: calculateRule
			}),
			dataType: "json",
			success: function(results, status, xhr) {
				me._createTabularResult(results, boundaryType, calculateRule);					
			}
		});
	},
	
	_createTabularResult : function(results, boundaryType, calculateRule) {
		// TODO - should find better way to show calculation results and selected layers' names
		var me = this,
			localization = this.instance.getLocalization()["flyout"],
			totalResult = "<span>" + localization.areaTypeSelected[boundaryType] + "</span><br>";
		
		totalResult += "<table class='biomass-result-table'><tr><th>" + localization.areaType[boundaryType] + "</th>"
			+ "<th>" + localization.biomassType + "</th>"
			+ "<th colspan='2'>" + localization.amount + "</th>"
			+ "<th class='nutrient-value'>N (kg)</th>"
			+ "<th class='nutrient-value'>P (kg)</th>" + "</tr>";
		
		var isUnitConversionSelected = jQuery('#unit-conversion-checkbox').is(':checked');
		me._hideUnitConversionTable();
		
		var originalDisplayOrders = results.displayOrders;
		for (var boundaryName in results.boundedAreas) {
			var displayOrders = jQuery.extend({}, originalDisplayOrders),	//shallow clone
				boundedArea = results.boundedAreas[boundaryName];
			
			var rowResult = "";
			var rowspanSize = 0;
			if (_.size(boundedArea) > 2) { // at least some data exists for the area (in addition to attribute id and name)
				for (var attributeId in boundedArea) {
					// TODO this should be easier after we switch to JSON-stat
					if (attributeId == "id" || attributeId == "name"){
						continue;
					} 
					for (var property in displayOrders) {
					    if (displayOrders.hasOwnProperty(property)) {
					    	// Null check is needed because boundedAdrea might not include area value for particular attribute (Say waste data with 0 amount is not displayed in UI.)
					    	if (boundedArea[displayOrders[property]] != null) {
					    		if (isUnitConversionSelected) {
					    			var originalResult = boundedArea[displayOrders[property]],
						    			modifiedResult = me._demoUnitConversionValue(me, attributeId, originalResult);
						    		var attributeInfo = results.attributes[displayOrders[property]],
						    			modifiedUnit = me._demoUnitConversionUnit(me, attributeId, attributeInfo.unit);
						    		rowResult += "<td>" + attributeInfo.name + "</td><td class='biomass-amount'>" 
						    			+ formatBiomassValue(parseInt(modifiedResult))
						    			+ "&nbsp;</td><td class='biomass-unit'>" + modifiedUnit + "</td> </tr>";
					    		} else {
					    			var attributeInfo = results.attributes[displayOrders[property]],
					    				boundedAreaInfo = boundedArea[displayOrders[property]];
						    		rowResult += "<td>" + attributeInfo.name + "</td>"
						    			+ "<td class='biomass-amount'>" + formatBiomassValue(boundedAreaInfo.valueAndUnit.value) + "&nbsp;</td>"
						    			+ "<td class='biomass-unit'>" + attributeInfo.unit + "</td>"
						    			+ "<td class='nutrient-value'>" + ((boundedAreaInfo.nutrientResult.n == null) ? ' - ' : formatBiomassValue(boundedAreaInfo.nutrientResult.n)) + "</td>"
						    			+ "<td class='nutrient-value'>" + ((boundedAreaInfo.nutrientResult.p == null) ? ' - ' : formatBiomassValue(boundedAreaInfo.nutrientResult.p)) + "</td>"
						    			+ "</tr>";
					    		}
					    		rowspanSize++;
					    		delete displayOrders[property];
					    		break;
					    	}
					    }
					}
				}
			}
			else {
				rowResult += "<td>-</td><td colspan='2'>-</td></tr>";
			}
			
			totalResult += "<tr><td";
			if (rowspanSize > 1) {
				totalResult += " rowspan='" + rowspanSize + "'";
			}
			totalResult += ">" + boundedArea.id + " " + boundedArea.name + "</td>" + rowResult;
		}				
		
		totalResult += "</table>";
		totalResult += '<div id="show-nutrient"></div>';
		totalResult += '<div id="selected-area">' + localization.selectedArea + " : " + formatBiomassValue(results.selectedArea) + " ha </div>";
		totalResult = this._createExportPanel(totalResult, boundaryType, calculateRule);
		this._showResult(totalResult);
		this._clearSelectedUnitConversions(me);
	},
	
	_createExportPanel : function(totalResult, boundaryType, calculateRule) {
		var	queryData,
			me = this,
			sandbox = this.instance.getSandbox(),
			attributes = this._getVisibleBiomassAttributeIds(sandbox);
		
		queryData= JSON.stringify({				
			areaIds: me.selectedIds[boundaryType],
			attributes: attributes,
			boundedAreaGridId: me.GRID_IDS[boundaryType],
			calculateRule: calculateRule
		});
		
		totalResult += 
			me.instance.getLocalization()["flyout"].saveResults + ": "
			+ "<form method='POST' action='/biomass/area/xlsx' style='display: inline-block'>" 
			+ "<input type='hidden' name='query' value= " + queryData + "/>" 
			+ "<input type='submit' name='submit' value='XLSX' />" 
			+ "</form>&nbsp;"
			+ "<form method='POST' action='/biomass/area/csv' style='display: inline-block'>" 
			+ "<input type='hidden' name='query' value= " + queryData + "/>" 
			+ "<input type='submit' name='submit' value='CSV' />" 
			+ "</form>"
			+ "<br>";
		return totalResult;
	},
	
	_cancelButtonClick: function(){
		var me = this,
			instance = me.instance,
			sandbox = instance.getSandbox(),
			toolbarRequest = sandbox.getRequestBuilder('Toolbar.SelectToolButtonRequest')();
        sandbox.request(instance, toolbarRequest);        
        me._clearAllIdList();     
        me._removeWmsLayer(sandbox);  
        me._close();
        me.isBoundaryIconClickedForFirstTime = false;
        me._setSelectedBoundaryType(null);        
	},
	
	_clearAllIdList : function() {
		for (var key in this.selectedIds) {
			this.selectedIds[key] = []
		}
		this.selectedPoints = []
	},
	
	mapClickedEvent: function(event) {		
		if (this.isBoundaryIconClickedForFirstTime) {		
			this._areaClick(event, this._getSelectedBoundaryType());
		}		
	},
	
	_areaClick: function(event, boundaryType) {
		var me = this,			
			lonlat = event.getLonLat(),	
			point = new OpenLayers.Geometry.Point(lonlat.lon, lonlat.lat);

		this._fixIndexOfForOlderIE();		
		jQuery.ajax({
			url: "/biomass/boundedarea/geometry",
			type: "POST",
			contentType: "application/json; charset=UTF-8",
			data: JSON.stringify({
				points: [point], 
				attributes: null, 
				boundedAreaGridId: me.GRID_IDS[boundaryType]
			}),
			dataType: "json",
			success: function(results, status, xhr) {
				var result = results[0];
				var indexId = me.selectedIds[boundaryType].indexOf(result.id);
				if (indexId > -1) {					
					me._removeSelectedBoundedAreaFromMap(me, result.id);
					me.selectedIds[boundaryType].splice(indexId, 1);
					me.selectedPoints.splice(indexId, 1);
				} else {					
					me._addSelectionForBoundedAreaOnMap(me, result);
					me.selectedIds[boundaryType].push(result.id);
					me.selectedPoints.push(point);
				}
				me._updateCalculateButtonVisibility(me);
			}
		});		
	},
	
    _selectAllBoundaries : function(me) {
    	var boundaryType = me._getSelectedBoundaryType();
    	jQuery.ajax({
			url: "/biomass/boundedarea/allGeometries",
			type: "POST",
			contentType: "application/json; charset=UTF-8",
			data: JSON.stringify({
				boundedAreaGridId: me.GRID_IDS[boundaryType]
			}),
			dataType: "json",
			success: function(results, status, xhr) {
				for (var i = 0; i < results.length; i++) {
					var result = results[i];
					var indexId = me.selectedIds[boundaryType].indexOf(result.id);
					if (indexId > -1) {					
						me._removeSelectedBoundedAreaFromMap(me, result.id);
						me.selectedIds[boundaryType].splice(indexId, 1);
						me.selectedPoints.splice(indexId, 1);
					} else {
						// Selections are restored by point so choose the centroid as the point that was "clicked"
						var point = new OpenLayers.Format.WKT().read(result.geometry).geometry.getCentroid();
						me._addSelectionForBoundedAreaOnMap(me, result);
						me.selectedIds[boundaryType].push(result.id);
						me.selectedPoints.push(point);
					}
				}
				me._updateCalculateButtonVisibility(me);
			}
		});	
    },
	
	_removeSelectedBoundedAreaFromMap : function(me, selectedAreaId) {
		var instance = me.instance,
			sandbox = instance.getSandbox(),
			requestForRemoveFeature = sandbox.getRequestBuilder(
					"MapModulePlugin.RemoveFeaturesFromMapRequest");
		sandbox.request(instance, requestForRemoveFeature("id", selectedAreaId, null));
	},
	
	_addSelectionForBoundedAreaOnMap : function(me, results) {
		var instance = me.instance,
			sandbox = instance.getSandbox(),
			requestForAddFeature = sandbox.getRequestBuilder(
					"MapModulePlugin.AddFeaturesToMapRequest" ),
			style = OpenLayers.Util.applyDefaults(
			        {fillColor: '#FFFF00', fillOpacity: 0.8, strokeColor: '#eda740', label: results.boundedAreaName},
			        OpenLayers.Feature.Vector.style["default"]);	
		sandbox.request(instance, requestForAddFeature( results.geometry, 'WKT', 
			{id: results.id}, null, null, true, style, false));
	},
			
	/**
	 *  Fix for Older IE browser; FOR indexOf function
	 */
	_fixIndexOfForOlderIE: function() {		
		if (!Array.prototype.indexOf) {
		  Array.prototype.indexOf = function(elt /*, from*/) {
		    var len = this.length >>> 0;
		    
		    var from = Number(arguments[1]) || 0;
		    from = (from < 0)
		         ? Math.ceil(from)
		         : Math.floor(from);
		    if (from < 0)
		      from += len;

		    for (; from < len; from++) {
		      if (from in this &&
		          this[from] === elt)
		        return from;
		    }
		    return -1;
		  };
		}
	},
	
	syncToolbarButtonVisibility : function() {
		var me = this,
			instance = me.instance,
			sandbox = instance.getSandbox();
		me._setToolbarButtonVisibility(sandbox, me._getVisibleBiomassAttributeIds().length > 0);
	},
	
	_setToolbarButtonVisibility : function(sandbox, state) {
		var stateReqBuilder = sandbox.getRequestBuilder("Toolbar.ToolButtonStateRequest"),
			stateRequest = stateReqBuilder("bmaBoundaryCalculator", "basictools", state);
		sandbox.request("Boundary", stateRequest);
	},
	
	_showResult: function(result){	
		jQuery("#boundary-message").hide();
		jQuery("#boundary-select-all").hide();
		jQuery("#unit-conversion").hide();
		jQuery("#boundary-data").html(result);
		this._showNutrientOptionDiv();
	},
	
	_getSelectedBoundaryType: function() {
		return this.selectedBoundaryType;
	},
	
	_setSelectedBoundaryType: function(selectedType) {
		this.selectedBoundaryType = selectedType;
	},
	
	getContentState: function() {
		var me = this;
		var state = {};
		state.selectedPoints = me.selectedPoints;
		state.boundaryType = me._getSelectedBoundaryType();
        return state;
    },
    
    setContentState: function(state) {
    	var me = this;
    	if (state && state.boundaryType) {
    		me._setSelectedBoundaryType(state.boundaryType);
    		setTimeout(function() {
    			me._showBoundary(me);
    			jQuery.ajax({
    				url: "/biomass/boundedarea/geometry",
    				type: "POST",
    				contentType: "application/json; charset=UTF-8",
    				data: JSON.stringify({
    					points: state.selectedPoints, 
    					attributes: null, 
    					boundedAreaGridId: me.GRID_IDS[state.boundaryType]
    				}),
    				dataType: "json",
    				success: function(results, status, xhr) {
    					for (var i = 0; i < results.length; i++) {
    						var result = results[i];
	    					me._addSelectionForBoundedAreaOnMap(me, result);
	    					me.selectedIds[state.boundaryType].push(result.id);
    					}
    					me.selectedPoints = state.selectedPoints;
    					me._updateCalculateButtonVisibility(me);
    				}
    			});	
    		}, 200);
    	}
    },
    
    _createInfoIcon: function (boundaryType) {      
        var me = this,
        	infoIcon = jQuery('<div class="icon-info" id="boundary-info-tool"></div>'),
            location = jQuery('#boundary-message');       
        location.append(infoIcon);
        infoIcon.click(function (e) {
        	me._displayInfoTip(me.AREA_TOOLTIP, boundaryType);
        });
    },
    
    _showUnitConversionOptions : function(me) {
    	var tableRowCount = jQuery('table.biomass-unit-conversion-table tr').length;
    	if (tableRowCount > 0) {
    		me._showUnitConversionTable();
    	} else {
    		var attributeIds = me._getVisibleBiomassAttributeIds();
        	jQuery.ajax({
    			url: "/biomass/attribute/unitConversion",
    			type: "POST",
    			contentType: "application/json; charset=UTF-8",
    			data: JSON.stringify(attributeIds),
    			dataType: "json",
    			success: function(results, status, xhr) {
    				me._populateUnitConversionOptions(results);
    			}
    		});
    	}
    },
    
    _populateUnitConversionOptions : function(results) {
    	var resultSize = results.length,
    		totalResult = "<tr><th> Attribute </th><th> Default unit </th><th> Possible unit </th></tr>";
		for (var i = 0; i < resultSize; i++) {
			var result = results[i];
			totalResult += "<tr><td><input type='hidden' value='" + result.attributeId + "'>" 
				+ result.attributeName 
				+ "</td><td class='biomass-default-unit'>" 
				+ result.attributeUnit 
				+ "</td><td class='biomass-possible-unit'><select><option value='0'>Choose</option>";
			var unitConversions = result.unitConversions;
			if (unitConversions != null) {
				unitConversionsSize = unitConversions.length;
				for (var j = 0; j < unitConversionsSize; j++) {
					var unitConversion = unitConversions[j];
					totalResult += "<option value='" 
						+ unitConversion.code 
						+ "'>" 
						+ unitConversion.unit 
						+ "</option>";
				}
			}
			totalResult += "</select></td></tr>";
		}
		jQuery('table.biomass-unit-conversion-table').append(totalResult);
    },
    
    _showUnitConversionTable : function() {
    	jQuery('table.biomass-unit-conversion-table').show();
    },
    
    _hideUnitConversionTable : function() {
    	jQuery('table.biomass-unit-conversion-table').hide();
    },
    
    _setSelectedUnitConverionsValue : function(me) {
    	var unitConversionTable = jQuery('table.biomass-unit-conversion-table');
    	unitConversionTable.find('td:first-child input').each(function () {
    		var value = jQuery(this).closest('tr').find('.biomass-possible-unit select').val();
    		me.selectedUnitConversions[this.value] = value;
    	});
    },
    
    _clearSelectedUnitConversions : function(me) {
    	var selectedUnitConverions = me.selectedUnitConversions;
    	for (var key in selectedUnitConverions) {
    		delete selectedUnitConverions[key];
    	}
    },
    
    // Just a demo.
    _demoUnitConversionValue : function(me, attributeId, value) {
    	var selectedUnitConverions = me.selectedUnitConversions,
    		result = value;
    	for (var key in selectedUnitConverions) {
    		if (selectedUnitConverions.hasOwnProperty(key)) {
    			if (key == attributeId) {
    				switch(selectedUnitConverions[key]) {
    					case "1":
    						result = parseInt(value) * 2;
    						break;
	    				case "2":
	    					result = parseInt(value) / 2;
	    					break;
	    				case "3": 
	    					result = parseInt(value) + 2;
	    					break;
	    				default:
	    					result = value;
    				}
    				break;
    			}
    		}
    	}
    	return result;
    },
    
    _demoUnitConversionUnit : function(me, attributeId, unit) {
    	var selectedUnitConverions = me.selectedUnitConversions,
    		result = unit;
    	for (var key in selectedUnitConverions) {
    		if (selectedUnitConverions.hasOwnProperty(key)) {
    			if (key == attributeId) {
    				switch(selectedUnitConverions[key]) {
    				case "1":
    					result = "aa";
    					break;
    				case "2":
    					result = "bb";
    					break;
    				case "3": 
    					result = "cc";
    					break;
    				default:
    					result = unit;
    				}
    				break;
    			}
    		}
    	}
    	return result;
    },
    
    _displayInfoTip: function (selectionType, boundaryType) {
    	var areaTypeInfoLocalization,
			title,
			desc,
			dialog = Oskari.clazz.create(
	            'Oskari.userinterface.component.Popup'
	        ),
	        okBtn = Oskari.clazz.create(
	            'Oskari.userinterface.component.Button'
	        );
	
		if (selectionType === this.AREA_TOOLTIP) {
			areaTypeInfoLocalization = this.instance.getLocalization()["flyout"].areaTypeInfo;
        	title = areaTypeInfoLocalization.title[boundaryType];
        	desc = areaTypeInfoLocalization.description[boundaryType];
		} else if (selectionType === this.NUTRIENT_TOOLTIP) {
	    	title = this.instance.getLocalization()["flyout"].showNutrients;
	    	desc = this.instance.getLocalization()["flyout"].showNutrientTooltip;
		}
		
        okBtn.addClass('default oskari-button');
        okBtn.setTitle('Ok');
        okBtn.setHandler(function () {
            dialog.close(true);
        });
        dialog.show(title, desc, [okBtn]);       
    },
    
    //User activity
    _saveUserActivity : function(boundaryType, calculateRule) {
    	var me = this,
			sandbox = me.instance.getSandbox();
	
		me._setSelectedUnitConverionsValue(me);
		
		jQuery.ajax({
			url: "/biomass/useractivity/boundedarea",
			type: "POST",
			contentType: "application/json; charset=UTF-8",
			data: JSON.stringify({
				areaIds: me.selectedIds[boundaryType],
				attributes: me._getVisibleBiomassAttributeIds(sandbox),
				boundedAreaGridId: me.GRID_IDS[boundaryType],
				calculateRule: calculateRule
			}),
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
	    showNutrientOption.find('#show-nutrient-checkbox').bind('change', function(){        	
	    	me._hideShowNutrientValuesInTable(this);     	
	    });
	    
	    showNutrientOption.find('#nutrient-tooltip').unbind('click');
	    showNutrientOption.find('#nutrient-tooltip').bind('click', function() {        	
        	me._displayInfoTip(me.NUTRIENT_TOOLTIP, null);     	
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
