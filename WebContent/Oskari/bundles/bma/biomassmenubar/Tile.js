/*
 * @class Oskari.bma.bundle.biomassmenubar.Tile
 *
 * Renders the "biomassmenubar" tile.
 */
Oskari.clazz.define('Oskari.bma.bundle.biomassmenubar.Tile',

    /**
     * @static @method create called automatically on construction
     *
     * @param {Oskari.bma.bundle.biomassmenubar.BiomassMenubarInstance} instance
     * Reference to component that created the tile
     *
     */
    function (instance) {
        this.instance = instance;
        this.container = null;
        this.template = null;
    }, {
        /**
         * @method getName
         * @return {String} the name for the component
         */
        getName: function () {
            return 'Oskari.bma.bundle.biomassmenubar.Tile';
        },
        /**
         * @method setEl
         * @param {Object} el
         *      reference to the container in browser
         * @param {Number} width
         *      container size(?) - not used
         * @param {Number} height
         *      container size(?) - not used
         *
         * Interface method implementation
         */
        setEl: function (el, width, height) {
            this.container = jQuery(el);
        },
        /**
         * @method startPlugin
         * Interface method implementation, calls #refresh()
         */
        startPlugin: function () {
            this.refresh();
        },
        /**
         * @method stopPlugin
         * Interface method implementation, clears the container
         */
        stopPlugin: function () {
            this.container.empty();
        },
        /**
         * @method getTitle
         * @return {String} localized text for the title of the tile
         */
        getTitle: function () {
            return this.instance.getLocalization('title');
        },
        /**
         * @method getDescription
         * @return {String} localized text for the description of the tile
         */
        getDescription: function () {
            return this.instance.getLocalization('desc');
        },
        /**
         * @method getOptions
         * Interface method implementation, does nothing atm
         */
        getOptions: function () {

        },
        /**
         * @method setState
         * @param {Object} state
         *      state that this component should use
         * Interface method implementation, does nothing atm
         */
        setState: function (state) {},
        /**
         * @method refresh
         * Creates the UI for a fresh start
         */
        refresh: function () {
            var me = this,
                instance = me.instance,
                cel = me.container,
                idEl = cel.children('.oskari-tile-title'),
                tpl = me.template,
                sandbox = instance.getSandbox();

            idEl.attr('id', 'biomass_layer_selector');
        }
    }, {
        /**
         * @property {String[]} protocol
         * @static
         */
        protocol: ['Oskari.userinterface.Tile']
    }
);
