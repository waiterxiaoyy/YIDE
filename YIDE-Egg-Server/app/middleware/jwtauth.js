module.exports = () => {
  return async (ctx, next) => {
    const {
      app,
      header: { token }
    } = ctx;
    if (!token) {
      ctx.body = {
        msg: 'Loss Token',
        code: 401
      };
      return;
    }
    try {
      const userinfo = app.jwt.verify(token, app.config.jwt.secret);
      ctx.state.userinfo = userinfo;

      await next();
    } catch (error) {
      // 打印一下请求的路径
      console.log('error', ctx.request.url);
      console.log('token', token);
      ctx.body = {
        msg: 'Token is expired',
        code: 201
      };
    }
  };
};
