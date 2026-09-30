var background = {
  "port": null,
  "message": {},
  "receive": function (id, callback) {
    if (id) {
      background.message[id] = callback;
    }
  },
  "send": function (id, data) {
    if (id) {
      chrome.runtime.sendMessage({
        "method": id,
        "data": data,
        "path": "popup-to-background"
      }, function () {
        return chrome.runtime.lastError;
      });
    }
  },
  "connect": function (port) {
    chrome.runtime.onMessage.addListener(background.listener); 
    /*  */
    if (port) {
      background.port = port;
      background.port.onMessage.addListener(background.listener);
      background.port.onDisconnect.addListener(function () {
        background.port = null;
      });
    }
  },
  "post": function (id, data) {
    if (id) {
      if (background.port) {
        background.port.postMessage({
          "method": id,
          "data": data,
          "path": "popup-to-background",
          "port": background.port.name
        });
      }
    }
  },
  "listener": function (e) {
    if (e) {
      for (let id in background.message) {
        if (background.message[id]) {
          if ((typeof background.message[id]) === "function") {
            if (e.path === "background-to-popup") {
              if (e.method === id) {
                background.message[id](e.data);
              }
            }
          }
        }
      }
    }
  }
};

var config = {
  "update": {
    "buttons": function (id) {
      if (id) {
        const target = document.getElementById(id);
        if (target) {
          target.removeAttribute("class");
        }
      }
    },
    "input": function (id, disabled) {
      if (id) {
        const target = document.querySelector("tr[for='" + id + "']");
        if (target) {
          const inputs = target.querySelectorAll("input");
          for (let i = 0; i < inputs.length; i++) {
            inputs[i].disabled = disabled;
          }
          /*  */
          const textareas = target.querySelectorAll("textarea");
          for (var i = 0; i < textareas.length; i++) {
            textareas[i].disabled = disabled;
          }
        }
      }
    }
  },
  "load": function () {
    const add = document.getElementById("add");
    const state = document.getElementById("state");
    const theme = document.getElementById("theme");
    const reload = document.getElementById("reload");
    const support = document.getElementById("support");
    const explore = document.getElementById("explore");
    const donation = document.getElementById("donation");
    /*  */
    add.addEventListener("click", function () {background.send("add")});
    state.addEventListener("click", function () {background.send("state")});
    reload.addEventListener("click", function () {background.send("reload")});
    support.addEventListener("click", function () {background.send("support")});
    donation.addEventListener("click", function () {background.send("donation")});
    /*  */
    theme.addEventListener("click", function () {
      let attribute = document.documentElement.getAttribute("theme");
      attribute = attribute === "dark" ? "light" : "dark";
      /*  */
      document.documentElement.setAttribute("theme", attribute);
      background.send("theme", attribute);
    }, false);
    /*  */
    config.listeners.add();
    background.send("load");
    window.removeEventListener("load", config.load, false);
    if (navigator.userAgent.indexOf("Edg") !== -1) explore.style.display = "none";
  },
  "render": function (e) {
    const state = document.getElementById("state");
    const textarea = document.getElementById("whitelist");
    /*  */
    state.setAttribute("state", e.state);
    textarea.value = e.settings["whitelist"];
    document.documentElement.setAttribute("theme", e.theme !== undefined ? e.theme : "light");
    /*  */
    for (let id in e.settings) {
      const input = document.getElementById(id);
      if (input) {
        input.value = e.settings[id];
        input.disabled = e.state === "OFF";
      }
    }
    /*  */
    for (let id in e.options) {
      const input = document.getElementById(id);
      if (input) {
        input.checked = e.options[id];
        input.disabled = e.state === "OFF";
      }
      /*  */
      if (e.state === "ON") {
        config.update.input(id, !e.options[id]);
      }
    }
  },
  "listeners": {
    "add": function () {
      const footer = document.querySelector(".footer");
      const textarea = document.querySelectorAll("textarea");
      const input = document.querySelectorAll("input[type='text']");
      const button = document.querySelectorAll("button[type='action']");
      const checkbox = document.querySelectorAll("input[type='checkbox']");
      /*  */
      footer.addEventListener("toggle", function (e) {
        window.scrollTo({
          "left": 0,
          "behavior": "smooth",
          "top": e.target.open ? 300 : 0
        });
      });
      /*  */
      for (let i = 0; i < button.length; i++) {
        button[i].addEventListener("click", function (e) {
          e.target.setAttribute("class", "loader");
          background.send("button", {
            "id": e.target.id
          });
        });
      }
      /*  */
      for (let i = 0; i < textarea.length; i++) {
        textarea[i].addEventListener("change", function (e) {
          background.send("settings", {
            "id": e.target.id, 
            "value": e.target.value
          });
        });
      }
      /*  */
      for (let i = 0; i < checkbox.length; i++) {
        checkbox[i].addEventListener("change", function (e) {
          config.update.input(e.target.id, !e.target.checked);
          background.send("options", {
            "id": e.target.id, 
            "value": e.target.checked
          });
        });
      }
      /*  */
      for (let i = 0; i < input.length; i++) {
        input[i].addEventListener("change", function (e) {
          const flag = Number(e.target.value) + '' === e.target.value;
          const value = flag ? Number(e.target.value) : e.target.value;
          background.send("settings", {
            "value": value,
            "id": e.target.id
          });
        });
      }
    }
  }
};

background.receive("storage", config.render);
background.connect(chrome.runtime.connect({"name": "popup"}));
background.receive("clear", function (e) {config.update.buttons(e.id)});

window.addEventListener("load", config.load, false);
