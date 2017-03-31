// Modules
var express = require('express');
var app = express();
//var https = require('https');

var port =  process.env.PORT || 443;
var port_http = process.env.PORT || 80;

// ////////////
// Environments
// ////////////

// ///////////////////
// Serve Request Files
// ///////////////////
//app.use(express.static('source'));
app.use(express.static('public'));

app.get('/', function (req, res) {
  //res.send('Hello World!');
  res.sendFile(__dirname + '/public/index.html')
});

app.post('/', function (req, res) {
  //res.send('Hello World!');
  res.sendFile(__dirname + '/public/index.html')
});


// routes ==================================================
var server = app.listen(port, function(){
    console.log('listening on *:' + port);
})
/*var server = https.createServer(options, app).listen(port, function(){
    console.log('listening on *:' + port);
});*/
/*app.listen(port_http, function(){
    console.log('listening on *:' + port_http);
})*/

var communication = require('./app/communication.js')(app, server);


// start app
exports = module.exports = app;
