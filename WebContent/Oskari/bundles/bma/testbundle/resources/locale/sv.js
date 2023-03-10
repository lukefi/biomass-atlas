Oskari.registerLocalization({
    "lang": "sv",
    "key": "TestBundle",
    "value": {
    	"toolbarTooltip": "Fri kontur: Rita område till kartan och räkna dess biomassa",
    	"flyout": {
    		"title": "Fri kontur",
    		"chooseAreaType": "Rita område till kartan. Applikationen kommer att beräkna dess biomassa. Börja ritningen genom att klicka på kartan och avsluta den genom att dubbelklicka.",    		
    		"quit": "Avsluta",
    		"biomassType": "Biomassa typ",
    		"amount": "Mängd",
    		"selectedArea": "Valt område",
    		"saveResults": "Spara resultaten",
    		"showNutrients": "Visa näringsämnen",
    		"yes": "Ja",
    		"no": "Nej",
    		"showNutrientTooltip": "Näringskoncentrationerna baseras på mängden av biomassa och på koefficienterna från litteraturen och expertberäkningar. Koefficienterna är konstanta i hela Finland och är i genomsnitt över egenskaperna hos flera olika biomassor. <br><br>Näringstabeller kommer att publiceras senare och en referens hittas här när den är tillgänglig.",
    		"infoIcon": {
    			"title": "Regionens biomassa sammanfattning",
    			"description": "Beräkning sker baserat på ritningsområde och valda kartlager. " +
    					"Data är i 1 km x 1 km rutnät i biomassskikt. Om ett rutcentrum är inuti polygonen ritad av användaren kommer rutan att inkluderas i sammanfattning."
    		},
    		"error": {
    			"smallAreaSelected": "Den valda regionen är för liten jämfört med nätupplösningen. Resultatfel marginalen kan vara stor.",
    			"notEnoughPoints": "Minst tre hörn måste väljas. Försök igen."
    		}
    	}
    }
});
