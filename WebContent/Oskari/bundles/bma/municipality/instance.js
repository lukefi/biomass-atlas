/**
 * @class Oskari.bma.bundle.municipality.MunicipalityInstance
 *
 * This bundle provides a tool for biomass calculations on selected municipality(s)
 */
Oskari.clazz.define("Oskari.bma.bundle.municipality.MunicipalityInstance",

/**
 * @method create called automatically on construction
 * @static
 */

function() {
	this.sandbox = null;
	this.wmsUrl = "http://testi.biomassa-atlas.luke.fi/geoserver/wms";
	this.wmsName = "bma:view_municipality_borders";
	this.wmsId = "municipalityBorderId";
	this.plugins = {};
}, {
	/**
	 * @static
	 * @property __name
	 */
	__name : 'Municipality',

	/**
	 * @method getName
	 * @return {String} the name for the component
	 */
	getName : function() {
		return this.__name;
	},
	/**
	 * @method getSandbox
	 */
	getSandbox : function() {
		return this.sandbox;
	},
	/**
	 * @method init
	 * implements Module protocol init method - initializes request handlers and templates
	 */
	init : function() {
		return null;
	},
	/**
	 * @method start
	 * BundleInstance protocol method
	 */
	start : function() {
		var me = this;		
		var conf = me.conf;
		me.selectedMunicipalityIds = [];
		me.features = [];
		me.isMapClicked = false; // For handling map click related to municipality based biomass calculation
		var sandboxName = (conf ? conf.sandbox : null) || 'sandbox';
		var sandbox = Oskari.getSandbox(sandboxName);
		this.sandbox = sandbox;
		// register to sandbox as a module
		sandbox.register(me);
		me._registerTools();
					        
		// register to listening events
		for ( var p in me.eventHandlers) {
			if (p) {
				sandbox.registerForEventByName(me, p);
			}
		}
				
	},

	_toolButtonClicked : function() {
		// here you can insert code that needs to be run exactly once after toolbar button has been clicked
		/** update flyout content */
		this.plugins['Oskari.userinterface.Flyout'].createUI();
		this.getSandbox().requestByName(this, 'userinterface.UpdateExtensionRequest', [this, 'detach']);
	},
	
	/**
	 * Requests the tools to be added to the toolbar.
	 * 
	 * @method registerTool
	 */
	_registerTools : function() {
		var me = this, request, sandbox = this.getSandbox();
		// Is button available or already added the button?
		if (me._buttonsAdded) {
			return;
		}
				
		me.buttons = {
			'bmaMunicipalityCalculator' : {
				iconCls : 'tool-municipality',
				tooltip : "Laske biomassa kunnassa",
				sticky : true,
				callback : function() {
					me._toolButtonClicked();
				}
			}
		};

		var reqBuilder = sandbox.getRequestBuilder('Toolbar.AddToolButtonRequest');
		if (!reqBuilder) {
			// Couldn't get the request, toolbar not loaded
			return;
		}
		request = reqBuilder("bmaMunicipalityCalculator", "basictools",	me.buttons['bmaMunicipalityCalculator']);
		sandbox.request(me.getName(), request);	
		me._buttonsAdded = true;
		
		var extensionRequest = sandbox.getRequestBuilder('userinterface.AddExtensionRequest')(this);
		console.log(extensionRequest);
		sandbox.request(this, extensionRequest);
		
	},

	/**
	 * @method stop BundleInstance protocol method
	 */
	stop : function() {
		var me = this;
		var sandbox = this.sandbox;

		for ( var p in me.eventHandlers) {
			if (p) {
				sandbox.unregisterFromEventByName(me, p);
			}
		}
		me.sandbox.unregister(me);
		me.started = false;
	},
	
	/**
	 * @method update
	 * BundleInstance protocol method
	 */
	update : function() {
	},

	/**
	 * @method onEvent
	 * Module protocol method/Event dispatch
	 */
	onEvent : function(event) {
		var me = this, handler = me.eventHandlers[event.getName()];
		if (!handler) {
			return;
		}
		return handler.apply(this, [ event ]);
	},
	startExtension : function() {
		this.plugins['Oskari.userinterface.Flyout'] = Oskari.clazz.create('Oskari.bma.bundle.municipality.MunicipalityBundle.Flyout', this, null, this.conf);
	},
	stopExtension : function() {
		this.plugins['Oskari.userinterface.Flyout'] = null;
	},
	getPlugins : function() {
		return this.plugins;
	},
	 /**
     * @method _createUI
     * @private
     *
     * Custom method, do what ever you like
     * Best practices: start internal/private methods with an underscore
     */
    _createUI : function() {
        var me = this;
        for (var pluginType in me.plugins) {
            if (pluginType) {
                me.plugins[pluginType].createUI();
            }
        }
    },
	
	/**
	 * @static
	 * @property eventHandlers
	 * Best practices: defining which
	 * events bundle is listening and how bundle reacts to them
	 */
	eventHandlers : {
		'Toolbar.ToolSelectedEvent' : function(event) {
			var me = this;
			var sandbox = this.getSandbox();

			/* we'll show prompt if measure tool has been selected */
			if (event.getToolId() == 'bmaMunicipalityCalculator') {
				var msg = "Valitse kunta, jonka biomassa lasketaan";
				msg += "<br/> <button type='button' id='bmaMunicipalityCalculateButton'>Laske</button>";
				sandbox.request(me, sandbox.getRequestBuilder(
						'ShowMapMeasurementRequest')(msg || "", false, null, null));
				me._updateCalculateButtonVisibility(me);
				var mapModule = sandbox.findRegisteredModuleInstance('MainMapModule');
				var wmsLayer = Oskari.clazz.create("Oskari.mapframework.domain.WmsLayer");
				wmsLayer.setWmsUrls([this.wmsUrl]);
				wmsLayer.setWmsName(this.wmsName);			
				wmsLayer.setType("wmslayer");		
				wmsLayer.setId(this.wmsId);		
				mapModule._layerPlugins.wmslayer.addMapLayerToMap(wmsLayer, true, false);
				
				$("#bmaMunicipalityCalculateButton").click(function() {
					console.log("inside click");
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
								totalResult += "<br>" + "<span>"+ "Valitut kunnat:" + "</span>" + "<br>";
								for(var cityName in results[listName]){						
									totalResult += "<br>" + "<span style=' font-size:9pt;text-decoration:underline; '>"+ results[listName][cityName].name + ":" + "</span>";
									for (var attributeName in results[listName][cityName]) {
										// TODO this should be easier after we switch to JSON-stat
										if (attributeName == "id" || attributeName == "name") continue;
										totalResult += "<br>" + "<span style=' font-size:9pt; '>" 
											+ attributeName + " : " + results[listName][cityName][attributeName] + "</span>";
									}
								}					
							}
							
							sandbox.request(me, sandbox.getRequestBuilder(
							'ShowMapMeasurementRequest')(totalResult, false, null, null));
							console.log("test",results);
							
						}
					});
				});
				
				var toolbar = sandbox.findRegisteredModuleInstance('Toolbar'),
					showResult = toolbar.requestHandlers.showMapMeasurementRequestHandler,
					cancelButton = showResult._buttons[0];				
				cancelButton.setHandler(function (event){
					/* Close the dialog box.*/
					showResult._dialogShown = false;
					var toolbarRequest = sandbox.getRequestBuilder('Toolbar.SelectToolButtonRequest')();
                    sandbox.request(me, toolbarRequest);
                    showResult._dialog.close(true);
                    
                    me.isMapClicked = false;  
                    me._clearMunicipalityIdList(me);
                    
                    /*Removes municipality and features */
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
				});
				//me._measureControl.activate();
			}
			else {
				//me._measureControl.deactivate();
			}
					
			me.isMapClicked = true;
		},
		
		'MapClickedEvent': function(event){
			var me = this,
				sandbox = this.getSandbox();
				
			if (me.isMapClicked) {
				var lonlat = event.getLonLat(),		
					points = [],
					requestForRemoveFeature,
					requestForAddFeature;
				
				points.push( new OpenLayers.Geometry.Point(lonlat.lon, lonlat.lat));

				/* Fix for Older IE browser; FOR indexOf function*/
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
							sandbox.request( me, requestForRemoveFeature("id", results.id, null));
							me.selectedMunicipalityIds.splice(indexId, 1);
							me._updateCalculateButtonVisibility( me );
						} else {
							requestForAddFeature = sandbox.getRequestBuilder(
									"MapModulePlugin.AddFeaturesToMapRequest" );				
							var style = OpenLayers.Util.applyDefaults(
							        {fillColor: '#9900FF', fillOpacity: 0.8, strokeColor: '#000000'},
							        OpenLayers.Feature.Vector.style["default"]);
							
							sandbox.request( me, requestForAddFeature( results.geometry, 'WKT', 
									{id: results.id}, null, null, true, style, false) );
						
							me.selectedMunicipalityIds.push( results.id );
							me._updateCalculateButtonVisibility( me );
						}
					}
				});
			}
		}
	},
	
	_updateCalculateButtonVisibility : function(me) {
		var btn = $("#bmaMunicipalityCalculateButton");
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
	
	_clearMunicipalityIdList: function(me) {
		me.selectedMunicipalityIds = [];
	},
	
	protocol : [ 'Oskari.bundle.BundleInstance', 'Oskari.mapframework.module.Module', 'Oskari.userinterface.Extension' ]
});
