// Основной файл.
// Запускает игру.
const Game = require('./src/Game');
const runInteractiveConsole = require('./src/keyboard');
const game_results = require("./src/game_results")
const { registerUser } = require('./src/register');



// Инициализация игры с настройками.
async function playGame() {
  const game = new Game({
    trackLength: 30,
  });
  await registerUser();

  // Запуск игры.
  game.play();

  runInteractiveConsole(game);
}

playGame();