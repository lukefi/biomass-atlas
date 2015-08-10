Oskari.clazz.define("Oskari.mapframework.bundle.infobox.InfoBoxBundleInstance",function(){this.sandbox=null,this.started=!1,this.mediator=null},{__name:"Infobox",getName:function(){return this.__name},setSandbox:function(e){this.sandbox=e},getSandbox:function(){return this.sandbox},update:function(){},start:function(){var e=this;if(e.started)return;e.started=!0;var t=Oskari.$("sandbox");t.register(e),e.setSandbox(t);for(var n in e.eventHandlers)n&&t.registerForEventByName(e,n);var r=t.findRegisteredModuleInstance("MainMapModule");r.registerPlugin(this.popupPlugin),r.startPlugin(this.popupPlugin),t.addRequestHandler("InfoBox.ShowInfoBoxRequest",this.requestHandlers.showInfoHandler),t.addRequestHandler("InfoBox.HideInfoBoxRequest",this.requestHandlers.hideInfoHandler)},init:function(){var e=this,t=this.conf&&this.conf.adaptable===!0;return this.popupPlugin=Oskari.clazz.create("Oskari.mapframework.bundle.infobox.plugin.mapmodule.OpenlayersPopupPlugin"),this.popupPlugin.setAdaptable(t),this.requestHandlers={showInfoHandler:Oskari.clazz.create("Oskari.mapframework.bundle.infobox.request.ShowInfoBoxRequestHandler",this.popupPlugin),hideInfoHandler:Oskari.clazz.create("Oskari.mapframework.bundle.infobox.request.HideInfoBoxRequestHandler",this.popupPlugin)},null},onEvent:function(e){var t=this,n=t.eventHandlers[e.getName()];if(!n)return;return n.apply(this,[e])},eventHandlers:{},stop:function(){var e=this,t=this.sandbox;for(var n in e.eventHandlers)n&&t.unregisterFromEventByName(e,n);e.sandbox.unregister(e),e.started=!1},setState:function(e){if(!e||!e.popups)return;this.popupPlugin.close();for(var t=0;t<e.popups.length;++t){var n=e.popups[t];this.popupPlugin.popup(n.id,n.title,n.data,n.lonlat)}},getState:function(){var e={popups:[]},t=this.popupPlugin.getPopups();for(var n in t){var r=t[n],i={id:n,title:r.title,data:r.contentData,lonlat:r.lonlat};e.popups.push(i)}return e}},{protocol:["Oskari.bundle.BundleInstance","Oskari.mapframework.module.Module"]}),define("bundles/framework/bundle/infobox/instance",function(){}),jQuery.fn.outerHTML=function(e){var t;return this.length?e?(jQuery.each(this,function(t,n){var r,i=n,s=n.outerHTML?"outerHTML":"innerHTML";n.outerHTML||(n=jQuery(n).wrap("<div>").parent()[0]),jQuery.isFunction(e)?(r=e.call(i,t,n[s]))!==!1&&(n[s]=r):n[s]=e,n.outerHTML||jQuery(n).children().unwrap()}),this):this[0].outerHTML||(t=this.wrap("<div>").parent().html(),this.unwrap(),t):val===undefined||val===null?this:null},Oskari.clazz.define("Oskari.mapframework.bundle.infobox.plugin.mapmodule.OpenlayersPopupPlugin",function(){this.mapModule=null,this.pluginName=null,this._sandbox=null,this._map=null,this._popups={}},{__name:"OpenLayersPopupPlugin",getName:function(){return this.pluginName},getMapModule:function(){return this.mapModule},setMapModule:function(e){this.mapModule=e,this._map=e.getMap(),this.pluginName=e.getName()+this.__name},init:function(){var e=this;this._arrow=jQuery('<div class="popupHeaderArrow"></div>'),this._header=jQuery("<div></div>"),this._headerWrapper=jQuery('<div class="popupHeader"></div>'),this._headerCloseButton=jQuery('<div class="olPopupCloseBox icon-close-white" style="position: absolute; top: 12px;"></div>'),this._contentDiv=jQuery('<div class="popupContent"></div>'),this._contentWrapper=jQuery('<div class="contentWrapper"></div>'),this._actionLink=jQuery('<span class="infoboxActionLinks"><a href="#"></a></span>'),this._actionButton=jQuery('<span class="infoboxActionLinks"><input type="button" /></span>'),this._contentSeparator=jQuery('<div class="infoboxLine">separator</div>')},popup:function(e,t,n,r,i,s){var o=this,u=this._arrow.clone(),a=this._header.clone(),f=this._headerWrapper.clone(),l=this._contentDiv.clone(),c=this._headerCloseButton.clone();a.append(t),f.append(a),f.append(c);for(var h=0;h<n.length;h++){h!==0&&l.append(this._contentSeparator.clone());var p=n[h].html,d=this._contentWrapper.clone();d.append(p);var v=n[h].actions,m=n[h].useButtons==1,g=n[h].primaryButton;for(var y in v){var b=y,w=v[y],E=null;if(m){E=this._actionButton.clone();var S=E.find("input");S.attr("contentdata",h),S.attr("value",b),b==g&&S.addClass("primary")}else{E=this._actionLink.clone();var x=E.find("a");x.attr("contentdata",h),x.append(b)}d.append(E)}l.append(d)}var T=this.getMapModule().getMap(),N=new OpenLayers.Popup(e,new OpenLayers.LonLat(r.lon,r.lat),new OpenLayers.Size(400,300),u.outerHTML()+f.outerHTML()+l.outerHTML(),!1);N.moveTo=function(e){if(e!==null&&e!==undefined&&this.div!==null&&this.div!==undefined){this.div.style.left=e.x+"px";var t=e.y-20;this.div.style.top=t+"px"}},N.setBackgroundColor("transparent"),this._popups[e]={title:t,contentData:n,lonlat:r,popup:N},jQuery(N.div).css("overflow","visible"),jQuery(N.groupDiv).css("overflow","visible"),N.events.un({click:N.onclick,scope:N}),N.events.on({click:function(t){var r=jQuery(t.target||t.srcElement);if(r.hasClass("olPopupCloseBox"))o.close(e);else{var i=r.attr("contentdata"),s=r.attr("value");s||(s=r.html()),n[i]&&n[i].actions&&n[i].actions[s]&&n[i].actions[s]()}},scope:N}),T.addPopup(N),this.adaptable&&jQuery(this._adaptPopupSize($)),this._panMapToShowPopup(r),i&&this._changeColourScheme(i),s&&this._changeFont(s)},setAdaptable:function(e){this.adaptable=e},_adaptPopupSize:function(e){var t=e(".olMapViewport"),n=e(".olPopup"),r=parseFloat(n.css("left"))+10;n.find(".popupHeaderArrow").css({"margin-left":"-10px"});var i=n.find(".popupHeader").css("width","100%"),s=n.find(".popupContent").css({"margin-left":"0",padding:"5px 20px 5px 20px"});n.find(".olPopupContent").css({width:"100%",height:"100%"});var o=t.width()*.7,u=t.height()*.7,a=s.find(".contentWrapper");if(jQuery.browser.msie)a.css({"padding-bottom":"5px"});else{var f=a.height();f=f>u?u+30+"px":"auto",s.css({height:f})}n.css({height:"auto",width:"auto","min-width":"256px","max-width":o+"px","min-height":"200px","max-height":u+"px",left:r+"px","z-index":"16000"})},_panMapToShowPopup:function(e){var t=this._map.getViewPortPxFromLonLat(e),n=this._map.getCurrentSize(),r=n.w,i=n.h,s=0,o=0,u=jQuery(".olPopup"),a=u.width()+50,f=u.height()+90;t.x+a>r&&(s=r-(t.x+a)),t.y+f>i?o=i-(t.y+f):t.y<25&&(o=25),(s!==0||o!==0)&&this.getMapModule().panMapByPixels(-s,-o)},_changeColourScheme:function(e,t){t=t||jQuery("div#getinforesult");if(!e||!t)return;var n=t.find("div.popupHeaderArrow"),r=t.find("div.popupHeader"),i=t.find("div.popupTitle"),s=t.find("div.getinforesult_header"),o=t.find("h3.myplaces_header"),u=t.find("div.olPopupCloseBox");n.css({"border-right-color":e.bgColour}),r.css({"background-color":e.bgColour,color:e.titleColour}),i.css({color:e.titleColour}),s.css({"background-color":e.bgColour}),s.find("div.getinforesult_header_title").css({color:e.titleColour}),o.css({color:e.headerColour}),u.removeClass("icon-close-white"),u.removeClass("icon-close"),u.addClass(e.iconCls)},_changeFont:function(e,t){t=t||jQuery("div#getinforesult");if(!t||!e)return;var n=[];n.push(t),n.push(t.find("table.getinforesult_table"));for(var r=0;r<n.length;r++){var i=n[r];i.removeClass(function(){var e="",t=this.className.split(" ");for(var n=0;n<t.length;++n)/oskari-publisher-font-/.test(t[n])&&(e+=t[n]+" ");return e}),i.addClass("oskari-publisher-font-"+e)}},close:function(e){if(!e){for(var t in this._popups)this._popups[t].popup.destroy(),delete this._popups[t];return}this._popups[e]&&(this._popups[e].popup&&this._popups[e].popup.destroy(),delete this._popups[e])},getPopups:function(){return this._popups},register:function(){},unregister:function(){},startPlugin:function(e){this._sandbox=e,e.register(this)},stopPlugin:function(e){e.unregister(this),this._map=null,this._sandbox=null},start:function(e){},stop:function(e){}},{protocol:["Oskari.mapframework.module.Module","Oskari.mapframework.ui.module.common.mapmodule.Plugin"]}),define("bundles/framework/bundle/infobox/plugin/openlayerspopup/OpenlayersPopupPlugin",function(){}),Oskari.clazz.define("Oskari.mapframework.bundle.infobox.request.ShowInfoBoxRequest",function(e,t,n,r,i,s,o){this._creator=null,this._id=e,this._title=t,this._content=n,this._position=r,this._hidePrevious=i==1,this._colourScheme=s,this._font=o},{__name:"InfoBox.ShowInfoBoxRequest",getName:function(){return this.__name},getId:function(){return this._id},getTitle:function(){return this._title},getContent:function(){return this._content},getPosition:function(){return this._position},getHidePrevious:function(){return this._hidePrevious},getColourScheme:function(){return this._colourScheme},getFont:function(){return this._font}},{protocol:["Oskari.mapframework.request.Request"]}),define("bundles/framework/bundle/infobox/request/ShowInfoBoxRequest",function(){}),Oskari.clazz.define("Oskari.mapframework.bundle.infobox.request.ShowInfoBoxRequestHandler",function(e){this.popupPlugin=e},{handleRequest:function(e,t){t.getHidePrevious()&&this.popupPlugin.close(),this.popupPlugin.popup(t.getId(),t.getTitle(),t.getContent(),t.getPosition(),t.getColourScheme(),t.getFont())}},{protocol:["Oskari.mapframework.core.RequestHandler"]}),define("bundles/framework/bundle/infobox/request/ShowInfoBoxRequestHandler",function(){}),Oskari.clazz.define("Oskari.mapframework.bundle.infobox.request.HideInfoBoxRequest",function(e){this._creator=null,this._id=e},{__name:"InfoBox.HideInfoBoxRequest",getName:function(){return this.__name},getId:function(){return this._id}},{protocol:["Oskari.mapframework.request.Request"]}),define("bundles/framework/bundle/infobox/request/HideInfoBoxRequest",function(){}),Oskari.clazz.define("Oskari.mapframework.bundle.infobox.request.HideInfoBoxRequestHandler",function(e){this.popupPlugin=e},{handleRequest:function(e,t){this.popupPlugin.close(t.getId())}},{protocol:["Oskari.mapframework.core.RequestHandler"]}),define("bundles/framework/bundle/infobox/request/HideInfoBoxRequestHandler",function(){}),define("normalize",["require","module"],function(e,t){function o(e,t,n){if(e.indexOf("data:")===0)return e;e=r(e);if(e.match(/^\//)||e.match(s))return e;var i=n.match(s),o=t.match(s);return o&&(!i||i[1]!=o[1]||i[2]!=o[2])?u(e,t):a(u(e,t),n)}function u(e,t){e.substr(0,2)=="./"&&(e=e.substr(2));var n=t.split("/"),r=e.split("/");n.pop();while(curPart=r.shift())curPart==".."?n.pop():n.push(curPart);return n.join("/")}function a(e,t){var n=t.split("/");n.pop(),t=n.join("/")+"/",i=0;while(t.substr(i,1)==e.substr(i,1))i++;while(t.substr(i,1)!="/")i--;t=t.substr(i+1),e=e.substr(i+1),n=t.split("/");var r=e.split("/");out="";while(n.shift())out+="../";while(curPart=r.shift())out+=curPart+"/";return out.substr(0,out.length-1)}var n=/([^:])\/+/g,r=function(e){return e.replace(n,"$1/")},s=/[^\:\/]*:\/\/([^\/])*/,f=function(e,t,n,i){t=r(t),n=r(n);var s=/@import\s*("([^"]*)"|'([^']*)')|url\s*\(\s*(\s*"([^"]*)"|'([^']*)'|[^\)]*\s*)\s*\)/ig,u,a,e;while(u=s.exec(e)){a=u[3]||u[2]||u[5]||u[6]||u[4];var f;i&&a.substr(0,1)=="/"?f=i+a:f=o(a,t,n);var l=u[5]||u[6]?1:0;e=e.substr(0,s.lastIndex-a.length-l-1)+f+e.substr(s.lastIndex-l-1),s.lastIndex=s.lastIndex+(f.length-a.length)}return e};return f.convertURIBase=o,f}),define("css",["./normalize"],function(e){function n(e,t){for(var n=0,r=e.length;n<r;n++)if(e[n]===t)return n;return-1}var t=0;if(typeof window=="undefined")return{load:function(e,t,n){n()}};var r=!1,i=document.getElementsByTagName("head")[0],s=window.navigator.userAgent.match(/Trident\/([^ ;]*)|AppleWebKit\/([^ ;]*)|Opera\/([^ ;]*)|rv\:([^ ;]*)(.*?)Gecko\/([^ ;]*)|MSIE\s([^ ;]*)/),o=!1;!s||(s[1]||s[7]?(o=parseInt(s[1])<6||parseInt(s[7])<=9,s="trident"):s[2]?(o=!0,s="webkit"):s[3]||(s[4]?(o=parseInt(s[4])<18,s="gecko"):r&&alert("Engine detection failed")));var u={},a=/^\/|([^\:\/]*:)/;u.pluginBuilder="./css-builder";var f=[],l={},c=[];u.addBuffer=function(e){if(n(f,e)!=-1)return;if(n(c,e)!=-1)return;f.push(e),c.push(e)},u.setBuffer=function(t,n){var r=window.location.pathname.split("/");r.pop(),r=r.join("/")+"/";var i=require.toUrl("base_url").split("/");i.pop();var s=i.join("/")+"/";s=e.convertURIBase(s,r,"/"),s.match(a)||(s="/"+s),s.substr(s.length-1,1)!="/"&&(s+="/"),u.inject(e(t,s,r));for(var o=0;o<f.length;o++)(n&&f[o].substr(f[o].length-5,5)==".less"||!n&&f[o].substr(f[o].length-4,4)==".css")&&(function(e){l[e]=l[e]||!0,setTimeout(function(){typeof l[e]=="function"&&l[e](),delete l[e]},7)}(f[o]),f.splice(o--,1))},u.attachBuffer=function(e,t){for(var r=0;r<f.length;r++)if(f[r]==e)return l[e]=t,!0;if(l[e]===!0)return l[e]=t,!0;if(n(c,e)!=-1)return t(),!0};var h=function(e,t){setTimeout(function(){for(var n=0;n<document.styleSheets.length;n++){var r=document.styleSheets[n];if(r.href==e.href)return t()}h(e,t)},10)},p=function(e,t){setTimeout(function(){try{return e.sheet.cssRules,t()}catch(n){}p(e,t)},10)};if(s=="trident"&&o)var d=[],v=[],m=0,g=function(e,t){var n;v.push({url:e,cb:t}),n=d.shift(),!n&&m++<31&&(n=document.createElement("style"),i.appendChild(n)),n&&y(n)},y=function(e){var t=v.shift();if(!t){e.onload=w,d.push(e);return}e.onload=function(){t.cb(t.ss),y(e)};try{var n=e.styleSheet;t.ss=n.imports[n.addImport(t.url)]}catch(r){alert("Got Error:"+r)}};var b=function(e){var t=document.createElement("link");return t.type="text/css",t.rel="stylesheet",t.href=e,t},w=function(){};u.linkLoad=function(e,t){var n=setTimeout(function(){r&&alert("timeout"),t()},A*1e3-100),u=function(){clearTimeout(n),a&&(a.onload=w),setTimeout(t,7)};if(!o){var a=b(e);a.onload=u,i.appendChild(a)}else if(s=="webkit"){var a=b(e);h(a,u),i.appendChild(a)}else if(s=="gecko"){var f=document.createElement("style");f.textContent='@import "'+e+'"',p(f,u),i.appendChild(f)}else s=="trident"&&g(e,u)};var E=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"],S={},x=function(e,t,n){if(S[e]){t(S[e]);return}var r,i,s;if(typeof XMLHttpRequest!="undefined")r=new XMLHttpRequest;else if(typeof ActiveXObject!="undefined")for(i=0;i<3;i+=1){s=E[i];try{r=new ActiveXObject(s)}catch(o){}if(r){E=[s];break}}r.open("GET",e,requirejs.inlineRequire?!1:!0),r.onreadystatechange=function(i){var s,o;r.readyState===4&&(s=r.status,s>399&&s<600?(o=new Error(e+" HTTP status: "+s),o.xhr=r,n(o)):(S[e]=r.responseText,t(r.responseText)))},r.send(null)},T=0,N;u.inject=function(e){T<31&&(N=document.createElement("style"),N.type="text/css",i.appendChild(N),T++),N.styleSheet?N.styleSheet.cssText+=e:N.appendChild(document.createTextNode(e))};var C=/@import\s*(url)?\s*(('([^']*)'|"([^"]*)")|\(('([^']*)'|"([^"]*)"|([^\)]*))\))\s*;?/g,k=window.location.pathname.split("/");k.pop(),k=k.join("/")+"/";var L=function(t,n,r){t.match(a)||(t="/"+e.convertURIBase(t,k,"/")),x(t,function(i){i=e(i,t,k);var s=[],o=[],u=[],a;while(a=C.exec(i)){var f=a[4]||a[5]||a[7]||a[8]||a[9];s.push(f),o.push(C.lastIndex-a[0].length),u.push(a[0].length)}var l=0;for(var c=0;c<s.length;c++)(function(e){L(s[e],function(t){i=i.substr(0,o[e])+t+i.substr(o[e]+u[e]);var r=t.length-u[e];for(var a=e+1;a<s.length;a++)o[a]+=r;l++,l==s.length&&n(i)},r)})(c);s.length==0&&n(i)},r)};u.normalize=function(e,t){return e.substr(e.length-4,4)==".css"&&(e=e.substr(0,e.length-4)),t(e)};var A,O=!1;return u.load=function(e,t,n,i,s){A=A||i.waitSeconds||7;var a=e+(s?".less":".css");if(u.attachBuffer(a,n))return;var f=t.toUrl(a);!O&&r&&(alert(o?"hacking links":"not hacking"),O=!0),s?L(f,function(e){s&&(e=s(e,function(e){u.inject(e),setTimeout(n,7)}))}):u.linkLoad(f,n)},r&&(u.inspect=function(){if(stylesheet.styleSheet)return stylesheet.styleSheet.cssText;if(stylesheet.innerHTML)return stylesheet.innerHTML}),u}),requirejs.s.contexts._.nextTick=function(e){e()},require(["css"],function(e){e.addBuffer("resources/framework/bundle/infobox/css/infobox.css")}),requirejs.s.contexts._.nextTick=requirejs.nextTick,define("src/framework/infobox/module",["oskari","jquery","bundles/framework/bundle/infobox/instance","bundles/framework/bundle/infobox/plugin/openlayerspopup/OpenlayersPopupPlugin","bundles/framework/bundle/infobox/request/ShowInfoBoxRequest","bundles/framework/bundle/infobox/request/ShowInfoBoxRequestHandler","bundles/framework/bundle/infobox/request/HideInfoBoxRequest","bundles/framework/bundle/infobox/request/HideInfoBoxRequestHandler","css!resources/framework/bundle/infobox/css/infobox.css"],function(e,t){return e.bundleCls("infobox").category({create:function(){var t=this,n=e.clazz.create("Oskari.mapframework.bundle.infobox.InfoBoxBundleInstance");return n},update:function(e,t,n,r){}})}),requirejs.s.contexts._.nextTick=function(e){e()},require(["css"],function(e){e.setBuffer("div.popupHeader {\n  background-color: #424343;\n  color: #FFFFFF;\n  position: relative;\n  left: 0px;\n  padding: 0px;\n  margin: 0px;\n  border-radius: 6px 6px 0px 0px;\n  display: inline-block;\n  width: 390px;\n  float: left;\n  height: 40px; }\n\ndiv.popupHeader div {\n  vertical-align: top;\n  margin-left: 20px;\n  margin-right: 20px;\n  padding-left: 0;\n  padding-right: 0;\n  padding-top: 0;\n  position: absolute;\n  top: 12px; }\n\ndiv.popupHeaderArrow {\n  width: 0;\n  height: 0;\n  border-top: 10px solid transparent;\n  border-bottom: 10px solid transparent;\n  border-right: 10px solid #424343;\n  display: inline-block;\n  float: left;\n  margin-top: 10px; }\n\ndiv.popupContent {\n  clear: both;\n  margin-left: 10px;\n  background-color: #FFFFFF;\n  position: relative;\n  left: 0px;\n  top: 0px;\n  height: 250px;\n  border-radius: 0px 0px 6px 6px;\n  border: 1px solid;\n  border-color: #424343;\n  overflow: auto;\n  padding: 20px 20px 20px 25px; }\n\n/*Pop-up width reduced for places search */\ndiv#searchResultPopup_contentDiv div.popupContent {\n  height: 150px; }\n\ndiv.olPopup {\n  margin: 0;\n  padding: 0;\n  background-color: #ffffff;\n  overflow: auto;\n  /*\\0/ !important*/\n  height: 400px;\n  /*\\0/ !important*/\n  z-index: 16000; }\n\ndiv.olPopupContent {\n  overflow: visible;\n  padding: 0px;\n  margin: 0px;\n  left: 0px;\n  top: 0px; }\n\ndiv.popupContent hr.infoboxLine {\n  border: 1px solid;\n  width: 90%;\n  margin-top: 10px; }\n\ndiv.popupContent span.infoboxActionLinks {\n  padding-right: 15px;\n  padding-left: 15px; }\n\n.olPopupCloseBox {\n  cursor: pointer;\n  background-attachment: scroll;\n  background-color: transparent;\n  background-origin: padding-box;\n  background-repeat: no-repeat;\n  background-size: auto auto;\n  right: 0px;\n  position: absolute;\n  top: 14px; }\n")}),requirejs.s.contexts._.nextTick=requirejs.nextTick;