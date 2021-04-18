const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    'empData_DB',
    'root',
    process.env.MY_DB_PW,
    {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    }
);
module.exports = sequelize;
