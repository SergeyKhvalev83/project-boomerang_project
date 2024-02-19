'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    name: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};



async function addSingleUser(singleUserObj) {
  const { name, password } =
    singleUserObj;

  try {
    await User.create({
      name,
    password
    });
    console.log("Single user added successfully");
  } catch (errSingleUserCreate) {
    console.log({ "single user greation problem": errSingleUserCreate });
  }
}