const config = require('./config/app.config').getDefaultConfig();
var express = require('express'),
    app = express(),
    port = config.port,
    bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./routes/v1');
routes(app);

app.listen(port);
console.log('RESTful API server started on: ' + port);
