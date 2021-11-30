<style type="text/css">
	#bmaLayerContent {
    	z-index: 1000;
    	position: absolute;
    	height: 738px;
    	width: 735px;
    	/*width: 630px;*/
    	display: none;
    	bottom: 80px;
    	background-color: #333438;
    	padding: 7px;
    	border-radius: 4px;
    	box-shadow: 5px 7px 4px 0px rgba(0,0,0,0.34);
    }
    @media only screen and (max-height: 818px) {
    	body #bmaLayerContent {
    		top: 0;
    		bottom: auto;
    	}
    }
    #bmaLayerContent .bmaLayerInner {
    	background-color: #54585a;
    	color: #ffffff;
    	height: 100%;
    }
    #bmaLayerContent .bmaLayerInner h3 {
    	margin: 0;
    	padding-top: 15px;
    	padding-bottom: 15px;
    	height: 60px;
    }
    #bmaLayerContent .bmaLayerInner > .nav-pills {
    	height: 43px;
    }
    #bmaLayerContent .bmaLayerInner > .nav-pills > li {
    	padding-right: 7px;
    	width: 170px;
    }
    #bmaLayerContent .bmaLayerInner > .nav-pills > li > a {
    	background-color: #00b5e2;
    	color: #ffffff;
    	font-weight: bold;
    	border-bottom-right-radius: 0;
    	border-bottom-left-radius: 0;
    }
    #bmaLayerContent .bmaLayerInner > .nav-pills > li.active > a {
    	background-color: #78be20;
    }
    #bmaLayerContent .bmaLayerInner > .tab-content {
    	background-color: #ffffff;
    	color: #000000;
    }
	#bmaLayerContent .nav-pills {
		font-size: 16px;
	}
	#bmaLayerContent .tab-content .nav-pills a {
		font-size: 16px;
		padding-left: 10px;
		padding-right: 10px;
		padding-top: 0;
		padding-bottom: 0;
		margin-top: 10px;
		margin-bottom: 10px;
		background-color: transparent;
		color: #000000;
	}
	#bmaLayerContent .tab-content .nav-pills li:not(:first-child) a {
		border-left: 2px solid #d4e5ee;
		border-radius: 0;
	}
	#bmaLayerContent .tab-content .nav-pills li.active > a {
		color: #78be20;
	}
	#bmaLayerContent .tab-content .tab-content .nav-pills {
		border-top: 2px solid #d4e5ee;
	}
	#closeAllBmaLayersBtn {
		position: absolute;
		right: 40px;
		top: 12px;
		width: 14px;
		height: 16px;
		background-image: url("Oskari/resources/bma-close-layers.png");
		cursor: pointer;
	}
	#bmaLayerContent #closeBmaLayerContent {
    	position: absolute;
    	top: 12px;		
    	right: 10px;
    	background-image: url("Oskari/resources/bma-close.png") !important;
    	background-position: top !important;
    	background-repeat: no-repeat !imporant;
    }
	#bmaLayerContent .bmaLayerInner > .tab-content {
		height: 614px;
		overflow-y: scroll;
	}
	#bmaLayerContent h4 {
		color: #00b5e2;
		margin-left: 9px;
		padding-bottom: 0;
	}
	#bmaLayerContent .table th, #bmaLayerContent .table td {
	    border: none !important;
	    text-align: left;
	    padding-top: 0;
	    padding-bottom: 0;
	    height: 22px;
	    vertical-align: middle;
	}
	.fixed-table-container {
	    border:0px;
	}
	.table thead th {
	    text-align: center;
	}
	.even-row, .even-col {
    	background-color: #F0F0F0;
    }
   	.even-col-even-cell {
   		background-color: #E5E5E5;
   	}
   	#bmaLayerContent .search-content {
		padding-left: 20px;
		padding-top: 10px;
		margin-top: 10px;
		height: 60px;
	}
	/* #bmaLayerContent .search-content button {
		border-radius: 4px;
		padding: 1px 20px;
	} */
	#bmaLayerContent #searchAttribute {
		/* padding-left: 20px;
		padding-top: 30px;
		margin-top: 10px; */
		height: 40px;
	}
	#bmaLayerContent #showResults {
		padding-left: 20px;
		padding-top: 30px;
		margin-top: 10px;
	}
	
   	#bmaLayerContent table.standard-width tr th {
   		padding-right: 0;
   	}
   	#bmaLayerContent table.standard-width tr th:first-child {
   		width: 298px;
   	}
   	#bmaLayerContent table.standard-width.waste-table tr th:first-child {
   		width: 60px;
   	}
   	#bmaLayerContent table.standard-width.waste-table tr th:nth-child(2) {
   		width: 400px;
   	}
   	#bmaLayerContent table.standard-width tr th:first-child ~ td {
   		padding-left: 24px;
   		padding-right: 22px;
   	}
   	#bmaLayerContent .selectAllIcon {
   		background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAMCAMAAACOacfrAAAAaVBMVEX///+EhIQAAACEhISEhITw8PCEhISOjo6urq7AwMCBgYGJiYmioqKkpKS2trbe3t57e3uEhISEhISEhISEhISBgYF6enp7e3uBgYGoqKiDg4PHx8d0dHR0dHTQ0NCZmZmEhISEhISEhISnc7U9AAAAI3RSTlOAfwB3e4g+4GCpHOfGw7GSkXVoZVMJ4tPIv7mjn52bb286LvoY3zwAAABkSURBVAjXRc5HFoNAEANRtYb2mAEMxmByvP8hyVC7v9ETeJcXDkzN0S9JiFTO2n9OeII9LbuZMOJ/NlW19yK+Egcx0AfDIfhW1TbvTUaAKIxC3FJr9RHWoVUTkcnV6Ahm1xdHLmTOBBPzlrMcAAAAAElFTkSuQmCC");
		cursor: pointer;
		display: inline-block;
		width: 13px;
		height: 12px;
	}
	#bmaLayerContent .selectAllIcon.selected {
		background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAMCAMAAACOacfrAAAAe1BMVEX///8AteIAAAAAteIAteIAteIAteJO3E7d+N0AteJWzuwc0hwk0ySB5oEAvogAzAQAteIAteIAteIAyhcj0yMl0yUAzAAPzClX3VcUzDhy43Jx43GJ54mS6ZKl7aW88rzC88Lu/O4AteJDzrkAteIAteIAzAAAteIAzADfExLnAAAAKXRSTlOAfwB3dnw+xYpnYOfgqp6Re1Mc4uHf08i/ubGxpqObk5GEb286Lh4MB/ZYMvMAAABmSURBVAjXPc5HFoMwAANRWYHEpkM6vcP9T4gNhr+bp43Ay/qZQXU7qDgmlLCi50K4Ajv5jSbCEWVu6vdP7qZavwFqf3D3QhhIGVSeLTw0XNW9XxJeYgthAb2NRCpOfUYwdTTzJSM3lwMEv+PAgb4AAAAASUVORK5CYII=");
	}
	#bmaLayerContent .selectAllIcon:hover {
		background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAMCAMAAACOacfrAAAAY1BMVEX///8AAAAAteIAteIAteIAteKnp6fy8vIAteJWzuy5ubnIyMjR0dGlpaU9qsXm5uYAteIAteKJnKCZmZmNoqe3t7e8vLyJpa3b29uUmpyZmZkAteJkw9oAteIAteKZmZkAteIhbF72AAAAIXRSTlOAAH92ez7gimdgxLCm556SUxzi08jGv7mblI1vbzouHgwSL9eTAAAAX0lEQVQI103ORQLEIAAEwRlggQViK3H7/ytjRPpWtwbvvhNoldyzTUtYEUs/M6EE9swvHQkpgt9UVuq1KUsyoE76QwjaGB3eUXB/53AJWpuHvMeqgcjFWVcQzGV8KcgFOT0DpCQSrakAAAAASUVORK5CYII=");
		filter: none;
	}
	#bmaLayerContent table.standard-width th:first-child .selectAllIcon {
		float: right;
	}
	#bmaLayerContent table.standard-width .selectAllIcon.emptyCell {
		margin-left: 13px;
	}
	#bmaLayerContent .textInSelectAllHeader {
		margin-right: 4px;
		display: inline-block;
	}
	#bmaLayerContent th {
    	background-color: #FFFFFF;
	}    	
	#bmaLayerContent .even-row > th {
    	background-color: #F0F0F0;
	}
	.searchResult {
		margin: -35px 0 0 -25px;
	}
	.searchResult tr > td:first-child {
		width: 450px;
	}
	
	.mainLevelToggle { 
		cursor: pointer; 
		color: #2a79aa;
	}
	.subLevelVegetablesToggle, .subLevelFruitsToggle { 
		cursor: pointer;
		color: #337ab7;
	}
	tbody.openMainToggle tr th {
		padding-left:20px;
	}
	table.openVegetablesToggle tr th {
		padding-left:20px;
	}
	.openVegetablesToggle, .openFruitsToggle {
		display: none;
	}
	.openVegetablesToggle > th, .openFruitsToggle > th {
		padding-left: 50px !important;
	}
	td.sub-title {
		font-size: 14px;
		color: #00b5e2;
		padding-bottom: 10px !important;
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
		icon.addClass("selectAllIcon");
		icon.attr("title", "Valitse kaikki");
		var span = jQuery("<span/>");
		span.text(th.text());
		if (!th.text()) {
			icon.addClass("emptyCell");
		}
		span.addClass("textInSelectAllHeader");
		th.empty();
		th.append(span);
		th.append(icon);
		return icon;
	};
	var toggleBoxes = function(button, boxes) {
		if (boxes.filter(":not(:checked)").length == 0) {
			boxes.filter(":checked").click();
			button.removeClass("selected");
		}
		else {
			boxes.filter(":not(:checked)").click();
			button.addClass("selected");
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
				toggleBoxes($(this), row.find("input[type='checkbox']"));
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
					toggleBoxes($(this), boxes);
				});
			}
		});
	};
	
	addSelectRowFunctionality(jQuery("#bmaLayerContent tr.select-row"));
	jQuery("#bmaLayerContent table.select-column").each(function() {
		addSelectColumnFunctionality(jQuery(this));
	});
	
	jQuery("#closeAllBmaLayersBtn").click(function() {
		toggleBoxes($(this), jQuery("#bmaLayerContent input[type='checkbox']:checked"));
	});
	
	var tables = $(".table");
	$.each(tables, function(tableIndex, table) {
		var rows = $("tbody tr", $(table));
		$(rows).each(function(rowIndex, row) {
			var cells = $("td", $(row));
			if (rowIndex % 2 == 1) {
				$(this).addClass("even-row"); 
				$(cells).each(function(cellIndex, cell) {
					if (cellIndex == 1) {
						$(this).addClass("even-col-even-cell"); 
					}
				});
			} else {
				$(cells).each(function(cellIndex, cell) {
					if (cellIndex == 1 || cellIndex == 4) {
						$(this).addClass("even-col"); 
					}
				});
			}
		});	
	});
	
	// Make bma layer seletor div movable.
	$("#bmaLayerContent").draggable();
	
	// Sticking and moving Scroll bar problem is fixed.
	$("#bmaLayerContent .bmaLayerInner > .tab-content").mousedown(function(event) {
		if($(event.target).is($(this))) {
	  	event.stopPropagation ? event.stopPropagation() : (event.cancelBubble=true);
	 	}
	});
	
	$('.mainLevelToggle').click(function() {
		$(".openMainToggle").toggle();
		$(this).find('span:first').toggleClass('glyphicon glyphicon-collapse-down glyphicon glyphicon-collapse-up');
	});
	
	$('.subLevelVegetablesToggle').click(function() {
		$(".openVegetablesToggle").toggle();
		$(this).find('span:first').toggleClass('glyphicon glyphicon-collapse-down glyphicon glyphicon-collapse-up');
	});
	
	$('.subLevelFruitsToggle').click(function() {
		$('.openFruitsToggle').toggle();
		$(this).find('span:first').toggleClass('glyphicon glyphicon-collapse-down glyphicon glyphicon-collapse-up');
	});
	
	$('#searchBt').on('click', function() {
		var searchValue = $('#searchText').val();
		$.ajax({
			url: "${pageContext.request.contextPath}/biomass/search",
			type: "POST",
			contentType: "application/json; charset=UTF-8",
			data: searchValue,
			dataType: "json",
			success: function(data) {
				var koe = '<table class="table select-column standard-width searchResult">'
					+ '<thead><tr><td></td><th></th></tr></thead>'
					+ '<tbody>';
				var count = 0;
				$.each(data,function(key,value) {
				 	value = 1000 + value;
				 	++count;
				 	if (count % 2 == 0) {
				 		koe += '<tr class="even-row">';
				 	} else {
				 		koe += '<tr>';
				 	}
				 	koe += '<th scope="row">' + key + '</th>';
					if ($("#bmaLayerContent input[value='" + value + "']").is(":checked")) {
						koe += '<td><input type="checkbox" value=' + value + ' checked></td></tr>';
				 	}else {
				 		koe += '</th><td><input type="checkbox" value=' + value + ' ></td></tr>';
				 	}
				});
				koe += '</tbody></table>';
				$("#showResults").html(koe);
			},
			error: function(res){
				console.log("Error!");
			}
		});
	});
	
});
</script>

