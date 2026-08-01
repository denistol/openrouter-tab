import { browser } from "./lib/browser.js";
import {
  BAR_FALLBACK_MAX,
  BAR_MIN_PERCENT,
  EMPTY_MODEL_LABEL,
  MESSAGE_TYPES,
  PLACEHOLDER_BALANCE,
  REFRESH_BUSY_LABEL,
  REFRESH_IDLE_LABEL,
  SETTINGS_SAVE_DELAY_MS,
  SETTINGS_SAVED_LABEL,
  TIME_LOCALE
} from "./lib/constants.js";
import { formatMoney, displayModelName } from "./lib/format.js";
import { getSettings, setSettings, normalizeModelLimit } from "./lib/settings.js";

const $ = (selector) => document.querySelector(selector);

async function initModelLimit() {
  const { modelLimit } = await getSettings();
  $("#model-limit").value = String(modelLimit);
}

function renderModels(models) {
  const values = (Array.isArray(models) ? models : []).filter(({ model, value }) => (
    typeof model === "string" && model.trim() && Number.isFinite(Number(value))
  ));
  const safeValues = values.length ? values : [{ model: EMPTY_MODEL_LABEL, value: 0 }];
  const max = Math.max(...safeValues.map(({ value }) => Number(value)), BAR_FALLBACK_MAX);

  $("#model-list").innerHTML = safeValues.map(({ model, value }) => `
    <div class="model-row">
      <span class="model-name" title="${model}">${displayModelName(model)}</span>
      <span class="model-cost">${formatMoney(value)}</span>
      <div class="bar-track"><div class="bar-fill" style="width: ${Math.max(BAR_MIN_PERCENT, Number(value) / max * 100)}%"></div></div>
    </div>
  `).join("");
}

async function showSettings() {
  const { apiKey } = await getSettings();
  $("#api-key").value = apiKey;
  $("#dashboard-view").hidden = true;
  $("#usage-view").hidden = true;
  $("#settings-view").hidden = false;
  $("#message").textContent = "";
}

function hideSettings() {
  $("#settings-view").hidden = true;
  $("#dashboard-view").hidden = false;
  $("#usage-view").hidden = false;
}

async function load() {
  const refresh = $("#refresh");
  refresh.disabled = true;
  refresh.textContent = REFRESH_BUSY_LABEL;
  $("#message").textContent = "";

  try {
    await setSettings({ modelLimit: normalizeModelLimit($("#model-limit").value) });
    const data = await browser.runtime.sendMessage({ type: MESSAGE_TYPES.LOAD_DASHBOARD });

    if (data?.error) {
      throw new Error(data.error);
    }

    $("#balance").textContent = formatMoney(data.balance);
    $("#total-usage").textContent = `${formatMoney(data.totalUsage)} total`;
    renderModels(data.models);
    $("#updated").textContent = `Updated at ${new Date().toLocaleTimeString(TIME_LOCALE, {
      hour: "2-digit",
      minute: "2-digit"
    })}`;
  } catch (error) {
    $("#message").textContent = error.message;
    $("#balance").textContent = PLACEHOLDER_BALANCE;
  } finally {
    refresh.disabled = false;
    refresh.textContent = REFRESH_IDLE_LABEL;
  }
}

$("#refresh").addEventListener("click", load);
$("#model-limit").addEventListener("change", load);
$("#settings").addEventListener("click", showSettings);
$("#close-settings").addEventListener("click", hideSettings);

$("#settings-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  await setSettings({ apiKey: $("#api-key").value });
  $("#saved").textContent = SETTINGS_SAVED_LABEL;
  window.setTimeout(() => {
    $("#saved").textContent = "";
    hideSettings();
    load();
  }, SETTINGS_SAVE_DELAY_MS);
});

initModelLimit().then(load);
