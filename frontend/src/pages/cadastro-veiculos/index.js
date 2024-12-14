import api from "@/services/api";
import styles from "@/styles/estilocadastros.module.css";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import { SlArrowRight, SlArrowLeft, SlCheck } from "react-icons/sl"


export default function cadastroveiculos() {
  const router = useRouter();
  const [step, setStep] = useState(1)
  const [concessionarias,setConcessionarias] = useState([])
  const getConcessionarias = () =>{
    api
       .get("/concessionaria/")
       .then((res) => {
            setConcessionarias(res.data);
        })
       .catch((err) => {
            console.error(err);
            alert("Erro ao buscar as concessionarias!");
        });
  }
  const salvarImagem = (id, file) => {
    const formData = new FormData();
    formData.append("file", file); // "file" deve ser o mesmo nome usado no backend

    console.log("FormData antes do envio:", formData.get("file"));

    api.post("/veiculos/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
    .then((response) => {
        console.log("Resposta do servidor:", response.data);
        if (response.data.upload) {
            const { filename } = response.data.file;
            api.put(`/veiculos/${id}`, { foto: filename })
                .then(() => console.log("Foto salva com sucesso"))
                .catch((err) => console.error("Erro ao salvar a foto:", err));
        }
    })
    .catch((err) => console.error("Erro no upload:", err));
};


  const [formVeiculo, setformVeiculo] = useState({
    marca: '',
    modelo: '',
    ano: '',
    categoria: '',
    kilometragem: '',
    cor: '',
    preco: '',
    foto:'',    
    concessionaria: '',
    descricao: '',
    chassi: ''
  })

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setformVeiculo((prev) => ({
        ...prev,
        [name]: files ? files[0] : value, // Captura o arquivo no campo "foto"
    }));
};



  const nextStep = () => { setStep((prevStep) => prevStep + 1) }
  const prevStep = () => { setStep((prevStep) => prevStep - 1) }
  
  
  const handleSubmit = (e) => {
    e.preventDefault();

    const salvarVeiculo = {
        ...formVeiculo,
        foto: '', // Será atualizado após o upload
        ano: parseInt(formVeiculo.ano),
        kilometragem: parseInt(formVeiculo.kilometragem),
        preco: parseFloat(formVeiculo.preco),
        concessionariumId: parseInt(formVeiculo.concessionaria),
    };

    api.post("/veiculos/", salvarVeiculo)
    .then((res) => {
        const { id } = res.data;

        if (formVeiculo.foto) {
            // Envia a imagem para o backend
            salvarImagem(id, formVeiculo.foto);
            alert("Veiculo salvo com sucesso! (e com foto :D)")
            console.log(salvarVeiculo);
        } else {
            console.log("Veículo salvo sem imagem");
            router.push('/listar-veiculos');
        }
    })
    .catch((err) => {
        console.error("Erro ao salvar o veículo:", err);
        alert("Erro ao salvar o carro!");
    });
};


  
useEffect(()=>{
  getConcessionarias()
},[]);
  return (
    <div className={styles.divCadastro} id="divCadastro">
      <h2 className={styles.h2}>Cadastro de veiculos</h2>
      <form onSubmit={handleSubmit} className={styles.formCadastro}>
        {step === 1 && (
          <>
            <div className={styles.labelInputGroup}>
              <label className={styles.labels} htmlFor="marca">Marca</label>
              <input className={styles.inputCadastro} onChange={handleChange} type="text" name="marca" id="name" />
            </div>
            <br />
            <div className={styles.labelInputGroup}>
              <label className={styles.labels} htmlFor="modelo">Modelo</label>
              <input
                className={styles.inputCadastro}
                onChange={handleChange}
                type="text"
                name="modelo"
                id="name" 
                value={formVeiculo.modelos}
                />
            </div>
            <br />
            <div className={styles.labelInputGroup}>
              <label className={styles.labels} htmlFor="ano">Ano</label>
              <input className={styles.inputCadastro} onChange={handleChange}
                type="number"
                min="1800"
                name="ano"
                id="ano" 
                value={formVeiculo.ano}/>
            </div>
            <br />
          </>
        )}
        {step === 2 && (
          <>
            <div className={styles.labelInputGroup}>
              <label className={styles.labels} htmlFor="categoria">Categoria</label>
              <input className={styles.inputCadastro}
                onChange={handleChange}
                type="text"
                name="categoria"
                id="categoria" 
                value={formVeiculo.categoria}
                />
            </div>
            <br />
            <div className={styles.labelInputGroup}>
              <label className={styles.labels} htmlFor="kilometragem">Kilometragem</label>
              <input className={styles.inputCadastro}
                onChange={handleChange}
                type="number"
                min="0" name="kilometragem"
                id="kilometragem" 
                value={formVeiculo.kilometragem}/>
            </div>
            <br />
            <div className={styles.labelInputGroup}>
              <label className={styles.labels} htmlFor="cor">Cor</label>
              <input className={styles.inputCadastro} onChange={handleChange}
                type="text"
                name="cor"
                id="cor" 
                value={formVeiculo.cor}
                />
            </div>
            <br />
          </>
        )}
        {step === 3 && (
          <>
            <div className={styles.labelInputGroup}>
              <label className={styles.labels} htmlFor="preco">Preço</label>
              <input className={styles.inputPrecoCadastro} onChange={handleChange}
                type="number"
                min="0"
                name="preco"
                id="preco" 
                value={formVeiculo.preco}
                />
            </div>
            <br />
            <div className={styles.labelInputGroup}>
              <label className={styles.labels} htmlFor="foto">Foto</label>
              <input
                className={styles.inputFileCadastro}
                type="file"
                name="foto"
                id="foto"
                accept="image/png, image/jpg, image/jpeg"
                onChange={handleChange} // Garantir que o arquivo seja capturado
              />
            </div>
            <br />
            <div className={styles.labelInputGroup}>
              <label className={styles.labels} htmlFor="descricao">Descrição</label>
              <textarea className={styles.textareaCadastro}
                onChange={handleChange}
                name="descricao"
                id="descricao"
                cols="30"
                rows="10"
                value={formVeiculo.descricao}>

              </textarea>
            </div>
            <br />
          </>
        )}
        {step == 4 && (
          <>
            <div className={styles.labelInputGroup}>
              <label className={styles.labels} htmlFor="concessionaria">Concessionaria</label>
              <select className={styles.selectCadastro}
                onChange={handleChange}
                name="concessionariaId"
                id="concessionariaId">
                <option value="">Selecione uma concessionaria</option>
                  {concessionarias.length > 0 && 
                        concessionarias.map((concessionaria)=><option value={concessionaria.id}>{concessionaria.nome}</option>)}
              </select>
            </div>
            <br />
            <div className={styles.labelInputGroup}>
              <label className={styles.labels} htmlFor="chassi">Chassi</label>
              <input className={styles.inputCadastro}
                onChange={handleChange}
                type="text"
                name="chassi"
                id="chassi" 
                value={formVeiculo.chassi}/>
            </div>
            <br />
          </>
        )}
        <div className={styles.buttonGroup}>
          {step > 1 && <button className={styles.submitButton} type="button" onClick={prevStep}><SlArrowLeft className={styles.icon} /></button>}
          {step < 4 && <button className={styles.submitButton} type="button" onClick={nextStep}><SlArrowRight className={styles.icon} /></button>}
          {step === 4 && <button className={styles.submitButton} type="submit"><SlCheck className={styles.icon} /></button>}
        </div>

      </form>
    </div>
  );
}
