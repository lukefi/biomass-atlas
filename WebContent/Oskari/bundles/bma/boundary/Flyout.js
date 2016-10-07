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

	this.wmsUrl = "http://testi.biomassa-atlas.luke.fi/geoserver/wms";	
	this.wmsName = null;
	this.wmsId = null;	

	this.template = null;
	this.templateBoundaryData = jQuery('<div id="boundary-data"></div>');
	this.templateBoundaryCalculateCancelTool = jQuery('<div class="boundary-horizontal-line">.</div>' + 
			'<div id="boundary-calclulate-cancel-tool" style="display:none"><button class="boundary-button" id="boundary-prev"></button><button class="boundary-button" id="boundary-calculate"></button>' +
			'<span id="boundary-cancel-tool"><button class="boundary-button" id="boundary-cancel"></button></span> </div>');
	
	{
		var flyoutLocalization = this.instance.getLocalization()["flyout"];
		var messageString = '<div id="boundary-message">' + flyoutLocalization["chooseAreaType"] + '</div>';
		messageString += '<div id="boundary-select-all" style="display: none"><button id="boundary-select-all-button" class="boundary-button">' + flyoutLocalization["selectAll"] + '</button></div>';
		messageString += '<div id="boundary-radio">';
		for (var i = 0; i < this.AREA_TYPES.length; i++) {
			var areaType = this.AREA_TYPES[i];
			messageString += '<button name="boundary" value="' + areaType;
			messageString += '">' + flyoutLocalization["areaType"][areaType] + ' »</button><br>';
		}
		messageString += '</div>';
		this.templateBoundaryMessage = jQuery(messageString);
	}
		
	this.selectedBoundaryType = null;
	
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
        var calclulateCancelTool = me.templateBoundaryCalculateCancelTool.clone();       
        
        boundaryMessage.find('button[name="boundary"]').unbind('click');
        boundaryMessage.find('button[name="boundary"]').bind('click', function(){
        	me._setSelectedBoundaryType(jQuery(this).val());
        	me._showBoundary(me);  	
        });
        
        boundaryMessage.find('#boundary-select-all-button').unbind('click');
        boundaryMessage.find('#boundary-select-all-button').bind('click', function(){        	
        	me._selectAllBoundaries(me);
        });
        
        calclulateCancelTool.find('#boundary-prev').html(localization.prev);
        calclulateCancelTool.find('#boundary-prev').unbind('click');
        calclulateCancelTool.find('#boundary-prev').bind('click', function() {
        	me._clearAllIdList();
        	me.stopPlugin();
        	me.startPlugin();
        	me.createUI();
        });
        
        calclulateCancelTool.find('#boundary-calculate').html(localization.calculate);
        calclulateCancelTool.find('#boundary-calculate').unbind('click');
        calclulateCancelTool.find('#boundary-calculate').bind('click', function(){        	
        	me._calculateButtonClick(me);
        });
        
        calclulateCancelTool.find('#boundary-cancel').html(localization.quit);
        calclulateCancelTool.find('#boundary-cancel').unbind('click');
        calclulateCancelTool.find('#boundary-cancel').bind('click', function(){        	
        	me._cancelButtonClick();     	
        });
        
        /*boundaryMessage.find('#boundary-info-tool').unbind('click');
        boundaryMessage.find('#boundary-info-tool').bind('click', function(){        	
        	me._displayInfoTip();     	
        });*/
	
        content.addClass('bma-boundary-main-div');
        content.append(boundaryMessage);
        content.append(boundaryData);
        content.append(calclulateCancelTool);    
        
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
		$("#boundary-calclulate-cancel-tool").show();
	},
	
	_hideCalculateCancelButtons : function() {
		$("#boundary-calclulate-cancel-tool").hide();
	},
    
	_updateCalculateButtonVisibility : function(me) {
		var btn = $("#boundary-calculate");
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
	
	_calculateButtonClick: function(){		
		this._areaCalculate(this._getSelectedBoundaryType());	
	},
	
	_areaCalculate: function(boundaryType) {
		var me = this,
			sandbox = me.instance.getSandbox();
		
		jQuery.ajax({
			url: "/biomass/boundedarea/calculate",
			type: "POST",
			contentType: "application/json; charset=UTF-8",
			data: JSON.stringify({
				areaIds: me.selectedIds[boundaryType],
				attributes: me._getVisibleBiomassAttributeIds(sandbox),
				boundedAreaGridId: me.GRID_IDS[boundaryType]
			}),
			dataType: "json",
			success: function(results, status, xhr) {
				me._createTabularResult(results, boundaryType);					
			}
		});
	},
	
	_createTabularResult : function(results, boundaryType) {
		// TODO - should find better way to show calculation results and selected layers' names
		var localization = this.instance.getLocalization()["flyout"],
			totalResult = "<span>" + localization.areaTypeSelected[boundaryType] + "</span><br>";
		
		totalResult += "<table><tr><th>" + localization.areaType[boundaryType] + "</th><th>";
		totalResult += localization.biomassType + "</th><th colspan='2'>" + localization.amount + "</th></tr>";
		
		var originalDisplayOrders = results.displayOrders;
		for (var boundaryName in results.boundedAreas) {
			var displayOrders = jQuery.extend({}, originalDisplayOrders),	//shallow clone
				boundedArea = results.boundedAreas[boundaryName],
				rowspanSize = _.size(boundedArea) - 2; // minus 2 is for attributeName id and name.
			
			totalResult += "<tr><td";
			if (rowspanSize > 1) {
				totalResult += " rowspan='" + rowspanSize + "'";
			}
			totalResult += ">" + boundedArea.id + " " + boundedArea.name + "</td>";
			if (rowspanSize >= 1) { // at least some data exists for the area
				for (var attributeId in boundedArea) {
					// TODO this should be easier after we switch to JSON-stat
					if (attributeId == "id" || attributeId == "name"){
						continue;
					} 
					for (var property in displayOrders) {
					    if (displayOrders.hasOwnProperty(property)) {
					    	// Null check is needed because boundedAdrea might not include area value for particular attribute (Say waste data with 0 amount is not displayed in UI.)
					    	if (boundedArea[displayOrders[property]] != null) { 
					    		var attributeInfo = results.attributes[displayOrders[property]];
					    		totalResult += "<td>" + attributeInfo.name + "</td><td class='biomass-amount'>" 
					    		 	+ formatBiomassValue(boundedArea[displayOrders[property]])
									+ "&nbsp;</td><td class='biomass-unit'>" + attributeInfo.unit + "</td> </tr>";
					    		 delete displayOrders[property];
					    		 break;
					    	}
					    }
					}
				}
			}
			else {
				totalResult += "<td>-</td><td colspan='2'>-</td></tr>";
			}
		}				
		
		totalResult += "</table>";
		totalResult = this._createExportPanel(totalResult, boundaryType);
		this._showResult(totalResult);				
	},
	
	_createExportPanel : function(totalResult, boundaryType) {
		var	queryData,
			me = this,
			sandbox = this.instance.getSandbox(),
			attributes = this._getVisibleBiomassAttributeIds(sandbox);
		
		queryData= JSON.stringify({				
			areaIds: me.selectedIds[boundaryType],
			attributes: attributes,
			boundedAreaGridId: me.GRID_IDS[boundaryType]
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
			        {fillColor: '#9900FF', fillOpacity: 0.8, strokeColor: '#000000'},
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
		jQuery("#boundary-data").html(result);
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
        // show metadata
        infoIcon.click(function (e) {
            var areaTypeInfoLocalization = me.instance.getLocalization()["flyout"].areaTypeInfo,
            	title = areaTypeInfoLocalization.title[boundaryType],
            	desc = areaTypeInfoLocalization.description[boundaryType],
                dialog = Oskari.clazz.create(
                    'Oskari.userinterface.component.Popup'
                ),
                okBtn = Oskari.clazz.create(
                    'Oskari.userinterface.component.Button'
                );

            okBtn.addClass('default boundary-button');
            okBtn.setTitle('Ok');
            okBtn.setHandler(function () {
                dialog.close(true);
            });
            dialog.show(title, desc, [okBtn]);
        });
    }
    
}, {
	'protocol' : ['Oskari.userinterface.Flyout']
});
