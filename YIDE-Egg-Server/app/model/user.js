module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    username: STRING(30),
    password: STRING(30),
    avatar: STRING(500),
    phone: STRING(11),
    create_time: DATE,
    update_time: DATE
  });
  return User;
};
