
INSERT INTO portti_bundle (name, startup) 
       VALUES ('testbundle','{}');

UPDATE portti_bundle set startup = '{
    "title": "testbundle",
    "bundleinstancename": "testbundle",
    "bundlename": "testbundle",
    "metadata": {
        "Import-Bundle": {
            "testbundle": {
                "bundlePath": "/Oskari/packages/bma/bundle/"
            }
        }
    }
}' WHERE name = 'testbundle';
