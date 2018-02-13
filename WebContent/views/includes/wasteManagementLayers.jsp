<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<ul class="nav nav-pills wasteTreatmentLayersNavPills">
	<li class="active"><a data-toggle="tab" href="#" id="wasteTreatmentElainJaKasvijätteetLayer_anchor"><spring:message code="bma.animal_and_plant_waste"/></a></li>
	<li><a data-toggle="tab" href="#" id="wasteTreatmentLietteetLayer_anchor"><spring:message code="bma.sludges"/></a></li>
	<li><a data-toggle="tab" href="#" id="wasteTreatmentPaperijätteetLayer_anchor"><spring:message code="bma.paper_and_cardboard_waste"/></a></li>
	<li><a data-toggle="tab" href="#" id="wasteTreatmentPuujätteetLayer_anchor"><spring:message code="bma.wood_waste"/></a></li>
	<li><a data-toggle="tab" href="#" id="wasteTreatmentYhdyskuntienSekalainenBiohajoavaLayer_anchor"><spring:message code="bma.mixed_waste"/></a></li>
</ul>
<div class="tab-content table-responsive wasteTreatmentLayers">
	<div id="wasteTreatmentElainJaKasvijätteetLayer" class="tab-pane fade in active">
		<div>
			<h4 class="biomass_layer_title"><spring:message code="bma.animal_and_plant_waste_title"/></h4>
			<div class="biomass_info_icon icon-info">
				<input type="hidden" value="2f083a3f-bc0d-4e97-b0ec-aeef9af55fb2">
			</div>
		</div>
		<table class="table select-column standard-width waste-table" id="wasteTreatmentElainJaKasvijätteetLayerTable">
			<thead>
				<tr><td></td><td></td><th></th></tr>
			</thead>
			<tbody>
				<tr>
					<th scope="row">200108</th>
					<th scope="row">Keittiö- ja ruokalajätteet, jätteenkäsittelystä</th>
					<td><input type="checkbox" name="waste" value='1272'></td>
				</tr>
				<tr>
					<th scope="row">200201</th>
					<th scope="row">Puutarha- ja puistojätteet, jätteenkäsittelystä</th>
					<td><input type="checkbox" name="waste" value='1274'></td>
				</tr>
			</tbody>
		</table>
	</div> <!-- wasteTreatmentElainJaKasvijätteetLayer div ends -->
	
	<div id="wasteTreatmentLietteetLayer" class="tab-pane fade">
		<div>
			<h4 class="biomass_layer_title"><spring:message code='bma.sludges_title'/></h4>
			<div class="biomass_info_icon icon-info">
				<input type="hidden" value="2f083a3f-bc0d-4e97-b0ec-aeef9af55fb2">
			</div>
		</div>
		<table class="table select-column standard-width waste-table" id="wasteTreatmentLietteetLayerTable">
			<thead>
				<tr><td></td><td></td><th></th></tr>
			</thead>
			<tbody>
				<tr>
					<th scope="row">030311</th>
					<th scope="row">Massa- ja paperiteollisuuden jätevesilietteet lukuunottamatta kuitujätteitä sekä kuitu-, täyteaine- ja päällystysainelietteitä, jätteenkäsittelystä</th>
					<td><input type="checkbox" name="waste" value='1263'></td>
				</tr>
				<tr>
					<th scope="row">190604</th>
					<th scope="row">Yhdyskuntajätteiden anaerobisessa käsittelyssä syntyvä liete, jätteenkäsittelystä</th>
					<td><input type="checkbox" name="waste" value='1265'></td>
				</tr>
				<tr>
					<th scope="row">190606</th>
					<th scope="row">Eläin- ja kasvijätteiden anaerobisessa käsittelyssä syntyvä liete, jätteenkäsittelystä</th>
					<td><input type="checkbox" name="waste" value='1266'></td>
				</tr>
				<tr>
					<th scope="row">190805</th>
					<th scope="row">Asumisjätevesien käsittelyssä syntyvät lietteet, jätteenkäsittelystä</th>
					<td><input type="checkbox" name="waste" value='1267'></td>
				</tr>
				<tr>
					<th scope="row">190805G</th>
					<th scope="row">Kompostoitu asumisjätevesien käsittelyssä muodostunut liete, jätteenkäsittelystä</th>
					<td><input type="checkbox" name="waste" value='1268'></td>
				</tr>
			</tbody>
		</table>
	</div> <!-- wasteTreatmentLietteetLayer div ends -->

	<div id="wasteTreatmentPaperijätteetLayer" class="tab-pane fade">
		<div>
			<h4 class="biomass_layer_title"><spring:message code="bma.paper_and_cardboard_waste_title"/></h4>
			<div class="biomass_info_icon icon-info">
				<input type="hidden" value="2f083a3f-bc0d-4e97-b0ec-aeef9af55fb2">
			</div>
		</div>
		<table class="table select-column standard-width waste-table" id="wasteTreatmentPaperijätteetLayerTable">
			<thead>
				<tr><td></td><td></td><th></th></tr>
			</thead>
			<tbody>
				<tr>
					<th scope="row">191201</th>
					<th scope="row">Jätteiden mekaanisen käsittelyn paperi- ja kartonkijätteet, jätteenkäsittelystä</th>
					<td><input type="checkbox" name="waste" value='1269'></td>
				</tr>
				<tr>
					<th scope="row">200101</th>
					<th scope="row">Yhdyskuntajätteen paperi ja kartonki, jätteenkäsittelystä</th>
					<td><input type="checkbox" name="waste" value='1271'></td>
				</tr>
			</tbody>
		</table>
	</div> <!-- wasteTreatmentPaperijätteetLayer tab-pane ends -->
	
	<div id="wasteTreatmentPuujätteetLayer" class="tab-pane fade">
		<div>
			<h4 class="biomass_layer_title"><spring:message code="bma.wood_waste_title"/></h4>
			<div class="biomass_info_icon icon-info">
				<input type="hidden" value="2f083a3f-bc0d-4e97-b0ec-aeef9af55fb2">
			</div>
		</div>
		<table class="table select-column standard-width waste-table" id="wasteTreatmentPuujätteetLayerTable">
			<thead>
				<tr><td></td><td></td><th></th></tr>
			</thead>
			<tbody>
				<tr>
					<th scope="row">030101</th>
					<th scope="row">Puutuoteteollisuuden kuori- ja korkkijätteet, jätteenkäsittelystä</th>
					<td><input type="checkbox" name="waste" value='1262'></td>
				</tr>
				<tr>
					<th scope="row">150103</th>
					<th scope="row">Puupakkaukset, jätteenkäsittelystä</th>
					<td><input type="checkbox" name="waste" value='1264'></td>
				</tr>
				<tr>
					<th scope="row">191207</th>
					<th scope="row">Jätteiden mekaanisen käsittelyn vaaraton puujäte, jätteenkäsittelystä</th>
					<td><input type="checkbox" name="waste" value='1270'></td>
				</tr>
				<tr>
					<th scope="row">200138</th>
					<th scope="row">Yhdyskuntajätteen vaaraton puujäte, jätteenkäsittelystä</th>
					<td><input type="checkbox" name="waste" value='1273'></td>
				</tr>
			</tbody>
		</table>
	</div> <!-- wasteTreatmentPuujätteetLayer tab-pane ends -->
	
	<div id="wasteTreatmentYhdyskuntienSekalainenBiohajoavaLayer" class="tab-pane fade">
		<div>
			<h4 class="biomass_layer_title"><spring:message code="bma.mixed_waste_communities_title"/></h4>
			<div class="biomass_info_icon icon-info">
				<input type="hidden" value="2f083a3f-bc0d-4e97-b0ec-aeef9af55fb2">
			</div>
		</div>
		<table class="table select-column standard-width waste-table" id="wasteTreatmentYhdyskuntienSekalainenBiohajoavaLayerTable">
			<thead>
				<tr><td></td><td></td><th></th></tr>
			</thead>
			<tbody>
				<tr>
					<th scope="row">200301</th>
					<th scope="row">Sekalaiset yhdyskuntajätteet, jätteenkäsittelystä</th>
					<td><input type="checkbox" name="waste" value='1275'></td>
				</tr>
			</tbody>
		</table>
	</div>	<!-- wasteTreatmentYhdyskuntienSekalainenBiohajoavaLayer tab-pane ends -->
	
</div>	<!-- sivuvirtaYritystenBiojatteetLayerTabs tab-content ends -->

<script type="text/javascript">
$(document).ready(function () {
	/* Activate and de-activate the tab, which is clicked */
	$('.wasteTreatmentLayersNavPills a').on('click', function() {
		var id = $(this).attr('id').split('_')[0],	// Extracting 'id' part to navigate that div.
			workBioWasteLayers = $(this).closest('div').find('.wasteTreatmentLayers');
		
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