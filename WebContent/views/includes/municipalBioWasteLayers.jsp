<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<div>
	<h4 class="biomass_layer_title"><spring:message code="bma.biodegradable_waste_communities_title"/></h4>
	<div class="biomass_info_icon icon-info">
		<input type="hidden" value="7021b3b8-f6f6-40b4-9346-ca0bfb69405f">
	</div>
</div>
<table class="table select-column standard-width">
	<thead>
		<tr><td></td><th></th></tr>
	</thead>
	<tbody>
		<tr>
			<th scope="row">Yhdyskuntien biojäte</th>
			<td><input type="checkbox" name="waste" value='1249'></td>
		</tr>
		<tr>
			<th scope="row">Yhdyskuntien muu biohajoava jäte</th>
			<td><input type="checkbox" name="waste" value='1261'></td>
		</tr>
	</tbody>
</table>
