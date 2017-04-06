const path = require('path');

module.exports = {
    contentBase: 'src/www',
    devtool: 'eval',
    hot: true,
    inline: true,
    host: '0.0.0.0',
    port: 3002,
    proxy: {
        '/service/*': {
            target: 'http://127.0.0.1:20000/',
            secure: false
        },
        '/upload/*': {
            target: 'http://192.168.0.148:10003/',
            secure: false
        },
        '/manage-service/*': {
            target: 'http://127.0.0.1:20000/',
            secure: false
        },
        '/business-service/*': {
            target: 'http://127.0.0.1:20000/',
            secure: false
        }
    },
    outputPath: path.resolve(__dirname, './build'),
};