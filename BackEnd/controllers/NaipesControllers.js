const express = require("express");
const router = express.Router();
//Importando o módulo do Proprietário
const Naipe = require("../models/Naipes");
//Busca Naipes (GET)
router.get("/", async (req, res) => {
  const naipes = await Naipe.findAll();
  res.status(200).json(naipes);
});
//Cadastra Naipes (POST)
router.post("/", async (req, res) => {
  const { nome } = req.body;
  const { cor } = req.body;
  const newEdit = await Naipe.create({ nome, cor });
  res.status(200).json({ message: "Cadastrado com sucesso" });
});
//Busca Por id a Naipes (GET)
router.get("/:id", async (req, res) => {
  //const id = req.params;
  const naipe = await Naipe.findByPk(req.params.id);
  res.status(200).json(naipe);
});
//Deleta Naipes por id (DELETE)
router.delete("/:id", async (req, res) => {
  await Naipe.destroy({
    where: {
      id_naipe: req.params.id,
    },
  });
  res.status(200).json({ message: "Excluído com sucesso" });
});
//Altera Naipes por ID (PUT)
router.put("/:id", async (req, res) => {
  const { nome } = req.body;
  const { cor } = req.body;
  await Naipe.update(
    { nome, cor },
    {
      where: { id_naipe: req.params.id },
    }
  );
  res.status(200).json({ message: "Atualizado com sucesso" });
});
module.exports = router;
