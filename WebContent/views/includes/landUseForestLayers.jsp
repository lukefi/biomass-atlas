<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<div>
	<h4 class="biomass_layer_title"><spring:message code="bma.land_class.title"/></h4>
	<div class="biomass_info_icon icon-info">
		<input type="hidden" value="6636acb3-cc10-4693-ad27-24504fc05899">
	</div>
</div>
<table class="table select-column standard-width">
<thead>
	<tr><td></td><th></th></tr>
</thead>
<tbody>
	<tr><th><spring:message code="bma.land_class.forest_land"/></th><td><input type="checkbox" value='1035'></td></tr>
	<tr><th><spring:message code="bma.land_class.poorly_productive_land"/></th><td><input type="checkbox" value='1036'></td></tr>
	<tr><th><spring:message code="bma.land_class.unproductive_land"/></th><td><input type="checkbox" value='1037'></td></tr>
</tbody>
</table>

<div>
	<h4 class="biomass_layer_title"><spring:message code="bma.land_class_based_on_FAO_FRA.title"/></h4>
	<div class="biomass_info_icon icon-info">
		<input type="hidden" value="6636acb3-cc10-4693-ad27-24504fc05899">
	</div>
</div>
<table class="table select-column standard-width">
<thead>
	<tr><td></td><th></th></tr>
</thead>
<tbody>
	<tr><th><spring:message code="bma.land_class_based_on_FAO_FRA.forest"/></th><td><input type="checkbox" value='1038'></td></tr>
	<tr><th><spring:message code="bma.land_class_based_on_FAO_FRA.other_wooded_land"/></th><td><input type="checkbox" value='1039'></td></tr>
	<tr><th><spring:message code="bma.land_class_based_on_FAO_FRA.other_land"/></th><td><input type="checkbox" value='1040'></td></tr>
	<tr><th><spring:message code="bma.land_class_based_on_FAO_FRA.other_land_with_trees"/></th><td><input type="checkbox" value='1041'></td></tr>
</tbody>
</table>

<div>
	<h4 class="biomass_layer_title"><spring:message code="bma.site_main_class.title"/></h4>
	<div class="biomass_info_icon icon-info">
		<input type="hidden" value="6636acb3-cc10-4693-ad27-24504fc05899">
	</div>
</div>
<table class="table select-column standard-width">
<thead>
	<tr><td></td><th></th></tr>
</thead>
<tbody>
	<tr><th><spring:message code="bma.site_main_class.mineral_soil"/></th><td><input type="checkbox" name="forest" value='1023'></td></tr>
	<tr><th><spring:message code="bma.site_main_class.spruce_mire"/></th><td><input type="checkbox" name="forest" value='1024'></td></tr>
	<tr><th><spring:message code="bma.site_main_class.pine_mire"/></th><td><input type="checkbox" name="forest" value='1025'></td></tr>
	<tr><th><spring:message code="bma.site_main_class.treeless_peatland"/></th><td><input type="checkbox" name="forest" value='1026'></td></tr>
</tbody>
</table>

<div>
	<h4 class="biomass_layer_title"><spring:message code="bma.site_fertility.title"/></h4>
	<div class="biomass_info_icon icon-info">
		<input type="hidden" value="6636acb3-cc10-4693-ad27-24504fc05899">
	</div>
</div>
<table class="table select-column standard-width">
<thead>
	<tr><td></td><th></th></tr>
</thead>
<tbody>
	<tr><th><spring:message code="bma.site_fertility.herb_rich_site"/></th><td><input type="checkbox" value='1027'></td></tr>
	<tr><th><spring:message code="bma.site_fertility.herb_rich_health_forest"/></th><td><input type="checkbox" value='1028'></td></tr>
	<tr><th><spring:message code="bma.site_fertility.mesic_forest"/></th><td><input type="checkbox" value='1029'></td></tr>
	<tr><th><spring:message code="bma.site_fertility.subxeric_forest"/></th><td><input type="checkbox" value='1030'></td></tr>
	<tr><th><spring:message code="bma.site_fertility.xeric_forest"/></th><td><input type="checkbox" value='1031'></td></tr>
	<tr><th><spring:message code="bma.site_fertility.barren_forest"/></th><td><input type="checkbox" value='1032'></td></tr>
	<tr><th><spring:message code="bma.site_fertility.rocky_sandy_soil_and_alluvial"/></th><td><input type="checkbox" value='1033'></td></tr>
	<tr><th><spring:message code="bma.site_fertility.summit_and_field_land"/></th><td><input type="checkbox" value='1034'></td></tr>
</tbody>
</table>
