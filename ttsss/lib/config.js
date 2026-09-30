var config = {};

config.log = false;
config.force = false;

config.welcome = {
  set lastupdate (val) {app.storage.write("lastupdate", val)},
  get lastupdate () {return app.storage.read("lastupdate") !== undefined ? app.storage.read("lastupdate") : 0}
};

config.addon = {
  set state (val) {app.storage.write("state", val)},
  set theme (val) {app.storage.write("theme", val)},
  get state () {return app.storage.read("state") !== undefined ? app.storage.read("state") : "ON"},
  get theme () {return app.storage.read("theme") !== undefined ? app.storage.read("theme") : "light"},
  "status": function () {
    let active = false;
    for (let id in config.options) active = config.options[id] || active;
    /*  */
    return active && config.addon.state === "ON";
  }
};

config.hostname = function (url) {
  let s = url.indexOf('//') + 2;
  if (s > 1) {
    let o = url.indexOf('/', s);
    if (o > 0) return url.substring(s, o);
    else {
      o = url.indexOf('?', s);
      return o > 0 ? url.substring(s, o) : url.substring(s);
    }
  } else {
    return url;
  }
};

config.settings = {
  set host (val) {app.storage.write("privacy-tweaks-host", val)},
  set port (val) {app.storage.write("privacy-tweaks-port", val)},
  set name (val) {app.storage.write("privacy-tweaks-name", val)},
  set value (val) {app.storage.write("privacy-tweaks-value", val)},
  set latitude (val) {app.storage.write("privacy-tweaks-latitude", val)},
  set whitelist (val) {app.storage.write("privacy-tweaks-whitelist", val)},
  set longitude (val) {app.storage.write("privacy-tweaks-longitude", val)},
  //
  get value () {return app.storage.read("privacy-tweaks-value") !== undefined ? app.storage.read("privacy-tweaks-value") : 0},
  get port () {return app.storage.read("privacy-tweaks-port") !== undefined ? app.storage.read("privacy-tweaks-port") : 9050},
  get host () {return app.storage.read("privacy-tweaks-host") !== undefined ? app.storage.read("privacy-tweaks-host") : "127.0.0.1"},
  get name () {return app.storage.read("privacy-tweaks-name") !== undefined ? app.storage.read("privacy-tweaks-name") : "Etc/Greenwich"},
  get whitelist () {return app.storage.read("privacy-tweaks-whitelist") !== undefined ? app.storage.read("privacy-tweaks-whitelist") : ''},
  get latitude () {return app.storage.read("privacy-tweaks-latitude") !== undefined ? app.storage.read("privacy-tweaks-latitude") : 51.482594},
  get longitude () {return app.storage.read("privacy-tweaks-longitude") !== undefined ? app.storage.read("privacy-tweaks-longitude") : -0.007661}
};

config.options = {
  set ads (val) {app.storage.write("privacy-tweaks-ads", val)},
  set font (val) {app.storage.write("privacy-tweaks-font", val)},
  set webgl (val) {app.storage.write("privacy-tweaks-webgl", val)},
  set proxy (val) {app.storage.write("privacy-tweaks-proxy", val)},
  set webgpu (val) {app.storage.write("privacy-tweaks-webgpu", val)},
  set webrtc (val) {app.storage.write("privacy-tweaks-webrtc", val)},
  set canvas (val) {app.storage.write("privacy-tweaks-canvas", val)},
  set tracking (val) {app.storage.write("privacy-tweaks-tracking", val)},
  set timezone (val) {app.storage.write("privacy-tweaks-timezone", val)},
  set clientrects (val) {app.storage.write("privacy-tweaks-clientrects", val)},
  set geolocation (val) {app.storage.write("privacy-tweaks-geolocation", val)},
  set audiocontext (val) {app.storage.write("privacy-tweaks-audiocontext", val)},
  //
  get ads () {return app.storage.read("privacy-tweaks-ads") !== undefined ? app.storage.read("privacy-tweaks-ads") : false},
  get font () {return app.storage.read("privacy-tweaks-font") !== undefined ? app.storage.read("privacy-tweaks-font") : false},
  get proxy () {return app.storage.read("privacy-tweaks-proxy") !== undefined ? app.storage.read("privacy-tweaks-proxy") : false},
  get webgl () {return app.storage.read("privacy-tweaks-webgl") !== undefined ? app.storage.read("privacy-tweaks-webgl") : false},
  get webrtc () {return app.storage.read("privacy-tweaks-webrtc") !== undefined ? app.storage.read("privacy-tweaks-webrtc") : true},
  get canvas () {return app.storage.read("privacy-tweaks-canvas") !== undefined ? app.storage.read("privacy-tweaks-canvas") : true},
  get webgpu () {return app.storage.read("privacy-tweaks-webgpu") !== undefined ? app.storage.read("privacy-tweaks-webgpu") : false},
  get timezone () {return app.storage.read("privacy-tweaks-timezone") !== undefined ? app.storage.read("privacy-tweaks-timezone") : true},
  get tracking () {return app.storage.read("privacy-tweaks-tracking") !== undefined ? app.storage.read("privacy-tweaks-tracking") : false},
  get geolocation () {return app.storage.read("privacy-tweaks-geolocation") !== undefined ? app.storage.read("privacy-tweaks-geolocation") : true},
  get clientrects () {return app.storage.read("privacy-tweaks-clientrects") !== undefined ? app.storage.read("privacy-tweaks-clientrects") : false},
  get audiocontext () {return app.storage.read("privacy-tweaks-audiocontext") !== undefined ? app.storage.read("privacy-tweaks-audiocontext") : false}
};
