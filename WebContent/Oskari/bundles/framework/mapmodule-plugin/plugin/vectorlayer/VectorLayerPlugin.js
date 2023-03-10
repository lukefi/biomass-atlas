/**
 * @class Oskari.mapframework.mapmodule.VectorLayerPlugin
 * Provides functionality to draw vector layers on the map
 */
Oskari.clazz.define(
    'Oskari.mapframework.mapmodule.VectorLayerPlugin',
    function () {
        var me = this;

        me._clazz =
            'Oskari.mapframework.mapmodule.VectorLayerPlugin';
        me._name = 'VectorLayerPlugin';
        this._olLayerPrefix = "vectorlayer_";
        this._supportedFormats = {};
        this._sldFormat = new OpenLayers.Format.SLD({
            multipleSymbolizers: false,
            namedLayersAsArray: true
        });
    }, {
        /**
         * @method register
         * Interface method for the plugin protocol
         */
        register: function () {
            this.getMapModule().setLayerPlugin('vectorlayer', this);
        },
        /**
         * @method unregister
         * Interface method for the plugin protocol
         */
        unregister: function () {
            this.getMapModule().setLayerPlugin('vectorlayer', null);
        },
        /**
         * @method _startPluginImpl
         * @private
         * Start plugin implementation
         *
         */
        _startPluginImpl: function () {
            this.registerVectorFormats();
        },
        /**
        * @method _createEventHandlers
        * Create event handlers
        * @private
        *
        */
        _createEventHandlers: function () {
            var me = this;

            return {
                AfterMapLayerRemoveEvent: function (event) {
                    me.afterMapLayerRemoveEvent(event);
                },
                FeaturesAvailableEvent: function (event) {
                    me.handleFeaturesAvailableEvent(event);
                },
                AfterChangeMapLayerOpacityEvent: function (event) {
                    me._afterChangeMapLayerOpacityEvent(event);
                }
            };
        },
        /**
         * @method preselectLayers
         * @public preselect layers
         */
        preselectLayers: function (layers) {
            var sandbox = this.getSandbox(),
                i,
                ilen,
                layer,
                layerId;

            for (i = 0, ilen = layers.length; i < ilen; i += 1) {
                layer = layers[i];
                layerId = layer.getId();

                if (!layer.isLayerOfType('VECTOR')) {
                    continue;
                }

                sandbox.printDebug('preselecting ' + layerId);
                this.addMapLayerToMap(layer, true, layer.isBaseLayer());
            }
        },
        /**
         * @method registerVectorFormat
         * Adds vector format to props of known formats
         *
         * @param  {String} mimeType mime type
         * @param  {Function} formatImpl format implementation
         */
        registerVectorFormat: function (mimeType, formatImpl) {
            this._supportedFormats[mimeType] = formatImpl;
        },

        /**
         * @method registerVectorFormats
         * Registers default vector formats
         */
        registerVectorFormats: function () {
            var me = this;
            this.registerVectorFormat('application/json',
                new OpenLayers.Format.GeoJSON({}));
            this.registerVectorFormat('application/nlsfi-x-openlayers-feature',
                function () {
                    this.read = function (data) {
                        return data;
                    };
                }
            );
            me.registerVectorFormat('GeoJSON', new OpenLayers.Format.GeoJSON());
            me.registerVectorFormat('WKT', new OpenLayers.Format.WKT({}));
        },
        /**
         * @method removeFeaturesFromMap
         * @public
         * Removes all/selected features from map.
         *
         * @param {String} identifier the feature attribute identifier
         * @param {String} value the feature identifier value
         * @param {Oskari.mapframework.domain.VectorLayer} layer layer details
         */
        removeFeaturesFromMap: function(identifier, value, layer){
            var me = this,
                foundedFeatures,
                olLayer,
                layerId = 'VECTOR';

            if(layer && layer !== null){
                layerId = layer.getId();
            }

            olLayer = me._map.getLayersByName(me._olLayerPrefix + layerId)[0];

            if (!olLayer) {
                return;
            }

            // Removes only wanted features from map
            if (identifier && identifier !== null && value && value !== null){
                foundedFeatures = olLayer.getFeaturesByAttribute(identifier, value);
                olLayer.removeFeatures(foundedFeatures);
                olLayer.refresh();
            }
            // Removes all features from map
            else {
                olLayer.removeAllFeatures();
                olLayer.refresh();
                /* This should free all memory */
                olLayer.destroy();
            }
        },
        /**
         * @method addFeaturesOnMap
         * @public
         * Add feature on the map
         *
         * @param {Object} geometry the geometry WKT string or GeoJSON object
         * @param {String} geometryType the geometry type. Supported formats are: WKT and GeoJSON.
         * @param {Object} attributes the geometry attributes
         * @param {Oskari.mapframework.domain.VectorLayer} layer
         * @param {String} operation layer operations. Supported: replace.
         * @param {Boolean} keepLayerOnTop. If true add layer on the top. Default true.
         * @param {OpenLayers.Style} style the features style
         * @param {Boolean} centerTo center map to features. Default true.
         */
        addFeaturesToMap: function(geometry, geometryType, attributes, layer, operation, keepLayerOnTop, style, centerTo){
            var me = this,
                format = me._supportedFormats[geometryType],
                olLayer,
                isOlLayerAdded = true,
                layerId = 'VECTOR';

            if (layer && !layer.isLayerOfType('VECTOR')) {
                return;
            }

            if(layer && layer !== null){
                layerId = layer.getId();
            }

            if (!format) {
                return;
            }

            if (!keepLayerOnTop) {
                var keepLayerOnTop = true;
            }

            if (geometry) {

                var feature = format.read(geometry);

                if (attributes && attributes !== null) {
                    feature.attributes = attributes;
                }

                olLayer = me._map.getLayersByName(me._olLayerPrefix + layerId)[0];

                if (!olLayer) {
                    var opacity = 100;
                    if(layer){
                        opacity = layer.getOpacity() / 100;
                    }
                    olLayer = new OpenLayers.Layer.Vector(me._olLayerPrefix + layerId);

                    olLayer.setOpacity(opacity);
                    isOlLayerAdded = false;
                }

                if (operation && operation !== null && operation === 'replace') {
                    olLayer.removeAllFeatures();
                    olLayer.refresh();
                }
               
                if (style && style !== null) {
                	if (feature.length === undefined) {
                		featureInstance = feature;
                        featureInstance.style = style;
                	} else {
                		for (i=0; i < feature.length; i++) {
                            featureInstance = feature[i];
                            featureInstance.style = style;
                        }
                	}
                }

                olLayer.addFeatures(feature);
               
                if(isOlLayerAdded === false) me._map.addLayer(olLayer);

                if (keepLayerOnTop) {
                    me._map.setLayerIndex(
                        olLayer,
                        me._map.layers.length
                    );
                } else {
                    me._map.setLayerIndex(openLayer, 0);
                }


                if (layer && layer !== null) {
                    var mapLayerService = me._sandbox.getService('Oskari.mapframework.service.MapLayerService');
                    mapLayerService.addLayer(layer, false);

                    window.setTimeout(function(){
                        var request = me._sandbox.getRequestBuilder('AddMapLayerRequest')(layerId, true);
                            me._sandbox.request(me.getName(), request);
                        },
                    50);
                }

                if(centerTo === true){
                    var center = feature.geometry.getCentroid(),
                        mapmoveRequest = me._sandbox.getRequestBuilder('MapMoveRequest')(center.x, center.y, feature.geometry.getBounds(), false);
                    me._sandbox.request(me, mapmoveRequest);
                }
            }
        },
        /**
         * @method _createRequestHandlers
         * @private
         * Create request handlers.
         */
        _createRequestHandlers: function () {
            var me = this,
                sandbox = me.getSandbox();
            return {
                'MapModulePlugin.AddFeaturesToMapRequest': Oskari.clazz.create(
                    'Oskari.mapframework.bundle.mapmodule.request.AddFeaturesToMapRequestHandler',
                    sandbox,
                    me
                ),
                'MapModulePlugin.RemoveFeaturesFromMapRequest': Oskari.clazz.create(
                    'Oskari.mapframework.bundle.mapmodule.request.RemoveFeaturesFromMapRequestHandler',
                    sandbox,
                    me
                )
            };
        },

        /**
         * @method AddMapLayerToMap
         * Primitive for adding layer to this map
         *
         * @param {Oskari.mapframework.domain.VectorLayer} layer
         * @param {Boolean} keepLayerOnTop keep layer on top
         * @param {Boolean} isBaseMap is basemap
         */
        addMapLayerToMap: function (layer, keepLayerOnTop, isBaseMap) {
            if (!layer.isLayerOfType('VECTOR')) {
                return;
            }

            var styleMap = new OpenLayers.StyleMap(),
                layerOpts = {
                    styleMap: styleMap
                },
                sldSpec = layer.getStyledLayerDescriptor(),
                me = this;

            if (sldSpec) {
                this.getSandbox().printDebug(sldSpec);
                var styleInfo = this._sldFormat.read(sldSpec),
                    styles = styleInfo.namedLayers[0].userStyles,
                    style = styles[0];

                styleMap.styles['default'] = style;
            }

            var openLayer = new OpenLayers.Layer.Vector(
                me._olLayerPrefix + layer.getId(),
                layerOpts
            );

            openLayer.opacity = layer.getOpacity() / 100;

            this.getMap().addLayer(openLayer);

            this.getSandbox().printDebug(
                '#!#! CREATED VECTOR / OPENLAYER.LAYER.VECTOR for ' +
                layer.getId()
            );

            if (keepLayerOnTop) {
                this.getMap().setLayerIndex(
                    openLayer,
                    this.getMap().layers.length
                );
            } else {
                this.getMap().setLayerIndex(openLayer, 0);
            }
        },
        /**
         * @method afterMapLayerRemoveEvent
         * Handle AfterMapLayerRemoveEvent
         *
         * @param {Object} event
         */
        afterMapLayerRemoveEvent: function (event) {
            var layer = event.getMapLayer();

            this.removeMapLayerFromMap(layer);
        },

        /**
         * @method _afterChangeMapLayerOpacityEvent
         * Handle AfterChangeMapLayerOpacityEvent
         * @private
         * @param {Oskari.mapframework.event.common.AfterChangeMapLayerOpacityEvent} event
         */
        _afterChangeMapLayerOpacityEvent: function (event) {
            var me = this,
                layer = event.getMapLayer();

            if (!layer.isLayerOfType('VECTOR')) {
                return;
            }

            this.getSandbox().printDebug(
                'Setting Layer Opacity for ' + layer.getId() + ' to ' +
                layer.getOpacity()
            );
            var mapLayer = this.getMap().getLayersByName(
                me._olLayerPrefix + layer.getId()
            );
            if (mapLayer[0] !== null && mapLayer[0] !== undefined) {
                mapLayer[0].setOpacity(layer.getOpacity() / 100);
            }
        },
        /**
         * @method removeMapLayerFromMap
         * Remove map layer from map.
         *
         * @param {Oskari.mapframework.domain.VectorLayer} layer the layer
         */
        removeMapLayerFromMap: function (layer) {
            if (!layer.isLayerOfType('VECTOR')) {
                return;
            }

            var me = this,
                remLayer = this.getMap().getLayersByName(me._olLayerPrefix + layer.getId());

            /* This should free all memory */
            if(remLayer[0]) remLayer[0].destroy();
        },
        /**
         * @method getOLMapLayers
         * Get OpenLayers map layers.
         *
         * @param {Oskari.mapframework.domain.VectorLayer} layer the layer
         */
        getOLMapLayers: function (layer) {
            if (!layer.isLayerOfType('VECTOR')) {
                return;
            }
            var me = this;
            return this.getMap().getLayersByName(me._olLayerPrefix + layer.getId());
        },
        /**
         * @method handleFeaturesAvailableEvent
         * Handle features available event.
         *
         * @param {object} event
         */
        handleFeaturesAvailableEvent: function (event) {
            var me = this,
                layer = event.getMapLayer(),
                mimeType = event.getMimeType(),
                features = event.getFeatures(),
                op = event.getOp(),
                mapLayer = this.getMap().getLayersByName(
                    me._olLayerPrefix
                )[0];

            if (!mapLayer) {
                return;
            }

            if (op && op === 'replace') {
                mapLayer.removeFeatures(mapLayer.features);
            }

            var format = this._supportedFormats[mimeType];

            if (!format) {
                return;
            }

            var fc = format.read(features);

            mapLayer.addFeatures(fc);
        }
    }, {
        'extend': ['Oskari.mapping.mapmodule.plugin.AbstractMapModulePlugin'],
        /**
         * @static @property {string[]} protocol array of superclasses
         */
        'protocol': [
            'Oskari.mapframework.module.Module',
            'Oskari.mapframework.ui.module.common.mapmodule.Plugin'
        ]
    }
);

