<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<div>
	<h4 class="biomass_layer_title"><spring:message code="bma.small_trees.title"/></h4>
	<div class="biomass_info_icon icon-info">
		<input type="hidden" value="0e8e4cdc-54f3-43b3-80bc-1faf0db0ea53">
	</div>
</div>
<table class="table select-column standard-width">
	<thead>
		<tr><td></td><th></th></tr>
	</thead>
	<tbody>
		<tr><th><spring:message code="bma.small_trees.diameter_10cm"/></th><td><input type="checkbox" value='1259'></td></tr>
		<tr><th><spring:message code="bma.small_trees.diameter_14cm"/></th><td><input type="checkbox" value='1260'></td></tr>
	</tbody>
</table>

<div>
	<h4 class="biomass_layer_title"><spring:message code="bma.logging_residues.title"/></h4>
	<div class="biomass_info_icon icon-info">
		<input type="hidden" value="0e8e4cdc-54f3-43b3-80bc-1faf0db0ea53">
	</div>
</div>
<table class="table select-column standard-width">
	<thead>
		<tr>
			<td></td>
			<th class="styled-heading"><spring:message code="bma.pine"/></th>
			<th class="styled-heading even-col"><spring:message code="bma.spruce"/></th>
			<th class="styled-heading"><spring:message code="bma.broad_leaved_trees"/></th>
		</tr>
	</thead>
	<tbody>
		<tr class="select-row">
			<th scope="row"><spring:message code="bma.realized_cutting_removals"/></th>
			<td><input type="checkbox" value='1129'></td>
			<td><input type="checkbox" value='1042'></td>
			<td><input type="checkbox" value='1127'></td>
		</tr>
		<tr class="select-row">
			<th scope="row"><spring:message code="bma.maximum_sustainable_removal"/></th>
			<td><input type="checkbox" value='1128'></td>
			<td><input type="checkbox" value='1125'></td>
			<td><input type="checkbox" value='1126'></td>
		</tr>
	</tbody>
</table>

<div>
	<h4 class="biomass_layer_title"><spring:message code="bma.stumps.title"/></h4>
	<div class="biomass_info_icon icon-info">
		<input type="hidden" value="0e8e4cdc-54f3-43b3-80bc-1faf0db0ea53">
	</div>
</div>
<table class="table select-column standard-width">
	<thead>
		<tr>
			<td></td>
			<th class="styled-heading"><spring:message code="bma.pine"/></th>
			<th class="styled-heading even-col"><spring:message code="bma.spruce"/></th>
			<th class="styled-heading"><spring:message code="bma.broad_leaved_trees"/></th>
		</tr>
	</thead>
	<tbody>
		<tr class="select-row">
			<th scope="row"><spring:message code="bma.realized_cutting_removals"/></th>
			<td><input type="checkbox" value='1123'></td>
			<td><input type="checkbox" value='1121'></td>
			<td></td>
		</tr>
		<tr class="select-row">
			<th scope="row"><spring:message code="bma.maximum_sustainable_removal"/></th>
			<td><input type="checkbox" value='1122'></td>
			<td><input type="checkbox" value='1120'></td>
			<td></td>
		</tr>
	</tbody>
</table>
