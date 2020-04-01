/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
function e(e,t,n,o){return new(n||(n=Promise))((function(r,i){function a(e){try{l(o.next(e))}catch(e){i(e)}}function s(e){try{l(o.throw(e))}catch(e){i(e)}}function l(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,s)}l((o=o.apply(e,t||[])).next())}))}const t="ontouchstart"in window||"msmaxtouchpoints"in window.navigator,n=navigator.userAgent;e(void 0,void 0,void 0,(function*(){if("paintWorklet"in CSS)if(n.includes("Safari")&&!n.includes("Chrome")){const e=yield fetch("worklet.js"),t=yield e.blob(),n=new FileReader;n.addEventListener("load",()=>{CSS.paintWorklet.addModule(n.result)}),n.readAsText(t)}else CSS.paintWorklet.addModule("worklet.js");else yield import("./css-paint-polyfill.js"),CSS.paintWorklet.addModule("worklet.js")})),document.querySelectorAll("figure").forEach(e=>{const n=e.parentNode;let o,r,i,a,s,l,c=!1;const d=()=>{o=Date.now()-r,r+=o,a=i,i+=o/1e3,i>1&&(i%=1,a=0),e.style.setProperty("--progress",`${i}`),e.style.setProperty("--previous",`${a}`),e.style.setProperty("--delta",`${o}`),s=requestAnimationFrame(d)};n.addEventListener(t?"touchstart":"mouseover",()=>{cancelAnimationFrame(l),c||(c=!0,cancelAnimationFrame(s),i=a=0,r=Date.now(),d())}),n.addEventListener(t?"touchend":"mouseout",()=>{cancelAnimationFrame(l),l=requestAnimationFrame(()=>{cancelAnimationFrame(s),e.style.removeProperty("--progress"),e.style.removeProperty("--previous"),e.style.removeProperty("--delta"),c=!1})})});const o=document.querySelector("section");for(var r=0;r<10;r++)o.appendChild(document.createElement("div"));
//# sourceMappingURL=index.js.map
