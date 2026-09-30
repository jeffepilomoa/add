app.canvas = {
  "update": function (e) {
    const active = config.options.canvas && config.addon.state === "ON";
    /*  */
    app.page.send("canvas", {
      "active": active,
      "target": "canvas"
    }, e ? e.tabId : null, e ? e.frameId : null);
  }
};