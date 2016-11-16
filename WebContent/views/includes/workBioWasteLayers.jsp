<ul class="nav nav-pills workBiowasteLayersNavPills">
	<li class="active"><a data-toggle="tab" href="#" id="elainJaKasvijätteetLayer_anchor">Eläin- ja kasvijätteet t/v 2014</a></li>
	<li><a data-toggle="tab" href="#" id="lietteetLayer_anchor">Lietteet t/v 2015</a></li>
	<li><a data-toggle="tab" href="#" id="paperijätteetLayer_anchor">Paperi- ja pahvijätteet t/v 2015</a></li>
	<li><a data-toggle="tab" href="#" id="puujätteetLayer_anchor">Puujätteet t/v 2015</a></li>
	<li><a data-toggle="tab" href="#" id="yhdyskuntienSekalainenBiohajoavaLayer_anchor">Yhdyskuntien sekalainen biohajoava jäte t/v 2015</a></li>
</ul>
<div class="tab-content table-responsive workBioWasteLayers">
	<div id="elainJaKasvijätteetLayer" class="tab-pane fade in active">
		<jsp:include page="animalAndPlantWasteLayers.jsp"></jsp:include>
	</div> <!-- elainJaKasvijätteetLayer div ends -->

	<div id="lietteetLayer" class="tab-pane fade">
		<jsp:include page="lietteetLayers.jsp"></jsp:include>
	</div> <!-- lietteetLayer div ends -->
	
	<div id="paperijätteetLayer" class="tab-pane fade">
		<h4>Paperi- ja pahvijätteet t/v 2015</h4>
		<table class="table select-column" id="paperijätteetLayerTable">
			<thead>
				<tr><td></td><th></th></tr>
			</thead>
			<tbody>
				<tr>
					<th style="width:80%;" scope="row">150101 Paperi- ja kartonkipakkaukset</th>
					<td style="width:20%;"><input type="checkbox" name="waste" value='1107'></td>
				</tr>
				<tr>
					<th scope="row">191201 Jätteiden mekaanisen käsittelyn paperi- ja kartonkijätteet</th>
					<td><input type="checkbox" name="waste" value='1108'></td>
				</tr>
				<tr>
					<th scope="row">200101 Yhdyskuntajätteen paperi ja kartonki</th>
					<td><input type="checkbox" name="waste" value='1109'></td>
				</tr>
			</tbody>
		</table>
	</div> <!-- paperijätteetLayer tab-pane ends -->
	
	<div id="puujätteetLayer" class="tab-pane fade">
		<jsp:include page="woodWasteLayers.jsp"></jsp:include>
	</div>	<!-- puujätteetLayer tab-pane ends -->
	
	<div id="yhdyskuntienSekalainenBiohajoavaLayer" class="tab-pane fade">
		<h4>Yhdyskuntien sekalainen biohajoava jäte t/v 2015</h4>
		<table class="table select-column" id="yhdyskuntienSekalainenBiohajoavaLayerTable">
			<thead>
				<tr><td></td><th></th></tr>
			</thead>
			<tbody>
				<tr>
					<th style="width:80%;" scope="row">200301 Sekalaiset yhdyskuntajätteet</th>
					<td style="width:20%;"><input type="checkbox" name="waste" value='1117'></td>
				</tr>
				<tr>
					<th scope="row">200399 Yhdyskuntajätteet, joita ei ole mainittu muualla</th>
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