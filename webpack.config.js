'use strict';

var webpack = require("webpack");

var definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
  __DEMO__: JSON.stringify(JSON.parse(process.env.BUILD_DEMO || 'false')),
});

module.exports = {
  entry: "./src/homeassistant.js",
  output: {
      path: 'dist',
      filename: "homeassistant.min.js"
  },
  module: {
    loaders: [
      {
        loader: "babel-loader",
        test: /.js$/,
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    definePlugin,
  ]
};
