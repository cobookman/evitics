var controller = (function() {
  // var _listInterval = null;
  return {
    _listInterval : null,
    genList : function(peripherals) {
      var peripheralList = document.getElementById('peripherals'),
        length = 0,
        html = '';
      for(var uuid in peripherals) {
        ++length;
        html += "<button onclick=\"controller.connect('"+uuid+"');\" class='peripheral'>" + peripherals[uuid].name + '</button>';
      }
      if(length > 0) {
        peripheralList.innerHTML = html;
        $(".loading").hide();
      } else {
        peripheralList.innerHTML = "";
        $(".loading").show();
      }
    },
    connect : function(uuid) {
      clearTimeout(this._listInterval);
      $(".peripheral").attr("disabled", "disabled");
      ble.connect({
        uuid : uuid,
        onConnect : success,
        onFailure : failure,
      });
      function success() {
        template.goto("incomingdata");
      }
      function failure() {
        alert("Failed");
        that.findPeripherals();
      }
    },
    findPeripherals : function() {
      ble.list(this.genList);
      $(".peripheral").removeAttr("disabled");
      /* 
        Keep finding peripherals every 2 seconds
      */
      this._listInterval = setTimeout(this.findPeripherals, 2500);
    }
  };
})();
controller.findPeripherals();
  // ble.list(controller.genList);
  // ble.listInterval = setInterval(function() { ble.list(controller.genList); }, 2000);
//@OVERRIDE
  // ble.connect = function(uuid) {
  //   bluetoothSerial.connect(uuid, ble.onconnect, ble.ondisconnect);
  // };

  // ble.onconnect = function() {
  //   clearInterval(ble.listInterval);
  //   template.goto("incomingdata");
  // };
  // ble.ondisconnect = function(reason) {
  //   alert('DISCONNECTED: ' + JSON.stringify(reason));
  //   ble.listInterval = setInterval(ble.list, 2000);
  // };

