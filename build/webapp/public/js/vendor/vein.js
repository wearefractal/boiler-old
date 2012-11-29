(function(){function t(){return t}function e(t,o){var r=e.resolve(t),i=e.modules[r];if(!i)throw Error('failed to require "'+t+'" from '+o);return i.exports||(i.exports={},i.call(i.exports,i,i.exports,e.relative(r),n)),i.exports}var n=this;e.modules={},e.resolve=function(t){var n=t,o=t+".js",r=t+"/index.js";return e.modules[o]&&o||e.modules[r]&&r||n},e.register=function(t,n){e.modules[t]=n},e.relative=function(n){return function(o){if("debug"==o)return t;if("."!=o.charAt(0))return e(o);var r=n.split("/"),i=o.split("/");r.pop();for(var s=0;i.length>s;s++){var a=i[s];".."==a?r.pop():"."!=a&&r.push(a)}return e(r.join("/"),n)}},e.register("node_modules/engine.io-client/lib/engine.io-client.js",function(t,e,n){e.version="0.3.9",e.protocol=1,e.util=n("./util"),e.parser=n("./parser"),e.Socket=n("./socket"),e.EventEmitter=n("./event-emitter"),e.Transport=n("./transport"),e.transports=n("./transports")}),e.register("node_modules/engine.io-client/lib/event-emitter.js",function(t){function e(){}function n(t){return"[object Array]"==Object.prototype.toString.call(t)}t.exports=e,e.prototype.on=function(t,e){return this.$events||(this.$events={}),this.$events[t]?n(this.$events[t])?this.$events[t].push(e):this.$events[t]=[this.$events[t],e]:this.$events[t]=e,this},e.prototype.addListener=e.prototype.on,e.prototype.once=function(t,e){function n(){o.removeListener(t,n),e.apply(this,arguments)}var o=this;return n.listener=e,this.on(t,n),this},e.prototype.removeListener=function(t,e){if(this.$events&&this.$events[t]){var o=this.$events[t];if(n(o)){for(var r=-1,i=0,s=o.length;s>i;i++)if(o[i]===e||o[i].listener&&o[i].listener===e){r=i;break}if(0>r)return this;o.splice(r,1),o.length||delete this.$events[t]}else(o===e||o.listener&&o.listener===e)&&delete this.$events[t]}return this},e.prototype.removeAllListeners=function(t){return void 0===t?(this.$events={},this):(this.$events&&this.$events[t]&&(this.$events[t]=null),this)},e.prototype.listeners=function(t){return this.$events||(this.$events={}),this.$events[t]||(this.$events[t]=[]),n(this.$events[t])||(this.$events[t]=[this.$events[t]]),this.$events[t]},e.prototype.emit=function(t){if(!this.$events)return!1;var e=this.$events[t];if(!e)return!1;var o=Array.prototype.slice.call(arguments,1);if("function"==typeof e)e.apply(this,o);else{if(!n(e))return!1;for(var r=e.slice(),i=0,s=r.length;s>i;i++)r[i].apply(this,o)}return!0},e.prototype.addEventListener=e.prototype.on,e.prototype.removeEventListener=e.prototype.removeListener,e.prototype.dispatchEvent=e.prototype.emit}),e.register("node_modules/engine.io-client/lib/parser.js",function(t,e,n){var o=n("./util"),r=e.packets={open:0,close:1,ping:2,pong:3,message:4,upgrade:5,noop:6},i=o.keys(r),s={type:"error",data:"parser error"};e.encodePacket=function(t){var e=r[t.type];return void 0!==t.data&&(e+=t.data+""),""+e},e.decodePacket=function(t){var e=t.charAt(0);return Number(e)==e&&i[e]?t.length>1?{type:i[e],data:t.substring(1)}:{type:i[e]}:s},e.encodePayload=function(t){if(!t.length)return"0:";for(var n,o="",r=0,i=t.length;i>r;r++)n=e.encodePacket(t[r]),o+=n.length+":"+n;return o},e.decodePayload=function(t){if(""==t)return[s];for(var n,o,r,i=[],a="",c=0,p=t.length;p>c;c++){var h=t.charAt(c);if(":"!=h)a+=h;else{if(""==a||a!=(n=Number(a)))return[s];if(o=t.substr(c+1,n),a!=o.length)return[s];if(o.length){if(r=e.decodePacket(o),s.type==r.type&&s.data==r.data)return[s];i.push(r)}c+=n,a=""}}return""!=a?[s]:i}}),e.register("node_modules/engine.io-client/lib/transports/polling-jsonp.js",function(t,e,n,o){function r(t){i.call(this,t),a||(o.___eio||(o.___eio=[]),a=o.___eio),this.index=a.length;var e=this;a.push(function(t){e.onData(t)}),this.query.j=this.index}var i=n("./polling"),s=n("../util");t.exports=r;var a,c=/\n/g;s.inherits(r,i),r.prototype.doOpen=function(){var t=this;s.defer(function(){i.prototype.doOpen.call(t)})},r.prototype.doClose=function(){this.script&&(this.script.parentNode.removeChild(this.script),this.script=null),this.form&&(this.form.parentNode.removeChild(this.form),this.form=null),i.prototype.doClose.call(this)},r.prototype.doPoll=function(){var t=document.createElement("script");this.script&&(this.script.parentNode.removeChild(this.script),this.script=null),t.async=!0,t.src=this.uri();var e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(t,e),this.script=t,s.ua.gecko&&setTimeout(function(){var t=document.createElement("iframe");document.body.appendChild(t),document.body.removeChild(t)},100)},r.prototype.doWrite=function(t,e){function n(){o(),e()}function o(){r.iframe&&r.form.removeChild(r.iframe);try{i=document.createElement('<iframe name="'+r.iframeId+'">')}catch(t){i=document.createElement("iframe"),i.name=r.iframeId}i.id=r.iframeId,r.form.appendChild(i),r.iframe=i}var r=this;if(!this.form){var i,s=document.createElement("form"),a=document.createElement("textarea"),p=this.iframeId="eio_iframe_"+this.index;s.className="socketio",s.style.position="absolute",s.style.top="-1000px",s.style.left="-1000px",s.target=p,s.method="POST",s.setAttribute("accept-charset","utf-8"),a.name="d",s.appendChild(a),document.body.appendChild(s),this.form=s,this.area=a}this.form.action=this.uri(),o(),this.area.value=t.replace(c,"\\n");try{this.form.submit()}catch(h){}this.iframe.attachEvent?this.iframe.onreadystatechange=function(){"complete"==r.iframe.readyState&&n()}:this.iframe.onload=n}}),e.register("node_modules/engine.io-client/lib/transports/polling.js",function(t,e,n,o){function r(t){i.call(this,t)}var i=n("../transport"),s=n("../util"),a=n("../parser");t.exports=r,s.inherits(r,i),r.prototype.name="polling",r.prototype.doOpen=function(){this.poll()},r.prototype.pause=function(t){function e(){n.readyState="paused",t()}var n=this;if(this.readyState="pausing",this.polling||!this.writable){var o=0;this.polling&&(o++,this.once("pollComplete",function(){--o||e()})),this.writable||(o++,this.once("drain",function(){--o||e()}))}else e()},r.prototype.poll=function(){this.polling=!0,this.doPoll(),this.emit("poll")},r.prototype.onData=function(t){for(var e=a.decodePayload(t),n=0,o=e.length;o>n;n++){if("opening"==this.readyState&&this.onOpen(),"close"==e[n].type)return this.onClose(),void 0;this.onPacket(e[n])}this.polling=!1,this.emit("pollComplete"),"open"==this.readyState&&this.poll()},r.prototype.doClose=function(){this.send([{type:"close"}])},r.prototype.write=function(t){var e=this;this.writable=!1,this.doWrite(a.encodePayload(t),function(){e.writable=!0,e.emit("drain")})},r.prototype.uri=function(){var t=this.query||{},e=this.secure?"https":"http",n="";return(o.ActiveXObject||s.ua.android||s.ua.ios6||this.timestampRequests)&&(t[this.timestampParam]=+new Date),t=s.qs(t),this.port&&("https"==e&&443!=this.port||"http"==e&&80!=this.port)&&(n=":"+this.port),t.length&&(t="?"+t),e+"://"+this.host+n+this.path+t}}),e.register("node_modules/engine.io-client/lib/transports/index.js",function(t,e,n,o){function r(t){var e,n=!1,r=!1;if(o.location){var a="https:"==location.protocol,c=location.port;Number(c)!=c&&(c=a?443:80),n=t.host!=location.hostname||c!=t.port,r=t.secure!=a}return e=p.request(n),r&&o.XDomainRequest&&e instanceof o.XDomainRequest?new s(t):e&&!t.forceJSONP?new i(t):new s(t)}var i=n("./polling-xhr"),s=n("./polling-jsonp"),a=n("./websocket"),c=n("./flashsocket"),p=n("../util");e.polling=r,e.websocket=a,e.flashsocket=c}),e.register("node_modules/engine.io-client/lib/transports/flashsocket.js",function(t,e,n,o){function r(t){a.call(this,t),this.flashPath=t.flashPath,this.policyPort=t.policyPort}function i(t,e){if(h[t])return e();var n=document.createElement("script"),o=!1;n.onload=n.onreadystatechange=function(){if(!o&&!h[t]){var r=n.readyState;r&&"loaded"!=r&&"complete"!=r||(n.onload=n.onreadystatechange=null,o=!0,h[t]=!0,e())}},n.async=1,n.src=t;var r=document.getElementsByTagName("head")[0];r.insertBefore(n,r.firstChild)}function s(t,e){function n(o){return t[o]?(i(t[o],function(){n(++o)}),void 0):e()}n(0)}var a=n("./websocket"),c=n("../util");t.exports=r;var p=o[["Active"].concat("Object").join("X")];c.inherits(r,a),r.prototype.name="flashsocket",r.prototype.doOpen=function(){function t(){return function(){Array.prototype.join.call(arguments," ")}}if(this.check()){WEB_SOCKET_LOGGER={log:t("debug"),error:t("error")},WEB_SOCKET_SUPPRESS_CROSS_DOMAIN_SWF_ERROR=!0,WEB_SOCKET_DISABLE_AUTO_INITIALIZATION=!0,"undefined"==typeof WEB_SOCKET_SWF_LOCATION&&(WEB_SOCKET_SWF_LOCATION=this.flashPath+"WebSocketMainInsecure.swf");var e=[this.flashPath+"web_socket.js"];"undefined"==typeof swfobject&&e.unshift(this.flashPath+"swfobject.js");var n=this;s(e,function(){n.ready(function(){WebSocket.__addTask(function(){a.prototype.doOpen.call(n)})})})}},r.prototype.doClose=function(){if(this.socket){var t=this;WebSocket.__addTask(function(){a.prototype.doClose.call(t)})}},r.prototype.write=function(){var t=this,e=arguments;WebSocket.__addTask(function(){a.prototype.write.apply(t,e)})},r.prototype.ready=function(t){function e(){r.loaded||(843!=n.policyPort&&WebSocket.loadFlashPolicyFile("xmlsocket://"+n.host+":"+n.policyPort),WebSocket.__initialize(),r.loaded=!0),t.call(n)}if("undefined"!=typeof WebSocket&&"__initialize"in WebSocket&&swfobject&&!(10>swfobject.getFlashPlayerVersion().major)){var n=this;return document.body?e():(c.load(e),void 0)}},r.prototype.check=function(){if("undefined"!=typeof WebSocket&&!("__initialize"in WebSocket))return!1;if(p){var t=null;try{t=new p("ShockwaveFlash.ShockwaveFlash")}catch(e){}if(t)return!0}else for(var n=0,o=navigator.plugins.length;o>n;n++)for(var r=0,i=navigator.plugins[n].length;i>r;r++)if("Shockwave Flash"==navigator.plugins[n][r].description)return!0;return!1};var h={}}),e.register("node_modules/engine.io-client/lib/transports/polling-xhr.js",function(t,e,n,o){function r(){}function i(t){a.call(this,t),o.location&&(this.xd=t.host!=o.location.hostname||o.location.port!=t.port)}function s(t){this.method=t.method||"GET",this.uri=t.uri,this.xd=!!t.xd,this.async=!1!==t.async,this.data=void 0!=t.data?t.data:null,this.create()}var a=n("./polling"),c=n("../event-emitter"),p=n("../util");t.exports=i,t.exports.Request=s;var h=o[["Active"].concat("Object").join("X")];p.inherits(i,a),i.prototype.doOpen=function(){var t=this;p.defer(function(){a.prototype.doOpen.call(t)})},i.prototype.request=function(t){return t=t||{},t.uri=this.uri(),t.xd=this.xd,new s(t)},i.prototype.doWrite=function(t,e){var n=this.request({method:"POST",data:t}),o=this;n.on("success",e),n.on("error",function(t){o.onError("xhr post error",t)}),this.sendXhr=n},i.prototype.doPoll=function(){var t=this.request(),e=this;t.on("data",function(t){e.onData(t)}),t.on("error",function(t){e.onError("xhr poll error",t)}),this.pollXhr=t},p.inherits(s,c),s.prototype.create=function(){var t=this.xhr=p.request(this.xd),e=this;if(t.open(this.method,this.uri,this.async),"POST"==this.method)try{t.setRequestHeader?t.setRequestHeader("Content-type","text/plain;charset=UTF-8"):t.contentType="text/plain"}catch(n){}this.xd&&o.XDomainRequest&&t instanceof XDomainRequest?(t.onerror=function(t){e.onError(t)},t.onload=function(){e.onData(t.responseText)},t.onprogress=r):("withCredentials"in t&&(t.withCredentials=!0),t.onreadystatechange=function(){var n;try{if(4!=t.readyState)return;200==t.status||1223==t.status?n=t.responseText:e.onError(t.status)}catch(o){e.onError(o)}void 0!==n&&e.onData(n)}),t.send(this.data),h&&(this.index=s.requestsCount++,s.requests[this.index]=this)},s.prototype.onSuccess=function(){this.emit("success"),this.cleanup()},s.prototype.onData=function(t){this.emit("data",t),this.onSuccess()},s.prototype.onError=function(t){this.emit("error",t),this.cleanup()},s.prototype.cleanup=function(){this.xhr.onreadystatechange=r,this.xhr.onload=this.xhr.onerror=r;try{this.xhr.abort()}catch(t){}h&&delete s.requests[this.index],this.xhr=null},s.prototype.abort=function(){this.cleanup()},h&&(s.requestsCount=0,s.requests={},o.attachEvent("onunload",function(){for(var t in s.requests)s.requests.hasOwnProperty(t)&&s.requests[t].abort()}))}),e.register("node_modules/engine.io-client/lib/transports/websocket.js",function(t,e,n,o){function r(t){s.call(this,t)}function i(){return o.WebSocket||o.MozWebSocket}var s=n("../transport"),a=n("../parser"),c=n("../util");t.exports=r,c.inherits(r,s),r.prototype.name="websocket",r.prototype.doOpen=function(){if(this.check()){var t=this;this.socket=new(i())(this.uri()),this.socket.onopen=function(){t.onOpen()},this.socket.onclose=function(){t.onClose()},this.socket.onmessage=function(e){t.onData(e.data)},this.socket.onerror=function(e){t.onError("websocket error",e)}}},r.prototype.write=function(t){for(var e=0,n=t.length;n>e;e++)this.socket.send(a.encodePacket(t[e]))},r.prototype.doClose=function(){this.socket!==void 0&&this.socket.close()},r.prototype.uri=function(){var t=this.query||{},e=this.secure?"wss":"ws",n="";return this.port&&("wss"==e&&443!=this.port||"ws"==e&&80!=this.port)&&(n=":"+this.port),this.timestampRequests&&(t[this.timestampParam]=+new Date),t=c.qs(t),t.length&&(t="?"+t),e+"://"+this.host+n+this.path+t},r.prototype.check=function(){var t=i();return!(!t||"__initialize"in t&&this.name===r.prototype.name)}}),e.register("node_modules/engine.io-client/lib/socket.js",function(t,e,n,o){function r(t){if("string"==typeof t){var e=a.parseUri(t);t=arguments[1]||{},t.host=e.host,t.secure="https"==e.protocol||"wss"==e.protocol,t.port=e.port}t=t||{},this.secure=null!=t.secure?t.secure:o.location&&"https:"==location.protocol,this.host=t.host||t.hostname||(o.location?location.hostname:"localhost"),this.port=t.port||(o.location&&location.port?location.port:this.secure?443:80),this.query=t.query||{},this.query.uid=s(),this.upgrade=!1!==t.upgrade,this.resource=t.resource||"default",this.path=(t.path||"/engine.io").replace(/\/$/,""),this.path+="/"+this.resource+"/",this.forceJSONP=!!t.forceJSONP,this.timestampParam=t.timestampParam||"t",this.timestampRequests=!!t.timestampRequests,this.flashPath=t.flashPath||"",this.transports=t.transports||["polling","websocket","flashsocket"],this.readyState="",this.writeBuffer=[],this.policyPort=t.policyPort||843,this.open(),r.sockets.push(this),r.sockets.evs.emit("add",this)}function i(t){var e={};for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e}function s(){return(Math.random()+"").substr(5)+(Math.random()+"").substr(5)}var a=n("./util"),c=n("./transports"),p=n("debug")("engine-client:socket"),h=n("./event-emitter");t.exports=r,a.inherits(r,h),r.sockets=[],r.sockets.evs=new h,r.prototype.createTransport=function(t){p('creating transport "%s"',t);var e=i(this.query);e.transport=t,this.id&&(e.sid=this.id);var n=new c[t]({host:this.host,port:this.port,secure:this.secure,path:this.path,query:e,forceJSONP:this.forceJSONP,timestampRequests:this.timestampRequests,timestampParam:this.timestampParam,flashPath:this.flashPath,policyPort:this.policyPort});return n},r.prototype.open=function(){this.readyState="opening";var t=this.createTransport(this.transports[0]);t.open(),this.setTransport(t)},r.prototype.setTransport=function(t){var e=this;this.transport&&(p("clearing existing transport"),this.transport.removeAllListeners()),this.transport=t,t.on("drain",function(){e.flush()}).on("packet",function(t){e.onPacket(t)}).on("error",function(t){e.onError(t)}).on("close",function(){e.onClose("transport close")})},r.prototype.probe=function(t){p('probing transport "%s"',t);var e=this.createTransport(t,{probe:1}),n=this;e.once("open",function(){p('probe transport "%s" opened',t),e.send([{type:"ping",data:"probe"}]),e.once("packet",function(o){if("pong"==o.type&&"probe"==o.data)p('probe transport "%s" pong',t),n.upgrading=!0,n.emit("upgrading",e),p('pausing current transport "%s"',n.transport.name),n.transport.pause(function(){"closed"!=n.readyState&&"closing"!=n.readyState&&(p("changing transport and sending upgrade packet"),n.emit("upgrade",e),n.setTransport(e),e.send([{type:"upgrade"}]),e=null,n.upgrading=!1,n.flush())});else{p('probe transport "%s" failed',t);var r=Error("probe error");r.transport=e.name,n.emit("error",r)}})}),e.open(),this.once("close",function(){e&&(p("socket closed prematurely - aborting probe"),e.close(),e=null)}),this.once("upgrading",function(t){e&&t.name!=e.name&&(p('"%s" works - aborting "%s"',t.name,e.name),e.close(),e=null)})},r.prototype.onOpen=function(){if(p("socket open"),this.readyState="open",this.emit("open"),this.onopen&&this.onopen.call(this),this.flush(),this.upgrade&&this.transport.pause){p("starting upgrade probes");for(var t=0,e=this.upgrades.length;e>t;t++)this.probe(this.upgrades[t])}},r.prototype.onPacket=function(t){if("opening"==this.readyState||"open"==this.readyState)switch(p('socket receive: type "%s", data "%s"',t.type,t.data),this.emit("packet",t),this.emit("heartbeat"),t.type){case"open":this.onHandshake(a.parseJSON(t.data));break;case"pong":this.ping();break;case"error":var e=Error("server error");e.code=t.data,this.emit("error",e);break;case"message":this.emit("message",t.data);var n={data:t.data};n.toString=function(){return t.data},this.onmessage&&this.onmessage.call(this,n)}else p('packet received with socket readyState "%s"',this.readyState)},r.prototype.onHandshake=function(t){this.emit("handshake",t),this.id=t.sid,this.transport.query.sid=t.sid,this.upgrades=t.upgrades,this.pingInterval=t.pingInterval,this.pingTimeout=t.pingTimeout,this.onOpen(),this.ping(),this.removeListener("heartbeat",this.onHeartbeat),this.on("heartbeat",this.onHeartbeat)},r.prototype.onHeartbeat=function(t){clearTimeout(this.pingTimeoutTimer);var e=this;e.pingTimeoutTimer=setTimeout(function(){"closed"!=e.readyState&&e.onClose("ping timeout")},t||e.pingInterval+e.pingTimeout)},r.prototype.ping=function(){var t=this;clearTimeout(t.pingIntervalTimer),t.pingIntervalTimer=setTimeout(function(){p("writing ping packet - expecting pong within %sms",t.pingTimeout),t.sendPacket("ping"),t.onHeartbeat(t.pingTimeout)},t.pingInterval)},r.prototype.flush=function(){"closed"!=this.readyState&&this.transport.writable&&!this.upgrading&&this.writeBuffer.length&&(p("flushing %d packets in socket",this.writeBuffer.length),this.transport.send(this.writeBuffer),this.writeBuffer=[])},r.prototype.write=r.prototype.send=function(t){return this.sendPacket("message",t),this},r.prototype.sendPacket=function(t,e){var n={type:t,data:e};this.emit("packetCreate",n),this.writeBuffer.push(n),this.flush()},r.prototype.close=function(){return("opening"==this.readyState||"open"==this.readyState)&&(this.onClose("forced close"),p("socket closing - telling transport to close"),this.transport.close(),this.transport.removeAllListeners()),this},r.prototype.onError=function(t){this.emit("error",t),this.onClose("transport error",t)},r.prototype.onClose=function(t,e){"closed"!=this.readyState&&(p('socket close with reason: "%s"',t),this.readyState="closed",this.emit("close",t,e),this.onclose&&this.onclose.call(this),this.id=null)}}),e.register("node_modules/engine.io-client/lib/util.js",function(t,e,n,o){var r=!1;e.inherits=function(t,e){function n(){}n.prototype=e.prototype,t.prototype=new n},e.keys=Object.keys||function(t){var e=[],n=Object.prototype.hasOwnProperty;for(var o in t)n.call(t,o)&&e.push(o);return e},e.on=function(t,e,n,o){t.attachEvent?t.attachEvent("on"+e,n):t.addEventListener&&t.addEventListener(e,n,o)},e.load=function(t){return o.document&&"complete"===document.readyState||r?t():(e.on(o,"load",t,!1),void 0)},"undefined"!=typeof window&&e.load(function(){r=!0}),e.defer=function(t){return e.ua.webkit&&"undefined"==typeof importScripts?(e.load(function(){setTimeout(t,100)}),void 0):t()};var i=/^[\],:{}\s]*$/,s=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,a=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,c=/(?:^|:|,)(?:\s*\[)+/g,p=/^\s+/,h=/\s+$/;e.parseJSON=function(t){return"string"==typeof t&&t?(t=t.replace(p,"").replace(h,""),o.JSON&&JSON.parse?JSON.parse(t):i.test(t.replace(s,"@").replace(a,"]").replace(c,""))?Function("return "+t)():void 0):null},e.ua={},e.ua.hasCORS="undefined"!=typeof XMLHttpRequest&&function(){try{var t=new XMLHttpRequest}catch(e){return!1}return void 0!=t.withCredentials}(),e.ua.webkit="undefined"!=typeof navigator&&/webkit/i.test(navigator.userAgent),e.ua.gecko="undefined"!=typeof navigator&&/gecko/i.test(navigator.userAgent),e.ua.android="undefined"!=typeof navigator&&/android/i.test(navigator.userAgent),e.ua.ios="undefined"!=typeof navigator&&/^(iPad|iPhone|iPod)$/.test(navigator.platform),e.ua.ios6=e.ua.ios&&/OS 6_/.test(navigator.userAgent),e.request=function(t){if(t&&"undefined"!=typeof XDomainRequest&&!e.ua.hasCORS)return new XDomainRequest;try{if("undefined"!=typeof XMLHttpRequest&&(!t||e.ua.hasCORS))return new XMLHttpRequest}catch(n){}if(!t)try{return new ActiveXObject("Microsoft.XMLHTTP")}catch(n){}};var u=/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,l=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"];e.parseUri=function(t){for(var e=u.exec(t||""),n={},o=14;o--;)n[l[o]]=e[o]||"";return n},e.qs=function(t){var e="";for(var n in t)t.hasOwnProperty(n)&&(e.length&&(e+="&"),e+=n+"="+encodeURIComponent(t[n]));return e}}),e.register("node_modules/engine.io-client/lib/transport.js",function(t,e,n){function o(t){this.path=t.path,this.host=t.host,this.port=t.port,this.secure=t.secure,this.query=t.query,this.timestampParam=t.timestampParam,this.timestampRequests=t.timestampRequests,this.readyState=""}var r=n("./util"),i=n("./parser"),s=n("./event-emitter");t.exports=o,r.inherits(o,s),o.prototype.onError=function(t,e){var n=Error(t);return n.type="TransportError",n.description=e,this.emit("error",n),this},o.prototype.open=function(){return("closed"==this.readyState||""==this.readyState)&&(this.readyState="opening",this.doOpen()),this},o.prototype.close=function(){return("opening"==this.readyState||"open"==this.readyState)&&(this.doClose(),this.onClose()),this},o.prototype.send=function(t){if("open"!=this.readyState)throw Error("Transport not open");this.write(t)},o.prototype.onOpen=function(){this.readyState="open",this.writable=!0,this.emit("open")},o.prototype.onData=function(t){this.onPacket(i.decodePacket(t))},o.prototype.onPacket=function(t){this.emit("packet",t)},o.prototype.onClose=function(){this.readyState="closed",this.emit("close")}}),e.register("Socket.js",function(t){(function(){var e=[].slice;t.exports={write:function(t){var e=this;return this.parent.outbound(this,t,function(t){return e.send(t)}),this},disconnect:function(){var t;return t=arguments.length>=1?e.call(arguments,0):[],this.close.apply(this,t),this}}}).call(this)}),e.register("Client.js",function(t,e,n){(function(){var e,o,r,i,s,a=function(t,e){return function(){return t.apply(e,arguments)}},c={}.hasOwnProperty,p=function(t,e){function n(){this.constructor=t}for(var o in e)c.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t};s=n("./util"),i=s.isBrowser(),i?(r=n("node_modules/engine.io-client/lib/engine.io-client"),o=r.EventEmitter):(r=n("engine.io-client"),o=n("events").EventEmitter),s.extendSocket(r.Socket),e=function(t){function e(t,e){var n,o,s;null==e&&(e={}),this.handleClose=a(this.handleClose,this),this.handleError=a(this.handleError,this),this.handleMessage=a(this.handleMessage,this),this.handleConnection=a(this.handleConnection,this);for(o in t)s=t[o],this[o]=s;for(o in e)s=e[o],this.options[o]=s;this.isServer=!1,this.isClient=!0,this.isBrowser=i,n={host:this.options.host,port:this.options.port,secure:this.options.secure,path:"/"+this.options.namespace,resource:this.options.resource,transports:this.options.transports,upgrade:this.options.upgrade,flashPath:this.options.flashPath,policyPort:this.options.policyPort,forceJSONP:this.options.forceJSONP,forceBust:this.options.forceBust,debug:this.options.debug},this.ssocket=new r.Socket(n),this.ssocket.parent=this,this.ssocket.on("open",this.handleConnection),this.ssocket.on("error",this.handleError),this.ssocket.on("message",this.handleMessage),this.ssocket.on("close",this.handleClose),this.start()}return p(e,t),e.prototype.disconnect=function(){return this.ssocket.close(),this},e.prototype.handleConnection=function(){return this.connected=!0,this.connect(this.ssocket)},e.prototype.handleMessage=function(t){var e=this;return this.emit("inbound",this.ssocket,t),this.inbound(this.ssocket,t,function(t){return e.validate(e.ssocket,t,function(n){return n?(e.emit("message",e.ssocket,t),e.message(e.ssocket,t)):(e.emit("invalid",e.ssocket,t),e.invalid(e.ssocket,t))})})},e.prototype.handleError=function(t){return"string"==typeof t&&(t=Error(t)),this.error(this.ssocket,t)},e.prototype.handleClose=function(t){return this.emit("close",this.ssocket,t),this.close(this.ssocket,t)},e}(o),t.exports=e}).call(this)}),e.register("main.js",function(t,e,n){(function(){var t,e;e=n("./util"),t={createClientWrapper:function(e){return function(n){return t.createClient(e,n)}},createClient:function(t,o){var r,i,s;return r=n("./Client"),i=n("./defaultClient"),s=e.mergePlugins(i,t),new r(s,o)}},window.ProtoSock=t}).call(this)}),e.register("util.js",function(t,e,n){(function(){var e,o={}.hasOwnProperty,r=function(t,e){function n(){this.constructor=t}for(var r in e)o.call(e,r)&&(t[r]=e[r]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},i=[].slice;t.exports=e={extendSocket:function(t){var e;return e=n("./Socket"),r(t.prototype,e)},mergePlugins:function(){var t,n,o,r,s,a,c;for(t=arguments.length>=1?i.call(arguments,0):[],o={},a=0,c=t.length;c>a;a++){r=t[a];for(n in r)s=r[n],o[n]="object"==typeof s&&"server"!==n?e.mergePlugins(o[n],s):s}return o},isBrowser:function(){return!0}}}).call(this)}),e.register("defaultClient.js",function(t){(function(){var e;e={options:{},start:function(){},inbound:function(t,e,n){var o;try{o=JSON.parse(e)}catch(r){this.error(t,r)}return n(o),n},outbound:function(t,e,n){var o;try{o=JSON.stringify(e)}catch(r){this.error(t,r)}n(o)},validate:function(t,e,n){return n(!0)},invalid:function(){},connect:function(){},message:function(){},error:function(){},close:function(){}},e.options={host:window.location.hostname,port:window.location.port.length>0?parseInt(window.location.port):80,secure:"https:"===window.location.protocol},e.options.secure&&(e.options.port=443),t.exports=e}).call(this)}),main=e("main")})(),function(){var t,e,n,o,r=[].slice;o="undefined"!=typeof window,n=function(){var t;return t=function(){return(0|268435456*(1+Math.random())).toString(16)},t()+t()+t()},t=function(){function t(t,e,n){var o,r,i,s;for(this._socket=t,this._name=e,this._services=n,this._callbacks={},s=this._services,r=0,i=s.length;i>r;r++)o=s[r],this[o]=this._getSender(o)}return t.prototype._getSender=function(t){var e=this;return function(){var o,i,s,a;return o=arguments.length>=2?r.call(arguments,0,a=arguments.length-1):(a=0,[]),i=arguments[a++],s=n(),"function"==typeof i?e._callbacks[s]=i:o.push(i),e._socket.write({type:"request",id:s,ns:e._name,service:t,args:o})}},t}(),e={options:{namespace:"Vein",resource:"default"},start:function(){return this.namespaces={}},ready:function(t){return this.synced?t(this.ns("main")._services,this.namespaces):this.once("ready",t)},ns:function(t){return this.namespaces[t]},validate:function(t,e,n){if("object"!=typeof e)return n(!1);if("string"!=typeof e.type)return n(!1);if("response"===e.type){if("string"!=typeof e.id)return n(!1);if("string"!=typeof e.ns)return n(!1);if(null==this.ns(e.ns))return n(!1);if("string"!=typeof e.service)return n(!1);if("function"!=typeof this.ns(e.ns)._callbacks[e.id])return n(!1);if(!Array.isArray(e.args))return n(!1)}else{if("services"!==e.type)return n(!1);if("object"!=typeof e.args)return n(!1)}return n(!0)},error:function(t,e){return this.emit("error",e,t)},message:function(e,n){var o,r,i,s,a,c,p;if("response"===n.type)return(a=this.ns(n.ns)._callbacks)[n.id].apply(a,n.args),delete this.ns(n.ns)._callbacks[n.id];if("services"===n.type){c=n.args;for(o in c)r=c[o],this.namespaces[o]=new t(e,o,r);for(p=n.args.main,i=0,s=p.length;s>i;i++)o=p[i],this[o]=this.ns("main")[o];return this.synced=!0,this.emit("ready",this.ns("main")._services,this.namespaces)}}},o?window.Vein={createClient:ProtoSock.createClientWrapper(e)}:module.exports=e}.call(this);