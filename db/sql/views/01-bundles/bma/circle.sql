
INSERT INTO portti_bundle (name, startup) 
       VALUES ('circle','{}');

UPDATE portti_bundle set startup = '{
    "title": "circle",
    "bundleinstancename": "circle",
    "bundlename": "circle",
    "metadata": {
        "Import-Bundle": {
            "circle": {
                "bundlePath": "/Oskari/packages/bma/bundle/"
            }
        }
    }
}' WHERE name = 'circle';
