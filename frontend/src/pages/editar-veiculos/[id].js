import api from "@/services/api";
import styles from "@/styles/estilocadastros.module.css";
import { useRouter } from 'next/router';
import { useState, useEffect } from "react";
import { SlArrowRight, SlArrowLeft, SlCheck } from "react-icons/sl"


export default function cadastroveiculos() {
  const router = useRouter();
  const [step, setStep] = useState(1)
  const [_id, setId] = useState(0);
  const [veiculo, setVeiculo] = useState({})
  const getVeiculo = (id) =>{
    api
        .get(`veiculos/${id}`)
        .then((res) =>
            setVeiculo(res.data))
        .catch((err) => console.log(err))
  }
  useEffect(() =>{
    const _id = Number(router.query.id);
    if(!isNaN(_id)){
        getVeiculo(_id);
        setId(_id);
    }
  },[])
  const salvarImagem = (id, file) => {
    const formData = new FormData();
    formData.append("file", file);
    api
        .post("/veiculos/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        .then((response) => {
            console.log(response)
            const { file } = response.data;
            api
            .put(`/veiculos/${id}`, { foto: file.filename })
            .then((res) => {
                console.log("Foto salva com sucesso")
                router.push('/listagem-veiculos')
            })
            .catch((err) => {
                console.log("Erro ao salvar a imagem: " + err.message);
            })
        })
    
        .catch((err) => {
            console.log(err);
        })
}
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
    setformVeiculo({
      ...formVeiculo,
      [name]: files ? files[0] : value
    })
  }

  const nextStep = () => { setStep((prevStep) => prevStep + 1) }
  const prevStep = () => { setStep((prevStep) => prevStep - 1) }
  const handleSubmit = (e) => {
    e.preventDefault();
    const salvarVeiculo = {
      ...formVeiculo,
      ano: parseInt(formVeiculo.ano),
      kilometragem: parseInt(formVeiculo.kilometragem),
      preco: parseFloat(formVeiculo.preco),
      concessionariumId: parseInt(formVeiculo.concessionaria),
    }
    api
      .put(`/veiculos/${IDBCursor}`, salvarVeiculo)
      .then((res) => {
        console.log(salvarVeiculo);
        router.push("/listar-veiculos/")
        // if(foto.files){
        //   const fotoSalvar = foto.files[0];
        //   salvarImagem(res.data.id, fotoSalvar)
        // }
      })
      .catch((err) => {
        console.error(err);
        alert("Erro ao editar o carro!" + err);
      });
  }

  return (
    <div className={styles.divCadastro} id="divCadastro">
      <h2 className={styles.h2}>Cadastro de veiculos</h2>
      <form onSubmit={handleSubmit} className={styles.formCadastro}>
        {step === 1 && (
          <>
            <div className={styles.labelInputGroup}>
              <label className={styles.labels} htmlFor="marca">Marca</label>
              <input className={styles.inputCadastro} defaultValue={veiculo.marca}  onChange={handleChange} type="text" name="marca" id="name" />
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
                defaultValue={veiculo.modelo}
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
                defaultValue={veiculo.ano}/>
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
                defaultValue={veiculo.categoria}
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
                defaultValue={veiculo.kilometragem}/>
            </div>
            <br />
            <div className={styles.labelInputGroup}>
              <label className={styles.labels} htmlFor="cor">Cor</label>
              <input className={styles.inputCadastro} onChange={handleChange}
                type="text"
                name="cor"
                id="cor" 
                defaultValue={veiculo.cor}
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
                defaultValue={veiculo.preco}
                />
            </div>
            <br />
            <div className={styles.labelInputGroup}>
              <label className={styles.labels} htmlFor="foto">Foto</label>
              <input className={styles.inputFileCadastro}
                onChange={handleChange}
                type="file"
                name="foto"
                id="foto"
                accept={"image/png, image/jpg, image/jpeg"}
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
                defaultValue={veiculo.descricao}>

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
                name="concessionaria"
                id="concessionaria"
                defaultValue={veiculo.concessionaria}>
                <option value="">Selecione uma concessionaria</option>
                <option value="1">Teste</option>
                {/* Adicionar options de concessionaria aqui */}
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
                defaultValue={veiculo.chassi}/>
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
