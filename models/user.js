const bcrypt = require('bcryptjs');

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("User", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    avatar: {
      type: Sequelize.STRING,
      allowNull: true
    }
  },
  {
    instanceMethods: {
      validPassword: (password) => {
      return bcrypt.compareSync(password, this.password);
      }
    }
  });
  User.prototype.validPassword = (password, hash) => {
  return bcrypt.compareSync(password, hash);
  }
  return User;
};