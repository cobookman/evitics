var bluetoothSerial = cordova.require('bluetoothSerial');
var ble = (function() {

  var genPeripheralList = function() {};
  return {
    deviceready: function() {
        // listen for messages
        bluetoothSerial.subscribe("\n", ble.onmessage, ble.error("Subscribe Failed"));
    },
    list: function(event) {
      bluetoothSerial.list(ble.ondevicelist, ble.error("List Failed"));
    },
    connect: function(uuid) {
        // var device = deviceList[deviceList.selectedIndex].value;
        // ble.disable(connectButton);
        // ble.setStatus("Connecting...");
        // console.log("Requesting connection to " + device);
        bluetoothSerial.connect(uuid, ble.onconnect, ble.ondisconnect);
        // bluetoothSerial.connect(device, ble.onconnect, ble.ondisconnect);
    },
    disconnect: function(event) {
        if (event) {
             event.preventDefault();
        }
        
        ble.error("Disconnecting...");
        bluetoothSerial.disconnect(ble.ondisconnect);
    },
    sendData: function(text) {
        // event.preventDefault();
            
        // var text = message.value + "\n";
        // var success = function () {
        //     message.value = "";
        //     messages.value += ("Us: " + text);
        //     messages.scrollTop = messages.scrollHeight;
        // };
        //bluetoothSerial.write(text, function; });
        // bluetoothSerial.write(text, success);
        // return false;
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

        // connection.style.display = "none";
        // chat.style.display = "block";
        // ble.setStatus("Connected");
        //alert("on connect");

    },
    ondisconnect: function(reason) {
        // var details = "";
        // if (reason) {
        //     details += ": " + JSON.stringify(reason);
        // }
        alert(JSON.stringify(reason));
        // connection.style.display = "block";
        // ble.enable(connectButton);
        // chat.style.display = "none";
        // ble.setStatus("Disconnected");
        //alert("ondisconnect");
    },
    onmessage: function(message) {
        alert('MSG');
        // messages.value += "Them: " + message;
        // messages.scrollTop = messages.scrollHeight;
        $("#content").html(message);
        alert("onmessage: " + message);
    },
    setStatus: function(message) { // setStatus
        // console.log(message);
        
        // window.clearTimeout(ble.statusTimeout);
        // statusMessage.innerHTML = message;
        // statusMessage.className = 'fadein';
                             
        // // automatically clear the status with a timer
        // ble.statusTimeout = setTimeout(function () {
        //     statusMessage.className = 'fadeout';
        // }, 5000);
        alert("setStatus");
    },
    enable: function(button) {
        //button.className = button.className.replace(/\bis-disabled\b/g,'');
        alert("Enable");
    },
    disable: function(button) {
        // if (!button.className.match(/is-disabled/)) {
        //     button.className += " is-disabled";
        // }
        alert("disable");
    },
    error: function(message) {
        //console.log(message);
      // alert(message);
        // var func = function(error) {
        //     var details = "";
        //     if (reason) {
        //         details += ": " + JSON.stringify(reason);
        //     }
        //     ble.setStatus(message + details);
        // };
        // return func;
    }
  };
})();

document.addEventListener('deviceready', ble.deviceready, false);