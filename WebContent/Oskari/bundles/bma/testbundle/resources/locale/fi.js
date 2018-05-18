Oskari.registerLocalization({
    "lang": "fi",
    "key": "TestBundle",
    "value": {
    	"toolbarTooltip": "Vapaa aluerajaus: Piirrä alue kartalle ja laske sen biomassa",
    	"flyout": {
    		"title": "Vapaa aluerajaus",
    		"chooseAreaType": "Piirrä alue kartalle ja sovellus laskee biomassan. Aloita piirto klikkaamalla ja päätä se kaksoisklikkaukseen.",    		
    		"quit": "Lopeta",
    		"biomassType": "Biomassan tyyppi",
    		"amount": "Määrä",
    		"selectedArea": "Valittu alue",
    		"saveResults": "Tallenna tulokset",    		
    		"infoIcon": {
    			"title": "Alueen biomassan laskenta",
    			"description": "Laskenta suoritetaan piirretyn alueen ja valittujen karttatasojen perusteella. " +
    					"Biomassatasoille tiedot on arvioitu 1 km x 1 km kokoiselle ruudukolle. Laskennassa käyttäjän " +
    					"piirtämää aluetta verrataan biomassatason ruudukkoon ja mikäli yksittäisen ruudun keskipiste " +
    					"sijaitsee piirretyn alueen sisällä, huomioidaan ao. ruudun tieto laskennassa."
    		},
    		"error": {
    			"smallAreaSelected": "Valittu alue on laskentatarkkuuteen nähden liian pieni, jolloin tuloksen virhe voi olla iso.",
    			"notEnoughPoints": "Vähintään kolme kulmapistettä on valittava, yritä uudelleen."
    		}
    	}
    }
});
