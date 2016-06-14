import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';

export default {
  entry: 'src/index.js',
  format: 'es6',
  treeshake: true,
  plugins: [
    nodeResolve({
      jsnext: true,
      main: true,
    }),

    commonjs({
    }),

    replace({
      values: {
        __DEV__: JSON.stringify(!!JSON.parse(process.env.BUILD_DEV || 'true')),
        __DEMO__: JSON.stringify(!!JSON.parse(process.env.BUILD_DEMO || 'false')),
      },
    }),

    // babel({
    //   exclude: 'node_modules/**',
    //   babelrc: false,
    //   presets: ['es2015-rollup'],
    // }),
    // uglify(),
  ],
};
