!function(){"use strict";function i(e){var t=typeof e;return"object"==t&&null!==e||"undefined"==t&&void 0!==e}function o(n,o,r,a){return function(t){function e(e){t[a](e,o,r)}Array.isArray(n)?n.forEach(e):e(n)}}function c(e){e.removeAttribute("tabindex")}function x(e){e.setAttribute("tabindex",0)}function D(e){function t(){u.className="button focusable",i("off")}function n(e){e.target!==u&&r()&&t()}function o(e){!e.relatedTarget&&r()&&t()}function r(){return/\bactive\b/.test(u.className)}function a(){return!u.hasAttribute("tabindex")}function i(e){e=F[e],F(document,e("mousemove",n),e("mouseout",o))}var u=F("SPAN",{className:"button focusable",get disabled(){return a()},set disabled(e){(e=!!e)!==a()&&(e?(F(u,c),r()&&(document.releaseCapture(),i("off")),u.blur()):F(u,x),u.className="",u.className="button focusable")}},x,F.on("click",function(e){a()&&e.stopImmediatePropagation(),e.preventDefault()}),F.on("keydown",function(e){13===e.keyCode&&(u.click(),e.preventDefault())}),F.on("keyup",function(e){32===e.keyCode&&(u.click(),e.preventDefault())}),F.on("mouseup",function(e){0===e.button&&r()&&(document.releaseCapture(),t())}),F("SPAN",e),F("SPAN"));return u.setCapture&&(u.firstChild.setAttribute("unselectable","on"),F(u,F.on("mousedown",function(e){0!==e.button||a()||r()||(u.setCapture(),u.className="active button focusable",i("on"))}))),u}function _(e,t){function n(){var e=document.body;e.removeChild(u),F(e,F.off("keydown",a),F.off("focus",r,!0)),void 0!==t&&t()}function o(){i.focus()}function r(e){i.contains(e.target)||o()}function a(e){var t=e.keyCode;13!==t&&27!==t||!(t=document.activeElement).contains(i)&&t.contains(e.target)||(n(),e.preventDefault())}var i=F("DIV",{style:{borderRadius:"25px",display:"inline-block",maxWidth:"500px",width:"100%"}},x,F("DIV",{className:"focusable",id:"modalBox",style:{background:"whitesmoke",border:"10px solid blue",borderRadius:"23px",margin:"2px"}},F("DIV",{style:{margin:"1.5em 1.5em .25em",overflow:"hidden"}},e,F("DIV",{style:{margin:"1.25em 0"}},F(D("OK"),{style:{maxWidth:"5em",width:"100%"}},F.on("click",n)))))),u=F("DIV",{style:{background:"rgba(0, 0, 0, .25)",overflow:"auto",position:"fixed",textAlign:"center",left:"0",top:"0",bottom:"0",width:"100%"}},F("DIV",{style:{display:"table",tableLayout:"fixed",width:"100%",height:"100%"}},F("DIV",{style:{display:"table-cell",verticalAlign:"middle"}},i)));F(document.body,u,F.on("focus",r,!0),F.on("keydown",a)),setTimeout(o)}function n(){(J=new Worker(N)).onmessage=e}function r(){URL.revokeObjectURL(N),N=void 0}function T(){var e,t=a();try{e=JScrewIt.encode(inputArea.value,t)}catch(e){return f(),void p(String(e))}b(e)}function R(){var e=a(),e={input:inputArea.value,options:e};t&&(J.terminate(),n(),e.url=g),J.postMessage(e),f(),m(!0),inputArea.onkeyup=null}function a(){return{features:j.canonicalNames}}function u(e){9!==e.keyCode&&R()}function M(e){var t;L(e)&&(e=outputArea.value.length,0===outputArea.selectionStart&&outputArea.selectionEnd===e||(outputArea.selectionStart=0,outputArea.selectionEnd=e,"scrollTopMax"in outputArea&&(t=outputArea.scrollTop,F(outputArea,F.on("scroll",function(){outputArea.scrollTop=t},{once:!0})))))}function s(){H.disabled=!1;var e=this.result;null!=e&&(inputArea.value=e),inputArea.oninput(),inputArea.disabled=!1}function O(){var e,t,n,o;try{t=(0,eval)(outputArea.value)}catch(e){n=F("P",String(e))}void 0!==t&&(e=formatValue(t),t=formatValueType(t),n=e?F("DIV",F("P",t?"Evaluation result is "+t+":":"Evaluation result is"),F("P",{style:{overflowX:"auto"}},F("DIV",{style:{display:"inline-block",textAlign:"left",whiteSpace:"pre"}},e))):F("DIV",F("P","Evaluation result is "+t+"."))),null!=n&&(o=this,_(n,function(){o.focus()}))}function e(e){var t=e.data;(e=t.error)?p(e):b(t.output),m(!1)}function L(e){var t,n,o=e.target;return(n="runtimeStyle"in o?(n=o.lastMainMouseButtonEventTimeStamp,t=0===e.button?e.timeStamp:void 0,(o.lastMainMouseButtonEventTimeStamp=t)-n<=500):2<=e.detail&&0===e.button)&&e.preventDefault(),n}function l(){function n(){var e=+new Date;0<=((d=c+(e-s)*l/250)-i)*l&&(d=i,o()),r.height=1===d?"":t.scrollHeight*d+"px",a.display=0===d?"none":""}function o(){clearInterval(u),u=null,l=0}document.querySelector("main>div").style.display="block",inputArea.value=inputArea.defaultValue,F(outputArea,F.on("mousedown",M),F.on("mouseup",L),F.on("input",V)),F(stats.parentNode,F(D("Run this"),{style:{bottom:"0",fontSize:"10pt",position:"absolute",right:"0"}},F.on("click",O))),g=W.COMPACT,j=W.AUTO.includes(g)?g:W.BROWSER,compMenu.value=j.name,compMenu.previousIndex=compMenu.selectedIndex,J?(A=R)():(g=F(D("Encode"),F.on("click",T)),F(controls,g),A=P,outputArea.value=""),"undefined"!=typeof File&&(e=F("INPUT",{accept:".js",style:{display:"none"},type:"file"},F.on("change",C)),k=HTMLInputElement.prototype.click.bind(e),H=F(D("Load file…"),F.on("click",k)),F(controls,H,e)),inputArea.oninput=A;var t,r,a,i,u,c,s,l,d,e,f,m,p,b,v,y,h,g,A,N,k=function(){var e=compMenu.selectedIndex,t=compMenu.options[e].value,n=t?W[t]:U.feature;!B&&W.areEqual(n,j)||(j=n,this()),e!==compMenu.previousIndex&&(compMenu.previousIndex=e,q.rollTo(+!t))}.bind(A);function S(e,t){return F("LABEL",{style:{display:"inline-table"}},F("SPAN",{style:{display:"table-cell",verticalAlign:"middle"}},F("INPUT",{style:{margin:"0 .25em 0 0"},type:"checkbox"},t)),F("SPAN",{style:{display:"table-cell"}},e))}function w(e){var t=F("DIV",{className:"help-text"});return t.innerHTML=e,F("SPAN",{className:"focusable",style:{background:"black",borderRadius:"1em",color:"white",cursor:"pointer",display:"inline-table",fontSize:"8pt",fontWeight:"bold",lineHeight:"10.5pt",position:"relative",textAlign:"center",top:"-1.5pt",width:"10.5pt"},title:"Learn more…"},"?",x,F.on("click",function(){_(t)}))}function E(){var t=f.checked;Array.prototype.forEach.call(p,function(e){e.checked=t})}function I(){var t=JScrewIt.Feature,e=Array.prototype.filter.call(p,function(e){return e.checked}).map(function(e){return++n,t[e.featureName]}),n=e.length;f.checked=n,f.indeterminate=n&&n<p.length,m=t.commonOf.apply(null,e)||t.DEFAULT,v.checked&&(m=m.restrict("web-worker",e)),b.checked&&(m=m.restrict("forced-strict-mode",e))}F(compMenu,F.on("change",k)),U=F((y=F(S("Select/deselect all"),{style:{margin:"0 0 .5em"}},F.on("change",E),F.on(["keyup","mouseup"],function(){setTimeout(function(){f.indeterminate||E()})})),h=F("TABLE",{style:{borderSpacing:"0",width:"100%"}}),g=S("Generate strict mode code"),A=S("Support web workers"),N=F("FIELDSET",{className:"engine-selection-box",get feature(){return m}},F("DIV",F("P",{style:{margin:".25em 0 .75em"}},"Select the engines you want your code to support."),y,h,F("HR"),F("DIV",A," ",w("<p>Web workers are part of a standard HTML technology used to perform background tasks in JavaScript.<p>Check the option <dfn>Support web workers</dfn> only if your code needs to run inside a web worker. To create or use a web worker in your code, this option is not required.")),F("DIV",g," ",w('<p>The option <dfn>Generate strict mode code</dfn> instructs JScrewIt to avoid optimizations that don\'t work in strict mode JavaScript code. Check this option only if your environment disallows non-strict code. You may want to do this for example in one of the following circumstances.<ul><li>To encode a string or a number and embed it in a JavaScript file in a place where strict mode code is expected, like in a scope containing a <code>"use strict"</code> statement or in a class body.<li>To encode a script and run it in Node.js with the option <code>--use_strict</code>.<li>To encode an ECMAScript module. Note that module support in JSFuck is <em>very</em> limited, as <code>import</code> and <code>export</code> statements don\'t work at all. If your module doesn\'t contain these statements, you can encode it using this option.</ul><p>In most other cases, this option is not required, not even to encode a script that contains a top level <code>"use strict"</code> statement.')),F.on("change",function(){var e;I(),(e=document.createEvent("Event")).initEvent("input",!0,!1),N.dispatchEvent(e)}))),[{name:"Chrome",versions:[{featureName:"CHROME_86",number:"86+"}]},{name:"Edge",versions:[{featureName:"CHROME_86",number:"86+"}]},{name:"Firefox",versions:[{featureName:"FF_78",number:"78–82"},{featureName:"FF_83",number:"83+"}]},{name:"Internet Explorer",versions:[{featureName:"IE_9",number:"9"},{featureName:"IE_10",number:"10"},{featureName:"IE_11",number:"11"},{featureName:"IE_11_WIN_10",number:"11 (W10)"}]},{name:"Safari",versions:[{featureName:"SAFARI_7_0",number:"7.0"},{featureName:"SAFARI_7_1",number:"7.1–8"},{featureName:"SAFARI_9",number:"9"},{featureName:"SAFARI_10",number:"10–11"},{featureName:"SAFARI_12",number:"12"},{featureName:"SAFARI_13",number:"13–14.0.0"},{featureName:"SAFARI_14_0_1",number:"14.0.1–14.0.3"},{featureName:"SAFARI_14_1",number:"14.1+"}]},{name:"Opera",versions:[{featureName:"CHROME_86",number:"72+"}]},{name:"Android Browser",versions:[{featureName:"ANDRO_4_0",number:"4.0"},{featureName:"ANDRO_4_1",number:"4.1–4.3"},{featureName:"ANDRO_4_4",number:"4.4"}]},{name:"Node.js",versions:[{featureName:"NODE_0_10",number:"0.10"},{featureName:"NODE_0_12",number:"0.12"},{featureName:"NODE_4",number:"4"},{featureName:"NODE_5",number:"5–9"},{featureName:"NODE_10",number:"10"},{featureName:"NODE_11",number:"11"},{featureName:"NODE_12",number:"12"},{featureName:"NODE_13",number:"13–14"},{featureName:"NODE_15",number:"15"},{featureName:"NODE_16",number:"16+"}]}].forEach(function(e,t){for(var n,o=e.versions,r=1&t?{className:"even-field"}:null,a=(o.length+2)/3^0,i=3*a,u=0;u<i;++u){var c=o[u];u%3||(n=F("TR",r),u||F(n,F("TD",{rowSpan:a,style:{padding:"0 .5em 0 0"}},e.name)),F(h,n)),c=c?S(c.number,{checked:!0,featureName:c.featureName}):null,F(n,F("TD",{style:{padding:"0 0 0 .5em",width:"6em"}},c))}}),f=y.querySelector("INPUT"),p=h.querySelectorAll("INPUT"),b=g.querySelector("INPUT"),v=A.querySelector("INPUT"),I(),N),F.on("input",k)),d=l=0,e=F("DIV"),(a=e.style).display="none",t=F("DIV",e,{container:e,rollTo:function(e){var t;e===d?o():((t=d<e?1:-1)!==l&&(c=d,s=+new Date,l=t),i=e,u=u||setInterval(n,0))}}),(r=t.style).height="0",r.overflowY="hidden",q=t,k="Custom Compatibility Selection","open"in(e=document.createElement("DETAILS"))?(F(e,{open:!0},F("SUMMARY",{dir:"rtl"},F("SPAN",{style:{float:"left"}},k))),F.css("details.frame:not([open])>:first-child",{"margin-bottom":"initial"})):e=F("DIV",F("SPAN",k)),F(q.container,F(e,{className:"frame"},U)),F(controls.parentNode,q),inputArea.selectionStart=2147483647,inputArea.focus()}function d(){document.addEventListener("DOMContentLoaded",l)}function C(){var e,t=this.files[0];t&&(inputArea.disabled=!0,inputArea.value="",H.disabled=!0,(e=new FileReader).addEventListener("loadend",s),e.readAsText(t))}function P(){A&&V(!0)}function f(){A=!1,outputArea.value="",stats.textContent="…"}function m(e){t=e,outputArea.disabled=e}function p(e){_(F("P",e))}function b(e){outputArea.value=e,V()}function V(e){var t=1===(t=outputArea.value.length)?"1 char":t+" chars";B=!!e,e&&(J&&(inputArea.onkeyup=u),t+=" – <i>out of sync</i>"),A=!0,stats.innerHTML=t}function v(e){var t,n=typeof e;try{t="string"==n?'"'+e+'"':0===e&&1/e<0?"-0":Array.isArray(e)?e.length?"[…]":"[]":"bigint"==n?e+"n":"symbol"!=n?String(e):e.toString()}catch(e){}return t}self.formatValue=function(e){var t;if(Array.isArray(e))try{t="["+e.map(v).join(", ")+"]"}catch(e){}else t=v(e);return t},self.formatValueType=function(e){var t;if(null!==e){var n=typeof e;if("function"==n||"object"==n||"undefined"==n){var o=Object.getPrototypeOf(e);if(o===Array.prototype)switch(e.length){case 0:t="an empty array";break;case 1:t="a one element array";break;default:t="an array"}else t=o===Date.prototype?"a date":o===RegExp.prototype?"a regular expression":"function"==n?"a function":"an object"}}return t};var y,h=Object,F=function(e){for(var t=e instanceof Node?e:"function"==typeof e?e.call(F):document.createElement(e),n=arguments.length,o=0;++o<n;){var r=arguments[o];r instanceof Node?t.appendChild(r):i(r)?function o(r,a){h.keys(a).forEach(function(e){var t,n=h.getOwnPropertyDescriptor(a,e);"value"in n?(t=n.value,e in r&&i(t)?o(r[e],t):r[e]=t):h.defineProperty(r,e,n)})}(t,r):"function"==typeof r?r.call(F,t):null!=r&&(r=document.createTextNode(r),t.appendChild(r))}return t};F.off=function(e,t,n){return o(e,t,n,"removeEventListener")},F.on=function(e,t,n){return o(e,t,n,"addEventListener")},F.css=function(e,t){var n,o=t;t=e=e+"{"+h.keys(n=o).map(function(e){return e+":"+n[e]}).join(";")+"}",y||(e=F("STYLE"),F(document.head,e),y=e.sheet),y.insertRule(t,y.cssRules.length)},F.css(".button",{background:"#e0e0e0",color:"#212121",cursor:"default",display:"inline-block",position:"relative"}),F.css(".button, .button>:last-child",{"border-radius":".1em"}),F.css(".button.active, .button[tabindex]:active",{background:"#29b3e5"}),F.css(".button.active>:first-child, .button[tabindex]:active>:first-child",{left:".1em",top:".1em"}),F.css(".button.active>:last-child, .button[tabindex]:active>:last-child",{"border-color":"#0088b6"}),F.css(".button:not([tabindex])",{background:"#e9e9e9",color:"#707070"}),F.css(".button:not([tabindex])>:last-child",{"border-color":"#bababa"}),F.css(".button>:first-child",{display:"inline-block",margin:".15em .5em",position:"relative","user-select":"none","-moz-user-select":"none","-ms-user-select":"none","-webkit-user-select":"none"}),F.css(".button>:last-child",{"border-color":"#707070","border-style":"solid","border-width":"1px",display:"inline-block",position:"absolute",left:"0",right:"0",top:"0",bottom:"0"}),F.css(".button[tabindex]:hover:not(.active):not(:active)",{background:"#a3f4ff"}),F.css(".button[tabindex]:hover:not(.active):not(:active)>:last-child",{"border-color":"#189fdd"}),F.css("#modalBox p:first-child",{"margin-top":"0"}),F.css("#modalBox p:last-child",{"margin-bottom":"0"}),F.css(".engine-selection-box",{background:"#f0f0f0"}),F.css(".engine-selection-box .even-field",{background:"#fff"}),F.css(".help-text",{"font-size":"11pt","text-align":"justify"}),F.css(".help-text code",{"white-space":"pre"}),F.css(".help-text dfn",{"font-style":"normal","font-weight":"bold"}),F.css(".help-text li",{margin:".5em 0"});var j,U,g,H,B,A,q,t,J,N,k="application/javascript",W=JScrewIt.Feature;!function(){var t;try{(t=new XMLHttpRequest).open("GET","lib/jscrewit.min.js",!0)}catch(e){t=void 0}if(t&&"undefined"!=typeof Worker){N=URL.createObjectURL(new Blob(['"use strict";self.onmessage=function(t){var r=t.data,t=r.url;null!=t&&importScripts(t);t=r.input;if(null!=t){try{e={output:JScrewIt.encode(t,r.options)}}catch(t){var e={error:String(t)}}postMessage(e)}};'],{type:k}));try{n()}catch(e){r()}}J?(t.onerror=function(){J.terminate(),J=void 0,r()},t.onload=function(){t.status<400?(g=URL.createObjectURL(t.response),J.postMessage({url:g})):this.onerror()},t.onloadend=function(){("loading"===document.readyState?d:l)()},t.overrideMimeType(k),t.responseType="blob",t.send()):d()}()}();