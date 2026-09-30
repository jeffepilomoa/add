app.tracking = {
  "text": '',
  "item": '',
  "array": [],
  "response": null,
  "urls": [
    chrome.runtime.getURL("lib/tweaks/resources/abuse.txt"),
    chrome.runtime.getURL("lib/tweaks/resources/basic.txt"),
    chrome.runtime.getURL("lib/tweaks/resources/tracking.txt"),
    chrome.runtime.getURL("lib/tweaks/resources/redirect.txt")
  ],
  "update": async function (badge) {
    const active = config.options.tracking && config.addon.state === "ON";
    if (active) {
      await app.netrequest.display.badge.text(badge);
      /*  */
      app.tracking.array = [];
      /*  */
      for (let i = 0; i < app.tracking.urls.length; i++) {
        app.tracking.response = await fetch(app.tracking.urls[i]);
        app.tracking.text = await app.tracking.response.text();
        app.tracking.item = app.tracking.text.split(/\r?\n/).map(e => e.trim()).filter(e => e && !e.includes('#'));
        app.tracking.array = app.tracking.array.concat(app.tracking.item);
        app.tracking.array = app.tracking.array.filter(e => /^[a-z0-9.-]+\.[a-z]{2,}$/i.test(e) && !e.includes("..") && !e.startsWith("xn--") && !e.startsWith("www.xn--"));
      }
      /*  */
      app.netrequest.rules.push({
        "id": 4000,
        "action": {"type": "block"},
        "condition": {
          "requestDomains": app.tracking.array,
          "excludedInitiatorDomains": app.whitelist.domains
        }
      });
      /*  */
      delete app.tracking.text;
      delete app.tracking.item;
      delete app.tracking.array;
      delete app.tracking.response;
    }
    /*  */
    await app.netrequest.rules.update();
  }
};
