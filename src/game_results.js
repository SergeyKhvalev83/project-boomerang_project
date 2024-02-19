const { Sequelize, DataTypes } = require('sequelize');
const db = require("../models");

// Инициализация интерфейса для ввода/вывода

// Функция для регистрации пользователя
async function popGame_result_bd(time, score, user_id) {
  try {
  
    await db.Game_results.create({time:time, score:score, user_id:user_id} );

    console.log('Результаты игры добавлены успешно');
  } catch (error) {
    console.log('Ошибка при добавлении результатов игры:', error);
  }
}

// popGame_result_bd(null, "32432", null)

module.exports = popGame_result_bd
