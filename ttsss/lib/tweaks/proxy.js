app.proxymode = {
  "options": {
    "scheme": "socks5",
    "host": config.settings.host,
    "port": config.settings.port,
    "whitelist": function () {
      let tmp = [];
      for (let i = 0; i < app.whitelist.domains.length; i++) {
        if (app.whitelist.domains[i]) {
          tmp.push('*' + app.whitelist.domains[i]);
        }
      }
      /*  */
      return tmp;
    }
  },
  "update": function () {
    const active = config.options.proxy && config.addon.state === "ON";
    if (active) {
      app.proxy.set({
        "scope": "regular",
        "value":  {
          "mode": "fixed_servers",
          "rules": {
            "bypassList": app.proxymode.options.whitelist(),
            "singleProxy": {"scheme": app.proxymode.options.scheme, "host": app.proxymode.options.host, "port": app.proxymode.options.port}
          }
        }
      });
    } else {
      app.proxy.clear({"scope": "regular"});
    }
  }
};
