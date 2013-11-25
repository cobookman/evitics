var bluetoothSerial = cordova.require('bluetoothSerial');
var ble = (function() {

  var genPeripheralList = function() {};
  return {
    deviceready: function() {
        bluetoothSerial.subscribe("\n", ble.onmessage, ble.error("Subscribe Failed"));
    },
    list: function(event) {
        bluetoothSerial.list(ble.ondevicelist, ble.error("List Failed"));
    },
    connect: function(uuid) {
        bluetoothSerial.connect(uuid, ble.onconnect, ble.ondisconnect);
    },
    disconnect: function(event) {
        if (event) {
             event.preventDefault();
        }
        
        ble.error("Disconnecting...");
        bluetoothSerial.disconnect(ble.ondisconnect);
    },
    sendData: function(text) {
        bluetoothSerial.write(text, function() {
            $("#content").html("Sent: " + text);
        });
    },
    peripherals : [],
    ondevicelist: function(devices) {
      for(var i = 0; i < devices.length; ++i) {
        if(devices[i].hasOwnProperty('uuid')) {
          ble.peripherals[devices[i].uuid] = devices[i];
        }
      }
      if(devices.length > 0) {
        ble.outputPeripherals(ble.peripherals);
      }
    },
    outputPeripherals : function(peripherals) {
      /* !IMPORTANT - Must Overload Function */
    },
    onconnect: function() {

    },
    ondisconnect: function(reason) {
        alert(JSON.stringify(reason));
    },
    onmessage: function(message) {
        $("#content").html(message);
        alert("onmessage: " + message);
    },
    error: function(message) {
        /* Error Handling Here */
    }
  };
})();

document.addEventListener('deviceready', ble.deviceready, false);