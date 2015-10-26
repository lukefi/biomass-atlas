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
				sandbox.request(me, sandbox.getRequestBuilder(
						'ShowMapMeasurementRequest')(msg || "", false, null, null));
				var mapModule = sandbox.findRegisteredModuleInstance('MainMapModule');
				var wmsLayer = Oskari.clazz.create("Oskari.mapframework.domain.WmsLayer");
				wmsLayer.setWmsUrls([this.wmsUrl]);
				wmsLayer.setWmsName(this.wmsName);				
				mapModule._layerPlugins.wmslayer.addMapLayerToMap(wmsLayer, true, false);
				
				//me._measureControl.activate();
			}
			else {
				//me._measureControl.deactivate();
			}
		},
		
		'MapClickedEvent': function(event){
			var me = this;
			var sandbox = this.getSandbox();
			var lonlat = event.getLonLat(), xPoint = event.getMouseX(), yPoint = event.getMouseY();			
			var points = [];
			points.push( new OpenLayers.Geometry.Point(lonlat.lon, lonlat.lat));
			jQuery.ajax({
				url: "/biomass/municipality/geometry",
				type: "POST",
				contentType: "application/json; charset=UTF-8",
				data: JSON.stringify({ points: points, attributes: null}),
				dataType: "json",
				success: function(results, status, xhr) {					
					var request = sandbox.getRequestBuilder("MapModulePlugin.AddFeaturesToMapRequest");				
					var style = OpenLayers.Util.applyDefaults(
					        {fillColor: '#9966FF', fillOpacity: 0.8, strokeColor: '#000000'},
					        OpenLayers.Feature.Vector.style["default"]);
					sandbox.request( me, request( results.geometry, "GeoJSON", null, null, 'replace', true, style, false));
				}
			});
		}		
	},
	
	protocol : [ 'Oskari.bundle.BundleInstance' ]
},
{
    "extend": ["Oskari.userinterface.extension.DefaultExtension"]
});