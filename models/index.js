const Turtle = require('./turtle');
const Weapon = require('./weapon');
const Pizza = require('./pizza');

module.exports = (Sequelize, sequelize) => {
  const turtles = Turtle(Sequelize, sequelize);
  const weapons = Weapon(Sequelize, sequelize);
  const pizzas = Pizza(Sequelize, sequelize);

  turtles.belongsTo(weapons, { foreignKey: 'weaponId' });
  turtles.belongsTo(pizzas, { foreignKey: 'firstFavoritePizzaId' });
  turtles.belongsTo(pizzas, { foreignKey: 'secondFavoritePizzaId' });

  return {
    turtles,
    weapons,
    pizzas,
    sequelize,
    Sequelize
  };
};
