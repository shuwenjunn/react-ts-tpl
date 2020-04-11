const { smart } = require("webpack-merge");
const base = require("./webpack.config.base");
const webpack = require("webpack");
const path = require("path");
const DllReferencePlugin = require("webpack/lib/DllReferencePlugin");
module.exports = smart(base, {
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  // devtool: "source-map",
  output: {
    // 开发环境下，filename 不能使用 contenthash/chunkhash
    filename: "js/[name].[hash:8].bundle.js",
    chunkFilename: "js/[name].chunk.js",
    publicPath: "/",
  },
  plugins: [
    new DllReferencePlugin({
      manifest: require(path.resolve(
        __dirname,
        "../dist",
        "dll",
        "manifest.json"
      )),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify("development"),
    }),
  ],
  watchOptions: {
    aggregateTimeout: 500,
    poll: 1000,
    ignored: /node_modules/, //忽略的监听文件
  },
  devServer: {
    contentBase: "./",
    disableHostCheck: true,
    host: "0.0.0.0",
    useLocalIp: true,
    port: 666,
    historyApiFallback: true,
    inline: true,
    hot: true,
    overlay: {
      errors: true, // 当出现错误时在页面打印错误信息
      warnings: true,
    },
    // open: true,
    // openPage:'dist/index.html',
  },
});
