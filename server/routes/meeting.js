var cradle = require('cradle');
var meetings = new(cradle.Connection)().database('meetings');

//app.put('/api/:eventID', meeting.put);
exports.put = function(req, res) {
  //Sanatize eventID

  if(!req.body.hasOwnProperty('name')) {
    return res.jsonp({"error" : "Event name must be specified"});
  }
  var doc = {};
  doc.name = req.body.name.replace(/[^\w\s]/g,'');

  var evID = req.params.eventID.replace(/[^\w\s-]/g,'');
  if(evID.length < 1 || doc.name.length < 1) {
    return res.jsonp({"error" : "Event ID and Name must be specified"});
  }
  if(req.body.hasOwnProperty('description') && req.body.description.length > 1) {
    doc.description = req.body.description;
  }

  doc.createdate = new Date();
  meetings.save(evID, doc, function(err, data) {
    if(err) {
      res.jsonp({"error": err});
    } else {
      res.jsonp({"created event" : evID});
    }
  });
};

//app.get('/api/:eventID', meeting.get);
exports.get = function(req, res) {
  var evID = req.params.eventID.replace(/[^\w\s-]/g,'');
  meetings.get(evID, function(err, doc) {
    if(err) {
      res.jsonp({"error" : err});
    } else {
      res.jsonp(doc);
    }
  });
};
// app.delete('/api/:eventID', meeting.delete);
exports.delete = function(req, res) {
  var evID = req.params.eventID.replace(/[^\w\s-]/g,'');
  var db = new(cradle.Connection)({cache: false}).database(evID);
  db.destroy();
  meetings.get(evID, function(err, doc) {
    if(err) {
      res.jsonp({"error" : err});
    } else {
      meetings.remove(evID, doc._rev, function(err, doc) {
        if(err) {
          res.jsonp({"error" : err});
        } else {
          res.jsonp({"deleted" : evID});
        }
      });
    }
  });
};
//app.post('/api/:eventID/:guestID', meeting.checkinGuest);
exports.checkinGuest = function(req, res) {
  var evID = req.params.eventID.replace(/[^\w\s-]/g,'');
  var guestID = req.params.guestID.replace(/[^\w\s-]/g,'');
  if(guestID.length < 1) {
    return res.jsonp({"error" : "guestID not specified"});
  }

  var db = new(cradle.Connection)({cache: false}).database(evID);
  db.exists(function (err, exists) {
    if (err) {
      res.jsonp({"error" : err});
    } else if (exists) {
      checkin();
    } else {
      db.create();
      checkin();
    }
  });

  function checkin() {
    db.save(guestID, { "create_date" : new Date()}, function(err, doc) {
      if(err) {
        res.jsonp({"error" : err});
      } else {
        res.jsonp({"checked in" : guestID});
      }
    });
  }
};