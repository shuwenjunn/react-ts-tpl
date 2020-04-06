const { smart } = require("webpack-merge");
const base = require("./webpack.config.base");
const OptimizeCssPlugin = require("optimize-css-assets-webpack-plugin"); //压缩css
//output 中的hash值需要变化
module.exports = smart(base, {
  mode: "production",
  devtool: "source-map",
  plugins: [new OptimizeCssPlugin()],
});
