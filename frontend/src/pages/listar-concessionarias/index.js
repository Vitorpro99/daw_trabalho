import Cardconcessionaria from "@/components/CardConcessionaria";
import { useState, useEffect } from "react";
import api from "@/services/api";
import styles from "@/styles/Card.module.css";

export default function listarConcessionaria() {
    const [concessionarias, setconcessionarias] = useState([]);

    const getconcessionarias = () => {
        api
        .get("/concessionaria/")
        .then(async (result) => {
            var listaConcessionarias = result.data;

            // Carregando as imagens para cada veículo
            for (let conc of listaConcessionarias) {
                if (conc.foto) {
                    await api
                    .get(`/concessionaria/upload/${conc.foto}`, {
                        responseType: 'blob',
                    })
                    .then((res) => {
                        const { data } = res;
                        conc.preview = URL.createObjectURL(data); // Corrigido
                    })
                    .catch((err) => {
                        console.error('Erro ao carregar imagem do veículo:', err);
                        conc.preview = "https://encurtador.com.br/VtndM";  // Imagem padrão
                    });
                }
            }

            // Atualizando o estado após carregar as imagens
            console.log(listaConcessionarias); 
            setconcessionarias(listaConcessionarias);
        })
        .catch((err) => {
            console.error(err);
            alert("Erro ao buscar as concessionarias!");
        });
    }

    useEffect(() => {
        getconcessionarias();
    }, []);

    return (
        <div className={styles.mainDiv}>
            {concessionarias?.length > 0 && concessionarias.map((concessionaria) =>
                <Cardconcessionaria key={concessionaria.id} concessionaria={concessionaria} />
            )}
        </div>
    );
}