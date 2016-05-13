Oskari.registerLocalization({
    "lang": "en",
    "key": "Circle",
    "value": {
    	"toolbarTooltip": "Vapaa-aluehaku: määritä keskipiste ja laske valittujen tasojen biomassa alueelta (en)",
    	"flyout": {
    		"title": "Keskipistehaku",
    		"message": "Valitse ensin alueen keskipiste kartalta ja määrittele sen jälkeen etäisyys, jolta biomassa lasketaan.",
    		"point": "Piste",
    		"radius": "Etäisyys",
    		"back": "Takaisin",
    		"calculate": "Laske",
    		"quit": "Lopeta",
    		"biomassType": "Biomassan tyyppi",
    		"amount": "Määrä",
    		"saveResults": "Tallenna tulokset",
    		"roadExtraInformation": "km hakualue säteenä tai tieverkostoa pitkin. Mikäli hakualue muodostetaan tieverkostoa pitkin on se aina pienempi kuin linnuntie-etäisyys. Tällöin etäisyydet huomioidaan realistisemmin ja esimerkiksi tiettömät alueet (vesistöt) huomioidaan alueen määrittelyssä.",
    		"selectionType": {
    			"circle": "Etäisyys ympyrän säteenä (linnuntien etäisyys)",
    			"road": "Etäisyys tieverkostoa pitkin (saavutettavuus)"    			
    		},
    		"selectionTypeInfo": {
    			"title": {
    				"circle": "Biomassan laskenta määritellyltä etäisyydeltä linnuntietä",
	    			"road": "Biomassan laskenta määritellyltä etäisyydeltä tieverkostoa pitkin"	    			
    			},
    			"description": {
    				"circle": "Valitusta keskipisteestä piirretään annetun etäisyyden perusteella säde jonka perusteella muodostetaan ympyrän muotoinen hakualue. Biomassatasoille tiedot on arvioitu 1 km x 1 km kokoiselle ruudukolle. Mikäli yksittäisen ruudun keskipiste osuu ympyrän muotoisen hakualueen sisälle, huomioidaan ao. ruudun tiedot laskennassa.",
	    			"road": "Valitusta keskipisteen perusteella etsitään ensin lähin sijainti tieverkostosta. Tämän jälkeen tieverkostoa pitkin muodostetaan jokaiseen mahdolliseen suuntaan annetun etäisyyden perusteella monitahoinen verkosto. Biomassatasoille tiedot on arvioitu 1 km x 1 km kokoiselle ruudukolle. Mikäli muodostettu verkosto leikkaa yksittäistä ruutua, sen tiedot huomioidaan laskennassa. Analyysin tieaineistona käytetään kansallista digiroad-aineistoa (<a href='http://www.digiroad.fi/fi_FI/' target='_blank'>http://www.digiroad.fi/fi_FI/</a>)."	    			
    			}
    		},
    		"error": {
    			"roadRouteExceed": "Tiereittiä pitkin laskettaessa säde saa olla korkeintaan 65 km. (väliaikainen rajoitus).",
    			"radiusNotNumber": "Kirjoita säteen arvo numeroina."
    		}
    	}
    }
});
