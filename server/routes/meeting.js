var cradle = require('cradle');
var meetings = new(cradle.Connection)().database('meetings');

//app.put('/api/meeting', meeting.put);
exports.put = function(req, res) {
  //Sanatize eventID

  if(!req.body.hasOwnProperty('name')) {
    return res.jsonp({"error" : "Event name must be specified"});
  }
  var doc = {};
  doc.name = req.body.name.replace(/[^\w\s]/g,'');
  if(doc.name.length < 1) {
    return res.jsonp({"error" : "Event Name must be specified"});
  }

  if(req.body.hasOwnProperty('description') && req.body.description.length > 1) {
    doc.description = req.body.description;
  }

  doc.createdate = new Date();
  meetings.save(doc, function(err, data) {
    if(err) {
      res.jsonp(err);
    } else {
      res.jsonp(data);
    }
  });
};

//app.get('/api/meeting/:eventID', meeting.get);
exports.get = function(req, res) {
  var evID = req.params.eventID.replace(/[^\w\s-]/g,'');
  meetings.get(evID, function(err, doc) {
    if(err) {
      res.jsonp(err);
    } else {
      res.jsonp(doc);
    }
  });
};

//app.get('/api/meeting', meeting.list);
exports.list = function(req, res) {
  meetings.all(function(err, docs) {
    if(err) {
      res.jsonp({"error" : err});
    } else {
      res.jsonp(docs);
    }
  });
};
// app.delete('/api/meeting/:eventID', meeting.delete);
exports.delete = function(req, res) {
  var evID = req.params.eventID.replace(/[^\w\s-]/g,'');
  var db = new(cradle.Connection)({cache: false}).database('ev' + evID);
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
  console.log(evID);
  var db = new cradle.Connection().database('ev' + evID);
  db.exists(function (err, exists) {
    if (err) {
      console.log(err);
      res.jsonp(err);
    } else if (exists) {
      checkin();
    } else {
      db.create(function(err, msg) {
        if(err) {
          res.jsonp(err);
        } else {
          checkin();
        }
      });
    }
  });

  function checkin() {
    db.save(guestID, { "create_date" : new Date()}, function(err, doc) {
      if(err) {
        res.jsonp(err);
      } else {
        res.jsonp({"checked in" : guestID});
      }
    });
  }
};