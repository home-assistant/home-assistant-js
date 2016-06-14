var rollup = require('rollup').rollup;
var babel = require('rollup-plugin-babel');
var uglify = require('rollup-plugin-uglify');
var commonjs = require('rollup-plugin-commonjs');
var nodeResolve = require('rollup-plugin-node-resolve');

rollup({
  entry: 'src/index.js',
  plugins: [
    nodeResolve({
      jsnext: true,
      main: true,
    }),

    commonjs({
    }),

    // babel({
    //   exclude: 'node_modules/**',
    //   babelrc: false,
    //   presets: ['es2015-rollup'],
    // }),
    // uglify(),
  ],
}).then(function (bundle) {
  return bundle.write({
    format: 'es6',
    // format: 'iife',
    dest: './dist/homeassistant.es6.js',
  });
}).catch(function (err) {
  console.error(err);
});
