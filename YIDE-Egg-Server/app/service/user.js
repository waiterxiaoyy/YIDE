const { Service } = require('egg');

class UserService extends Service {
  async getUser(username, password) {
    const user = await this.ctx.model.User.findOne({
      where: {
        username,
        password
      }
    });
    return user;
  }

  async existUser(username) {
    const count = await this.ctx.model.User.count({
      where: {
        username
      }
    });
    return count;
  }

  async registerUser(username, password) {
    const t = await this.app.model.transaction();
    try {
      // 创建用户
      const user = await this.app.model.User.create(
        { username, password, phone: '', avatar: '', create_time: new Date(), update_time: new Date() },
        { transaction: t }
      );

      // 创建文件信息
      const files = [
        { name: 'index.html', type: 'html', user_id: user.dataValues.id },
        { name: 'style.css', type: 'css', user_id: user.dataValues.id },
        { name: 'script.js', type: 'js', user_id: user.dataValues.id }
      ];
      await Promise.all(
        files.map(async file => {
          try {
            const createdFile = await this.ctx.service.file.createFile(file.name, file.type, file.user_id, t);
            return createdFile;
          } catch (error) {
            throw error;
          }
        })
      );
      await t.commit();
      return user;
    } catch (error) {
      await t.rollback();
      return false;
    }
  }

  async getUserById(id) {
    const user = await this.ctx.model.User.findOne({
      where: {
        id
      }
    });
    return user;
  }
}

module.exports = UserService;
