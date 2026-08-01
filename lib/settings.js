import { browser } from "./browser.js";
import { DEFAULT_SETTINGS, MODEL_LIMITS } from "./constants.js";

export { DEFAULT_SETTINGS as DEFAULTS, MODEL_LIMITS };

export function normalizeModelLimit(value) {
  const n = Number(value);
  return MODEL_LIMITS.includes(n) ? n : DEFAULT_SETTINGS.modelLimit;
}

export async function getSettings() {
  const settings = await browser.storage.local.get(DEFAULT_SETTINGS);
  return {
    apiKey: typeof settings.apiKey === "string" ? settings.apiKey : DEFAULT_SETTINGS.apiKey,
    modelLimit: normalizeModelLimit(settings.modelLimit)
  };
}

export async function setSettings(partial) {
  const next = {};
  if ("apiKey" in partial) {
    next.apiKey = String(partial.apiKey ?? "").trim();
  }
  if ("modelLimit" in partial) {
    next.modelLimit = normalizeModelLimit(partial.modelLimit);
  }
  await browser.storage.local.set(next);
  return getSettings();
}
