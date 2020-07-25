/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function e(e,t,n,o){return new(n||(n=Promise))((function(r,i){function a(e){try{l(o.next(e))}catch(e){i(e)}}function s(e){try{l(o.throw(e))}catch(e){i(e)}}function l(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,s)}l((o=o.apply(e,t||[])).next())}))}const t="ontouchstart"in window||"msmaxtouchpoints"in window.navigator,n=navigator.userAgent;e(void 0,void 0,void 0,(function*(){if("paintWorklet"in CSS)if(n.includes("Safari")&&!n.includes("Chrome")){const e=yield fetch("worklet.js"),t=yield e.blob(),n=new FileReader;n.addEventListener("load",()=>{CSS.paintWorklet.addModule(n.result)}),n.readAsText(t)}else CSS.paintWorklet.addModule("worklet.js");else yield import("./css-paint-polyfill.js"),CSS.paintWorklet.addModule("worklet.js")})),document.querySelectorAll("figure").forEach(e=>{const n=e.parentNode;let o,r,i,a,s,l,c=!1;const d=()=>{o=Date.now()-r,r+=o,a=i,i+=o/1e3,i>1&&(i%=1,a=0),e.style.setProperty("--progress",""+i),e.style.setProperty("--previous",""+a),e.style.setProperty("--delta",""+o),s=requestAnimationFrame(d)};n.addEventListener(t?"touchstart":"mouseover",()=>{cancelAnimationFrame(l),c||(c=!0,cancelAnimationFrame(s),i=a=0,r=Date.now(),d())}),n.addEventListener(t?"touchend":"mouseout",()=>{cancelAnimationFrame(l),l=requestAnimationFrame(()=>{cancelAnimationFrame(s),e.style.removeProperty("--progress"),e.style.removeProperty("--previous"),e.style.removeProperty("--delta"),c=!1})})});const o=document.querySelector("section");for(var r=0;r<10;r++)o.appendChild(document.createElement("div"));
//# sourceMappingURL=index.js.map
