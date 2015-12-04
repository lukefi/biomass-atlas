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
	this.templateCircleRadius = jQuery('<div id="circle-radius"><label id="circle-radius-label">Säde: </label><input id="circle-radius-value" size="10"></input> km</div>');
	this.templateCirclePoint = jQuery('<div id="circle-point"><label id="circle-point-label">Piste: </label><input id="circle-point-value" disabled></input></div>' + 
			'<div class="horizontal-line">.</div>');
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
        //var cancelTool = me.templateCircleCancelTool.clone();
        
        calculateCancelTool.find('#circle-calculate').html("Laske");
        calculateCancelTool.find('#circle-calculate').unbind('click');
        calculateCancelTool.find('#circle-calculate').bind('click', function(){        	
        	me._calculateButtonClick(me);
        });
        
        calculateCancelTool.find('#circle-cancel').html("Lopeta");
        calculateCancelTool.find('#circle-cancel').unbind('click');
        calculateCancelTool.find('#circle-cancel').bind('click', function(){        	
        	me._cancelButtonClick();     	
        });
	
        content.addClass('bma-circle-main-div');
        content.append(circleMessage);
        content.append(circleResult);
        content.append(circleRadius);
        content.append(circlePoint);
        content.append(calculateCancelTool);
    	//content.append(cancelTool);
    	
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
			btn.show();
		}
		else {
			btn.hide();
		}
	},
	
	_getVisibleBiomassAttributeIds : function() {
		// TODO this is copy-paste from polygon biomass calculation tool
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
			sandbox = me.instance.getSandbox();
		//AJAX call
	},
	
	_cancelButtonClick: function(){
		var me = this,
			instance = me.instance,
			sandbox = instance.getSandbox(),
			toolbarRequest = sandbox.getRequestBuilder('Toolbar.SelectToolButtonRequest')();
        sandbox.request(instance, toolbarRequest);        
        me._close();
	},
	
	mapClickedEvent: function(event){
		var me = this,
			instance = me.instance,
			sandbox = instance.getSandbox(),
			lonlat = event.getLonLat(),		
			points = [];	
		points.push( new OpenLayers.Geometry.Point(lonlat.lon, lonlat.lat));
		//AJAX call
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
		jQuery("#circle-result").html(result);
	}	
	
}, {
	'protocol' : ['Oskari.userinterface.Flyout']
});
