const HtmlWebpackPlugin = require('html-webpack-plugin');
const path              = require('path');

const modules = {
  rules: [{
    test: /\.js$/,
    loader: 'eslint-loader',
    exclude: /node_modules/
  }]
};

const devServer = {
  stats: 'errors-only'
};

const context = path.resolve(__dirname, 'app');

const config = [{
  context: `${context}/src/editor`,
  devServer,
  devtool: 'eval-source-map',
  entry: `${context}/src/editor/components/index.js`,
  output: {
    path: `${context}/build`,
    filename: 'bundle.editor.js'
  },
  module: modules,
  plugins: [
    new HtmlWebpackPlugin({
      template: 'assets/index.html'
    })
  ]
}, {
  context: `${context}/src/widget`,
  devServer,
  devtool: 'eval-source-map',
  entry: `${context}/src/widget/components/index.js`,
  module: modules,
  output: {
    path: `${context}/build`,
    filename: 'bundle.widget.js'
  }
}];

module.exports = config;
