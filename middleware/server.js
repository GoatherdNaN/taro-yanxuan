/**
 * node中间件实现请求代理
 */
var express = require('express')
var proxy = require('http-proxy-middleware');

var app = express();

app.use('/', proxy({
    // 代理跨域目标接口
    target: 'https://www.heyuhsuo.xyz/heyushuo',
    changeOrigin: true,

    // 修改响应头信息，实现跨域并允许带cookie
    onProxyRes: function(proxyRes, req, res) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        //允许请求资源的方式
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By", ' 3.2.1');
        res.header("Content-Type", "application/json;charset=utf-8");
        res.header('Access-Control-Allow-Credentials', 'true');
    },

    // 修改响应信息中的cookie域名
    cookieDomainRewrite: false  // 可以为false，表示不修改
}));

app.listen('3000', function(err) {
    if (err) {
        return;
    }
    console.log('Listening at localhost:3000');
});
