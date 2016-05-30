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
		<li><a data-toggle="tab" href="#originTabs">Alkuper�n mukaan</a></li>
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
						<li class="active"><a data-toggle="tab" href="#sivuvirtaMetsahakeLayer">Mets�hake</a></li>
						<li><a data-toggle="tab" href="#sivuvirtaYhdyskuntienBiojatteetLayer">Yhdyskuntien bioj�tteet</a></li>
						<li><a data-toggle="tab" href="#sivuvirtaYritystenBiojatteetLayerTabs">Yritysten toiminnassa muodostuvat bioj�tteet</a></li>
						<li><a data-toggle="tab" href="#sivuvirtaBiojatteetLayer">Bioj�tteet</a></li>
						<li><a data-toggle="tab" href="#sivuvirtaPeltokasvitLayer">Peltokasvien sivuvirrat</a></li>
						<li><a data-toggle="tab" href="#sivuvirtaLantaElainsuojaLayer">Lanta el�insuojasta</a></li>
						<li><a data-toggle="tab" href="#sivuvirtaLantaVarastoLayer">Lanta varastosta</a></li>
					</ul>
					<div class="tab-content">
						<div id="sivuvirtaYritystenBiojatteetLayerTabs" class="tab-pane fade">
							<ul class="nav nav-pills">
								<li class="active"><a data-toggle="tab" href="#elainJaKasvij�tteetLayer">Elain- ja kasvij�tteet t/v 2014</a></li>
								<li><a data-toggle="tab" href="#lietteetLayer">Lietteet t/v 2015</a></li>
								<li><a data-toggle="tab" href="#paperij�tteetLayer">Paperi- ja pahvij�tteet t/v 2015</a></li>
								<li><a data-toggle="tab" href="#puuj�tteetLayer">Puuj�tteet t/v 2015</a></li>
								<li><a data-toggle="tab" href="#yhdyskuntienSekalainenBiohajoavaLayer">Yhdyskuntien sekalainen biohajoava j�te t/v 2015</a></li>
							</ul>
							<div class="tab-content table-responsive">
								<div id="elainJaKasvij�tteetLayer" class="tab-pane fade in active">
									<table class="table table-hover table-bordered" id="elainJaKasvij�tteetLayerTable">
										<tbody>
											<tr>
												<th scope="row">Maataloudessa, puutarhataloudessa, vesiviljelyss�, mets�taloudessa, mets�styksess� ja kalastuksessa syntyv�t pesu- ja puhdistuslietteet</th>
												<td><input type="checkbox" name="field" value='1057'></td>	
											</tr>
											<tr>
												<th scope="row">Maataloudessa, puutarhataloudessa, vesiviljelyss�, mets�taloudessa, mets�styksess� ja kalastuksessa syntyv�t el�inkudosj�tteet</th>
												<td><input type="checkbox" name="field" value='1058'></td>	
											</tr>
											<tr>
												<th scope="row">Maataloudessa, puutarhataloudessa, vesiviljelyss�, mets�taloudessa, mets�styksess� ja kalastuksessa syntyv�t kasvij�tteet</th>
												<td><input type="checkbox" name="field" value='1059'></td>	
											</tr>
											<tr>
												<th scope="row">El�inten ulosteet, virtsa ja lanta (likaantunut olki mukaan luettuna) sek� erikseen kootut ja muualla k�sitelt�v�t nestem�iset j�tteet</th>
												<td><input type="checkbox" name="field" value='1060'></td>
											</tr>
											<tr>
												<th scope="row">Mets�talouden j�tteet</th>
												<td><input type="checkbox" name="field" value='1061'></td>
											</tr>
											<tr>
												<th scope="row">Maataloudessa, puutarhataloudessa, vesiviljelyss�, mets�taloudessa, mets�styksess� ja kalastuksessa syntyv�t j�tteet, joita ei ole mainittu muualla</th>
												<td><input type="checkbox" name="field" value='1062'></td>
											</tr>
											<tr>
												<th scope="row">El�inper�isten elintarvikkeiden valmistuksessa ja jalostuksessa syntyv�t j�tteet pesu- ja puhdistuslietteet</th>
												<td><input type="checkbox" name="field" value='1063'></td>
											</tr>
											<tr>
												<th scope="row">El�inper�isten elintarvikkeiden valmistuksessa ja jalostuksessa syntyv�t j�tteet el�inkudosj�tteet</th>
												<td><input type="checkbox" name="field" value='1064'></td>
											</tr>
											<tr>
												<th scope="row">El�inper�isten elintarvikkeiden valmistuksessa ja jalostuksessa syntyv�t j�tteet kulutukseen tai jalostukseen soveltumattomat aineet</th>
												<td><input type="checkbox" name="field" value='1065'></td>
											</tr>
											<tr>
												<th scope="row">El�inper�isten elintarvikkeiden valmistuksessa ja jalostuksessa syntyv�t j�tteet, joita ei ole mainittu muualla</th>
												<td><input type="checkbox" name="field" value='1066'></td>
											</tr>
											<tr>
												<th scope="row">Hedelmien, vihannesten, viljojen, ruoka�ljyjen, kaakaon, kahvin, teen ja tupakan valmistuksessa ja jalostuksessa, s�ilykkeiden valmistuksessa, hiivan ja hiivauutteen valmistuksessa sek� melassin valmistuksessa ja k�ymisess� syntyv�t j�tteet pesu-, puhdistus-, kuorinta-, sentrifugointi- ja erotuslietteet</th>
												<td><input type="checkbox" name="field" value='1067'></td>
											</tr>
											<tr>
												<th scope="row">Hedelmien, vihannesten, viljojen, ruoka�ljyjen, kaakaon, kahvin, teen ja tupakan valmistuksessa ja jalostuksessa, s�ilykkeiden valmistuksessa, hiivan ja hiivauutteen valmistuksessa sek� melassin valmistuksessa ja k�ymisess� syntyv�t j�tteet liuotinuuton j�tteet</th>
												<td><input type="checkbox" name="field" value='1068'></td>
											</tr>
											<tr>
												<th scope="row">Hedelmien, vihannesten, viljojen, ruoka�ljyjen, kaakaon, kahvin, teen ja tupakan valmistuksessa ja jalostuksessa, s�ilykkeiden valmistuksessa, hiivan ja hiivauutteen valmistuksessa sek� melassin valmistuksessa ja k�ymisess� syntyv�t j�tteet kulutukseen tai jalostukseen soveltumattomat aineet</th>
												<td><input type="checkbox" name="field" value='1069'></td>
											</tr>
											<tr>
												<th scope="row">Hedelmien, vihannesten, viljojen, ruoka�ljyjen, kaakaon, kahvin, teen ja tupakan valmistuksessa ja jalostuksessa, s�ilykkeiden valmistuksessa, hiivan ja hiivauutteen valmistuksessa sek� melassin valmistuksessa ja k�ymisess� syntyv�t j�tteet, joita ei ole mainittu muualla</th>
												<td><input type="checkbox" name="field" value='1070'></td>
											</tr>
											<tr>
												<th scope="row">Sokerin jalostuksessa syntyv�t j�tteet, joita ei ole mainittu muualla</th>
												<td><input type="checkbox" name="field" value='1071'></td>
											</tr>
											<tr>
												<th scope="row">Maidonjalostusteollisuudessa syntyv�t j�tteet kulutukseen tai jalostukseen soveltumattomat aineet</th>
												<td><input type="checkbox" name="field" value='1072'></td>
											</tr>
											<tr>
												<th scope="row">Maidonjalostusteollisuudessa syntyv�t j�tteet, joita ei ole mainittu muualla</th>
												<td><input type="checkbox" name="field" value='1073'></td>
											</tr>
											<tr>
												<th scope="row">Leipomo-, konditoria- ja makeisteollisuudessa syntyv�t j�tteet kulutukseen tai jalostukseen soveltumattomat aineet</th>
												<td><input type="checkbox" name="field" value='1074'></td>
											</tr>
											<tr>
												<th scope="row">Leipomo-, konditoria- ja makeisteollisuudessa syntyv�t j�tteet s�il�nt�ainej�tteet</th>
												<td><input type="checkbox" name="field" value='1075'></td>
											</tr>
											<tr>
												<th scope="row">Alkoholijuomien ja alkoholittomien juomien valmistuksessa (ei kahvi, tee tai kaakao) raaka-aineiden pesussa ja puhdistuksessa sek� mekaanisessa k�sittelyss� syntyv�t j�tteet</th>
												<td><input type="checkbox" name="field" value='1076'></td>
											</tr>
											<tr>
												<th scope="row">Alkoholijuomien juomien valmistuksessa syntyv�t tislausj�tteet</th>
												<td><input type="checkbox" name="field" value='1077'></td>
											</tr>
											<tr>
												<th scope="row">Alkoholijuomien ja alkoholittomien juomien valmistuksessa syntyv�t (ei kahvi, tee ja kaakao) kulutukseen tai jalostukseen soveltumattomat aineet</th>
												<td><input type="checkbox" name="field" value='1078'></td>
											</tr>
											<tr>
												<th scope="row">Yhdyskuntien biohajoavat keitti�- ja ruokalaj�tteet</th>
												<td><input type="checkbox" name="field" value='1079'></td>
											</tr>
											<tr>
												<th scope="row">Yhdyskuntien ruoka�ljyt ja ravintorasvat</th>
												<td><input type="checkbox" name="field" value='1080'></td>
											</tr>
											<tr>
												<th scope="row">Yhdyskuntien biohajoavat puutarha- ja puistoj�tteet (my�s hautausmaan hoito)</th>
												<td><input type="checkbox" name="field" value='1081'></td>
											</tr>
											<tr>
												<th scope="row">Yhdyskuntien torikaupassa syntyv�t j�tteet</th>
												<td><input type="checkbox" name="field" value='1082'></td>
											</tr>
										</tbody>
									</table>
								</div> <!-- elainJaKasvij�tteetLayer div ends -->
							
								<div id="lietteetLayer" class="tab-pane fade">
									<table class="table table-hover table-bordered" id="lietteetLayerTable">
										<tbody>
											<tr>
												<th scope="row">El�inper�isten elintarvikkeiden valmistuksen ja jalostuksen j�tevesien k�sittelyss� syntyv�t lietteet</th>
												<td><input type="checkbox" name="field" value='1083'></td>	
											</tr>
											<tr>
												<th scope="row">Hedelmien, vihannesten, viljojen, ruoka�ljyjen, kaakaon, kahvin, teen ja tupakan valmistuksen ja jalostuksen, s�ilykkeiden valmistuksen,hiivan ja hiivauutteen valmistuksen sek� melassin valmistuksen ja k�ymisen j�tevesien k�sittelyss� syntyv�t lietteet</th>
												<td><input type="checkbox" name="field" value='1084'></td>	
											</tr>
											<tr>
												<th scope="row">Sokerin jalostuksen j�tevesien k�sittelyss� syntyv�t lietteet</th>
												<td><input type="checkbox" name="field" value='1085'></td>	
											</tr>
											<tr>
												<th scope="row">Maidonjalostusteollisuuden j�tevesien k�sittelyss� syntyv�t lietteet</th>
												<td><input type="checkbox" name="field" value='1086'></td>
											</tr>
											<tr>
												<th scope="row">Leipomo-, konditoria- ja makeisteollisuuden j�tevesien k�sittelyss� syntyv�t lietteet</th>
												<td><input type="checkbox" name="field" value='1087'></td>
											</tr>
											<tr>
												<th scope="row">Alkoholijuomien ja alkoholittomien juomien (ei kahvi, tee tai kaakao) valmistuksen j�tevesien k�sittelyss� toimipaikalla syntyv�t lietteet</th>
												<td><input type="checkbox" name="field" value='1088'></td>
											</tr>
											<tr>
												<th scope="row">Ker�yspaperin siistauslietteet</th>
												<td><input type="checkbox" name="field" value='1089'></td>
											</tr>
											<tr>
												<th scope="row">Massojen, paperin ja kartongin valmistuksen j�tevesien k�sittelyss� syntyv�t lietteet, ei kuitenkaan mekaanisessa erotuksessa syntyv�t kuituj�tteet sek� kuitu-, t�yteaine- ja p��llystysainelietteet</th>
												<td><input type="checkbox" name="field" value='1090'></td>
											</tr>
											<tr>
												<th scope="row">Yhdyskuntaj�tteiden anaerobisessa k�sittelyss� syntyv� neste</th>
												<td><input type="checkbox" name="field" value='1091'></td>
											</tr>
											<tr>
												<th scope="row">Yhdyskuntaj�tteiden anaerobisessa k�sittelyss� syntyv� liete</th>
												<td><input type="checkbox" name="field" value='1092'></td>
											</tr>
											<tr>
												<th scope="row">El�in- ja kasvij�tteiden anaerobisessa k�sittelyss� syntyv� neste</th>
												<td><input type="checkbox" name="field" value='1093'></td>
											</tr>
											<tr>
												<th scope="row">El�in- ja kasvij�tteiden anaerobisessa k�sittelyss� syntyv� liete</th>
												<td><input type="checkbox" name="field" value='1094'></td>
											</tr>
											<tr>
												<th scope="row">Asumisj�tevesien k�sittelyss� syntyv�t lietteet</th>
												<td><input type="checkbox" name="field" value='1095'></td>
											</tr>
											<tr>
												<th scope="row">Asumisj�tevesien k�sittelyn ei stabiloitu liete</th>
												<td><input type="checkbox" name="field" value='1096'></td>
											</tr>
											<tr>
												<th scope="row">Asumisj�tevesien k�sittelyn lahotettu liete</th>
												<td><input type="checkbox" name="field" value='1097'></td>
											</tr>
											<tr>
												<th scope="row">Asumisj�tevesien k�sittelyn m�d�tetty liete</th>
												<td><input type="checkbox" name="field" value='1098'></td>
											</tr>
											<tr>
												<th scope="row">Asumisj�tevesien k�sittelyn kalkkistabiloitu liete</th>
												<td><input type="checkbox" name="field" value='1099'></td>
											</tr>
											<tr>
												<th scope="row">Asumisj�tevesien k�sittelyn termisesti k�sitelty liete</th>
												<td><input type="checkbox" name="field" value='1100'></td>
											</tr>
											<tr>
												<th scope="row">Asumisj�tevesien k�sittelyss� syntyv�t lietteet</th>
												<td><input type="checkbox" name="field" value='1101'></td>
											</tr>
											<tr>
												<th scope="row">Kompostoitu asumisj�tevesien k�sittelyss� muodostunut liete</th>
												<td><input type="checkbox" name="field" value='1102'></td>
											</tr>
											<tr>
												<th scope="row">Teollisuuden j�tevesien biologisessa k�sittelyss� syntyv�t lietteet, jotka eiv�t sis�ll� vaarallisia aineita</th>
												<td><input type="checkbox" name="field" value='1103'></td>
											</tr>
											<tr>
												<th scope="row">Ihmisten k�ytt��n tai teollisuusk�ytt��n tarkoitetun veden valmistuksen selkeytyksess� syntyv�t lietteet</th>
												<td><input type="checkbox" name="field" value='1104'></td>
											</tr>
											<tr>
												<th scope="row">Sakokaivolietteet</th>
												<td><input type="checkbox" name="field" value='1105'></td>
											</tr>
											<tr>
												<th scope="row">Viem�reiden puhdistuksessa syntyv�t j�tteet</th>
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
				<li class="active"><a data-toggle="tab" href="#forestLayer">Mets�</a></li>
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
								<th>M�nty</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<th scope="row">El�v�t oksat</th>
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
								<th scope="row">Lehv�st�</th>
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
								<th scope="row">Maisema- ja mets�pellot</th>
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
								<th scope="row">Suojavy�hyke- ja kaista</th>
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
								<th scope="row">Viljelem�t�n</th>
								<td><input type="checkbox" name="field" value='1055'></td>
							</tr>
							<tr>
								<th scope="row">�ljykasvit</th>
								<td><input type="checkbox" name="field" value='1056'></td>
							</tr>
						</tbody>
					</table>
				</div><!-- fieldLayer div ends -->
			</div> <!-- originTab Table div ends -->
		</div> <!-- originTab ends -->
	</div> <!-- Main tab content ends -->
</div>