Oskari.registerLocalization({
    "lang": "en",
    "key": "Circle",
    "value": {
    	"toolbarTooltip": "The centre of a circle or road network: Define a central point and count biomass surrounding the centroid within a chosen radius.",
    	"flyout": {
    		"title": "The centre of a circle or road network",
    		"message": "Define first the central point and set the distance (in km) from which the biomass is calculated. Maximum distance along roads can be 65 km.",
    		"point": "Point",
    		"radius": "Distance",
    		"back": "Back",
    		"calculate": "Calculate",
    		"quit": "Quit",
    		"biomassType": "Biomass type",
    		"amount": "Amount",
    		"selectedArea": "Selected area",
    		"saveResults": "Save results",
    		"showNutrients": "Show nutrients",
    		"yes": "Yes",
    		"no": "No",
    		"roadExtraInformation": "Km search area within a radius or along a road network. In case the search area is formed along a road network, it is always smaller than the distance as the crow flies. Here the distances are more realistically taken into account and e.g. road free areas (e.g. water systems) are taken into account in the definition of the area.",
    		"selectionType": {
    			"circle": "Distance as a circle radius (as the crow flies)",
    			"road": "Distance along a road network (accessability)"    			
    		},
    		"selectionTypeInfo": {
    			"title": {
    				"circle": "Biomass calculation within a given radius (as the crow flies)",
	    			"road": "Biomass calculation within a given distance along the road network"	    			
    			},
    			"description": {
    				"circle": "The radius is drawn from the selected centroid to form a circle for biomass search area. Biomass data is on a 1 km x 1km grid. If a grid centroid is within the circle, its value is summarised to biomass in the area.",
	    			"road": "For the selected centroid the closest location in the road network is searched. Then the road network dataset is used to form a road network around the centroid at the given distance. Biomass is in 1 km x 1 km grid. If the selected road network cuts a grid, its data is included into the biomass summary. The road data for the analysis is the Finnish national <a href=https://www.liikennevirasto.fi/web/en/open-data/digiroad#.WvlgHocUmdI target='_blank'>Digiroad data</a>."	    			
    			}
    		},
    		"error": {
    			"roadRouteExceed": "Max 65 km radius for road network calculation is allowed. (temporary restriction).",
    			"radiusNotNumber": "Type radius as numbers in kilometers."
    		}
    	}
    }
});
