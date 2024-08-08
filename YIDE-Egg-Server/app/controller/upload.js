const path = require('path');
const fs = require('fs');
const BaseController = require('./base');

class UploadController extends BaseController {
  async upload() {
    const { ctx, service } = this;
    const stream = await ctx.getFileStream();
    const uploadPath = path.join(this.config.baseDir, 'app/public/uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    const filePath = path.join(uploadPath, stream.filename);

    const writeStream = fs.createWriteStream(filePath);
    const targetDir = ctx.request.body.targetDir || 'site/images'; // 从请求中获取目标目录

    try {
      await new Promise((resolve, reject) => {
        stream.pipe(writeStream);
        writeStream.on('finish', resolve);
        writeStream.on('error', reject);
      });

      const result = await service.oss.upload(filePath, stream.filename, targetDir);

      this.success({
        url: result.url,
        fields: result
      });
    } catch (err) {
      this.fail(500, 'Upload failed');
    } finally {
      fs.promises.unlink(filePath).catch(() => {});
    }
  }
}

module.exports = UploadController;
