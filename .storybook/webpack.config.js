const path = require("path");

module.exports = {
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.css$/,
            use: [
              {
                loader: "style-loader",
                options: {
                  sourceMap: true,
                }
              },
              {
                loader: "css-loader",
                options: {
                  modules: true,
                  importLoaders: 1,
                  localIdentName: '[path]___[name]__[local]___[hash:base64:5]',
                  sourceMap: true,
                }
              },
              {
                loader: require.resolve("postcss-loader"),
                options: {
                  config: {
                    path: path.join(__dirname, "./../config/postcss.config.js")
                  }
                }
              }
            ]
          },
          {
            test: /\.(jpe?g|jpg|gif|png|woff|woff2|eot|ttf|svg)$/,
            use: [{loader: "file-loader"}]
          }
        ]
      }
    ]
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.scss'],
    alias: {
      "@core": path.resolve(__dirname, '../src/core/'),
      "@components": path.resolve(__dirname, '../src/components/'),
      "@assets": path.resolve(__dirname, '../src/assets/'),
      "@theme": path.resolve(__dirname, '../src/theme/'),
      "@lib": path.resolve(__dirname, '../src/lib/'),
      "@story": path.resolve(__dirname, '../.storybook/'),
      "@products": path.resolve(__dirname, '../products/'),
      "@root": path.resolve(__dirname, '../src/'),
    }
  }
};
