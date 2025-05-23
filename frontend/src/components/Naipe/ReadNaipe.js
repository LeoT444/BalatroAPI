import React from 'react'
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
const ReadNaipe = () => {
    const { id_naipe } = useParams();
    const [naipe, setNaipe] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8081/naipe/" + id_naipe)
            .then(res => {
                console.log(res);
                setNaipe(res.data);
            }).catch(err => console.log(err))
    }, []);
    return (
        <div className="container">
            <div className='row'>
                <div className='col-md-12'>
                    <h1>Detalhes do Naipe</h1>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Cor</th>
                                <th>Data Cadastro</th>
                                <th>Data Alteração</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{naipe.id_naipe}</td>
                                <td>{naipe.nome} </td>
                                <td>{naipe.cor} </td>
                                <td>{new
                                    Date(naipe.createdAt).toLocaleDateString()}</td>
                                <td>{new
                                    Date(naipe.updatedAt).toLocaleDateString()}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default ReadNaipe;