


var controller = {
  genList : function(peripherals) {
    var peripheralList = document.getElementById('peripherals'),
      length = 0,
      html = '';
    for(var uuid in peripherals) {
      ++length;
      html += "<button onclick=\"ble.connect('"+uuid+"');\" >" + peripherals[uuid].name + '</button>';
    }
    if(length > 0) {
      peripheralList.innerHTML = html;
      $(".loading").hide();
    } else {
      peripheralList.innerHTML = "";
      $(".loading").show();
    }
  }
};
//@OVERRIDE
  ble.connect = function(uuid) {
    bluetoothSerial.connect(uuid, ble.onconnect, ble.ondisconnect);
  };

  ble.onconnect = function() {
    clearInterval(ble.listInterval);
    template.goto("incomingdata");
  };
  // ble.ondisconnect = function(reason) {
  //   alert('DISCONNECTED: ' + JSON.stringify(reason));
  //   ble.listInterval = setInterval(ble.list, 2000);
  // };

  ble.list(controller.genList);
  ble.listInterval = setInterval(function() { ble.list(controller.genList); }, 2000);