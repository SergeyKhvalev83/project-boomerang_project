require("dotenv").config();
console.log(process.env.DB_DATABASE, process.env.DB_PASSWORD);
const { Sequelize, Op } = require("sequelize");


async function testConnection() {
  try {
    const sequelize = await new Sequelize({
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      dialect: process.env.DB_DIALECT,
    });

    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

testConnection() 