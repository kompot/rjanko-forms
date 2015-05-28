import path from 'path';

import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';

const port = 3001;
const compiler = webpack(require(path.join(
    process.cwd(),
    'webpack.config.js'
)));

const webpackServer = new WebpackDevServer(compiler, {
  publicPath: `http://0.0.0.0:${port}/build/`,
  watchDelay: 0,
  hot: true,
  stats: {
    colors: true,
    assets: true,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false,
    children: false
  }
});

webpackServer.listen(port, '0.0.0.0', function (err, result) {
  if (err) {
    console.error(err);
  } else {
    console.log(`Webpack dev server listening on ${port}`);
  }
});
