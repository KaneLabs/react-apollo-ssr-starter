const path = require('path');
const webpack = require('webpack');

const config = {
  entry: ['babel-polyfill', './src/client/index.js'],

  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
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
        loader: 'style-loader!css-loader',
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
