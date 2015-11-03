/**
 * @class Oskari.bma.bundle.municipality.MunicipalityBundle.Flyout
 *
 */
Oskari.clazz.define('Oskari.bma.bundle.municipality.MunicipalityBundle.Flyout',

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
	this.templateMunicipalityData = jQuery('<div id="municipality-data"></div>');
	this.templateMunicipalityCalculateTool = jQuery('<div id="municipality-calculate-tool"><button class="municipality-button" id="municipality_calculate"></button></div>');
	this.templateMunicipalityCancelTool = jQuery('<div id="municipality-cancel-tool"><button class="municipality-button" id="municipality_cancel"></button></div>');
	
	/**
	 * @property contentState
	 * what is shown and how
	 */
	this.contentState = {};

	/**
	 * @property showQueue
	 * request queue to enable postponing ajax loads (TBD)
	 *
	 */
	this.showQueue = [];

	/**
	 * @property state
	 */
	this.state = null;

}, {
	compileTemplates : function() {

	},
	/**
	 * @property template HTML templates for the User Interface
	 * @static
	 */
	templates : {
		content : "<div class='metadataflyout_content'></div>"
	},
	getName : function() {
		return 'Oskari.bma.bundle.municipality.MunicipalityBundle.Flyout';
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
		return "Measurement";
	},
	getDescription : function() {

	},
	getOptions : function() {

	},
	/**
	 * Create help ui
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

        var municipalityData = me.templateMunicipalityData.clone();
        var calculateTool = me.templateMunicipalityCalculateTool.clone();
        var cancelTool = me.templateMunicipalityCancelTool.clone();
        
        calculateTool.find('#municipality_calculate').html("Calculate");
        calculateTool.find('#municipality_calculate').unbind('click');
        calculateTool.find('#municipality_calculate').bind('click', function(){	
        	alert("Calculate");        	
        });
        
        cancelTool.find('#municipality_cancel').html("Cancel");
        cancelTool.find('#municipality_cancel').unbind('click');
        cancelTool.find('#municipality_cancel').bind('click', function(){        	
        	alert("cancel");        	
        });
	
        content.addClass('bma-municipality-main-div');
        content.append(municipalityData);
        content.append(calculateTool);
    	content.append(cancelTool);
    	
	},	
	/**
	 * @method _isVisible
	 * @private
	 * @returns is visible
	 */
	_isVisible: function(){
		var me = this;
		var flyout = me.container.parent().parent();
		var isVisible = flyout.hasClass('oskari-detached');
		return isVisible;

	},
	setState : function(state) {
		this.state = state;
	},	
	/**
	 * @method setContentState
	 * restore state from store
	 */
	setContentState : function(contentState) {
		var me = this;
		var parent = me.container.parents('.oskari-flyout');
        if(parent.hasClass('oskari-detached')){
            parent.find('.oskari-flyouttool-close').trigger('click');
        }
		this.contentState = contentState;
	}
	
}, {
	'protocol' : ['Oskari.userinterface.Flyout']
});
