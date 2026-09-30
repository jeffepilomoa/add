{
  const config = {
    "noise": {
      "color": 0.01,
      "percent": 0.1,
      "buffer": 0.0001
    }
  };
  //
  try {
    const _GPUAdapter = Object.getOwnPropertyDescriptor(GPUAdapter.prototype, "limits").get;
    Object.defineProperty(GPUAdapter.prototype, "_limits", {"configurable": true, get() {return _GPUAdapter.call(this)}});
    //
    Object.defineProperty(GPUAdapter.prototype, "limits", {
      "get": new Proxy(_GPUAdapter, {
        apply(target, self, args) {
          const result = Reflect.apply(target, self, args);
          //
          const _maxBufferSize = self._limits.maxBufferSize;
          const _maxUniformBufferBindingSize = self._limits.maxUniformBufferBindingSize;
          const _maxStorageBufferBindingSize = self._limits.maxStorageBufferBindingSize;
          const _maxComputeWorkgroupStorageSize = self._limits.maxComputeWorkgroupStorageSize;
          //
          Object.defineProperty(result.__proto__, "maxBufferSize", {"configurable": true, get() {return _maxBufferSize + (Math.random() < 0.5 ? -1 : -2)}});
          Object.defineProperty(result.__proto__, "maxUniformBufferBindingSize", {"configurable": true, get() {return _maxUniformBufferBindingSize + (Math.random() < 0.5 ? -1 : -2)}});
          Object.defineProperty(result.__proto__, "maxStorageBufferBindingSize", {"configurable": true, get() {return _maxStorageBufferBindingSize + (Math.random() < 0.5 ? -1 : -2)}});
          Object.defineProperty(result.__proto__, "maxComputeWorkgroupStorageSize", {"configurable": true, get() {return _maxComputeWorkgroupStorageSize + (Math.random() < 0.5 ? -1 : -2)}});
          //
          return result;
        }
      })
    });
  } catch (e) {
    //console.error(e);
  }
  //
  try {
    const _GPUDevice = Object.getOwnPropertyDescriptor(GPUDevice.prototype, "limits").get;
    Object.defineProperty(GPUDevice.prototype, "_limits", {"configurable": true, get() {return _GPUDevice.call(this)}});
    //
    Object.defineProperty(GPUDevice.prototype, "limits", {
      "get": new Proxy(_GPUDevice, {
        apply(target, self, args) {
          const result = Reflect.apply(target, self, args);
          //
          const _maxBufferSize = self._limits.maxBufferSize;
          const _maxUniformBufferBindingSize = self._limits.maxUniformBufferBindingSize;
          const _maxStorageBufferBindingSize = self._limits.maxStorageBufferBindingSize;
          const _maxComputeWorkgroupStorageSize = self._limits.maxComputeWorkgroupStorageSize;
          //
          Object.defineProperty(result.__proto__, "maxBufferSize", {"configurable": true, get() {return _maxBufferSize + (Math.random() < 0.5 ? -1 : -2)}});
          Object.defineProperty(result.__proto__, "maxUniformBufferBindingSize", {"configurable": true, get() {return _maxUniformBufferBindingSize + (Math.random() < 0.5 ? -1 : -2)}});
          Object.defineProperty(result.__proto__, "maxStorageBufferBindingSize", {"configurable": true, get() {return _maxStorageBufferBindingSize + (Math.random() < 0.5 ? -1 : -2)}});
          Object.defineProperty(result.__proto__, "maxComputeWorkgroupStorageSize", {"configurable": true, get() {return _maxComputeWorkgroupStorageSize + (Math.random() < 0.5 ? -1 : -2)}});
          //
          return result;
        }
      })
    });
  } catch (e) {
    //console.error(e);
  }
  //
  try {
    if (GPUCommandEncoder) {
      GPUCommandEncoder.prototype.beginRenderPass = new Proxy(GPUCommandEncoder.prototype.beginRenderPass, {
        apply(target, self, args) {
          if (args) {
            if (args[0]) {
              if (args[0].colorAttachments) {
                if (args[0].colorAttachments[0]) {
                  if (args[0].colorAttachments[0].clearValue) {
                    try {
                      const metrics = args[0].colorAttachments[0].clearValue;
                      for (let key in metrics) {
                        let value = metrics[key];
                        value = value + (Math.random() < 0.5 ? -1 : -2) * config.noise.color * value;
                        value = (value < 0 ? -1 : +1) * value;
                        metrics[key] = value;
                      }
                      //
                      args[0].colorAttachments[0].clearValue = metrics;
                    } catch (e) {
                      //console.error(e);
                    }
                  }
                }
              }
            }
          }
          //
          return Reflect.apply(target, self, args);
        }
      });
    }
  } catch (e) {
    //console.error(e);
  }
  //
  try {
    if (GPUQueue) {
      GPUQueue.prototype.writeBuffer = new Proxy(GPUQueue.prototype.writeBuffer, {
        apply(target, self, args) {
          if (args) {
            if (args[2]) {
              const flag = (args[2] instanceof ArrayBuffer) || (args[2] instanceof Float32Array);
              if (flag) {
                try {
                  const metrics = args[2];
                  const array = Array(metrics.length).fill(0).map((n, i) => n + i);
                  const count = Math.ceil(metrics.length * config.noise.percent);
                  const shuffled = array.sort(() => 0.5 - Math.random());
                  const selected = [...shuffled.slice(0, count)];
                  //
                  for (let i = 0; i < selected.length; i++) {
                    const index = selected[i];
                    let value = metrics[index];
                    metrics[index] = value + (Math.random() < 0.5 ? -config.noise.buffer * value : +config.noise.buffer * value);
                  }
                  //
                  args[2] = metrics;
                } catch (e) {
                  //console.error(e);
                }
              }
            }
          }
          //
          return Reflect.apply(target, self, args);
        }
      });
    }
  } catch (e) {
    //console.error(e);
  }
}
