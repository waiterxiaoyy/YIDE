const Controller = require('egg').Controller;

class BaseController extends Controller {
  success(data, msg, code) {
    this.ctx.body = {
      code: code ? code : 200,
      msg,
      data
    };
  }

  fail(code, msg) {
    this.ctx.body = {
      code,
      msg,
      data: []
    };
  }
}

module.exports = BaseController;
