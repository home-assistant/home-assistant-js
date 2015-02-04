'use strict';

var webpack = require("webpack");

module.exports = {
  entry: "./src/homeassistant.js",
  output: {
      path: 'dist',
      filename: "homeassistant.min.js"
  },
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ]
};
