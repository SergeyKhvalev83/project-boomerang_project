const readline = require('readline');
const { Sequelize, DataTypes } = require('sequelize');
const db = require("../models");

// Инициализация интерфейса для ввода/вывода
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Инициализация объекта Sequelize
const sequelize = new Sequelize({
  dialect: 'postgres',
  storage: 'postgres' // Имя файла базы данных
});


// Функция для регистрации пользователя
async function registerUser() {
  try {
    // Получение данных от пользователя
    const name = await askQuestion('Введите имя пользователя: ');
    const password = await askQuestion('Введите пароль: ');

    // Проверка наличия пользователя в базе данных
    const existingUser = await db.User.findOne({ where: { name, password } });
      if (existingUser) {
        console.log('Пользователь с таким именем и паролем уже существует в базе данных.');
//        rl.close(); // Закрытие интерфейса ввода/вывода
        return; // Завершение функции без добавления записи в базу данных
      }

    // Создание записи в базе данных
    await db.User.create({ name, password });

    console.log('Пользователь успешно зарегистрирован!');
  //  rl.close(); // Закрытие интерфейса ввода/вывода 
  } catch (error) {
    console.error('Ошибка при регистрации пользователя:', error);
  }
}

// Функция для задания вопроса и получения ответа от пользователя
function askQuestion(question) {
  return new Promise((resolve, reject) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

// Запуск регистрации пользователя
// registerUser();

module.exports = { registerUser };

