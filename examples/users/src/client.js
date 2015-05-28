import React from 'react';
import Promise from 'bluebird';
import Baobab from 'baobab';
import {root} from 'baobab-react/higher-order';

Promise.longStackTraces();

import Layout from './components/Layout';

const data = new Baobab(window._app_state_, {
  syncwrite: true
});

const BaobabEnrichedLayout = root(Layout, data);
React.render(<BaobabEnrichedLayout />, document.getElementById('app'));
