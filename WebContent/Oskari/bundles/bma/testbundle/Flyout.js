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
	this.templateAreaMessage = jQuery('<div id="area-message"><span id="description"></span><div class="icon-info" id="area-info-tool"></div></div>');
	this.templateAreaData = jQuery('<div id="area-data"></div>');	
	this.templateShowNutrientOption = jQuery('<div class="show-nutrient-option">'
			+' <label id="show-nutrient-text">Näytä ravinteet : </label>'
			+ '<label class="switch switch-left-right">'
			+ '<input class="switch-input" type="checkbox" id="show-nutrient-checkbox"/>'
			+ '<span class="switch-label"></span>' 
			+ '<span class="switch-handle"></span></label>'
			+ '</div>');	
	this.templateAreaCancelTool = jQuery('<div class="area-horizontal-line">.</div><div id="area-cancel-tool"><button class="oskari-button" id="area-cancel"></button></div>');
	
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
		return this.instance.getLocalization()["flyout"]["title"];
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
		localization = me.instance.getLocalization()["flyout"];
		
		// clear container
		var cel = jQuery(me.container);
		cel.empty();
        var content = me.template.clone();
        cel.append(content);

        var areaMessage = me.templateAreaMessage.clone();
        var areaData = me.templateAreaData.clone();        
        //var showNutrientOption = me.templateShowNutrientOption.clone();        
        var cancelTool = me.templateAreaCancelTool.clone();
                       
        cancelTool.find('#area-cancel').html(localization.quit);
        cancelTool.find('#area-cancel').unbind('click');
        cancelTool.find('#area-cancel').bind('click', function(){        	
        	me._cancelButtonClick();     	
        });
        
        areaMessage.find('#description').text(localization.chooseAreaType);
        areaMessage.find('#area-info-tool').unbind('click');
        areaMessage.find('#area-info-tool').bind('click', function(){        	
        	me._displayInfoTip();     	
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
	
	toolSelectedEvent: function(event) {
		var me = this;
		if (event.getToolId() == 'bmacalculator') {
			me.beginMeasure();
		}		
	},
	
	beginMeasure: function() {
		var me = this,
		instance = me.instance,
		sandbox = instance.getSandbox();
		var mapModule = sandbox.findRegisteredModuleInstance('MainMapModule');		
		if (!mapModule.getMapControl("measureControls_bma")) {
			mapModule.addMapControl('measureControls_bma', instance._measureControl);
			instance._measureControl.events.on({
				measure: function(evt) {
					me._polygonCompleted.apply(me, [evt]);
				}
			});
		}
		instance._latestGeometry = null;
		instance._measureControl.activate();
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
			pointsForAreaCalculation = [],
			localization = me.instance.getLocalization()["flyout"];
		
		me.instance._latestGeometry = evt.geometry;
		if (attributeIds.length == 0) {
			return; // no layers selected
		}
		 
		for (var i = 0; i < components.length; i++) {
			points.push({x: components[i].x, y: components[i].y});
		}

		for (var i = 0; i < points.length - 1; i++) { // condition has minus 1. Since there was one extra point because of double click.
			pointsForAreaCalculation.push(new OpenLayers.Geometry.Point(points[i].x, points[i].y));
		}
		
		if (pointsForAreaCalculation.length < 3) {
			me._showResult(localization.error.notEnoughPoints);
			return;
		}
				
		var queryData = JSON.stringify({ points: points, attributes: attributeIds });
		me._saveUserActivity(queryData);
		jQuery.ajax({
			url: "/biomass/area",
			type: "POST",
			contentType: "application/json; charset=UTF-8",
			data: queryData,
			dataType: "json",
			success: function(results, status, xhr) {
				var finalResult = "";					
				
				if ('error' in results) {
					finalResult += "<span class='error italic'>" + localization["error"].smallAreaSelected + "</span><br><br>";
				}
				finalResult += "<table class='biomass-result-table'><tr><th>"+ localization.biomassType + "</th>" +
						"<th colspan='2'>" + localization.amount + "</th>"+
						"<th class='nutrient-value'>N (%TS)</th>" +
						"<th class='nutrient-value'>N (g/kgFM)</th>" +
						"<th class='nutrient-value'>P (%TS)</th>" +
						"<th class='nutrient-value'>P (g/kgFM)</th>" +
						"<th class='nutrient-value'>N-soluble (%TS)</th>" +
						"<th class='nutrient-value'>N-soluble (g/kgFM)</th>" + "</tr>";
				
				var displayOrders = results.displayOrders;
				for (var property in displayOrders) {
				    if (displayOrders.hasOwnProperty(property)) {
				    	for (var key in results.values) {
				    		if (key == displayOrders[property]) {
					    		finalResult += "<tr><td>" + key + "</td><td class='biomass-amount'>" 
					    			+ formatBiomassValue(results.values[key].valueAndUnit.value)
					    			+ "&nbsp;</td><td class='biomass-unit'>" + results.values[key].valueAndUnit.unit + "</td>"
					    			+ "<td class='nutrient-value'>" + ((results.values[key].nutrientResult.n_TS == null) ? ' - ' : results.values[key].nutrientResult.n_TS.toString().replace('.', ',')) + "</td>"
					    			+ "<td class='nutrient-value'>" + ((results.values[key].nutrientResult.n_g_kgFM == null) ? ' - ' : results.values[key].nutrientResult.n_g_kgFM.toString().replace('.', ',')) + "</td>"
					    			+ "<td class='nutrient-value'>" + ((results.values[key].nutrientResult.p_TS == null) ? ' - ' : results.values[key].nutrientResult.p_TS.toString().replace('.', ',')) + "</td>"
					    			+ "<td class='nutrient-value'>" + ((results.values[key].nutrientResult.p_g_kgFM == null) ? ' - ' : results.values[key].nutrientResult.p_g_kgFM.toString().replace('.', ',')) + "</td>"
					    			+ "<td class='nutrient-value'>" + ((results.values[key].nutrientResult.n_soluble_TS == null) ? ' - ' : results.values[key].nutrientResult.n_soluble_TS.toString().replace('.', ',')) + "</td>"
					    			+ "<td class='nutrient-value'>" + ((results.values[key].nutrientResult.n_soluble_g_kgFM == null) ? ' - ' : results.values[key].nutrientResult.n_soluble_g_kgFM.toString().replace('.', ',')) + "</td>"
					    			+ "</tr>";
					    		delete results.values[key];
					    		break;
					    	}
						}
				    }
				}
				finalResult += "</table>";
				finalResult += '<div id="show-nutrient"></div>';
				finalResult += '<div id="selected-area">' + localization.selectedArea + " : " + formatBiomassValue(results.selectedArea) + " ha </div>";
				finalResult += localization.saveResults
					+ " : <form method='POST' action='/biomass/area/xlsx' style='display: inline-block'>" 
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
		this._showNutrientOptionDiv();
	},
	
	getContentState: function() {
		var me = this;
		var state = {};
        return state;
    },
    
    setContentState: function(state) {
    },
    
    _displayInfoTip: function () {      
        var infoIconLocalization = this.instance.getLocalization()["flyout"].infoIcon,
        	title = infoIconLocalization.title,
        	desc = infoIconLocalization.description,
        	dialog = Oskari.clazz.create(
                'Oskari.userinterface.component.Popup'
            ),
            okBtn = Oskari.clazz.create(
                'Oskari.userinterface.component.Button'
            );            
        okBtn.addClass('default oskari-button');
        okBtn.setTitle('Ok');
        okBtn.setHandler(function () {
            dialog.close(true);
        });
        dialog.show(title, desc, [okBtn]);       
    },
    
    //User activity
    _saveUserActivity : function(queryData) {
    	var me = this,
			sandbox = me.instance.getSandbox();

    	jQuery.ajax({
			url: "/biomass/useractivity/freeform",
			type: "POST",
			contentType: "application/json; charset=UTF-8",
			data: queryData,
			dataType: "json",
			success: function(results, status, xhr) {
				//Nothing
			}
		});
    },
    
    /**
     * Add checkbox to hide/show nutrient values
     */
    _showNutrientOptionDiv: function () {
    	var me = this,
    		localization = me.instance.getLocalization()["flyout"],
			showNutrientOption = me.templateShowNutrientOption.clone();
    	
    	showNutrientOption.find('#show-nutrient-text').text(localization.showNutrients + " : ");
    	showNutrientOption.find('.switch-label').attr('data-on', localization.yes);
    	showNutrientOption.find('.switch-label').attr('data-off', localization.no);
		showNutrientOption.find('#show-nutrient-checkbox').unbind('change');
	    showNutrientOption.find('#show-nutrient-checkbox').bind('change', function(){        	
	    	me._hideShowNutrientValuesInTable(this);     	
	    });
	    
	    jQuery(me.container).find("#show-nutrient").append(showNutrientOption);
    },
    
    _hideShowNutrientValuesInTable: function(object) {
    	if (jQuery(object).is(':checked')) {
    		$('.nutrient-value').show();
    	} else {
    		$('.nutrient-value').hide();
    	}
    }
	
}, {
	'protocol' : ['Oskari.userinterface.Flyout']
});
