"use strict";
exports.createQuickLogin = function ({ apiKey: e, onQuickLoginSuccess: i }) {
  const t = "http://localhost:3001",
    n = document.querySelector("[data-quicklogin]");
  if (!n || !e)
    throw new Error("QuickLogin SDK: iFrame target and/or apiKey not found");
  const o = document.createElement("iframe");
  (o.src = `${t}/quickLogin?apiKey=${e}`),
    (o.id = "quicklogin-iframe"),
    (o.style.border = "none"),
    (o.style.width = "255px"),
    (o.style.height = "48px"),
    n.appendChild(o),
    window.addEventListener("message", (e) => {
      if (e.origin === t)
        switch (e.data.type) {
          case "quicklogin-challenge-generated":
            o.style.height = "358px";
            break;
          case "quicklogin-websocket-response":
            i(e.data.message);
        }
    });
};
