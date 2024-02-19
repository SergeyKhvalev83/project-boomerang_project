'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Game_results extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Game_results.init({
    time: DataTypes.DATE,
    score: DataTypes.STRING,
    users_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Game_results',
  });
  return Game_results;
};