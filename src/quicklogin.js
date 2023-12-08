/**
 * @callback OnQuickLoginSuccess
 * @param {string} accessToken - Access token returned upon a successful QuickLogin
 */

/**
 * Create a QuickLogin iFrame
 * @param {Object} options
 * @param {string} options.apiKey - The API key associated with q QuickLogin Lock
 * @param {OnQuickLoginSuccess} options.onQuickLoginSuccess - Callback function to be called when a QuickLogin succeeds
 * @returns {void}
 */
export function createQuickLogin({ apiKey, onQuickLoginSuccess }) {
  const CREATOR_DOMAIN = process.env.CREATOR_DOMAIN;
  const iframeContainer = document.querySelector("[data-quicklogin]");

  if (!iframeContainer || !apiKey) {
    throw new Error(`QuickLogin SDK: iFrame target and/or apiKey not found`);
  }

  const quickLoginIframe = document.createElement("iframe");
  quickLoginIframe.src = `${CREATOR_DOMAIN}/quickLogin?apiKey=${apiKey}`;
  quickLoginIframe.id = "quicklogin-iframe";
  quickLoginIframe.style.border = "none";
  quickLoginIframe.style.width = "255px";
  quickLoginIframe.style.height = "48px";

  iframeContainer.appendChild(quickLoginIframe);

  window.addEventListener("message", (event) => {
    if (event.origin !== CREATOR_DOMAIN) return;

    switch (event.data.type) {
      case "quicklogin-challenge-generated":
        quickLoginIframe.style.height = "358px";
        break;
      case "quicklogin-websocket-response":
        onQuickLoginSuccess(event.data.message);
        break;
      default:
        break;
    }
  });
}
