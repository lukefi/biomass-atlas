/**
 * @class Oskari.bma.bundle.circle.CircleInstance
 *
 * This bundle provides a tool for biomass calculations on a circle drawn by defining radius over a point. 
 */
Oskari.clazz.define("Oskari.bma.bundle.circle.CircleInstance",

/**
 * @method create called automatically on construction
 * @static
 */

function() {
	this.sandbox = null;	
	this.plugins = {};
	this.mediator = null;
}, {
	/**
	 * @static
	 * @property __name
	 */
	__name : 'Circle',

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
     * @method getLocalization
     */
    getLocalization: function() {
        return Oskari.getLocalization(this.getName());
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
		if (me.started) {
            return;
        }
        me.started = true;
        
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
		
		//When page is refreshed, this removes marker from the map, if exists.
		this.plugins['Oskari.userinterface.Flyout'].removeMarker();
		
		sandbox.registerAsStateful(this.mediator.bundleId, this);
	},

	_toolButtonClicked : function() {
		// here you can insert code that needs to be run exactly once after toolbar button has been clicked
		
		//Bundles' flyout, other than the current, are closed by calling respective cancel button click event.
		var	sandbox = this.getSandbox(),
			freeSelection = sandbox._modulesByName.TestBundle,
			boundarySelection = sandbox._modulesByName.Boundary;
		freeSelection.plugins['Oskari.userinterface.Flyout']._cancelButtonClick();
		boundarySelection.plugins['Oskari.userinterface.Flyout']._cancelButtonClick();
		
		this.plugins['Oskari.userinterface.Flyout'].createUI();
		sandbox.requestByName(this, 'userinterface.UpdateExtensionRequest', [this, 'detach']);
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
			'bmaCircleCalculator' : {
				iconCls : 'tool-circle',
				tooltip : me.getLocalization()["toolbarTooltip"],
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
		request = reqBuilder("bmaCircleCalculator", "basictools", me.buttons['bmaCircleCalculator']);
		sandbox.request(me.getName(), request);	
		me._buttonsAdded = true;
		
		var extensionRequest = sandbox.getRequestBuilder('userinterface.AddExtensionRequest')(this);
		sandbox.request(this, extensionRequest);
		
		this.plugins['Oskari.userinterface.Flyout'].syncToolbarButtonVisibility();
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
		var request = sandbox.getRequestBuilder('userinterface.RemoveExtensionRequest')(me);
		sandbox.request(me, request);
		me.sandbox.unregister(me);
		me.started = false;
	},

    /**
     * @method setState
     * @param {Object} state bundle state as JSON
     */
    setState : function(state) {
    	this.plugins['Oskari.userinterface.Flyout'].setContentState(state);
    },
    
    /**
     * @method getState
     * @return {Object} bundle state as JSON
     */
    getState : function() {
        return this.plugins['Oskari.userinterface.Flyout'].getContentState();
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
		this.plugins['Oskari.userinterface.Flyout'] = Oskari.clazz.create('Oskari.bma.bundle.circle.CircleBundle.Flyout', this, null, this.conf);
	},
	stopExtension : function() {
		this.plugins['Oskari.userinterface.Flyout'] = null;
	},
	getPlugins : function() {
		return this.plugins;
	},	
	/**
	 * @static
	 * @property eventHandlers
	 * Best practices: defining which events bundle is listening and how bundle reacts to them
	 */
	eventHandlers : {		
		'MapClickedEvent': function(event){
			this.plugins['Oskari.userinterface.Flyout'].mapClickedEvent(event);		
		},
		
		'AfterMapLayerAddEvent' : function(event) {
			this.plugins['Oskari.userinterface.Flyout'].syncToolbarButtonVisibility();
		},
		
		'AfterMapLayerRemoveEvent': function(event) {
			this.plugins['Oskari.userinterface.Flyout'].syncToolbarButtonVisibility();
		}		
	},
	
	protocol : [ 'Oskari.bundle.BundleInstance', 'Oskari.mapframework.module.Module', 'Oskari.userinterface.Extension' ]
});
