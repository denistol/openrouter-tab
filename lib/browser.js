export const browser = globalThis.browser ?? globalThis.chrome;

/**
 * Register async message handlers that work in both Chrome and Firefox.
 * Returns true so Chrome keeps the message channel open until sendResponse.
 */
export function handleMessage(handlers) {
  browser.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    const handler = handlers[message?.type];
    if (!handler) return undefined;

    Promise.resolve(handler(message))
      .then(sendResponse)
      .catch((err) => sendResponse({ error: err.message || String(err) }));

    return true;
  });
}
