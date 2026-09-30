{
  const config = {
    "noise": {
      "DOMRect": 0.00000001,
      "DOMRectReadOnly": 0.000001
    },
    "metrics": {
      "DOMRect": ['x', 'y', "width", "height"],
      "DOMRectReadOnly": ["top", "right", "bottom", "left"]
    },
    "method": {
      "DOMRect": function (e) {
        try {
          Object.defineProperty(DOMRect.prototype, e, {
            "get": new Proxy(Object.getOwnPropertyDescriptor(DOMRect.prototype, e).get, {
              apply(target, self, args) {
                const result = Reflect.apply(target, self, args);
                //
                const _result = result * (1 + (Math.random() < 0.5 ? -1 : +1) * config.noise.DOMRect);
                return _result;
              }
            })
          });
        } catch (e) {
          //console.error(e);
        }
      },
      "DOMRectReadOnly": function (e) {
        try {
          Object.defineProperty(DOMRectReadOnly.prototype, e, {
            "get": new Proxy(Object.getOwnPropertyDescriptor(DOMRectReadOnly.prototype, e).get, {
              apply(target, self, args) {
                const result = Reflect.apply(target, self, args);
                //
                const _result = result * (1 + (Math.random() < 0.5 ? -1 : +1) * config.noise.DOMRectReadOnly);
                return _result;
              }
            })
          });
        } catch (e) {
          //console.error(e);
        }
      }
    }
  };
  //
  config.method.DOMRect(config.metrics.DOMRect.sort(() => 0.5 - Math.random())[0]);
  config.method.DOMRectReadOnly(config.metrics.DOMRectReadOnly.sort(() => 0.5 - Math.random())[0]);
}
