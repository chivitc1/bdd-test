const path = require('path');
const webpack = require('webpack');

module.exports = {
  // Entries have to resolve to files! They rely on Node
  // convention by default so if a directory contains *index.js*,
  // it resolves to that.  
  entry: {
    server: path.join(__dirname, 'src/server.js'),
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
  },
  target: 'node',
  node: {
    fs: 'empty',
    net: 'empty'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, './src'),
        ],
        exclude: /node_modules/,
        loader: 'babel-loader',
      }
    ]
  },
};