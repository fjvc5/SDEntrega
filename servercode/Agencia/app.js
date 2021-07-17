const express = require('express');

const bodyparser = require('body-parser');
const cors = require('cors');

const routeAv = require('./routeAv/routes.js');
const routeCo = require('./routeCo/routes.js');
const routeHo = require('./routeHo/routes.js');
const routeUs = require('./routeUs/routes.js');
const routeRe = require('./routeRe/routes.js');
const routeBa = require('./routeBa/routes.js');
var app = express();

const { fstat } = require('fs');


app.use(cors());

app.use(bodyparser.json());
app.use('/api', routeAv);
app.use('/api', routeCo);
app.use('/api', routeHo);
app.use('/api', routeUs);
app.use('/api', routeRe);
app.use('/api', routeBa);


module.exports = app;