INSERT INTO portti_bundle (name, startup) 
       VALUES ('biomassmenubar','{}');
	   
UPDATE portti_bundle set startup = '{
    "title": "biomassmenubar",
    "bundleinstancename": "biomassmenubar",
    "bundlename": "biomassmenubar",
    "metadata": {
        "Import-Bundle": {
            "biomassmenubar": {
                "bundlePath": "/Oskari/packages/bma/bundle/"
            }
        }
    }
}' WHERE name = 'biomassmenubar';