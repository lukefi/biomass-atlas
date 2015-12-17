/**
 * @class Oskari.bma.bundle.drainagebasin.DrainageBasinBundle.Flyout
 *
 */
Oskari.clazz.define('Oskari.bma.bundle.drainagebasin.DrainageBasinBundle.Flyout',

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
	this.templateDrainageBasinMessage = jQuery('<div id="drainage-basin-message">Valitse valuma-alue, jonka biomassa lasketaan</div>');
	this.templateDrainageBasinData = jQuery('<div id="drainage-basin-data"></div>');
	this.templateDrainageBasinCalculateTool = jQuery('<div id="drainage-basin-calculate-tool"><button class="drainage-basin-button" id="drainage-basin-calculate"></button></div>');
	this.templateDrainageBasinCancelTool = jQuery('<div id="drainage-basin-cancel-tool"><button class="drainage-basin-button" id="drainage-basin-cancel"></button></div>');
	
	this.wmsUrl = "http://testi.biomassa-atlas.luke.fi/geoserver/wms";
	this.wmsName = "bma:view_drainage_basin_borders";
	this.wmsId = "drainageBasinBorderId";
	this.selectedDrainageBasinIds = [];
	
}, {	
	/**
	 * @property template HTML templates for the User Interface
	 * @static
	 */
	templates : {
		content : "<div class='metadataflyout_content'></div>"
	},
	getName : function() {
		return 'Oskari.bma.bundle.drainagebasin.DrainageBasinBundle.Flyout';
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
		
		me.isDrainageBasinIconClickedForFirstTime = true;
		
		// clear container
		var cel = jQuery(me.container);
		cel.empty();
        var content = me.template.clone();
        cel.append(content);

        var drainageBasinMessage = me.templateDrainageBasinMessage.clone();
        var drainageBasinData = me.templateDrainageBasinData.clone();
        var calculateTool = me.templateDrainageBasinCalculateTool.clone();
        var cancelTool = me.templateDrainageBasinCancelTool.clone();
        
        calculateTool.find('#drainage-basin-calculate').html("Laske");
        calculateTool.find('#drainage-basin-calculate').unbind('click');
        calculateTool.find('#drainage-basin-calculate').bind('click', function(){        	
        	me._calculateButtonClick(me);
        });
        
        cancelTool.find('#drainage-basin-cancel').html("Lopeta");
        cancelTool.find('#drainage-basin-cancel').unbind('click');
        cancelTool.find('#drainage-basin-cancel').bind('click', function(){        	
        	me._cancelButtonClick();     	
        });
	
        content.addClass('bma-drainage-basin-main-div');
        content.append(drainageBasinMessage);
        content.append(drainageBasinData);
        content.append(calculateTool);
    	content.append(cancelTool);
    	
    	me._updateCalculateButtonVisibility(me);
    	
    	me._addWmsLayer(sandbox);
    	
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
		var btn = $("#drainage-basin-calculate");
		if (me.selectedDrainageBasinIds.length > 0) {
			btn.show();
		}
		else {
			btn.hide();
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
	     	if(layer.layerId === "bma:view_drainage_basin_borders") {
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
		var me = this,
			sandbox = me.instance.getSandbox();		
		jQuery.ajax({
			url: "/biomass/drainagebasin/calculate",
			type: "POST",
			contentType: "application/json; charset=UTF-8",
			data: JSON.stringify({
				areaIds: me.selectedDrainageBasinIds,
				attributeIds: me._getVisibleBiomassAttributeIds(sandbox)
			}),
			dataType: "json",
			success: function(results, status, xhr) {
				// TODO - should find better way to show calculation results and selected layers' names
				var totalResult = "";
				
				for(var listName in results){
					totalResult += "<span>"+ "Valitut valuma-alueet:" + "</span>" + "<br>";
					for(var drainageBasinName in results[listName]){
						totalResult += "<br>" + "<span style=' font-size:10pt;text-decoration:underline; '>"
							+ results[listName][drainageBasinName].name + ":" + "</span>";
						for (var attributeName in results[listName][drainageBasinName]) {	
							// TODO this should be easier after we switch to JSON-stat
							if (attributeName == "id" || attributeName == "name"){
								continue;
							} 
							totalResult += "<br>" + "<span style=' font-size:9pt; '>"
							+ attributeName + " : " + results[listName][drainageBasinName][attributeName] + "</span>";
						}
					}					
				}
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
        me._clearDrainageBasinIdsList(me);        
        me._removeWmsLayer(sandbox);
        me._close();
        me.isDrainageBasinIconClickedForFirstTime = false;
	},
	
	mapClickedEvent: function(event){
		var me = this,
			instance = me.instance,
			sandbox = instance.getSandbox(),
			lonlat = event.getLonLat(),		
			points = [],
			requestForRemoveFeature,
			requestForAddFeature;
	
		points.push( new OpenLayers.Geometry.Point(lonlat.lon, lonlat.lat));
		
		this._fixIndexOfForOlderIE();
		if(me.isDrainageBasinIconClickedForFirstTime){
			jQuery.ajax({
				url: "/biomass/drainagebasin/geometry",
				type: "POST",
				contentType: "application/json; charset=UTF-8",
				data: JSON.stringify( { points: points, attributes: null } ),
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
		}		
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
			stateRequest = stateReqBuilder("bmaDrainageBasinCalculator", "basictools", state);
		sandbox.request("DrainageBasin", stateRequest);
	},
	
	_showResult: function(result){
		jQuery("#drainage-basin-message").hide();
		jQuery("#drainage-basin-data").html(result);
	},
	
	_clearDrainageBasinIdsList: function(me) {
		me.selectedDrainageBasinIds = [];
	}
	
}, {
	'protocol' : ['Oskari.userinterface.Flyout']
});
