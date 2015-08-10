/**
 * @class Oskari.mapframework.bundle.findbycoordinates.service.FindByCoordinatesService
 */
Oskari.clazz.define('Oskari.mapframework.bundle.findbycoordinates.service.FindByCoordinatesService',
    function(instance, url) {
        this.instance = instance;
        this.sandbox = instance.getSandbox();
        this.url = url;
    }, {
        __name: 'findbycoordinates.FindByCoordinatesService',
        __qname: 'Oskari.mapframework.bundle.findbycoordinates.service.FindByCoordinatesService',
        getQName: function () {
            return this.__qname;
        },
        getName: function () {
            return this.__name;
        },
        /**
         * @method init
         * Initializes the service
         */
        init: function () {},
        getUrl: function (options) {
            var url = this.url,
                lang = Oskari.getLang(),
                epsg = this.sandbox.getMap().getSrsName();

            url += ('&lang=' + lang);
            url += ('&epsg=' + epsg);

            for (var opt in options) {
                if (options.hasOwnProperty(opt)) {
                    url += ('&' + opt + '=' + options[opt]);
                }
            }

            return url;
        },
        doSearch: function (options, successCb, errorCb) {
            var url = this.getUrl(options);

            jQuery.ajax({
                dataType : "json",
                type : "GET",
                beforeSend: function(x) {
                  if(x && x.overrideMimeType) {
                   x.overrideMimeType("application/json");
                  }
                 },
                url : url,
                error : errorCb,
                success : successCb
            });
        }
    }, {
        'protocol': ['Oskari.mapframework.service.Service']
    });