<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<div>
	<h4 class="biomass_layer_title"><spring:message code="bma.manure_housing.title"/></h4>
	<div class="biomass_info_icon icon-info">
		<input type="hidden" value="5cd36aa9-4d33-4018-b98a-143ad57380b3">
	</div>
</div>
<table class="table select-column standard-width">
<thead>
	<tr>
		<td></td>
		<th class="styled-heading"><spring:message code="bma.manure.slurry"/></th>
		<th class="styled-heading even-col"><spring:message code="bma.manure.dung"/></th>
		<th class="styled-heading"><spring:message code="bma.manure.urine"/></th>

	</tr>
</thead>
<tbody>
	<tr class="select-row">
		<th scope="row"><spring:message code="bma.manure.dairy_cattle"/></th>
		<td><input type="checkbox" value='1158'></td>
		<td><input type="checkbox" value='1191'></td>
		<td><input type="checkbox" value='1162'></td>
	</tr>
	<tr class="select-row">
		<th scope="row"><spring:message code="bma.manure.beef_cattle"/></th>
		<td><input type="checkbox" value='1163'></td>
		<td><input type="checkbox" value='1192'></td>
		<td><input type="checkbox" value='1167'></td>
	</tr>
	<tr class="select-row">
		<th scope="row"><spring:message code="bma.manure.sows_and_piglets"/></th>
		<td><input type="checkbox" value='1168'></td>
		<td><input type="checkbox" value='1193'></td>
		<td><input type="checkbox" value='1172'></td>
	</tr>
	<tr class="select-row">
		<th scope="row"><spring:message code="bma.manure.fattening_pig"/></th>
		<td><input type="checkbox" value='1173'></td>
		<td><input type="checkbox" value='1194'></td>
		<td><input type="checkbox" value='1177'></td>
	</tr>
	<tr class="select-row">
		<th scope="row"><spring:message code="bma.manure.laying_hens"/></th>
		<td><input type="checkbox" value='1178'></td>
		<td><input type="checkbox" value='1195'></td>
		<td></td>
	</tr>
	<tr class="select-row">
		<th scope="row"><spring:message code="bma.manure.broiler_turkey_and_other_poultry"/></th>
		<td><input type="checkbox" value='1182'></td>
		<td><input type="checkbox" value='1196'></td>
		<td></td>
	</tr>
	<tr class="select-row">
		<th scope="row"><spring:message code="bma.manure.sheeps_and_goats"/></th>
		<td></td>
		<td><input type="checkbox" value='1197'></td>
		<td></td>
	</tr>
	<tr class="select-row">
		<th scope="row"><spring:message code="bma.manure.horses_and_ponies"/></th>
		<td></td>
		<td><input type="checkbox" value='1198'></td>
		<td></td>
	</tr>
	<tr class="select-row">
		<th scope="row"><spring:message code="bma.manure.fur_animals"/></th>
		<td></td>
		<td><input type="checkbox" value='1190'></td>
		<td></td>
	</tr>
</tbody>
</table>
