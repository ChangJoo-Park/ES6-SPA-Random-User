/*
* @Author: changjoopark
* @Date:   2016-05-10 17:49:26
* @Last Modified by:   changjoopark
* @Last Modified time: 2016-05-10 18:02:10
*/

'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    app: './js/main.js',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  stats: {
    colors: true
  },
  devtool: 'source-map'
};

