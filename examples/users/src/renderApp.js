import fs from 'fs'
import http from 'http';
import path from 'path';

import React from 'react';
import Baobab from 'baobab';
import {root} from 'baobab-react/higher-order';

import defaultData from './data';
import Html from './components/Html';
import Layout from './components/Layout';

function renderHtml(res, data, webpackAssets) {
  const BaobabEnrichedLayout = root(Layout, data);
  const markup = React.renderToString(<BaobabEnrichedLayout />);
  const html = React.renderToStaticMarkup(
      <Html webpackAssets={webpackAssets} markup={markup}
            state={data.get()} />
  );
  res.send(`<!doctype html>\n${html}`);
}

export default async function(req, res, next, webpackAssets) {
  const data = new Baobab(defaultData, {
    syncwrite: true
  });

  renderHtml(res, data, webpackAssets);
}

