'use strict';

var webpack = require("webpack");

var definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
});

module.exports = {
  entry: "./src/homeassistant.js",
  output: {
      path: 'dist',
      filename: "homeassistant.min.js"
  },
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    definePlugin
  ]
};
