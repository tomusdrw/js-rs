var webpack = require('webpack');
var path = require('path');

var ENV = process.env.NODE_ENV || 'development';
var isProd = ENV === 'production';

module.exports = {
  debug: !isProd,
  cache: !isProd,
  devtool: isProd ? '#eval' : '#cheap-module-eval-source-map',
  context: path.join(__dirname, './src'),
  entry: {
    index: './index.js'
  },
  output: {
    path: path.join(__dirname, './target'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: ['babel']
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    unsafeCache: true
  },
  plugins: (function () {
    var plugins = [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(ENV),
          RPC_ADDRESS: JSON.stringify(process.env.RPC_ADDRESS)
        }
      })
    ];

    if (isProd) {
      plugins.push(new webpack.optimize.OccurrenceOrderPlugin(false));
      plugins.push(new webpack.optimize.DedupePlugin());
      plugins.push(new webpack.optimize.UglifyJsPlugin({
        screwIe8: true,
        compress: {
          warnings: false
        },
        output: {
          comments: false
        }
      }));
    }

    return plugins;
  }()),
  devServer: {
    contentBase: './src',
    proxy: {
      '/rpc*': {
        target: 'http://localhost:8080'
      },
      '/api*': {
        target: 'http://localhost:8080'
      }
    }
  }
};
