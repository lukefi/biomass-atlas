<style type="text/css">
	.selectAllIcon {
		margin-left: 10px;
		cursor: pointer;
	}
</style>

<script type="text/javascript">
$(document).ready(function () {
	var createIcon = function() {
		var icon = jQuery("<span/>");
		icon.addClass("glyphicon").addClass("glyphicon-check").addClass("selectAllIcon");
		icon.attr("title", "Valitse kaikki");
		return icon;
	};
	var toggleBoxes = function(boxes) {
		if (boxes.filter(":not(:checked)").length == 0) {
			boxes.filter(":checked").click();
		}
		else {
			boxes.filter(":not(:checked)").click();
		}
	};
	var addSelectRowFunctionality = function(table) {
		table.find("tr").each(function() {
			var row = jQuery(this);
			if (row.find("input[type='checkbox']").length == 0) {
				return;
			}
			var th = row.find("th").first();
			var icon = createIcon();
			th.append(icon);
			icon.click(function() {
				toggleBoxes(row.find("input[type='checkbox']"));
			});
		});
	};
	var addSelectColumnFunctionality = function(table) {
		table.find("tr").each(function() {
			var row = jQuery(this);
			var colIndex = 0;
			row.find("th,td").each(function() {
				var cell = jQuery(this);
				var span = cell.attr("colspan");
				if (!span) {
					span = 1;
				}
				for (var i = 0; i < span; i++) {
					cell.addClass("colIndex" + colIndex++);
				}
			});
		});
		table.find("tr").first().find("th").each(function() {
			var th = jQuery(this);
			var classes = th.prop("class").split(" ");
			var colIndexes = [];
			for (var i = 0; i < classes.length; i++) {
				var clazz = classes[i];
				if (clazz.startsWith("colIndex")) {
					colIndexes.push(clazz);
				}
			}
			var hasBox = false;
			for (var i = 0; i < colIndexes.length; i++) {
				if (table.find("." + colIndexes[i] + " input[type='checkbox']").length > 0) {
					hasBox = true;
					break;
				}
			}
			if (hasBox) {
				var icon = createIcon();
				th.append(icon);
				icon.click(function() {
					toggleBoxes(table.find("." + colIndexes[i] + " input[type='checkbox']"));
				});
			}
		});
	};
	addSelectRowFunctionality(jQuery("#forestLayerTable"));
	addSelectColumnFunctionality(jQuery("#forestLayerTable"));
});
</script>

