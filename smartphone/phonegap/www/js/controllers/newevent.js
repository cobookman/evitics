if(!controller) {
  controller = {};
}
controller.newevent = {
  create : function() {
    
    var guestList ='';
    try {
      guestList = document.getElementById('guestList').value.trim();
      guestList = guestList.replace(/\[|\]/g,'').replace(/,\s+/g,',');
      guestList = guestList.split(/\s|,/);
      if(guestList[0] === "") {
        guestList = [];
      }

    } catch(e) {
      alert("ERROR: " + e);
    }

    var newEv = {
      name : document.getElementById('name').value.trim(),
      organization : document.getElementById('organization').value.trim(),
      guestList : guestList
    };

    if(newEv.name.length > 1 && newEv.organization.length > 1) {
      this.pushnewEv('asdf', newEv, function(err, doc) {
        if(err) {
          alert("ERROR!!!");
        } else {
          eventList['asdf'] = newEv;
          controller.go(newEv);
        }
      });
    } else {
      alert("Please specifiy an event name and organization");
      return false;
    }
  },
  isOtherOrganization : function() {
    var org = document.getElementById('organization');
    if(org.value === "" && org[org.selectedIndex].innerHTML === "Other") {
      return true;
    } else {
      return false;
    }
  },
  pushnewEv : function(id, ev, callback) {
    //callback(null, id)
    $.ajax({
      url : 'http://burdellanswers.com:3000/api/' + id,
      type : 'POST',
      data : ev,
      success: function(data) {
        callback(null, data);
      },
      error: function(err) {
        callback(err, null);
      }
    });
  }
};
//On organization.other
document.getElementById('organization').onchange = function() {
  if(controller.newevent.isOtherOrganization()) {
    $(this).after('<input id="otherOrganization" type="text" placeholder="New Organization Name">');
  } else {
    $("#otherOrganization").remove();
  }
};