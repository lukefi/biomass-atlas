
INSERT INTO portti_bundle (name, startup) 
       VALUES ('polygonsearch','{}');

UPDATE portti_bundle set startup = '{
    "title": "polygonsearch",
    "bundleinstancename": "polygonsearch",
    "bundlename": "polygonsearch",
    "metadata": {
        "Import-Bundle": {
            "polygonsearch": {
                "bundlePath": "/Oskari/packages/bma/bundle/"
            }
        }
    }
}' WHERE name = 'polygonsearch';
