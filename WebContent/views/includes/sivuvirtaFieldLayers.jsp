<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<div>
	<h4 class="biomass_layer_title"><spring:message code="bma.crop_side_streams.title"/></h4>
	<div class="biomass_info_icon icon-info">
		<input type="hidden" value="71341068-4813-4e48-9471-82ac534a6a8e">
	</div>
</div>
<table class="table select-column standard-width" id="sivuvirtaPeltokasvitLayerTable">
	<thead>
		 <tr><td></td><th></th></tr>
	</thead>
	<tbody>		
		<tr>
			<th scope="row"><spring:message code="bma.field_sidestream.cereal_straw"/></th>
			<td><input type="checkbox" name="field" value='1147'></td>
		</tr>
		<tr>
			<th scope="row"><spring:message code="bma.field_sidestream.stems_from_peas_and_broadbean"/></th>
			<td><input type="checkbox" name="field" value='1148'></td>
		</tr>
		<tr>
			<th scope="row"><spring:message code="bma.field_sidestream.potatoes_tops"/></th>
			<td><input type="checkbox" name="field" value='1300'></td>
		</tr>		
		<tr>
			<th scope="row"><spring:message code="bma.field_sidestream.sugarbeet_tops"/></th>
			<td><input type="checkbox" name="field" value='1149'></td>
		</tr>
		<tr>
			<th scope="row"><spring:message code="bma.field_sidestream.potential_additional_harvest_of_greenmanuring_sward"/></th>
			<td><input type="checkbox" name="field" value='1301'></td>
		</tr>
		<tr>
			<th scope="row"><spring:message code="bma.field_sidestream.straw_of_herbage_seed_crops"/></th>
			<td><input type="checkbox" name="field" value='1302'></td>
		</tr>
		<tr>
			<th scope="row"><spring:message code="bma.field_sidestream.potential_biomass_of_green_fallow"/></th>
			<td><input type="checkbox" name="field" value='1145'></td>
		</tr>
		<tr>
			<th scope="row"><spring:message code="bma.field_sidestream.biomass_of_bufferzone_vegetation"/></th>
			<td><input type="checkbox" name="field" value='1146'></td>
		</tr>		
		<tr>
			<th scope="row"><spring:message code="bma.field_sidestream.stems_of_oils_crops"/></th>
			<td><input type="checkbox" name="field" value='1150'></td>
		</tr>
	</tbody>
</table>
