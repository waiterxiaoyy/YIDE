/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  const jwtAuth = middleware.jwtauth();
  router.post('/api/compile', jwtAuth, controller.complie.complileHtml);
  router.post('/api/fileContent', jwtAuth, controller.file.getFileContent);
  router.post('/api/fileList', jwtAuth, controller.file.getFileList);
  router.post('/api/createFile', jwtAuth, controller.file.createFile);
  router.post('/api/deleteFile', jwtAuth, controller.file.deleteFile);
  router.post('/api/download', jwtAuth, controller.file.downloadFile);
  router.post('/api/updateFile', jwtAuth, controller.file.updateFile);
  router.post('/api/updateFileList', jwtAuth, controller.file.updateFileList);

  router.post('/api/login', controller.user.login);
  router.post('/api/upload', controller.upload.upload);
  router.get('/api/getUser', jwtAuth, controller.user.getUser);
};
