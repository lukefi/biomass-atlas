<style type="text/css">
	.selectAllIcon {
		margin-left: 10px;
		cursor: pointer;
	}
</style>

<script type="text/javascript">
$(document).ready(function () {
	var addSelectRowFunctionality = function(table) {
		table.find("tr").each(function() {
			var row = jQuery(this);
			if (row.find("input[type='checkbox']").length == 0) {
				return;
			}
			var th = row.find("th").first();
			var icon = jQuery("<span/>");
			icon.addClass("glyphicon").addClass("glyphicon-check").addClass("selectAllIcon");
			icon.attr("title", "Valitse kaikki");
			th.append(icon);
			icon.click(function() {
				if (row.find("input:not(:checked)").length == 0) {
					row.find("input[type='checkbox']").prop("checked", false);
				}
				else {
					row.find("input[type='checkbox']").prop("checked", true);
				}
			});
		});
	};
	addSelectRowFunctionality(jQuery("#forestLayerTable"));
});
</script>

<div id="bmaLayerContent">
	<ul class="nav nav-pills">
		<li class="active"><a data-toggle="tab" href="#potentialTabs">Biomassapotentiaalin
				mukaan</a></li>
		<li><a data-toggle="tab" href="#originTabs">Alkuperän mukaan</a></li>
		<div class='oskari-flyouttool-close icon-close icon-close'
			id="closeBmaLayerContent"></div>

	</ul>
	<div class="tab-content">
	<div id="potentialTabs" class="tab-pane fade in active">
		<ul class="nav nav-pills">
			<li class="active"><a data-toggle="tab" href="#maanpeiteLayer">Maanpeite</a></li>
			<li><a data-toggle="tab" href="#kokonaistuotantoLayer">Kokonaistuotanto</a></li>
			<li><a data-toggle="tab" href="#sivuvirtapotentiaaliTabs">Sivuvirtapotentiaali</a></li>
		</ul>
		<div class="tab-content">
			<div id="maanpeiteLayer" class="tab-pane fade in active">
			</div>
			<div id="kokonaistuotantoLayer" class="tab-pane fade">
			</div>
			<div id="sivuvirtapotentiaaliTabs" class="tab-pane fade">
				<ul class="nav nav-pills">
					<li class="active"><a data-toggle="tab" href="#sivuvirtaMetsahakeLayer">Metsähake</a></li>
					<li><a data-toggle="tab" href="#sivuvirtaBiojatteetLayer">Biojätteet</a></li>
					<li><a data-toggle="tab" href="#sivuvirtaPeltokasvitLayer">Peltokasvien sivuvirrat</a></li>
					<li><a data-toggle="tab" href="#sivuvirtaLantaElainsuojaLayer">Lanta eläinsuojasta</a></li>
					<li><a data-toggle="tab" href="#sivuvirtaLantaVarastoLayer">Lanta varastosta</a></li>
				</ul>
			</div>
		</div>
	</div>
	<div id="originTabs" class="tab-pane fade">
		<ul class="nav nav-pills">
			<li class="active"><a data-toggle="tab" href="#forestLayer">Metsä</a></li>
			<li><a data-toggle="tab" href="#fieldLayer">Pelto</a></li>
		</ul>

		<div class="tab-content table-responsive">
			<div id="forestLayer" class="tab-pane fade in active">
				<table class="table table-hover table-bordered"
					id="forestLayerTable">
					<thead class="thead-default">
						<tr>
							<th></th>
							<th>Kuusi</th>
							<th>Lehtipuut</th>
							<th>Mänty</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<th scope="row">Elävät oksat</th>
							<td><input type="checkbox" name="forest" value='1002'></td>
							<td><input type="checkbox" name="forest" value='1009'></td>
							<td><input type="checkbox" name="forest" value='1016'></td>
						</tr>
						<tr>
							<th scope="row">Hukkapuuosa</th>
							<td><input type="checkbox" name="forest" value='1003'></td>
							<td><input type="checkbox" name="forest" value='1010'></td>
							<td><input type="checkbox" name="forest" value='1017'></td>
						</tr>
						<tr>
							<th scope="row">Juuret, d > 1 cm</th>
							<td><input type="checkbox" name="forest" value='1004'></td>
							<td><input type="checkbox" name="forest" value='1011'></td>
							<td><input type="checkbox" name="forest" value='1018'></td>
						</tr>
						<tr>
							<th scope="row">Kanto</th>
							<td><input type="checkbox" name="forest" value='1005'></td>
							<td><input type="checkbox" name="forest" value='1012'></td>
							<td><input type="checkbox" name="forest" value='1019'></td>
						</tr>
						<tr>
							<th scope="row">Kuolleet oksat</th>
							<td><input type="checkbox" name="forest" value='1006'></td>
							<td><input type="checkbox" name="forest" value='1013'></td>
							<td><input type="checkbox" name="forest" value='1020'></td>
						</tr>
						<tr>
							<th scope="row">Kuorellinen runkopuu</th>
							<td><input type="checkbox" name="forest" value='1007'></td>
							<td><input type="checkbox" name="forest" value='1014'></td>
							<td><input type="checkbox" name="forest" value='1021'></td>
						</tr>
						<tr>
							<th scope="row">Neulaset</th>
							<td><input type="checkbox" name="forest" value='1008'></td>
							<td></td>
							<td><input type="checkbox" name="forest" value='1022'></td>
						</tr>
						<tr>
							<th scope="row">Lehvästö</th>
							<td></td>
							<td><input type="checkbox" name="forest" value='1015'></td>
							<td></td>
						</tr>
					</tbody>
				</table>
			</div>
			<!-- forestLayer div ends -->
			<div id="fieldLayer" class="tab-pane fade">
				<table class="table table-hover table-bordered" id="fieldLayerTable">
					<tbody>
						<tr>
							<th scope="row">Juurekset ja vihannekset</th>
							<td><input type="checkbox" name="field" value='1043'></td>
						</tr>
						<tr>
							<th scope="row">Kasvihuonekasvit</th>
							<td><input type="checkbox" name="field" value='1044'></td>
						</tr>
						<tr>
							<th scope="row">Kesanto</th>
							<td><input type="checkbox" name="field" value='1045'></td>
						</tr>
						<tr>
							<th scope="row">Kuitu- ja energiakasvit</th>
							<td><input type="checkbox" name="field" value='1046'></td>
						</tr>
						<tr>
							<th scope="row">Maisema- ja metsäpellot</th>
							<td><input type="checkbox" name="field" value='1047'></td>
						</tr>
						<tr>
							<th scope="row">Nurmi</th>
							<td><input type="checkbox" name="field" value='1048'></td>
						</tr>
						<tr>
							<th scope="row">Peruna</th>
							<td><input type="checkbox" name="field" value='1049'></td>
						</tr>
						<tr>
							<th scope="row">Siemenviljely</th>
							<td><input type="checkbox" name="field" value='1050'></td>
						</tr>
						<tr>
							<th scope="row">Sokerijuurikas</th>
							<td><input type="checkbox" name="field" value='1051'></td>
						</tr>
						<tr>
							<th scope="row">Suojavyöhyke- ja kaista</th>
							<td><input type="checkbox" name="field" value='1052'></td>
						</tr>
						<tr>
							<th scope="row">Valkuaiskasvit</th>
							<td><input type="checkbox" name="field" value='1053'></td>
						</tr>
						<tr>
							<th scope="row">Viljat</th>
							<td><input type="checkbox" name="field" value='1054'></td>
						</tr>
						<tr>
							<th scope="row">Viljelemätön</th>
							<td><input type="checkbox" name="field" value='1055'></td>
						</tr>
						<tr>
							<th scope="row">Öljykasvit</th>
							<td><input type="checkbox" name="field" value='1056'></td>
						</tr>
					</tbody>
				</table>
			</div>
			<!-- fieldLayer div ends -->
		</div>
	</div>
	<!-- tab-content div ends -->
	</div>
</div>