/**
 * @class Oskari.mapframework.ui.module.common.MapModule
 *
 * Provides map functionality/Wraps actual map implementation (Openlayers).
 * Currently hardcoded at 13 zoomlevels (0-12) and SRS projection code 'EPSG:3067'.
 * There are plans to make these more configurable in the future.
 *
 * See http://www.oskari.org/trac/wiki/DocumentationBundleMapmodule
 */
Oskari.clazz.define('Oskari.mapframework.ui.module.common.MapModule',
    /**
     * @method create called automatically on construction
     * @static
     *
     * @param {String} id
     *      Unigue ID for this map
     * @param {Array} map options, example data:
     *  {
     *      resolutions : [2000, 1000, 500, 200, 100, 50, 20, 10, 4, 2, 1, 0.5, 0.25],
     *      units : "m",
     *      maxExtent : {
     *          left : 0,
     *          bottom : 10000000,
     *          right : 10000000,
     *          top : 0
     *      },
     *      srsName : "EPSG:3067",
     *      openLayers : {
     *           imageReloadAttemps: 5,
     *           onImageLoadErrorColor: 'transparent'
     *      }
     *  }
     */

    function (id, imageUrl, options, mapDivId) {
        this._options = {
            resolutions: [2000, 1000, 500, 200, 100, 50, 20, 10, 4, 2, 1, 0.5, 0.25],
            srsName: 'EPSG:3067',
            units: 'm',
            openLayers : {
                imageReloadAttemps: 5,
                onImageLoadErrorColor: 'transparent'
            }
        };
        this._mapDivId = mapDivId;
        this._mapClickedBuilder;

        // override defaults
        var key;
        if (options) {
            for (key in options) {
                if (options.hasOwnProperty(key)) {
                    this._options[key] = options[key];
                }
            }
        }
    }, {

        _getContainerWithClasses: function (containerClasses) {
            var mapDiv = this.getMapEl(),
                containerDiv = jQuery(
                    '<div class="mapplugins">' +
                    '  <div class="mappluginsContainer">' +
                    '    <div class="mappluginsContent"></div>' +
                    '  </div>' +
                    '</div>'
                );

            containerDiv.addClass(containerClasses);
            containerDiv.attr('data-location', containerClasses);
            return containerDiv;
        },

        _getContainerClasses: function () {
            return [
                'bottom center',
                'center top',
                'center right',
                'center left',
                'bottom right',
                'bottom left',
                'right top',
                'left top'
            ];
        },

        /**
         * Adds containers for map control plugins
         */
        _addMapControlPluginContainers: function () {
            var containerClasses = this._getContainerClasses(),
                containerDiv,
                mapDiv = this.getMapEl(),
                i;

            for (i = 0; i < containerClasses.length; i += 1) {
                mapDiv.append(
                    this._getContainerWithClasses(containerClasses[i])
                );
            }
        },

        _getMapControlPluginContainer: function (containerClasses) {
            var splitClasses = (containerClasses + '').split(' '),
                selector = '.mapplugins.' + splitClasses.join('.'),
                containerDiv,
                mapDiv = this.getMapEl();

            containerDiv = mapDiv.find(selector);
            if (!containerDiv.length) {
                var containersClasses = this._getContainerClasses(),
                    currentClasses,
                    previousFound = null,
                    current,
                    classesMatch,
                    i,
                    j;

                for (i = 0; i < containersClasses.length; i += 1) {
                    currentClasses = containersClasses[i].split(' ');
                    current = mapDiv.find('.mapplugins.' + currentClasses.join('.'));
                    if (current.length) {
                        // container was found in DOM
                        previousFound = current;
                    } else {
                        // container not in DOM, see if it's the one we're supposed to add
                        classesMatch = true;
                        for (j = 0; j < currentClasses.length; j += 1) {
                            if (jQuery.inArray(currentClasses[j], splitClasses) < 0) {
                                classesMatch = false;
                                break;
                            }
                        }
                        if (classesMatch) {
                            // It's the one we're supposed to add
                            containerDiv = this._getContainerWithClasses(
                                currentClasses
                            );
                            if (previousFound !== null && previousFound.length) {
                                previousFound.after(containerDiv);
                            } else {
                                mapDiv.prepend(containerDiv);
                            }
                        }
                    }
                }
            }
            return containerDiv;
        },

        /**
         * @method setMapControlPlugin
         * Inserts a map control plugin instance to the map DOM
         * @param  {Object} element          Control container (jQuery)
         * @param  {String} containerClasses List of container classes separated by space, e.g. 'top left'
         * @param  {Number} slot             Preferred slot/position for the plugin element. Inverted for bottom corners (at least).
         */

        setMapControlPlugin: function (element, containerClasses, position) {
            // Get the container
            var container = this._getMapControlPluginContainer(containerClasses),
                content = container.find('.mappluginsContainer .mappluginsContent'),
                pos = position + '',
                inverted = /^(?=.*\bbottom\b)((?=.*\bleft\b)|(?=.*\bright\b)).+/.test(containerClasses), // bottom corner container?
                precedingPlugin = null,
                curr;

            if (!element) {
                throw 'Element is non-existent.';
            }
            if (!containerClasses) {
                throw 'No container classes.';
            }
            if (!content || !content.length) {
                throw 'Container with classes "' + containerClasses + '" not found.';
            }
            if (content.length > 1) {
                throw 'Found more than one container with classes "' + containerClasses + '".';
            }

            // Add slot to element
            element.attr('data-position', position);
            // Detach element
            element.detach();
            // Get container's children, iterate through them
            if (position !== null && position !== undefined) {
                content.find('.mapplugin').each(function () {
                    curr = jQuery(this);
                    // if plugin's slot isn't bigger (or smaller for bottom corners) than ours, store it to precedingPlugin
                    if ((!inverted && curr.attr('data-position') <= pos) ||
                        (inverted && curr.attr('data-position') > pos)) {
                        precedingPlugin = curr;
                    }
                });
                if (!precedingPlugin) {
                    // no preceding plugin found, just slap our plugin to the beginning of the container
                    content.prepend(element);
                } else {
                    // preceding plugin found, insert ours after it.
                    precedingPlugin.after(element);
                }
            } else {
                // no position given, add to end
                content.append(element);
            }
            // Make sure container is visible
            container.css('display', '');
        },

        /**
         * @method removeMapControlPlugin
         * Removes a map control plugin instance from the map DOM
         * @param  {Object} element Control container (jQuery)
         * @param  {Boolean} keepContainerVisible Keep container visible even if there's no children left.
         */
        removeMapControlPlugin: function (element, keepContainerVisible) {
            var container = element.parents('.mapplugins'),
                content = element.parents('.mappluginsContent');
            // TODO take this into use in all UI plugins so we can hide unused containers...
            element.remove();
            if (!keepContainerVisible && content.children().length === 0) {
                container.css('display', 'none');
            }
        },

        /**
         * @method _initImpl
         * Implements Module protocol init method. Creates the OpenLayers Map.
         * @param {Oskari.mapframework.sandbox.Sandbox} sandbox
         * @return {OpenLayers.Map}
         */
        _initImpl: function (sandbox, options, map) {
            /*Added to handle pink tiles */
            OpenLayers.IMAGE_RELOAD_ATTEMPTS = options.openLayers.imageReloadAttemps;
            OpenLayers.Util.onImageLoadErrorColor = options.openLayers.onImageLoadErrorColor;

            var scales = this._calculateScalesFromResolutions(options.resolutions, map.units);
            this._mapScales = scales;

            this._createBaseLayer();

            // TODO remove this whenever we're ready to add the containers when needed
            this._addMapControlPluginContainers();
            this._mapClickedBuilder = sandbox.getEventBuilder('MapClickedEvent');
            return map;
        },

        _startImpl: function () {
            var sandbox = this.getSandbox();
            this._addRequestHandlersImpl(sandbox);
            return true;
        },

        _addRequestHandlersImpl: function (sandbox) {
            this.requestHandlers = {
                mapLayerUpdateHandler: Oskari.clazz.create('Oskari.mapframework.bundle.mapmodule.request.MapLayerUpdateRequestHandler', sandbox, this),
                mapMoveRequestHandler: Oskari.clazz.create('Oskari.mapframework.bundle.mapmodule.request.MapMoveRequestHandler', sandbox, this)
            };
            sandbox.addRequestHandler('MapModulePlugin.MapLayerUpdateRequest', this.requestHandlers.mapLayerUpdateHandler);
            sandbox.addRequestHandler('MapMoveRequest', this.requestHandlers.mapMoveRequestHandler);
        },

        /**
         * Changed to resolutions based map zoom levels, but we need to
         * calculate scales array for backward compatibility
         *
         * @param  {Number[]} resolutions configured resolutions array
         * @param  {String} units         OpenLayers unit (m/degree etc)
         * @return {Number[]}             calculated matching scales array
         * @private
         */
        _calculateScalesFromResolutions: function (resolutions, units) {
            var scales = [],
                i,
                calculatedScale;
            for (i = 0; i < resolutions.length; i += 1) {
                calculatedScale = OpenLayers.Util.getScaleFromResolution(resolutions[i], units);
                // rounding off the resolution to scale calculation
                calculatedScale = calculatedScale * 100000000;
                calculatedScale = Math.round(calculatedScale);
                calculatedScale = calculatedScale / 100000000;
                scales.push(calculatedScale);
            }
            return scales;
        },

        /**
         * @method getMapViewPortDiv
         * Returns a reference to the map viewport div for setting correct z-ordering of divs
         * @return {HTMLDivElement}
         */
        getMapViewPortDiv: function () {
            return this._map.viewPortDiv;
        },

        /**
         * @method getMapLayersContainerDiv
         * Returns a reference to the div containing the map layers for setting correct z-ordering of divs
         * @return {HTMLDivElement}
         */
        getMapLayersContainerDiv: function () {
            return this._map.layerContainerDiv;
        },

        /**
         * @method _createMap
         * Depricated
         * @private
         * Creates the OpenLayers.Map object
         * @return {OpenLayers.Map}
         */
        _createMap: function () {
            this.getSandbox().printWarn('_createMap is deprecated. Use _createMapImpl instead.');
            this._createMapImpl();
        },

        /**
         * @method _createMapImpl
         * @private
         * Creates the OpenLayers.Map object
         * @return {OpenLayers.Map}
         */
        _createMapImpl: function () {
            var me = this;
            var sandbox = this._sandbox;
            // this is done BEFORE enhancement writes the values to map domain
            // object... so we will move the map to correct location
            // by making a MapMoveRequest in application startup
            var lonlat = new OpenLayers.LonLat(0, 0),
                mapExtent = new OpenLayers.Bounds(0, 0, 10000000, 10000000);
            // FIXME use some cleaner check
            if (this._options !== null &&
                this._options !== undefined &&
                this._options.maxExtent !== null &&
                this._options.maxExtent !== undefined &&
                this._options.maxExtent.left !== null &&
                this._options.maxExtent.left !== undefined &&
                this._options.maxExtent.bottom !== null &&
                this._options.maxExtent.bottom !== undefined &&
                this._options.maxExtent.right !== null &&
                this._options.maxExtent.right !== undefined &&
                this._options.maxExtent.top !== null &&
                this._options.maxExtent.top !== undefined) {
                mapExtent = new OpenLayers.Bounds(this._options.maxExtent.left, this._options.maxExtent.bottom, this._options.maxExtent.right, this._options.maxExtent.top);
            }
            this._map = new OpenLayers.Map({
                controls: [],
                units: this._options.units, //'m',
                maxExtent: mapExtent,
                resolutions: this._options.resolutions,
                projection: this._options.srsName,
                isBaseLayer: true,
                center: lonlat,
                // https://github.com/openlayers/openlayers/blob/master/notes/2.13.md#map-property-fallthrough-defaults-to-false
                // fallThrough: true is needed for statsgrid drag resizing
                fallThrough: true,
                theme: null,
                zoom: 0,
                zoomMethod: null
            });

            me._addClickControl();

            return this._map;
        },

        /**
         * Add map click handler
         * @method @private _addClickControl
         */
        _addClickControl: function(){
            var me = this;
            //Set up a click handler
            OpenLayers.Control.Click = OpenLayers.Class(OpenLayers.Control, {
                defaultHandlerOptions: {
                    'double': true,
                    'stopDouble': true
                },

                initialize: function(options) {
                    this.handlerOptions = OpenLayers.Util.extend(
                        {}, this.defaultHandlerOptions
                    );
                    OpenLayers.Control.prototype.initialize.apply(
                        this, arguments
                    );
                    this.handler = new OpenLayers.Handler.Click(
                        this, {
                            'click': function(evt){
                                me.__sendMapClickEvent(evt);
                            }
                        }, this.handlerOptions
                    );
                }
            });

            var click = new OpenLayers.Control.Click();
            me._map.addControl(click);
            click.activate();
        },

        /**
         * Send map click event.
         * @method  @private __sendMapClickEvent
         * @param  {Object} evt event object
         */
        __sendMapClickEvent : function(evt) {
            var sandbox = this._sandbox;
            /* may be this should dispatch to mapmodule */
            var lonlat = this._map.getLonLatFromViewPortPx(evt.xy),
                event = this._mapClickedBuilder(lonlat, evt.xy.x, evt.xy.y);
            sandbox.notifyAll(event);
        },

        /**
         * Enure at object exists.
         * @private @method _ensureExists
         * @param  {Object} obj check if object exists
         * @return {Boolean}  exists?
         */
        _ensureExists: function (obj) {
            return obj !== null && obj !== undefined;
        },

        /**
         * @method createBaseLayer
         * Creates a dummy base layer and adds it to the map. Nothing to do with Oskari maplayers really.
         * @private
         */
        _createBaseLayer: function () {

            var base = new OpenLayers.Layer(
                'BaseLayer',
                {
                    layerId: 0,
                    isBaseLayer: true,
                    displayInLayerSwitcher: false
                }
            );

            this._map.addLayer(base);
        },

        /**
         * @method moveMapToLanLot
         * Moves the map to the given position.
         * NOTE! Doesn't send an event if zoom level is not changed.
         * Call notifyMoveEnd() afterwards to notify other components about changed state.
         * @param {OpenLayers.LonLat} lonlat coordinates to move the map to
         * @param {Number} zoomAdjust relative change to the zoom level f.ex -1 (optional)
         * @param {Boolean} pIsDragging true if the user is dragging the map to a new location currently (optional)
         */
        moveMapToLanLot: function (lonlat, zoomAdjust, pIsDragging) {
            // TODO: openlayers has isValidLonLat(); maybe use it here
            var isDragging = (pIsDragging === true);
            // TODO check if panTo (still) breaks IE9+ and if not, should we use it
            // using panTo BREAKS IE on startup so do not
            // should we spam events on dragmoves?
            this._map.setCenter(lonlat, this._getMapZoom(), isDragging);

            if (zoomAdjust) {
                this.adjustZoomLevel(zoomAdjust, true);
            }
            this._updateDomainImpl();
        },

        /**
         * @method panMapToLonLat
         * Pans the map to the given position.
         * @param {OpenLayers.LonLat} lonlat coordinates to pan the map to
         * @param {Boolean} suppressEnd true to NOT send an event about the map move
         *  (other components wont know that the map has moved, only use when chaining moves and
         *     wanting to notify at end of the chain for performance reasons or similar) (optional)
         */
        panMapToLonLat: function (lonlat, suppressEnd) {
            this._map.setCenter(lonlat, this._getMapZoom());
            this._updateDomainImpl();
            if (suppressEnd !== true) {
                this.notifyMoveEnd();
            }
        },

        /**
         * @method zoomToScale
         * Pans the map to the given position.
         * @param {float} scale the new scale
         * @param {Boolean} closest find the zoom level that most closely fits the specified scale.
         *   Note that this may result in a zoom that does not exactly contain the entire extent.  Default is false
         * @param {Boolean} suppressEnd true to NOT send an event about the map move
         *  (other components wont know that the map has moved, only use when chaining moves and
         *     wanting to notify at end of the chain for performance reasons or similar) (optional)
         */
        zoomToScale: function (scale, closest, suppressEnd) {
            var isClosest = (closest === true);
            this._map.zoomToScale(scale, isClosest);
            this._updateDomainImpl();
            if (suppressEnd !== true) {
                this.notifyMoveEnd();
            }
        },

        /**
         * @method centerMap
         * Moves the map to the given position and zoomlevel.
         * @param {OpenLayers.LonLat} lonlat coordinates to move the map to
         * @param {Number} zoomLevel absolute zoomlevel to set the map to
         * @param {Boolean} suppressEnd true to NOT send an event about the map move
         *  (other components wont know that the map has moved, only use when chaining moves and
         *     wanting to notify at end of the chain for performance reasons or similar) (optional)
         */
        centerMap: function (lonlat, zoom, suppressEnd) {
            // TODO: openlayers has isValidLonLat(); maybe use it here
            this._map.setCenter(lonlat, zoom, false);
            this._updateDomainImpl();
            if (suppressEnd !== true) {
                this.notifyMoveEnd();
            }
        },

        /**
         * @method zoomIn
         * Adjusts the zoom level by one
         */
        zoomIn: function () {
            this.adjustZoomLevel(1);
        },

        /**
         * @method zoomOut
         * Adjusts the zoom level by minus one
         */
        zoomOut: function () {
            this.adjustZoomLevel(-1);
        },

        /**
         * @method zoomTo
         * Sets the zoom level to given value
         * @param {Number} zoomLevel the new zoom level
         */
        zoomTo: function (zoomLevel) {
            this.setZoomLevel(zoomLevel, false);
        },

        /**
         * @method panMapEast
         * Pans the map toward east by 3/4 of the map width
         */
        panMapEast: function () {
            var size = this._map.getSize();
            this.panMapByPixels(0.75 * size.w, 0);
        },

        /**
         * @method panMapWest
         * Pans the map toward west by 3/4 of the map width
         */
        panMapWest: function () {
            var size = this._map.getSize();
            this.panMapByPixels(-0.75 * size.w, 0);
        },

        /**
         * @method panMapNorth
         * Pans the map toward north by 3/4 of the map height
         */
        panMapNorth: function () {
            var size = this._map.getSize();
            this.panMapByPixels(0, -0.75 * size.h);
        },

        /**
         * @method panMapSouth
         * Pans the map toward south by 3/4 of the map height
         */
        panMapSouth: function () {
            var size = this._map.getSize();
            this.panMapByPixels(0, 0.75 * size.h);
        },

        /**
         * @method panMapByPixels
         * Pans the map by given amount of pixels.
         * @param {Number} pX amount of pixels to pan on x axis
         * @param {Number} pY amount of pixels to pan on y axis
         * @param {Boolean} suppressStart true to NOT send an event about the map starting to move
         *  (other components wont know that the map has started moving, only use when chaining moves and
         *     wanting to notify at end of the chain for performance reasons or similar) (optional)
         * @param {Boolean} suppressEnd true to NOT send an event about the map move
         *  (other components wont know that the map has moved, only use when chaining moves and
         *     wanting to notify at end of the chain for performance reasons or similar) (optional)
         * @param {Boolean} isDrag true if the user is dragging the map to a new location currently (optional)
         */
        panMapByPixels: function (pX, pY, suppressStart, suppressEnd, isDrag) {
            // usually programmatically for gfi centering
            this._map.pan(pX, pY, {
                dragging: (isDrag ? true : false),
                animate: false
            });

            this._updateDomainImpl();
            // send note about map change
            if (suppressStart !== true) {
                this.notifyStartMove();
            }
            if (suppressEnd !== true) {
                this.notifyMoveEnd();
            }
        },

        /**
         * @method moveMapByPixels
         * Moves the map by given amount of pixels.
         * @param {Number} pX amount of pixels to move on x axis
         * @param {Number} pY amount of pixels to move on y axis
         * @param {Boolean} suppressStart true to NOT send an event about the map starting to move
         *  (other components wont know that the map has started moving, only use when chaining moves and
         *     wanting to notify at end of the chain for performance reasons or similar) (optional)
         * @param {Boolean} suppressEnd true to NOT send an event about the map move
         *  (other components wont know that the map has moved, only use when chaining moves and
         *     wanting to notify at end of the chain for performance reasons or similar) (optional)
         */
        moveMapByPixels: function (pX, pY, suppressStart, suppressEnd) {
            // usually by mouse
            this._map.moveByPx(pX, pY);
            this._updateDomainImpl();
            // send note about map change
            if (suppressStart !== true) {
                this.notifyStartMove();
            }
            if (suppressEnd !== true) {
                this.notifyMoveEnd();
            }
        },

        /**
         * @method centerMapByPixels
         * Moves the map so the given pixel coordinates relative to the viewport is on the center of the view port.
         * @param {Number} pX pixel coordinates on x axis
         * @param {Number} pY pixel coordinates on y axis
         * @param {Boolean} suppressStart true to NOT send an event about the map starting to move
         *  (other components wont know that the map has started moving, only use when chaining moves and
         *     wanting to notify at end of the chain for performance reasons or similar) (optional)
         * @param {Boolean} suppressEnd true to NOT send an event about the map move
         *  (other components wont know that the map has moved, only use when chaining moves and
         *     wanting to notify at end of the chain for performance reasons or similar) (optional)
         */
        centerMapByPixels: function (pX, pY, suppressStart, suppressEnd) {
            var newXY = new OpenLayers.Pixel(pX, pY),
                newCenter = this._map.getLonLatFromViewPortPx(newXY);
            // check that the coordinates are reasonable, otherwise its easy to
            // scrollwheel the map out of view
            if (!this.isValidLonLat(newCenter.lon, newCenter.lat)) {
                // do nothing if not valid
                return;
            }
            this.moveMapToLanLot(newCenter);

            // send note about map change
            if (suppressStart !== true) {
                this.notifyStartMove();
            }
            if (suppressEnd !== true) {
                this.notifyMoveEnd();
            }
        },


        /**
         * @method isValidLonLat
         * Checks that latitude is between 8 200 000 <> 6 250 000 and
         * that longitude is between 0 <> 1 350 000
         * @param {Number} lon longitude to check
         * @param {Number} lat latitude to check
         * @return {Boolean} true if coordinates are in said boundaries
         */
        isValidLonLat: function (lon, lat) {
            var isOk = true;
            if (lat < 6250000 || lat > 8200000) {
                isOk = false;
                return isOk;
            }
            if (lon < 0 || lon > 1350000) {
                isOk = false;
            }
            return isOk;
        },

        /**
         * @method zoomToExtent
         * Zooms the map to fit given bounds on the viewport
         * @param {OpenLayers.Bounds} bounds BoundingBox that should be visible on the viewport
         * @param {Boolean} suppressStart true to NOT send an event about the map starting to move
         *  (other components wont know that the map has started moving, only use when chaining moves and
         *     wanting to notify at end of the chain for performance reasons or similar) (optional)
         * @param {Boolean} suppressEnd true to NOT send an event about the map move
         *  (other components wont know that the map has moved, only use when chaining moves and
         *     wanting to notify at end of the chain for performance reasons or similar) (optional)
         */
        zoomToExtent: function (bounds, suppressStart, suppressEnd) {
            this._map.zoomToExtent(bounds);
            this._updateDomainImpl();
            // send note about map change
            if (suppressStart !== true) {
                this.notifyStartMove();
            }
            if (suppressEnd !== true) {
                this.notifyMoveEnd();
            }
        },

        /**
         * @method adjustZoomLevel
         * Adjusts the maps zoom level by given relative number
         * @param {Number} zoomAdjust relative change to the zoom level f.ex -1
         * @param {Boolean} suppressEvent true to NOT send an event about the map move
         *  (other components wont know that the map has moved, only use when chaining moves and
         *     wanting to notify at end of the chain for performance reasons or similar) (optional)
         */
        adjustZoomLevel: function (amount, suppressEvent) {
            var requestedZoomLevel = this._getNewZoomLevel(amount);

            this._map.zoomTo(requestedZoomLevel);
            this._map.updateSize();
            this._updateDomainImpl();
            if (suppressEvent !== true) {
                // send note about map change
                this.notifyMoveEnd();
            }
        },

        /**
        * @method getMaxZoomLevel
        * Gets map max zoom level.
        *
        * @return {Integer} map max zoom level
        */
        getMaxZoomLevel: function(){
            // getNumZoomLevels returns OL map resolutions length, so need decreased by one (this return max OL zoom)
            return this._map.getNumZoomLevels() - 1;
        },

        /**
         * @method setZoomLevel
         * Sets the maps zoom level to given absolute number
         * @param {Number} newZoomLevel absolute zoom level
         * @param {Boolean} suppressEvent true to NOT send an event about the map move
         *  (other components wont know that the map has moved, only use when chaining moves and
         *     wanting to notify at end of the chain for performance reasons or similar) (optional)
         */
        setZoomLevel: function (newZoomLevel, suppressEvent) {
            if (newZoomLevel < 0 || newZoomLevel > this._map.getNumZoomLevels()) {
                newZoomLevel = this._getMapZoom();
            }
            this._map.zoomTo(newZoomLevel);
            this._updateDomainImpl();
            if (suppressEvent !== true) {
                // send note about map change
                this.notifyMoveEnd();
            }
        },

        /**
         * @method _getNewZoomLevel
         * @private
         * Does a sanity check on a zoomlevel adjustment to see if the adjusted zoomlevel is
         * supported by the map (is between 0-12). Returns the adjusted zoom level if it is valid or
         * current zoom level if the adjusted one is out of bounds.
         * @return {Number} sanitized absolute zoom level
         */
        _getNewZoomLevel: function (adjustment) {
            // TODO: check isNaN?
            var requestedZoomLevel = this._getMapZoom() + adjustment;

            if (requestedZoomLevel >= 0 && requestedZoomLevel <= this._map.getNumZoomLevels()) {
                return requestedZoomLevel;
            }
            // if not in valid bounds, return original
            return this._getMapZoom();
        },

        /**
         * @method notifyStartMove
         * Notify other components that the map has started moving. Sends a MapMoveStartEvent.
         * Not sent always, preferrably track map movements by listening to AfterMapMoveEvent.
         * Ignores the call if map is in stealth mode
         */
        notifyStartMove: function () {
            if (this.getStealth()) {
                // ignore if in "stealth mode"
                return;
            }
            this.getSandbox().getMap().setMoving(true);
            var centerX = this._getMapCenter().lon,
                centerY = this._getMapCenter().lat,
                evt = this.getSandbox().getEventBuilder('MapMoveStartEvent')(centerX, centerY);
            this.getSandbox().notifyAll(evt);
        },

        _getMapCenter: function () {
            return this._map.getCenter();
        },

        _getMapZoom: function () {
            return this._map.getZoom();
        },

        _getMapScale: function () {
            return this._map.getScale();
        },

        _getMapLayersByName: function (layerName) {
            return this._map.getLayersByName(layerName);
        },

        /**
         * @method notifyMoveEnd
         * Notify other components that the map has moved. Sends a AfterMapMoveEvent and updates the
         * sandbox map domain object with the current map properties.
         * Ignores the call if map is in stealth mode. Plugins should use this to notify other components
         * if they move the map through OpenLayers reference. All map movement methods implemented in mapmodule
         * (this class) calls this automatically if not stated otherwise in API documentation.
         * @param {String} creator
         *        class identifier of object that sends event
         */
        notifyMoveEnd: function (creator) {
            if (this.getStealth()) {
                // ignore if in "stealth mode"
                return;
            }
            var sandbox = this.getSandbox();
            sandbox.getMap().setMoving(false);

            var lonlat = this._getMapCenter();
            this._updateDomainImpl();
            var evt = sandbox.getEventBuilder('AfterMapMoveEvent')(lonlat.lon, lonlat.lat, this._getMapZoom(), false, this._getMapScale(), creator);
            sandbox.notifyAll(evt);
        },

        /**
         * @method updateSize
         * Notifies OpenLayers that the map size has changed and updates the size in sandbox map domain object.
         */
        updateSize: function () {
            this.getMap().updateSize();
            this._updateDomainImpl();

            var sandbox = this.getSandbox(),
                mapVO = sandbox.getMap();
            // send as an event forward to WFSPlugin (draws)
            var evt = sandbox.getEventBuilder(
                'MapSizeChangedEvent'
            )(mapVO.getWidth(), mapVO.getHeight());
            sandbox.notifyAll(evt);
        },

        /**
         * @method _updateDomain
         * Depricated
         * @private
         * Updates the sandbox map domain object with the current map properties.
         * Ignores the call if map is in stealth mode.
         */
        _updateDomain: function () {
            this.getSandbox().printWarn(
                '_updateDomain is deprecated. Use _updateDomainImpl instead.'
            );
            this._updateDomainImpl();
        },

        /**
         * @method _updateDomainImpl
         * @private
         * Updates the sandbox map domain object with the current map properties.
         * Ignores the call if map is in stealth mode.
         */
        _updateDomainImpl: function () {
            if (this.getStealth()) {
                // ignore if in "stealth mode"
                return;
            }
            var sandbox = this.getSandbox(),
                mapVO = sandbox.getMap(),
                lonlat = this._getMapCenter();

            mapVO.moveTo(lonlat.lon, lonlat.lat, this._getMapZoom());

            mapVO.setScale(this._getMapScale());

            var size = this._map.getCurrentSize();
            mapVO.setWidth(size.w);
            mapVO.setHeight(size.h);

            mapVO.setResolution(this._map.getResolution());
            mapVO.setExtent(this._map.getExtent());
            mapVO.setMaxExtent(this._map.getMaxExtent());

            mapVO.setBbox(this._map.calculateBounds());
        },

        /**
         * @method transformCoordinates
         * Deprecated
         * Transforms coordinates from given projection to the maps projectino.
         * @param {OpenLayers.LonLat} pLonlat
         * @param {String} srs projection for given lonlat params like "EPSG:4326"
         * @return {OpenLayers.LonLat} transformed coordinates
         */
        transformCoordinates: function (pLonlat, srs) {
            this.getSandbox().printWarn(
                'transformCoordinates is deprecated. Use _transformCoordinates instead if called from plugin. Otherwise, use Requests instead.'
            );

            return this._transformCoordinates(pLonlat, srs);
        },

        /**
         * @method _transformCoordinates
         * Transforms coordinates from given projection to the maps projectino.
         * @param {OpenLayers.LonLat} pLonlat
         * @param {String} srs projection for given lonlat params like "EPSG:4326"
         * @return {OpenLayers.LonLat} transformed coordinates
         */
        _transformCoordinates: function (pLonlat, srs) {
            return pLonlat.transform(
                new OpenLayers.Projection(srs),
                this.getMap().getProjectionObject()
            );
        },
        /**
         * @property eventHandlers
         * @static
         */
        eventHandlers: {
            'AfterMapLayerAddEvent': function (event) {
                this._afterMapLayerAddEvent(event);
            },
            'LayerToolsEditModeEvent': function (event) {
                this._isInLayerToolsEditMode = event.isInMode();
            }
        },

        /**
         * Adds the layer to the map through the correct plugin for the layer's type.
         *
         * @method _afterMapLayerAddEvent
         * @param  {Object} layer Oskari layer of any type registered to the mapmodule plugin
         * @param  {Boolean} keepLayersOrder
         * @param  {Boolean} isBaseMap
         * @return {undefined}
         */
        _afterMapLayerAddEvent: function (event) {
            var map = this.getMap(),
                layer = event.getMapLayer(),
                keepLayersOrder = event.getKeepLayersOrder(),
                isBaseMap = event.isBasemap(),
                layerPlugins = this.getLayerPlugins(),
                layerFunctions = [],
                i;

            _.each(layerPlugins, function (plugin) {
                //FIXME if (plugin && _.isFunction(plugin.addMapLayerToMap)) {
                if (_.isFunction(plugin.addMapLayerToMap)) {
                    var layerFunction = plugin.addMapLayerToMap(layer, keepLayersOrder, isBaseMap);
                    if (_.isFunction(layerFunction)) {
                        layerFunctions.push(layerFunction);
                    }
                }
            });

            // Execute each layer function
            for (i = 0; i < layerFunctions.length; i += 1) {
                layerFunctions[i].apply();
            }
        },

        /**
         * @method getOLMapLayers
         * Returns references to OpenLayers layer objects for requested layer or null if layer is not added to map.
         * Internally calls getOLMapLayers() on all registered layersplugins.
         * @param {String} layerId
         * @return {OpenLayers.Layer[]}
         */
        getOLMapLayers: function (layerId) {
            var me = this,
                sandbox = me._sandbox,
                layer = sandbox.findMapLayerFromSelectedMapLayers(layerId);
            if (!layer) {
                // not found
                return null;
            }
            var lps = this.getLayerPlugins(),
                p,
                layersPlugin,
                layerList,
                results = [];
            // let the actual layerplugins find the layer since the name depends on
            // type
            for (p in lps) {
                if (lps.hasOwnProperty(p)) {
                    layersPlugin = lps[p];
                    if (!layersPlugin) {
                        me.getSandbox().printWarn(
                            'LayerPlugins has no entry for "' + p + '"'
                        );
                    }
                    // find the actual openlayers layers (can be many)
                    layerList = layersPlugin ? layersPlugin.getOLMapLayers(layer): null;
                    if (layerList) {
                        // if found -> add to results
                        // otherwise continue looping
                        results = results.concat(layerList);
                    }
                }
            }
            return results;
        },

        /**
         * Removes all the css classes which respond to given regex from all elements
         * and adds the given class to them.
         *
         * @method changeCssClasses
         * @param {String} classToAdd the css class to add to all elements.
         * @param {RegExp} removeClassRegex the regex to test against to determine which classes should be removec
         * @param {Array[jQuery]} elements The elements where the classes should be changed.
         */
        changeCssClasses: function (classToAdd, removeClassRegex, elements) {
            var i,
                j,
                el;

            for (i = 0; i < elements.length; i += 1) {
                el = elements[i];
                // FIXME build the function outside the loop
                el.removeClass(function (index, classes) {
                    var removeThese = '',
                        classNames = classes.split(' ');

                    // Check if there are any old font classes.
                    for (j = 0; j < classNames.length; j += 1) {
                        if (removeClassRegex.test(classNames[j])) {
                            removeThese += classNames[j] + ' ';
                        }
                    }

                    // Return the class names to be removed.
                    return removeThese;
                });

                // Add the new font as a CSS class.
                el.addClass(classToAdd);
            }
        },

        isInLayerToolsEditMode: function () {
            return this._isInLayerToolsEditMode;
        },

        _calculateScalesImpl: function (resolutions) {
            for (var i = 0; i < resolutions.length; i += 1) {
                var calculatedScale = OpenLayers.Util.getScaleFromResolution(
                    resolutions[i],
                    'm'
                );
                calculatedScale = calculatedScale * 10000;
                calculatedScale = Math.round(calculatedScale);
                calculatedScale = calculatedScale / 10000;
                this._mapScales.push(calculatedScale);
            }
        },

        _addMapControlImpl: function (ctl) {
            this._map.addControl(ctl);
        },

        _removeMapControlImpl: function (ctl) {
            this._map.removeControl(ctl);
        },

        /**
         * @method getMapEl
         * Get jQuery map element
         */
        getMapEl: function () {
            var mapDiv = jQuery('#' + this._mapDivId);
            if (!mapDiv.length) {
                this.getSandbox().printWarn('mapDiv not found with #' + this._mapDivId);
            }
            return mapDiv;
        },

        /**
         * @method getMapElDom
         * Get DOM map element
         */
        getMapElDom: function () {
            return this.getMapEl().get(0);
        },

        /**
         * Brings map layer to top
         * @method bringToTop
         *
         * @param {OpenLayers.Layer} layer The new topmost layer
         * @param {Integer} buffer Add this buffer to z index. If it's undefined, using 1.
         */
        bringToTop: function(layer, buffer) {
            if (!layer || !layer.getZIndex) {
                return;
            }
            var layerZIndex = layer.getZIndex();
            var zIndex = Math.max(this._map.Z_INDEX_BASE.Feature,layerZIndex);
            buffer = buffer || 1;

            layer.setZIndex(zIndex + buffer);
            this.orderLayersByZIndex();
        },

        /**
         * @method orderLayersByZIndex
         * Orders layers by Z-indexes.
         */
        orderLayersByZIndex: function() {
            this._map.layers.sort(function(a, b){
                return a.getZIndex()-b.getZIndex();
            });
        },
        /**
         * Get map max extent.
         * @method getMaxExtent
         * @return {Object} max extent
         */
        getMaxExtent: function(){
            return this._maxExtent;
        }

    }, {
        /**
         * @property {String[]} protocol
         * @static
         */
        'protocol': ['Oskari.mapframework.module.Module'],
        'extend': ['Oskari.mapping.mapmodule.AbstractMapModule']
    });
