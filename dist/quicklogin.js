var QuickLogin=function(e){"use strict";return e.createQuickLogin=function({apiKey:e,lockId:i,legacyUrl:o=null,onQuickLoginSuccess:n}){const t="https://creator.heirloom.io",c=document.querySelector("[data-quicklogin]");if(!c)throw new Error("QuickLogin SDK: iFrame target not found");if(!e||!i)throw new Error("QuickLogin SDK: apiKey and/or lockId not found");let r=`${t}/quickLogin?apiKey=${e}&lockId=${i}`;o&&(r+=`&legacyUrl=${o}`);const a=document.createElement("iframe");a.src=r,a.id="quicklogin-iframe",a.style.border="none",a.style.width="255px",a.style.height="48px",c.appendChild(a),window.addEventListener("message",(e=>{if(e.origin===t)switch(e.data.type){case"quicklogin-challenge-generated":a.style.height="380px";break;case"quicklogin-websocket-response":n(e.data.message)}}))},e}({});
