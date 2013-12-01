
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');

var app = express();

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
app.post('/api/newmeeting', meeting.put);
app.put('/api/newmeeting', meeting.put);
//Get event information
app.get('/api/:eventID', meeting.get);
//Delete event
app.delete('/api/:eventID', meeting.delete);
//Checkin guestID to event
app.post('/api/:eventID/:guestID', meeting.checkinGuest);
app.put('/api/:eventID/:guestID', meeting.checkinGuest);



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
