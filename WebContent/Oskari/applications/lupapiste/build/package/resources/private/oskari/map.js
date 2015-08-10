/*
 * map.js:
 */
;(function() {
Oskari.setLang('en');
Oskari.setLoaderMode('');
Oskari.setPreloaded(true);
var appSetup;
var appConfig;

var downloadConfig = function(notifyCallback) {
	jQuery.ajax({
		type : 'GET',
		dataType : 'json',
		url : '/js/config.json',
		beforeSend : function(x) {
			if (x && x.overrideMimeType) {
				x.overrideMimeType("application/j-son;charset=UTF-8");
			}
		},
		success : function(config) {
			appConfig = config;
			notifyCallback();
		}
	});
};
var downloadAppSetup = function(notifyCallback) {
	jQuery.ajax({
		type : 'GET',
		dataType : 'json',
		url : '/js/appsetup.json',
		beforeSend : function(x) {
			if (x && x.overrideMimeType) {
				x.overrideMimeType("application/j-son;charset=UTF-8");
			}
		},
		success : function(setup) {
			appSetup = setup;
			notifyCallback();
		}
	});
};

var startApplication = function() {
	// check that both setup and config are loaded
	// before actually starting the application
	if (appSetup && appConfig) {
		var app = Oskari.app;
		app.setApplicationSetup(appSetup);
		app.setConfiguration(appConfig);
		app.startApplication(function(startupInfos) {

		});
	}
};
downloadAppSetup(startApplication);
downloadConfig(startApplication);
})();
