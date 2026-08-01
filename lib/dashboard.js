import { ACTIVITY_LIMIT_MULTIPLIER, API_PATHS } from "./constants.js";
import { openRouter } from "./openrouter.js";
import { getSettings } from "./settings.js";

export function aggregateModelUsage(records, modelLimit) {
  const totals = new Map();

  for (const record of Array.isArray(records) ? records : []) {
    const model = typeof record.model === "string" ? record.model.trim() : "";
    const value = Number(record.usage);
    if (!model || !Number.isFinite(value) || value < 0) continue;
    totals.set(model, (totals.get(model) || 0) + value);
  }

  return [...totals.entries()]
    .sort(([, first], [, second]) => second - first)
    .slice(0, modelLimit)
    .map(([model, value]) => ({ model, value }));
}

export async function loadDashboard() {
  const { modelLimit } = await getSettings();
  const [keyInfo, credits, activity] = await Promise.all([
    openRouter(API_PATHS.key),
    openRouter(API_PATHS.credits),
    openRouter(`${API_PATHS.activity}?limit=${modelLimit * ACTIVITY_LIMIT_MULTIPLIER}`)
  ]);

  const usage = Number(keyInfo.data?.usage || 0);
  const limit = Number(keyInfo.data?.limit || 0);
  const totalCredits = Number(credits.data?.total_credits || 0);
  const totalUsage = Number(credits.data?.total_usage || usage);
  const models = aggregateModelUsage(activity?.data, modelLimit);

  return {
    balance: Math.max(0, totalCredits - totalUsage),
    totalUsage,
    limit,
    models
  };
}
