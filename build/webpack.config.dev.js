const { smart } = require("webpack-merge");
const base = require("./webpack.config.base");
const webpack = require("webpack");
module.exports = smart(base, {
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  devServer: {
    host: "0.0.0.0",
    port: 7474, //未来需要可配置,
    hot: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
});
