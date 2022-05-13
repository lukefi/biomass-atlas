<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<div>
	<h4 class="biomass_layer_title"><spring:message code="bma.manure_storage.title"/></h4>
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
			<td><input type="checkbox" value='1199'></td>
			<td><input type="checkbox" value='1232'></td>
			<td><input type="checkbox" value='1203'></td>
		</tr>
		<tr class="select-row">
			<th scope="row"><spring:message code="bma.manure.beef_cattle"/></th>
			<td><input type="checkbox" value='1204'></td>
			<td><input type="checkbox" value='1233'></td>
			<td><input type="checkbox" value='1208'></td>
		</tr>
		<tr class="select-row">
			<th scope="row"><spring:message code="bma.manure.sows_and_piglets"/></th>
			<td><input type="checkbox" value='1209'></td>
			<td><input type="checkbox" value='1234'></td>
			<td><input type="checkbox" value='1213'></td>
		</tr>
		<tr class="select-row">
			<th scope="row"><spring:message code="bma.manure.fattening_pig"/></th>
			<td><input type="checkbox" value='1214'></td>
			<td><input type="checkbox" value='1235'></td>
			<td><input type="checkbox" value='1218'></td>
		</tr>
		<tr class="select-row">
			<th scope="row"><spring:message code="bma.manure.laying_hens"/></th>
			<td><input type="checkbox" value='1219'></td>
			<td><input type="checkbox" value='1236'></td>
			<td></td>
		</tr>
		<tr class="select-row">
			<th scope="row"><spring:message code="bma.manure.broiler_turkey_and_other_poultry"/></th>
			<td></td>
			<td><input type="checkbox" value='1237'></td>
			<td></td>
		</tr>
		<tr class="select-row">
			<th scope="row"><spring:message code="bma.manure.sheeps_and_goats"/></th>
			<td></td>
			<td><input type="checkbox" value='1238'></td>
			<td></td>
		</tr>
		<tr class="select-row">
			<th scope="row"><spring:message code="bma.manure.horses_and_ponies"/></th>
			<td></td>
			<td><input type="checkbox" value='1239'></td>
			<td></td>
		</tr>
		<tr class="select-row">
			<th scope="row"><spring:message code="bma.manure.fur_animals"/></th>
			<td></td>
			<td><input type="checkbox" value='1231'></td>
			<td></td>
		</tr>
	</tbody>
</table>
