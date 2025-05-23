const db = require("./db");
const Naipe = db.sequelize.define(
  "naipe",
  {
    id_naipe: {
      type: db.Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    nome: {
      type: db.Sequelize.TEXT,
    },
    cor: {
      type: db.Sequelize.TEXT,
    },
  },
  { freezeTableName: true }
);
Naipe.sync({ force: true });
module.exports = Naipe;
