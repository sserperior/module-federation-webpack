const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.jsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: 'auto',
    clean: true,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, exclude: /node_modules/, use: 'babel-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
    ],
  },
  plugins: [
    new webpack.container.ModuleFederationPlugin({
      name: 'remote_app',
      filename: 'remoteEntry.js',
      exposes: {
        './InsuranceForm': './src/components/InsuranceForm.jsx',
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: false,
          strictVersion: false,
          eager: true,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: false,
          strictVersion: false,
          eager: true,
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
    }),
  ],
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 3000,
    hot: true,
    open: false,
    proxy: [
      {
        context: ['/api'],
        target: 'http://localhost:4000',
        changeOrigin: true,
        secure: false,
      },
    ],
  },
};
