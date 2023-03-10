/**
 * @class Oskari.mapframework.bundle.layerselector2.Flyout
 *
 * Renders the "all layers" flyout.
 */
Oskari.clazz.define('Oskari.mapframework.bundle.layerselector2.Flyout',

    /**
     * @method create called automatically on construction
     * @static
     * @param {Oskari.mapframework.bundle.layerselector2.LayerSelectorBundleInstance} instance
     *    reference to component that created the flyout
     */

    function (instance) {
        //"use strict";
        this.instance = instance;
        this.container = null;
        this.template = null;
        this.state = null;
        this.layerTabs = [];
        this.filterTemplate = jQuery('<div class="filter filter-border"><center><div class="filter-icon"></div><div class="filter-text"></div></center></div>');
        this.filters= [];
        this._filterNewestCount = 20;
        this._newestLayers = null;
    }, {

        /**
         * @method getName
         * @return {String} the name for the component
         */
        getName: function () {
            //"use strict";
            return 'Oskari.mapframework.bundle.layerselector2.Flyout';
        },

        /**
         * @method setEl
         * @param {Object} el
         *     reference to the container in browser
         * @param {Number} width
         *     container size(?) - not used
         * @param {Number} height
         *     container size(?) - not used
         *
         * Interface method implementation
         */
        setEl: function (el, width, height) {
            //"use strict";
            this.container = el[0];
            if (!jQuery(this.container).hasClass('layerselector2')) {
                jQuery(this.container).addClass('layerselector2');
            }
        },

        /**
         * @method startPlugin
         *
         * Interface method implementation, assigns the HTML templates that will be used to create the UI
         */
        startPlugin: function () {
            //"use strict";
            var me = this,
                inspireTab = Oskari.clazz.create(
                    'Oskari.mapframework.bundle.layerselector2.view.LayersTab',
                    me.instance,
                    me.instance.getLocalization('filter').inspire,
                    'oskari_layerselector2_tabpanel_inspiretab'
                ),
                orgTab = Oskari.clazz.create(
                    'Oskari.mapframework.bundle.layerselector2.view.LayersTab',
                    me.instance,
                    me.instance.getLocalization('filter').organization,
                    'oskari_layerselector2_tabpanel_orgtab'
                ),
                publishedTab,
                elParent,
                elId;


            me.template = jQuery('<div class="allLayersTabContent"></div>');
            inspireTab.groupingMethod = 'getInspireName';
            orgTab.groupingMethod = 'getOrganizationName';

            me.layerTabs.push(inspireTab);
            me.layerTabs.push(orgTab);

            // add published tab based on config
            if (me.instance.conf && me.instance.conf.showPublishedTab === true) {
                publishedTab = Oskari.clazz.create(
                    'Oskari.mapframework.bundle.layerselector2.view.PublishedLayersTab',
                    me.instance,
                    me.instance.getLocalization('filter').published
                );
                this.layerTabs.push(publishedTab);
            }

            elParent = this.container.parentElement.parentElement;
        	elId = jQuery(elParent).find('.oskari-flyouttoolbar .oskari-flyouttools .oskari-flyouttool-close');
        	elId.attr('id', 'oskari_layerselector2_flyout_oskari_flyouttool_close');
        },

        /**
         * Adds default filter buttons.
         * @method  @private addDefaultFilters
         */
        addDefaultFilters: function(){
            var me = this;

            // Add newest filter
            me.addNewestFilter();

            // Add featuredata filter // stats name
            me.addStatsFilter();
        },

        /**
         * Add newest filter.
         * @method  @public addNewestFilter
         */
        addNewestFilter: function(){
            var me = this,
                loc = me.instance.getLocalization('layerFilter'),
                mapLayerService = this.instance.getSandbox().getService(
                        'Oskari.mapframework.service.MapLayerService'
                );

            me.addFilterTool(loc.buttons.newest,
                loc.tooltips.newest.replace('##', me._filterNewestCount),
                function(layer){
                    if(me._newestLayers === null) {
                        me._newestLayers = mapLayerService.getNewestLayers(me._filterNewestCount);
                    }
                    var ids = [];
                    jQuery(me._newestLayers).each(function(index, layer){
                       ids.push(layer.getId());
                    });
                    return (jQuery.inArray(layer.getId(), ids) !== -1);
                },
                'layer-newest',
                'layer-newest-disabled',
            'newest');
        },

        /**
         * Clear newest filter cache.
         * @method  @public clearNewestFilter
         */
        clearNewestFilter: function(){
            var me = this;
            me._newestLayers = null;
        },

        /**
         * Add stats filter.
         * @method  @public addStatsFilter
         */
        addStatsFilter: function(){
            var me = this,
                loc = me.instance.getLocalization('layerFilter');

            me.addFilterTool(loc.buttons.stats,
                loc.tooltips.stats,
                function(layer){
                    return (layer.hasFeatureData());
                },
                'layer-stats',
                'layer-stats-disabled',
            'stats');
        },

        /**
         * @method stopPlugin
         *
         * Interface method implementation, does nothing atm
         */
        stopPlugin: function () {
            //"use strict";
        },

        /**
         * @method getTitle
         * @return {String} localized text for the title of the flyout
         */
        getTitle: function () {
            //"use strict";
            return this.instance.getLocalization('title');
        },

        /**
         * @method getDescription
         * @return {String} localized text for the description of the flyout
         */
        getDescription: function () {
            //"use strict";
            return this.instance.getLocalization('desc');
        },

        /**
         * @method getOptions
         * Interface method implementation, does nothing atm
         */
        getOptions: function () {
            //"use strict";
        },

        /**
         * @method setState
         * @param {String} state
         *     close/minimize/maximize etc
         * Interface method implementation, does nothing atm
         */
        setState: function (state) {
            //"use strict";
            this.state = state;
        },

        /**
         * Set content state
         * @method  @public setContentState
         * @param {Object} state a content state
         */
        setContentState: function (state) {
            //"use strict";
            var i,
                tab;
            // prepare for complete state reset
            if (!state) {
                state = {};
            }

            for (i = 0; i < this.layerTabs.length; i += 1) {
                tab = this.layerTabs[i];
                if (tab.getTitle() === state.tab) {
                    this.tabContainer.select(tab.getTabPanel());
                    tab.setState(state);
                }
            }
        },
        /**
         * Hande selected filter request
         * @method  public enableFilter
         * @param  {String} selectedFilter selected filter, can be a 'stats', 'newest' or 'publishable'
         */
        enableFilter: function(selectedFilter) {
            var me = this,
                filterButton = jQuery('.layer-filter .filter-'+selectedFilter).first(),
                filterIcon = filterButton.find('.filter-icon'),
                active = jQuery('.layer-filter').find('.filter-icon.active');

            if(selectedFilter !== null) {
                if(!filterIcon.hasClass('active')) {
                    filterButton.trigger('click');
                }
            } else if(active.length>0) {
                me.deactivateAllFilters();
            }
        },

        getContentState: function () {
            //"use strict";
            var state = {},
                i,
                tab;
            for (i = 0; i < this.layerTabs.length; i += 1) {
                tab = this.layerTabs[i];
                if (this.tabContainer.isSelected(tab.getTabPanel())) {
                    state = tab.getState();
                    break;
                }
            }
            return state;
        },

        /**
         * @method createUi
         * Creates the UI for a fresh start
         */
        createUi: function () {
            //"use strict";
            var me = this,
                // clear container
                cel = jQuery(this.container),
                i,
                tab;

            cel.empty();

            me.tabContainer = Oskari.clazz.create(
                'Oskari.userinterface.component.TabContainer'
            );
            me.tabContainer.insertTo(cel);
            for (i = 0; i < me.layerTabs.length; i += 1) {
                tab = me.layerTabs[i];
                me.tabContainer.addPanel(tab.getTabPanel());
            }
            //me.tabContainer.addTabChangeListener(me._tabsChanged); // -> filter with same keyword when changing tabs?
            me.tabContainer.addTabChangeListener(
                function (previousTab, newTab) {
                    // Make sure this fires only when the flyout is open
                    if (!cel.parents('.oskari-flyout.oskari-closed').length) {
                        var searchInput = newTab.getContainer().find('input[type=text]');
                        if (searchInput) {
                            searchInput.focus();
                        }
                    }
                }
            );

            // Create default filters
            me.addDefaultFilters();


            me.populateLayers();
        },

        /**
         * @public @method focus
         * Focuses the first panel's search field (if available)
         *
         *
         */
        focus: function () {
            if (this.layerTabs) {
                this.layerTabs[0].focus();
            }
        },

        /**
         * Populate layer lists.
         * @method  @public populateLayers
         */
        populateLayers: function () {
            //"use strict";
            var sandbox = this.instance.getSandbox(),
                // populate layer list
                mapLayerService = sandbox.getService(
                    'Oskari.mapframework.service.MapLayerService'
                ),
                layers = mapLayerService.getAllLayers(),
                i,
                tab,
                layersCopy,
                groups;

            for (i = 0; i < this.layerTabs.length; i += 1) {
                tab = this.layerTabs[i];
                // populate tab if it has grouping method
                if (tab.groupingMethod) {
                    layersCopy = layers.slice(0);
                    groups = this._getLayerGroups(
                        layersCopy,
                        tab.groupingMethod
                    );
                    tab.showLayerGroups(groups);
                }
            }
        },

        /**
         * @method _getLayerGroups
         * @private
         */
        _getLayerGroups: function (layers, groupingMethod) {
            //"use strict";
            var me = this,
                groupList = [],
                group = null,
                n,
                layer,
                groupAttr;

            // sort layers by grouping & name
            layers.sort(function (a, b) {
                return me._layerListComparator(a, b, groupingMethod);
            });

            for (n = 0; n < layers.length; n += 1) {
                layer = layers[n];
                if (layer.getMetaType && layer.getMetaType() === 'published') {
                    // skip published layers
                    continue;
                }
                if (("bma" in layer.getOptions()) || ("nutrient" in layer.getOptions())) {
                	// skip biomass and nutrient layers
                	continue;
                }
                groupAttr = layer[groupingMethod]();
                if (!group || group.getTitle() !== groupAttr) {
                    group = Oskari.clazz.create(
                        'Oskari.mapframework.bundle.layerselector2.model.LayerGroup',
                        groupAttr
                    );


                    groupList.push(group);
                }

                if (!this.layerListFilteringFunction || (this.layerListFilteringFunction && this.layerListFilteringFunction(layer))) {
                    group.addLayer(layer);
                }
            }
            var sortedGroupList = jQuery.grep(groupList, function(group,index){
                return group.getLayers().length > 0;
            });
            return sortedGroupList;
        },

        /**
         * @method _layerListComparator
         * Uses the private property #grouping to sort layer objects in the wanted order for rendering
         * The #grouping property is the method name that is called on layer objects.
         * If both layers have same group, they are ordered by layer.getName()
         * @private
         * @param {Oskari.mapframework.domain.WmsLayer/Oskari.mapframework.domain.WfsLayer/Oskari.mapframework.domain.VectorLayer/Object} a comparable layer 1
         * @param {Oskari.mapframework.domain.WmsLayer/Oskari.mapframework.domain.WfsLayer/Oskari.mapframework.domain.VectorLayer/Object} b comparable layer 2
         * @param {String} groupingMethod method name to sort by
         */
        _layerListComparator: function (a, b, groupingMethod) {
            //"use strict";
            var nameA = a[groupingMethod]().toLowerCase(),
                nameB = b[groupingMethod]().toLowerCase();
            if (nameA === nameB && (a.getName() && b.getName())) {
                nameA = a.getName().toLowerCase();
                nameB = b.getName().toLowerCase();
            }
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        },

        /**
         * @method handleLayerSelectionChanged
         * @param {Oskari.mapframework.domain.WmsLayer/Oskari.mapframework.domain.WfsLayer/Oskari.mapframework.domain.VectorLayer/Object} layer
         *           layer that was changed
         * @param {Boolean} isSelected
         *           true if layer is selected, false if removed from selection
         * let's refresh ui to match current layer selection
         */
        handleLayerSelectionChanged: function (layer, isSelected) {
            //"use strict";
            var i,
                tab;
            for (i = 0; i < this.layerTabs.length; i += 1) {
                tab = this.layerTabs[i];
                tab.setLayerSelected(layer.getId(), isSelected);
            }
        },

        /**
         * @method handleLayerModified
         * @param {Oskari.mapframework.domain.AbstractLayer} layer
         *           layer that was modified
         * let's refresh ui to match current layers
         */
        handleLayerModified: function (layer) {
            //"use strict";
            var me = this,
                i,
                tab;
            for (i = 0; i < me.layerTabs.length; i += 1) {
                tab = me.layerTabs[i];
                tab.updateLayerContent(layer.getId(), layer);
            }
        },

        /**
         * @method handleLayerSticky
         * @param {Oskari.mapframework.domain.AbstractLayer} layer
         *           layer thats switch off diasable/enable is changed
         * let's refresh ui to match current layers
         */
        handleLayerSticky: function (layer) {
            //"use strict";
            var me = this,
                i,
                tab;
            for (i = 0; i < me.layerTabs.length; i += 1) {
                tab = me.layerTabs[i];
                tab.updateLayerContent(layer.getId(), layer);
            }
        },

        /**
         * @method handleLayerAdded
         * @param {Oskari.mapframework.domain.AbstractLayer} layer
         *           layer that was added
         * let's refresh ui to match current layers
         */
        handleLayerAdded: function (layer) {
            //"use strict";
            var me = this;
            me.populateLayers();
            // we could just add the layer to correct group and update the layer count for the group
            // but saving time to do other finishing touches
        },

        /**
         * @method handleLayerRemoved
         * @param {String} layerId
         *           id of layer that was removed
         * let's refresh ui to match current layers
         */
        handleLayerRemoved: function (layerId) {
            //"use strict";
            var me = this;
            me.populateLayers();
            // we could  just remove the layer and update the layer count for the group
            // but saving time to do other finishing touches
        },

        /**
         * @method  @public setLayerListFilteringFunction set layer list function
         * @param {Function} layerListFilteringFunction layer list filter function
         */
        setLayerListFilteringFunction: function(layerListFilteringFunction) {
            this.layerListFilteringFunction = layerListFilteringFunction;
        },

        /**
         * Add filter tool to layer list.
         * @method  @public addFilterTool
         * @param {String} toolText             tool button text
         * @param {String} tooltip              tool tooltip text
         * @param {Function} filterFunction     filter function
         * @param {String} iconClassActive      tool icon active class
         * @param {String} iconClassDeactive    tool icon deactive class
         * @param {String} filterName           filter name
         */
        addFilterTool: function(toolText, tooltip, filterFunction, iconClassActive, iconClassDeactive, filterName) {
            var me = this,
                filterButton = me.filterTemplate.clone(),
                filter = {
                    toolText: toolText,
                    tooltip: tooltip,
                    filterFunction: filterFunction,
                    iconClassActive: iconClassActive,
                    iconClassDeactive: iconClassDeactive,
                    filterName: filterName
                },
                filterContainer = jQuery('.layerselector2-layer-filter'),
                loc = me.instance.getLocalization('layerFilter');

            filterButton.find('.filter-text').html(toolText);
            filterButton.attr('title', tooltip);
            filterButton.find('.filter-icon').addClass('filter-'+filterName);
            filterButton.find('.filter-icon').addClass(iconClassDeactive);

            filterButton.unbind('click');
            filterButton.bind('click', function(){
                var filterIcon = jQuery('.filter-icon.' + 'filter-'+filterName);

                me.deactivateAllFilters(filterName);

                if(filterIcon.hasClass(iconClassDeactive)){
                    // Activate this filter
                    filterIcon.removeClass(iconClassDeactive);
                    filterIcon.addClass(iconClassActive);
                    filterIcon.addClass('active');
                    me.activateFilter(filterFunction);
                    filterIcon.parents('.filter').attr('title',loc.tooltips.remove);
                } else {
                    // Deactivate all filters
                    me.deactivateAllFilters();
                }

            });

            me.filters.push(filter);
            filterContainer.append(filterButton);
        },
        /**
         * Activate selected filter.
         * @method @public activateFilter
         * @param  {Function} filterFunction activate filter
         */
        activateFilter: function(filterFunction){
            var me = this;
            me.setLayerListFilteringFunction(filterFunction);
            me.populateLayers();
        },
        /**
         * Deactivate all filters
         * @method  @public deactivateAllFilters
         *
         * @param {String} notDeactivateThisFilter not deactivate this filter
         */
        deactivateAllFilters: function(notDeactivateThisFilter){
            var me = this;

            jQuery.each(me.filters, function(index, filter) {
                if(!notDeactivateThisFilter || filter.filterName !== notDeactivateThisFilter) {
                    var filterIcon = jQuery('.filter-icon.' + 'filter-'+filter.filterName);
                    filterIcon.removeClass(filter.iconClassActive);
                    filterIcon.removeClass('active');
                    filterIcon.addClass(filter.iconClassDeactive);
                    filterIcon.parents('.filter').attr('title',filter.tooltip);
                }
            });

            me.activateFilter(function(){
                return true;
            });
        }
    }, {

        /**
         * @property {String[]} protocol
         * @static
         */
        protocol: ['Oskari.userinterface.Flyout']
    });