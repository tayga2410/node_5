const Sequelize = require("sequelize");
const config = require("./config.json").development;

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

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

app.get("/turtles", async (req, res) => {
  try {
    const turtles = await db.turtles.findAll();
    res.json(turtles);
  } catch (error) {
    console.error("Ошибка при получении черепашек:", error);
    res.status(500).send("Ошибка при получении черепашек.");
  }
});

app.get("/mozarella", async (req, res) => {
  try {
    const turtlesWithMozzarella = await db.turtles.findAll({
      include: {
        model: db.pizzas,
        as: "favoritePizza",
        where: { name: "Mozzarella" },
      },
    });
    res.json(turtlesWithMozzarella);
  } catch (error) {
    console.error("Ошибка при получении черепашек с пиццей Mozzarella:", error);
    res.status(500).send("Ошибка при получении черепашек с пиццей Mozzarella.");
  }
});

app.get("/favorite-pizzas", async (req, res) => {
  try {
    const favoritePizzas = await db.pizzas.findAll({
      include: [
        {
          model: db.turtles,
          as: "favoritePizza",
          required: true,
        },
      ],
      group: ["pizzas.id"],
    });

    res.json(favoritePizzas);
  } catch (error) {
    console.error("Ошибка при получении любимых пицц:", error);
    res.status(500).send("Ошибка при получении любимых пицц.");
  }
});

app.post('/add-turtle', async (req, res) => {
  try {
    const { name, color, weaponId, favoritePizzaId } = req.body;

    const newTurtle = await db.turtles.create({
      name,
      color,
      weaponId,
      favoritePizzaId
    });
    
    res.status(201).json(newTurtle);
  } catch (error) {
    console.error('Ошибка при создании черепашки:', error);
    res.status(500).send('Ошибка при создании черепашки.');
  }
});

app.put('/update-pizzas', async (req, res) => {
  try {
    const [updatedCount] = await db.pizzas.update(
      { description: db.sequelize.fn('CONCAT', db.sequelize.col('description'), ' SUPER FAT!') }, 
      {
        where: {
          calories: {
            [db.Sequelize.Op.gt]: 3000, 
          },
        },
      }
    );

    if (updatedCount > 0) {
      res.status(200).json({ message: `${updatedCount} пицц(ы) обновлены.` });
    } else {
      res.status(404).json({ message: 'Пиццы с калориями больше 3000 не найдены.' });
    }
  } catch (error) {
    console.error('Ошибка при обновлении пицц:', error);
    res.status(500).json({ message: 'Ошибка при обновлении пицц.' });
  }
});

app.get('/weapons-count', async (req, res) => {
  try {
    const count = await db.weapons.count({
      where: {
        dps: {
          [db.Sequelize.Op.gte]: 100,
        },
      },
    });

    res.status(200).json({ count });
  } catch (error) {
    console.error('Ошибка при запросе количества оружий:', error);
    res.status(500).json({ message: 'Ошибка при запросе количества оружий.' });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
