app.whitelist = {
  "domains": [],
  "listset": new Set([]),
  "update": function () {    
    app.whitelist.domains = config.settings.whitelist ? config.settings.whitelist.split(',').map(function (e) {return e.trim()}) : [];
    app.whitelist.listset = new Set(app.whitelist.domains);
    /*  */
    core.update.tweaks();
  }
};