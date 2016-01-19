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
	
	this.template = null;
	this.templateBoundaryMessage = jQuery('<div id="boundary-message">Valitse maantieteellinen alue, jonka biomassa lasketaan</div> ' +
			'<div id="boundary-radio"><label><input type="radio" name="boundary" value="municipality">Kunta</label><br>' +
			'<label><input type="radio" name="boundary" value="province">Maakunta</label><br> <label><input type="radio" name="boundary" value="drainageBasin">Valuma-alue</label><br>' +
			'<label><input type="radio" name="boundary" value="postalCode">Postinumero</label></div>');	
	this.templateBoundaryData = jQuery('<div id="boundary-data"></div>');
	this.templateBoundaryCalculateCancelTool = jQuery('<div class="boundary-horizontal-line">.</div>' + 
			'<div id="boundary-next-tool"><button class="boundary-button" id="boundary-next" disabled></button></div>' +
			'<div id="boundary-calclulate-cancel-tool" style="display:none"><button class="boundary-button" id="boundary-calculate"></button>' +
			'<span id="boundary-cancel-tool"><button class="boundary-button" id="boundary-cancel"></button></span> </div>');
		
	this.wmsUrl = "http://testi.biomassa-atlas.luke.fi/geoserver/wms";	
	this.wmsName = null;
	this.wmsId = null;	
	
	this.selectedBoundaryType = null;
	
	/* These string values must be same as value for radio button. */
	this.BOUNDARY_MUNICIPALITY = "municipality";
	this.BOUNDARY_PROVINCE = "province";
	this.BOUNDARY_DRAINAGE_BASIN = "drainageBasin";
	this.BOUNDARY_POSTAL_CODE = "postalCode";
	
	this.GRID_IDS = {};
	this.GRID_IDS[this.BOUNDARY_MUNICIPALITY] = 2;
	this.GRID_IDS[this.BOUNDARY_PROVINCE] = 3;
	this.GRID_IDS[this.BOUNDARY_DRAINAGE_BASIN] = 4;
	this.GRID_IDS[this.BOUNDARY_POSTAL_CODE] = 5;
	
	this.selectedIds = {};
	this.selectedIds[this.BOUNDARY_MUNICIPALITY] = [];
	this.selectedIds[this.BOUNDARY_PROVINCE] = [];
	this.selectedIds[this.BOUNDARY_DRAINAGE_BASIN] = [];
	this.selectedIds[this.BOUNDARY_POSTAL_CODE] = [];
	
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
		return "Mittaustulokset";
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
        
        boundaryMessage.find('input[name="boundary"]').unbind('click');
        boundaryMessage.find('input[name="boundary"]').bind('click', function(){
        	$("#boundary-next").prop('disabled', false);     	
        });
        
        calclulateCancelTool.find('#boundary-next').html("Seuraava");
        calclulateCancelTool.find('#boundary-next').unbind('click');
        calclulateCancelTool.find('#boundary-next').bind('click', function(){        	
        	me._showBoundary(me);
        });
        
        calclulateCancelTool.find('#boundary-calculate').html("Laske");
        calclulateCancelTool.find('#boundary-calculate').unbind('click');
        calclulateCancelTool.find('#boundary-calculate').bind('click', function(){        	
        	me._calculateButtonClick(me);
        });
        
        calclulateCancelTool.find('#boundary-cancel').html("Lopeta");
        calclulateCancelTool.find('#boundary-cancel').unbind('click');
        calclulateCancelTool.find('#boundary-cancel').bind('click', function(){        	
        	me._cancelButtonClick();     	
        });
	
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
    	var sandbox = me.instance.getSandbox(),
    		selectedValue = $('input[name="boundary"]:checked').val();
    	
    	me._removeWmsLayer(sandbox);    	
    	if (selectedValue === this.BOUNDARY_MUNICIPALITY) {
    		this.wmsName = "bma:view_municipality_borders";
    		this.wmsId = "municipalityBorderId";    		
    	} else if (selectedValue === this.BOUNDARY_PROVINCE) {
    		this.wmsName = "bma:view_province_borders";
    		this.wmsId = "provinceBorderId";
    	} else if (selectedValue === this.BOUNDARY_DRAINAGE_BASIN){
    		this.wmsName = "bma:view_drainage_basin_borders";
    		this.wmsId = "drainageBasinBorderId";
    	} else if (selectedValue === this.BOUNDARY_POSTAL_CODE){
    		this.wmsName = "bma:view_postal_code_borders";
    		this.wmsId = "postalCodeBorderId";
    	} else {
    		alert("Error: Select the proper boundary type");
    		return;
    	}
    	this.selectedBoundaryType = selectedValue;
    	me._updateMessage(me, selectedValue);    	
    	me._addWmsLayer(sandbox);    	
    },
    
    _updateMessage : function(me, selectedBoundary) {    	
    	if (selectedBoundary === this.BOUNDARY_MUNICIPALITY) {
    		$('#boundary-message').html("Valitse kunta, jonka biomassa lasketaan");    		
    	} else if (selectedBoundary === this.BOUNDARY_PROVINCE) {
    		$('#boundary-message').html("Valitse maakunta, jonka biomassa lasketaan");    
    	} else if (selectedBoundary === this.BOUNDARY_DRAINAGE_BASIN){
    		$('#boundary-message').html("Valitse valuma-alue, jonka biomassa lasketaan");
    	} else if (selectedBoundary === this.BOUNDARY_POSTAL_CODE){
    		$('#boundary-message').html("Valitse postinumeroalue, jonka biomassa lasketaan");
    	} else {
    		alert("Error: Select the proper boundary type");
    		return;
    	}  	
    	me._hideNextButton();
    	me._hideBoundaryOption();
    	me._showCalculateCancelButtons();
    	me._updateCalculateButtonVisibility(me);
    	return;
	},
	
	_showNextButton : function() {
		$("#boundary-next-tool").show();
	},
	
	_hideNextButton : function() {
		$("#boundary-next-tool").hide();
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
		this._areaCalculate(this.selectedBoundaryType);	
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
		var totalResult = "";
		if (boundaryType === this.BOUNDARY_MUNICIPALITY) {
			totalResult += "<span>"+ "Valitut kunnat:" + "</span>" + "<br>" +				
			"<table><tr><th>Kunta</th> <th>Biomassa tyyppi</th> <th>Määrä</th></tr>";
		} else if(boundaryType === this.BOUNDARY_PROVINCE) {
			totalResult += "<span>"+ "Valitut maakunnat:" + "</span>" + "<br>" +				
			"<table><tr><th>Maakunta</th> <th>Biomassa tyyppi</th> <th>Määrä</th></tr>";
		} else if(boundaryType === this.BOUNDARY_DRAINAGE_BASIN) {
			totalResult += "<span>"+ "Valitut valuma-alueet:" + "</span>" + "<br>" +				
			"<table><tr><th>Valuma-alue</th> <th>Biomassa tyyppi</th> <th>Määrä</th></tr>";
		} else if(boundaryType === this.BOUNDARY_POSTAL_CODE) {
			totalResult += "<span>"+ "Valitut postinumeroalueet:" + "</span>" + "<br>" +				
			"<table><tr><th>Postinumero</th> <th>Biomassa tyyppi</th> <th>Määrä</th></tr>";
		} else {
			alert("ERROR: Invalid boundary type.");
			return;
		}
		
		for (var boundaryName in results.boundedAreas) {
			var boundedArea = results.boundedAreas[boundaryName];
			var rowspanSize = _.size(boundedArea) - 2; // minus 2 is for attributeName id and name. 
			totalResult += "<tr><td rowspan=" + rowspanSize + ">" + boundedArea.name + "</td>";
			for (var attributeId in boundedArea) {
				// TODO this should be easier after we switch to JSON-stat
				if (attributeId == "id" || attributeId == "name"){
					continue;
				} 
				var attributeInfo = results.attributes[attributeId];
				totalResult += "<td>" + attributeInfo.name + "</td><td>" + boundedArea[attributeId] + " " + attributeInfo.unit + "</td> </tr>";
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
			"Tallenna tulokset: "
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
        me.selectedBoundaryType = null;        
	},
	
	_clearAllIdList : function() {
		for (var key in this.selectedIds) {
			this.selectedIds[key] = []
		}
	},
	
	mapClickedEvent: function(event) {		
		if (this.isBoundaryIconClickedForFirstTime) {		
			this._areaClick(event, this.selectedBoundaryType);
		}		
	},
	
	_areaClick: function(event, boundaryType) {
		var me = this,			
			lonlat = event.getLonLat(),		
			points = [];		

		points.push( new OpenLayers.Geometry.Point(lonlat.lon, lonlat.lat));	
		this._fixIndexOfForOlderIE();		
		jQuery.ajax({
			url: "/biomass/boundedarea/geometry",
			type: "POST",
			contentType: "application/json; charset=UTF-8",
			data: JSON.stringify({
				points: points, 
				attributes: null, 
				boundedAreaGridId: me.GRID_IDS[boundaryType]
			}),
			dataType: "json",
			success: function( results, status, xhr ) {
				var indexId = me.selectedIds[boundaryType].indexOf(results.id);
				if (indexId > -1) {					
					me._removeSelectedBoundedAreaFromMap(me, results.id);
					me.selectedIds[boundaryType].splice(indexId, 1);
				} else {					
					me._addSelectionForBoundedAreaOnMap(me, results);
					me.selectedIds[boundaryType].push(results.id);
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
		jQuery("#boundary-data").html(result);
	}
	
}, {
	'protocol' : ['Oskari.userinterface.Flyout']
});
