Oskari.registerLocalization(
{
    "lang": "sv",
    "key": "admin-layerselector",
    "value": {
        "title": "Kartlager",
        "desc": "",
        "flyout": {
            "title": "admin: Kartlager",
            "fetchingLayers": "Laddar lager."
        },
        "tile": {
            "title": "A: Kartlager",
            "tooltip": "."
        },
        "view": {
            "title": "",
            "prompt": "",
            "templates": {}
        },
        "errors": {
            "title": "Fel!",
            "generic": "Systemfel. Försök på nytt senare.",
            "loadFailed": "Fel i laddningen av kartlager. Ladda ned sidan på nytt i din läsare och välj kartlagren.",
            "noResults": "ökningen gav inga resultat.",
            "layerTypeNotSupported": "Typ av kartlager är inte ännu understött:",
            "not_empty": "Teman, som du försöker att ta bort, innehåller kartlager. Välj en annan tema för de här temorna."
        },
        "loading": "Laddar...",
        "filter": {
            "text": "Sök kartlager",
            "inspire": "Enligt tema",
            "organization": "Enligt dataproducent",
            "published": "Användare"
        },
        "published": {
            "organization": "Publicerad kartlager",
            "inspire": "Publicerad kartlager"
        },
        "tooltip": {
            "type-base": "Bakgrundskarta",
            "type-wms": "kartlager",
            "type-wfs": "Dataprodukt"
        },
        "backendStatus": {
            "OK": {
                "tooltip": "Kartlagret är tillgängligt just nu.",
                "iconClass": "backendstatus-ok"
            },
            "DOWN": {
                "tooltip": "Kartlagret är inte tillgängligt just nu.",
                "iconClass": "backendstatus-down"
            },
            "MAINTENANCE": {
                "tooltip": "Avbrott i kartlagrets tillgänglighet är att vänta inom de närmaste dagarna.",
                "iconClass": "backendstatus-maintenance"
            },
            "UNKNOWN": {
                "tooltip": "",
                "iconClass": "backendstatus-ok"
            }
        },
        "admin": {
            "capabilitiesLabel": "Capabilities",
            "confirmResourceKeyChange": "Du har ändrat gränssnittjänstens unik namn- eller URL-address. För säkerhets skull, nuvarande rättigheter till kartlager ska raderas. Fortsätt?",
            "confirmDeleteLayerGroup": "Kartlagergrupp blir raderad. Fortsätt?",
            "confirmDeleteLayer": "Kartlager blir raderad. Fortsätt?",
            "layertypes": {
                "wms": "WMS Lager",
                "wfs": "WFS Lager",
                "wmts": "WMTS Lager",
                "arcgis": "ArcGISCache Lager",
                "arcgis93": "ArcGISRest Lager"
            },
            "selectLayer": "Välj nivå",
            "selectSubLayer": "Välj undernivå",
            "addOrganization": "Tillägg dataproducent",
            "addOrganizationDesc": "Tillägg dataproducent dvs en ny organisation",
            "addInspire": "Tillägg ämne",
            "addInspireDesc": "Tillägg ämne dvs nytt Inspire&shy;-teema",
            "addLayer": "Tillägg lager",
            "addLayerDesc": "Tillägg lager till detta Inspire&shy;-teema",
            "edit": "Editera",
            "editDesc": "Editera namn",
            "layerType": "Lagertyp",
            "layerTypeDesc": "Lagrets typ: WMS, WFS, WMTS, ArcGis Cache and ArcGis93. Rest",
            "type": "Typ av kartnivå",
            "typePlaceholder": "Välj kartnivåns typ",
            "baseLayer": "Bakgrundsnivå",
            "groupLayer": "Gruppnivå",
            "interfaceVersion": "Gränss&shy;nittets version",
            "interfaceVersionDesc": "Gränss&shy;nittets version",
            "wms1_1_1": "WMS 1.1.1",
            "wms1_3_0": "WMS 1.3.0",
            "getInfo": "Sök data",
            "editWfs": "Editera WFS",
            "selectClass": "Välj tema",
            "selectClassDesc": "Välj tema",
            "baseName": "Bakgrundsnivåns namn",
            "groupName": "Gruppnivåns namn",
            "subLayers": "Undernivå",
            "addSubLayer": "Tillägg en undernivå",
            "editSubLayer": "Editera undernivå",
            "wmsInterfaceAddress": "Gränssnittets address",
            "wmsUrl": "Gränssnittets address eller addresser",
            "wmsInterfaceAddressDesc": "Gränssnittets URL-addresser separerat med komma",
            "wmsServiceMetaId": "Gränssnittjänstens metadata-tagg",
            "wmsServiceMetaIdDesc": "Gränssnittjänstens metadata-filtagg",
            "layerNameAndDesc": "Lagrets namn och kort beskrivning",
            "metaInfoIdDesc": "Geodata&shy;registrets metadata filtagg, som unikt identifierar metadatans XML beskrivning",
            "metaInfoId": "Metadatans filtagg",
            "wmsName": "Unik namn för kartlager",
            "wmsNameDesc": "Unik eller teknisk namn för kartlager",
            "username": "Användarsnamn",
            "password": "Lösenord",
            "attributes": "Attribut",
            "addInspireName": "Ämnets namn",
            "addInspireNameTitle": "Ämnets namn",
            "addOrganizationName": "Data&shy;producentens namn",
            "addOrganizationNameTitle": "Data&shy;producentens namn",
            "addNewClass": "Tillägg nytt tema",
            "addNewLayer": "Tillägg nytt kartlager",
            "addNewGroupLayer": "Tillägg nytt gruppnivå",
            "addNewBaseLayer": "Tillägg nytt bakgrundsnivå",
            "addNewOrganization": "Tillägg ny dataproducent",
            "addInspireTheme": "Tema",
            "addInspireThemeDesc": "Välj teman enligt InspireTheme",
            "opacity": "Opacitet",
            "opacityDesc": "Lagrets opacitet (0% gör lagret genomskinligt)",
            "style": "Förvald utseende",
            "styleDesc": "Förvald utseende",
            "minScale": "Minimi&shy;skala",
            "minScaleDesc": "Lagrets minimiskala (1:5669294)",
            "minScalePlaceholder": "5669294 (1:5669294)Lagrets minimiskala",
            "maxScale": "Maximi&shy;skala",
            "maxScaleDesc": "Lagrets maximiskala (1:1)",
            "maxScalePlaceholder": "1 (1:1) Lagrets maximiskala",
            "srsName": "Koordinatsystem",
            "srsNamePlaceholder": "Koordinatsystem",
            "legendImage": "URL adress för kartförklaringar",
            "legendImageDesc": "URL adress för kartförklaringar beskriver kartlager.",
            "legendImagePlaceholder": "Ge ett ny adress för kartförklaring.",
            "gfiContent": "Tilläggande text för GFI-dialog",
            "gfiResponseType": "GFI svartyp",
            "gfiResponseTypeDesc": "Svarets typ dvs Get Feature Info (GFI)",
            "gfiStyle": "GFI stil",
            "gfiStyleDesc": "GFI stil (XSLT)",
            "manualRefresh": "Manual refresh",
            "matrixSetId": "WMTS MatrixSetId",
            "matrixSetIdDesc": "WMTS-tjänstens MatrixSetId",
            "matrixSet": "Teknisk beskrivning av WMTS-tjänsten",
            "matrixSetDesc": "Teknisk beskrivning av WMTS-tjänsten i JSON-format",
            "realtime": "Reaaliaikataso",
            "refreshRate": "Virkistystaajuus (sekunneissa)",
            "jobTypeDesc":"Service job typ",
            "jobTypeDefault":"default",
            "jobTypes": {
                "default": "Default",
                "fe": "Feature engine"
            },
            "generic": {
                "placeholder": "Name in {0}",
                "descplaceholder": "Description in {0}"
            },
            "en": {
                "title": "En",
                "placeholder": "Name in English",
                "descplaceholder": "Description in English"
            },
            "fi": {
                "title": "Fi",
                "placeholder": "Nimi suomeksi",
                "descplaceholder": "Kuvaus suomeksi"
            },
            "sv": {
                "title": "Sv",
                "placeholder": "Namn på svenska",
                "descplaceholder": "Beskrivning på svenska"
            },
            "interfaceAddress": "Gränssnitten address",
            "interfaceAddressDesc": "Gränssnittjänstens URL utan ? och tillläggande parameter",
            "viewingRightsRoles": "Kollar rättigheter roller",
            "metadataReadFailure": "Fetching layer metadata failed.",
            "permissionFailure": "NOT TRANSLATED",
            "mandatory_field_missing": "Nödvändig uppgift:",
            "invalid_field_value": "Ogiltigt värde:",
            "operation_not_permitted_for_layer_id": "Åtgärden är inte tillåten för kartlager",
            "no_layer_with_id": "Ingen kartlagret hittades med id",
            "success": "NOT TRANSLATED",
            "errorRemoveLayer": "NOT TRANSLATED",
            "errorInsertAllreadyExists" :"NOT TRANSLATED",
            "errorRemoveGroupLayer": "NOT TRANSLATED",
            "errorSaveGroupLayer": "NOT TRANSLATED",
            "errorTitle" : "Fel",
            "warningTitle" : "Varning",
            "successTitle" : "Lagrat",
            "warning_some_of_the_layers_could_not_be_parsed":"NOT TRANSLATED"
        },
        "cancel": "Tillbaka",
        "add": "Tillägg",
        "save": "Lagra",
        "delete": "Ta bort",
        "ok": "OK"
    }
}
);