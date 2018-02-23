const path = require('path');
const webpack = require('webpack');

const config = {
  target: 'node',

  entry: ['babel-polyfill', './src/server.js'],

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        exclude: path.resolve(__dirname, 'node_modules'),
        test: /\.(js|jsx)$/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        loader: 'css-loader',
      },
      // {
      //   test: /.json$/,
      //   loaders: ['json-loader']
      // }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};

const prodPlugins = [
  new webpack.DefinePlugin({
   'process.env.NODE_ENV': '"production"'
  }),
  new webpack.optimize.UglifyJsPlugin(),
  new webpack.optimize.AggressiveMergingPlugin(),
  new webpack.optimize.ModuleConcatenationPlugin(),
  new webpack.NoErrorsPlugin(),
];

if (process.env.NODE_ENV === 'production') {
  config.plugins = prodPlugins;
}

module.exports = config;
