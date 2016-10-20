<style type="text/css">
	.selectAllIcon {
		margin-left: -10px;
		cursor: pointer;
		float: right;
	}
	.textInSelectAllHeader {
		margin-right: 10px;
		display: inline-block;
	}
	
	#bmaLayerContent .nav-pills {
		font-size: 18px;
	}
	#bmaLayerContent .tab-content .nav-pills a {
		font-size: 16px;
		padding-left: 12px;
		padding-right: 12px;
	}
	#bmaLayerContent .tab-content .tab-content .nav-pills a {
		font-size: 14px;
		padding-left: 9px;
		padding-right: 9px;
	}
	#bmaLayerContent .tab-content .tab-content .tab-content .nav-pills a {
		font-size: 12px;
		padding-left: 7px;
		padding-right: 7px;
	}
	#closeAllBmaLayersBtn {
		position: absolute;
		right: 40px;
		top: 8px;
		cursor: pointer;
	}
</style>

<script type="text/javascript">
$(document).ready(function () {
	//Polyfill for supporting startsWith in IE
	if (!String.prototype.startsWith) {
	    String.prototype.startsWith = function(searchString, position){
	      position = position || 0;
	      return this.substr(position, searchString.length) === searchString;
	  };
	}
	
	var insertIcon = function(th) {
		var icon = jQuery("<span/>");
		icon.addClass("glyphicon").addClass("glyphicon-check").addClass("selectAllIcon");
		icon.attr("title", "Valitse kaikki");
		var span = jQuery("<span/>");
		span.text(th.text());
		span.addClass("textInSelectAllHeader");
		th.empty();
		th.append(span);
		th.append(icon);
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
	var addSelectRowFunctionality = function(rows) {
		rows.each(function() {
			var row = jQuery(this);
			if (row.find("input[type='checkbox']").length == 0) {
				return;
			}
			var th = row.find("th").first();
			var icon = insertIcon(th);
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
		table.find("tr").find("th").each(function() {
			var th = jQuery(this);
			var span = th.attr("colspan");
			if (!span) {
				span = 1;
			}
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
				var icon = insertIcon(th);
				icon.click(function() {
					var boxes = jQuery([]);
					for (var j = 0; j < colIndexes.length; j++) {
						boxes = boxes.add(table.find("." + colIndexes[j] + " input[type='checkbox']"));
					}
					toggleBoxes(boxes);
				});
			}
		});
	};
	addSelectRowFunctionality(jQuery("#bmaLayerContent tr.select-row"));
	jQuery("#bmaLayerContent table.select-column").each(function() {
		addSelectColumnFunctionality(jQuery(this));
	});
	jQuery("#closeAllBmaLayersBtn").click(function() {
		toggleBoxes(jQuery("#bmaLayerContent input[type='checkbox']:checked"));
	});
	
});
</script>

<div id="bmaLayerContent">
	<ul class="nav nav-pills">
		<li class="active"><a data-toggle="tab" href="#potentialTabs">Biomassapotentiaalin
				mukaan</a></li>
		<li><a data-toggle="tab" href="#originTabs">Alkuperän mukaan</a></li>
		<div id="closeAllBmaLayersBtn" class="glyphicon glyphicon-unchecked hidden" title="Sulje kaikki biomassatasot"></div>
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
					<jsp:include page="includes/maanpeiteLayers.jsp"></jsp:include>
				</div>
				<div id="kokonaistuotantoLayer" class="tab-pane fade">
					<jsp:include page="includes/kokonaistuotantoLayers.jsp"></jsp:include>
				</div>
				<div id="sivuvirtapotentiaaliTabs" class="tab-pane fade">
					<ul class="nav nav-pills">
						<li class="active"><a data-toggle="tab" href="#sivuvirtaMetsahakeLayer">Metsähake</a></li>
						<li><a data-toggle="tab" href="#sivuvirtaYhdyskuntienBiojatteetLayer">Yhdyskuntien biojätteet</a></li>
						<li><a data-toggle="tab" href="#sivuvirtaYritystenBiojatteetLayerTabs">Yritysten toiminnassa muodostuvat biojätteet</a></li>
						<li><a data-toggle="tab" href="#sivuvirtaBiojatteetLayer">Jätteet yritysten varastoissa</a></li>
						<li><a data-toggle="tab" href="#sivuvirtaPeltokasvitLayer">Peltokasvien sivuvirrat</a></li>
						<li><a data-toggle="tab" href="#sivuvirtaLantaElainsuojaLayer">Lanta eläinsuojasta</a></li>
						<li><a data-toggle="tab" href="#sivuvirtaLantaVarastoLayer">Lanta varastosta</a></li>
					</ul>
					<div class="tab-content">
						<div id="sivuvirtaMetsahakeLayer" class="tab-pane fade in active">
							<div class="tab-content table-responsive">
								<jsp:include page="includes/forestPotentialLayers.jsp"></jsp:include>
							</div>
						</div>
					
						<div id="sivuvirtaYhdyskuntienBiojatteetLayer" class="tab-pane fade">
							<jsp:include page="includes/municipalBioWasteLayers.jsp"></jsp:include>
						</div>
						
						<div id="sivuvirtaYritystenBiojatteetLayerTabs" class="tab-pane fade">
							<jsp:include page="includes/workBioWasteLayers.jsp"></jsp:include>
						</div>
						
						<div id="sivuvirtaBiojatteetLayer" class="tab-pane fade">
							<jsp:include page="includes/industrialWasteLayers.jsp"></jsp:include>
						</div>
						
						<div id="sivuvirtaPeltokasvitLayer" class="tab-pane fade">
							<jsp:include page="includes/sivuvirtaFieldLayers.jsp"></jsp:include>
						</div>
						
						<div id="sivuvirtaLantaElainsuojaLayer" class="tab-pane fade">
							<jsp:include page="includes/sivuvirtaLantaElainsuojaLayers.jsp"></jsp:include>
						</div>
						<div id="sivuvirtaLantaVarastoLayer" class="tab-pane fade">
							<jsp:include page="includes/sivuvirtaLantaVarastoLayers.jsp"></jsp:include>
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
								<table class="table table-hover table-bordered">
									<jsp:include page="includes/forestPotentialLayers.jsp"></jsp:include>
								</table>
							</div>
						</div>	<!-- metsähakepotentiaaliLayer div ends -->
					</div>	<!-- forestTabs tab-content ends -->
				</div>	<!-- forestTabs tab-pane ends -->
				
				<div id="fieldTabs" class="tab-pane fade">
					<ul class="nav nav-pills">
						<li class="active"><a data-toggle="tab" href="#maankäyttöLayer">Maankäyttö</a></li>
						<li><a data-toggle="tab" href="#fieldBiomassLayer">Biomassat</a></li>
						<li><a data-toggle="tab" href="#alkuperaMaatilaSivuvirrat">Sivuvirrat</a></li>
					</ul>
					<div class="tab-content table-responsive">
						<div id="maankäyttöLayer" class="tab-pane fade in active">
							<jsp:include page="includes/landUseFieldLayers.jsp"></jsp:include>
						</div>
						
						<div id="fieldBiomassLayer" class="tab-pane fade">
							<jsp:include page="includes/fieldBiomassLayers.jsp"></jsp:include>
						</div>
						
						<div id="alkuperaMaatilaSivuvirrat" class="tab-pane fade">
							<ul class="nav nav-pills">
								<li class="active"><a data-toggle="tab" href="#alkuperaMaatilaSivuvirtaBiojatteetLayer">Jätteet yritysten varastoissa</a></li>
								<li><a data-toggle="tab" href="#alkuperaMaatilaSivuvirtaPeltokasvitLayer">Peltokasvien sivuvirrat</a></li>
								<li><a data-toggle="tab" href="#alkuperaMaatilaSivuvirtaLantaElainsuojaLayer">Lanta eläinsuojasta</a></li>
								<li><a data-toggle="tab" href="#alkuperaMaatilaSivuvirtaLantaVarastoLayer">Lanta varastosta</a></li>
							</ul>
							<div class="tab-content">
								<div id="alkuperaMaatilaSivuvirtaBiojatteetLayer" class="tab-pane fade in active">
									<jsp:include page="includes/industrialWasteLayers.jsp"></jsp:include>
								</div>
								
								<div id="alkuperaMaatilaSivuvirtaPeltokasvitLayer" class="tab-pane fade">
									<jsp:include page="includes/sivuvirtaFieldLayers.jsp"></jsp:include>
								</div>
								
								<div id="alkuperaMaatilaSivuvirtaLantaElainsuojaLayer" class="tab-pane fade">
								</div>
								<div id="alkuperaMaatilaSivuvirtaLantaVarastoLayer" class="tab-pane fade">
								</div>
								
							</div>	<!-- sivuvirtapotentiaaliTabs tab-content ends -->
						</div>
					</div>
				</div>	<!-- fieldTabs div ends -->
				
				<div id="communitiesLayer" class="tab-pane fade">
					<jsp:include page="includes/municipalBioWasteLayers.jsp"></jsp:include>
				</div>
				
				<div id="companiesTabs" class="tab-pane fade">
					<ul class="nav nav-pills">
						<li class="active"><a data-toggle="tab" href="#workBiowasteLayer">Toiminnassa muodostuvat biojätteet</a></li>
						<li><a data-toggle="tab" href="#industrialWasteLayer">Jätteet yritysten varastoissa</a></li>
					</ul>
					<div class="tab-content table-responsive">
						<div id="workBiowasteLayer" class="tab-pane fade in active">
							<jsp:include page="includes/workBioWasteLayers.jsp"></jsp:include>
						</div>
						<div id="industrialWasteLayer" class="tab-pane fade">
							<jsp:include page="includes/industrialWasteLayers.jsp"></jsp:include>
						</div>
					</div>
				</div><!-- companiesTabs tab-pane ends -->
				
			</div>	<!-- originTab tab-content ends -->
		</div>	<!-- originTab tab-pane ends -->
	</div> <!-- bmaLayerContent tab-content ends -->
</div>	<!-- bmaLayerContent ends -->
