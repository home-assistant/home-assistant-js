'use strict';
var path = require('path');
var webpack = require('webpack');

var definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
  __DEMO__: JSON.stringify(JSON.parse(process.env.BUILD_DEMO || 'false')),
});

module.exports = {
  entry: './src/index.js',
  output: {
    library: 'HomeAssistantJS',
    libraryTarget: 'commonjs2',
    path: 'dist',
    filename: 'homeassistant.min.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          path.resolve(__dirname, 'src'),
        ],
      },
    ],
  },
  plugins: [
    definePlugin,
  ],
};
