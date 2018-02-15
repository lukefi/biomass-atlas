<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<div>
	<h4 class="biomass_layer_title"><spring:message code="bma.forest_biomasses.title"/></h4>
	<div class="biomass_info_icon icon-info">
		<input type="hidden" value="6636acb3-cc10-4693-ad27-24504fc05899">
	</div>
</div>
<table class="table select-column standard-width" id="kokonaisvarantoLayerTable">
	<thead>
		<tr>
			<th></th>
			<th><spring:message code="bma.forest_biomasses.pine"/></th>
			<th class="even-col"><spring:message code="bma.forest_biomasses.spruce"/></th>
			<th><spring:message code="bma.forest_biomasses.broad_leaved_trees"/></th>
		</tr>
	</thead>
	<tbody>
		<tr class="select-row">
			<th scope="row"><spring:message code="bma.forest_biomasses.living_branches"/></th>
			<td><input type="checkbox" name="forest" value='1016'></td>
			<td><input type="checkbox" name="forest" value='1002'></td>
			<td><input type="checkbox" name="forest" value='1009'></td>
		</tr>
		<tr class="select-row">
			<th scope="row"><spring:message code="bma.forest_biomasses.stem_residual"/></th>
			<td><input type="checkbox" name="forest" value='1017'></td>
			<td><input type="checkbox" name="forest" value='1003'></td>
			<td><input type="checkbox" name="forest" value='1010'></td>
		</tr>
		<tr class="select-row">
			<th scope="row"><spring:message code="bma.forest_biomasses.roots"/></th>
			<td><input type="checkbox" name="forest" value='1018'></td>
			<td><input type="checkbox" name="forest" value='1004'></td>
			<td><input type="checkbox" name="forest" value='1011'></td>
		</tr>
		<tr class="select-row">
			<th scope="row"><spring:message code="bma.forest_biomasses.stump"/></th>
			<td><input type="checkbox" name="forest" value='1019'></td>
			<td><input type="checkbox" name="forest" value='1005'></td>
			<td><input type="checkbox" name="forest" value='1012'></td>
		</tr>
		<tr class="select-row">
			<th scope="row"><spring:message code="bma.forest_biomasses.dead_branches"/></th>
			<td><input type="checkbox" name="forest" value='1020'></td>
			<td><input type="checkbox" name="forest" value='1006'></td>
			<td><input type="checkbox" name="forest" value='1013'></td>
		</tr>
		<tr class="select-row">
			<th scope="row"><spring:message code="bma.forest_biomasses.stem_and_bark"/></th>
			<td><input type="checkbox" name="forest" value='1021'></td>
			<td><input type="checkbox" name="forest" value='1007'></td>
			<td><input type="checkbox" name="forest" value='1014'></td>
		</tr>
		<tr class="select-row">
			<th scope="row"><spring:message code="bma.forest_biomasses.foliage"/></th>
			<td><input type="checkbox" name="forest" value='1022'></td> <!-- Neulaset  -->
			<td><input type="checkbox" name="forest" value='1008'></td> <!-- Neulaset  -->
			<td><input type="checkbox" name="forest" value='1015'></td> <!-- Lehvästö  -->
		</tr>
	</tbody>
</table>
