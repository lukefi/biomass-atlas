<style type="text/css">
	.selectAllIcon {
		margin-left: 10px;
		cursor: pointer;
		float: right;
	}
	
	#bmaLayerContent .nav-pills {
		font-size: 18px;
	}
	#bmaLayerContent .tab-content .nav-pills {
		font-size: 16px;
	}
	#bmaLayerContent .tab-content .tab-content .nav-pills {
		font-size: 14px;
	}
	#bmaLayerContent .tab-content .tab-content .tab-content .nav-pills {
		font-size: 12px;
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
	addSelectRowFunctionality(jQuery("#kokonaisvarantoLayerTable"));
	addSelectColumnFunctionality(jQuery("#kokonaisvarantoLayerTable"));
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
						<div id="sivuvirtaMetsahakeLayer" class="tab-pane fade in active">
							<div class="tab-content table-responsive">
								<table class="table table-hover table-bordered" id="sivuvirtaMetsahakeLayerTable">
									<jsp:include page="includes/forestPotentialLayers.jsp"></jsp:include>
								</table>
							</div>
						</div>
					
						<div id="sivuvirtaYhdyskuntienBiojatteetLayer" class="tab-pane fade">
						</div>
						
						<div id="sivuvirtaYritystenBiojatteetLayerTabs" class="tab-pane fade">
							<ul class="nav nav-pills">
								<li class="active"><a data-toggle="tab" href="#elainJaKasvijätteetLayer">Eläin- ja kasvijätteet t/v 2014</a></li>
								<li><a data-toggle="tab" href="#lietteetLayer">Lietteet t/v 2015</a></li>
								<li><a data-toggle="tab" href="#paperijätteetLayer">Paperi- ja pahvijätteet t/v 2015</a></li>
								<li><a data-toggle="tab" href="#puujätteetLayer">Puujätteet t/v 2015</a></li>
								<li><a data-toggle="tab" href="#yhdyskuntienSekalainenBiohajoavaLayer">Yhdyskuntien sekalainen biohajoava jäte t/v 2015</a></li>
							</ul>
							<div class="tab-content table-responsive">
								<div id="elainJaKasvijätteetLayer" class="tab-pane fade in active">
									<jsp:include page="includes/animalAndPlantWasteLayers.jsp"></jsp:include>
								</div> <!-- elainJaKasvijätteetLayer div ends -->
							
								<div id="lietteetLayer" class="tab-pane fade">
									<jsp:include page="includes/lietteetLayers.jsp"></jsp:include>
								</div> <!-- lietteetLayer div ends -->
								
								<div id="paperijätteetLayer" class="tab-pane fade">
									<table class="table table-hover table-bordered" id="paperijätteetLayerTable">
										<tbody>
											<tr>
												<th scope="row">Paperi- ja kartonkipakkaukset</th>
												<td><input type="checkbox" name="waste" value='1107'></td>
											</tr>
											<tr>
												<th scope="row">Jätteiden mekaanisessa käsittelyssä syntyvät paperi- ja kartonkijätteet</th>
												<td><input type="checkbox" name="waste" value='1108'></td>
											</tr>
											<tr>
												<th scope="row">Yhdyskuntajätteen paperi ja kartonki</th>
												<td><input type="checkbox" name="waste" value='1109'></td>
											</tr>
										</tbody>
									</table>
								</div> <!-- paperijätteetLayer tab-pane ends -->
								
								<div id="puujätteetLayer" class="tab-pane fade">
									<jsp:include page="includes/woodWasteLayers.jsp"></jsp:include>
								</div>	<!-- puujätteetLayer tab-pane ends -->
								
								<div id="yhdyskuntienSekalainenBiohajoavaLayer" class="tab-pane fade">
									<table class="table table-hover table-bordered" id="yhdyskuntienSekalainenBiohajoavaLayerTable">
										<tbody>
											<tr>
												<th scope="row">Sekalaiset yhdyskuntajätteet</th>
												<td><input type="checkbox" name="waste" value='1117'></td>
											</tr>
											<tr>
												<th scope="row">Yhdyskuntajätteet, joita ei ole mainittu muualla</th>
												<td><input type="checkbox" name="waste" value='1118'></td>
											</tr>
										</tbody>
									</table>
								</div>	<!-- yhdyskuntienSekalainenBiohajoavaLayer tab-pane ends -->
							</div>	<!-- sivuvirtaYritystenBiojatteetLayerTabs tab-content ends -->
						</div> 	<!-- sivuvirtaYritystenBiojatteetLayerTabs tab-pane ends -->
						
						<div id="sivuvirtaBiojatteetLayer" class="tab-pane fade">
						</div>
						<div id="sivuvirtaPeltokasvitLayer" class="tab-pane fade">
						</div>
						<div id="sivuvirtaLantaElainsuojaLayer" class="tab-pane fade">
						</div>
						<div id="sivuvirtaLantaVarastoLayer" class="tab-pane fade">
						</div>
						
					</div>	<!-- sivuvirtapotentiaaliTabs tab-content ends -->
				</div>	<!-- sivuvirtapotentiaaliTabs tab-pane ends  -->
			</div>	<!-- potentialTabs tab-content ends -->
		</div>	<!-- potentialTabs tab-pane ends -->
		
		<div id="originTabs" class="tab-pane fade">
			<ul class="nav nav-pills">
				<li class="active"><a data-toggle="tab" href="#forestTabs">Metsä</a></li>
				<li><a data-toggle="tab" href="#fieldTabs">Maatila</a></li>
				<li><a data-toggle="tab" href="#communitiesLayer">Yhdyskunnat (asutus, kaupat ja julkiset palvelut)</a></li>
				<li><a data-toggle="tab" href="#companiesTabs">Yritykset</a></li>
			</ul>
			
			<div class="tab-content">
				<div id="forestTabs" class="tab-pane fade in active">
					<ul class="nav nav-pills">
						<li class="active"><a data-toggle="tab" href="#kokonaisvarantoLayer">Kokonaisvaranto (MVMI)</a></li>
						<li><a data-toggle="tab" href="#metsähakepotentiaaliLayer">Metsähakepotentiaali</a></li>
					</ul>
					<div class="tab-content table-responsive">
						<div id="kokonaisvarantoLayer" class="tab-pane fade in active">
							<jsp:include page="includes/totalStorageForestLayers.jsp"></jsp:include>
						</div>	<!-- kokonaisvarantoLayer div ends -->
						
						<div id="metsähakepotentiaaliLayer" class="tab-pane fade">
							<div class="tab-content table-responsive">
								<table class="table table-hover table-bordered" id="sivuvirtaMetsahakeLayerTable">
									<jsp:include page="includes/forestPotentialLayers.jsp"></jsp:include>
								</table>
							</div>
						</div>	<!-- metsähakepotentiaaliLayer div ends -->
					</div>	<!-- forestTabs tab-content ends -->
				</div>	<!-- forestTabs tab-pane ends -->
				
				<div id="fieldTabs" class="tab-pane fade">
					<ul class="nav nav-pills">
						<li class="active"><a data-toggle="tab" href="#maankäyttöLayer">Maankäyttö</a></li>
						<li><a data-toggle="tab" href="#biomassatLayer">Biomassat</a></li>
					</ul>
					<div id="maankäyttöLayer" class="tab-pane fade in active">
						<jsp:include page="includes/landUseFieldLayers.jsp"></jsp:include>
					</div>
					
					<div id="biomassatLayer" class="tab-pane fade">
					</div>
				</div>	<!-- fieldTabs div ends -->
				
				<div id="communitiesLayer" class="tab-pane fade">
				</div>
				
				<div id="companiesTabs" class="tab-pane fade">
					<ul class="nav nav-pills">
						<li class="active"><a data-toggle="tab" href="#workBiowasteLayer">Toiminnassa muodostuvat biojatteet</a></li>
						<li><a data-toggle="tab" href="#companyWasteLayer">Jätteet yritysten varastoissa</a></li>
					</ul>
					<div id="workBiowasteLayer" class="tab-pane fade">
					</div>
					<div id="companyWasteLayer" class="tab-pane fade">
					</div>
				</div><!-- companiesTabs tab-pane ends -->
				
			</div>	<!-- originTab tab-content ends -->
		</div>	<!-- originTab tab-pane ends -->
	</div> <!-- bmaLayerContent tab-content ends -->
</div>	<!-- bmaLayerContent ends -->
