import React from 'react'
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const ListCarta = () => {
    const [cartas, setCartas] = useState([]);
    //Listar Cartas
    useEffect(() => {
        const fetchAllCartas = async () => {
            try {
                const res = await
                    axios.get("http://localhost:8081/carta");
                setCartas(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllCartas();
    }, []);
    //Deletar Cartas
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8081/carta/${id}`);
            window.location.reload()
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className="container">
            <h2 className='w-100 d-flex justify-content-center p-3'>Listando
                Cartas</h2>
            <div className='row'>
                <div className='col-md-12'>
                    <p><Link to="/carta/add" className="btn btn-success">Adicionar novo Carta</Link></p>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Valor</th>
                                <th>Pontuação</th>
                                <th>Naipe</th>
                                <th>Data Cadastro</th>
                                <th>Data Alteração</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartas.map((carta) => {
                                return (
                                    <tr>
                                        <td>{carta.id_carta}</td>
                                        <td>{carta.numero} </td>
                                        <td>{carta.pontuacao} </td>
                                        <td>{carta.fk_naipe.nome} </td>
                                        {/* <td>{carta.fk_naipe.nome} </td> */}
                                        {/* <td>{carta.fk_naipe.cor} </td> */}
                                        {/* <td>{carta.fk_naipe.createdAt} </td> */}
                                        {/* <td>{carta.fk_naipe.updatedAt} </td> */}
                                        <td>{new
                                            Date(carta.createdAt).toLocaleDateString()}</td>
                                        <td>{new
                                            Date(carta.updatedAt).toLocaleDateString()}</td>
                                        <td>
                                            <Link
                                                to={`/carta/read/${carta.id_carta}`}
                                                className="btn btn-success mx-2">Ler</Link>
                                            <Link
                                                to={`/carta/update/${carta.id_carta}`}
                                                className="btn btn-info mx-2">Editar</Link>
                                            <button
                                                onClick={() => handleDelete(carta.id_carta)}
                                                className="btn btndanger">Deletar</button>
                                        </td>
                                    </tr>
                                )
                            })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default ListCarta;