<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<div>
	<h4 class="biomass_layer_title"><spring:message code="bma.wood_waste.title"/></h4>
	<div class="biomass_info_icon icon-info">
		<input type="hidden" value="e42f0f04-c01c-44fc-8f72-b7a445678643">
	</div>
</div>
<table class="table select-column standard-width waste-table" id="puujätteetLayerTable">
	<thead>
		<tr><td></td><td></td><th></th></tr>
	</thead>
	<tbody>
		<tr>
			<th scope="row">030101</th>
			<th scope="row"><spring:message code="bma.companies_biowaste.wood_waste.030101"/></th>
			<td><input type="checkbox" name="waste" value='1110'></td>
		</tr>
		<tr>
			<th scope="row">030105</th>
			<th scope="row"><spring:message code="bma.companies_biowaste.wood_waste.030105"/></th>
			<td><input type="checkbox" name="waste" value='1111'></td>
		</tr>
		<tr>
			<th scope="row">030301</th>
			<th scope="row"><spring:message code="bma.companies_biowaste.wood_waste.030301"/></th>
			<td><input type="checkbox" name="waste" value='1112'></td>
		</tr>
		<tr>
			<th scope="row">150103</th>
			<th scope="row"><spring:message code="bma.companies_biowaste.wood_waste.150103"/></th>
			<td><input type="checkbox" name="waste" value='1113'></td>
		</tr>
		<tr>
			<th scope="row">170201</th>
			<th scope="row"><spring:message code="bma.companies_biowaste.wood_waste.170201"/></th>
			<td><input type="checkbox" name="waste" value='1114'></td>
		</tr>
		<tr>
			<th scope="row">191207</th>
			<th scope="row"><spring:message code="bma.companies_biowaste.wood_waste.191207"/></th>
			<td><input type="checkbox" name="waste" value='1115'></td>
		</tr>
		<tr>
			<th scope="row">200138</th>
			<th scope="row"><spring:message code="bma.companies_biowaste.wood_waste.200138"/></th>
			<td><input type="checkbox" name="waste" value='1116'></td>
		</tr>
	</tbody>
</table>