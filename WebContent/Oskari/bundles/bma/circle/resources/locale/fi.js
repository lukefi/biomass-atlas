Oskari.registerLocalization({
    "lang": "fi",
    "key": "Circle",
    "value": {
    	"toolbarTooltip": "Keskipistehaku: Määritä keskipiste ja laske biomassa sen ympäriltä haluamallasi säteellä",
    	"flyout": {
    		"title": "Keskipistehaku",
    		"message": "Valitse ensin alueen keskipiste kartalta ja määrittele sen jälkeen etäisyys, jolta biomassa lasketaan. Maksimietäisyys tieverkkoa pitkin voi olla 65 km.",
    		"point": "Piste",
    		"radius": "Etäisyys",
    		"back": "Takaisin",
    		"calculate": "Laske",
    		"quit": "Lopeta",
    		"biomassType": "Biomassan tyyppi",
    		"amount": "Määrä",
    		"selectedArea": "Valittu alue",
    		"saveResults": "Tallenna tulokset",
    		"showNutrients": "Näytä ravinteet",
    		"yes": "Kyllä",
    		"no": "Ei",
    		"showNutrientTooltip": "Ravinnepitoisuudet perustuvat biomassan määrään ja kirjallisuudesta ja asiantuntija-arvioina valittuihin kertoimiin, jotka ovat vakioita kautta Suomen ja keskiarvoja useiden eri massojen ominaisuuksista. <br><br>Ravinnetaulukot julkaistaan myöhemmin, ja viite niihin lisätään tänne, kun se on saatavilla.",
    		"roadExtraInformation": "Km hakualue säteenä tai tieverkostoa pitkin. Mikäli hakualue muodostetaan tieverkostoa pitkin on se aina pienempi kuin linnuntie-etäisyys. Tällöin etäisyydet huomioidaan realistisemmin ja esimerkiksi tiettömät alueet (vesistöt) huomioidaan alueen määrittelyssä.",
    		"selectionType": {
    			"circle": "Etäisyys ympyrän säteenä (linnuntie-etäisyys)",
    			"road": "Etäisyys tieverkostoa pitkin (saavutettavuus)"    			
    		},
    		"selectionTypeInfo": {
    			"title": {
    				"circle": "Biomassan laskenta määritellyltä etäisyydeltä linnuntietä",
	    			"road": "Biomassan laskenta määritellyltä etäisyydeltä tieverkostoa pitkin"	    			
    			},
    			"description": {
    				"circle": "Valitusta keskipisteestä piirretään annetun etäisyyden perusteella säde, jonka perusteella muodostetaan ympyrän muotoinen hakualue. Biomassatasoille tiedot on arvioitu 1 km x 1 km kokoiselle ruudukolle. Mikäli yksittäisen ruudun keskipiste osuu ympyrän muotoisen hakualueen sisälle, huomioidaan ao. ruudun tiedot laskennassa.",
	    			"road": "Valitun keskipisteen perusteella etsitään ensin lähin sijainti tieverkostosta. Tämän jälkeen tieverkostoa pitkin muodostetaan jokaiseen mahdolliseen suuntaan annetun etäisyyden perusteella monitahoinen verkosto. Biomassatasoille tiedot on arvioitu 1 km x 1 km kokoiselle ruudukolle. Mikäli muodostettu verkosto leikkaa yksittäistä ruutua, sen tiedot huomioidaan laskennassa. Analyysin tieaineistona käytetään kansallista <a href=https://www.liikennevirasto.fi/web/en/open-data/digiroad#.WvlgHocUmdI target='_blank'>digiroad-aineistoa</a>."	    			
    			}
    		},
    		"error": {
    			"roadRouteExceed": "Tiereittiä pitkin laskettaessa säde saa olla korkeintaan 65 km. (väliaikainen rajoitus).",
    			"radiusNotNumber": "Kirjoita säteen arvo (km) numeroina."
    		}
    	}
    }
});
