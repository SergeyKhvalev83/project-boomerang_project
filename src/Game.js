// Импортируем всё необходимое.
// Или можно не импортировать,
// а передавать все нужные объекты прямо из run.js при инициализации new Game().



const Hero = require('./game-models/Hero');
const Enemy = require('./game-models/Enemy');
// const Boomerang = require('./game-models/Boomerang');
const View = require('./View');
const Boomerang = require('./game-models/Boomerang');
const  popGame_result_bd = require('./game_results')


// Основной класс игры.
// Тут будут все настройки, проверки, запуск.

class Game {
  constructor({ trackLength }) {
    this.trackLength = trackLength;
    this.boomerang = new Boomerang(trackLength);
    this.hero = new Hero({ position: 0, boomerang: this.boomerang });
    this.enemy = new Enemy(trackLength);
    this.view = new View(this);
    this.track = [];
    this.regenerateTrack();
    this.countEnemyDeaths = 0
  }

  regenerateTrack() {
    // Сборка всего необходимого (герой, враг(и), оружие)
    // в единую структуру данных
    this.track = new Array(this.trackLength).fill(' ');
    this.track[this.hero.position] = this.hero.skin;
    this.track[this.enemy.position] = this.enemy.skin; // Добавьте эту строку
    if (this.hero.boomerang.position >= 0 && this.hero.boomerang.position < this.trackLength) {
      this.track[this.hero.boomerang.position] = this.hero.boomerang.skin;
    }
  }

  check() {
    if (this.hero.position === this.enemy.position) {
      this.hero.die();
    }
  }

  play() {
    setInterval(() => {
      // Let's play!
      this.handleCollisions();
      this.regenerateTrack();

      // Добавьте логику движения врагов, например, двигаться влево
      this.enemy.moveLeft();

      // Если враг достиг края трека, перемещаем его в начало
      if (this.enemy.position < 0) {
        this.enemy.position = this.trackLength - 1;
      }

      this.view.render(this.track);
    }, 100); // Вы можете настроить частоту обновления игрового цикла
  }

   async  handleCollisions() {
    if (this.hero.position === this.enemy.position) {
      this.hero.die();
      //reset to 0 count for new game
       await popGame_result_bd(null, this.countEnemyDeaths, null)
       this.countEnemyDeaths = 0
       process.exit()
    }

    if (this.boomerang.position === this.enemy.position) {
      this.enemy.die();
      // Обнуляем позицию бумеранга после столкновения с врагом
      // this.boomerang.position = -1;

      //count deths
      this.countEnemyDeaths +=1;
      this.enemy = new Enemy(this.trackLength); // Создаем нового врага
    }
  }
}



module.exports = Game;


//////////////////////////////////

// const readline = require('readline');
// const { Sequelize, DataTypes } = require('sequelize');
// const db = require("../models");

// // Функция для регистрации пользователя
// async function registerUser() {
//   try {
//     // Инициализация интерфейса для ввода/вывода

//     const rl = readline.createInterface({
//       input: process.stdin,
//       output: process.stdout
//     });
    
//     // Инициализация объекта Sequelize
//     const sequelize = new Sequelize({
//       dialect: 'postgres',
//       storage: 'postgres' // Имя файла базы данных
//     });


//     // Получение данных от пользователя
//     const name = await askQuestion('Введите имя пользователя: ');
//     const password = await askQuestion('Введите пароль: ');

//     // Создание записи в базе данных
//     await db.User.create({ name, password });

//     console.log('Пользователь успешно зарегистрирован!');
//     rl.close(); // Закрытие интерфейса ввода/вывода
//   } catch (error) {
//     console.error('Ошибка при регистрации пользователя:', error);
//   }
// }

// // Функция для задания вопроса и получения ответа от пользователя
// function askQuestion(question) {
//   return new Promise((resolve, reject) => {
//     rl.question(question, (answer) => {
//       resolve(answer);
//     });
//   });
// }

// // Запуск регистрации пользователя
// registerUser();