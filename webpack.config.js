const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';

const config = {
  context: path.resolve(__dirname, 'src'),
  entry: './index.ts',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/i,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-modules-typescript-loader' },
          { loader: 'css-loader', options: { modules: true } },
        ],
      },
      {
        test: /\.(m4a|png)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.css'],
  },
  output: {
    path: path.resolve(__dirname, 'public'),
  },
  devServer: {
    open: true,
    hot: true,
    host: 'localhost',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
  ],
};

module.exports = () => {
  if (isProduction) {
    config.mode = 'production';
  } else {
    config.mode = 'development';
  }
  return config;
};
