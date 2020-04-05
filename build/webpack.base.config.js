const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const isDev = process.env.NODE_ENV === "development";
module.exports = {
  entry: path.resolve(__dirname, "../src/main.ts"),
  output: {
    path: path.resolve(__dirname, "../dist"),
    // publicPath: "", //公共  解析路径未来希望可以动态配置
    filename: "[name].[chunkhash].js", //filename 指列在 entry 中，打包后输出的文件的名称。
    chunkFilename: "[name].[chunkhash].bundle.js", //chunkFilename 指未列在 entry 中，却又需要被打包出来的文件的名称
  },
  module: {
    rules: [
      {
        test: /\.(jsx?|tsx?)$/,
        exclude: [/(node_modules)/, /public/],
        use: {
          loader: "babel-loader", // babel-loader 里面包含了ts解析器
        },
      },
      {
        test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10240, //10K
              esModule: false,
              name: "[name]_[hash:6].[ext]",
              outputPath: "assets",
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(le|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: true,
            },
          },
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: function () {
                return [
                  require("autoprefixer")({
                    overrideBrowserslist: [">0.25%", "not dead"],
                  }),
                ];
              },
            },
          },
          "less-loader",
        ],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "index",
      template: path.resolve(__dirname, "../public/index.html"),
      inject: true,
      hash: true,
      cache: true,
      // chunks: ["main", "vendors"],
      // favicon: path.resolve(__dirname, "../favicon.ico"),
    }),

    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      // 这里的配置和webpackOptions.output中的配置相似
      // 即可以通过在名字前加路径，来决定打包后的文件存在的路径
      filename: isDev ? "css/[name].css" : "css/[name].[hash].css",
      chunkFilename: isDev ? "css/[id].css" : "css/[id].[hash].css",
    }),
  ],
};
