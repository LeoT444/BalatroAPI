import React from "react";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const AddCarta = () => {
  const [carta, setCarta] = useState({
    numero: "",
    pontuacao: 0,
    fk_naipe: 0,
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setCarta((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8081/carta", carta);
      navigate("/carta");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="container">
      <h2 className="w-100 d-flex justify-content-center p-3">
        Adicionando Carta
      </h2>
      <div className="row">
        <div className="col-md-12">
          <form>
            <div className="mb-3 mt-3">
              <label className="form-label"> Valor:</label>
              <input
                type="text"
                className="form-control"
                id="numero"
                placeholder="Digite o valor do Carta"
                name="numero"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3 mt-3">
              <label className="form-label"> Pontuação:</label>
              <input
                type="integer"
                className="form-control"
                id="pontuacao"
                placeholder="Digite a pontuação do Carta"
                name="pontuacao"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3 mt-3">
              <label className="form-label"> Naipe:</label>
              <input
                type="integer"
                className="form-control"
                id="fk_naipe"
                placeholder="Digite o id do Naipe"
                name="fk_naipe"
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleClick}
            >
              Cadastrar
            </button>
            <br />
            <Link to="/carta">Listar Cartas</Link>
          </form>
        </div>
      </div>
    </div>
  );
};
export default AddCarta;
