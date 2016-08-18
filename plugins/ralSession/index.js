var session = require('express-session');
var RedisStore = require('connect-redis')(session);

module.exports['ralSession'] = ['ral', function(app, conf){
    conf.redisOption.client = new RedisClient(conf.redisOption);
    conf.store = new RedisStore(conf.redisOption);
    return function(){
        app.use(session(conf));
    };
}];

module.exports['ralSession'].defaultConf = {
    redisOption: {
        ralID: 'SESSION',
        prefix: 'yog2_session_'
    },
    secret: yog.conf.cookieParser.secret || 'yog',
    resave: false,
    saveUninitialized: true,
    name: 'ysid'
}

function RedisClient (options) {
    this.ralID = options.ralID;
}

RedisClient.prototype.get = function(key, cb) {
    yog.ralP(this.ralID, {
        method: 'get',
        data: key
    }).then(function (data) {
        cb(null, data);
    }).catch(cb);
};

RedisClient.prototype.set = function(args, cb) {
    yog.ralP(this.ralID, {
        method: 'set',
        data: args
    }).then(function (data) {
        cb(null, data);
    }).catch(cb);
};

RedisClient.prototype.del = function(key, cb) {
    yog.ralP(this.ralID, {
        method: 'del',
        data: key
    }).then(function (data) {
        cb(null, data);
    }).catch(cb);
};

RedisClient.prototype.expire = function(key, value, cb) {
    yog.ralP(this.ralID, {
        method: 'expire',
        data: {
            key: key,
            value: value
        }
    }).then(function (data) {
        cb(null, data);
    }).catch(cb);
};


RedisClient.prototype.on = function() {
};
