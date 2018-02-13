<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<div>
	<h4 class="biomass_layer_title"><spring:message code="bma.animal_and_plant_waste_title"/></h4>
	<div class="biomass_info_icon icon-info">
		<input type="hidden" value="0931a5c0-b6e4-4956-ba83-8004334bfa59">
	</div>
</div>

<table class="table select-column standard-width waste-table" id="elainJaKasvijätteetLayerTable">
	<thead>
		<tr><td></td><td></td><th></th></tr>
	</thead>
	<tbody>
		<tr>
			<th scope="row">020101</th>
			<th scope="row">Alkutuotannon pesu- ja puhdistuslietteet, yritystoiminnasta</th>
			<td><input type="checkbox" name="waste" value='1057'></td>	
		</tr>
		<tr>
			<th scope="row">020102</th>
			<th scope="row">Alkutuotannon eläinkudosjätteet, yritystoiminnasta</th>
			<td><input type="checkbox" name="waste" value='1058'></td>	
		</tr>
		<tr>
			<th scope="row">020103</th>
			<th scope="row">Alkutuotannon kasvijätteet, yritystoiminnasta</th>
			<td><input type="checkbox" name="waste" value='1059'></td>	
		</tr>
	<!-- 	<tr>
			<th scope="row">020106 Eläinten ulosteet, virtsa ja lanta</th>
			<td><input type="checkbox" name="waste" value='1060'></td>
		</tr> -->
		<tr>
			<th scope="row">020107</th>
			<th scope="row">Metsätalouden jätteet, yritystoiminnasta</th>
			<td><input type="checkbox" name="waste" value='1061'></td>
		</tr>
		<tr>
			<th scope="row">020199</th>
			<th scope="row">Alkutuotannon muut jätteet, yritystoiminnasta</th>
			<td><input type="checkbox" name="waste" value='1062'></td>
		</tr>
		<tr>
			<th scope="row">020201</th>
			<th scope="row">Lihatuotteiden tuotannon pesu- ja puhdistuslietteet, yritystoiminnasta</th>
			<td><input type="checkbox" name="waste" value='1063'></td>
		</tr>
		<tr>
			<th scope="row">020202</th>
			<th scope="row">Liha- ja kalatuotteiden tuotannon eläinkudosjätteet, yritystoiminnasta</th>
			<td><input type="checkbox" name="waste" value='1064'></td>
		</tr>
		<tr>
			<th scope="row">020203</th>
			<th scope="row">Liha- ja kalatuotteiden tuotannon käyttöön soveltumattomat aineet, yritystoiminnasta</th>
			<td><input type="checkbox" name="waste" value='1065'></td>
		</tr>
		<tr>
			<th scope="row">020299</th>
			<th scope="row">Lihatuotteiden tuotannon muut jätteet, yritystoiminnasta</th>
			<td><input type="checkbox" name="waste" value='1066'></td>
		</tr>
		<tr>
			<th scope="row">020301</th>
			<th scope="row">Kasvistuotteiden valmistuksen erilaiset lietteet, yritystoiminnasta</th>
			<td><input type="checkbox" name="waste" value='1067'></td>
		</tr>
		<tr>
			<th scope="row">020303</th>
			<th scope="row">Kasvistuotteiden valmistuksen liuotinuuton jätteet, yritystoiminnasta</th>
			<td><input type="checkbox" name="waste" value='1068'></td>
		</tr>
		<tr>
			<th scope="row">020304</th>
			<th scope="row">Kasvistuotteiden valmistuksen käyttöön soveltumattomat aineet, yritystoiminnasta</th>
			<td><input type="checkbox" name="waste" value='1069'></td>
		</tr>
		<tr>
			<th scope="row">020399</th>
			<th scope="row">Kasvistuotteiden valmistuksen muut jätteet, yritystoiminnasta</th>
			<td><input type="checkbox" name="waste" value='1070'></td>
		</tr>
		<tr>
			<th scope="row">020499</th>
			<th scope="row">Sokerinjalostuksen muut jätteet, yritystoiminnasta</th>
			<td><input type="checkbox" name="waste" value='1071'></td>
		</tr>
		<tr>
			<th scope="row">020501</th>
			<th scope="row">Meijerituotteiden valmistuksen käyttöön soveltumattomat aineet, yritystoiminnasta</th>
			<td><input type="checkbox" name="waste" value='1072'></td>
		</tr>
		<tr>
			<th scope="row">020599</th>
			<th scope="row">Maidonjalostuksen muut jätteet, yritystoiminnasta</th>
			<td><input type="checkbox" name="waste" value='1073'></td>
		</tr>
		<tr>
			<th scope="row">020601</th>
			<th scope="row">Leipomotuotteiden ja makeisten valmistuksen käyttöön soveltumattomat aineet, yritystoiminnasta</th>
			<td><input type="checkbox" name="waste" value='1074'></td>
		</tr>
		<tr>
			<th scope="row">020602</th>
			<th scope="row">Leipomotuotteiden ja makeisten valmistuksen säilöntäainejätteet, yritystoiminnasta</th>
			<td><input type="checkbox" name="waste" value='1075'></td>
		</tr>
		<tr>
			<th scope="row">020701</th>
			<th scope="row">Juomien valmistuksen raaka-aineiden käsittelyn jätteet, yritystoiminnasta</th>
			<td><input type="checkbox" name="waste" value='1076'></td>
		</tr>
		<tr>
			<th scope="row">020702</th>
			<th scope="row">Juomien valmistuksen tislausjätteet, yritystoiminnasta</th>
			<td><input type="checkbox" name="waste" value='1077'></td>
		</tr>
		<tr>
			<th scope="row">020704</th>
			<th scope="row">Juomien valmistuksen käyttöön soveltumattomat aineet, yritystoiminnasta</th>
			<td><input type="checkbox" name="waste" value='1078'></td>
		</tr>
		<tr>
			<th scope="row">200108</th>
			<th scope="row">Keittiö- ja ruokalajätteet, yritystoiminnasta</th>
			<td><input type="checkbox" name="waste" value='1079'></td>
		</tr>
		<tr>
			<th scope="row">200125</th>
			<th scope="row">Ruokaöljyt ja ravintorasvat, yritystoiminnasta</th>
			<td><input type="checkbox" name="waste" value='1080'></td>
		</tr>
		<tr>
			<th scope="row">200201</th>
			<th scope="row">Puutarha- ja puistojätteet, yritystoiminnasta</th>
			<td><input type="checkbox" name="waste" value='1081'></td>
		</tr>
		<tr>
			<th scope="row">200302</th>
			<th scope="row">Torikaupan jätteet, yritystoiminnasta</th>
			<td><input type="checkbox" name="waste" value='1082'></td>
		</tr>
	</tbody>
</table>