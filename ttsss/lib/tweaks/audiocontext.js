app.audiocontext = {
  "update": function (e) {
    const active = config.options.audiocontext && config.addon.state === "ON";
    /*  */
    app.page.send("audiocontext", {
      "active": active,
      "target": "audiocontext"
    }, e ? e.tabId : null, e ? e.frameId : null);
  }
};
