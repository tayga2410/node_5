const Sequelize = require('sequelize');
const config = require('./config.json').development;

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
});

const db = require('./models')(Sequelize, sequelize);

sequelize.sync()
  .then(() => console.log('success'))
  .catch(err => console.error('err', err));

