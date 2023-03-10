/**
 * @class Oskari.mapframework.bundle.publisher.PublisherBundle
 *
 * Definition for bundle. See source for details.
 */
Oskari.clazz.define("Oskari.mapframework.bundle.publisher2.PublisherBundle", function () {

}, {
    "create": function () {
        var me = this;
        var inst = Oskari.clazz.create("Oskari.mapframework.bundle.publisher2.PublisherBundleInstance");

        return inst;

    },
    "update": function (manager, bundle, bi, info) {

    }
}, {

    "protocol": ["Oskari.bundle.Bundle", "Oskari.mapframework.bundle.extension.ExtensionBundle"],
    "source": {

        "scripts": [{
            "type": "text/javascript",
            "src": "../../../../bundles/framework/publisher2/instance.js"
        },
        {
            "type": "text/javascript",
            "src": "../../../../bundles/framework/publisher2/Flyout.js"
        },
        {
            "type": "text/javascript",
            "src": "../../../../bundles/framework/publisher2/service/PublisherService.js"
        },
        {
            "type": "text/javascript",
            "src": "../../../../bundles/framework/publisher2/event/MapPublishedEvent.js"
        },
        {
            "type": "text/javascript",
            "src": "../../../../bundles/framework/publisher2/event/ToolStyleChangedEvent.js"
        },
        {
            "type": "text/javascript",
            "src": "../../../../bundles/framework/publisher2/event/ToolEnabledChangedEvent.js"
        },
        {
            "type": "text/javascript",
            "src": "../../../../bundles/framework/publisher2/event/ColourSchemeChangedEvent.js"
        },
        {
            "type": "text/javascript",
            "src": "../../../../bundles/framework/publisher2/event/FontChangedEvent.js"
        },
        {
            "type": "text/javascript",
            "src": "../../../../bundles/framework/publisher2/event/LayerToolsEditModeEvent.js"
        },
        {
            "type": "text/javascript",
            "src": "../../../../bundles/framework/publisher2/view/FlyoutNotLoggedIn.js"
        },
        {
            "type": "text/javascript",
            "src": "../../../../bundles/framework/publisher2/view/FlyoutStartView.js"
        },
        {
            "type": "text/javascript",
            "src": "../../../../bundles/framework/publisher2/view/PublisherSidebar.js"
        },
        {
            "type": "text/javascript",
            "src": "../../../../bundles/framework/publisher2/view/PanelGeneralInfo.js"
        },
        {
            "type": "text/javascript",
            "src": "../../../../bundles/framework/publisher2/view/PanelMapTools.js"
        },
        {
            "type": "text/javascript",
            "src": "../../../../bundles/framework/publisher2/tools/AbstractPluginTool.js"
        },
        {
            "type": "text/javascript",
            "src": "../../../../bundles/framework/publisher2/view/PanelMapPreview.js"
        },
        {
            "type": "text/javascript",
            "src": "../../../../bundles/framework/publisher2/view/PanelMapLayers.js"
        },
        {
            "type": "text/javascript",
            "src": "../../../../bundles/framework/publisher2/view/PanelToolLayout.js"
        },
        {
            "type": "text/javascript",
            "src": "../../../../bundles/framework/publisher2/view/PanelLayout.js"
        },
        {
            "type": "text/javascript",
            "src": "../../../../bundles/framework/publisher2/tools/ScalebarTool.js"
        },
        {
            "type": "text/javascript",
            "src": "../../../../bundles/framework/publisher2/tools/ToolbarTool.js"
        },
        {
            "type": "text/javascript",
            "src": "../../../../bundles/framework/publisher2/tools/IndexMapTool.js"
        },
        {
            "type": "text/javascript",
            "src": "../../../../bundles/framework/publisher2/tools/PanButtonsTool.js"
        },
        {
            "type": "text/javascript",
            "src": "../../../../bundles/framework/publisher2/tools/ZoombarTool.js"
        },
        {
            "type": "text/javascript",
            "src": "../../../../bundles/framework/publisher2/tools/MyLocationTool.js"
        },
        {
            "type": "text/javascript",
            "src": "../../../../bundles/framework/publisher2/tools/SearchTool.js"
        },
        {
            "type": "text/javascript",
            "src": "../../../../bundles/framework/publisher2/tools/ControlsTool.js"
        },
        {
            "type": "text/javascript",
            "src": "../../../../bundles/framework/publisher2/tools/ShowStatsTableTool.js"
        },
        {
            "type": "text/javascript",
            "src": "../../../../bundles/framework/publisher2/tools/ClassifyTool.js"
        },
        {
            "type": "text/javascript",
            "src": "../../../../bundles/framework/publisher2/tools/GetInfoTool.js"
        },
        {
            "type": "text/javascript",
            "src": "../../../../bundles/framework/publisher2/tools/LogoTool.js"
        },
        {
            "type": "text/javascript",
            "src": "../../../../bundles/framework/publisher2/tools/LayerSelectionTool.js"
        },
        {
            "type": "text/javascript",
            "src": "../../../../bundles/framework/publisher2/tools/FeaturedataTool.js"
        },
        {
            "type": "text/css",
            "src": "../../../../bundles/framework/publisher2/resources/css/style.css"
        }, {
            "type": "text/javascript",
            "src": "../../../../bundles/framework/publisher2/request/PublishMapEditorRequest.js"
        }, {
            "type": "text/javascript",
            "src": "../../../../bundles/framework/publisher2/request/PublishMapEditorRequestHandler.js"
        }],

        "locales": [{
            "lang": "hy",
            "type": "text/javascript",
            "src": "../../../../bundles/framework/publisher2/resources/locale/hy.js"
        }, {
            "lang": "bg",
            "type": "text/javascript",
            "src": "../../../../bundles/framework/publisher2/resources/locale/bg.js"
        }, {
            "lang": "cs",
            "type": "text/javascript",
            "src": "../../../../bundles/framework/publisher2/resources/locale/cs.js"
        }, {
            "lang": "da",
            "type": "text/javascript",
            "src": "../../../../bundles/framework/publisher2/resources/locale/da.js"
        }, {
            "lang": "de",
            "type": "text/javascript",
            "src": "../../../../bundles/framework/publisher2/resources/locale/de.js"
        }, {
            "lang": "en",
            "type": "text/javascript",
            "src": "../../../../bundles/framework/publisher2/resources/locale/en.js"
        }, {
            "lang": "es",
            "type": "text/javascript",
            "src": "../../../../bundles/framework/publisher2/resources/locale/es.js"
        }, {
            "lang": "et",
            "type": "text/javascript",
            "src": "../../../../bundles/framework/publisher2/resources/locale/et.js"
        }, {
            "lang": "fi",
            "type": "text/javascript",
            "src": "../../../../bundles/framework/publisher2/resources/locale/fi.js"
        }, {
            "lang": "fr",
            "type": "text/javascript",
            "src": "../../../../bundles/framework/publisher2/resources/locale/fr.js"
        }, {
            "lang": "el",
            "type": "text/javascript",
            "src": "../../../../bundles/framework/publisher2/resources/locale/el.js"
        }, {
            "lang": "hr",
            "type": "text/javascript",
            "src": "../../../../bundles/framework/publisher2/resources/locale/hr.js"
        }, {
            "lang": "hu",
            "type": "text/javascript",
            "src": "../../../../bundles/framework/publisher2/resources/locale/hu.js"
        },{
            "lang" : "is",
            "type" : "text/javascript",
            "src" : "../../../../bundles/framework/publisher2/resources/locale/is.js"
        }, {
            "lang": "lv",
            "type": "text/javascript",
            "src": "../../../../bundles/framework/publisher2/resources/locale/lv.js"
        }, {
            "lang": "nb",
            "type": "text/javascript",
            "src": "../../../../bundles/framework/publisher2/resources/locale/nb.js"
        }, {
            "lang": "nl",
            "type": "text/javascript",
            "src": "../../../../bundles/framework/publisher2/resources/locale/nl.js"
        }, {
            "lang": "nn",
            "type": "text/javascript",
            "src": "../../../../bundles/framework/publisher2/resources/locale/nn.js"
        }, {
            "lang": "pl",
            "type": "text/javascript",
            "src": "../../../../bundles/framework/publisher2/resources/locale/pl.js"
        }, {
            "lang": "pt",
            "type": "text/javascript",
            "src": "../../../../bundles/framework/publisher2/resources/locale/pt.js"
        }, {
            "lang": "ro",
            "type": "text/javascript",
            "src": "../../../../bundles/framework/publisher2/resources/locale/ro.js"
        }, {
            "lang": "sr",
            "type": "text/javascript",
            "src": "../../../../bundles/framework/publisher2/resources/locale/sr.js"
        }, {
            "lang": "sl",
            "type": "text/javascript",
            "src": "../../../../bundles/framework/publisher2/resources/locale/sl.js"
        }, {
            "lang": "sk",
            "type": "text/javascript",
            "src": "../../../../bundles/framework/publisher2/resources/locale/sk.js"
        }, {
            "lang": "sq",
            "type": "text/javascript",
            "src": "../../../../bundles/framework/publisher2/resources/locale/sq.js"
        }, {
            "lang": "sv",
            "type": "text/javascript",
            "src": "../../../../bundles/framework/publisher2/resources/locale/sv.js"
        }, {
            "lang": "uk",
            "type": "text/javascript",
            "src": "../../../../bundles/framework/publisher2/resources/locale/uk.js"
        }]
    },
    "bundle": {
        "manifest": {
            "Bundle-Identifier": "publisher2",
            "Bundle-Name": "publisher2",
            "Bundle-Author": [{
                "Name": "jjk",
                "Organisation": "nls.fi",
                "Temporal": {
                    "Start": "2009",
                    "End": "2011"
                },
                "Copyleft": {
                    "License": {
                        "License-Name": "EUPL",
                        "License-Online-Resource": "http://www.paikkatietoikkuna.fi/license"
                    }
                }
            }],
            "Bundle-Name-Locale": {
                "fi": {
                    "Name": " style-1",
                    "Title": " style-1"
                },
                "en": {}
            },
            "Bundle-Version": "1.0.0",
            "Import-Namespace": ["Oskari", "jquery"],
            "Import-Bundle": {}
        }
    },

    /**
     * @static
     * @property dependencies
     */
    "dependencies": ["jquery"]

});

Oskari.bundle_manager.installBundleClass("publisher2", "Oskari.mapframework.bundle.publisher2.PublisherBundle");
