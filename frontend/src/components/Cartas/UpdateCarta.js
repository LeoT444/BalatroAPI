import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
function UpdateCarta() {
    const { id_carta } = useParams();
    const [carta, setCarta] = useState({
        numero: "",
        pontuacao: 0,
        fk_naipe: 0,
    });
    const navigate = useNavigate();
    const handleChange = (e) => {
        setCarta((prev) => ({
            ...prev, [e.target.name]:
                e.target.value
        }));
    };
    useEffect(() => {
        axios.get("http://localhost:8081/carta/" + id_carta)
            .then(res => {
                console.log(res);
                setCarta(res.data);
            })
            .catch(err => console.log(err))
    }, [id_carta]);
    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8081/carta/${id_carta}`,
                carta);
            navigate("/carta");
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <>
            <div className="container">
                <h1>Formulário para Editar o Carta</h1>
                <form>
                    <div className="mb-3 mt-3">
                        <label className="form-label"> ID:</label>
                        <input type="text" className="form-control" id="id"
                            placeholder="ID"
                            name="id" value={carta.id_carta}
                            disabled onChange={handleChange} />
                    </div>
                    <div className="mb-3 mt-3">
                        <label className="form-label"> Nome</label>
                        <input type="text" className="form-control" id="numero"
                            placeholder="Valor da Carta"
                            name="numero" value={carta.numero}
                            onChange={handleChange} />
                    </div>
                    <div className="mb-3 mt-3">
                        <label className="form-label"> Cor</label>
                        <input type="text" className="form-control" id="pontuacao"
                            placeholder="Pontuação da Carta"
                            name="pontuacao" value={carta.pontuacao}
                            onChange={handleChange} />
                    </div>
                    <div className="mb-3 mt-3">
                        <label className="form-label"> Naipe:</label>
                        <input type="text" className="form-control" id="fk_naipe"
                            placeholder="Digite o id do Naipe"
                            name="fk_naipe" value={carta.fk_naipe}
                            onChange={handleChange} />
                    </div>
                    <div className="mb-3 mt-3">
                        <label className="form-label">createdAt:</label>
                        <input type="text" className="form-control"
                            id="createdAt" placeholder="Data da criação"
                            name="createdAt" value={new
                                Date(carta.createdAt).toLocaleDateString()}
                            onChange={handleChange} />
                    </div>
                    <div className="mb-3 mt-3">
                        <label className="form-label">updatedAt:</label>
                        <input type="text" className="form-control"
                            id="updatedAt" placeholder="Data de Alteração"
                            name="updatedAt" value={new
                                Date(carta.updatedAt).toLocaleDateString()}
                            onChange={handleChange} />
                    </div>
                    <button type="submit" className="btn btn-primary"
                        onClick={handleClick}>Alterar</button>
                </form>
                <div className='container d-flex justify-content-center'>
                    <Link to="/carta">Veja todos as cartas</Link>
                </div>
            </div>
        </>


    )
}
export default UpdateCarta;