<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<ul class="nav nav-pills workBiowasteLayersNavPills">
	<li class="active"><a data-toggle="tab" href="#" id="elainJaKasvijätteetLayer_anchor"><spring:message code="bma.animal_and_plant_waste"/></a></li>
	<li><a data-toggle="tab" href="#" id="lietteetLayer_anchor"><spring:message code="bma.sludges"/></a></li>
	<li><a data-toggle="tab" href="#" id="paperijätteetLayer_anchor"><spring:message code="bma.paper_and_cardboard_waste"/></a></li>
	<li><a data-toggle="tab" href="#" id="puujätteetLayer_anchor"><spring:message code="bma.wood_waste"/></a></li>
	<li><a data-toggle="tab" href="#" id="yhdyskuntienSekalainenBiohajoavaLayer_anchor"><spring:message code="bma.mixed_waste"/></a></li>
</ul>
<div class="tab-content table-responsive workBioWasteLayers">
	<div id="elainJaKasvijätteetLayer" class="tab-pane fade in active">
		<jsp:include page="animalAndPlantWasteLayers.jsp"></jsp:include>
	</div> <!-- elainJaKasvijätteetLayer div ends -->

	<div id="lietteetLayer" class="tab-pane fade">
		<jsp:include page="lietteetLayers.jsp"></jsp:include>
	</div> <!-- lietteetLayer div ends -->
	
	<div id="paperijätteetLayer" class="tab-pane fade">
		<div>
			<h4 class="biomass_layer_title"><spring:message code="bma.paper_and_cardboard_waste.title"/></h4>
			<div class="biomass_info_icon icon-info">
				<input type="hidden" value="0931a5c0-b6e4-4956-ba83-8004334bfa59">
			</div>
		</div>
		<table class="table select-column standard-width waste-table" id="paperijätteetLayerTable">
			<thead>
				<tr><td></td><td></td><th></th></tr>
			</thead>
			<tbody>
				<tr>
					<th scope="row">150101</th>
					<th scope="row"><spring:message code="bma.companies_biowaste.paper_and_cardboard_waste.150101"/></th>
					<td><input type="checkbox" name="waste" value='1107'></td>
				</tr>
				<tr>
					<th scope="row">191201</th>
					<th scope="row"><spring:message code="bma.companies_biowaste.paper_and_cardboard_waste.191201"/></th>
					<td><input type="checkbox" name="waste" value='1108'></td>
				</tr>
				<tr>
					<th scope="row">200101</th>
					<th scope="row"><spring:message code="bma.companies_biowaste.paper_and_cardboard_waste.200101"/></th>
					<td><input type="checkbox" name="waste" value='1109'></td>
				</tr>
			</tbody>
		</table>
	</div> <!-- paperijätteetLayer tab-pane ends -->
	
	<div id="puujätteetLayer" class="tab-pane fade">
		<jsp:include page="woodWasteLayers.jsp"></jsp:include>
	</div>	<!-- puujätteetLayer tab-pane ends -->
	
	<div id="yhdyskuntienSekalainenBiohajoavaLayer" class="tab-pane fade">
		<div>
			<h4 class="biomass_layer_title"><spring:message code="bma.mixed_waste_communities.title"/></h4>
			<div class="biomass_info_icon icon-info">
				<input type="hidden" value="0931a5c0-b6e4-4956-ba83-8004334bfa59">
			</div>
		</div>
		<table class="table select-column standard-width waste-table" id="yhdyskuntienSekalainenBiohajoavaLayerTable">
			<thead>
				<tr><td></td><td></td><th></th></tr>
			</thead>
			<tbody>
				<tr>
					<th scope="row">200301</th>
					<th scope="row"><spring:message code="bma.companies_biowaste.mixed_waste.200301"/></th>
					<td><input type="checkbox" name="waste" value='1117'></td>
				</tr>
				<tr>
					<th scope="row">200399</th>
					<th scope="row"><spring:message code="bma.companies_biowaste.mixed_waste.200399"/></th>
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