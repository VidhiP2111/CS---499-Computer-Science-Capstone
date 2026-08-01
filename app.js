const express = require('express');
require('./app_server/config/db');
const path = require('path');
const hbs = require('hbs');

const app = express();

const travelRoutes = require('./app_server/routes/travel');
const apiRoutes = require('./app_api/routes/index');

app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');

hbs.registerPartials(
  path.join(__dirname, 'app_server/views/partials')
);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

//logging every request that hits the server
app.use((req, res, next) => {
  console.log(new Date().toISOString(), req.method, req.originalUrl);
  next();
});

app.use('/api', apiRoutes);
app.use('/', travelRoutes);

const port = 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});