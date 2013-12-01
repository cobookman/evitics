var eventList = {};
/* DEMO PURPOSES ONLY - DELETE AFTERWORDS */
eventList.ev1 = {
  name : "Event 1",
  club : "ECE4894",
  guestList : []
};
eventList.ev2 = {
  name : "Event 2",
  club : "ECE4894",
  guestList : []
};
var currEv = {
  name : '',
  club : '',
  guestList : [],
  checkedIn : []
};

var Event = {
  url : 'http://burdellanswers.com:3000',
  createEvent : function(ev, callback) {
    $.ajax({
      url : this.url + '/api/meeting',
      type : 'POST',
      data : ev,
      success: function(data) {
        if(data.hasOwnProperty('error')) {
          callback(data, null);
        } else {
          callback(null, data);
        }
      },
      error: function(err) {
        callback(err, null);
      }
    });
  },
  listEvents : function(callback) {
    $.ajax({
      url : this.url + '/api/meeting',
      type: 'GET',
      success : function(data) {
        if(data.hasOwnProperty('error')) {
          callback(data, null);
        } else {
          callback(null, data);
        }
      },
      error : function(err) {
        callback(err, null);
      }
    });
  },
  checkinGuest : function(evId, guestId, callback) {
    $.ajax({
      url : this.url + '/api/' + evId +'/' + guestId,
      type : 'PUT',
      success : function(data) {
        if(data.hasOwnProperty('error')) {
          callback(data, null);
        } else {
          callback(null, data);
        }
      },
      error : function(err) {
        callback(err, null);
      }
    });
  },
  currentEv : {}
};