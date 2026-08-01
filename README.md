# Open router tab

<p align="center">
  <img src="icons/icon-128.png" alt="Open router tab icon" width="128" height="128">
</p>

Browser extension for a quick view of your OpenRouter profile, balance, and model usage.

Works in **Chrome** and **Firefox** (128+) from a single Manifest V3 package.

## Install

### Chrome / Chromium / Edge

1. Open `chrome://extensions` (or `edge://extensions`).
2. Enable **Developer mode**.
3. Click **Load unpacked**.
4. Select this project folder (the one that contains `manifest.json`).

### Firefox

1. Open `about:debugging#/runtime/this-firefox`.
2. Click **Load Temporary Add-on…**.
3. Choose `manifest.json` in this project folder.

> Temporary add-ons in Firefox are removed when the browser restarts. For a persistent install, package and sign via [addons.mozilla.org](https://addons.mozilla.org/) or use `web-ext`.

## Setup

1. Open the extension popup or the options page.
2. Paste your OpenRouter **API management key** (`sk-or-v1-...`).
3. Save — the key stays in the extension’s local storage only.

Create a key at [openrouter.ai/keys](https://openrouter.ai/keys).

## Project layout

```
lib/
  constants.js    # shared constants
  browser.js      # shared browser API + async messaging
  settings.js     # storage defaults and helpers
  format.js       # money / model name formatting
  openrouter.js   # OpenRouter HTTP client
  dashboard.js    # balance + usage aggregation
background.js     # message router
popup.js          # popup UI
options/settings.js
manifest.json     # single MV3 manifest (Chrome + Firefox)
icons/            # PNG icons (16/32/48/128/512)
```

## Permissions

- `storage` — save API key and model list limit
- `https://openrouter.ai/api/*` — fetch key info, credits, and activity
