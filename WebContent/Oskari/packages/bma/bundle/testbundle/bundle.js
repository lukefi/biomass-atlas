/**
 * Definition for bundle. See source for details.
 *
 * @class Oskari.<mynamespace>.bundle.<bundle-identifier>.MyBundle
 */
Oskari.clazz.define("Oskari.bma.bundle.testbundle.TestbundleInstance",

/**
 * Called automatically on construction. At this stage bundle sources have been
 * loaded, if bundle is loaded dynamically.
 *
 * @contructor
 * @static
 */
function() {

}, {
    /*
     * called when a bundle instance will be created
     *
     * @method create
     */
    "create" : function() {
        return Oskari.clazz.create("Oskari.bma.bundle.testbundle.TestbundleInstance");
    },
    /**
     * Called by Bundle Manager to provide state information to
     *
     * @method update
     * bundle
     */
    "update" : function(manager, bundle, bi, info) {
    }
},

/**
 * metadata
 */
{
    "protocol" : ["Oskari.bundle.Bundle"],
    "source" : {
        "scripts" : [{
            "type" : "text/javascript",
            "src" : "../../../../bundles/bma/testbundle/instance.js"
        },
        {
			"type" : "text/javascript",
			"src" : "../../../../bundles/bma/testbundle/Flyout.js"
		},
        {
			"type" : "text/css",
			"src" : "../../../../bundles/bma/testbundle/resources/css/style.css"
		}],
        "locales" : [{
            "lang" : "en",
            "type" : "text/javascript",
            "src" : "../../../../bundles/bma/testbundle/resources/locale/en.js"
        },
        {
            "lang" : "fi",
            "type" : "text/javascript",
            "src" : "../../../../bundles/bma/testbundle/resources/locale/fi.js"
        }]
    },
    "bundle" : {
        "manifest" : {
            "Bundle-Identifier" : "testbundle",
            "Bundle-Name" : "testbundle",
            "Bundle-Author" : [{
                "Name" : "hp",
                "Organisation" : "luke.fi",
                "Temporal" : {
                    "Start" : "2015",
                    "End" : "2051"
                },
                "Copyleft" : {
                    "License" : {
                        "License-Name" : "EUPL",
                        "License-Online-Resource" : "http://www.paikkatietoikkuna.fi/license"
                    }
                }
            }],
            "Bundle-Name-Locale" : {
                "fi" : {
                    "Name" : " style-1",
                    "Title" : " style-1"
                },
                "en" : {}
            },
            "Bundle-Version" : "1.0.0",
            "Import-Namespace" : ["Oskari"],
            "Import-Bundle" : {}
        }
    },

    /**
     * @static
     * @property dependencies
     */
    "dependencies" : []
});

// Install this bundle by instantating the Bundle Class
Oskari.bundle_manager.installBundleClass("testbundle", "Oskari.bma.bundle.testbundle.TestbundleInstance");
