/**
 * @class Oskari.bma.bundle.circle.CircleBundle.Flyout
 *
 */
Oskari.clazz.define('Oskari.bma.bundle.circle.CircleBundle.Flyout',

/**
 * @method create called automatically on construction
 * @static
 *
 * Always extend this class, never use as is.
 */
function(instance, locale, conf) {
	/* @property instance bundle instance */
	this.instance = instance;

	/* @property locale locale for this */
	this.locale = locale;

	/* @property conf conf for this */
	this.conf = conf;

	/* @property container the DIV element */
	this.container = null;
	
	this.template = null;
	this.templateCircleMessage = jQuery('<div id="circle-message">Valitse piste ja säde, jonka biomassa lasketaan</div><div class="horizontal-line">.</div>');
	this.templateCircleResult = jQuery('<div id="circle-result"></div>');
	this.templateCircleRadius = jQuery('<div id="circle-radius"><label id="circle-radius-label">Säde: </label><input id="circle-radius-value" size="10" disabled></input> km</div>'
			+ '<div class="horizontal-line">.</div>');
	this.templateCirclePoint = jQuery('<div id="circle-point"><label id="circle-point-label">Piste: </label><input id="circle-point-value" disabled></input></div>');
	this.templateCircleCalculateCancelTool = jQuery('<div id="circle-calclulate-tool"><button class="circle-button" id="circle-calculate"></button>' +
			'<span id="circle-cancel-tool"><button class="circle-button" id="circle-cancel"></button></span> </div>');
}, {	
	/**
	 * @property template HTML templates for the User Interface
	 * @static
	 */
	templates : {
		content : "<div class='metadataflyout_content'></div>"
	},
	getName : function() {
		return 'Oskari.bma.bundle.circle.CircleBundle.Flyout';
	},
	setEl : function(el, width, height) {
		this.container = jQuery(el);
	},
	startPlugin : function() {
		this.template = jQuery('<div></div>');		
	},
	stopPlugin : function() {
		this.container.empty();
	},
	getTitle : function() {
		return "Mittaustulokset";
	},
	getDescription : function() {

	},
	getOptions : function() {

	},
	/**
	 * Create Measurement UI
	 * @method createUI
	 * @public
	 */
	createUI: function(){
		var me = this,
			sandbox = me.instance.getSandbox();
		
		me.isCircleButtonClicked = true;
		me._removeMarker();
        me._removeCircleFeature();
		
		// clear container
		var cel = jQuery(me.container);
		cel.empty();
        var content = me.template.clone();
        cel.append(content);

        var circleMessage = me.templateCircleMessage.clone();
        var circleResult = me.templateCircleResult.clone();
        var circleRadius = me.templateCircleRadius.clone();
        var circlePoint = me.templateCirclePoint.clone();
        var calculateCancelTool = me.templateCircleCalculateCancelTool.clone();
        
        calculateCancelTool.find('#circle-calculate').html("Laske");
        calculateCancelTool.find('#circle-calculate').unbind('click');
        calculateCancelTool.find('#circle-calculate').bind('click', function(){        	
        	me._calculateButtonClick();
        });
        
        calculateCancelTool.find('#circle-cancel').html("Lopeta");
        calculateCancelTool.find('#circle-cancel').unbind('click');
        calculateCancelTool.find('#circle-cancel').bind('click', function(){        	
        	me._cancelButtonClick();     	
        });
        
        circleRadius.find('#circle-radius-value').unbind('keyup');
        circleRadius.find('#circle-radius-value').bind('keyup', function(){        	
        	me._updateCalculateButtonVisibility(me);  
        });
	
        content.addClass('bma-circle-main-div');
        content.append(circleMessage);
        content.append(circleResult);
        content.append(circlePoint);
        content.append(circleRadius);       
        content.append(calculateCancelTool);
    	
    	me._updateCalculateButtonVisibility(me);
    	    	
    	me._closeIconClickHandler();
	},
	
	_closeIconClickHandler: function() {
		var me = this,
			parent = me.container.parents('.oskari-flyout');
    	parent.find('.oskari-flyouttool-close').click(function(){
    		me._cancelButtonClick();
    	});
	},
	/**
     * @method close
     * Closes the flyout
     */
    _close : function() {    	
        var instance = this.instance,
        	sandbox = instance.getSandbox();
        sandbox.postRequestByName('userinterface.UpdateExtensionRequest', [instance, 'close']);  
    },
		
	_updateCalculateButtonVisibility : function(me) {
		var btn = $("#circle-calculate");
		if (($.trim($("#circle-radius-value").val()) != '') && 
				($.trim($("#circle-point-value").val()) != '')) {
			btn.attr("disabled", false);
		}
		else {
			btn.attr("disabled", true);
		}
	},
	
	_getVisibleBiomassAttributeIds : function() {
		//This is copy-paste from polygon biomass calculation tool
		var sandbox = this.instance.getSandbox(),
			layers = sandbox.findAllSelectedMapLayers(),
			biomassAttributeIds = [];
		for (var i = 0; i < layers.length; i++) {
			var layer = layers[i];
			if ("bma" in layer.getOptions()) {
				biomassAttributeIds.push(layer.getOptions()["bma"].id);
			}
		}
		return biomassAttributeIds;
	},
	
	
	_calculateButtonClick: function(){
		var me = this,
			sandbox = me.instance.getSandbox(),
			points = [],
			requestForAddFeature;
		if (me._validateRadiusValue()) {			
			var point = $('#circle-point-value').val(),
				feature = new OpenLayers.Format.WKT().read(point);
			points.push({x: feature.geometry.x, y: feature.geometry.y});
			var queryData = JSON.stringify({
								points: points, 
								radius: $('#circle-radius-value').val(), 
								attributes: me._getVisibleBiomassAttributeIds(sandbox)
							}); 
			jQuery.ajax({
				url: "/biomass/circle/calculate",
				type: "POST",
				contentType: "application/json; charset=UTF-8",
				data: queryData,
				dataType: "json",
				success: function(results, status, xhr) {
					requestForAddFeature = sandbox.getRequestBuilder(
							"MapModulePlugin.AddFeaturesToMapRequest" );				
					var style = OpenLayers.Util.applyDefaults(
					        {fillColor: '#9900FF', fillOpacity: 0.5, strokeColor: '#000000'},
					        OpenLayers.Feature.Vector.style["default"]);
		
					sandbox.request(me.instance, requestForAddFeature( results.geo, 'WKT', 
							{id: 'Main'}, null, null, true, style, false));
					
					var finalResult = "";					
					for (var key in results.values) {
						finalResult += key + ': ' + results.values[key].value + " " + results.values[key].unit + "<br>";
					}			
					
					me._showResult(finalResult);
				}
			});
		} else {
			alert("Enter valid radius value.");
		}
	},
	
	_cancelButtonClick: function(){
		var me = this,
			instance = me.instance,
			sandbox = instance.getSandbox(),
			toolbarRequest = sandbox.getRequestBuilder('Toolbar.SelectToolButtonRequest')();
        sandbox.request(instance, toolbarRequest);
        me.isCircleButtonClicked = false;
        me._removeMarker();
        me._removeCircleFeature();
        me._close();
	},
	
	mapClickedEvent: function(event){
		var me = this,
			instance = me.instance,
			sandbox = instance.getSandbox(),
			lonlat = event.getLonLat(),		
			points = [];	
		points.push( new OpenLayers.Geometry.Point(lonlat.lon, lonlat.lat));
		if(me.isCircleButtonClicked){
			$('#circle-point-value').val(points);
			me._removeMarker();		
			me._addMarker(sandbox, lonlat);
			me._enableTextBoxRadius();
		}
	},
			
	syncToolbarButtonVisibility : function() {
		var me = this,
			instance = me.instance,
			sandbox = instance.getSandbox();
		me._setToolbarButtonVisibility(sandbox, me._getVisibleBiomassAttributeIds().length > 0);
	},
	
	_setToolbarButtonVisibility : function(sandbox, state) {
		var stateReqBuilder = sandbox.getRequestBuilder("Toolbar.ToolButtonStateRequest"),
			stateRequest = stateReqBuilder("bmaCircleCalculator", "basictools", state);
		sandbox.request("Circle", stateRequest);
	},
	
	_showResult: function(result){
		jQuery("#circle-message").hide();
		jQuery("#circle-point").hide();
		jQuery("#circle-radius").hide();
		jQuery("#circle-calclulate-tool").hide();
		jQuery("#circle-result").html(result);
	},
	
	_addMarker: function(sandbox, lonlat) {
		var reqBuilder = sandbox.getRequestBuilder('MapModulePlugin.AddMarkerRequest');
		if (reqBuilder) {
		    var data = {
		        x: lonlat.lon,
		        y: lonlat.lat,
		        color: "ff0000",
		        shape: 2,
		        size: 3
		        //iconUrl: '/Oskari/bundles/bma/circle/resources/images/marker.png',
		    };
		    var request = reqBuilder(data);
		    sandbox.request('MainMapModule', request);
		}
	},
	
	_removeMarker: function() {
		var sandbox = this.instance.getSandbox();
		var reqBuilder = sandbox.getRequestBuilder('MapModulePlugin.RemoveMarkersRequest');
		if (reqBuilder) {
			sandbox.request('MainMapModule', reqBuilder());
		}
	},
	
	_enableTextBoxRadius: function() {
		$('#circle-radius-value').attr('disabled', false);
		$('#circle-radius-value').css('background-color', 'white');
	},
	
	_validateRadiusValue: function() {		
		var num = this._convertCommasToDots($('#circle-radius-value').val());
		if (!isNaN(parseFloat(num)) && isFinite(num))
			return true;
		else
			return false;
	},
	
	_convertCommasToDots: function(value) {
		return num = value.replace(/,/g , ".");
	},
	
	_removeCircleFeature: function() {
		var instance = this.instance,
			sandbox = instance.getSandbox();
		var requestForRemoveFeature = sandbox.getRequestBuilder(
			"MapModulePlugin.RemoveFeaturesFromMapRequest");
		sandbox.request(instance, requestForRemoveFeature("id", "Main", null));
	}
	
}, {
	'protocol' : ['Oskari.userinterface.Flyout']
});
