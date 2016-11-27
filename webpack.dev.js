const HtmlWebpackPlugin = require('html-webpack-plugin');
const path              = require('path');

const context = path.resolve(__dirname, 'app');

const config = [{
  context: `${context}/src/editor`,
  devtool: "eval-source-map",
  entry: `${context}/src/editor/components/index.js`,
  output: {
    path: `${context}/build`,
    filename: 'bundle.editor.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'assets/index.html'
    })
  ]
}, {
  context: `${context}/src/widget`,
  devtool: "eval-source-map",
  entry: `${context}/src/widget/components/index.js`,
  output: {
    path: `${context}/build`,
    filename: 'bundle.widget.js'
  }
}];

module.exports = config;
