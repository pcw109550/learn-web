const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: ['./src/index.js'],
    msg: ['./src/msg.js'],
    sha256: ['./src/sha256.js'],
    json: ['./src/json.js'],
    call: ['./src/call.js']
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: [path.join(__dirname, 'dist')],
    publicPath: '/',
    compress: true,
    port: 3000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'views/index.html',
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      filename: 'msg.html',
      template: 'views/msg.html',
      chunks: ['msg']
    }),
    new HtmlWebpackPlugin({
      filename: 'sha256.html',
      template: 'views/sha256.html',
      chunks: ['sha256']
    }),
    new HtmlWebpackPlugin({
      filename: 'json.html',
      template: 'views/json.html',
      chunks: ['json']
    }),
    new HtmlWebpackPlugin({
      filename: 'call.html',
      template: 'views/call.html',
      chunks: ['call']
    })
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].min.js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};