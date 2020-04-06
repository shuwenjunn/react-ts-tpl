const path=require('path')
const webpack=require('webpack')
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    entry: {
        react: ['react', 'react-dom']
    },
    mode: 'production',
    output: {
        filename: '[name].dll.[hash:6].js',
        path: path.resolve(__dirname, '../dist/dll'),
        library: '[name]_dll' //暴露给外部使用
        //libraryTarget 指定如何暴露内容，缺省时就是 var
    },
    plugins: [
        // 清除上一次生成的文件
        new CleanWebpackPlugin( {
            root: path.resolve(__dirname, '../dist/dll'),
            verbose: true, 
            dry: false,
        }),
        new webpack.DllPlugin({
            //name和library一致
            name: '[name]_dll', 
            path: path.resolve(__dirname, '../dist/dll', 'manifest.json') //manifest.json的生成路径
        })
    ]
}