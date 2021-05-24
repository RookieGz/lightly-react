const path = require('path');

const htmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBar = require('webpackbar');
const BeautyConsole = require('./plugin/beautyConsole');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

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
                localIdentName: '[hash:base64]',
              },
            },
          },
          { loader: 'less-loader' },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [{ loader: 'babel-loader' }],
      },
      {
        test: /\.(ts|tsx)$/,
        use: [{ loader: 'ts-loader' }],
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
    new CleanWebpackPlugin(),
  ],
};
