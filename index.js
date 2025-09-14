const MODULE_NAME = 'my_ui_extension';

(async function () {
  const { getContext } = SillyTavern;
  const ctx = getContext();

  // default settings
  const defaultSettings = {
    enabled: true,
    greeting: "Hello, SillyTavern!"
  };

  function getSettings() {
    if (!ctx.extensionSettings[MODULE_NAME]) {
      ctx.extensionSettings[MODULE_NAME] = structuredClone(defaultSettings);
    }
    const s = ctx.extensionSettings[MODULE_NAME];
    for (const k in defaultSettings) {
      if (!(k in s)) s[k] = defaultSettings[k];
    }
    return s;
  }

  function saveSettings() {
    ctx.saveSettingsDebounced();
  }

  function createUI() {
    const settings = getSettings();

    const extContainer = document.createElement('div');
    extContainer.classList.add('my-ui-ext-container');

    extContainer.innerHTML = `
      <label>
        <input type="checkbox" id="myext_enabled" ${settings.enabled ? 'checked' : ''}>
        Enable Extension
      </label>
      <br>
      <label>
        Greeting:
        <input type="text" id="myext_greeting" value="${settings.greeting}">
      </label>
      <br><br>
      <button class="menu_button" id="myext_save">Save</button>
    `;

    extContainer.querySelector('#myext_save').addEventListener('click', () => {
      settings.enabled = extContainer.querySelector('#myext_enabled').checked;
      settings.greeting = extContainer.querySelector('#myext_greeting').value;
      saveSettings();
      toastr.success('Settings saved!');
    });

    // Insert UI under the Extensions tab
    const target = document.querySelector('#extensions_settings');
    if (target) {
      const wrapper = document.createElement('details');
      wrapper.classList.add('my-ui-ext-wrapper');
      const summary = document.createElement('summary');
      summary.textContent = 'My UI Extension';
      wrapper.append(summary, extContainer);
      target.appendChild(wrapper);
    }
  }

  ctx.eventSource.on(ctx.event_types.APP_READY, () => {
    const settings = getSettings();
    if (settings.enabled) {
      const banner = document.createElement('div');
      banner.innerText = settings.greeting;
      banner.style.background = '#eee';
      banner.style.padding = '10px';
      banner.style.textAlign = 'center';
      document.body.prepend(banner);
    }
  });

  ctx.eventSource.on(ctx.event_types.EXTENSIONS_LOADED, () => {
    createUI();
  });
})();
