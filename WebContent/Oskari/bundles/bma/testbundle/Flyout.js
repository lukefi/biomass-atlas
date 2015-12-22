/**
 * @class Oskari.bma.bundle.testbundle.TestBundle.Flyout
 *
 */
Oskari.clazz.define('Oskari.bma.bundle.testbundle.TestBundle.Flyout',

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
	this.templateAreaMessage = jQuery('<div id="area-message">Valitse alue, jonka biomassa lasketaan</div>');
	this.templateAreaData = jQuery('<div id="area-data"></div>');	
	this.templateAreaCancelTool = jQuery('<div id="area-cancel-tool"> <div class="area-horizontal-line">.</div> <button class="area-button" id="area-cancel"></button></div>');
	
}, {	
	/**
	 * @property template HTML templates for the User Interface
	 * @static
	 */
	templates : {
		content : "<div class='metadataflyout_content'></div>"
	},
	getName : function() {
		return 'Oskari.bma.bundle.testbundle.TestBundle.Flyout';
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
		var me = this;
		
		// clear container
		var cel = jQuery(me.container);
		cel.empty();
        var content = me.template.clone();
        cel.append(content);

        var areaMessage = me.templateAreaMessage.clone();
        var areaData = me.templateAreaData.clone();        
        var cancelTool = me.templateAreaCancelTool.clone();
                       
        cancelTool.find('#area-cancel').html("Lopeta");
        cancelTool.find('#area-cancel').unbind('click');
        cancelTool.find('#area-cancel').bind('click', function(){        	
        	me._cancelButtonClick();     	
        });
	
        content.addClass('bma-area-main-div');
        content.append(areaMessage);
        content.append(areaData);       
    	content.append(cancelTool);
    	    	    	
    	me._closeIconClickHandler();
	},
	
	_closeIconClickHandler: function() {
		var me = this;
		var parent = me.container.parents('.oskari-flyout');
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
	
    _cancelButtonClick: function(){
		var me = this,
			instance = me.instance,
			sandbox = instance.getSandbox(),
			toolbarRequest = sandbox.getRequestBuilder('Toolbar.SelectToolButtonRequest')();
        sandbox.request(instance, toolbarRequest);  
        me._close();
        instance._measureControl.deactivate();
	},
	
	toolSelectedEvent: function(event){
		var me = this,
			instance = me.instance,
			sandbox = instance.getSandbox();
		if (event.getToolId() == 'bmacalculator') {
			var mapModule = sandbox.findRegisteredModuleInstance('MainMapModule');		
			if (!mapModule.getMapControl("measureControls_bma")) {
				mapModule.addMapControl('measureControls_bma', instance._measureControl);
				instance._measureControl.events.on({
					measure: function(evt) {
						me._polygonCompleted.apply(me, [evt]);
					}
				});
			}
			instance._measureControl.activate();
		}		
	},
	
	_getVisibleBiomassAttributeIds : function() {
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
	
	_polygonCompleted : function(evt) {
		var me = this,
			attributeIds = me._getVisibleBiomassAttributeIds(),
			points = [],
			components = evt.geometry.components[0].components,
			pointsForAreaCalculation = [];
		if (attributeIds.length == 0) {
			return; // no layers selected
		}
		 
		for (var i = 0; i < components.length; i++) {
			points.push({x: components[i].x, y: components[i].y});
		}

		for (var i = 0; i < points.length - 1; i++) { // condition has minus 1. Since there was one extra point because of double click.
			pointsForAreaCalculation.push(new OpenLayers.Geometry.Point(points[i].x, points[i].y));
		}
				
		var queryData = JSON.stringify({ points: points, attributes: attributeIds });
		jQuery.ajax({
			url: "/biomass/area",
			type: "POST",
			contentType: "application/json; charset=UTF-8",
			data: queryData,
			dataType: "json",
			success: function(results, status, xhr) {
				var finalResult = "";
				if ('error' in results) {
					finalResult += "<span class='error italic'>" + results.error + "</span><br><br>";
				}
				
				finalResult += "<table><tr><th>Biomassa tyypi</th> <th>Määrä</th></tr>";
				for (var key in results.values) {
					finalResult += "<tr><td style='padding-left: 10px;'>" + key 
						+ "</td><td style='padding-left: 10px;'>" + results.values[key].value + " " + results.values[key].unit + "</td></tr>";
				}
				finalResult += "</table>";
				
				finalResult += "Tallenna tulokset: "
					+ "<form method='POST' action='/biomass/area/xlsx' style='display: inline-block'>" 
					+ "<input type='hidden' name='query' value= " + queryData + "/>" 
					+ "<input type='submit' name='submit' value='XLSX' />" 
					+ "</form>&nbsp;"
					+ "<form method='POST' action='/biomass/area/csv' style='display: inline-block'>" 
					+ "<input type='hidden' name='query' value= " + queryData + "/>" 
					+ "<input type='submit' name='submit' value='CSV' />" 
					+ "</form>"
					+ "<br>";
				
				me._showResult(finalResult);
			}
		});
	},
	
	syncToolbarButtonVisibility : function() {
		var me = this,
			instance = me.instance,
			sandbox = instance.getSandbox();
		me._setToolbarButtonVisibility(sandbox, me._getVisibleBiomassAttributeIds().length > 0);
	},
	
	_setToolbarButtonVisibility : function(sandbox, state) {
		var stateReqBuilder = sandbox.getRequestBuilder("Toolbar.ToolButtonStateRequest"),
			stateRequest = stateReqBuilder("bmacalculator", "basictools", state);
		sandbox.request("TestBundle", stateRequest);
	},
	
	_showResult: function(result){
		jQuery("#area-message").hide();
		jQuery("#area-data").html(result);
	}	
	
}, {
	'protocol' : ['Oskari.userinterface.Flyout']
});
