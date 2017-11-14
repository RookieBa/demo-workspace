var path = require('path');
var webpack = require('webpack');
var HTMLWebpackPlugin = require('html-webpack-plugin');
//var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;//bundle大小分析

module.exports = {
    devtool: false,
    //entry: './src/index',
    entry: {
        vendor: ['antd','react',
           'react-dom','react-fetch','react-redux','react-router',
            'superagent','react-router-redux','redux','redux-react-fetch','redux-thunk',
            'history','isomorphic-fetch','js-cookie',
            'moment','pubsub-js'],
        app: "./src/index",
    },
    plugins: [
        //生成html文件
        new HTMLWebpackPlugin({
            template: './index-prod.html',
            inject:true,
            chunksSortMode:'dependency',
        }),

        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            names:["vendor","manifest"],
            minChunks: Infinity
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,// 最紧凑的输出
            comments:false,    //去掉所有注释
            compress: {
                warnings: false,// 在UglifyJs删除没有用到的代码时不输出警告
                drop_console: true,// 删除所有的 `console` 语句 还可以兼容ie浏览器
                collapse_vars: true,// 内嵌定义了但是只用到一次的变量
                reduce_vars: true,// 提取出出现多次但是没有定义成变量去引用的静态值
            },
            sourceMap: true
        }),
        //new BundleAnalyzerPlugin(),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/), //moment会将所有本地化内容和核心功能一起打包，使用 IgnorePlugin 忽略本地化内容
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
            'process.env.baseURI':JSON.stringify('http://10.10.147.190:11100/gitlab'),
        })
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle-[name]-[chunkhash].js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: require.resolve('babel-loader'),
                options: {
                    plugins: [
                        ['import', { libraryName: 'antd', style: true }],
                    ]
                },
                exclude: /node_modules/,
                include: __dirname
            }, {
                test: /\.jsx?$/,
                loader: require.resolve('babel-loader'),
                options: {
                    plugins: [
                        ['import', { libraryName: 'antd', style: true }],
                    ]
                },
                //loader: 'jsx-loader?harmony',
                exclude: /node_modules/,
                include: __dirname
            }, {
                test: /\.less?$/,
//                loader: "style!css?module&localIdentName=[hash:base64:5]&-url"
                loaders: [
                    'style-loader',
                    'css-loader',
                    'less-loader?{"sourceMap":true}'
                ],
                include: __dirname
            },{
                test: /\.css$/,
                loader: "style-loader!css-loader?module&localIdentName=[hash:base64:5]&-url"
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                loader: 'url-loader',
                query: {limit: 10240}
            }
        ]
    }
};