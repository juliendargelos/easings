!function(){function e(e,t){var n=new XMLHttpRequest;n.onreadystatechange=function(){4===n.readyState&&t(n.responseText)},n.open("GET",e,!0),n.send()}function t(e,t,n){Object.defineProperty?Object.defineProperty(e,t,n):e[t]=n.get()}var n;window.CSS||(window.CSS={}),"paintWorklet"in window.CSS||t(window.CSS,"paintWorklet",{get:function(){return n||(n=new B)}});var r="css-paint-polyfill",i=document.createElement(r);i.style.cssText="display: none;",document.documentElement.appendChild(i);var o=document.createElement("style");o.id=r,o.$$isPaint=!0,i.appendChild(o);var a=o.sheet,s=i.style,l=[],c=/(paint\(|-moz-element\(#paint-|-webkit-canvas\(paint-|[('"]blob:[^'"#]+#paint=|[('"]data:image\/paint-)/,u="getCSSCanvasContext"in document,p=(s.backgroundImage="-moz-element(#"+r+")")===s.backgroundImage,d="function"==typeof Promise;s.cssText="";var v=window.requestAnimationFrame||setTimeout,h=d?Promise.prototype.then.bind(Promise.resolve()):setTimeout,f=function(){return window.devicePixelRatio||1},g={},m={},y=0;function b(e){var t=e.bit^=1;return e.instances[t]||(e.instances[t]=new e.Painter)}function $(e,t){var n=e.cssText;!0===t.isNew&&c.test(n)&&n!==(n=E(n))&&(e=S(e,n));var r,i,o,a=e.selectorText,s=A(e.style);if(r=null==t.counters[a]?t.counters[a]=1:++t.counters[a],null!=m[i="sheet"+t.sheetId+"\n"+a+"\n"+r]){if((o=m[i]).selector===a)return o.rule=e,void(o.cssText!==s&&t.toProcess.push(o));t.toRemove.push(o)}else o=m[i]={key:i,selector:a,cssText:s,properties:{},rule:e},t.toProcess.push(o.selector)}function P(e,t){t(e);for(var n=e.firstElementChild;n;)P(n,t),n=n.nextElementSibling}function w(){for(var e=[].slice.call(document.styleSheets),t={toProcess:[],toRemove:[],counters:{},isNew:!1,sheetId:null},n=0;n<e.length;n++){var r=e[n].ownerNode;if(!r.$$isPaint){try{r.sheet.cssRules}catch(e){continue}t.sheetId=r.$$paintid,t.isNew=null==t.sheetId,t.isNew&&(t.sheetId=r.$$paintid=++y,!1===C(r))||x(r.sheet,$,t)}}for(var i=t.toRemove.length;i--;)delete m[t.toRemove[i].key];t.toProcess.length>0&&function(e){for(var t=document.querySelectorAll(e),n=0;n<t.length;n++)N(t[n])}(t.toProcess.join(", "))}function x(e,t,n){var r=[[0,e.cssRules]],i=r[0],o=i[1];if(o)for(var a=0;r.length>0;a++)if(a>=o.length){r.pop();var s=r.length;s>0&&(o=(i=r[s-1])[1],a=i[0])}else{i[0]=a;var l=o[a];if(1===l.type){var c=t(l,n);void 0!==c&&(n=c)}else l.cssRules&&l.cssRules.length>0&&r.push([0,l.cssRules])}return n}function S(e,t){for(var n=e.parentStyleSheet,r=e.parentRule,i=(r||n).cssRules,o=i.length-1,a=0;a<=o;a++)if(i[a]===e){(r||n).deleteRule(a),o=a;break}if(null!=t){if(r){var s=r.appendRule(t);return r.cssRules[s]}return n.insertRule(t,o),n.cssRules[o]}}function C(t){if(!t.$$isPaint){if(t.href)return e(t.href,R),!1;for(var n=t.childNodes.length;n--;){var r=t.childNodes[n].nodeValue,i=E(r);i!==r&&(t.childNodes[n].nodeValue=i)}}}function R(e){var t=document.createElement("style");t.disabled=!0,t.$$paintid=++y,t.appendChild(document.createTextNode(E(e))),(document.head||document.createElement("head")).appendChild(t);var n,r=[];for(x(t.sheet,T,r);n=r.pop();)S(n,null);w(),t.disabled=!1}function T(e,t){c.test(e.cssText)||t.push(e)}function E(e){return e.replace(/(;|,|\b)paint\s*\(\s*(['"]?)(.+?)\2\s*\)(;|,|!|\b)/g,"$1url(data:image/paint-$3,=)$4")}var k,O,I=[];function N(e){!0!==e.$$paintPending&&(e.$$paintPending=!0,-1===I.indexOf(e)&&1===I.push(e)&&h(L))}function L(){for(var e;e=I.pop();)M(e)}function j(e,t,n){for(var r=e.length,i=function(){--r||t.apply(null,n||l)},o=0;o<e.length;o++){var a=new Image;a.onload=i,a.onerror=onerror,a.src=e[o]}}function D(e){var t=e.$$paintId;return null==t&&(t=e.$$paintId=++z),t}function V(e){var t=e.$$paintRule,n=D(e);if(null==t){e.hasAttribute("data-css-paint")||e.setAttribute("data-css-paint",n);var r=a.insertRule('[data-css-paint="'+z+'"] {}',a.cssRules.length);t=e.$$paintRule=a.cssRules[r]}return t}function A(e){var t=e.cssText;if(t)return t;t="";for(var n=0,r=void 0;n<e.length;n++)0!==n&&(t+=" "),t+=r=e[n],t+=":",t+=e.getPropertyValue(r),t+=";";return t}function M(e){var t=getComputedStyle(e);if(e.$$paintObservedProperties)for(var n=0;n<e.$$paintObservedProperties.length;n++){var r=e.$$paintObservedProperties[n];if(t.getPropertyValue(r).trim()!==e.$$paintedPropertyValues[r].trim()){H(e,t);break}}else if(e.$$paintId||c.test(A(t)))return void H(e,t);e.$$paintPending=!1}var U={get:function(e){return e in O?O[e]:O[e]=k.getPropertyValue(e)}},z=0;function H(e,t){o.disabled=!0;var n,r=k=null==t?getComputedStyle(e):t;O={};var a=[];e.$$paintPending=!1;for(var s={width:e.clientWidth,height:e.clientHeight},l=f(),c=e.$$paintedProperties,d=0;d<r.length;d++){for(var v=r[d],h=U.get(v),m=/(,|\b|^)url\((['"]?)((?:-moz-element\(#|-webkit-canvas\()paint-\d+-([^;,]+)\)|(?:data:image\/paint-|blob:[^'"#]+#paint=)([^"';, ]+)[;,].*?)\2\)(,|\b|$)/g,y="",$=0,P=[],w=!1,x=!1,S=void 0,C=void 0;C=m.exec(h);){!1===x&&(S=D(e)),x=!0,y+=h.substring(0,C.index);var R=C[4]||C[5],T=C[3],E=g[R],I=E&&E.Painter.contextOptions||{},N=!1===I.scaling?1:l,L=void 0;E&&(E.Painter.inputProperties&&a.push.apply(a,E.Painter.inputProperties),L=b(E)),!0===I.nativePixels&&(s.width*=l,s.height*=l,N=1);var A=N*s.width,M=N*s.height,z=e.$$paintContext,H="paint-"+S+"-"+R;if(z&&z.canvas&&z.canvas.width==A&&z.canvas.height==M)z.clearRect(0,0,A,M);else{if(!0===u)z=document.getCSSCanvasContext("2d",H,A,M);else{var B=document.createElement("canvas");B.id=H,B.width=A,B.height=M,!0===p&&(B.style.display="none",i.appendChild(B)),z=B.getContext("2d")}e.$$paintContext=z,z.imageSmoothingEnabled=!1,1!==N&&z.scale(N,N)}if(L&&(z.save(),z.beginPath(),L.paint(z,s,U),z.closePath(),z.restore(),!1===u&&"resetTransform"in z&&z.resetTransform()),y+=C[1],!0===u)y+="-webkit-canvas("+H+")",w=null==C[4];else if(!0===p)y+="-moz-element(#"+H+")",w=null==C[4];else{var F=z.canvas.toDataURL("image/png").replace("/png","/paint-"+R);if("function"==typeof MSBlobBuilder&&(F=W(F,R)),P.push(F),y+='url("'+F+'")',F!==T||!n){var G=T?T.indexOf("#"):-1;~G&&URL.revokeObjectURL(T.substring(0,G)),w=!0}T=F}y+=C[6],$=C.index+C[0].length}!1!==x||null==c||null==c[v]?(y+=h.substring($),w&&(n||(n=V(e)),null==c&&(c=e.$$paintedProperties={}),c[v]=!0,"background"===v.substring(0,10)&&1!==l&&q(n.style,"background-size",s.width+"px "+s.height+"px"),0===P.length?q(n.style,v,y):j(P,q,[n.style,v,y]))):(n||(n=V(e)),n.style.removeProperty(v))}e.$$paintObservedProperties=0===a.length?null:a;for(var X=e.$$paintedPropertyValues={},J=0;J<a.length;J++){var K=a[J];X[K]=U.get(K)}o.disabled=!1}function W(e,t){for(var n=atob(e.split(",")[1]),r=new Uint8Array(n.length),i=0;i<n.length;i++)r[i]=n.charCodeAt(i);return URL.createObjectURL(new Blob([r]))+"#paint="+t}function q(e,t,n){e.setProperty(t,n,"important")}var B=function(){v(w);var e=document.createElement("x-a");document.body.appendChild(e);var n=!1,r=!1;new MutationObserver((function(t){if(!0!==r){r=!0;for(var i=0;i<t.length;i++){var o=t[i],a=void 0;if("childList"===o.type&&(a=o.addedNodes))for(var s=0;s<a.length;s++)1===a[s].nodeType&&N(a[s]);else"attributes"===o.type&&1===o.target.nodeType&&(o.target===e?n=!0:P(o.target,N))}r=!1}})).observe(document.body,{childList:!0,attributes:!0,subtree:!0}),e.style.cssText="color: red;",setTimeout((function(){if(document.body.removeChild(e),!n){var r=Object.getOwnPropertyDescriptor(HTMLElement.prototype,"style"),i=r.get;r.get=function(){var e=i.call(this);return e.ownerElement=this,e},t(HTMLElement.prototype,"style",r);var o=Object.getOwnPropertyDescriptor(CSSStyleDeclaration.prototype,"cssText"),a=o.set;o.set=function(e){return this.ownerElement&&N(this.ownerElement),a.call(this,e)},t(CSSStyleDeclaration.prototype,"cssText",o);var s=Object.getOwnPropertyDescriptor(CSSStyleDeclaration.prototype,"setProperty"),l=s.value;s.value=function(e,t,n){this.ownerElement&&N(this.ownerElement),l.call(this,e,t,n)},t(CSSStyleDeclaration.prototype,"setProperty",s)}}))};B.prototype.addModule=function(n){var r,o,a=this;return d&&(r=new Promise((function(e){return o=e}))),e(n,(function(e){var n={registerPaint:function(e,t){!function(e,t,n){g[e]={worklet:n,Painter:t,properties:t.inputProperties?[].slice.call(t.inputProperties):[],bit:0,instances:[]},w()}(e,t,{context:n,realm:r})}};t(n,"devicePixelRatio",{get:f}),n.self=n;var r=new function(e,t){var n=document.createElement("iframe");n.style.cssText="position:absolute; left:0; top:-999px; width:1px; height:1px;",t.appendChild(n);var r=n.contentWindow,i=r.document,o="var window,$hook";for(var a in r)a in e||"eval"===a||(o+=",",o+=a);for(var s in e)o+=",",o+=s,o+="=self.",o+=s;var l=i.createElement("script");l.appendChild(i.createTextNode('function $hook(self,console) {"use strict";\n\t\t'+o+";return function() {return eval(arguments[0])}}")),i.body.appendChild(l),this.exec=r.$hook(e,console)}(n,i);e=(a.transpile||String)(e),r.exec(e),o&&o()})),r}}();
//# sourceMappingURL=css-paint-polyfill.js.map
