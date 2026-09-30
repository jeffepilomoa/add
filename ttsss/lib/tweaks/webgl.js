app.webgl = {
  "update": function (e) {
    const active = config.options.webgl && config.addon.state === "ON";
    /*  */
    app.page.send("webgl", {
      "active": active,
      "target": "webgl"
    }, e ? e.tabId : null, e ? e.frameId : null);
  }
};