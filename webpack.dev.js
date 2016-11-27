const HtmlWebpackPlugin = require('html-webpack-plugin');
const path              = require('path');

const context = path.resolve(__dirname, 'app');

const config = [{
  context,
  devtool: "eval-source-map",
  entry: {
    editor: `${context}/src/editor/components/editor.js`,
    widget: `${context}/src/widget/components/widget.js`
  },
  output: {
    path: `${context}/build`,
    filename: '[name].[hash].bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `src/editor/assets/index.html`
    })
  ]
}];

module.exports = config;
