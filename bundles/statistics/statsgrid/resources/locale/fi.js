Oskari.registerLocalization(
{
    "lang": "fi",
    "key": "StatsGrid",
    "value": {
        "title": "Patio",
        "desc": "",
        "tile": {
            "title": "Teemakartat"
        },
        "view": {
            "title": "Patio",
            "message": "patiopoc"
        },
        "tab": {
            "title": "Indikaattorit",
            "description": "Omat indikaattorit",
            "grid": {
                "name": "Otsikko",
                "description": "Kuvaus",
                "organization": "Tietolähde",
                "year": "Vuosi",
                "delete": "Poista"
            },
            "deleteTitle": "Indikaattorin poistaminen",
            "destroyIndicator": "Poista",
            "cancelDelete": "Peruuta",
            "confirmDelete": "Haluatko varmasti poistaa indikaattorin",
            "newIndicator": "Uusi indikaattori",
            "error": {
                "title": "Virhe",
                "indicatorsError": "Virhe indikaattorien latauksessa. Yritä myöhemmin uudelleen",
                "indicatorError": "Virhe indikaattorin latauksessa. Yritä myöhemmin uudelleen",
                "indicatorDeleteError": "Virhe indikaattorin poistossa. Yritä myöhemmin uudelleen"
            }
        },
        "gender": "Sukupuoli",
        "genders": {
            "male": "miehet",
            "female": "naiset",
            "total": "yhteensä"
        },
        "addColumn": "Hae aineisto",
        "removeColumn": "Poista",
        "indicators": "Indikaattori",
        "cannotDisplayIndicator": "Indikaattorilla ei ole arvoja valitsemallasi aluejaolla, joten sitä ei voida näyttää taulukossa.",
        "availableRegions": "Arvot löytyvät seuraaville aluejaoille:",
        "year": "Vuosi",
        "buttons": {
            "ok": "OK",
            "cancel": "Peruuta",
            "filter": "Suodata"
        },
        "stats": {
            "municipality": "Kunta",
            "code": "Koodi",
            "errorTitle": "Virhe",
            "regionDataError": "Kuntatietojen haussa tapahtui virhe. Yritä myöhemmin uudelleen.",
            "regionDataXHRError": "Aineistoon ei saatu yhteyttä. Yritä myöhemmin uudelleen.",
            "indicatorsDataError": "Indikaattorin haussa tapahtui virhe. Yritä myöhemmin uudelleen.",
            "indicatorsDataXHRError": "Aineistoon ei saatu yhteyttä. Yritä myöhemmin uudelleen.",
            "indicatorMetaError": "Indikaattorin metatietojen haussa tapahtu virhe. Yritä myöhemmin uudelleen.",
            "indicatorMetaXHRError": "Aineistoon ei saatu yhteyttä. Yritä myöhemmin uudelleen.",
            "indicatorDataError": "Indikaattorin tietojen haussa tapahtui virhe. Yritä myöhemmin uudelleen.",
            "indicatorDataXHRError": "Aineistoon ei saatu yhteyttä. Yritä myöhemmin uudelleen.",
            "descriptionTitle": "Indikaattorin kuvaus",
            "sourceTitle": "Indikaattorin lähde"
        },
        "classify": {
            "classify": "Luokittelu",
            "classifymethod": "Luokittelutapa",
            "classes": "Luokkajako",
            "jenks": "Luonnolliset välit",
            "quantile": "Kvantiilit",
            "eqinterval": "Tasavälit",
            "manual": "Luokittelu käsin",
            "manualPlaceholder": "Erota luvut pilkuilla.",
            "manualRangeError": "Luokkarajojen tulee olla lukuja välillä {min} - {max}.  Anna luokkarajat uudelleen pilkulla erotettuina lukuina. Desimaalierottimena toimii piste.",
            "nanError": "Antamasi arvo ei ole luku. Anna luokkarajat uudelleen pilkulla erotettuina lukuina. Desimaalierottimena toimii piste.",
            "infoTitle": "Luokittelu käsin",
            "info": "Anna luokkarajat lukuina erotettuna pilkulla toisistaan. Desimaalierottimena toimii piste. Esimerkiksi syöttämällä \"0, 10.5, 24, 30.2, 57, 73.1\" saat viisi luokkaa, joiden arvot ovat välillä \"0-10,5\", \"10,5-24\", \"24-30,2\", \"30,2-57\" ja \"57-73,1\". Indikaattorin arvoja, jotka ovat pienempiä kuin alin luokkaraja (esimerkissä 0) tai suurempia kuin ylin luokkaraja (73,1), ei näytetä kartalla. Luokkarajojen on oltava indikaattorin pienimmän ja suurimman arvon välillä.",
            "mode": "Luokkarajojen jatkuvuus",
            "modes": {
                "distinct": "Jatkuva",
                "discontinuous": "Epäjatkuva"
            }
        },
        "colorset": {
            "button": "Värit",
            "flipButton": "Käännä värit",
            "themeselection": "Luokkien värien valinta",
            "setselection": "Jakauman tyyppi",
            "sequential": "Kvantitatiivinen",
            "qualitative": "Kvalitatiivinen",
            "divergent": "Jakautuva",
            "info2": "Valitse värit klikkaamalla hiirellä haluamaasi väriryhmää",
            "cancel": "Poistu"
        },
        "statistic": {
            "title": "Tunnusluvut",
            "avg": "Keskiarvo",
            "max": "Suurin arvo",
            "mde": "Moodi",
            "mdn": "Mediaani",
            "min": "Pienin arvo",
            "std": "Keskihajonta",
            "sum": "Summa",
            "tooltip": {
                "avg": "Keskiarvo indikaattorissa esiintyvistä arvoista.",
                "max": "Suurin indikaattorissa esiintyvä arvo.",
                "mde": "Yleisin indikaattorissa esiintyvä arvo.",
                "mdn": "Järjestyksessä keskimmäinen arvo indikaattorissa esiintyvistä arvoista.",
                "min": "Pienin indikaattorissa esiintyvä arvo.",
                "std": "Indikaattorin arvojen keskimääräinen poikkeama keskiarvosta.",
                "sum": "Indikaattorin arvojen yhteenlaskettu summa."
            }
        },
        "baseInfoTitle": "Tunnistetiedot",
        "dataTitle": "Aineisto",
        "noIndicatorData": "Indikaattoria ei voi tarkastella tässä aluejaossa.",
        "values": "arvoa",
        "included": "Arvot",
        "municipality": "Kunnat",
        "selectRows": "Valitse rivit",
        "select4Municipalities": "Valitse vähintään kaksi aluetta tarkasteluun.",
        "showSelected": "Näytä vain valitut alueet taulukossa",
        "not_included": "Ei valittuna",
        "noMatch": "Indikaattoria ei löytynyt.",
        "selectIndicator": "Valitse indikaattori",
        "noDataSource": "Tietolähdettä ei löytynyt",
        "selectDataSource": "Valitse tietolähde",
        "filterTitle": "Suodata sarakkeen arvoja",
        "indicatorFilterDesc": "Suodattamalla halutut tilastoyksiköt korostuvat taulukossa. Voit asettaa suodatuksen jokaiselle sarakkeelle erikseen.",
        "filterIndicator": "Muuttuja:",
        "filterCondition": "Ehto:",
        "filterSelectCondition": "Valitse ehto",
        "filterGT": "Suurempi kuin (>)",
        "filterGTOE": "Suurempi tai yhtäsuuri kuin (>=)",
        "filterE": "Yhtäsuuri kuin (=)",
        "filterLTOE": "Pienempi tai yhtäsuuri kuin (<=)",
        "filterLT": "Pienempi kuin (<)",
        "filterBetween": "Arvoväli (poissulkeva)",
        "filter": "Suodata",
        "filterByValue": "Arvoilla",
        "filterByRegion": "Alueilla",
        "selectRegionCategory": "Aluejako:",
        "regionCatPlaceholder": "Valitse aluejako",
        "selectRegion": "Alue:",
        "chosenRegionText": "Valitse alueita",
        "noRegionFound": "Aluetta ei löytynyt",
        "regionCategories": {
            "title": "Aluejaot",
            "ERVA": "ERVA-alueet",
            "ELY-KESKUS": "ELY-alueet",
            "KUNTA": "Kunta",
            "ALUEHALLINTOVIRASTO": "Aluehallintovirasto",
            "MAAKUNTA": "Maakunta",
            "NUTS1": "Manner-Suomi ja Ahvenanmaa",
            "SAIRAANHOITOPIIRI": "Sairaanhoitopiiri",
            "SEUTUKUNTA": "Seutukunta",
            "SUURALUE": "Suuralue"
        },
        "addDataButton": "Lisää uusi",
        "addDataTitle": "Lisää uusi indikaattori",
        "openImportDialogTip": "Tuo arvot leikepöydältä.",
        "openImportDataButton": "Tuo arvot",
        "addDataMetaTitle": "Otsikko",
        "addDataMetaTitlePH": "Indikaattorin otsikko",
        "addDataMetaSources": "Lähde",
        "addDataMetaSourcesPH": "Datan lähdeviittaus",
        "addDataMetaDescription": "Kuvaus",
        "addDataMetaDescriptionPH": "Kuvaus",
        "addDataMetaReferenceLayer": "Aluejako",
        "addDataMetaYear": "Vuosi",
        "addDataMetaYearPH": "Tiedot ovat vuodelta",
        "addDataMetaPublicity": "Julkaistavissa",
        "municipalityHeader": "Kunnat",
        "dataRows": "Indikaattorin arvot alueittain",
        "municipalityPlaceHolder": "Anna arvo",
        "formEmpty": "Tyhjennä",
        "formCancel": "Peruuta",
        "formSubmit": "Tallenna",
        "cancelButton": "Peruuta",
        "clearImportDataButton": "Tyhjennä aineistorivit",
        "importDataButton": "Lisää",
        "popupTitle": "Tuo arvot",
        "importDataDescription": "Kopioi alueet (nimi tai tunnus) sekä niitä vastaavat arvot alla olevaan tekstikenttään. Erota kunta ja arvo toisistaan joko tabulaattorilla, kaksoispisteellä tai pilkulla. Kirjaa jokainen kunta omalle rivilleen.  \r\nEsimerkki 1: Alajärvi, 1234 \r\nEsimerkki 2: 009   2100",
        "failedSubmit": "Lisää indikaattorin metatiedot:",
        "connectionProblem": "Antamiasi tietoja ei voitu tallentaa yhteysongelmien takia.",
        "parsedDataInfo": "Tuotuja alueita oli yhteensä",
        "parsedDataUnrecognized": "Tunnistamattomia alueita",
        "loginToSaveIndicator": "Tallentaaksesi oman indikaattorin sinun on kirjauduttava sisään palveluun."
    }
}
);