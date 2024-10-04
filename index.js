const Sequelize = require("sequelize");
const config = require("./config.json").development;

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

  db.weapons.bulkCreate([
    {
      name: "Katana",
      dps: 100
    },
    {
      name: "Nunchaku",
      dps: 80
    },
    {
      name: "Bo Staff",
      dps: 70
    },
    {
      name: "Sai",
      dps: 90
    }
  ])
  .then(() => console.log("Weapons created"))
  .catch(err => console.error("Error creating weapons:", err));

  db.pizzas.bulkCreate([
    {
      name: "Mozzarella",
      description: "Classic Mozzarella Pizza",
      calories: 800
    },
    {
      name: "Pepperoni",
      description: "Spicy Pepperoni Pizza",
      calories: 900
    },
    {
      name: "Hawaiian",
      description: "Pizza with ham and pineapple",
      calories: 850
    },
    {
      name: "Veggie",
      description: "Pizza with mixed vegetables",
      calories: 700
    }
  ])
  .then(() => console.log("Pizzas created"))
  .catch(err => console.error("Error creating pizzas:", err));

  db.turtles.bulkCreate([
    {
      name: "Leonardo",
      color: "Blue",
      weaponId: 1, 
      firstFavoritePizzaId: 1, 
      secondFavoritePizzaId: 2 
    },
    {
      name: "Michelangelo",
      color: "Orange",
      weaponId: 2,  
      firstFavoritePizzaId: 2, 
      secondFavoritePizzaId: 3  
    },
    {
      name: "Donatello",
      color: "Purple",
      weaponId: 3, 
      firstFavoritePizzaId: 4, 
      secondFavoritePizzaId: 1  
    },
    {
      name: "Raphael",
      color: "Red",
      weaponId: 4, 
      firstFavoritePizzaId: 3,  
      secondFavoritePizzaId: 4  
    }
  ])
  .then(() => console.log("Turtles created"))
  .catch(err => console.error("Error creating turtles:", err));