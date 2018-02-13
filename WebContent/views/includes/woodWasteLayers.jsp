<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<div>
	<h4 class="biomass_layer_title"><spring:message code="bma.wood_waste_title"/></h4>
	<div class="biomass_info_icon icon-info">
		<input type="hidden" value="0931a5c0-b6e4-4956-ba83-8004334bfa59">
	</div>
</div>
<table class="table select-column standard-width waste-table" id="puujätteetLayerTable">
	<thead>
		<tr><td></td><td></td><th></th></tr>
	</thead>
	<tbody>
		<tr>
			<th scope="row">030101</th>
			<th scope="row">Puutuoteteollisuuden kuori- ja korkkijätteet, yritystoiminnasta</th>
			<td><input type="checkbox" name="waste" value='1110'></td>
		</tr>
		<tr>
			<th scope="row">030105</th>
			<th scope="row">Puutuoteteollisuuden vaarattomat sahajauho, lastut, palaset ja puupohjaiset levyt, yritystoiminnasta</th>
			<td><input type="checkbox" name="waste" value='1111'></td>
		</tr>
		<tr>
			<th scope="row">030301</th>
			<th scope="row">Massa- ja paperiteollisuuden kuori- ja puujätteet, yritystoiminnasta</th>
			<td><input type="checkbox" name="waste" value='1112'></td>
		</tr>
		<tr>
			<th scope="row">150103</th>
			<th scope="row">Puupakkaukset, yritystoiminnasta</th>
			<td><input type="checkbox" name="waste" value='1113'></td>
		</tr>
		<tr>
			<th scope="row">170201</th>
			<th scope="row">Rakentamisessa ja purkamisessa syntyvä puujäte, yritystoiminnasta</th>
			<td><input type="checkbox" name="waste" value='1114'></td>
		</tr>
		<tr>
			<th scope="row">191207</th>
			<th scope="row">Jätteiden mekaanisen käsittelyn vaaraton puujäte, yritystoiminnasta</th>
			<td><input type="checkbox" name="waste" value='1115'></td>
		</tr>
		<tr>
			<th scope="row">200138</th>
			<th scope="row">Yhdyskuntajätteen vaaraton puujäte, yritystoiminnasta</th>
			<td><input type="checkbox" name="waste" value='1116'></td>
		</tr>
	</tbody>
</table>