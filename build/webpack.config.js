const path = require('path');
const webpack = require('webpack')

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
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [
            'node_modules',
            './src'
        ]
    }
}

