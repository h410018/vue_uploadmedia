var jwt = require("jsonwebtoken");
var ep = require('./secretkey');
var sha256 = require('js-sha256');


module.exports = {
    jwtVaildate: function(req, res, next, headers) {
        if ('authorization' in headers) { // 如果 cookie 裡有 token
            console.log(headers.authorization)
            const token = headers.authorization
            const secretKey = sha256(ep.secret)
            try {
                var verify = jwt.verify(token, secretKey); // 驗證 token
                if (verify != null) {
                    console.log(verify);
                    next(); // 轉移控制權給下一個有相同 path 的路由
                } else {
                    res.status(401).json({
                        error: 'Unauthorized'
                    });
                }
            } catch (e) {
                res.status(401).json({
                    error: 'Unauthorized'
                });
                console.log(e);
            }
        } else {
            res.status(401).json({
                error: 'Unauthorized'
            });
        }
    }
}