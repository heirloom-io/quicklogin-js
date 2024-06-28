/**
 * @callback OnQuickLoginSuccess
 * @param {string} accessToken - Access token returned upon a successful QuickLogin
 */

/**
 * Create a QuickLogin iFrame
 * @param {Object} options
 * @param {string} options.apiKey - The API key to use
 * @param {lockId} options.lockId - The lock ID to use
 * @param {OnQuickLoginSuccess} options.onQuickLoginSuccess - Callback function to be called when a QuickLogin succeeds
 * @returns {void}
 */
export function createQuickLogin({ apiKey, lockId, legacyUrl = null, onQuickLoginSuccess }) {
  const CREATOR_URL = process.env.CREATOR_URL;
  const iframeContainer = document.querySelector("[data-quicklogin]");

  if (!iframeContainer) {
    throw new Error(`QuickLogin SDK: iFrame target not found`);
  }

  if (!apiKey || !lockId) {
    throw new Error(`QuickLogin SDK: apiKey and/or lockId not found`);
  }

  let iframeUrl = `${CREATOR_URL}/quickLogin?apiKey=${apiKey}&lockId=${lockId}`;
  if (legacyUrl) {
    iframeUrl += `&legacyUrl=${legacyUrl}`;
  }

  const quickLoginIframe = document.createElement("iframe");
  quickLoginIframe.src = iframeUrl;
  quickLoginIframe.id = "quicklogin-iframe";
  quickLoginIframe.style.border = "none";
  quickLoginIframe.style.width = "255px";
  quickLoginIframe.style.height = "48px";

  iframeContainer.appendChild(quickLoginIframe);

  window.addEventListener("message", (event) => {
    if (event.origin !== CREATOR_URL) return;

    switch (event.data.type) {
      case "quicklogin-challenge-generated":
        quickLoginIframe.style.height = "380px";
        break;
      case "quicklogin-websocket-response":
        onQuickLoginSuccess(event.data.message);
        break;
      default:
        break;
    }
  });
}
