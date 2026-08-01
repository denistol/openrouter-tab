import { API_BASE_URL, MISSING_API_KEY_ERROR } from "./constants.js";
import { getSettings } from "./settings.js";

export async function openRouter(path, options = {}) {
  const { apiKey } = await getSettings();
  if (!apiKey) {
    throw new Error(MISSING_API_KEY_ERROR);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      ...(options.headers || {})
    }
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`OpenRouter returned ${response.status}${body ? `: ${body}` : ""}`);
  }

  return response.json();
}
