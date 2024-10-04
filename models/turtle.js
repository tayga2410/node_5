// turtle.js
module.exports = (Sequelize, sequelize) => {
  return sequelize.define('turtles', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    color: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    weaponId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    favoritePizzaId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'pizzas',
        key: 'id'
      }
    },
  });
};
