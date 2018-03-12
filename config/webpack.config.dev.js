"use strict";

const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const InterpolateHtmlPlugin = require("react-dev-utils/InterpolateHtmlPlugin");
const WatchMissingNodeModulesPlugin = require("react-dev-utils/WatchMissingNodeModulesPlugin");
const eslintFormatter = require("react-dev-utils/eslintFormatter");
const getClientEnvironment = require("./env");
const paths = require("./paths");

const publicPath = "/";
const publicUrl = "";
const env = getClientEnvironment(publicUrl);

module.exports = {
  devtool: "cheap-module-source-map",
  entry: [require.resolve("./polyfills"), require.resolve("react-dev-utils/webpackHotDevClient"), paths.appIndexJs],
  output: {
    pathinfo: true,
    filename: "static/js/bundle.js",
    chunkFilename: "static/js/[name].chunk.js",
    publicPath: publicPath,
    devtoolModuleFilenameTemplate: info => path.resolve(info.absoluteResourcePath).replace(/\\/g, "/")
  },
  resolve: {
    modules: ["node_modules", paths.appNodeModules].concat(process.env.NODE_PATH.split(path.delimiter).filter(Boolean)),
    extensions: [".js", ".json"],
    alias: {
      "@core": path.resolve(__dirname, "../src/core/"),
      "@components": path.resolve(__dirname, "../src/components/"),
      "@assets": path.resolve(__dirname, "../src/assets/"),
      "@theme": path.resolve(__dirname, "../src/theme/"),
      "@lib": path.resolve(__dirname, "../src/lib/"),
      "@products": path.resolve(__dirname, "../src/products/"),
      "@root": path.resolve(__dirname, "../src/")
    }
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        enforce: "pre",
        use: [
          {
            options: {
              formatter: eslintFormatter,
              eslintPath: require.resolve("eslint")
            },
            loader: require.resolve("eslint-loader")
          }
        ],
        include: paths.appSrc
      },
      {
        oneOf: [
          {
            test: /\.(js|jsx|mjs)$/,
            include: paths.appSrc,
            loader: require.resolve("babel-loader"),
            options: {
              cacheDirectory: true
            }
          },
          {
            test: /\.css$/,
            use: [
              require.resolve("style-loader"),
              {
                loader: require.resolve("css-loader"),
                options: {
                  import: false,
                  importLoaders: 1,
                  localIdentName: "[name]__[local]___[hash:base64:5]",
                  modules: true,
                  sourceMap: true
                }
              },
              {
                loader: require.resolve("postcss-loader"),
                options: {
                  config: {
                    path: path.join(__dirname, "./postcss.config.js")
                  }
                }
              }
            ]
          },
          {
            exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
            loader: require.resolve("file-loader"),
            options: {
              name: "static/media/[name].[hash:8].[ext]"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new InterpolateHtmlPlugin(env.raw),
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
      language: "en"
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin(env.stringified),
    new webpack.HotModuleReplacementPlugin(),
    new CaseSensitivePathsPlugin(),
    new WatchMissingNodeModulesPlugin(paths.appNodeModules),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ],
  node: {
    dgram: "empty",
    fs: "empty",
    net: "empty",
    tls: "empty",
    child_process: "empty"
  },
  performance: {
    hints: false
  }
};
