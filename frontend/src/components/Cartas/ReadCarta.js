import React from 'react'
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
const ReadCarta = () => {
    const { id_carta } = useParams();
    const [carta, setCarta] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8081/carta/" + id_carta)
            .then(res => {
                console.log(res);
                setCarta(res.data);
            }).catch(err => console.log(err))
    }, []);
    return (
        <div className="container">
            <div className='row'>
                <div className='col-md-12'>
                    <h1>Detalhes da Carta</h1>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Valor</th>
                                <th>Pontuação</th>
                                <th>Naipe</th>
                                <th>Data Cadastro</th>
                                <th>Data Alteração</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{carta.id_carta}</td>
                                <td>{carta.numero} </td>
                                <td>{carta.pontuacao} </td>
                                <td>{carta.fk_naipe.nome} </td>
                                {/* <td>{carta.fk_naipe.nome} </td> */}
                                {/* <td>{carta.fk_naipe.cor} </td> */}
                                {/* <td>{carta.fk_naipe.createdAt} </td> */}
                                {/* <td>{carta.fk_naipe.updatedAt} </td> */}
                                {/* <td>{carta.fk_naipe.createdAt} </td> */}
                                <td>{new
                                    Date(carta.createdAt).toLocaleDateString()}</td>
                                <td>{new
                                    Date(carta.updatedAt).toLocaleDateString()}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default ReadCarta;