<div id="bmaLayerContent"><div class="bmaLayerInner">
	<h3><spring:message code="bma.biomasses.title"/></h3>
	<div id="closeAllBmaLayersBtn" class="hidden" title="Sulje kaikki biomassatasot"></div>
	<div class='oskari-flyouttool-close icon-close icon-close' id="closeBmaLayerContent"></div>
	<ul class="nav nav-pills">
		<li class="active"><a data-toggle="tab" href="#potentialTabs"><spring:message code="bma.potential"/></a></li>
		<li><a data-toggle="tab" href="#originTabs"><spring:message code="bma.origin"/></a></li>
		<li><a data-toggle="tab" href="#nutrientTabs"><spring:message code="bma.nutrients"/></a></li>
		<li><a data-toggle="tab" href="#searchTab"><spring:message code="bma.search"/></a></li>
	</ul>
	<div class="tab-content">
		<div id="potentialTabs" class="tab-pane fade in active">
			<ul class="nav nav-pills">
				<li class="active"><a data-toggle="tab" href="#maanpeiteLayer"><spring:message code="bma.land_cover"/></a></li>
				<li><a data-toggle="tab" href="#kokonaistuotantoLayer"><spring:message code="bma.total_production"/></a></li>
				<li><a data-toggle="tab" href="#sivuvirtapotentiaaliTabs" onlick ='$("#sivuvirtaTuhkaLayer")attr("href","")'><spring:message code="bma.sidestream_potential"/></a></li>
			</ul>
			<div class="tab-content">
				<div id="maanpeiteLayer" class="tab-pane fade in active">
					<jsp:include page="includes/maanpeiteLayers.jsp"></jsp:include>
				</div>
				<div id="kokonaistuotantoLayer" class="tab-pane fade">
					<jsp:include page="includes/totalStorageForestLayers.jsp"></jsp:include>
					<jsp:include page="includes/fieldBiomassLayers.jsp"></jsp:include>
				</div>
				<div id="sivuvirtapotentiaaliTabs" class="tab-pane fade">
					<ul class="nav nav-pills">
						<li class="active"><a data-toggle="tab" href="#sivuvirtaMetsahakeLayer"><spring:message code="bma.forest_chip"/></a></li>
						<li><a data-toggle="tab" href="#sivuvirtaYhdyskuntienBiojatteetLayer"><spring:message code="bma.community_s"/><br/><spring:message code="bma.biowaste"/></a></li>
						<li><a data-toggle="tab" href="#sivuvirtaYritystenBiojatteetLayerTabs" id="sivuvirtaYritystenBiojatteet"><spring:message code="bma.company_s"/><br/><spring:message code="bma.biowaste"/></a></li>
						<li><a data-toggle="tab" href="#sivuvirtaWasteManagementLayer"><spring:message code="bma.treated_biodegradable_waste"/></a></li>
						<li><a data-toggle="tab" href="#sivuvirtaTuhkaLayer"><spring:message code="bma.asses"/></a></li>
						<li><a data-toggle="tab" href="#sivuvirtaPeltokasvitLayer" title="Peltokasvien sivuvirrat"><spring:message code="bma.field"/></a></li>
						<li><a data-toggle="tab" href="#sivuvirtaLantaLayer"><spring:message code="bma.manure"/></a></li>
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
						
						<div id="sivuvirtaWasteManagementLayer" class="tab-pane fade">
							<jsp:include page="includes/wasteManagementLayers.jsp"></jsp:include>
						</div>
						
						<div id="sivuvirtaTuhkaLayer" class="tab-pane fade">
							<jsp:include page="includes/sivuvirtaTuhkaLayers.jsp"></jsp:include>
						</div>
						
						<div id="sivuvirtaPeltokasvitLayer" class="tab-pane fade">
							<jsp:include page="includes/sivuvirtaFieldLayers.jsp"></jsp:include>
						</div>
						
						<div id="sivuvirtaLantaLayer" class="tab-pane fade">
							<jsp:include page="includes/sivuvirtaLantaElainsuojaLayers.jsp"></jsp:include>
							<jsp:include page="includes/sivuvirtaLantaVarastoLayers.jsp"></jsp:include>
						</div>
						
					</div>	<!-- sivuvirtapotentiaaliTabs tab-content ends -->
				</div>	<!-- sivuvirtapotentiaaliTabs tab-pane ends  -->
			</div>	<!-- potentialTabs tab-content ends -->
		</div>	<!-- potentialTabs tab-pane ends -->
		
		<div id="originTabs" class="tab-pane fade">
			<ul class="nav nav-pills">
				<li class="active"><a data-toggle="tab" href="#forestTabs"><spring:message code="bma.forest"/></a></li>
				<li><a data-toggle="tab" href="#fieldTabs"><spring:message code="bma.agriculture"/></a></li>
				<li><a data-toggle="tab" title="Yhdyskunnat (asutus, kaupat ja julkiset palvelut)" href="#communitiesLayer"><spring:message code="bma.communities"/></a></li>
				<li><a data-toggle="tab" href="#companiesTabs"><spring:message code="bma.companies"/></a></li>
				<li><a data-toggle="tab" href="#wasteManagementLayer"><spring:message code="bma.treated_biodegradable_waste"/></a></li>
				<li><a data-toggle="tab" href="#incineratorsLayer"><spring:message code="bma.incernation_plants"/></a></li>
			</ul>
			
			<div class="tab-content">
				<div id="forestTabs" class="tab-pane fade in active">
					<ul class="nav nav-pills">
						<li class="active"><a data-toggle="tab" href="#kokonaisvarantoLayer"><spring:message code="bma.total_resources"/></a></li>
						<li><a data-toggle="tab" href="#metsähakepotentiaaliLayer"><spring:message code="bma.forest_chip_potential"/></a></li>
					</ul>
					<div class="tab-content table-responsive">
						<div id="kokonaisvarantoLayer" class="tab-pane fade in active">
							<jsp:include page="includes/totalStorageForestLayers.jsp"></jsp:include>
							<jsp:include page="includes/landUseForestLayers.jsp"></jsp:include>
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
						<li class="active"><a data-toggle="tab" href="#maankäyttöLayer"><spring:message code="bma.land_use"/></a></li>
						<li><a data-toggle="tab" href="#fieldBiomassLayer"><spring:message code="bma.biomasses"/></a></li>
						<li><a data-toggle="tab" href="#alkuperaMaatilaSivuvirrat"><spring:message code="bma.side_streams"/></a></li>
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
								<li class="active"><a data-toggle="tab" href="#alkuperaMaatilaSivuvirtaPeltokasvitLayer"><spring:message code="bma.crop_side_streams"/></a></li>
								<li><a data-toggle="tab" href="#alkuperaMaatilaSivuvirtaLantaElainsuojaLayer"><spring:message code="bma.manure_housing"/></a></li>
								<li><a data-toggle="tab" href="#alkuperaMaatilaSivuvirtaLantaVarastoLayer"><spring:message code="bma.manure_storage"/></a></li>
							</ul>
							<div class="tab-content">
								<div id="alkuperaMaatilaSivuvirtaPeltokasvitLayer" class="tab-pane fade in active">
									<jsp:include page="includes/sivuvirtaFieldLayers.jsp"></jsp:include>
								</div>
								<div id="alkuperaMaatilaSivuvirtaLantaElainsuojaLayer" class="tab-pane fade">
									<jsp:include page="includes/sivuvirtaLantaElainsuojaLayers.jsp"></jsp:include>
								</div>
								<div id="alkuperaMaatilaSivuvirtaLantaVarastoLayer" class="tab-pane fade">
									<jsp:include page="includes/sivuvirtaLantaVarastoLayers.jsp"></jsp:include>
								</div>
							</div>	<!-- sivuvirtapotentiaaliTabs tab-content ends -->
						</div>
					</div>
				</div>	<!-- fieldTabs div ends -->
				
				<div id="communitiesLayer" class="tab-pane fade">
					<jsp:include page="includes/municipalBioWasteLayers.jsp"></jsp:include>
				</div>
				
				<div id="companiesTabs" class="tab-pane fade">
					<jsp:include page="includes/workBioWasteLayers.jsp"></jsp:include>
				</div><!-- companiesTabs tab-pane ends -->
				
				<div id="wasteManagementLayer" class="tab-pane fade">
					<jsp:include page="includes/wasteManagementLayers.jsp"></jsp:include>
				</div>
				
				<div id="incineratorsLayer" class="tab-pane fade">
					<jsp:include page="includes/sivuvirtaTuhkaLayers.jsp"></jsp:include>
				</div>
				
			</div>	<!-- originTab tab-content ends -->
		</div>	<!-- originTab tab-pane ends -->
		<div id="nutrientTabs" class="tab-pane fade">
			<div class="tab-content">
				<div id="nutrientLayer" class="tab-pane fade in active">
					<jsp:include page="includes/nutrientLayers.jsp"></jsp:include>
				</div>
			</div>
		</div>
		<div id="searchTab" class="tab-pane fade">
			<div class="search-content">
				<div><spring:message code="bma.search_biomass_type"/></div>
				<div id="searchAttribute">
					<input type="text" id="searchText" size="35"/>
					<button id="searchBt" class="oskari-button bma-button"><spring:message code="bma.search_button"/></button>
				</div>
				<div id="showResults">
				</div>
			</div>
		</div> <!-- searchTab tab-pane ends -->
	</div> <!-- bmaLayerContent tab-content ends -->
</div></div>	<!-- bmaLayerContent ends -->
