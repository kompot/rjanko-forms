import fs from 'fs'
import http from 'http';
import path from 'path';

import axios from 'axios';
import express from 'express';
import Promise from 'bluebird';
import React from 'react';

require('source-map-support').install();

const expressApp = express();

import renderApp from './renderApp';

const getWebpackBuildStats = (req) => {
  return axios.get('http://127.0.0.1:3001/build/_stats.json');
};

if (process.env.NODE_ENV === 'production') {
  expressApp.use('/build', express.static(path.join(process.cwd(), 'build')));
}

expressApp.use(async function(req, res, next) {
  const webpackAssets = await getWebpackBuildStats(req);
  renderApp(req, res, next, webpackAssets.data).catch(next);
});

expressApp.use(function(err, req, res, next) {
  if (err) {
    console.error(err.stack);
    const msg = process.env.NODE_ENV === 'production'
        ? 'Internal error ;('
        : `<html><body><pre>${err.stack}</pre></body></html>`;
    res.send(msg);
  }
});






const port = process.env.PORT || 3000;
const server = http.Server(expressApp);

server.listen(port, function(err, result) {
  if (err) {
    console.error(err);
  }
  console.log(`Express server listening on ${port}`);
});
