"use strict";function _toConsumableArray(e){if(Array.isArray(e)){for(var r=0,t=Array(e.length);r<e.length;r++)t[r]=e[r];return t}return Array.from(e)}function sortItems(){var e="",r="",t="",n=document.querySelector(".ico").className.includes("list selected")?"list":"gallery";"gallery"===n?(e=".sold-quantity",r=".info-shipping",t=".gallery-large"):"list"===n&&(e=".extra-info-sold",r=".extra-info-location",t=".list-view"),[].concat(_toConsumableArray(document.querySelectorAll(".results-item"))).forEach(function(t){t.querySelector(e)||t.querySelector(r).insertAdjacentHTML("beforebegin",'<li class="'+e.replace(".","")+'">0 vendidos</li>')});var l=[].concat(_toConsumableArray(document.querySelectorAll(".results-item"))).sort(function(r,t){return r.querySelector(e).innerText.replace(/\D/g,"")-t.querySelector(e).innerText.replace(/\D/g,"")}),o=document.querySelector(t);o.innerHTML=null,l.forEach(function(e){return o.insertAdjacentElement("afterbegin",e)})}chrome.runtime.sendMessage("getState",function(e){e&&sortItems()});