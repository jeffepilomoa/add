config.timezone = function () {
  return {
    "name": config.settings.name,
    "value": config.settings.value
  }
};

app.timezone = {
  "update": function (e) {
    const active = config.options.timezone && config.addon.state === "ON";
    /*  */
    app.page.send("timezone", {
      "active": active,
      "target": "timezone",
      "options": config.timezone()
    }, e ? e.tabId : null, e ? e.frameId : null);
  }
};