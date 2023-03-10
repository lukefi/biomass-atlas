/**
 * @class Oskari.catalogue.bundle.metadataflyout.request.ShowMetadataRequestHandler
 *
 */
Oskari.clazz.define('Oskari.bma.bundle.biomassuserguide.request.ShowUserGuideRequestHandler', function(sandbox, instance) {

	this.sandbox = sandbox;

	/** @property instance */
	this.instance = instance;
}, {

	/** @method handleRequest dispatches processing to instance */
	handleRequest : function(core, request) {
		this.sandbox.printDebug("[Oskari.bma.bundle.biomassuserguide.request.ShowUserGuideRequestHandler] Show UserGuide: " + request.getUuid());
		this.instance.scheduleShowUserGuide(request);
	}
}, {
	protocol : ['Oskari.mapframework.core.RequestHandler']
});
