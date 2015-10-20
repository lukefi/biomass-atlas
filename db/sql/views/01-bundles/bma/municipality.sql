
INSERT INTO portti_bundle (name, startup) 
       VALUES ('municipality','{}');

UPDATE portti_bundle set startup = '{
    "title": "municipality",
    "bundleinstancename": "municipality",
    "bundlename": "municipality",
    "metadata": {
        "Import-Bundle": {
            "municipality": {
                "bundlePath": "/Oskari/packages/bma/bundle/"
            }
        }
    }
}' WHERE name = 'municipality';
