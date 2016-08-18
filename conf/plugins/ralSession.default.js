/**
 * @file Ral Session配置
 * @author hefangshi@baidu.com
 * http://fis.baidu.com/
 * 2016/8/18
 */

module.exports.ralSession = {
    redisOption: {
        ralID: 'RAL_SESSION',  // RAL服务ID
        prefix: 'yog2_session_' // Key的前缀，此处配置参考https://github.com/tj/connect-redis
    },
    // 以下配置参考 https://github.com/expressjs/session
    secret: 'yog',
    resave: false,
    saveUninitialized: true,
    name: 'ysid'
};
