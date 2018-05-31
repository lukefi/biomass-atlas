/**
 * @class Oskari.bma.bundle.testbundle.TestbundleInstance
 *
 * This bundle shows welcome message at the beginning for first time users and also if cookie is not set for hiding.
 */
Oskari.clazz.define("Oskari.bma.bundle.welcometour.WelcomeTourInstance",

	/**
	 * @method create called automatically on construction
	 * @static
	 */
	
	function(locale) {
		this.sandbox = null;
		this.mediator = null;
		this._localization = locale;
		this.guideStep = 0;
	}, {
		/**
		 * @static
		 * @property __name
		 */
		__name : 'WelcomeTour',
	
		/**
		 * @method getName
		 * @return {String} the name for the component
		 */
		getName : function() {
			return this.__name;
		},
		
		/**
		 * @method getSandbox
		 */
		getSandbox : function() {
			return this.sandbox;
		},
		
		 /**
         * @method getTitle
         * Extension protocol method
         * @return {String} localized text for the title of the component
         */
        getTitle: function () {
            return this._localization['title'];
        },

        /**
         * @method getDescription
         * Extension protocol method
         * @return {String} localized text for the description of the component
         */
        getDescription: function () {
            return this._localization['desc'];
        },
		
	    /**
         * @method start
         * BundleInstance protocol method
         */
        start: function () {
            if (!this._localization) {
                this._localization = Oskari.getLocalization(this.getName());
            }
            
            // Check cookie 'parcel_tour_seen'. Value '1' means that tour
            // is not to be started
            // jQuery cookie plugin:
            //   resources/framework/bundle/parceltour/js/jquery.cookie.js
            //   github.com/carhartl/jquery-cookie/
            if (jQuery.cookie('welcome_tour_seen') != '1') {
                var me = this,
                    conf = me.conf, // Should this not come as a param?
                    sandboxName = (conf ? conf.sandbox : null) || 'sandbox',
                    sandbox = Oskari.getSandbox(sandboxName);
                me.sandbox = sandbox;
                // register to sandbox as a module
                sandbox.register(me);
                me._startGuide();
            }
        },
        _startGuide: function () {
            var me = this,
                pn = 'Oskari.userinterface.component.Popup',
                dialog = Oskari.clazz.create(pn);
            me.guideStep = 0;
            dialog.makeDraggable();
            dialog.addClass('welcometour');
            me._showGuideContentForStep(me.guideStep, dialog);
        },

        _guideSteps: [{
            appendTourSeenCheckbox: true,

            setScope: function (inst) {
                this.ref = inst;
            },
            getTitle: function () {
                return this.ref._localization['page1'].title;
            },
            getContent: function () {
                var content = jQuery('<div></div>');
               /* content.append('<div id="welcome_lang_selector"> \
				    	<span><a href="/?lang=fi" title="Suomeksi" >FI</a></span> \
				    	<span><a href="/?lang=en" title="In english">EN</a></span> \
				    	<span><a href="/?lang=sv" title="På svenska">SV</a></span> \
				    	</div>');
                content.append('<br>');*/
                content.append(this.ref._localization['page1'].message);
                content.append('<br><br>');
                content.append(this.ref._localization['page1'].listtitle);
                content.append('<ol type="1"> \
                		<li>'+this.ref._localization['page1'].listitem1+'</li> \
                		<li>'+this.ref._localization['page1'].listitem2+'<br> \
                		<img src="/resources/images/' +this.ref._localization['image']+'" \
                		alt="'+this.ref._localization['page1'].imagealt+'" width="121" height="54"></li></ol>');      
                content.append(this.ref._localization['page1'].tip);
                return content;
            }
        }, {
            setScope: function (inst) {
                this.ref = inst;
            },
            getTitle: function () {
                var p2 = this.ref._localization['page2'].title;
                return p2 + '<span>2/2</span>';
            },
            getContent: function () {
                var me = this.ref;
                var loc = me._localization['page2'];
                var content = jQuery('<div></div>');
                content.append(loc.message);
                return content;
            }
        }],
        
        _showGuideContentForStep: function (stepIndex, dialog) {
            var step = this._guideSteps[stepIndex];
            step.setScope(this);
            var buttons = this._getDialogButton(dialog);
            
            var title = step.getTitle();
            var content = step.getContent();
            if (step.appendTourSeenCheckbox) {
                content.append('<br><br>');
                var checkboxTemplate =
                    jQuery('<input type="checkbox" ' + 'name="welcome_tour_seen" ' + 'id="welcome_tour_seen" ' + 'value="1">');
                var checkbox = checkboxTemplate.clone();
                var labelTemplate = jQuery('<label for="welcome_tour_seen"></label>');
                var label = labelTemplate.clone();
                label.append(this._localization['tourseen'].label);
                checkbox.bind(
                    'change',
                    function () {
                        if (jQuery(this).attr('checked')) {
                            // Set cookie not to show welcome tour again
                            jQuery.cookie(
                                "welcome_tour_seen", "1", {
                                    expires: 365
                                }
                            );
                        } else {
                            // Revert to show welcome tour on startup
                            jQuery.cookie(
                                "welcome_tour_seen", "0", {
                                    expires: 1
                                }
                            );
                        }
                    });
                content.append(checkbox);
                content.append('&nbsp;');
                content.append(label);
                //Overlays and so unable to use other features 
                dialog.makeModal();
            }
            dialog.show(title, content, buttons);
            if (step.getPositionRef) {
                dialog.moveTo(step.getPositionRef(), step.positionAlign);
            } else {
                dialog.resetPosition();
            }
        },
        _getFakeExtension: function (name) {
            return {
                getName: function () {
                    return name;
                }
            };
        },
        _openExtension: function (name) {
            var extension = this._getFakeExtension(name);
            var rn = 'userinterface.UpdateExtensionRequest';
            this.sandbox.postRequestByName(rn, [extension, 'attach']);
        },
        _closeExtension: function (name) {
            var extension = this._getFakeExtension(name);
            var rn = 'userinterface.UpdateExtensionRequest';
            this.sandbox.postRequestByName(rn, [extension, 'close']);
        },
        _getDialogButton: function (dialog) {
            var me = this,
                closeTxt = me._localization['button']['close'];
                /*startTxt = me._localization['button']['start'];
            var startBtn = Oskari.clazz.create('Oskari.userinterface.component.Button');
            startBtn.setTitle(startTxt);
            startBtn.setHandler(function() {
            	me._showGuideContentForStep(1, dialog);
            });*/
            return [dialog.createCloseButton(closeTxt)];
        },
        /**
         * @method init
         * Module protocol method
         */
        init: function () {
            // headless module so nothing to return
            return null;
        },

        /**
         * @method onEvent
         * Module protocol method/Event dispatch
         */
        onEvent: function (event) {
            var me = this;
            var handler = me.eventHandlers[event.getName()];
            if (!handler) {
                var ret = handler.apply(this, [event]);
                if (ret) {
                    return ret;
                }
            }
            return null;
        },

        /**
         * @static
         * @property eventHandlers
         * Best practices: defining which
         * events bundle is listening and how bundle reacts to them
         */
        eventHandlers: {
            // not listening to any events
        },

        /**
         * @method stop
         * BundleInstance protocol method
         */
        stop: function () {
            var me = this;
            var sandbox = me.sandbox();
            // unregister module from sandbox
            me.sandbox.unregister(me);
        }
    }, {
        protocol: ['Oskari.bundle.BundleInstance', 'Oskari.mapframework.module.Module']    
	});
