"use strict";function _toConsumableArray(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}chrome.runtime.sendMessage("getState",function(t){t&&sortItems()});var chunk=function(n,r){return Array.from({length:Math.ceil(n.length/r)},function(t,e){return n.slice(e*r,e*r+r)})},flatten=function(t){return t.reduce(function(t,e){return[].concat(_toConsumableArray(t),_toConsumableArray(e))},[])},getItemId=function(t){return(t.querySelector(".list-view-item-title a").getAttribute("href").replace(/-/g,"").match(/MLA\d*/g)||[""])[0]};function sortItems(){var r=".results-item",u=".item__condition",i=[].concat(_toConsumableArray(document.querySelectorAll(r))),t=i.map(function(t){return getItemId(t)}).filter(function(t){return!t||"MLA"!==t});console.log("TCL: sortItems -> ids",t);var e=chunk(t,20);Promise.all(e.map(function(t){return fetch("https://api.mercadolibre.com/items?ids="+t.join(",")+"&attributes=id,sold_quantity").then(function(t){return t.json()}).then(function(t){return console.log("TCL: sortItems -> data",t),t.map(function(t){return{id:t.body.hasOwnProperty("id")?t.body.id:0,soldQuantity:t.body.hasOwnProperty("sold_quantity")?t.body.sold_quantity:0}})})})).then(function(t){var o=flatten(t);i.forEach(function(t){var e=getItemId(t),n=o.find(function(t){return t.id===e})||{soldQuantity:0},r=t.querySelector(u);r.textContent=n.soldQuantity+" vendidos - "+r.textContent});var e=[].concat(_toConsumableArray(document.querySelectorAll(r))).sort(function(t,e){return t.querySelector(u).innerText.replace(/\D/g,"")-e.querySelector(u).innerText.replace(/\D/g,"")}),n=document.querySelector("#searchResults");n.innerHTML=null,e.forEach(function(t){n.insertAdjacentElement("afterbegin",t)})})}