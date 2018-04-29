const path = require('path'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  CompressionPlugin = require('compression-webpack-plugin'),
  MinifyPlugin = require('babel-minify-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    app: path.join(__dirname, 'src/js/index.js'),
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: 'https://s3.us-east-2.amazonaws.com/kals-portfolio-assets/main/',
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: {
          loader: 'pug-loader',
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['minify'],
              [
                'env',
                {
                  modules: false,
                },
              ],
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].css',
            },
          },
          'extract-loader',
          {
            loader: 'css-loader',
            options: {
              minimize: true,
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.jpg$/,
        use: {
          loader: 'responsive-loader',
          options: {
            name: 'images/[name]-[width].[ext]',
            sizes: [500, 800],
            placeholder: true,
            placeholderSize: 50,
          },
        },
      },
      {
        test: /\.gif$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'gifs/',
              publicPath: 'https://s3.us-east-2.amazonaws.com/kals-portfolio-assets/main/gifs/',
            },
          },
          {
            loader: 'image-webpack-loader',
          },
        ],
      },
      {
        test: /\.svg/,
        use: {
          loader: 'svg-url-loader',
          options: {},
        },
      },
      {
        test: /\.(ttf|eot|woff|woff2|otf)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/',
            publicPath: 'https://s3.us-east-2.amazonaws.com/kals-portfolio-assets/fonts/',
          },
        },
      },
    ],
  },
  optimization: {
    // minimizer: [new MinifyPlugin({}, {})],
  },
  plugins: [
    new MinifyPlugin(
      {
        mangle: {
          topLevel: true,
        },
      },
      {
        exclude: /node_modules/,
      },
    ),
    new HtmlWebpackPlugin({
      template: 'index.pug',
      inject: false,
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        html5: true,
        minifyCSS: true,
        removeComments: true,
      },
    }),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(ttf|woff)$/,
      threshold: 10240,
      minRatio: 0.8,
      deleteOriginalAssets: true,
    }),
  ],
};
