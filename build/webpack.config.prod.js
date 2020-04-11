const { smart } = require("webpack-merge");
const base = require("./webpack.config.base");
const OptimizeCssPlugin = require("optimize-css-assets-webpack-plugin"); //压缩css
const path = require("path");
const webpack = require("webpack");
//output 中的hash值需要变化
module.exports = smart(base, {
  mode: "production",
  output: {
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/", //公共  解析路径未来希望可以动态配置
    filename: "js/[name].[contenthash].js", //filename 指列在 entry 中，打包后输出的文件的名称。开发环境下，filename 不能使用 contenthash/chunkhash
    chunkFilename: "js/[name].[contenthash].bundle.js", //chunkFilename 指未列在 entry 中，却又需要被打包出来的文件的名称
  },
  // devtool: "source-map",// 生成.map文件
  plugins: [
    new OptimizeCssPlugin(),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify("production"),
    }),
  ],
});
