const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const isDev = process.env.NODE_ENV === "development";
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const config = {
  entry: path.resolve(__dirname, "../src/main.tsx"),
  stats: 'errors-only',
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.(jsx?|tsx?)$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, "../src"),
        loader: "eslint-loader",
        options: {
          emitWarning: true, // 这个配置需要打开，才能在控制台输出warning信息
          emitError: true, // 这个配置需要打开，才能在控制台输出error信息
          fix: true, // 是否自动修复，如果是，每次保存时会自动修复可以修复的部分
        },
      },
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
          "postcss-loader",
          "less-loader",
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [
      ".tsx",
      ".ts",
      ".js",
      ".jsx",
      ".less",
      ".scss",
      ".css",
      ".json",
    ],
    plugins: [
      // 将 tsconfig.json 中的路径配置映射到 webpack 中
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, "../tsconfig.json"),
      }),
    ],
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["**/*", "!dll", "!dll/**"], //不删除dll目录
    }),
    new HtmlWebpackPlugin({
      title: "首页",
      template: path.resolve(__dirname, "../public/index.html"),
      inject: true,
      hash: true,
      cache: true,
      // chunks: ["main", "vendors"],
      // favicon: path.resolve(__dirname, "../favicon.ico"),
    }),
    new MiniCssExtractPlugin({
      // 这里的配置和webpackOptions.output中的配置相似
      // 即可以通过在名字前加路径，来决定打包后的文件存在的路径
      filename: isDev ? "css/[name].css" : "css/[name].[hash].css",
      chunkFilename: isDev ? "css/[id].css" : "css/[id].[hash].css",
    }),
  ],
};

module.exports = config
