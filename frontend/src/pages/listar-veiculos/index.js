import CardVeiculo from "@/components/CardVeiculos";
import { useState, useEffect } from "react";
import api from "@/services/api";
import styles from "@/styles/Card.module.css";

export default function listarVeiculos() {
    const [veiculos, setVeiculos] = useState([]);

    const getVeiculos = () => {
        api
        .get("/veiculos/")
        .then(async (result) => {
            var listaVeiculos = result.data;

            // Carregando as imagens para cada veículo
            for (let veic of listaVeiculos) {
                if (veic.foto) {
                    await api
                    .get(`/veiculos/upload/${veic.foto}`, {
                        responseType: 'blob',
                    })
                    .then((res) => {
                        const { data } = res;
                        veic.preview = URL.createObjectURL(data); // Corrigido
                    })
                    .catch((err) => {
                        console.error('Erro ao carregar imagem do veículo:', err);
                        veic.preview = "https://encurtador.com.br/VtndM";  // Imagem padrão
                    });
                }
            }

            // Atualizando o estado após carregar as imagens
            console.log(listaVeiculos); 
            setVeiculos(listaVeiculos);
        })
        .catch((err) => {
            console.error(err);
            alert("Erro ao buscar os veículos!");
        });
    }

    useEffect(() => {
        getVeiculos();
    }, []);

    return (
        <div className={styles.mainDiv}>
            {veiculos?.length > 0 && veiculos.map((veiculo) =>
                <CardVeiculo key={veiculo.id} veiculo={veiculo} />
            )}
        </div>
    );
}