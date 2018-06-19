const path = require('path');
const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    entry: [path.join(__dirname, '../example/localdevServer.js')],
    devtool: 'source-map',
    output: {
        path: path.join(__dirname, '../lib'),
        filename: 'dpl.js',
        library: 'datepicker',
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                options: {
                    presets: [['env', { 'modules': false }], 'react', 'stage-0']
                },
                loader: 'babel-loader'
            },
            {test: /\.svg$/, loader: 'url-loader?mimetype=image/svg+xml'}
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [
            'node_modules',
            './src'
        ]
    },
    plugins: [
        new UglifyJsPlugin({
            uglifyOptions: {
                compress: {

                    // drop_console: true
                },
                dead_code: true
            }
        }),
        new BundleAnalyzerPlugin()
    ]

}

