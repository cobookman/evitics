if(!controller) {
  controller = {};
}
controller.newevent = {
  create : function() {
    var newEv = genEv();

    if(newEv.name.length < 1 || newEv.organization.length < 1) {
      alert("Please specifiy an event name and organization");
      return false;
    } else {
      EventAPI.create(newEv, pushed);
    }

    function genEv() {
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
      return {
        name : document.getElementById('name').value.trim(),
        organization : document.getElementById('organization').value.trim(),
        guestList : guestList
      };
    }
    function pushed(err, doc) {
      if(err) {
        alert("ERROR!!!");
        alert(JSON.stringify(err));
      } else {
        EventAPI.eventList[doc.id] = newEv;
        controller.go(doc.id);
      }
    }
  },
  isOtherOrganization : function() {
    var org = document.getElementById('organization');
    if(org.value === "" && org[org.selectedIndex].innerHTML === "Other") {
      return true;
    } else {
      return false;
    }
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