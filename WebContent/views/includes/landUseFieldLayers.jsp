<div>
	<h4 class="biomass_layer_title">Pellon käyttö 2017, ha</h4>
	<div class="biomass_info_icon icon-info">
		<input type="hidden" value="42140a1a-da1e-4cd5-bc58-3246f9dd6f48">
	</div>
</div>

<style>
	#menuToggle { cursor: pointer; color:blue; }
	tbody.subMenuToggle tr th { padding-left:20px; };
</style>
<script>
	$('#menuToggle').click(function() {
		$(".subMenuToggle").toggle();
		$(this).find('span:first').toggleClass('glyphicon glyphicon-collapse-down glyphicon glyphicon-collapse-up');
	});
</script>

<table class="table select-column standard-width">
	<thead>
		<tr><td></td><th></th></tr>
	</thead>
	<tbody>
		<tr>
			<th scope="row" id="menuToggle" >
			<span class="glyphicon glyphicon glyphicon-collapse-down" data-toggle="collapse"></span>
			Käytössä oleva maatalousmaa</th>
			<td><input type="checkbox" name="field" value='1303'></td>
		</tr>
		<tr>
			<tbody class="subMenuToggle" style="display:none; padding-left:100px;">
			<tr>
				<th scope="row">Syysvehnä</th>
				<td><input type="checkbox" name="field" value='1276'></td>
			</tr>
			<tr>
				<th scope="row">Kevätvehnä</th>
				<td><input type="checkbox" name="field" value='1277'></td>
			</tr>
			<tr>
				<th scope="row">Kevätruis</th>
				<td><input type="checkbox" name="field" value='1278'></td>
			</tr>
			<tr>
				<th scope="row">Ruis</th>
				<td><input type="checkbox" name="field" value='1279'></td>
			</tr>
			<tr>
				<th scope="row">Ruisvehnä</th>
				<td><input type="checkbox" name="field" value='1280'></td>
			</tr>
			<tr>
				<th scope="row">Muu ohra</th>
				<td><input type="checkbox" name="field" value='1281'></td>
			</tr>
			<tr>
				<th scope="row">Mallasohra</th>
				<td><input type="checkbox" name="field" value='1282'></td>
			</tr>
			<tr>
				<th scope="row">Kaura</th>
				<td><input type="checkbox" name="field" value='1283'></td>
			</tr>
			<tr>
				<th scope="row">Seosvilja</th>
				<td><input type="checkbox" name="field" value='1284'></td>
			</tr>
			<tr>
				<th scope="row">Vihantavilja</th>
				<td><input type="checkbox" name="field" value='1285'></td>
			</tr>
			<tr>
				<th scope="row">Herne</th>
				<td><input type="checkbox" name="field" value='1286'></td>
			</tr>
			<tr>
				<th scope="row">Seoskasvustot</th>
				<td><input type="checkbox" name="field" value='1048'></td>
			</tr>
			<tr>
				<th scope="row">Härkäpapu</th>
				<td><input type="checkbox" name="field" value='1287'></td>
			</tr>
			<tr>
				<th scope="row">Peruna</th>
				<td><input type="checkbox" name="field" value='1049'></td>
			</tr>
			<tr>
				<th scope="row">Sokerijuurikas</th>
				<td><input type="checkbox" name="field" value='1051'></td>
			</tr>
			<tr>
				<th scope="row">Rypsi</th>
				<td><input type="checkbox" name="field" value='1288'></td>
			</tr>
			<tr>
				<th scope="row">Rapsi</th>
				<td><input type="checkbox" name="field" value='1289'></td>
			</tr>
			<tr>
				<th scope="row">Erikoiskasvit</th>
				<td><input type="checkbox" name="field" value='1290'></td>
			</tr>
			<tr>
				<th scope="row">Muut öljykasvit</th>
				<td><input type="checkbox" name="field" value='1291'></td>
			</tr>
			<tr>
				<th scope="row">Kuitu- ja energiakasvit</th>
				<td><input type="checkbox" name="field" value='1046'></td>
			</tr>
			<tr>
				<th scope="row">Avomaan vihannekset ja juurekset</th>
				<td><input type="checkbox" name="field" value='1157'></td>
			</tr>
			<tr>
				<th scope="row">Marjapensaat, hedelmäpuut ja mansikka</th>
				<td><input type="checkbox" name="field" value='1240'></td>
			</tr>		
			<tr>
				<th scope="row">Kumina</th>
				<td><input type="checkbox" name="field" value='1292'></td>
			</tr>
			<tr>
				<th scope="row">Viherlannoitusnurmi</th>
				<td><input type="checkbox" name="field" value='1252'></td>
			</tr>
			<tr>
				<th scope="row">Viljelty laidun</th>
				<td><input type="checkbox" name="field" value='1054'></td>
			</tr>
			<tr>
				<th scope="row">Säilörehunurmi</th>
				<td><input type="checkbox" name="field" value='1250'></td>
			</tr>
			<tr>
				<th scope="row">Kuivaheinä</th>
				<td><input type="checkbox" name="field" value='1251'></td>
			</tr> 
			<tr>
				<th scope="row">Tuorerehunurmi</th>
				<td><input type="checkbox" name="field" value='1253'></td>
			</tr>
			<tr>
				<th scope="row">Luonnonlaidun</th>
				<td><input type="checkbox" name="field" value='1047'></td>
			</tr>
			<tr>
				<th scope="row">Siemennurmi</th>
				<td><input type="checkbox" name="field" value='1050'></td>
			</tr>		
			<tr>
				<th scope="row"> Kesanto, viljelemätön, ym. erityisalat</th>
				<td><input type="checkbox" name="field" value='1045'></td>
			</tr>
			<tr>
				<th scope="row">Viherkesanto ja luonnonhoitopelto</th>
				<td><input type="checkbox" name="field" value='1055'></td>
			</tr>
			<tr>
				<th scope="row">Suojavyöhykkeet ja -kaistat</th>
				<td><input type="checkbox" name="field" value='1293'></td>
			</tr>
			</tbody>
		</tr>
	</tbody>
</table>