-- It is only possible to define "selectedLayers" in the view configuration. This is a workaround to make most of them not selected.
-- TODO: Extend Oskari to allow adding layers without making them selected

update portti_view_bundle_seq set state =
'{"east":"517620","selectedLayers":[{"id":' || (select id from oskari_maplayer where name = 'osm_finland:osm-finland') || '}],"north":"6874042","zoom":1}'
where bundleinstance = 'mapfull';
