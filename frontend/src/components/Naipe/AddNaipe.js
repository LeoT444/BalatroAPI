import React from 'react'
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const AddNaipe = () => {
    const [naipe, setNaipe] = useState({
        nome: "",
        cor: "",
    });
    const navigate = useNavigate();
    const handleChange = (e) => {
        setNaipe((prev) => ({
            ...prev, [e.target.name]: e.target.value
        }));
    };
    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8081/naipe",
                naipe);
            navigate("/naipe");
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className="container">
            <h2 className='w-100 d-flex justify-content-center p-3'>Adicionando
                Naipe</h2>
            <div className='row'>
                <div className='col-md-12'>
                    <form>
                        <div className="mb-3 mt-3">
                            <label className="form-label"> Nome:</label>
                            <input type="text" className="form-control" id="nome"
                                placeholder="Digite o nome do Naipe" name="nome"
                                onChange={handleChange} />
                        </div>
                        <div className="mb-3 mt-3">
                            <label className="form-label"> Cor:</label>
                            <input type="text" className="form-control" id="cor"
                                placeholder="Digite a sua Cor" name="cor"
                                onChange={handleChange} />
                        </div>
                        <button type="submit" className="btn btn-primary"
                            onClick={handleClick}>Cadastrar</button>
                        <br />
                        <Link to="/naipe">Listar Naipes</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default AddNaipe;