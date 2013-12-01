var controller = (function() {
  var data = document.getElementById("data");
  return {
    incomingRFIDCode : function(message) {
      if(EventAPI.current.checkedIn.indexOf(message) === -1) {
        EventAPI.checkinGuest(EventAPI.current.id, message, function(err, doc) {
          if(err) {
            alert("OHH NOEs...something in the incomingRFIDCode in the controller object broke :(");
            alert(JSON.stringify(err));
          } else {
            data.innerHTML += message + "<br/>";
            EventAPI.current.checkedIn.push(message);
          }
        });
      } else {
        //todo -Better err handling
        alert(message + " Already Checked in");
      }
    }
  };
})();
ble.subscribe(controller.incomingRFIDCode); //Subscribe to read events
