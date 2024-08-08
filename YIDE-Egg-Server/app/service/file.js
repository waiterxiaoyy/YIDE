const { Service } = require('egg');

class FileService extends Service {
  async existFile(name, userId) {
    const result = await this.ctx.model.File.findOne({
      where: {
        name,
        user_id: userId
      }
    });
    return result;
  }

  async getFileWithContent(name, userId) {
    try {
      const fileWithContent = await this.ctx.model.File.findOne({
        where: {
          name,
          user_id: userId
        },
        include: {
          model: this.ctx.model.FileContent,
          attributes: ['content']
        }
      });
      if (!fileWithContent) {
        return null;
      }

      const result = {
        id: fileWithContent.dataValues.id,
        name: fileWithContent.dataValues.name,
        user_id: fileWithContent.dataValues.user_id,
        content: fileWithContent.dataValues.file_content.dataValues.content
          ? fileWithContent.dataValues.file_content.dataValues.content
          : ''
      };

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getFileList(userinfo) {
    const result = await this.ctx.model.File.findAll({
      where: {
        user_id: userinfo.id
      }
    });
    return result;
  }

  async getFileContent(fileId) {
    const result = await this.ctx.model.FileContent.findOne({
      where: {
        file_id: fileId
      }
    });
    return result;
  }

  async createFile(name, type, userId, t) {
    console.log('name', name, type, userId);
    const transaction = t || (await this.app.model.transaction());

    try {
      const file = await this.app.model.File.create(
        {
          name,
          type,
          size: 0,
          user_id: userId,
          create_time: new Date()
        },
        { transaction }
      );

      // 初始化文件内容
      let initialContent = '';
      if (type === 'html') {
        initialContent = `     
        <div>
            <h1>Welcome to YIDE</h1>
        </div>`;
      } else if (type === 'css') {
        initialContent = `
        body {
            color: #e56e0c;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }`;
      } else if (type === 'js' || type === 'javascript') {
        initialContent = `
        document.addEventListener('DOMContentLoaded', function () { 
            console.log('JavaScript loaded for YIDE'); 
        });
        `;
      }

      await this.app.model.FileContent.create(
        {
          file_id: file.id,
          content: initialContent,
          create_time: new Date(),
          update_time: new Date()
        },
        { transaction }
      );

      if (!t) {
        await transaction.commit();
      }
      return file;
    } catch (error) {
      if (!t) {
        await transaction.rollback();
      }
      throw error;
    }
  }

  async updateFile(fileId, content, size, userinfo) {
    const t = await this.app.model.transaction();
    try {
      await this.app.model.File.update(
        {
          size
        },
        {
          where: {
            id: fileId,
            user_id: userinfo.id
          }
        },
        { transaction: t }
      );
      await this.app.model.FileContent.update(
        {
          content,
          update_time: new Date()
        },
        {
          where: {
            file_id: fileId
          }
        },
        { transaction: t }
      );
      await t.commit();
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  async updateFileList(fileList, userinfo) {
    const t = await this.app.model.transaction();
    try {
      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        await this.app.model.File.update(
          {
            name: file.name,
            size: file.size
          },
          {
            where: {
              id: file.id,
              user_id: userinfo.id
            }
          },
          { transaction: t }
        );
        await this.app.model.FileContent.update(
          {
            content: file.content,
            update_time: new Date()
          },
          {
            where: {
              file_id: file.id
            }
          },
          { transaction: t }
        );
      }
      await t.commit();
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  async delteteFile(fileId, userinfo) {
    const t = await this.app.model.transaction();
    try {
      await this.app.model.FileContent.destroy(
        {
          where: {
            file_id: fileId
          }
        },
        { transaction: t }
      );
      await this.app.model.File.destroy(
        {
          where: {
            id: fileId,
            user_id: userinfo.id
          }
        },
        { transaction: t }
      );
      await t.commit();
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }
}

module.exports = FileService;
