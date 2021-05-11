const {resolve} = require('path');
const {VueLoaderPlugin} = require('vue-loader');
const VueTemplateCompiler = require('vue-template-compiler');

const MODE = 'production';
const outputDir = resolve(__dirname, 'dist');
const srcDir = resolve(__dirname, 'src');

module.exports = [
    {
        mode: MODE,
        entry: resolve(srcDir, 'app.js'),
        output: {
            filename: 'app.js',
            path: outputDir,
            library: {
                name: 'VuepifyPlugin',
                type: 'commonjs2',
                export: ['VuepifyPlugin'],
            }
        },
        resolve: {
            extensions: ['.js', '.vue']
        },
        plugins: [
            new VueLoaderPlugin()
        ],
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                    options: {
                        compiler: VueTemplateCompiler
                    }
                }
            ]
        }
    },
    {
        mode: MODE,
        entry: resolve(srcDir, 'hot-reload.js'),
        output: {
            filename: 'hot-reload.js',
            path: outputDir
        },
        optimization: {
            minimize: true
        },
        resolve: {
            extensions: ['.js']
        }
    }
]
