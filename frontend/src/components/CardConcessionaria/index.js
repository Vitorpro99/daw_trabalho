import api from "@/services/api";
import styles from "@/styles/Cardconc.module.css";
import { useEffect, useState } from "react"
import { Container } from "react-bootstrap";
import { FaTrashCan } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { useRouter } from "next/router";
import { Router } from "next/router";




export default function Cardconcessionaria({concessionaria}){
    const router = useRouter()
    const editarconcessionaria = (id) =>{
        router.push(`/editar-concessionaria/${id}`);
    }
    const excluir = (id) => {
        api
        .delete(`concessionaria/${id}`)
        .then(() => {
            // alert("Excluído com sucesso");
            router.reload()
        })
        .catch(err => {
            console.error(err);
            alert("Erro ao excluir a concessionaria: " + err);
        });
    }
    // useEffect(()=>{

    // },[])
    return(
        <div className={styles.container}>
            <img className={styles.img} src={concessionaria.preview ?? "https://encurtador.com.br/iJvFB"} />
        <div className={styles.intDiv}>
            <h4 className={styles.specs}>{concessionaria.nome}</h4>
        <div className={styles.contact}>
            <p>{concessionaria.endereco}</p>
            <p>{concessionaria.telefone}KM</p>
            <p>{concessionaria.email}</p>
        </div> 
        </div>
        <div className={styles.buttonGroup}>
            {/* <button>Comprar</button>  ainda não sei fazer isso T-T*/} 
            <button className={styles.buttons}><FaPencilAlt onClick={() => editarconcessionaria(concessionaria.id)} className={styles.icon}/></button>
            
            <button onClick={() => excluir(concessionaria.id)} className={styles.buttons}><FaTrashCan className={styles.icon}/></button>
        </div>
        
            <hr/>
        </div>
    )
}