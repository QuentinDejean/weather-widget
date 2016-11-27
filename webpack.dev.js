const HtmlWebpackPlugin = require('html-webpack-plugin');
const path              = require('path');

const context = path.resolve(__dirname, 'app');

const config = {
  devtool: "cheap-eval-source-map",
  entry: `${context}/src/editor/components/index.js`,
  output: {
    path: `${context}/build`,
    filename: 'bundle.demo.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${context}/src/editor/assets/index.html`
    })
  ]
}

module.exports = config;
