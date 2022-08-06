require('dotenv').config();
require('./config/database').connect();
const express = require('express');
const path = require('path');
const { testFacebook } = require('./services/EmailTemplates');

const controllersFactory = require('./controllers');
const siteRouterFactory = require('./route');

const app = express();

app.use(express.json({ limit: '100mb' }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin,X-Requested-With,Content-Type,Accept,Authorization,*'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT,POST,DELETE,PATCH,GET');
    return res.status(200).json({});
  }
  next();
});

app.get('/readfiles/:img', (req, res1) => {
  res1.sendFile(path.join(__dirname + '/images/' + req.params.img));
});

app.get('/testFacebook', async (req, res1) => {
  let sendit = await testFacebook('sd');
  res1.send(sendit);
});

const controllers = controllersFactory();
const siteRouter = siteRouterFactory(controllers);
app.use('/api', siteRouter);

app.use(express.static(path.join(__dirname, 'build')));

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/build/index.html'));
});

module.exports = app;
