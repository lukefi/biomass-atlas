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
				iconCls : 'tool-measure-area',
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
				mapModule._layerPlugins.wmslayer.addMapLayerToMap(wmsLayer, true, false);
				
				$("#bmaMunicipalityCalculateButton").click(function() {
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
							// TODO
						}
					});
				});
				//me._measureControl.activate();
			}
			else {
				//me._measureControl.deactivate();
			}
		},
		
		'MapClickedEvent': function(event){
			var me = this,
				sandbox = this.getSandbox(),
				lonlat = event.getLonLat(),		
				points = [],
				requestForRemoveFeature,
				requestForAddFeature,
				style;
				
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
					if( me.selectedMunicipalityIds.indexOf( results.id ) > -1 ){
						requestForRemoveFeature = sandbox.getRequestBuilder(
								"MapModulePlugin.RemoveFeaturesFromMapRequest");
						sandbox.request( me, requestForRemoveFeature("id", results.id, null));
						me.selectedMunicipalityIds.splice(( results.id ).toString, 1);
						me._updateCalculateButtonVisibility( me );
					} else {
						requestForAddFeature = sandbox.getRequestBuilder(
								"MapModulePlugin.AddFeaturesToMapRequest" );				
						style = OpenLayers.Util.applyDefaults(
						        {fillColor: '#9966FF', fillOpacity: 0.8, strokeColor: '#000000'},
						        OpenLayers.Feature.Vector.style[ "default" ]);
						
						/*var wkt_options = {},
							geojson_format = new OpenLayers.Format.GeoJSON(),
							testFeature = geojson_format.read(results.geometry),
							wkt = new OpenLayers.Format.WKT(wkt_options),
							out = wkt.write(testFeature);							
						sandbox.request( me, requestForAddFeature( out, "WKT", 
								{id: results.id}, null, null, true, style, false) );*/
						
						sandbox.request( me, requestForAddFeature( results.geometry, "GeoJSON", 
								{id: results.id}, null, null, true, style, false) );
						
						me.selectedMunicipalityIds.push( results.id );
						me._updateCalculateButtonVisibility( me );
					}
				}
			});
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
	
	protocol : [ 'Oskari.bundle.BundleInstance' ]
});