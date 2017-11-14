var path = require('path');
var webpack = require('webpack');
var HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    devtool: 'eval-source-map',
    entry: [
        'webpack-hot-middleware/client',
        './src/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    plugins: [
        //生成html文件
        new HTMLWebpackPlugin({            
            template: './index.html',
            inject:false,
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
            'process.env.baseURI':JSON.stringify('http://10.10.147.190:11100/gitlab'),
        })
    ],
    resolve: {
        extensions: [ '.js', '.jsx']
    },
    module: {
        loaders: [
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