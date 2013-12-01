 var EventAPI = {
   url : 'http://burdellanswers.com:3000',
   create : function(ev, callback) {
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
  list : function(callback) {
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
        alert("NOOOOOO!!!!");
        alert(JSON.stringify(err));
        callback(err, null);
      }
    });
  },
  current : {}
};

EventAPI.eventList = {};
EventAPI.list(function(err, data) {
  if(err) {
    alert("OH NOES ERROR population your events :(");
  } else {
    for(var i = 0; i < data.length; ++i) {
      EventAPI.eventList[data[i].id] = { name : data[i].id };
    }
  }
});