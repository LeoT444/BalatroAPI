const Sequelize = require('sequelize');
//conexão com BD
const sequelize = new Sequelize('balatro','root','root',{
    host: 'localhost',
    port: '3306',
    dialect: 'mysql'
});
//exportar variaveis
module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}