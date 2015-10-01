/**
 * @class Oskari.bma.bundle.testbundle.TestbundleInstance
 *
 * This bundle provides a tool for biomass calculations on a user provided polygon
 */
Oskari.clazz.define("Oskari.bma.bundle.testbundle.TestbundleInstance",

/**
 * @method create called automatically on construction
 * @static
 */

function() {
	this.sandbox = null;
}, {
	/**
	 * @static
	 * @property __name
	 */
	__name : 'TestBundle',

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

		// Should this not come as a param?
		var conf = me.conf;
		var sandboxName = (conf ? conf.sandbox : null) || 'sandbox';
		var sandbox = Oskari.getSandbox(sandboxName);
		this.sandbox = sandbox;
		// register to sandbox as a module
		sandbox.register(me);

		me._registerTools();
		
		me._measureControl = new OpenLayers.Control.Measure(
				OpenLayers.Handler.Polygon,
				{
					handlerOptions: {
						persist: true
					},
						immediate: true
					});

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
		var me = this, request, tool, sandbox = this.getSandbox();
		// Is button available or already added the button?
		if (me._buttonsAdded) {
			return;
		}

		me.buttons = {
			'bmacalculator' : {
				iconCls : 'tool-measure-area',
				tooltip : "Laske biomassa alueella",
				sticky : true,
				callback : function() {
					me._toolButtonClicked();
				}
			}
		};

		var reqBuilder = sandbox
				.getRequestBuilder('Toolbar.AddToolButtonRequest');
		if (!reqBuilder) {
			// Couldn't get the request, toolbar not loaded
			return;
		}
		request = reqBuilder("bmacalculator", "basictools",
				me.buttons['bmacalculator']);
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
			if (event.getToolId() == 'bmacalculator') {
				var msg = "Valitse alue, jonka biomassa lasketaan";
				sandbox.request(me, sandbox.getRequestBuilder(
						'ShowMapMeasurementRequest')(msg || "", false, null,
						null));
				var mapModule = sandbox.findRegisteredModuleInstance('MainMapModule');
				mapModule.addMapControl('measureControls_bma', me._measureControl);
				me._measureControl.events.on({
					measure: function(evt) {
						me._polygonCompleted.apply(me, [evt]);
					}
				});
				me._measureControl.activate();
			}
			else {
				me._measureControl.deactivate();
			}
		}
	},
	
	_polygonCompleted : function(evt) {
		var me = this;
		var sandbox = this.getSandbox();
		var attributeIds = me._getVisibleBiomassAttributeIds(sandbox);
		if (attributeIds.length == 0) {
			return; // no layers selected
		}
		var points = [];
		var components = evt.geometry.components[0].components;
		for (var i = 0; i < components.length; i++) {
			points.push({x: components[i].x, y: components[i].y});
		}
		jQuery.ajax({
			url: "/biomass/area",
			type: "POST",
			contentType: "application/json; charset=UTF-8",
			data: JSON.stringify({ points: points, attributes: attributeIds }),
			dataType: "json",
			success: function(results, status, xhr) {
				sandbox.request(me, sandbox.getRequestBuilder(
				'ShowMapMeasurementRequest')("Tulos: " + results.test, false, null, null));
			}
		});
	},
	
	_getVisibleBiomassAttributeIds : function(sandbox) {
		var layers = sandbox.findAllSelectedMapLayers();
		var biomassAttributeIds = [];
		for (var i = 0; i < layers.length; i++) {
			var layer = layers[i];
			if ("bma" in layer.getOptions()) {
				biomassAttributeIds.push(layer.getOptions()["bma"].id);
			}
		}
		return biomassAttributeIds;
	}
	
}, {
	protocol : [ 'Oskari.bundle.BundleInstance' ]
});
