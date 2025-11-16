// db.js
// シンプルな localStorage ラッパー

const SETTINGS_KEY = "buddies_pwa_settings";

function loadSettings() {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to load settings:", e);
    return {};
  }
}

function saveSettings(settings) {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (e) {
    console.error("Failed to save settings:", e);
  }
}

function saveSetting(key, value) {
  const settings = loadSettings();
  settings[key] = value;
  saveSettings(settings);
}

function getSetting(key, defaultValue = null) {
  const settings = loadSettings();
  return settings[key] ?? defaultValue;
}
