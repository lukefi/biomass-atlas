Oskari.registerLocalization({
    "lang": "sv",
    "key": "Circle",
    "value": {
    	"toolbarTooltip": "Sök i mitten av en cirkel eller vägnät: Definiera en central punkt och räkna biomassa kring centroid inom en vald radie",
    	"flyout": {
    		"title": "Sök i mitten av en cirkel eller vägnät",
    		"message": "Definiera först centralpunkten och sätt avståndet (i km) från vilket biomassan beräknas. Maximal avstånd längs vägar kan vara 65 km.",
    		"point": "Punkt",
    		"radius": "Avstånd",
    		"back": "Tillbaka",
    		"calculate": "Beräkna",
    		"quit": "Sluta",
    		"biomassType": "Biomassa typ",
    		"amount": "Mängd",
    		"selectedArea": "Valt område",
    		"saveResults": "Spara resultaten",
    		"roadExtraInformation": "Km sökområde inom en radie eller längs ett vägnät. Om sökområdet bildas längs ett vägnät, är det alltid mindre än avståndet fågelvägen. Här beaktas avstånden mer realistiskt och exempelvis vägfria områden (t. ex. vattensystem) beaktas i definitionen av området.",
    		"selectionType": {
    			"circle": "Avstånd som en cirkelradie (fågelvägen)",
    			"road": "Avstånd längs ett vägnät (tillgänglighet)"    			
    		},
    		"selectionTypeInfo": {
    			"title": {
    				"circle": "Biomassberäkning inom en bestämd radie (fågelvägen)",
	    			"road": "Biomassberäkning inom ett visst avstånd längs vägnätet"	    			
    			},
    			"description": {
    				"circle": "Radien dras från den valda centroiden för att bilda en cirkel för biomassans sökområde. Biomassdata finns på ett 1 km x 1 km rutnät. Om ett rutcentrum ligger inom cirkeln sammanfattas dess värde till biomassan i området.",
	    			"road": "För den valda centroiden söks den närmaste platsen i vägnätet. Därefter används vägnätets dataset för att bilda ett vägnät runt centroid vid det angivna avståndet. Biomassa är i 1 km x 1 km rutnät. Om det valda vägnätet skär en enskilda ruta, ingår dess data i sammanfattningen av biomassan. Vägdata för analysen är den finska nationella <a href=https://www.liikennevirasto.fi/web/en/open-data/digiroad#.WvlgHocUmdI target='_blank'>Digiroad-data</a>."	    			
    			}
    		},
    		"error": {
    			"roadRouteExceed": "Max 65 km radie för beräkning av vägnät är tillåten (tillfällig begränsning).",
    			"radiusNotNumber": "Skriv radie som antal i kilometer."
    		}
    	}
    }
});
