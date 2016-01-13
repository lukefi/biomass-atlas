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
	this.templateBoundaryMessage = jQuery('<div id="boundary-message">Valitse maantietellisellä alue, jonka biomassa lasketaan</div> ' +
			'<div id="boundary-radio"><input type="radio" name="boundary" value="kunta">Kunta<br>' +
			'<input type="radio" name="boundary" value="maakunta">Maakunta<br> <input type="radio" name="boundary" value="valumaAlue">Valuma-alue<br></div>');	
	this.templateBoundaryData = jQuery('<div id="boundary-data"></div>');
	this.templateBoundaryCalculateCancelTool = jQuery('<div class="boundary-horizontal-line">.</div>' + 
			'<div id="boundary-next-tool"><button class="boundary-button" id="boundary-next" disabled></button></div>' +
			'<div id="boundary-calclulate-cancel-tool" style="display:none"><button class="boundary-button" id="boundary-calculate"></button>' +
			'<span id="boundary-cancel-tool"><button class="boundary-button" id="boundary-cancel"></button></span> </div>');
		
	this.wmsUrl = "http://testi.biomassa-atlas.luke.fi/geoserver/wms";	
	this.wmsName = null;
	this.wmsId = null;	
	this.selectedMunicipalityIds = [];
	this.selectedDrainageBasinIds = [];
	this.selectedProvinceIds = [];
	this.selectedBoundaryType = null;
	this.BOUNDARY_KUNTA = "kunta";
	this.BOUNDARY_MAAKUNTA = "maakunta";
	this.BOUNDARY_VALUMAALUE = "valumaAlue";
	this.MUNICIPALITY_GRID_ID = 2;
	this.PROVINCE_GRID_ID = 3;
	this.DRAINAGE_BASIN_GRID_ID = 4;
	
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
        boundaryMessage.find('input[name="boundary').bind('click', function(){
        	$("#boundary-next").prop('disabled', false);     	
        });
        
        calclulateCancelTool.find('#boundary-next').html("Seuravaa");
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
    	if (selectedValue === this.BOUNDARY_KUNTA) {
    		this.wmsName = "bma:view_municipality_borders";
    		this.wmsId = "municipalityBorderId";    		
    	} else if (selectedValue === this.BOUNDARY_MAAKUNTA) {
    		this.wmsName = "bma:view_province_borders";
    		this.wmsId = "provinceBorderId";
    	} else if (selectedValue === this.BOUNDARY_VALUMAALUE){
    		this.wmsName = "bma:view_drainage_basin_borders";
    		this.wmsId = "drainageBasinBorderId";
    	} else {
    		alert("Error: Select the proper boundary type");
    		return;
    	}
    	this.selectedBoundaryType = selectedValue;
    	me._updateMessage(me, selectedValue);    	
    	me._addWmsLayer(sandbox);    	
    },
    
    _updateMessage : function(me, selectedBoundary) {    	
    	if (selectedBoundary === this.BOUNDARY_KUNTA) {
    		$('#boundary-message').html("Valitse kunta, jonka biomassa lasketaan");    		
    	} else if (selectedBoundary === this.BOUNDARY_MAAKUNTA) {
    		$('#boundary-message').html("Valitse maakunta, jonka biomassa lasketaan");    
    	} else if (selectedBoundary === this.BOUNDARY_VALUMAALUE){
    		$('#boundary-message').html("Valitse valuma-alue, jonka biomassa lasketaan");
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
		if ((me.selectedMunicipalityIds.length > 0) || (me.selectedDrainageBasinIds.length > 0) || (me.selectedProvinceIds.length > 0)) {
			btn.attr("disabled", false);
		}
		else {
			btn.attr("disabled", true);
		}
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
		if (this.selectedBoundaryType === this.BOUNDARY_KUNTA) {
			this._municipalityCalculate();
		} else if (this.selectedBoundaryType === this.BOUNDARY_MAAKUNTA) {
			this._provinceCalculate();
		} else if (this.selectedBoundaryType === this.BOUNDARY_VALUMAALUE) {
			this._drainageBasinCalculate();
		} else {
			alert("Error");			
		}		
	},
	
	_municipalityCalculate: function(){
		var me = this,
		sandbox = me.instance.getSandbox();
		
		jQuery.ajax({
			url: "/biomass/boundedarea/calculate",
			type: "POST",
			contentType: "application/json; charset=UTF-8",
			data: JSON.stringify({
				areaIds: me.selectedMunicipalityIds,
				attributes: me._getVisibleBiomassAttributeIds(sandbox),
				boundedAreaGridId: me.MUNICIPALITY_GRID_ID
			}),
			dataType: "json",
			success: function(results, status, xhr) {
				// TODO - should find better way to show calculation results and selected layers' names
				var totalResult = "";
				
				for(var listName in results){
					totalResult += "<span>"+ "Valitut kunnat:" + "</span>" + "<br>" +
						"<table><tr><th>Kunta</th> <th>Biomassa tyypi</th> <th>Määrä</th></tr>";
					for(var cityName in results[listName]){
						var rowspanSize = _.size(results[listName][cityName]) - 2; // minus 2 is for attributeName id and name. 
						totalResult += "<tr><td rowspan=" + rowspanSize + ">" + results[listName][cityName].name + "</td>";						
						for (var attributeName in results[listName][cityName]) {	
							// TODO this should be easier after we switch to JSON-stat
							if (attributeName == "id" || attributeName == "name"){
								continue;
							}							
							totalResult += "<td>" + attributeName + "</td><td>" + results[listName][cityName][attributeName] + "</td> </tr>";
						}
					}					
				}
				totalResult += "</table>";
				me._showResult(totalResult);				
			}
		});
	},
	
	_provinceCalculate: function(){
		var me = this,
		sandbox = me.instance.getSandbox();
		
		jQuery.ajax({
			url: "/biomass/boundedarea/calculate",
			type: "POST",
			contentType: "application/json; charset=UTF-8",
			data: JSON.stringify({
				areaIds: me.selectedMunicipalityIds,
				attributes: me._getVisibleBiomassAttributeIds(sandbox),
				boundedAreaGridId: me.PROVINCE_GRID_ID
			}),
			dataType: "json",
			success: function(results, status, xhr) {
				alert('success');				
			}
		});
	},
	
	_drainageBasinCalculate: function(){
		var me = this,
			sandbox = me.instance.getSandbox();		
		jQuery.ajax({
			url: "/biomass/boundedarea/calculate",
			type: "POST",
			contentType: "application/json; charset=UTF-8",
			data: JSON.stringify({
				areaIds: me.selectedDrainageBasinIds,
				attributes: me._getVisibleBiomassAttributeIds(sandbox),
				boundedAreaGridId: me.DRAINAGE_BASIN_GRID_ID
			}),
			dataType: "json",
			success: function(results, status, xhr) {
				// TODO - should find better way to show calculation results and selected layers' names
				var totalResult = "";
				
				for(var listName in results){
					totalResult += "<span>"+ "Valitut valuma-alueet:" + "</span>" + "<br>" +				
						"<table><tr><th>Valuma-alue</th> <th>Biomassa tyypi</th> <th>Määrä</th></tr>";
					for(var drainageBasinName in results[listName]){
						var rowspanSize = _.size(results[listName][drainageBasinName]) - 2; // minus 2 is for attributeName id and name. 
						totalResult += "<tr><td rowspan=" + rowspanSize + ">" + results[listName][drainageBasinName].name + "</td>";
						for (var attributeName in results[listName][drainageBasinName]) {	
							// TODO this should be easier after we switch to JSON-stat
							if (attributeName == "id" || attributeName == "name"){
								continue;
							} 
							totalResult += "<td>" + attributeName + "</td><td>" + results[listName][drainageBasinName][attributeName] + "</td> </tr>";
						}
					}					
				}
				totalResult += "</table>";
				me._showResult(totalResult);				
			}
		});
	},
	
	_cancelButtonClick: function(){
		var me = this,
			instance = me.instance,
			sandbox = instance.getSandbox(),
			toolbarRequest = sandbox.getRequestBuilder('Toolbar.SelectToolButtonRequest')();
        sandbox.request(instance, toolbarRequest);        
        me._clearMunicipalityIdList(me);        
        me._clearProvinceIdList(me);        
        me._clearDrainageBasinIdsList(me);        
        me._removeWmsLayer(sandbox);
        me._close();
        me.isBoundaryIconClickedForFirstTime = false;
        me.selectedBoundaryType = null;
	},
	
	mapClickedEvent: function(event){		
		if(this.isBoundaryIconClickedForFirstTime){			
			if (this.selectedBoundaryType === this.BOUNDARY_KUNTA) {
				this._municipalityClick(event);
			} else if (this.selectedBoundaryType === this.BOUNDARY_MAAKUNTA) {
				this._provinceClick(event);
			} else if (this.selectedBoundaryType === this.BOUNDARY_VALUMAALUE) {
				this._drainageBasinClick(event);
			} else {
				//Do nothing
			}		
		}		
	},
	
	_municipalityClick: function(event){
		var me = this,
			instance = me.instance,
			sandbox = instance.getSandbox(),
			lonlat = event.getLonLat(),		
			points = [],
			requestForRemoveFeature,
			requestForAddFeature;		

		points.push( new OpenLayers.Geometry.Point(lonlat.lon, lonlat.lat));
	
		this._fixIndexOfForOlderIE();		
		jQuery.ajax({
			url: "/biomass/boundedarea/geometry",
			type: "POST",
			contentType: "application/json; charset=UTF-8",
			data: JSON.stringify( { points: points, attributes: null, boundedAreaGridId: me.MUNICIPALITY_GRID_ID } ),
			dataType: "json",
			success: function( results, status, xhr ) {
				var indexId = me.selectedMunicipalityIds.indexOf(results.id);
				if (indexId > -1) {
					requestForRemoveFeature = sandbox.getRequestBuilder(
							"MapModulePlugin.RemoveFeaturesFromMapRequest");
					sandbox.request(instance, requestForRemoveFeature("id", results.id, null));
					me.selectedMunicipalityIds.splice(indexId, 1);
					me._updateCalculateButtonVisibility(me);
				} else {
					requestForAddFeature = sandbox.getRequestBuilder(
							"MapModulePlugin.AddFeaturesToMapRequest" );				
					var style = OpenLayers.Util.applyDefaults(
					        {fillColor: '#9900FF', fillOpacity: 0.8, strokeColor: '#000000'},
					        OpenLayers.Feature.Vector.style["default"]);

					sandbox.request(instance, requestForAddFeature( results.geometry, 'WKT', 
							{id: results.id}, null, null, true, style, false));				
					me.selectedMunicipalityIds.push(results.id);
					me._updateCalculateButtonVisibility(me);
				}
			}
		});		
	},
	
	_provinceClick: function(event){
		var me = this,
			instance = me.instance,
			sandbox = instance.getSandbox(),
			lonlat = event.getLonLat(),		
			points = [],
			requestForRemoveFeature,
			requestForAddFeature;		
		
		points.push( new OpenLayers.Geometry.Point(lonlat.lon, lonlat.lat));
		
		this._fixIndexOfForOlderIE();		
		jQuery.ajax({
			url: "/biomass/boundedarea/geometry",
			type: "POST",
			contentType: "application/json; charset=UTF-8",
			data: JSON.stringify( { points: points, attributes: null, boundedAreaGridId: me.PROVINCE_GRID_ID } ),
			dataType: "json",
			success: function( results, status, xhr ) {
				var indexId = me.selectedMunicipalityIds.indexOf(results.id);
				if (indexId > -1) {
					requestForRemoveFeature = sandbox.getRequestBuilder(
					"MapModulePlugin.RemoveFeaturesFromMapRequest");
					sandbox.request(instance, requestForRemoveFeature("id", results.id, null));
					me.selectedProvinceIds.splice(indexId, 1);
					me._updateCalculateButtonVisibility(me);
				} else {
					requestForAddFeature = sandbox.getRequestBuilder(
					"MapModulePlugin.AddFeaturesToMapRequest" );				
					var style = OpenLayers.Util.applyDefaults(
							{fillColor: '#9900FF', fillOpacity: 0.8, strokeColor: '#000000'},
							OpenLayers.Feature.Vector.style["default"]);
					
					sandbox.request(instance, requestForAddFeature( results.geometry, 'WKT', 
							{id: results.id}, null, null, true, style, false));				
					me.selectedProvinceIds.push(results.id);
					me._updateCalculateButtonVisibility(me);
				}
			}
		});		
	},
	
	_drainageBasinClick : function(event) {
		var me = this,
			instance = me.instance,
			sandbox = instance.getSandbox(),
			lonlat = event.getLonLat(),		
			points = [],
			requestForRemoveFeature,
			requestForAddFeature;			
	
		points.push( new OpenLayers.Geometry.Point(lonlat.lon, lonlat.lat));
		
		this._fixIndexOfForOlderIE();		
		jQuery.ajax({
			url: "/biomass/boundedarea/geometry",
			type: "POST",
			contentType: "application/json; charset=UTF-8",
			data: JSON.stringify( { points: points, attributes: null, boundedAreaGridId: me.DRAINAGE_BASIN_GRID_ID } ),
			dataType: "json",			
			success: function( results, status, xhr ) {				
				var indexId = me.selectedDrainageBasinIds.indexOf(results.id);
				if (indexId > -1) {
					requestForRemoveFeature = sandbox.getRequestBuilder(
							"MapModulePlugin.RemoveFeaturesFromMapRequest");
					sandbox.request(instance, requestForRemoveFeature("id", results.id, null));
					me.selectedDrainageBasinIds.splice(indexId, 1);
					me._updateCalculateButtonVisibility(me);
				} else {
					requestForAddFeature = sandbox.getRequestBuilder(
							"MapModulePlugin.AddFeaturesToMapRequest" );				
					var style = OpenLayers.Util.applyDefaults(
					        {fillColor: '#9900FF', fillOpacity: 0.8, strokeColor: '#000000'},
					        OpenLayers.Feature.Vector.style["default"]);

					sandbox.request(instance, requestForAddFeature( results.geometry, 'WKT', 
							{id: results.id}, null, null, true, style, false));				
					me.selectedDrainageBasinIds.push(results.id);
					me._updateCalculateButtonVisibility(me);
				}
			}
		});				
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
	},
	
	_clearMunicipalityIdList: function(me) {
		me.selectedMunicipalityIds = [];
	},
	
	_clearProvinceIdList: function(me) {
		me.selectedProvinceIds = [];
	},
	
	_clearDrainageBasinIdsList: function(me) {
		me.selectedDrainageBasinIds = [];
	}
	
}, {
	'protocol' : ['Oskari.userinterface.Flyout']
});
