CREATE OR REPLACE VIEW biomass_for_geoserver AS 
 SELECT 'bma-' || d.id AS fid,
    c.geometry,
    c.grid_id,
    d.attribute_id,
    a.fi,
    d.validity_id,
    d.value
   FROM biomass_data d,
    grid_cell c,
    attribute a
  WHERE d.attribute_id = a.id AND d.cell_id = c.id;
