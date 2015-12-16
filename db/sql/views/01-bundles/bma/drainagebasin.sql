
INSERT INTO portti_bundle (name, startup) 
       VALUES ('drainagebasin','{}');

UPDATE portti_bundle set startup = '{
    "title": "drainagebasin",
    "bundleinstancename": "drainagebasin",
    "bundlename": "drainagebasin",
    "metadata": {
        "Import-Bundle": {
            "drainagebasin": {
                "bundlePath": "/Oskari/packages/bma/bundle/"
            }
        }
    }
}' WHERE name = 'drainagebasin';
