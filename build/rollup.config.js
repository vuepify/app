import { readFileSync } from 'fs';
import vue from 'rollup-plugin-vue';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import babel from '@rollup/plugin-babel';

const esbrowserslist = readFileSync('./.browserslistrc')
  .toString()
  .split('\n')
  .filter((entry) => entry && entry.substring(0, 2) !== 'ie');

export default {
  input: 'src/entry.js',
  external: ['vue'],
  output: {
    file: 'dist/app.js',
    format: 'esm',
    exports: 'named',
  },
  plugins: [
    replace({
      values: {
        'process.env.NODE_ENV': JSON.stringify('production'),
      },
      preventAssignment: true
    }),
    vue({
      css: true,
      template: {
        isProduction: true,
      },
    }),
    resolve({
      extensions: ['.js', '.vue'],
    }),
    babel({
      exclude: 'node_modules/**',
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
      babelHelpers: 'bundled',
      presets: [
        [
          '@babel/preset-env',
          {
            targets: esbrowserslist,
          },
        ],
      ],
    }),
    commonjs(),
  ],
};
