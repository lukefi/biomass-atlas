<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<div>
	<h4 class="biomass_layer_title"><spring:message code="bma.small_trees.title"/></h4>
	<div class="biomass_info_icon icon-info">
		<input type="hidden" value="c779ec80-0a74-4e5b-b48e-302e2a6d96b3">
	</div>
</div>
<table class="table select-column standard-width">
	<thead>
		<tr><td></td><th></th></tr>
	</thead>
	<tbody>
		<tr><th><spring:message code="bma.small_trees.first_thinnings_smaller_than_pulpwood"/></th><td><input type="checkbox" value='1332'></td></tr>
		<tr><th><spring:message code="bma.small_trees.first_thinnings"/></th><td><input type="checkbox" value='1333'></td></tr>
	</tbody>
</table>

<div>
	<h4 class="biomass_layer_title"><spring:message code="bma.logging_residues.title"/></h4>
	<div class="biomass_info_icon icon-info">
		<input type="hidden" value="c779ec80-0a74-4e5b-b48e-302e2a6d96b3">
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
		<input type="hidden" value="c779ec80-0a74-4e5b-b48e-302e2a6d96b3">
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
			<th scope="row"><spring:message code="bma.maximum_sustainable_removal"/></th>
			<td><input type="checkbox" value='1122'></td>
			<td><input type="checkbox" value='1120'></td>
			<td></td>
		</tr>
	</tbody>
</table>
