const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBar = require('webpackbar');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BeautyConsole = require('./plugin/beautyConsole');

function absolutePath(relative) {
  return path.resolve(__dirname, relative);
}

module.exports = {
  entry: absolutePath('../src/app.tsx'),
  output: {
    path: absolutePath('../dist'),
    filename: '[name].js',
    // publicPath: "./",
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          { loader: '@teamsupercell/typings-for-css-modules-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
              },
            },
          },
          { loader: 'less-loader' },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [{ loader: 'eslint-loader' }, { loader: 'babel-loader' }],
      },
      {
        test: /\.(ts|tsx)$/,
        use: [{ loader: 'eslint-loader' }, { loader: 'ts-loader' }],
      },
      {
        test: /\.(png|svg|jpeg|jpg|gif|webp)$/,
        use: [{ loader: 'file-loader' }],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      src: absolutePath('../src'),
      assets: absolutePath('../assets'),
    },
  },
  plugins: [
    new htmlWebpackPlugin({
      template: absolutePath('./index.html'),
    }),
    new WebpackBar(),
    // 清除打包文件
    new CleanWebpackPlugin({
      dangerouslyAllowCleanPatternsOutsideProject: true,
    }),
  ],
  devServer: {
    port: 8080,
    compress: true,
    hot: true,
    contentBase: absolutePath('../dist'),
    // 防止在 BrowserRouter 模式下页面刷新404
    historyApiFallback: true,
    clientLogLevel: 'silent',
    openPage: '/',
    stats: {
      assets: false,
      builtAt: false,
      modules: false,
      entrypoints: false,
    },
  },
  devtool: 'inline-source-map',
};
