/* eslint-disable */
const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  context: path.resolve(__dirname, "./src"),
  entry: {
    app: ["./scripts/app.js"]
  },
  output: {
    path: path.resolve(__dirname, "./dist/assets"),
    filename: "[name].bundle.js",
    publicPath: "/assets"
  },
  devServer: {
    contentBase: path.resolve(__dirname, "./src")
  },
  resolve: {
    modules: [path.resolve(__dirname, "./src"), "node_modules"]
  },
  module: {
    rules: [
      {
        test: /\.(sass|scss)$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        options: {
          presets: ["latest", "stage-0"]
        },
        exclude: [/(\/node_modules\/|test\.js|\.spec\.js$)/]
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          loader: "css-loader?importLoaders=1"
        })
      },
      {
        test: /\.html$/,
        use: ["file-loader?name=[path][name].[ext]!extract-loader!html-loader"]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: "[name].bundle.css",
      allChunks: true
    })
  ]
};
