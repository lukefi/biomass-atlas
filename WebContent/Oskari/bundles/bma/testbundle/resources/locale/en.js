Oskari.registerLocalization({
    "lang": "en",
    "key": "TestBundle",
    "value": {
    	"toolbarTooltip": "Free outlining: Draw area to the map and count its biomass.",
    	"flyout": {
    		"title": "Free outlining",
    		"chooseAreaType": "Draw area to the map. The application will calculate the biomass within it. Start drawing by clicking on the map and finish it by double-clicking.",    		
    		"quit": "Quit",
    		"biomassType": "Biomass type",
    		"amount": "Amount",
    		"selectedArea": "Selected area",
    		"saveResults": "Save results",
    		"showNutrients": "Show nutrients",
    		"yes": "Yes",
    		"no": "No",
    		"showNutrientTooltip": "The nutrient concentrations are based on the amount of biomass and on the coefficients from the literature and expert estimates. The coefficients are constant throughout Finland and averaged over the properties of several different biomasses. <br><br>Nutrition tables will be published later and a reference will be added here when available.",
    		"infoIcon": {
    			"title": "Region's biomass summary",
    			"description": "Calculation is done based on drawing area and selected map layers. " +
    					"Data is in 1 km x 1 km grids in biomass layers. If a single grid centroid is inside the polygon drawn by user, the grid will be included in summary."
    		},
    		"error": {
    			"smallAreaSelected": "The selected region is too small compared to grid resolution. Results error marginal might be big.",
    			"notEnoughPoints": "At least three vertices must be selected. Try again."
    		}
    	}
    }
});
