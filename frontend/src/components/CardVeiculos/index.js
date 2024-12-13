import api from "@/services/api";
import styles from "@/styles/Card.module.css";
import { useEffect, useState } from "react"
import { Container } from "react-bootstrap";
import { FaTrashCan } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { useRouter } from "next/router";
import { Router } from "next/router";
import router from "express/lib/router";



export default function CardVeiculo({veiculo}){
    const router = useRouter()
    const editarVeiculo = (id) =>{
        router.push(`/editar-veiculos/${id}`);
    }
    const excluir = (id) => {
        api
        .delete(`veiculos/${id}`)
        .then(() => {
            // alert("Excluído com sucesso");
            router.reload()
        })
        .catch(err => {
            console.error(err);
            alert("Erro ao excluir o veículo: " + err);
        });
    }
    // useEffect(()=>{

    // },[])
    return(
        <div className={styles.container}>
            <img src={veiculo.preview ?? "https://encurtador.com.br/VtndM"} />
        <div className={styles.intDiv}>
            <h4 className={styles.specs}>{veiculo.marca} {veiculo.modelo} {veiculo.ano}</h4>
        <div className={styles.kmprice}>
            <p>R${veiculo.preco}</p>
            <p>{veiculo.kilometragem}KM</p>
        </div>
        <div className={styles.cor}>
            <p>{veiculo.cor}</p>
        </div>
            <p>Chassi: {veiculo.chassi}</p>
            <p>Categoria: {veiculo.categoria}</p>      
            {/* <p>{veiculo.descricao}</p>   */}
            </div>
        <div className={styles.buttonGroup}>
            {/* <button>Comprar</button>  ainda não sei fazer isso T-T*/} 
            <button className={styles.buttons}><FaPencilAlt onClick={() => editarVeiculo(veiculo.id)} className={styles.icon}/></button>
            
            <button onClick={() => excluir(veiculo.id)} className={styles.buttons}><FaTrashCan className={styles.icon}/></button>
        </div>
        
            <hr/>
        </div>
    )
}