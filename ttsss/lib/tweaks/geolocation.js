config.geolocation = function () {
  return {
    "timestamp": (new Date()).getTime(),
    "coords": {
      "speed": null,
      "heading": null,
      "altitude": null,
      "accuracy": 1768,
      "altitudeAccuracy": null,
      "latitude": config.settings.latitude,
      "longitude": config.settings.longitude
    }
  }
};

app.geolocation = {
  "update": function (e) {
    const active = config.options.geolocation && config.addon.state === "ON";
    /*  */
    app.page.send("geolocation", {
      "active": active,
      "target": "geolocation",
      "options": config.geolocation()
    }, e ? e.tabId : null, e ? e.frameId : null);
  }
};