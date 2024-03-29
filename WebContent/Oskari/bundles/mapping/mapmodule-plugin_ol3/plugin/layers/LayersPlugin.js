/**
 * @class Oskari.mapframework.bundle.mapmodule.plugin.LayersPlugin
 *
 * This is a plugin to bring more functionality for the mapmodules map
 * implementation. It provides handling for rearranging layer order and
 * controlling layer visibility. Provides information to other bundles if a layer
 * becomes visible/invisible (out of scale/out of content geometry) and request handlers
 * to move map to location/scale based on layer content. Also optimizes openlayers maplayers
 * visibility setting if it detects that content is not in the viewport.
 */
Oskari.clazz.define('Oskari.mapframework.bundle.mapmodule.plugin.LayersPlugin',
    /**
     * @method create called automatically on construction
     * @static
     */

    function () {
        var me = this;
        me._clazz =
            'Oskari.mapframework.bundle.mapmodule.plugin.LayersPlugin';
        me._name = 'LayersPlugin';

        this._supportedFormats = {};
        // visibility checks are cpu intensive so only make them when the map has
        // stopped moving
        // after map move stopped -> activate a timer that will
        // do the check after _visibilityPollingInterval milliseconds
        this._visibilityPollingInterval = 1500;
        this._visibilityCheckOrder = 0;
        this._previousTimer = null;
    }, {
    _createEventHandlers: function () {
        var me = this;

        return {
            AfterRearrangeSelectedMapLayerEvent: function (event) {
                me._afterRearrangeSelectedMapLayerEvent(event);
            },
            MapMoveStartEvent: function () {
                // clear out any previous visibility check when user starts to move
                // map
                // not always sent f.ex. when moving with keyboard so do this in
                // AfterMapMoveEvent also
                me._visibilityCheckOrder += 1;
                if (me._previousTimer) {
                    clearTimeout(me._previousTimer);
                    me._previousTimer = null;
                }
            },
            AfterMapMoveEvent: function () {
                me._scheduleVisiblityCheck();
            },
            AfterMapLayerAddEvent: function (event) {
                // parse geom if available
                me._parseGeometryForLayer(event.getMapLayer());
                me._scheduleVisiblityCheck();
            }
        };
    },

    _createRequestHandlers: function () {
        var me = this,
            sandbox = me.getSandbox();

        return {
            'MapModulePlugin.MapLayerVisibilityRequest': Oskari.clazz.create(
                'Oskari.mapframework.bundle.mapmodule.request.MapLayerVisibilityRequestHandler',
                sandbox,
                me
            ),
            'MapModulePlugin.MapMoveByLayerContentRequest': Oskari.clazz.create(
                'Oskari.mapframework.bundle.mapmodule.request.MapMoveByLayerContentRequestHandler',
                sandbox,
                me
            )
        };
    },
    /**
     * @method startPlugin
     *
     * Interface method for the plugin protocol. Registers requesthandlers and
     * eventlisteners.
     *
     * @param {Oskari.mapframework.sandbox.Sandbox} sandbox
     *          reference to application sandbox

    startPlugin : function(sandbox) {
        this._sandbox = sandbox;

        sandbox.register(this);
        for(p in this.eventHandlers) {
            sandbox.registerForEventByName(this, p);
        }
        sandbox.addRequestHandler('MapModulePlugin.MapLayerVisibilityRequest', this.requestHandlers.layerVisibilityHandler);
        sandbox.addRequestHandler('MapModulePlugin.MapMoveByLayerContentRequest', this.requestHandlers.layerContentHandler);

    },
    */

    /**
     * @method _parseGeometryForLayer
     * @private
     *
     * If layer.getGeometry() is empty, tries to parse layer.getGeometryWKT()
     * and set parsed geometry to the layer
     *
     * @param
     * {Oskari.mapframework.domain.WmsLayer/Oskari.mapframework.domain.WfsLayer/Oskari.mapframework.domain.VectorLayer}
     *            layer layer for which to parse geometry
     *
     */
    _parseGeometryForLayer : function(layer) {

        // parse geometry if available
        if(layer.getGeometry && layer.getGeometry().length == 0) {
            var layerWKTGeom = layer.getGeometryWKT();
            if(!layerWKTGeom) {
                // no wkt, dont parse
                return;
            }
            // http://dev.openlayers.org/docs/files/OpenLayers/Format/WKT-js.html
            // parse to OpenLayers.Geometry.Geometry[] array ->
            // layer.setGeometry();
            /*var wkt = new OpenLayers.Format.WKT();

            var features = wkt.read(layerWKTGeom);
            if(features) {
                if(features.constructor != Array) {
                    features = [features];
                }
                var geometries = [];
                for(var i = 0; i < features.length; ++i) {
                    geometries.push(features[i].geometry);
                }
                layer.setGeometry(geometries);
            } else {
                // 'Bad WKT';
            }
            */
        }
    },

    /**
     * @method isInGeometry
     * If the given layer has geometry, checks if it is visible in the maps viewport.
     * If layer doesn't have geometry, returns always true since then we can't
     * determine this.
     * @param
     * {Oskari.mapframework.domain.WmsLayer/Oskari.mapframework.domain.WfsLayer/Oskari.mapframework.domain.VectorLayer}
     *            layer layer to check against
     * @return {Boolean} true if geometry is visible or cant determine if it isnt
     */
    isInGeometry : function(layer) {
        /*var geometries = layer.getGeometry();
        if( !geometries ) {
            return true;
        }
        if( geometries.length == 0 ) {
            return true;
        }

        var viewBounds = this.getMap().getExtent();
        for(var i = 0; i < geometries.length; ++i) {
            var bounds = geometries[i].getBounds();
            if( !bounds ) {
                continue;
            }
            if( bounds.intersectsBounds(viewBounds) ) {
                return true;
            }
        }
        return false;*/
       return true;
    },
    /**
     * @method _scheduleVisiblityCheck
     * @private
     * Schedules a visibility check on selected layers. After given timeout
     * calls  _checkLayersVisibility()
     */
    _scheduleVisiblityCheck: function () {
        var me = this;
        if (this._previousTimer) {
            clearTimeout(this._previousTimer);
            this._previousTimer = null;
        }
        this._visibilityCheckOrder++;
        this._previousTimer = setTimeout(function () {
            me._checkLayersVisibility(me._visibilityCheckOrder);
        }, this._visibilityPollingInterval);
    },
    /**
     * @method _checkLayersVisibility
     * @private
     * Loops through selected layers and notifies other modules about visibility
     * changes
     * @param {Number} orderNumber checks orderNumber against
     * #_visibilityCheckOrder
     *      to see if this is the latest check, if not - does nothing
     */
    _checkLayersVisibility: function (orderNumber) {
        if (orderNumber !== this._visibilityCheckOrder) {
            return;
        }
        var layers = this._sandbox.findAllSelectedMapLayers(),
            i,
            layer;
        for (i = 0; i < layers.length; ++i) {
            layer = layers[i];

            if (layer.isVisible()) {
                this.notifyLayerVisibilityChanged(layer);
            }
        }
        this._visibilityCheckScheduled = false;
    },
    /**
     * @method _isInScale
     * @private
     * Checks if the maps scale is in the given maplayers scale range
     * @param
     * {Oskari.mapframework.domain.WmsLayer/Oskari.mapframework.domain.WfsLayer/Oskari.mapframework.domain.VectorLayer}
     *            layer layer to check scale against
     * @return {Boolean} true maplayer is visible in current zoomlevel
     */
    _isInScale: function (layer) {
        var scale = this.getSandbox().getMap().getScale();
        return layer.isInScale(scale);
    },
    /**
     * @method notifyLayerVisibilityChanged
     * Notifies bundles about layer visibility changes by sending MapLayerVisibilityChangedEvent.
     * @param
     * {Oskari.mapframework.domain.WmsLayer/Oskari.mapframework.domain.WfsLayer/Oskari.mapframework.domain.VectorLayer}
     *            layer layer to check against
     */
    notifyLayerVisibilityChanged : function(layer) {
        var scaleOk = layer.isVisible();
        var geometryMatch = layer.isVisible();
        // if layer is visible check actual values
        if(layer.isVisible()) {
            scaleOk = this._isInScale(layer);
            geometryMatch = this.isInGeometry(layer);
        }
        // setup openlayers visibility
        // NOTE: DO NOT CHANGE visibility in internal layer object (it will
        // change in UI also)
        // this is for optimization purposes
        var mapModule = this._mapModule;
        if(scaleOk && geometryMatch && layer.isVisible()) {
            // show non-baselayer if in scale, in geometry and layer visible
            var mapLayers = mapModule.getLayersByName('layer_' + layer.getId());
            var mapLayer = mapLayers.length ? mapLayers[0] : null;
/*            if(mapLayer && !mapLayer.getVisible()) {
                mapLayer.setVisible(true);
            }*/
        } else {
            // otherwise hide non-baselayer
            var mapLayers = mapModule.getLayersByName('layer_' + layer.getId());
            var mapLayer = mapLayers.length ? mapLayers[0]: null;
            /*if(mapLayer && mapLayer.getVisible()) {
                mapLayer.setVisible(false);
            }*/
        }
        var event = this._sandbox.getEventBuilder('MapLayerVisibilityChangedEvent')(layer, scaleOk, geometryMatch);
        this._sandbox.notifyAll(event);
    },
    /**
     * @method _afterRearrangeSelectedMapLayerEvent
     * @private
     * Handles AfterRearrangeSelectedMapLayerEvent.
     * Changes the layer order in Openlayers to match the selected layers list in
     * Oskari.
     *
     * @param
     * {Oskari.mapframework.event.common.AfterRearrangeSelectedMapLayerEvent}
     *            event
     */
    _afterRearrangeSelectedMapLayerEvent : function(event) {
        var layers = this._sandbox.findAllSelectedMapLayers();
        var layerIndex = 0;

        var opLayersLength = this.mapModule.getLayers().length;

        var changeLayer = this.mapModule.getLayersByName('Markers');
        if(changeLayer.length > 0) {
            this.mapModule.setLayerIndex(changeLayer[0], opLayersLength);
            opLayersLength--;
        }
        /*
        // TODO: could this be used here also?
        // get openlayers layer objects from map
        var layers = this.getMapModule().getOLMapLayers(layer.getId());
        for ( var i = 0; i < layers.length; i++) {
            layers[i].setVisibility(layer.isVisible());
            layers[i].display(layer.isVisible());
        }
         */

        for(var i = 0; i < layers.length; i++) {

            if(layers[i].isBaseLayer()||layers[i].isGroupLayer()) {
                for(var bl = 0; bl < layers[i].getSubLayers().length; bl++) {
                    var changeLayer = this.mapModule.getLayersByName('basemap_' + layers[i]
                    .getSubLayers()[bl].getId());
                    this.mapModule.setLayerIndex(changeLayer[0], layerIndex);
                    layerIndex++;
                }
            } else if(layers[i].isLayerOfType('WFS')) {
                var wfsReqExp = new RegExp('wfs_layer_' + layers[i].getId() + '_WFS_LAYER_IMAGE*', 'i');
                var mapLayers = this.mapModule.getLayersByName(wfsReqExp);
                for(var k = 0; k < mapLayers.length; k++) {
                    this.mapModule.setLayerIndex(mapLayers[k], layerIndex);
                    layerIndex++;
                }

                var wfsReqExp = new RegExp('wfs_layer_' + layers[i].getId() + '_HIGHLIGHTED_FEATURE*', 'i');
                var changeLayer = this.mapModule.getLayersByName(wfsReqExp);
                if(changeLayer.length > 0) {
                    this.mapModule.setLayerIndex(changeLayer[0], layerIndex);
                    layerIndex++;
                }

            } else {
                var changeLayer = this.mapModule.getLayersByName('layer_' + layers[i].getId());
                this.mapModule.setLayerIndex(changeLayer[0], layerIndex);
                layerIndex++;
            }
        }
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
    });
