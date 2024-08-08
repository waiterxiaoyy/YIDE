const BaseController = require('./base');

const validateString = input => {
  // 检查是否为空
  if (!input) return false;

  // 检查是否含有大写字母
  if (/[A-Z]/.test(input)) return false;

  // 检查是否含有特殊字符
  if (/[^a-z0-9]/.test(input)) return false;

  // 检查是否含有横杠或斜杠
  if (/[-\/]/.test(input)) return false;

  // 检查首字母是否为数字
  if (/^[0-9]/.test(input)) return false;

  // 如果所有检查都通过，则返回 true
  return true;
};

const validateCredentials = (username, password) => {
  // 检查 username 的长度
  if (username.length < 3 || username.length > 20) {
    return {
      isValid: false,
      message: 'Username must be between 3 and 20 characters long.'
    };
  }

  // 校验 password 的合法性
  const passwordRegex = /^[a-zA-Z0-9]+$/;
  if (password.length <= 6) {
    return {
      isValid: false,
      message: 'Password must be longer than 6 characters.'
    };
  }
  if (!passwordRegex.test(password)) {
    return {
      isValid: false,
      message: 'Password must only contain letters and numbers.'
    };
  }

  // 如果所有校验都通过
  return {
    isValid: true,
    message: 'Credentials are valid.'
  };
};

class UserController extends BaseController {
  async jwtSign({ id, username }) {
    const { app } = this;
    const token = app.jwt.sign(
      {
        id,
        username
      },
      app.config.jwt.secret,
      { expiresIn: '48h' }
    );
    return token;
  }

  async login() {
    const { ctx } = this;
    const { username, password } = ctx.request.body;
    if (!username || !password) {
      this.fail(201, 'UserName or PassWord is None');
      return;
    }
    const validate = validateCredentials(username, password);
    if (!validate.isValid) {
      this.fail(201, validate.message);
      return;
    }
    const user = await ctx.service.user.getUser(username, password);
    if (user) {
      const token = await this.jwtSign({
        id: user.id,
        username: user.username
      });
      this.success(token, 'Login Suceess');
    } else {
      const userExist = await ctx.service.user.existUser(username);
      if (userExist) {
        this.fail(201, 'User Exist!  Change UserName');
      } else {
        if (validateString(username) === false) {
          this.fail(201, 'UserName is invalid!  UserName must be lowercase and contain only letters and numbers');
          return;
        }
        const userCreateStatus = await ctx.service.user.registerUser(username, password);
        if (userCreateStatus) {
          const token = await this.jwtSign({
            id: userCreateStatus.dataValues.id,
            username: userCreateStatus.dataValues.username
          });
          this.success(token, 'Registe Suceess, Please Login', 300);
        } else {
          this.fail(201, 'Registe Failed');
        }
      }
    }
  }

  async getUser() {
    const { ctx } = this;
    const userinfo = ctx.state.userinfo;
    // const userinfo = ctx.app.jwt.verify(ctx.header.token, ctx.app.config.jwt.secret);
    if (userinfo) {
      const user = await ctx.service.user.getUserById(userinfo.id);
      this.success(user, 'success');
    } else {
      this.fail(201, 'User not found');
    }
  }
}

module.exports = UserController;
