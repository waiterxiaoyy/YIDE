const BaseController = require('./base');

class FileController extends BaseController {
  // 获取文件内容
  async getFileContent() {
    const { ctx } = this;
    const { id, name, type } = ctx.request.body;

    if (!id || !name || !type) {
      this.fail(201, 'FileId Or FileName and FileType are required');
      return;
    }
    // const filePath = path.join(this.config.baseDir, 'app/public/user', `${userInfo.username}`, `${name}`);
    const result = await ctx.service.file.getFileContent(id);
    try {
      if (result) {
        this.success(result.dataValues.content, 'success');
      } else {
        this.fail(201, 'File not found');
      }
    } catch (error) {
      this.fail(201, 'Error loading file');
    }
  }

  async getFileList() {
    const { ctx } = this;
    const userInfo = ctx.state.userinfo;
    // const dirPath = path.join(this.config.baseDir, 'app/public/user', `${userInfo.username}`);
    const result = await ctx.service.file.getFileList(userInfo);

    try {
      const data = [];

      result.forEach(file => {
        const tmp = {
          id: file.dataValues.id,
          name: file.dataValues.name,
          type: file.dataValues.name.split('.')[1]
        };
        data.push(tmp);
      });
      this.success(data, 'success');
    } catch (error) {
      this.fail(201, 'Not Discovered');
    }
  }

  async createFile() {
    const { ctx } = this;
    const userInfo = ctx.state.userinfo;
    const { name, type } = ctx.request.body;

    if (!name || !type) {
      this.fail(201, 'FileName and FileType are required');
      return;
    }

    if (
      name.split('.')[1] !== 'html' &&
      name.split('.')[1] !== 'js' &&
      name.split('.')[1] !== 'css' &&
      name.split('.')[1] !== 'md'
    ) {
      this.fail(201, 'FileName must be html, js, css or md');
      return;
    }

    if (name.split('.').length < 2) {
      this.fail(201, 'FileName must contain a suffix');
      return;
    }
    // const filePath = path.join(this.config.baseDir, 'app/public/user', `${userInfo.username}`, `${name}`);
    // 如果文件已经存在
    const existFile = await ctx.service.file.existFile(name, userInfo.id);
    if (existFile) {
      this.fail(201, 'File already exists');
      return;
    }
    try {
      const result = await ctx.service.file.createFile(name, type, userInfo.id, null);
      if (result) {
        this.success([], 'File created successfully');
      } else {
        this.fail(201, 'Error creating file');
      }
    } catch (error) {
      this.fail(201, 'Error creating file');
    }
  }

  async deleteFile() {
    const { ctx } = this;
    const { id, name, type } = ctx.request.body;
    const userInfo = ctx.state.userinfo;

    if (!name || !type) {
      ctx.body = {
        data: [],
        code: 201,
        msg: 'FileName and FileType are required'
      };
      return;
    }

    if (name === 'index.html' || name === 'script.js' || name === 'style.css') {
      ctx.body = {
        data: [],
        code: 201,
        msg: 'Cannot delete default file!'
      };
      return;
    }

    // const filePath = path.join(this.config.baseDir, 'app/public/user', `${userInfo.username}`, `${name}`);

    try {
      await ctx.service.file.delteteFile(id, userInfo);
      this.success([], 'File deleted successfully');
    } catch (error) {
      ctx.body = {
        data: [],
        code: 201,
        msg: 'Error deleting file'
      };
    }
  }

  async downloadFile() {
    const { ctx } = this;
    const { id, name, type } = ctx.request.body;
    // const userInfo = ctx.state.userinfo;

    if (!name || !type) {
      this.fail(201, 'FileName and FileType are required');
      return;
    }

    try {
      const result = await ctx.service.file.getFileContent(id);
      if (result) {
        ctx.body = result.dataValues.content;
        ctx.set('Content-Type', 'application/octet-stream');
        ctx.attachment(name);
      } else {
        this.fail(201, 'File not found');
      }
    } catch (error) {
      this.fail(201, 'Error downloading file');
    }
  }

  async updateFile() {
    const { ctx } = this;
    const { id, name, type, content } = ctx.request.body;
    const userInfo = ctx.state.userinfo;
    if (!id || !name || !type) {
      this.fail(201, 'FileID and FileName and FileType are required');
      return;
    }
    // 如果文件内容太大，拒绝
    if (content.length > 4 * 1024 * 1024) {
      this.fail(201, 'File content is too large');
      return;
    }

    // 计算一下文件的大小size
    const size = Buffer.byteLength(content, 'utf8');

    try {
      // fiteFileSync(filePath, content, 'utf8');
      await ctx.service.file.updateFile(id, content, size, userInfo);
      this.success([], 'File updated successfully');
    } catch (error) {
      this.fail(201, 'Error updating file');
    }
  }

  async updateFileList() {
    const { ctx } = this;
    const { fileList } = ctx.request.body;
    const userInfo = ctx.state.userinfo;
    if (!fileList) {
      ctx.body = {
        data: [],
        code: 201,
        msg: 'FileList is required'
      };
      return;
    }

    // const dirPath = path.join(this.config.baseDir, 'app/public/user', `${userInfo.username}`);

    try {
      fileList.forEach((item, index) => {
        const size = Buffer.byteLength(item.content, 'utf8');
        fileList[index].size = size;
      });
      await ctx.service.file.updateFileList(fileList, userInfo);
      this.success([], 'Running ......');
    } catch (error) {
      this.fail(201, 'Error run');
    }
  }
}

module.exports = FileController;
