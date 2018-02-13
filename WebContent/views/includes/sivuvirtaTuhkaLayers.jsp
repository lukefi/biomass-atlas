<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<div>
	<h4 class="biomass_layer_title"><spring:message code="bma.asses_title"/></h4>
	<div class="biomass_info_icon icon-info">
		<input type="hidden" value="13141e71-4bad-4445-a491-ecc5e25f26ca">
	</div>
</div>
<table class="table select-column standard-width waste-table">
	<thead>
		<tr><td></td><td></td><th></th></tr>
	</thead>
	<tbody>
		<tr>
			<th scope="row">100101</th>
			<th scope="row">Pohjatuhka, kuona ja kattilatuhka</th>
			<td><input type="checkbox" name="waste" value='1254'></td>
		</tr>
		<tr>
			<th scope="row">100102</th>
			<th scope="row">Hiilen poltossa syntyvä lentotuhka</th>
			<td><input type="checkbox" name="waste" value='1255'></td>
		</tr>
		<tr>
			<th scope="row">100103</th>
			<th scope="row">Turpeen ja käsittelemättömän puun polton lentotuhka</th>
			<td><input type="checkbox" name="waste" value='1256'></td>
		</tr>
		<tr>
			<th scope="row">100115</th>
			<th scope="row">Rinnakkaispolton pohjatuhka, kuona ja kattilatuhka</th>
			<td><input type="checkbox" name="waste" value='1257'></td>
		</tr>
		<tr>
			<th scope="row">100117</th>
			<th scope="row">Rinnakkaispolton lentotuhka</th>
			<td><input type="checkbox" name="waste" value='1258'></td>
		</tr>
	</tbody>
</table>
