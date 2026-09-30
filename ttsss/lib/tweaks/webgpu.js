app.webgpu = {
  "update": function (e) {
    const active = config.options.webgpu && config.addon.state === "ON";
    /*  */
    app.page.send("webgpu", {
      "active": active,
      "target": "webgpu"
    }, e ? e.tabId : null, e ? e.frameId : null);
  }
};