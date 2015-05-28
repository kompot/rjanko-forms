var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var StatsPlugin = require('./statsPlugin');

var nodeModules = {
};

['node_modules'].map(function (dir) {
  fs.readdirSync(dir)
      .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
      })
      .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;
      });
});


var config = {
  entry: {
    server: ['./src/server']
  },
  output: {
    path: path.join(process.cwd(), 'build-server'),
    publicPath: '/build-server/',
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js'],
    moduleDirectories: ['src', 'node_modules']
  },
  externals: nodeModules,
  target: 'node',
  node: {
    console: true,
    process: true,
    global: true,
    buffer: true,
    __filename: true,
    __dirname: true
  },
  module: {
    loaders: [{
        test: /\.styl$/,
        loader: 'style!css!autoprefixer!stylus'
      }, {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['component-css?ext=styl', 'babel']
      }
    ]
  },
  plugins: [
    new StatsPlugin()
  ]
};

config.devtool = 'source-map';
config.debug = true;

module.exports = config;
