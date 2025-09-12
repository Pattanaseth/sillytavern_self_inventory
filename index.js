// Entry point
const MODULE_NAME = 'my_ui_extension';

(async function() {
  const { getContext } = SillyTavern;
  const ctx = getContext();

  // Ensure settings object
  const defaultSettings = {
    enabled: true,
    greeting: "Hello, SillyTavern!"
  };

  function getSettings() {
    if (!ctx.extensionSettings[MODULE_NAME]) {
      ctx.extensionSettings[MODULE_NAME] = structuredClone(defaultSettings);
    }
    const s = ctx.extensionSettings[MODULE_NAME];
    // add missing defaults
    for (const key of Object.keys(defaultSettings)) {
      if (!(key in s)) s[key] = defaultSettings[key];
    }
    return s;
  }

  function saveSettings() {
    ctx.saveSettingsDebounced();
  }

  // Listen for app‐ready, so UI elements are present
  ctx.eventSource.on(ctx.event_types.APP_READY, () => {
    const settings = getSettings();
    if (settings.enabled) {
      // Example: add a greeting banner at top
      const banner = document.createElement('div');
      banner.innerText = settings.greeting;
      banner.style.background = '#eee';
      banner.style.padding = '10px';
      banner.style.textAlign = 'center';
      document.body.prepend(banner);
    }
  });

})();
