
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');

var app = express();
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};
app.use(allowCrossDomain);
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
//app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/*
	EVENT RESTful API
*/
var meeting = require('./routes/meeting.js');
//Create new event
app.post('/api/meeting', meeting.put);
app.put('/api/meeting', meeting.put);
//Get list of meetings
app.get('/api/meeting', meeting.list);
//Get event information
app.get('/api/meeting/:eventID', meeting.get);
//Delete event
app.delete('/api/meeting/:eventID', meeting.delete);
//Checkin guestID to event
app.post('/api/:eventID/:guestID', meeting.checkinGuest);
app.put('/api/:eventID/:guestID', meeting.checkinGuest);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
