const Sequelize = require("sequelize");
const config = require("./config.json").development;

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
  }
);

const db = require("./models")(Sequelize, sequelize);

sequelize
  .sync()
  .then(() => console.log("success"))
  .catch((err) => console.error("err", err));

  app.get('/turtles', async (req, res) => {
    try {
      const turtles = await db.turtles.findAll(); 
      res.json(turtles);
    } catch (error) {
      console.error('Ошибка при получении черепашек:', error);
      res.status(500).send('Ошибка при получении черепашек.');
    }
  });

  app.get('/mozarella', async (req, res) => {
    try {
      const turtlesWithMozzarella = await db.turtles.findAll({
        include: {
          model: db.pizzas,
          as: 'favoritePizza',
          where: { name: 'Mozzarella' }
        }
      });
      res.json(turtlesWithMozzarella);
    } catch (error) {
      console.error('Ошибка при получении черепашек с пиццей Mozzarella:', error);
      res.status(500).send('Ошибка при получении черепашек с пиццей Mozzarella.');
    }
  });



  app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
  });