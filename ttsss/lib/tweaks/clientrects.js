app.clientrects = {
  "update": function (e) {
    const active = config.options.clientrects && config.addon.state === "ON";
    /*  */
    app.page.send("clientrects", {
      "active": active,
      "target": "clientrects"
    }, e ? e.tabId : null, e ? e.frameId : null);
  }
};