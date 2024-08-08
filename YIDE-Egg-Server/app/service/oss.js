const Service = require('egg').Service;
const OSS = require('ali-oss');

class OssService extends Service {
  constructor(ctx) {
    super(ctx);
    this.client = new OSS(ctx.app.config.oss.client);
  }

  async upload(filePath, fileName, targetDir) {
    try {
      // 拼接文件路径
      const targetPath = `${targetDir}/${fileName}`;
      const result = await this.client.put(targetPath, filePath);
      return result;
    } catch (err) {
      this.ctx.logger.error(err);
      throw err;
    }
  }
}

module.exports = OssService;
