Oskari.registerLocalization({
    "lang": "en",
    "key": "Circle",
    "value": {
    	"toolbarTooltip": "The centre of the circle or road network: Define the point location and count biomass of selected layers around that point.",
    	"flyout": {
    		"title": "Centroid surroundings search",
    		"message": "Define first the location point and set the distance (in km) from which the biomass is calculated. Maximum distance along roads can be 65 km.",
    		"point": "Point",
    		"radius": "Distance",
    		"back": "Back",
    		"calculate": "Calculate",
    		"quit": "Quit",
    		"biomassType": "Biomass type",
    		"amount": "Amount",
    		"selectedArea": "Selected area",
    		"saveResults": "Save results",
    		"roadExtraInformation": "km hakualue säteenä tai tieverkostoa pitkin. Mikäli hakualue muodostetaan tieverkostoa pitkin on se aina pienempi kuin linnuntie-etäisyys. Tällöin etäisyydet huomioidaan realistisemmin ja esimerkiksi tiettömät alueet (vesistöt) huomioidaan alueen määrittelyssä.",
    		"selectionType": {
    			"circle": "Distance as circle radius (as the crow flies)",
    			"road": "Distance along road network (accessability)"    			
    		},
    		"selectionTypeInfo": {
    			"title": {
    				"circle": "Biomass calculation in given radius",
	    			"road": "Biomass calculation in a given road distance"	    			
    			},
    			"description": {
    				"circle": "The radius is draw from the selected centroid to form a circle for biomass search area. Biomass data is on a 1 km x 1km grid. If a grid centroid is within the circle, its value is summarised to biomass in the area.",
	    			"road": "For the selected centroid the closest location in the road network is searched. Then the road network dataset is used to form a road network around the centroid at the given distance. Biomass is in 1 km x 1 km grid. If the selected road network cuts a grid, its data is included into biomass summary. The road data for analysis is Finnish Digiroad data.(<a href='https://www.liikennevirasto.fi/web/en/open-data/digiroad#.WjzoPXlx3IU</a>)."	    			
    			}
    		},
    		"error": {
    			"roadRouteExceed": "Max 65 km radius for road network calculation is allowed. (Temporary restriction).",
    			"radiusNotNumber": "Type radius as numbers in kilometers."
    		}
    	}
    }
});
