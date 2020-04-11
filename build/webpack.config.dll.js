const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: {
    react: ["react", "react-dom"],
  },
  context: path.resolve(__dirname, "../"),
  mode: "production",
  output: {
    path: path.resolve(__dirname, "../dist"),
    //libraryTarget 指定如何暴露内容，缺省时就是 var
    // 输出的动态链接库的文件名称，[name] 代表当前动态链接库的名称
    filename: "dll/[name].dll.js",
    // 默认是 var 这个全局变量，如果以这种方式导出的话，只能用脚本的方式进行全局访问
    libraryTarget: "var",
    // 存放动态链接库的全局变量名称，例如对应 libs 来说就是 _dll_libs
    library: "_dll_[name]",
  },
  plugins: [
    // 清除上一次生成的文件
    new CleanWebpackPlugin({
      root: path.resolve(__dirname, "../dist/dll"),
      verbose: true,
      dry: false,
    }),
    new webpack.DllPlugin({
      //name和library一致
      name: "_dll_[name]",
      path: path.resolve(__dirname, "../dist/dll", "manifest.json"), //manifest.json的生成路径
    }),
  ],
};