<div id="bmaLayerContent">
	<ul class="nav nav-pills">
		<li class="active"><a data-toggle="tab" href="#potentialTabs">Biomassapotentiaalin
				mukaan</a></li>
		<li><a data-toggle="tab" href="#originTabs">Alkuperän mukaan</a></li>
		<div class='oskari-flyouttool-close icon-close icon-close'
			id="closeBmaLayerContent"></div>

	</ul>
	<div class="tab-content">
		<div id="potentialTabs" class="tab-pane fade in active">
			<ul class="nav nav-pills">
				<li class="active"><a data-toggle="tab" href="#maanpeiteLayer">Maanpeite</a></li>
				<li><a data-toggle="tab" href="#kokonaistuotantoLayer">Kokonaistuotanto</a></li>
				<li><a data-toggle="tab" href="#sivuvirtapotentiaaliTabs">Sivuvirtapotentiaali</a></li>
			</ul>
			<div class="tab-content">
				<div id="maanpeiteLayer" class="tab-pane fade in active">
				</div>
				<div id="kokonaistuotantoLayer" class="tab-pane fade">
				</div>
				<div id="sivuvirtapotentiaaliTabs" class="tab-pane fade">
					<ul class="nav nav-pills">
						<li class="active"><a data-toggle="tab" href="#sivuvirtaMetsahakeLayer">Metsähake</a></li>
						<li><a data-toggle="tab" href="#sivuvirtaYhdyskuntienBiojatteetLayer">Yhdyskuntien biojätteet</a></li>
						<li><a data-toggle="tab" href="#sivuvirtaYritystenBiojatteetLayerTabs">Yritysten toiminnassa muodostuvat biojätteet</a></li>
						<li><a data-toggle="tab" href="#sivuvirtaBiojatteetLayer">Biojätteet</a></li>
						<li><a data-toggle="tab" href="#sivuvirtaPeltokasvitLayer">Peltokasvien sivuvirrat</a></li>
						<li><a data-toggle="tab" href="#sivuvirtaLantaElainsuojaLayer">Lanta eläinsuojasta</a></li>
						<li><a data-toggle="tab" href="#sivuvirtaLantaVarastoLayer">Lanta varastosta</a></li>
					</ul>
					<div class="tab-content">
						<div id="sivuvirtaYritystenBiojatteetLayerTabs" class="tab-pane fade">
							<ul class="nav nav-pills">
								<li class="active"><a data-toggle="tab" href="#elainJaKasvijätteetLayer">Elain- ja kasvijätteet t/v 2014</a></li>
								<li><a data-toggle="tab" href="#lietteetLayer">Lietteet t/v 2015</a></li>
								<li><a data-toggle="tab" href="#paperijätteetLayer">Paperi- ja pahvijätteet t/v 2015</a></li>
								<li><a data-toggle="tab" href="#puujätteetLayer">Puujätteet t/v 2015</a></li>
								<li><a data-toggle="tab" href="#yhdyskuntienSekalainenBiohajoavaLayer">Yhdyskuntien sekalainen biohajoava jäte t/v 2015</a></li>
							</ul>
							<div class="tab-content table-responsive">
								<div id="elainJaKasvijätteetLayer" class="tab-pane fade in active">
									<table class="table table-hover table-bordered" id="elainJaKasvijätteetLayerTable">
										<tbody>
											<tr>
												<th scope="row">Maataloudessa, puutarhataloudessa, vesiviljelyssä, metsätaloudessa, metsästyksessä ja kalastuksessa syntyvät pesu- ja puhdistuslietteet</th>
												<td><input type="checkbox" name="field" value='1057'></td>	
											</tr>
											<tr>
												<th scope="row">Maataloudessa, puutarhataloudessa, vesiviljelyssä, metsätaloudessa, metsästyksessä ja kalastuksessa syntyvät eläinkudosjätteet</th>
												<td><input type="checkbox" name="field" value='1058'></td>	
											</tr>
											<tr>
												<th scope="row">Maataloudessa, puutarhataloudessa, vesiviljelyssä, metsätaloudessa, metsästyksessä ja kalastuksessa syntyvät kasvijätteet</th>
												<td><input type="checkbox" name="field" value='1059'></td>	
											</tr>
											<tr>
												<th scope="row">Eläinten ulosteet, virtsa ja lanta (likaantunut olki mukaan luettuna) sekä erikseen kootut ja muualla käsiteltävät nestemäiset jätteet</th>
												<td><input type="checkbox" name="field" value='1060'></td>
											</tr>
											<tr>
												<th scope="row">Metsätalouden jätteet</th>
												<td><input type="checkbox" name="field" value='1061'></td>
											</tr>
											<tr>
												<th scope="row">Maataloudessa, puutarhataloudessa, vesiviljelyssä, metsätaloudessa, metsästyksessä ja kalastuksessa syntyvät jätteet, joita ei ole mainittu muualla</th>
												<td><input type="checkbox" name="field" value='1062'></td>
											</tr>
											<tr>
												<th scope="row">Eläinperäisten elintarvikkeiden valmistuksessa ja jalostuksessa syntyvät jätteet pesu- ja puhdistuslietteet</th>
												<td><input type="checkbox" name="field" value='1063'></td>
											</tr>
											<tr>
												<th scope="row">Eläinperäisten elintarvikkeiden valmistuksessa ja jalostuksessa syntyvät jätteet eläinkudosjätteet</th>
												<td><input type="checkbox" name="field" value='1064'></td>
											</tr>
											<tr>
												<th scope="row">Eläinperäisten elintarvikkeiden valmistuksessa ja jalostuksessa syntyvät jätteet kulutukseen tai jalostukseen soveltumattomat aineet</th>
												<td><input type="checkbox" name="field" value='1065'></td>
											</tr>
											<tr>
												<th scope="row">Eläinperäisten elintarvikkeiden valmistuksessa ja jalostuksessa syntyvät jätteet, joita ei ole mainittu muualla</th>
												<td><input type="checkbox" name="field" value='1066'></td>
											</tr>
											<tr>
												<th scope="row">Hedelmien, vihannesten, viljojen, ruokaöljyjen, kaakaon, kahvin, teen ja tupakan valmistuksessa ja jalostuksessa, säilykkeiden valmistuksessa, hiivan ja hiivauutteen valmistuksessa sekä melassin valmistuksessa ja käymisessä syntyvät jätteet pesu-, puhdistus-, kuorinta-, sentrifugointi- ja erotuslietteet</th>
												<td><input type="checkbox" name="field" value='1067'></td>
											</tr>
											<tr>
												<th scope="row">Hedelmien, vihannesten, viljojen, ruokaöljyjen, kaakaon, kahvin, teen ja tupakan valmistuksessa ja jalostuksessa, säilykkeiden valmistuksessa, hiivan ja hiivauutteen valmistuksessa sekä melassin valmistuksessa ja käymisessä syntyvät jätteet liuotinuuton jätteet</th>
												<td><input type="checkbox" name="field" value='1068'></td>
											</tr>
											<tr>
												<th scope="row">Hedelmien, vihannesten, viljojen, ruokaöljyjen, kaakaon, kahvin, teen ja tupakan valmistuksessa ja jalostuksessa, säilykkeiden valmistuksessa, hiivan ja hiivauutteen valmistuksessa sekä melassin valmistuksessa ja käymisessä syntyvät jätteet kulutukseen tai jalostukseen soveltumattomat aineet</th>
												<td><input type="checkbox" name="field" value='1069'></td>
											</tr>
											<tr>
												<th scope="row">Hedelmien, vihannesten, viljojen, ruokaöljyjen, kaakaon, kahvin, teen ja tupakan valmistuksessa ja jalostuksessa, säilykkeiden valmistuksessa, hiivan ja hiivauutteen valmistuksessa sekä melassin valmistuksessa ja käymisessä syntyvät jätteet, joita ei ole mainittu muualla</th>
												<td><input type="checkbox" name="field" value='1070'></td>
											</tr>
											<tr>
												<th scope="row">Sokerin jalostuksessa syntyvät jätteet, joita ei ole mainittu muualla</th>
												<td><input type="checkbox" name="field" value='1071'></td>
											</tr>
											<tr>
												<th scope="row">Maidonjalostusteollisuudessa syntyvät jätteet kulutukseen tai jalostukseen soveltumattomat aineet</th>
												<td><input type="checkbox" name="field" value='1072'></td>
											</tr>
											<tr>
												<th scope="row">Maidonjalostusteollisuudessa syntyvät jätteet, joita ei ole mainittu muualla</th>
												<td><input type="checkbox" name="field" value='1073'></td>
											</tr>
											<tr>
												<th scope="row">Leipomo-, konditoria- ja makeisteollisuudessa syntyvät jätteet kulutukseen tai jalostukseen soveltumattomat aineet</th>
												<td><input type="checkbox" name="field" value='1074'></td>
											</tr>
											<tr>
												<th scope="row">Leipomo-, konditoria- ja makeisteollisuudessa syntyvät jätteet säilöntäainejätteet</th>
												<td><input type="checkbox" name="field" value='1075'></td>
											</tr>
											<tr>
												<th scope="row">Alkoholijuomien ja alkoholittomien juomien valmistuksessa (ei kahvi, tee tai kaakao) raaka-aineiden pesussa ja puhdistuksessa sekä mekaanisessa käsittelyssä syntyvät jätteet</th>
												<td><input type="checkbox" name="field" value='1076'></td>
											</tr>
											<tr>
												<th scope="row">Alkoholijuomien juomien valmistuksessa syntyvät tislausjätteet</th>
												<td><input type="checkbox" name="field" value='1077'></td>
											</tr>
											<tr>
												<th scope="row">Alkoholijuomien ja alkoholittomien juomien valmistuksessa syntyvät (ei kahvi, tee ja kaakao) kulutukseen tai jalostukseen soveltumattomat aineet</th>
												<td><input type="checkbox" name="field" value='1078'></td>
											</tr>
											<tr>
												<th scope="row">Yhdyskuntien biohajoavat keittiö- ja ruokalajätteet</th>
												<td><input type="checkbox" name="field" value='1079'></td>
											</tr>
											<tr>
												<th scope="row">Yhdyskuntien ruokaöljyt ja ravintorasvat</th>
												<td><input type="checkbox" name="field" value='1080'></td>
											</tr>
											<tr>
												<th scope="row">Yhdyskuntien biohajoavat puutarha- ja puistojätteet (myös hautausmaan hoito)</th>
												<td><input type="checkbox" name="field" value='1081'></td>
											</tr>
											<tr>
												<th scope="row">Yhdyskuntien torikaupassa syntyvät jätteet</th>
												<td><input type="checkbox" name="field" value='1082'></td>
											</tr>
										</tbody>
									</table>
								</div> <!-- elainJaKasvijätteetLayer div ends -->
							
								<div id="lietteetLayer" class="tab-pane fade">
									<table class="table table-hover table-bordered" id="lietteetLayerTable">
										<tbody>
											<tr>
												<th scope="row">Eläinperäisten elintarvikkeiden valmistuksen ja jalostuksen jätevesien käsittelyssä syntyvät lietteet</th>
												<td><input type="checkbox" name="field" value='1083'></td>	
											</tr>
											<tr>
												<th scope="row">Hedelmien, vihannesten, viljojen, ruokaöljyjen, kaakaon, kahvin, teen ja tupakan valmistuksen ja jalostuksen, säilykkeiden valmistuksen,hiivan ja hiivauutteen valmistuksen sekä melassin valmistuksen ja käymisen jätevesien käsittelyssä syntyvät lietteet</th>
												<td><input type="checkbox" name="field" value='1084'></td>	
											</tr>
											<tr>
												<th scope="row">Sokerin jalostuksen jätevesien käsittelyssä syntyvät lietteet</th>
												<td><input type="checkbox" name="field" value='1085'></td>	
											</tr>
											<tr>
												<th scope="row">Maidonjalostusteollisuuden jätevesien käsittelyssä syntyvät lietteet</th>
												<td><input type="checkbox" name="field" value='1086'></td>
											</tr>
											<tr>
												<th scope="row">Leipomo-, konditoria- ja makeisteollisuuden jätevesien käsittelyssä syntyvät lietteet</th>
												<td><input type="checkbox" name="field" value='1087'></td>
											</tr>
											<tr>
												<th scope="row">Alkoholijuomien ja alkoholittomien juomien (ei kahvi, tee tai kaakao) valmistuksen jätevesien käsittelyssä toimipaikalla syntyvät lietteet</th>
												<td><input type="checkbox" name="field" value='1088'></td>
											</tr>
											<tr>
												<th scope="row">Keräyspaperin siistauslietteet</th>
												<td><input type="checkbox" name="field" value='1089'></td>
											</tr>
											<tr>
												<th scope="row">Massojen, paperin ja kartongin valmistuksen jätevesien käsittelyssä syntyvät lietteet, ei kuitenkaan mekaanisessa erotuksessa syntyvät kuitujätteet sekä kuitu-, täyteaine- ja päällystysainelietteet</th>
												<td><input type="checkbox" name="field" value='1090'></td>
											</tr>
											<tr>
												<th scope="row">Yhdyskuntajätteiden anaerobisessa käsittelyssä syntyvä neste</th>
												<td><input type="checkbox" name="field" value='1091'></td>
											</tr>
											<tr>
												<th scope="row">Yhdyskuntajätteiden anaerobisessa käsittelyssä syntyvä liete</th>
												<td><input type="checkbox" name="field" value='1092'></td>
											</tr>
											<tr>
												<th scope="row">Eläin- ja kasvijätteiden anaerobisessa käsittelyssä syntyvä neste</th>
												<td><input type="checkbox" name="field" value='1093'></td>
											</tr>
											<tr>
												<th scope="row">Eläin- ja kasvijätteiden anaerobisessa käsittelyssä syntyvä liete</th>
												<td><input type="checkbox" name="field" value='1094'></td>
											</tr>
											<tr>
												<th scope="row">Asumisjätevesien käsittelyssä syntyvät lietteet</th>
												<td><input type="checkbox" name="field" value='1095'></td>
											</tr>
											<tr>
												<th scope="row">Asumisjätevesien käsittelyn ei stabiloitu liete</th>
												<td><input type="checkbox" name="field" value='1096'></td>
											</tr>
											<tr>
												<th scope="row">Asumisjätevesien käsittelyn lahotettu liete</th>
												<td><input type="checkbox" name="field" value='1097'></td>
											</tr>
											<tr>
												<th scope="row">Asumisjätevesien käsittelyn mädätetty liete</th>
												<td><input type="checkbox" name="field" value='1098'></td>
											</tr>
											<tr>
												<th scope="row">Asumisjätevesien käsittelyn kalkkistabiloitu liete</th>
												<td><input type="checkbox" name="field" value='1099'></td>
											</tr>
											<tr>
												<th scope="row">Asumisjätevesien käsittelyn termisesti käsitelty liete</th>
												<td><input type="checkbox" name="field" value='1100'></td>
											</tr>
											<tr>
												<th scope="row">Asumisjätevesien käsittelyssä syntyvät lietteet</th>
												<td><input type="checkbox" name="field" value='1101'></td>
											</tr>
											<tr>
												<th scope="row">Kompostoitu asumisjätevesien käsittelyssä muodostunut liete</th>
												<td><input type="checkbox" name="field" value='1102'></td>
											</tr>
											<tr>
												<th scope="row">Teollisuuden jätevesien biologisessa käsittelyssä syntyvät lietteet, jotka eivät sisällä vaarallisia aineita</th>
												<td><input type="checkbox" name="field" value='1103'></td>
											</tr>
											<tr>
												<th scope="row">Ihmisten käyttöön tai teollisuuskäyttöön tarkoitetun veden valmistuksen selkeytyksessä syntyvät lietteet</th>
												<td><input type="checkbox" name="field" value='1104'></td>
											</tr>
											<tr>
												<th scope="row">Sakokaivolietteet</th>
												<td><input type="checkbox" name="field" value='1105'></td>
											</tr>
											<tr>
												<th scope="row">Viemäreiden puhdistuksessa syntyvät jätteet</th>
												<td><input type="checkbox" name="field" value='1106'></td>
											</tr>
										</tbody>
									</table>
								</div> <!-- lietteetLayer div ends -->
							</div>	<!-- sivuvirtaYritystenBiojatteetLayerTabs tab-content ends -->
						</div> 	<!-- sivuvirtaYritystenBiojatteetLayerTabs tab-pane ends -->
					</div>	<!-- sivuvirtapotentiaaliTabs tab-content ends -->
				</div>	<!-- sivuvirtapotentiaaliTabs tab-pane ends  -->
			</div>	<!-- potentialTabs tab-content ends -->
		</div>	<!-- potentialTabs tab-pane ends -->
		
		<div id="originTabs" class="tab-pane fade">
			<ul class="nav nav-pills">
				<li class="active"><a data-toggle="tab" href="#forestLayer">Metsä</a></li>
				<li><a data-toggle="tab" href="#fieldLayer">Pelto</a></li>
			</ul>
	
			<div class="tab-content table-responsive">
				<div id="forestLayer" class="tab-pane fade in active">
					<table class="table table-hover table-bordered"
						id="forestLayerTable">
						<thead class="thead-default">
							<tr>
								<th></th>
								<th>Kuusi</th>
								<th>Lehtipuut</th>
								<th>Mänty</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<th scope="row">Elävät oksat</th>
								<td><input type="checkbox" name="forest" value='1002'></td>
								<td><input type="checkbox" name="forest" value='1009'></td>
								<td><input type="checkbox" name="forest" value='1016'></td>
							</tr>
							<tr>
								<th scope="row">Hukkapuuosa</th>
								<td><input type="checkbox" name="forest" value='1003'></td>
								<td><input type="checkbox" name="forest" value='1010'></td>
								<td><input type="checkbox" name="forest" value='1017'></td>
							</tr>
							<tr>
								<th scope="row">Juuret, d > 1 cm</th>
								<td><input type="checkbox" name="forest" value='1004'></td>
								<td><input type="checkbox" name="forest" value='1011'></td>
								<td><input type="checkbox" name="forest" value='1018'></td>
							</tr>
							<tr>
								<th scope="row">Kanto</th>
								<td><input type="checkbox" name="forest" value='1005'></td>
								<td><input type="checkbox" name="forest" value='1012'></td>
								<td><input type="checkbox" name="forest" value='1019'></td>
							</tr>
							<tr>
								<th scope="row">Kuolleet oksat</th>
								<td><input type="checkbox" name="forest" value='1006'></td>
								<td><input type="checkbox" name="forest" value='1013'></td>
								<td><input type="checkbox" name="forest" value='1020'></td>
							</tr>
							<tr>
								<th scope="row">Kuorellinen runkopuu</th>
								<td><input type="checkbox" name="forest" value='1007'></td>
								<td><input type="checkbox" name="forest" value='1014'></td>
								<td><input type="checkbox" name="forest" value='1021'></td>
							</tr>
							<tr>
								<th scope="row">Neulaset</th>
								<td><input type="checkbox" name="forest" value='1008'></td>
								<td></td>
								<td><input type="checkbox" name="forest" value='1022'></td>
							</tr>
							<tr>
								<th scope="row">Lehvästö</th>
								<td></td>
								<td><input type="checkbox" name="forest" value='1015'></td>
								<td></td>
							</tr>
						</tbody>
					</table>
				</div>	<!-- forestLayer div ends -->
				<div id="fieldLayer" class="tab-pane fade">
					<table class="table table-hover table-bordered" id="fieldLayerTable">
						<tbody>
							<tr>
								<th scope="row">Juurekset ja vihannekset</th>
								<td><input type="checkbox" name="field" value='1043'></td>
							</tr>
							<tr>
								<th scope="row">Kasvihuonekasvit</th>
								<td><input type="checkbox" name="field" value='1044'></td>
							</tr>
							<tr>
								<th scope="row">Kesanto</th>
								<td><input type="checkbox" name="field" value='1045'></td>
							</tr>
							<tr>
								<th scope="row">Kuitu- ja energiakasvit</th>
								<td><input type="checkbox" name="field" value='1046'></td>
							</tr>
							<tr>
								<th scope="row">Maisema- ja metsäpellot</th>
								<td><input type="checkbox" name="field" value='1047'></td>
							</tr>
							<tr>
								<th scope="row">Nurmi</th>
								<td><input type="checkbox" name="field" value='1048'></td>
							</tr>
							<tr>
								<th scope="row">Peruna</th>
								<td><input type="checkbox" name="field" value='1049'></td>
							</tr>
							<tr>
								<th scope="row">Siemenviljely</th>
								<td><input type="checkbox" name="field" value='1050'></td>
							</tr>
							<tr>
								<th scope="row">Sokerijuurikas</th>
								<td><input type="checkbox" name="field" value='1051'></td>
							</tr>
							<tr>
								<th scope="row">Suojavyöhyke- ja kaista</th>
								<td><input type="checkbox" name="field" value='1052'></td>
							</tr>
							<tr>
								<th scope="row">Valkuaiskasvit</th>
								<td><input type="checkbox" name="field" value='1053'></td>
							</tr>
							<tr>
								<th scope="row">Viljat</th>
								<td><input type="checkbox" name="field" value='1054'></td>
							</tr>
							<tr>
								<th scope="row">Viljelemätön</th>
								<td><input type="checkbox" name="field" value='1055'></td>
							</tr>
							<tr>
								<th scope="row">Öljykasvit</th>
								<td><input type="checkbox" name="field" value='1056'></td>
							</tr>
						</tbody>
					</table>
				</div><!-- fieldLayer div ends -->
			</div> <!-- originTab Table div ends -->
		</div> <!-- originTab ends -->
	</div> <!-- Main tab content ends -->
</div>