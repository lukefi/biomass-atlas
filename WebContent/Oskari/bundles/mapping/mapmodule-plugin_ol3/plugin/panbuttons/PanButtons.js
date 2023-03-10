/**
 * @class Oskari.mapframework.bundle.mapmodule.plugin.PanButtons
 * Adds on-screen pan buttons on the map. In the middle of the pan buttons is a
 * state reset button.
 *
 * See http://www.oskari.org/trac/wiki/DocumentationBundleMapModulePluginPanButtons
 */
Oskari.clazz.define('Oskari.mapframework.bundle.mapmodule.plugin.PanButtons',

    /**
     * @static @method create called automatically on construction
     *
     *
     */
    function (config) {
        this._clazz =
            'Oskari.mapframework.bundle.mapmodule.plugin.PanButtons';
        this._defaultLocation = 'top right';
        this._index = 0;
        this._name = 'PanButtons';
    }, {
        /**
         * @private @method _createControlElement
         * Draws the panbuttons on the screen.
         *
         *
         * @return {jQuery}
         * Plugin jQuery element
         */
        _createControlElement: function () {
            var me = this,
                ppid = (new Date()).getTime().toString(),
                el = jQuery(
                    '<div class="mapplugin panbuttonDiv panbuttons">' +
                    '  <div>' +
                    '    <img class="panbuttonDivImg" usemap="#panbuttons_' + ppid + '">' +
                    '      <map name="panbuttons_' + ppid + '">' +
                    '        <area shape="circle"  class="panbuttons_center" coords="45,45,20" href="#">' +
                    '        <area shape="polygon" class="panbuttons_left"   coords="13,20,25,30,20,45,27,65,13,70,5,45" href="#">' +
                    '        <area shape="polygon" class="panbuttons_up"     coords="30,8,45,4,60,8,60,23,45,20,30,23" href="#">' +
                    '        <area shape="polygon" class="panbuttons_right"  coords="79,20,67,30,72,45,65,65,79,70,87,45" href="#">' +
                    '        <area shape="polygon" class="panbuttons_down"   coords="30,82,45,86,60,82,60,68,45,70,30,68" href="#">' +
                    '      </map>' +
                    '   </img>' +
                    '  </div>' +
                    '</div>'
                ),
                center = el.find('.panbuttons_center'),
                left = el.find('.panbuttons_left'),
                right = el.find('.panbuttons_right'),
                top = el.find('.panbuttons_up'),
                bottom = el.find('.panbuttons_down'),
                pbimg = me.getMapModule().getImageUrl() + '/framework/mapmodule-plugin/resources/images/',
                panbuttonDivImg = el.find('.panbuttonDivImg');
            // update path from config
            panbuttonDivImg.attr('src', pbimg + 'empty.png');

            center.bind('mouseover', function (event) {
                panbuttonDivImg.addClass('root');
            });
            center.bind('mouseout', function (event) {
                panbuttonDivImg.removeClass('root');
            });
            center.bind('click', function (event) {
                if (!me.inLayerToolsEditMode()) {
                    var requestBuilder = me.getSandbox().getRequestBuilder(
                        'StateHandler.SetStateRequest'
                    );
                    if (requestBuilder) {
                        me.getSandbox().request(me, requestBuilder());
                    } else {
                        me.getSandbox().resetState();
                    }
                }
            });

            left.bind('mouseover', function (event) {
                panbuttonDivImg.addClass('left');
            });
            left.bind('mouseout', function (event) {
                panbuttonDivImg.removeClass('left');
            });
            left.bind('click', function (event) {
                if (!me.inLayerToolsEditMode()) {
                    me.getMapModule().panMapByPixels(-100, 0, true);
                }
            });

            right.bind('mouseover', function (event) {
                panbuttonDivImg.addClass('right');
            });
            right.bind('mouseout', function (event) {
                panbuttonDivImg.removeClass('right');
            });
            right.bind('click', function (event) {
                if (!me.inLayerToolsEditMode()) {
                    me.getMapModule().panMapByPixels(100, 0, true);
                }
            });

            top.bind('mouseover', function (event) {
                panbuttonDivImg.addClass('up');
            });
            top.bind('mouseout', function (event) {
                panbuttonDivImg.removeClass('up');
            });
            top.bind('click', function (event) {
                if (!me.inLayerToolsEditMode()) {
                    me.getMapModule().panMapByPixels(0, -100, true);
                }
            });

            bottom.bind('mouseover', function (event) {
                panbuttonDivImg.addClass('down');
            });
            bottom.bind('mouseout', function (event) {
                panbuttonDivImg.removeClass('down');
            });
            bottom.bind('click', function (event) {
                if (!me.inLayerToolsEditMode()) {
                    me.getMapModule().panMapByPixels(0, 100, true);
                }
            });
            el.mousedown(function (event) {
                if (!me.inLayerToolsEditMode()) {
                    var radius = Math.round(0.5 * panbuttonDivImg[0].width),
                        pbOffset = panbuttonDivImg.offset(),
                        centerX = pbOffset.left + radius,
                        centerY = pbOffset.top + radius;
                    if (Math.sqrt(Math.pow(centerX - event.pageX, 2) + Math.pow(centerY - event.pageY, 2)) < radius) {
                        event.stopPropagation();
                    }
                }
            });

            return el;
        },

        /**
         * @public  @method _refresh
         * Called after a configuration change.
         *
         *
         */
        refresh: function () {
            var me = this,
                conf = me.getConfig();
            // Change the style if in the conf
            if (conf && conf.toolStyle) {
                me.changeToolStyle(conf.toolStyle, me.getElement());
            }
        },


        /**
         * @method changeToolStyle
         * Changes the tool style of the plugin
         *
         * @param {Object} styleName
         * @param {jQuery} div
         *
         */
        changeToolStyle: function (styleName, div) {
            div = div || this.getElement();

            if (!div) {
                return;
            }

            var panButtons = div.find('img.panbuttonDivImg');
            if (styleName === null) {
                panButtons.removeAttr('style');
            } else {

                var resourcesPath = this.getMapModule().getImageUrl(),
                    imgUrl = resourcesPath + '/framework/mapmodule-plugin/resources/images/',
                    bgImg = imgUrl + 'panbutton-sprites-' + styleName + '.png';

                panButtons.css({
                    'background-image': 'url("' + bgImg + '")'
                });
            }
        }
    }, {
        'extend': ['Oskari.mapping.mapmodule.plugin.BasicMapModulePlugin'],
        /**
         * @static @property {string[]} protocol array of superclasses
         */
        'protocol': [
            'Oskari.mapframework.module.Module',
            'Oskari.mapframework.ui.module.common.mapmodule.Plugin'
        ]
    });
