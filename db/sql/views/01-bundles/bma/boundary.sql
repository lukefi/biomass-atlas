
INSERT INTO portti_bundle (name, startup) 
       VALUES ('boundary','{}');

UPDATE portti_bundle set startup = '{
    "title": "boundary",
    "bundleinstancename": "boundary",
    "bundlename": "boundary",
    "metadata": {
        "Import-Bundle": {
            "boundary": {
                "bundlePath": "/Oskari/packages/bma/bundle/"
            }
        }
    }
}' WHERE name = 'boundary';
