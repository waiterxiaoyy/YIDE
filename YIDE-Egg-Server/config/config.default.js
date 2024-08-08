/* eslint valid-jsdoc: "off" */
const path = require('path');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1722054824273_6860';

  // add your middleware config here
  config.middleware = [];

  // CORS 配置
  config.security = {
    csrf: {
      enable: false
    },
    xframe: {
      enable: false
    },
    domainWhiteList: [
      'http://localhost:3001',
      'http://127.0.0.1:3001',
      'http://localhost:3306',
      'http://127.0.0.1:5173/',
      'http://localhost:5173',
      'https://waiterxiaoyy.github.io'
    ]
  };

  config.cors = {
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
    // credentials: true // 如果需要支持跨域请求发送 cookie
  };

  // 其他配置项...
  config.cluster = {
    listen: {
      port: 8000
    }
  };

  config.bodyParser = {
    jsonLimit: '10mb', // 限制 JSON 请求的大小为 2MB
    formLimit: '10mb' // 限制表单请求的大小为 2MB
  };

  config.static = {
    prefix: '/',
    dir: path.join(appInfo.baseDir, 'app/public')
  };

  config.mysql = {
    app: true,
    agent: false,
    client: {
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: 'your_password',
      database: 'yide'
    }
  };

  config.sequelize = {
    dialect: 'mysql',
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'your_password',
    database: 'yide',
    define: {
      timestamps: false,
      freezeTableName: true
    }
  };

  config.oss = {
    client: {
      region: 'oss-cn-beijing',
      accessKeyId: '',
      accessKeySecret: '',
      bucket: ''
    }
  };

  config.jwt = {
    secret: 'youre_secret'
  };

  const userConfig = {
    salt: 'youre_secret'
  };

  return {
    ...config,
    ...userConfig
  };
};
