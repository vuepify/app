import {readFileSync} from 'fs';
import vue from 'rollup-plugin-vue';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import babel from '@rollup/plugin-babel';
import {terser} from "rollup-plugin-terser";

const esbrowserslist = readFileSync('./.browserslistrc')
    .toString()
    .split('\n')
    .filter((entry) => entry && entry.substring(0, 2) !== 'ie');

const babelOptions = {
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
};

export default [
  {
    input: 'src/app.js',
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
      babel(babelOptions),
      commonjs()
    ],
  },
  {
    input: 'src/hot-reload.js',
    output: {
      file: 'dist/hot-reload.js',
      format: 'iife'
    },
    plugins: [
      resolve({
        extensions: ['.js'],
      }),
      babel(babelOptions),
      terser()
    ]
  }
];
