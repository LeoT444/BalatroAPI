const express = require("express");
const router = express.Router();
//Importando o módulo do Carta
const Carta = require("../models/Cartas");
//Busca Carta (GET)
router.get("/", async (req, res) => {
  const cartas = await Carta.findAll();
  res.status(200).json(cartas);
});
//Cadastra Carta (POST)
router.post("/", async (req, res) => {
  const { placa } = req.body;
  const { ano } = req.body;
  const { mensalidade } = req.body;
  const { fk_proprietario } = req.body;
  const newEdit = await Carta.create({
    numero,
    pontuacao,
    fk_naipe,
  });
  res.status(200).json({ message: "Cadastrado com sucesso" });
});
//Busca Por id a Carta (GET)
router.get("/:id", async (req, res) => {
  //const id = req.params;
  const carta = await Carta.findByPk(req.params.id);
  res.status(200).json(carta);
});
//Deleta Carta por id (DELETE)
router.delete("/:id", async (req, res) => {
  await Carta.destroy({
    where: { id_carta: req.params.id },
  });
  res.status(200).json({ message: "Excluído com sucesso" });
});
//Cadastra Naipe (POST)
router.post("/", async (req, res) => {
  const { numero } = req.body;
  const { pontuacao } = req.body;
  const { fk_naipe } = req.body;
  const newEdit = await Carta.create({ numero, pontuacao, fk_naipe });
  res.status(200).json({ message: "Cadastrado com sucesso" });
});

//Altera Carta por ID (PUT)
router.put("/:id", async (req, res) => {
  const { numero } = req.body;
  const { pontuacao } = req.body;
  const { fk_naipe } = req.body;
  await Carta.update(
    { numero, pontuacao, fk_naipe },
    {
      where: { id_carta: req.params.id },
    }
  );
  res.status(200).json({ message: "Atualizado com sucesso" });
});
module.exports = router;
