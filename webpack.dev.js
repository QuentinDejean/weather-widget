/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

const {
  HotModuleReplacementPlugin,
  NamedModulesPlugin }  = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path              = require('path');

const entry = [
  'react-hot-loader/patch'
];

const modules = {
  rules: [{
    test: /\.js$/,
    loader: 'babel-loader',
    exclude: /node_modules/
  }, {
    test: /\.js$/,
    loader: 'eslint-loader',
    exclude: /node_modules/
  }, {
    test: /\.css$/,
    exclude: /node_modules/,
    use: [
      'style-loader',
      'css-loader?modules'
    ]
  }]
};

const plugins = [
  new HotModuleReplacementPlugin(),
  new NamedModulesPlugin()
];

const devServer = {
  hot: true,
  stats: 'errors-only'
};

const context = path.resolve(__dirname, 'app');

const config = [{
  context: `${context}/src/editor`,
  devServer,
  devtool: 'eval',
  entry: [
    ...entry,
    `${context}/src/editor/index.js`
  ],
  output: {
    path: `${context}/build`,
    filename: 'bundle.editor.js'
  },
  module: modules,
  plugins: [
    ...plugins,
    new HtmlWebpackPlugin({
      template: 'assets/index.html'
    })
  ]
}, {
  context: `${context}/src/widget`,
  devServer,
  devtool: 'eval',
  entry: [
    ...entry,
    `${context}/src/widget/index.js`
  ],
  module: modules,
  output: {
    path: `${context}/build`,
    filename: 'bundle.widget.js',
    publicPath: '/assets/'
  },
  plugins
}];

module.exports = config;
