"use strict";

const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const InterpolateHtmlPlugin = require("react-dev-utils/InterpolateHtmlPlugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const paths = require("./paths");
const getClientEnvironment = require("./env");

const publicPath = paths.servedPath;
const shouldUseRelativeAssetPaths = publicPath === "./";
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== "false";
const publicUrl = publicPath.slice(0, -1);
const env = getClientEnvironment(publicUrl);

if (env.stringified["process.env"].NODE_ENV !== '"production"') {
  throw new Error("Production builds must have NODE_ENV=production.");
}

// Note: defined here because it will be used more than once.
const cssFilename = "static/css/[name].[contenthash:8].css";

const languages = ["en", "de"];

module.exports = {
  bail: true,
  devtool: shouldUseSourceMap ? "source-map" : false,
  entry: [require.resolve("./polyfills"), paths.appIndexJs],
  output: {
    path: paths.appBuild,
    filename: "static/js/[name].[chunkhash:8].js",
    chunkFilename: "static/js/[name].[chunkhash:8].chunk.js",
    publicPath: publicPath,
    devtoolModuleFilenameTemplate: info => path.relative(paths.appSrc, info.absoluteResourcePath).replace(/\\/g, "/")
  },
  resolve: {
    modules: ["node_modules", paths.appNodeModules].concat(process.env.NODE_PATH.split(path.delimiter).filter(Boolean)),
    extensions: [".js", ".json"],
    alias: {
      "react": "preact-compat",
      "react-dom": "preact-compat",
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
        oneOf: [
          {
            test: /\.(js)$/,
            include: paths.appSrc,
            loader: require.resolve("babel-loader"),
            options: {
              compact: true
            }
          },
          {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract(
              Object.assign(
                {
                  fallback: {
                    loader: require.resolve("style-loader"),
                    options: {
                      hmr: false
                    }
                  },
                  use: [
                    {
                      loader: require.resolve("css-loader"),
                      options: {
                        importLoaders: 1,
                        modules: true,
                        minimize: true,
                        sourceMap: shouldUseSourceMap
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
                shouldUseRelativeAssetPaths ? { publicPath: Array(cssFilename.split("/").length).join("../") } : {}
              )
            )
          },
          {
            test: /\.svg$/,
            use: [
              {
                loader: "babel-loader"
              },
              {
                loader: "react-svg-loader",
                options: {
                  jsx: true, // true outputs JSX tags,
                  svgo: {
                    floatPrecision: 3
                  }
                }
              }
            ]
          },
          {
            loader: require.resolve("file-loader"),
            exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
            options: {
              name: "static/media/[name].[hash:8].[ext]"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // new BundleAnalyzerPlugin({
    //   analyzerMode:"static",
    //   openAnalyzer:true,
    // }),
    new InterpolateHtmlPlugin(env.raw),
    new HtmlWebpackPlugin({
      inject: false,
      template: paths.appHtmlEmpty,
      links: languages.map(lang => `<a href="${lang}.html"/>`).join("")
    }),

    ...languages.map(
      lang =>
        new HtmlWebpackPlugin({
          filename: lang + ".html",
          inject: false,
          template: paths.appHtml,
          language: lang,
          description:"sample description",
          copyright:"sample copyright",
          // excludeChunks: [ 'polyfill' ],
          // chunks: ['main'],
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true
          }
        })
    ),
    new webpack.DefinePlugin(env.stringified),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        comparisons: false
      },
      mangle: {
        safari10: true
      },
      output: {
        comments: false,
        ascii_only: true
      },
      sourceMap: shouldUseSourceMap
    }),
    new ExtractTextPlugin({
      filename: cssFilename
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ],
  node: {
    dgram: "empty",
    fs: "empty",
    net: "empty",
    tls: "empty",
    child_process: "empty"
  }
};
