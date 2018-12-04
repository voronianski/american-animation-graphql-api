const http = require('http');
const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const compression = require('compression');
const { port, env } = require('c0nfig');

const db = require('./db');
const graphql = require('./graphql');

const app = express();

if ('test' !== env) {
  app.use(logger('dev'));
}

app.disable('x-powered-by');
app.use(cors());
app.use(compression());
app.use('/ping', (req, res) => res.send('pong ^.^'));

function start() {
  db.init()
    .then(() => {
      graphql.init(app);

      http.createServer(app).listen(port, () => {
        console.log(`started on http://localhost:${port} env=${env}`);
      });
    })
    .catch(err => {
      console.log(`failed to start server env=${env}`, err);
    });
}

module.exports = {
  app,
  start
};
