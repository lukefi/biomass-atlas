/**
 * @class Oskari.sample.bundle.mythirdbundle.FlyoutHelloWorldBundleInstance
 *
 * Add this to startupsequence to get this bundle started
 */
Oskari.clazz.define("Oskari.bma.bundle.biomassmenubar.BiomassMenubarInstance",

    /**
     * @method create called automatically on construction
     * @static
     */

    function () {

        this.sandbox = null;
        this.plugins = {};
        this._localization = null;

        /**
         * @property mediator
         * Loader sets this
         */
        this.mediator = null;

    }, {
        /**
         * @static
         * @property __name
         */
        __name: 'BiomassMenubar',

        /**
         * @method getName
         * Module protocol method
         */
        getName: function () {
            return this.__name;
        },
        /**
         * @method getTitle
         * Extension protocol method
         * @return {String} localized text for the title of the component
         */
        getTitle: function () {
            return this.getLocalization('title');
        },
        /**
         * @method getDescription
         * Extension protocol method
         * @return {String} localized text for the description of the component
         */
        getDescription: function () {
            return this.getLocalization('desc');
        },

        /**
         * @method getSandbox
         * Convenience method to call from Tile
         * @return {Oskari.mapframework.sandbox.Sandbox}
         */
        getSandbox: function () {
            return this.sandbox;
        },

        /**
         * @method update
         * BundleInstance protocol method
         */
        update: function () {},
        
        /**
         * @method getLocalization
         * @param {String} key (optional) if given, returns the value for key
         * @return {String/Object} returns single localization string or
         *      JSON object for complete data depending on localization
         *      structure and if parameter key is given
         */
        getLocalization: function (key) {
            if (!this._localization) {
                this._localization = Oskari.getLocalization(this.getName());
            }
            if (key) {
                return this._localization[key];
            }
            return this._localization;
        },

        /**
         * @method getPlugins
         * Extension protocol method
         */
        getPlugins: function () {
            return this.plugins;
        },

        /**
         * @method start
         * BundleInstance protocol method
         */
        start: function () {
            var me = this,
            	conf = me.conf,
                sandboxName = (conf ? conf.sandbox : null) || 'sandbox',
                sandbox = Oskari.getSandbox(sandboxName);
            this.sandbox = sandbox;
            
            this.localization = Oskari.getLocalization(this.getName());

            // register to sandbox as a module
            sandbox.register(me);
            // register to listening events
            for (var p in me.eventHandlers) {
                if (p) {
                    sandbox.registerForEventByName(me, p);
                }
            }
            //Let's extend UI with Flyout and Tile
            var request = sandbox.getRequestBuilder('userinterface.AddExtensionRequest')(this);
            sandbox.request(this, request);

            // draw ui
            me._createUI();
        },

        /**
         * @method init
         * Module protocol method
         */
        init: function () {
            // headless module so nothing to return
            return null;
        },

        /**
         * @method onEvent
         * Module protocol method/Event dispatch
         */
        onEvent: function (event) {
            var me = this,
                handler = me.eventHandlers[event.getName()];
            if (!handler) {
                return;
            }
            return handler.apply(this, [event]);
        },

        /**
         * @static
         * @property eventHandlers
         * Best practices: defining which
         * events bundle is listening and how bundle reacts to them
         */
        eventHandlers: {
        	 /**
             * @method userinterface.ExtensionUpdatedEvent
             */
            'userinterface.ExtensionUpdatedEvent': function (event) {
                var me = this;

                if (event.getExtension().getName() !== me.getName()) {
                    // not me -> do nothing
                    return;
                }
                
                if (!jQuery('#bmaLayerContent').is(':visible') && 
                		jQuery('#biomass_layer_selector').closest('.oskari-tile').hasClass('oskari-tile-closed')) {
                	event.setViewState('attach');
                	jQuery('#biomass_layer_selector').closest('.oskari-tile').removeClass('oskari-tile-closed');
                	jQuery('#biomass_layer_selector').closest('.oskari-tile').addClass('oskari-tile-attached');
                }
               
                var isOpen = event.getViewState() !== 'close';
                me._hideShowBmaLayerContent(isOpen);
            }
        },
        
        /**
         * @method _hideShowBmaLayerContent
         * @private
         *
         * Custom method: hides or shows bma layers 
         */
        _hideShowBmaLayerContent: function (isOpen) {
        	 if (isOpen)
             	jQuery('#bmaLayerContent').show();
             else
             	jQuery('#bmaLayerContent').hide();
        },
        
        /**
         * @method stop
         * BundleInstance protocol method
         */
        stop: function () {
            var me = this,
                sandbox = me.sandbox();
            // unregister from listening events
            for (var p in me.eventHandlers) {
                if (p) {
                    sandbox.unregisterFromEventByName(me, p);
                }
            }
            var request =
                sandbox.getRequestBuilder('userinterface.RemoveExtensionRequest')(me);
            sandbox.request(me, request);
            
            // unregister module from sandbox
            me.sandbox.unregister(me);
        },

        /**
         * @method startExtension
         * implements Oskari.userinterface.Extension protocol
         * startExtension method
         * Creates a tile:
         */
        startExtension: function () {
            this.plugins['Oskari.userinterface.Tile'] = Oskari.clazz.create('Oskari.bma.bundle.biomassmenubar.Tile', this);
        },

        /**
         * @method stopExtension
         * implements Oskari.userinterface.Extension protocol
         * stopExtension method
         * Clears references to tile
         */
        stopExtension: function () {
            this.plugins['Oskari.userinterface.Tile'] = null;
        },

        /**
         * @method _createUI
         * @private
         *
         * Custom method: Creates Tile 'biomasses'.
         */
        _createUI: function () {
            var me = this;
            this.plugins['Oskari.userinterface.Tile'].refresh();
        }

    }, {
        protocol: ['Oskari.bundle.BundleInstance',
            'Oskari.mapframework.module.Module',
            'Oskari.userinterface.Extension'            
        ]
    });
