<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<div style="margin-top: 20px;">
</div>

<table class="table select-column standard-width" id="nutrientLayerTable">
	<thead>
		<tr>
			<th></th>
			<th>N</th>
			<th class="even-col">N-soluble</th>
			<th>P</th>
		</tr>
	</thead>
	<tbody>
		<tr class="select-row">
			<th scope="row"><spring:message code="bma.field_sidestream.cereal_straw"/></th>
			<td><input type="checkbox" name="nutrient" value='2147'></td>
			<td><input type="checkbox" name="nutrient" value='3147'></td>
			<td><input type="checkbox" name="nutrient" value='4147'></td>
		</tr>
		<tr class="select-row">
			<th scope="row">Test 1</th>
			<td><input type="checkbox" name="nutrient" value=''></td>
			<td><input type="checkbox" name="nutrient" value=''></td>
			<td><input type="checkbox" name="nutrient" value=''></td>
		</tr>
		<tr class="select-row">
			<th scope="row">Test 2</th>
			<td><input type="checkbox" name="nutrient" value=''></td>
			<td><input type="checkbox" name="nutrient" value=''></td>
			<td><input type="checkbox" name="nutrient" value=''></td>
		</tr>
	</tbody>
</table>
