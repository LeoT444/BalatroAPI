import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
function UpdateNaipe() {
    const { id_naipe } = useParams();
    const [naipe, setNaipe] = useState({
        nome: "",
        cor: "",
    });
    const navigate = useNavigate();
    const handleChange = (e) => {
        setNaipe((prev) => ({
            ...prev, [e.target.name]:
                e.target.value
        }));
    };
    useEffect(() => {
        axios.get("http://localhost:8081/naipe/" + id_naipe)
            .then(res => {
                console.log(res);
                setNaipe(res.data);
            })
            .catch(err => console.log(err))
    }, [id_naipe]);
    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8081/naipe/${id_naipe}`,
                naipe);
            navigate("/naipe");
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <>
            <div className="container">
                <h1>Formulário para Editar o Naipe</h1>
                <form>
                    <div className="mb-3 mt-3">
                        <label className="form-label"> ID:</label>
                        <input type="text" className="form-control" id="id"
                            placeholder="ID"
                            name="id" value={naipe.id_naipe}
                            disabled onChange={handleChange} />
                    </div>
                    <div className="mb-3 mt-3">
                        <label className="form-label"> Nome</label>
                        <input type="text" className="form-control" id="nome"
                            placeholder="Nome do Naipe"
                            name="nome" value={naipe.nome}
                            onChange={handleChange} />
                    </div>
                    <div className="mb-3 mt-3">
                        <label className="form-label"> Cor</label>
                        <input type="text" className="form-control" id="cor"
                            placeholder="Cor do Naipe"
                            name="cor" value={naipe.cor}
                            onChange={handleChange} />
                    </div>
                    <div className="mb-3 mt-3">
                        <label className="form-label">createdAt:</label>
                        <input type="text" className="form-control"
                            id="createdAt" placeholder="Data da criação"
                            name="createdAt" value={new
                                Date(naipe.createdAt).toLocaleDateString()}
                            onChange={handleChange} />
                    </div>
                    <div className="mb-3 mt-3">
                        <label className="form-label">updatedAt:</label>
                        <input type="text" className="form-control"
                            id="updatedAt" placeholder="Data de Alteração"
                            name="updatedAt" value={new
                                Date(naipe.updatedAt).toLocaleDateString()}
                            onChange={handleChange} />
                    </div>
                    <button type="submit" className="btn btn-primary"
                        onClick={handleClick}>Alterar</button>
                </form>
                <div className='container d-flex justify-content-center'>
                    <Link to="/naipe">Veja todos os naipes</Link>
                </div>
            </div>
        </>


    )
}
export default UpdateNaipe;