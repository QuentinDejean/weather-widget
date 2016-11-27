const HtmlWebpackPlugin = require('html-webpack-plugin');
const path              = require('path');

const context = path.resolve(__dirname, 'app');

const config = [{
  context,
  devtool: "eval-source-map",
  entry: `src/editor/components/index.js`,
  output: {
    path: `${context}/build`,
    filename: 'bundle.demo.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `src/editor/assets/index.html`
    })
  ]
}];

module.exports = config;
