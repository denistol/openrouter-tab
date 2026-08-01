import { handleMessage } from "./lib/browser.js";
import { MESSAGE_TYPES } from "./lib/constants.js";
import { loadDashboard } from "./lib/dashboard.js";

handleMessage({
  [MESSAGE_TYPES.LOAD_DASHBOARD]: () => loadDashboard()
});
