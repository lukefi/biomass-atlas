
INSERT INTO portti_bundle (name, startup) 
       VALUES ('welcometour','{}');

UPDATE portti_bundle set startup = '{
    "title": "welcometour",
    "bundleinstancename": "welcometour",
    "bundlename": "welcometour",
    "metadata": {
        "Import-Bundle": {
            "welcometour": {
                "bundlePath": "/Oskari/packages/bma/bundle/"
            }
        }
    }
}' WHERE name = 'welcometour';