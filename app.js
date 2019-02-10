
const { port } = require('./config/app.config').getDefaultConfig();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// - load routes
const routes = require('./routes/v1');
routes(app);

// - set port
app.listen(port, () => {
    console.log(`RESTFUL API server started on: ${port}`);
});
