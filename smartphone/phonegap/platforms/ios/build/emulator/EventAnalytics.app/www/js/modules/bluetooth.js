var ble = (function() {
  var _bluetoothSerial = cordova.require('bluetoothSerial');
  return {
    peripherals : [],
    subscribe: function(callback) {
        _bluetoothSerial.subscribe("\n", callback, this.error("Subscribe Failed"));
    },
    list: function(callback) {
        _bluetoothSerial.list(ondevicelist, this.error("Could not get device list"));
        var that = this;
        function ondevicelist(devices) {
          for(var i = 0; i < devices.length; ++i) {
            if(devices[i].hasOwnProperty('uuid')) {
              that.peripherals[devices[i].uuid] = devices[i];
            }
          }
          
          if(devices.length > 0) {
            callback(that.peripherals);
          }
        }
    },
    connect: function(params) {
      _bluetoothSerial.connect(params.uuid, params.onConnect, params.onFailure);
    },
    sendData: function(text) {
        _bluetoothSerial.write(text, function() {
            $("#content").html("Sent: " + text);
        });
    },
    error: function(message) {
      //alert(message);
        /* Error Handling Here */
    }
  };
})();
