import { SETTINGS_SAVED_LABEL } from "../lib/constants.js";
import { getSettings, setSettings } from "../lib/settings.js";

async function init() {
  const { apiKey } = await getSettings();
  document.querySelector("#api-key").value = apiKey;
}

document.querySelector("#settings-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  await setSettings({ apiKey: document.querySelector("#api-key").value });
  document.querySelector("#saved").textContent = SETTINGS_SAVED_LABEL;
});

init();
