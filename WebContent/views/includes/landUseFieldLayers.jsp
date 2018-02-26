<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<div>
	<h4 class="biomass_layer_title"><spring:message code="bma.field_land_use.title"/></h4>
	<div class="biomass_info_icon icon-info">
		<input type="hidden" value="48430c98-e372-4a4a-b707-d3feeb484dd1">
	</div>
</div>

<table class="table select-column standard-width">
	<thead>
		<tr><td></td><th></th></tr>
	</thead>
	<tbody>
		<tr>
			<th scope="row" class="mainLevelToggle" >
			<span class="glyphicon glyphicon glyphicon-collapse-down" data-toggle="collapse"></span>
			<spring:message code="bma.field_land_use.utilized_agricultural_area"/></th>
			<td><input type="checkbox" name="field" value='1303'></td>
		</tr>
		<tr>
			<tbody class="openMainToggle" style="display:none; padding-left:100px;">
			<tr>
				<th scope="row"><spring:message code="bma.field_land_use.winter_wheat"/></th>
				<td><input type="checkbox" name="field" value='1276'></td>
			</tr>
			<tr>
				<th scope="row"><spring:message code="bma.field_land_use.spring_wheat"/></th>
				<td><input type="checkbox" name="field" value='1277'></td>
			</tr>
			<tr>
				<th scope="row"><spring:message code="bma.field_land_use.spring_rye"/></th>
				<td><input type="checkbox" name="field" value='1278'></td>
			</tr>
			<tr>
				<th scope="row"><spring:message code="bma.field_land_use.rye"/></th>
				<td><input type="checkbox" name="field" value='1279'></td>
			</tr>
			<tr>
				<th scope="row"><spring:message code="bma.field_land_use.triticale"/></th>
				<td><input type="checkbox" name="field" value='1280'></td>
			</tr>
			<tr>
				<th scope="row"><spring:message code="bma.field_land_use.other_barley"/></th>
				<td><input type="checkbox" name="field" value='1281'></td>
			</tr>
			<tr>
				<th scope="row"><spring:message code="bma.field_land_use.malting_barley"/></th>
				<td><input type="checkbox" name="field" value='1282'></td>
			</tr>
			<tr>
				<th scope="row"><spring:message code="bma.field_land_use.oats"/></th>
				<td><input type="checkbox" name="field" value='1283'></td>
			</tr>
			<tr>
				<th scope="row"><spring:message code="bma.field_land_use.mixed_cereals"/></th>
				<td><input type="checkbox" name="field" value='1284'></td>
			</tr>
			<tr>
				<th scope="row"><spring:message code="bma.field_land_use.whole_crop_creals"/></th>
				<td><input type="checkbox" name="field" value='1285'></td>
			</tr>
			<tr>
				<th scope="row"><spring:message code="bma.field_land_use.peas"/></th>
				<td><input type="checkbox" name="field" value='1286'></td>
			</tr>
			<tr>
				<th scope="row"><spring:message code="bma.field_land_use.mixed_crops"/></th>
				<td><input type="checkbox" name="field" value='1048'></td>
			</tr>
			<tr>
				<th scope="row"><spring:message code="bma.field_land_use.broad_beans"/></th>
				<td><input type="checkbox" name="field" value='1287'></td>
			</tr>
			<tr>
				<th scope="row"><spring:message code="bma.field_land_use.potatoes"/></th>
				<td><input type="checkbox" name="field" value='1049'></td>
			</tr>
			<tr>
				<th scope="row"><spring:message code="bma.field_land_use.sugar_beets"/></th>
				<td><input type="checkbox" name="field" value='1051'></td>
			</tr>
			<tr>
				<th scope="row"><spring:message code="bma.field_land_use.turnip_rape"/></th>
				<td><input type="checkbox" name="field" value='1288'></td>
			</tr>
			<tr>
				<th scope="row"><spring:message code="bma.field_land_use.rape"/></th>
				<td><input type="checkbox" name="field" value='1289'></td>
			</tr>
			<tr>
				<th scope="row"><spring:message code="bma.field_land_use.special_crops"/></th>
				<td><input type="checkbox" name="field" value='1290'></td>
			</tr>
			<tr>
				<th scope="row"><spring:message code="bma.field_land_use.other_oil_crops"/></th>
				<td><input type="checkbox" name="field" value='1291'></td>
			</tr>
			<tr>
				<th scope="row"><spring:message code="bma.field_land_use.fiber_and_energy_plants"/></th>
				<td><input type="checkbox" name="field" value='1046'></td>
			</tr>
			<tr>
				<th scope="row"><spring:message code="bma.field_land_use.outdoor_vegetables_and_roots"/></th>
				<td><input type="checkbox" name="field" value='1157'></td>
			</tr>
			<tr>
				<th scope="row"><spring:message code="bma.field_land_use.berry_bushes_and_fruits"/></th>
				<td><input type="checkbox" name="field" value='1240'></td>
			</tr>		
			<tr>
				<th scope="row"><spring:message code="bma.field_land_use.cumin"/></th>
				<td><input type="checkbox" name="field" value='1292'></td>
			</tr>
			<tr>
				<th scope="row"><spring:message code="bma.field_land_use.green_manure_sward"/></th>
				<td><input type="checkbox" name="field" value='1252'></td>
			</tr>
			<tr>
				<th scope="row"><spring:message code="bma.field_land_use.cultivated_pasture"/></th>
				<td><input type="checkbox" name="field" value='1054'></td>
			</tr>
			<tr>
				<th scope="row"><spring:message code="bma.field_land_use.silage_sward"/></th>
				<td><input type="checkbox" name="field" value='1250'></td>
			</tr>
			<tr>
				<th scope="row"><spring:message code="bma.field_land_use.hay"/></th>
				<td><input type="checkbox" name="field" value='1251'></td>
			</tr> 
			<tr>
				<th scope="row"><spring:message code="bma.field_land_use.fresh_silage_sward"/></th>
				<td><input type="checkbox" name="field" value='1253'></td>
			</tr>
			<tr>
				<th scope="row"><spring:message code="bma.field_land_use.natural_pasture"/></th>
				<td><input type="checkbox" name="field" value='1047'></td>
			</tr>
			<tr>
				<th scope="row"><spring:message code="bma.field_land_use.herbage_seed_production"/></th>
				<td><input type="checkbox" name="field" value='1050'></td>
			</tr>		
			<tr>
				<th scope="row"><spring:message code="bma.field_land_use.set_aside_uncultivated"/></th>
				<td><input type="checkbox" name="field" value='1045'></td>
			</tr>
			<tr>
				<th scope="row"><spring:message code="bma.field_land_use.green_fallow_and_nature_managed_fields"/></th>
				<td><input type="checkbox" name="field" value='1055'></td>
			</tr>
			<tr>
				<th scope="row"><spring:message code="bma.field_land_use.buffer_zone_and_strips"/></th>
				<td><input type="checkbox" name="field" value='1293'></td>
			</tr>
			</tbody>
		</tr>
	</tbody>
</table>