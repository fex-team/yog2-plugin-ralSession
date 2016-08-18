ralSession
=====================

基于 ral 与 redis 的 yog2 session 插件

### 安装

```bash
yog2 plugin install https://github.com/fex-team/yog2-plugin-ralSession
```

### 配置

根据实际Redis服务情况配置RAL_SESSION

- `conf/ral/RAL_SESSION.js` 代表线上服务的 Redis 配置 (node app.js)
- `conf/ral/RAL_SESSION.dev.js` 代表开发环境的 Redis 配置 (yog2 run)

### 启用

#### 全局启用

如果希望全局启用，可以在 `conf/plugins/http.js` 的中间件配置中，在 `dispatcher` 前添加 `ral-session`

```javascript
module.exports.http = {
    /***************************************************************************
     *
     * Middleware配置
     *
     * 用于管理加载哪些中间件，以及这些中间件的加载顺序
     *
     * 配置中可以通过字符串引用中间件插件，默认配置中均是Yog2的默认中间件
     *
     * 配置中也可以通过function(req, res, next){}的形式加载中间件而无需使用插件管理
     *
     ***************************************************************************/
    middleware: [
        'favicon',
        'compression',
        'static',
        'responseTime',
        'cookieParser',
        'bodyParser',
        'log',
        'ral',
        'views',
        'ralSession',
        'methodOverride',
        'dispatcher',
        'notFound',
        'error'
    ]
};
```

#### APP启用

如果希望仅在某个APP内启用，可以在 APP的 router.js 中调用

```javascript
export default router => {
  // 启用 session
  yog.pluginFactories.ralSession(router)();
}
```

如果希望使用与全局配置不一样的配置，也可以传入相应的配置

```javascript
export default router => {
  let conf = yog.conf.ralSession;
  // 修改前缀
  conf.redisOption.prefix = 'MIS_SESSION_';
  // 启用 session
  yog.pluginFactories.ralSession(router)(conf);
}
```
