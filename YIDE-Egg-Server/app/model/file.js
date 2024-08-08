module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const File = app.model.define('file', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    user_id: INTEGER,
    name: STRING(30),
    type: STRING(30),
    size: {
      type: INTEGER,
      defaultValue: 0
    },
    create_time: DATE
  });

  File.associate = () => {
    app.model.File.hasOne(app.model.FileContent, { foreignKey: 'file_id' });
  };
  return File;
};
