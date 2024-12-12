import api from "@/services/api";
import styles from "@/styles/Card.module.css";
import { useEffect, useState } from "react"
import { Container } from "react-bootstrap";
import { FaTrashCan } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
export default function CardVeiculo({veiculo}){
    return(
        <div className={styles.container}>
            <img src={veiculo.preview ?? "https://encurtador.com.br/VtndM"} />
        <div className={styles.intDiv}>
            <h4 className={styles.specs}>{veiculo.marca} {veiculo.modelo} {veiculo.ano}</h4>
        
            <p>R${veiculo.preco}</p>
            <p>Cor: {veiculo.cor}</p>
            <p>Chassi: {veiculo.chassi}</p>
            <p>Categoria: {veiculo.categoria}</p>      
            <p>{veiculo.descricao}</p>  
            </div>
        <div className={styles.buttonGroup}>
            {/* <button>Comprar</button>  ainda não sei fazer isso T-T*/} 
            <button className={styles.buttons}><FaEye className={styles.icon}/></button>
            
            <button className={styles.buttons}><FaTrashCan className={styles.icon}/></button>
        </div>
        
            <hr/>
        </div>
    )
}