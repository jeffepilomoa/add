app.ads = {
  "update": async function (badge) {
    let regexFilter = '';
    let resourceTypes = [];
    let initiatorDomains = [];
    /*  */
    const active = config.options.ads && config.addon.state === "ON";
    if (active) {
      await app.netrequest.display.badge.text(badge);
      /*  */
      initiatorDomains = app.whitelist.domains;
      /*  */
      for (let type in app.ads.filter.types) {
        if (app.ads.filter.types[type]) {
          resourceTypes.push(type);
        }
      }
      /*  */
      for (let i = 0; i < app.ads.filter.regexps.length; i++) {
        regexFilter = app.ads.filter.regexps[i];
        /*  */
        app.netrequest.rules.push({
          "action": {"type": "block"},
          "condition": {
            "regexFilter": regexFilter,
            "resourceTypes": resourceTypes,
            "isUrlFilterCaseSensitive": false
          }
        });
      }
      /*  */
      if (initiatorDomains.length) {
        app.netrequest.rules.push({
          "action": {"type": "allow"},
          "condition": {
            "resourceTypes": resourceTypes,
            "initiatorDomains": initiatorDomains
          }
        });
      }
    }
    /*  */
    await app.netrequest.rules.update();
  },
  "filter": {
    "types": {
      "ping": true,
      "font": false,
      "media": true,
      "image": true,
      "other": true,
      "object": true,
      "script": true,
      "sub_frame": true,
      "websocket": true,
      "csp_report": true,
      "stylesheet": false,
      "main_frame": false,
      "xmlhttprequest": true
    },
    "regexps": [
      // encoded ad markers
      "\\%22ad",
      "\\&adfmt\\=",
      // major ad / tracking domains
      "\\.zedo\\.",
      "\\.mgid\\.",
      "\\.atdmt\\.",
      "\\.adnxs\\.",
      "\\.openx\\.",
      "\\.teads\\.",
      "\\.lijit\\.",
      "\\.criteo\\.",
      "\\.adsrvr\\.",
      "\\.adform\\.",
      "\\.demdex\\.",
      "\\.bidr\\.io",
      "\\.taboola\\.",
      "\\.moatads\\.",
      "\\.innovid\\.",
      "\\.2mdn\\.net",
      "\\.media\\.net",
      "\\.fwmrm\\.net",
      "\\.outbrain\\.",
      "\\.pubmatic\\.",
      "\\.adsystem\\.",
      "\\.chartbeat\\.",
      "\\.quantserve\\.",
      "\\.serving-sys\\.",
      "\\.casalemedia\\.",
      "\\.doubleclick\\.",
      "\\.smartadserver\\.",
      "\\.rubiconproject\\.",
      "\\.amazon-adsystem\\.",
      "\\.googletagmanager\\.",
      "\\.googleadservices\\.",
      "\\.scorecardresearch\\.",
      "\\.googletagservices\\.",
      "\\.googlesyndication\\.",
      // social / mobile tracking
      "\\.branch\\.io",
      "\\.appsflyer\\.",
      "\\.adjust\\.com",
      "\\.pixel\\.facebook\\.",
      // RTB / bidding
      "[\\=\\&\\_\\-\\.\\/\\?\\s]prebid[\\=\\&\\_\\-\\.\\/\\?\\s]",
      // affiliate / marketing params
      "[\\=\\&\\_\\-\\.\\/\\?\\s]utm_[a-z]+\\=",
      "[\\=\\&\\_\\-\\.\\/\\?\\s]affiliate[\\=\\&\\_\\-\\.\\/\\?\\s]",
      // sponsored / promoted content
      "[\\=\\&\\_\\-\\.\\/\\?\\s]banner[\\=\\&\\_\\-\\.\\/\\?\\s]",
      "[\\=\\&\\_\\-\\.\\/\\?\\s]advert[s]?[\\=\\&\\_\\-\\.\\/\\?\\s]",
      "[\\=\\&\\_\\-\\.\\/\\?\\s]advertising[\\=\\&\\_\\-\\.\\/\\?\\s]",
      "[\\=\\&\\_\\-\\.\\/\\?\\s]promo(ted)?[\\=\\&\\_\\-\\.\\/\\?\\s]",
      "[\\=\\&\\_\\-\\.\\/\\?\\s]sponsor(ed)?[\\=\\&\\_\\-\\.\\/\\?\\s]",
      // tracking / telemetry
      "[\\=\\&\\_\\-\\.\\/\\?\\s]pixel[\\=\\&\\_\\-\\.\\/\\?\\s]",
      "[\\=\\&\\_\\-\\.\\/\\?\\s]beacon[\\=\\&\\_\\-\\.\\/\\?\\s]",
      "[\\=\\&\\_\\-\\.\\/\\?\\s]tracking[\\=\\&\\_\\-\\.\\/\\?\\s]",
      "[\\=\\&\\_\\-\\.\\/\\?\\s]analytics[\\=\\&\\_\\-\\.\\/\\?\\s]",
      // generic ad keywords
      "[\\=\\&\\_\\-\\.\\/\\?\\s]adid[\\=\\&\\_\\-\\.\\/\\?\\s]",
      "[\\=\\&\\_\\-\\.\\/\\?\\s]adsid[\\=\\&\\_\\-\\.\\/\\?\\s]",
      "[\\=\\&\\_\\-\\.\\/\\?\\s]ad[s]?[\\=\\&\\_\\-\\.\\/\\?\\s]",
      "[\\=\\&\\_\\-\\.\\/\\?\\s]adunit[\\=\\&\\_\\-\\.\\/\\?\\s]",
      "[\\=\\&\\_\\-\\.\\/\\?\\s]pagead[\\=\\&\\_\\-\\.\\/\\?\\s]",
      "[\\=\\&\\_\\-\\.\\/\\?\\s]pubads[\\=\\&\\_\\-\\.\\/\\?\\s]",
      "[\\=\\&\\_\\-\\.\\/\\?\\s]adhost[\\=\\&\\_\\-\\.\\/\\?\\s]",
      "[\\=\\&\\_\\-\\.\\/\\?\\s]adview[\\=\\&\\_\\-\\.\\/\\?\\s]",
      "[\\=\\&\\_\\-\\.\\/\\?\\s]adsales[\\=\\&\\_\\-\\.\\/\\?\\s]",
      "[\\=\\&\\_\\-\\.\\/\\?\\s]adsystem[\\=\\&\\_\\-\\.\\/\\?\\s]",
      "[\\=\\&\\_\\-\\.\\/\\?\\s]adserver[\\=\\&\\_\\-\\.\\/\\?\\s]",
      "[\\=\\&\\_\\-\\.\\/\\?\\s]adservice[\\=\\&\\_\\-\\.\\/\\?\\s]",
      "[\\=\\&\\_\\-\\.\\/\\?\\s]googleads[\\=\\&\\_\\-\\.\\/\\?\\s]"
    ]
  }
};
