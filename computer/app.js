var noble = require('noble');


var BLE = {
  peripherals : ["7dd2f9fb05d14652a2ff1435e55044ce"],
  service : "713d0000503e4c75ba943148f18d941e",
  characteristics : {
    vendor : {
      uuid : "713D0001503E4C75BA943148F18D941E"
    },
    read : {
      uuid : "713D0002503E4C75BA943148F18D941E"
    },
    write : {
      uuid : "713D0003503E4C75BA943148F18D941E"
    },      
    control : {
      uuid : "713D0004503E4C75BA943148F18D941E" //After recieving notification from 0x0002, write 0x1 to 0x0004
    }
  }
};

//When bluetooth powers on start NOble
noble.on('stateChange', function(state) {
  console.log('on -> stateChange: ' + state);
  if (state === 'poweredOn') {
    noble.startScanning([], false);
    //noble.startScanning();
  } else {
    //TODO - Tell user to turnon bluetooth
    noble.stopScanning();
  }
});


noble.on('scanStart', function() {
  console.log('on -> scanStart');
});

noble.on('scanStop', function() {
  console.log('on -> scanStop');
});



noble.on('discover', function(peripheral) {
  peripheral.connect(function(error) {
    if(BLE.peripherals.indexOf(peripheral.uuid) === -1) {
      console.log("NOT device i  want");
      peripheral.disconnect();
      return ({ "error" : "not my BLE device" });
    }
    peripheral.discoverServices([BLE.service], function(error, services) {
      var main_service = services[0];
      var wantedCharacteristics = [BLE.characteristics.read.uuid, BLE.characteristics.write.uuid];
      
      services[0].discoverCharacteristics(null, function(error, characteristics) {
        console.log("HI");
        /*  find read/write charecteristics */
        var writeID = -1,
            readID = -1;
        for(var i = 0; i < characteristics.length; ++i) {
          if(characteristics[i].hasOwnProperty('uuid')) {
            switch(characteristics[i].uuid.toLowerCase()) {
              case BLE.characteristics.write.uuid.toLowerCase() : writeID = i; break;
              case BLE.characteristics.read.uuid.toLowerCase() : readID = i; break;
              default: break;
              //default: //console.log(characteristics[i]); break;
            }
          }
        }
        if(writeID === -1 || readID === -1) {
          throw new Error("Is not the bluetooth shield version we are using");
        }
        var write_charecteristic = characteristics[writeID];
        var read_charecteristic = characteristics[readID];
        // console.log("Connected to read characteristic: " + read_charecteristic);
        // console.log("Connected to write characteristic: " + write_charecteristic);
        
        /*
          Handle Read Events
                              */
        // read_charecteristic.notify(true, function(error) {
        //   if(error) { console.log(error); } //TODO - ERROR Handling
        // });
        // read_charecteristic.on('read', function(data, isNotification) {
        //   //TODO - Push buzzcard IDS to array/serverside
        //   var buzzcardID = '';
        //   for(var b = 0; b < data.length; ++b) {
        //     buzzcardID += data[b];
        //   }
        //   console.log(buzzcardID);
        // });

        /*
          Write Data to BLE Shield
                                    */
        //TODO - Doesn't work :(
          for(var j in characteristics) {
            characteristics[j].write(new Buffer([0xFF, 0xFE, 0xFB, 0xFF]), true);
          }
        // characteristics[writeID].write(new Buffer([0xFF, 0xFE, 0xFB, 0xFF]), true);
      });
   
    });//discover services
  });//connect to peripheral
});//discover peripheral

