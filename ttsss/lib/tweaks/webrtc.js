app.webrtc = {
  "update": function (e) {
    const options = {};
    const active = config.options.webrtc && config.addon.state === "ON";
    /*  */
    app.page.send("webrtc", {
      "active": active,
      "target": "webrtc"
    }, e ? e.tabId : null, e ? e.frameId : null);
    /*  */
    options.beta = {"value": active === false, "scope": 'regular'};
    options.alpha = active ? {"value": "disable_non_proxied_udp"} : {"value": 'default'};
    /*  */
    app.privacy.network.webrtc.set(options, function (e) {
      if (config.log) console.error(e);
    });
  }
};
