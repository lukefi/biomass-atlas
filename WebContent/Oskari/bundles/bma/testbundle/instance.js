/**
 * @class Oskari.bma.bundle.testbundle.TestbundleInstance
 *
 * This bundle does nothing but displays an alert
 */
Oskari.clazz.define("Oskari.bma.bundle.testbundle.TestbundleInstance",

    /**
     * @method create called automatically on construction
     * @static
     */

    function () {}, {
        /**
         * @method start
         * BundleInstance protocol method
         */
        start: function () {
            //alert('Tämä biomassa-atlaksen testi-bundle toimii!');
        },

        /**
         * @method stop
         * BundleInstance protocol method
         */
        stop: function () {},
        /**
         * @method update
         * BundleInstance protocol method
         */
        update: function () {}
    }, {
        protocol: ['Oskari.bundle.BundleInstance']
    });
