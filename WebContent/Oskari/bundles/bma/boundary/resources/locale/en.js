Oskari.registerLocalization({
    "lang": "en",
    "key": "Boundary",
    "value": {
    	"toolbarTooltip": "Area Search: Specify the area and calculate the biomass from the selected levels.",
    	"flyout": {
    		"title": "Area selection",
    		"chooseAreaType": "Biomass data can be calculated for the following predefined regions. Select the area from which biomass is calculated:",
    		"selectAll": "Select all",
    		"prev": "Previous",
    		"calculate": "Calculate",
    		"calculateMunicipality": "Calculate by municipality",
    		"quit": "Quit",
    		"biomassType": "Biomass type",
    		"amount": "Amount",
    		"selectedArea": "Selected area",
    		"saveResults": "Save results",
    		"areaType": {
    			"municipality": "Municipality",
    			"province": "Province",
    			"ely": "ELY Centre",
    			"drainageBasin": "Drainage basin",
    			"postalCode": "Postal code region"
    		},
    		"selectAreaType": {
    			"municipality": "Select from the map the municipalities from which you want to summarise biomass.",
    			"province": "Select from the map the provincies from which you want to summarise biomass.",
    			"ely": "Select from the map the ELY Centres from which you want to summarise biomass.",
    			"drainageBasin": "Select from the map the drainage basins from which you want to summarise biomass.",
    			"postalCode": "Select from the map the postal code regions from which you want to summarise biomass."
    		},
    		"areaTypeSelected": {
    			"municipality": "Selected municipalities",
    			"province": "Selected provinces",
    			"ely": "Selected ELY Centres",
    			"drainageBasin": "Selected drainage basins",
    			"postalCode": "Selected postal code regions"
    		},
    		"areaTypeInfo": {
    			"title": {
    				"municipality": "Biomass summary by municipality",
	    			"province": "Biomass summary by province",
	    			"ely": "Biomass summary by ELY Centre",
	    			"drainageBasin": "Biomass summary by drainage basin",
	    			"postalCode": "Biomass summary by post code area"
    			},
    			"description": {
    				"municipality": "Municipality data is from National Land Survey Finland 2015. Biomass layers have their data in 1 km x 1 km grid. In municipality level calculation the grids located within municipality borders are summarised to that municipality. The grids overlaying the munipality border are included in that municipality's result, where the grid centroid is located.",
    				"province": "Province data is derived from National Land Surveys municipality data 2015. Biomass data is in km x 1km grid. If a grid lays at the border of the province, its value is counted to that province, where its centroid is within.",
	    			"ely": " ELY-centre data is from National Land Survey Finland 2015. Biomass layers have their data in 1 km x 1 km grid. The grids located within ELY-centre borders are summarised to that ELY-centre. The grids overlaying the ELY-centre border are included in that ELY-centre's result, where the grid centroid is located.",
	    			"drainageBasin": "Drainage basin data is from Finnish Environment Institute, Syke. Biomass layers have their data in 1 km x 1 km grid. The grids located within drainage basin are summarised to that drainage basin. The grids overlaying the drainage basin border are included in that drainage basin's result, where the grid centroid is located.",
	    			"postalCode": "Post code areas are from Statistics Finland 2015. Biomass layers have their data in 1 km x 1 km grid. In post code area level calculation the grids located within post code area borders are summarised to that post code area. The grids overlaying the post code area border are included in that post code area 's result, where the grid centroid is located."

    			}
    		}
    	}
    }
});
