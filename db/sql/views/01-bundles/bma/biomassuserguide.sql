INSERT INTO portti_bundle (name, config, startup) 
       VALUES ('biomassuserguide','{}', '{}');
	   
UPDATE portti_bundle set startup = '{
    "title": "biomassuserguide",
    "bundleinstancename": "biomassuserguide",
    "bundlename": "biomassuserguide",
    "metadata": {
        "Import-Bundle": {
            "biomassuserguide": {
                "bundlePath": "/Oskari/packages/bma/bundle/"
            }
        }
    }
}' WHERE name = 'biomassuserguide';

UPDATE portti_bundle set config = '{
   	"tags" : "userguide",
    "flyoutClazz" : "Oskari.bma.bundle.biomassuserguide.Flyout"
}' WHERE name = 'biomassuserguide';