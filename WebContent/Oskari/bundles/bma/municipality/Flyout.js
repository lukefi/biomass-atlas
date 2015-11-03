/**
 * @class Oskari.bma.bundle.municipality.MunicipalityBundle.Flyout
 *
 */
Oskari.clazz.define('Oskari.bma.bundle.municipality.MunicipalityBundle.Flyout',

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
	this.templateMunicipalityMessage = jQuery('<div id="municipality-message">Valitse kunta, jonka biomassa lasketaan</div>');
	this.templateMunicipalityData = jQuery('<div id="municipality-data"></div>');
	this.templateMunicipalityCalculateTool = jQuery('<div id="municipality-calculate-tool"><button class="municipality-button" id="municipality-calculate"></button></div>');
	this.templateMunicipalityCancelTool = jQuery('<div id="municipality-cancel-tool"><button class="municipality-button" id="municipality-cancel"></button></div>');
	
	this.wmsUrl = "http://testi.biomassa-atlas.luke.fi/geoserver/wms";
	this.wmsName = "bma:view_municipality_borders";
	this.wmsId = "municipalityBorderId";
	this.selectedMunicipalityIds = [];
	/**
	 * @property contentState
	 * what is shown and how
	 */
	this.contentState = {};

	/**
	 * @property showQueue
	 * request queue to enable postponing ajax loads (TBD)
	 *
	 */
	this.showQueue = [];

	/**
	 * @property state
	 */
	this.state = null;

}, {
	compileTemplates : function() {

	},
	/**
	 * @property template HTML templates for the User Interface
	 * @static
	 */
	templates : {
		content : "<div class='metadataflyout_content'></div>"
	},
	getName : function() {
		return 'Oskari.bma.bundle.municipality.MunicipalityBundle.Flyout';
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
	 * Create help ui
	 * @method createUI
	 * @public
	 */
	createUI: function(sandbox){
		var me = this;
		var sandbox = me.instance.getSandbox();
		// clear container
		var cel = jQuery(me.container);
		cel.empty();
        var content = me.template.clone();
        cel.append(content);

        var municipalityMessage = me.templateMunicipalityMessage.clone();
        var municipalityData = me.templateMunicipalityData.clone();
        var calculateTool = me.templateMunicipalityCalculateTool.clone();
        var cancelTool = me.templateMunicipalityCancelTool.clone();
        
        calculateTool.find('#municipality-calculate').html("Laske");
        calculateTool.find('#municipality-calculate').unbind('click');
        calculateTool.find('#municipality-calculate').bind('click', function(){        	
        	me._calculateButtonClick(me);
        	
        });
        
        cancelTool.find('#municipality-cancel').html("Lopeta");
        cancelTool.find('#municipality-cancel').unbind('click');
        cancelTool.find('#municipality-cancel').bind('click', function(){        	
        	me._cancelButtonClick();     	
        });
	
        content.addClass('bma-municipality-main-div');
        content.append(municipalityMessage);
        content.append(municipalityData);
        content.append(calculateTool);
    	content.append(cancelTool);
    	
    	me._updateCalculateButtonVisibility(me);
    	
    	me._addWmsLayer(sandbox);
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
	/**
	 * @method _isVisible
	 * @private
	 * @returns is visible
	 */
	_isVisible: function(){
		var me = this;
		var flyout = me.container.parent().parent();
		var isVisible = flyout.hasClass('oskari-detached');
		return isVisible;

	},
	setState : function(state) {
		this.state = state;
	},	
	/**
	 * @method setContentState
	 * restore state from store
	 */
	setContentState : function(contentState) {
		var me = this;
		var parent = me.container.parents('.oskari-flyout');
        if(parent.hasClass('oskari-detached')){
            parent.find('.oskari-flyouttool-close').trigger('click');
        }
		this.contentState = contentState;
	},
	
	_updateCalculateButtonVisibility : function(me) {
		var btn = $("#municipality-calculate");
		if (me.selectedMunicipalityIds.length > 0) {
			btn.show();
		}
		else {
			btn.hide();
		}
	},
	
	_getVisibleBiomassAttributeIds : function(sandbox) {
		// TODO this is copy-paste from polygon biomass calculation tool
		var layers = sandbox.findAllSelectedMapLayers();
		var biomassAttributeIds = [];
		for (var i = 0; i < layers.length; i++) {
			var layer = layers[i];
			if ("bma" in layer.getOptions()) {
				biomassAttributeIds.push(layer.getOptions()["bma"].id);
			}
		}
		return biomassAttributeIds;
	},
	
	_addWmsLayer: function(sandbox){
		var mapModule = sandbox.findRegisteredModuleInstance('MainMapModule');
		var wmsLayer = Oskari.clazz.create("Oskari.mapframework.domain.WmsLayer");
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
	     	if(layer.layerId === "bma:view_municipality_borders") {
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
			url: "/biomass/municipality/calculate",
			type: "POST",
			contentType: "application/json; charset=UTF-8",
			data: JSON.stringify({
				areaIds: me.selectedMunicipalityIds,
				attributeIds: me._getVisibleBiomassAttributeIds(sandbox)
			}),
			dataType: "json",
			success: function(results, status, xhr) {
				// TODO - should find better way to show calculation results and selected layers' names
				totalResult = "";
				
				for(var listName in results){
					totalResult += "<span>"+ "Valitut kunnat:" + "</span>" + "<br>";
					for(var cityName in results[listName]){
						totalResult += "<br>" + "<span style=' font-size:10pt;text-decoration:underline; '>"
							+ results[listName][cityName].name + ":" + "</span>";
						for (var attributeName in results[listName][cityName]) {	
							// TODO this should be easier after we switch to JSON-stat
							if (attributeName == "id" || attributeName == "name"){
								continue;
							} 
							totalResult += "<br>" + "<span style=' font-size:9pt; '>"
							+ attributeName + " : " + results[listName][cityName][attributeName] + "</span>";
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
        me._clearMunicipalityIdList(me);        
        me._removeWmsLayer(sandbox);
        me._close();
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
		
		jQuery.ajax({
			url: "/biomass/municipality/geometry",
			type: "POST",
			contentType: "application/json; charset=UTF-8",
			data: JSON.stringify( { points: points, attributes: null } ),
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
	
	_showResult: function(result){
		jQuery("#municipality-message").hide();
		jQuery("#municipality-data").html(totalResult);
	},
	
	_clearMunicipalityIdList: function(me) {
		me.selectedMunicipalityIds = [];
	}
	
}, {
	'protocol' : ['Oskari.userinterface.Flyout']
});
