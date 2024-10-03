const Sequeleze = require ('sequelize');

const sequelize = new Sequeleze('mysql', 'root', '', ({
    host: '127.0.0.1',
    dialect: 'mysql'
})) 

sequelize.authenticate().then((res) => {
    console.log('sucess', res)
}).catch((err) => console.log('err', err))