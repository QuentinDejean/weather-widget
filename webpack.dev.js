/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

const {
  DefinePlugin,
  HotModuleReplacementPlugin,
  NamedModulesPlugin }  = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const env               = require('./.env');
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
  module: {
    rules: [
      ...modules.rules,
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?name=fonts/[name].[ext]' +
        '?[hash:20]&limit=10000&minetype=application/font-woff'
      }, {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=fonts/[name].[ext]?[hash:20]'
      }
    ]
  },
  output: {
    path: `${context}/build`,
    filename: 'bundle.widget.js',
    publicPath: '/assets/'
  },
  plugins: [
    ...plugins,
    new DefinePlugin({
      WEATHER_API: JSON.stringify(env.WEATHER_API_KEY)
    })
  ]
}];

module.exports = config;
