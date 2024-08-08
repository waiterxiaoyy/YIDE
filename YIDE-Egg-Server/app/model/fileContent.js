module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const FileContent = app.model.define('file_content', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    file_id: { type: INTEGER },
    content: { type: STRING(10000) },
    create_time: { type: DATE },
    update_time: { type: DATE }
  });
  FileContent.associate = () => {
    app.model.FileContent.belongsTo(app.model.File, { foreignKey: 'file_id' });
  };
  return FileContent;
};
