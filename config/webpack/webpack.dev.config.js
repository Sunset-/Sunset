var webpack = require('webpack'),
    path = require('path'),
    autoprefixer = require('autoprefixer'),
    precss = require('precss'),
    node_modules_dir = path.join(__dirname, 'node_modules');
//html模板生成
var htmlWebpackPlugin = require('html-webpack-plugin');

//alias
const Alias = require('./alias');


var entry = {   
    index: ['webpack/hot/only-dev-server', './src/app.js'],
    opc: ['webpack/hot/only-dev-server', './src/opc.js']   
};

var output = {
    path: path.resolve(__dirname, './build'),
    filename: '[name].js'
};

var config = {
    entry: entry,
    output: output,
    module: {
        noParse: [],
        loaders: [{
            test: /\.vue$/,
            loader: 'vue-loader'
        }, {
            test: /\.js$/,
            exclude: /node_modules|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
            loader: 'babel-loader'
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader!postcss-loader'
        }, {
            test: /\.scss$/,
            loader: 'style-loader!css-loader!sass-loader'
        }, {
            test: /\.less$/,
            loader: 'style-loader!css-loader!less-loader'
        }, {
            test: /\.(gif|jpg|jpeg|png|woff|svg|eot|ttf)\??.*$/,
            loader: 'url-loader?limit=10000&name=./images/[name].[ext]'
        }]
    },
    resolve: {
        root: [process.cwd() + '/src'],
        alias: {},
        extensions: ['', '.js', '.vue', '.coffee', '.html', '.css', '.scss']
    },
    devServer: {
        contentBase: 'src/www',
        devtool: 'eval',
        hot: true,
        inline: true,
        host: '0.0.0.0',
        port: 3000,
        proxy: {
            '/service/*': {
                //  target: 'http://www.peaimage.com/',
                //target: 'http://www.peaimage.com/',
                //target:'localhost:8080/',
                target: 'http://192.168.0.148:10003/',
                //target: 'http://192.168.0.147:10000/',
                //target: 'http://192.168.0.143:8080/',
                // target: 'http://localhost:20002/',
                secure: false,
                changeOrigin: true
            },
            '/upload/*': {
                // target: 'http://www.peaimage.com',
                target: 'http://192.168.0.148:10003/',
                secure: false,
                changeOrigin: true

            },
            '/local_service/*': {
                target: 'http://192.168.0.145:80/',
                //target: 'http://192.168.0.147:10000/',
                secure: false
            },
            '/local_upload/*': {
                target: 'http://192.168.0.145:80/',
                secure: false
            },
            '/cateyes/*': {
                // target: 'http://www.peaimage.com',
                target: 'http://192.168.0.148:10003/',
                secure: false,
                changeOrigin: true

            }
        },
        outputPath: path.resolve(__dirname, './build'),
    },
    postcss: function () {
        return [autoprefixer, precss];
    },
    plugins: [
        new webpack.DllReferencePlugin({
            context: path.resolve(__dirname, '../../'), // 指定一个路径作为上下文环境，需要与DllPlugin的context参数保持一致，建议统一设置为项目根目录
            manifest: require('../../manifest.json'),
            name: 'dll'
        }),
        new htmlWebpackPlugin({
            title: '豌豆医学影像平台',
            template: './src/template/index.html',
            filename: 'index.html',
            chunks: ['vendor', 'index']
        }),
        new htmlWebpackPlugin({
            title: '豌豆医学影像工作站',
            template: './src/template/index.html',
            filename: 'opc.html',
            chunks: ['vendor', 'opc']
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
}


Alias(config);

module.exports = config;