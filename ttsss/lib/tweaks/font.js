app.font = {
  "update": function (e) {
    const active = config.options.font && config.addon.state === "ON";
    /*  */
    app.page.send("font", {
      "active": active,
      "target": "font"
    }, e ? e.tabId : null, e ? e.frameId : null);
  }
};