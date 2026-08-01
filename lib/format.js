import { MONEY_FRACTION_DIGITS, UNKNOWN_MODEL_LABEL } from "./constants.js";

export function formatMoney(value) {
  return `$${Number(value || 0).toFixed(MONEY_FRACTION_DIGITS)}`;
}

export function displayModelName(model) {
  if (typeof model !== "string" || !model.trim()) return UNKNOWN_MODEL_LABEL;
  return model.split("/").pop().replaceAll("-", " ");
}
