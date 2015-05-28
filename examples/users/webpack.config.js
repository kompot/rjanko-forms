var path = require('path');
var webpack = require('webpack');
var StatsPlugin = require('./statsPlugin');

var config = {
  entry: {
    client: ['./src/client']
  },
  output: {
    path: path.join(process.cwd(), 'build'),
    publicPath: '/build/',
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js'],
    moduleDirectories: ['src', 'node_modules']
  },
  module: {
    loaders: [{
        test: /\.styl$/,
        loader: 'style!css!autoprefixer!stylus'
      }, {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'component-css?ext=styl', 'babel']
      }
    ]
  },
  plugins: [
    new StatsPlugin()
  ]
};

config.devtool = 'eval';

for (var key in config.entry) {
  if (key !== 'vendor') {
    config.entry[key].unshift(
      'webpack-dev-server/client?http://127.0.0.1:3001',
      'webpack/hot/only-dev-server'
    );
  }
}

config.plugins.push(new webpack.HotModuleReplacementPlugin());

module.exports = config;
