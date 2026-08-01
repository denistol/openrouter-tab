/** OpenRouter API */
export const API_BASE_URL = "https://openrouter.ai/api/v1";
export const API_PATHS = {
  key: "/key",
  credits: "/credits",
  activity: "/activity"
};

/** How many activity rows to fetch per displayed model slot */
export const ACTIVITY_LIMIT_MULTIPLIER = 30;

/** Runtime message types (popup ↔ background) */
export const MESSAGE_TYPES = {
  LOAD_DASHBOARD: "load-dashboard"
};

/** Stored settings */
export const MODEL_LIMITS = [5, 10, 30, 100];
export const DEFAULT_SETTINGS = {
  apiKey: "",
  modelLimit: 10
};

/** UI */
export const SETTINGS_SAVE_DELAY_MS = 450;
export const BAR_MIN_PERCENT = 3;
export const BAR_FALLBACK_MAX = 0.01;
export const MONEY_FRACTION_DIGITS = 2;
export const TIME_LOCALE = "en-US";
export const EMPTY_MODEL_LABEL = "No model activity";
export const UNKNOWN_MODEL_LABEL = "Unknown model";
export const PLACEHOLDER_BALANCE = "—";
export const REFRESH_IDLE_LABEL = "↻";
export const REFRESH_BUSY_LABEL = "…";
export const SETTINGS_SAVED_LABEL = "Settings saved.";
export const MISSING_API_KEY_ERROR = "Add your OpenRouter API management key in Settings.";
