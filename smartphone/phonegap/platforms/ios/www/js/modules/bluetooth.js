var bluetoothSerial = cordova.require('bluetoothSerial');
var ble = (function() {
  return {
    peripherals : [],
    deviceready: function() {
        bluetoothSerial.subscribe("\n", ble.onmessage, ble.error("Subscribe Failed"));
    },
    list: function(callback) {
        bluetoothSerial.list(ondevicelist, ble.error("Could not get device list"));

        function ondevicelist(devices) {
          for(var i = 0; i < devices.length; ++i) {
            if(devices[i].hasOwnProperty('uuid')) {
              ble.peripherals[devices[i].uuid] = devices[i];
            }
          }

          if(devices.length > 0) {
            callback(ble.peripherals);
          }
        }
    },
    connect: function(uuid) {
        bluetoothSerial.connect(uuid, ble.onconnect, ble.ondisconnect);
    },
    onconnect : function() {
      template.goto("incomingdata");
    },
    disconnect: function(event) {
        if (event) {
             event.preventDefault();
             alert(JSON.stringify(event));
             alert(event);
        }
        
        ble.error("Disconnecting...");
        bluetoothSerial.disconnect(ble.ondisconnect);
    },
    sendData: function(text) {
        bluetoothSerial.write(text, function() {
            $("#content").html("Sent: " + text);
        });
    },
    ondisconnect: function(reason) {
      alert("Disconnected, please select BLE Device");
      //template.goto("setup");
    },
    onmessage: function(message) {
      alert("onmessage: " + message);
      $("#content").html(message);
    },
    error: function(message) {
        /* Error Handling Here */
    }
  };
})();

document.addEventListener('deviceready', ble.deviceready, false);