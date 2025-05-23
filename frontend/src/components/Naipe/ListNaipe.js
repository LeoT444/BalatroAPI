import React from 'react'
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const ListNaipe = () => {
    const [naipes, setNaipes] = useState([]);
    //Listar Naipes
    useEffect(() => {
        const fetchAllNaipes = async () => {
            try {
                const res = await
                    axios.get("http://localhost:8081/naipe");
                setNaipes(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllNaipes();
    }, []);
    //Deletar Naipes
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8081/naipe/${id}`);
            window.location.reload()
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className="container">
            <h2 className='w-100 d-flex justify-content-center p-3'>Listando
                Naipes</h2>
            <div className='row'>
                <div className='col-md-12'>
                    <p><Link to="/naipe/add" className="btn btn-success">Adicionar novo Naipe</Link></p>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Cor</th>
                                <th>Data Cadastro</th>
                                <th>Data Alteração</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {naipes.map((naipe) => {
                                return (
                                    <tr>
                                        <td>{naipe.id_naipe}</td>
                                        <td>{naipe.nome} </td>
                                        <td>{naipe.cor} </td>
                                        <td>{new
                                            Date(naipe.createdAt).toLocaleDateString()}</td>
                                        <td>{new
                                            Date(naipe.updatedAt).toLocaleDateString()}</td>
                                        <td>
                                            <Link
                                                to={`/naipe/read/${naipe.id_naipe}`}
                                                className="btn btn-success mx-2">Ler</Link>
                                            <Link
                                                to={`/naipe/update/${naipe.id_naipe}`}
                                                className="btn btn-info mx-2">Editar</Link>
                                            <button
                                                onClick={() => handleDelete(naipe.id_naipe)}
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
export default ListNaipe;