const db = require("./db");
const Carta = db.sequelize.define(
  "carta",
  {
    id_carta: {
      type: db.Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    numero: {
      type: db.Sequelize.TEXT,
    },
    pontuacao: {
      type: db.Sequelize.INTEGER,
    },
    fk_naipe: {
      type: db.Sequelize.INTEGER,
      references: { model: "Naipe", key: "id_naipe" },
      onDelete: "CASCADE",
      allowNull: false,
    },
  },
  { freezeTableName: true }
);

Carta.sync({ force: true });

module.exports = Carta;
