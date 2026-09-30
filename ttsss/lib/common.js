var core = {
  "start": function () {
    core.load();
  },
  "install": function () {
    core.load();
  },
  "load": function () {
    core.update.storage(false);
  },
  "action": {
    "theme": function (e) {
      config.addon.theme = e;
    },
    "storage": function () {
      core.update.storage(true);
    },
    "active": function () {
      app.whitelist.update();
    },
    "state": function () {
      config.addon.state = config.addon.state === "ON" ? "OFF" : "ON";
      core.update.popup();
      /*  */
      app.notifications.create({
        "title": "Privacy Tweaks",
        "message": "Privacy Tweaks is " + config.addon.state
      });
    },
    "add": function () {
      app.tab.query.active(function (tab) {
        if (tab) {
          if (tab.url) {
            if (tab.url.indexOf("http") === 0 || tab.url.indexOf("ftp") === 0) {
              const hostname = config.hostname(tab.url);
              if (hostname) {
                var valid = app.whitelist.listset.has(hostname) ? false : true;
                if (valid) {
                  app.whitelist.domains.push(hostname);
                  config.settings.whitelist = app.whitelist.domains.join(', ');
                  core.update.popup();
                }
              }
            }
          }
        }
      });
    }
  },
  "update": {
    "action": false,
    "popup": function () {
      app.popup.send("storage", {
        "options": config.options,
        "settings": config.settings,
        "state": config.addon.state,
        "theme": config.addon.theme
      });
    },
    "storage": function (whitelist) {
      app.button.icon(null, config.addon.state);
      /*  */
      if (whitelist) {
        app.whitelist.update();
      }
    },
    "tweaks": async function () {
      if (core.update.action === false) {
        core.update.action = true;
        /*  */
        await app.netrequest.rules.remove.by.action.type("allow");
        await app.netrequest.rules.remove.by.action.type("block");
        /*  */
        await app.webrtc.update(null);
        await app.tracking.update(true);
        await app.proxymode.update(null);
        /* */
        await app.ads.update(true);
        /*  */
        core.update.action = false;
      }
    },
    "page": function (e) {
      if (config.force) {
        app.font.update(e);
        app.webgl.update(e);
        app.webgpu.update(e);
        app.webrtc.update(e);
        app.canvas.update(e);
        app.timezone.update(e);
        app.clientrects.update(e);
        app.geolocation.update(e);
        app.audiocontext.update(e);
      } else {
        if (e.top) {
          const hostname = config.hostname(e.top);
          if (hostname) {
            const valid = app.whitelist.listset.has(hostname) ? false : true;
            if (valid) {
              app.font.update(e);
              app.webgl.update(e);
              app.webgpu.update(e);
              app.webrtc.update(e);
              app.canvas.update(e);
              app.timezone.update(e);
              app.clientrects.update(e);
              app.geolocation.update(e);
              app.audiocontext.update(e);
            }
          }
        }
      }
    }
  }
};

app.storage.load(core.action.active);
app.page.receive("load", core.update.page);

app.popup.receive("add", core.action.add);
app.popup.receive("reload", app.tab.reload);
app.popup.receive("load", core.update.popup);
app.popup.receive("state", core.action.state);
app.popup.receive("theme", core.action.theme);
app.popup.receive("button", function (e) {app[e.id].update()});
app.popup.receive("support", function () {app.tab.open(app.homepage())});
app.popup.receive("options", function (e) {config.options[e.id] = e.value});
app.popup.receive("settings", function (e) {config.settings[e.id] = e.value});
app.popup.receive("donation", function () {app.tab.open(app.homepage() + "?reason=support")});

app.on.startup(core.start);
app.on.installed(core.install);
app.on.storage(core.action.storage);
