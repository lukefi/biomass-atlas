<ul class="nav nav-pills workBiowasteLayersNavPills">
	<li class="active"><a data-toggle="tab" href="#" id="elainJaKasvij�tteetLayer_anchor">El�in- ja kasvij�tteet t/v 2014</a></li>
	<li><a data-toggle="tab" href="#" id="lietteetLayer_anchor">Lietteet t/v 2015</a></li>
	<li><a data-toggle="tab" href="#" id="paperij�tteetLayer_anchor">Paperi- ja pahvij�tteet t/v 2015</a></li>
	<li><a data-toggle="tab" href="#" id="puuj�tteetLayer_anchor">Puuj�tteet t/v 2015</a></li>
	<li><a data-toggle="tab" href="#" id="yhdyskuntienSekalainenBiohajoavaLayer_anchor">Yhdyskuntien sekalainen biohajoava j�te t/v 2015</a></li>
</ul>
<div class="tab-content table-responsive workBioWasteLayers">
	<div id="elainJaKasvij�tteetLayer" class="tab-pane fade in active">
		<jsp:include page="animalAndPlantWasteLayers.jsp"></jsp:include>
	</div> <!-- elainJaKasvij�tteetLayer div ends -->

	<div id="lietteetLayer" class="tab-pane fade">
		<jsp:include page="lietteetLayers.jsp"></jsp:include>
	</div> <!-- lietteetLayer div ends -->
	
	<div id="paperij�tteetLayer" class="tab-pane fade">
		<h4>Paperi- ja pahvij�tteet t/v 2015</h4>
		<table class="table select-column" id="paperij�tteetLayerTable">
			<thead>
				<tr><td></td><th></th></tr>
			</thead>
			<tbody>
				<tr>
					<th style="width:80%;" scope="row">150101 Paperi- ja kartonkipakkaukset</th>
					<td style="width:20%;"><input type="checkbox" name="waste" value='1107'></td>
				</tr>
				<tr>
					<th scope="row">191201 J�tteiden mekaanisen k�sittelyn paperi- ja kartonkij�tteet</th>
					<td><input type="checkbox" name="waste" value='1108'></td>
				</tr>
				<tr>
					<th scope="row">200101 Yhdyskuntaj�tteen paperi ja kartonki</th>
					<td><input type="checkbox" name="waste" value='1109'></td>
				</tr>
			</tbody>
		</table>
	</div> <!-- paperij�tteetLayer tab-pane ends -->
	
	<div id="puuj�tteetLayer" class="tab-pane fade">
		<jsp:include page="woodWasteLayers.jsp"></jsp:include>
	</div>	<!-- puuj�tteetLayer tab-pane ends -->
	
	<div id="yhdyskuntienSekalainenBiohajoavaLayer" class="tab-pane fade">
		<h4>Yhdyskuntien sekalainen biohajoava j�te t/v 2015</h4>
		<table class="table select-column" id="yhdyskuntienSekalainenBiohajoavaLayerTable">
			<thead>
				<tr><td></td><th></th></tr>
			</thead>
			<tbody>
				<tr>
					<th style="width:80%;" scope="row">200301 Sekalaiset yhdyskuntaj�tteet</th>
					<td style="width:20%;"><input type="checkbox" name="waste" value='1117'></td>
				</tr>
				<tr>
					<th scope="row">200399 Yhdyskuntaj�tteet, joita ei ole mainittu muualla</th>
					<td><input type="checkbox" name="waste" value='1118'></td>
				</tr>
			</tbody>
		</table>
	</div>	<!-- yhdyskuntienSekalainenBiohajoavaLayer tab-pane ends -->
</div>	<!-- sivuvirtaYritystenBiojatteetLayerTabs tab-content ends -->

<script type="text/javascript">
$(document).ready(function () {
	/* Activate and de-activate the tab, which is clicked */
	$('.workBiowasteLayersNavPills a').on('click', function() {
		var id = $(this).attr('id').split('_')[0],	// Extracting 'id' part to navigate that div.
			workBioWasteLayers = $(this).closest('div').find('.workBioWasteLayers');
		
		// De-activate all the divs 
		$.each(workBioWasteLayers.find('div'), function () {
			if ($(this).hasClass('in active'))
				$(this).removeClass('in active');
		});
		// Activate only div, which matches the 'id' value.
		workBioWasteLayers.find('#' + id).addClass('in active');
	});
});
</script>