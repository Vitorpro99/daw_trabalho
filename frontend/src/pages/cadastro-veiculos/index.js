import api from "@/services/api";
import styles from "@/styles/estilocadastros.module.css";
import {useRouter} from 'next/router';
import { useState } from "react";
import { SlArrowRight, SlArrowLeft, SlCheck } from "react-icons/sl"


export default function cadastroProdutos() {
  const router = useRouter();
  const [step,setStep] = useState(1)
  const [formVeiculo,setformVeiculo] = useState({
    marca: '',
    modelo: '',
    ano: '',
    categoria: '',
    kilometragem: '',
    cor: '',
    preco: '',
    foto: '',
    concessionaria: '',
    descricao: '',
    chassi: ''
  })
  
  const handleChange = (e) =>{
    const {name, value, files} = e.target;
    setformVeiculo({
      ...formVeiculo,
      [name]: files? files[0] : value
    })
  }
  
  const nextStep = () =>{setStep((prevStep) => prevStep + 1)}
  const prevStep = () =>{setStep((prevStep) => prevStep -1)}
  const handleSubmit = (e) =>{
    e.preventDefault();
    const {marca, modelo, ano, categoria, kilometragem, cor, preco,foto, concessionaria, descricao, chassi } = e.target;
    // var salvarVeiculo = {
    //   marca: marca.value,
    //   modelo: modelo.value,
    //   ano: ano.value,
    //   categoria: categoria.value,
    //   kilometragem: kilometragem.value,
    //   cor: cor.value,
    //   preco: preco.value,
    //   foto: foto.value,
    //   concessionariaId: concessionaria.value,
    //   descricao: descricao.value,
    //   chassi: chassi.value
    // }
    api
      .post("/veiculos/",formVeiculo)
      .then((res)=>{
        alert("Carro salvo com sucesso!");
      })
      .catch((err) => {
        console.error(err);
        alert("Erro ao salvar o carro!" + err);
      });
  }
  
  return (
    
      <div className={styles.divCadastro} id="divCadastro">
      <h2>Cadastro de veiculos</h2>
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
              <input className={styles.inputCadastro} onChange={handleChange} type="text" name="modelo" id="name" />
            </div>
              <br />
            <div className={styles.labelInputGroup}>
              <label className={styles.labels} htmlFor="ano">Ano</label>
              <input className={styles.inputCadastro} onChange={handleChange} type="number" min="1800" name="ano" id="ano" />              
            </div>
              <br/>
            </>
          )}        
          {step === 2 && (
            <>
            <div className={styles.labelInputGroup}>
              <label className={styles.labels} htmlFor="categoria">Categoria</label>
              <input className={styles.inputCadastro} onChange={handleChange} type="text" name="categoria" id="categoria" />
            </div>
              <br />
            <div className={styles.labelInputGroup}>
              <label className={styles.labels} htmlFor="kilometragem">Kilometragem</label>
              <input className={styles.inputCadastro} type="number" min="0" name="kilometragem" id="kilometragem"   />
            </div> 
              <br />
            <div className={styles.labelInputGroup}>
              <label className={styles.labels} htmlFor="cor">Cor</label>
              <input className={styles.inputCadastro} type="text" name="cor" id="cor" />
            </div>
              <br />
            </>
          )}
          {step === 3 && (
            <>
            <div className={styles.labelInputGroup}>
              <label className={styles.labels} htmlFor="preco">Preço</label>
              <input className={styles.inputPrecoCadastro} type="number" min="0" name="preco" id="preco" />
            </div>
              <br />
            <div className={styles.labelInputGroup}>
              <label className={styles.labels} htmlFor="foto">Foto</label>
              <input className={styles.inputFileCadastro} type="file" name="foto" id="foto" />
            </div>
              <br />
            <div className={styles.labelInputGroup}>
              <label className={styles.labels} htmlFor="descricao">Descrição</label>
          <textarea className={styles.textareaCadastro} name="descricao" id="descricao" cols="30" rows="10"></textarea>
          </div>
          <br />
            </>
          )}
          {step == 4 && (
            <>
            <div className={styles.labelInputGroup}>
            <label className={styles.labels} htmlFor="concessionaria">Concessionaria</label>
            <select className={styles.selectCadastro} name="concessionaria" id="concessionaria">
              <option value="">Selecione uma concessionaria</option>
              <option value="1">Teste</option>
              {/* Adicionar options de concessionaria aqui */}
            </select>
            </div>
            <br />
            <div className={styles.labelInputGroup}>
            <label className={styles.labels} htmlFor="chassi">Chassi</label>
            <input className={styles.inputCadastro} type="text" name="chassi" id="chassi" />
            </div>
            <br />
            </>
          )}
           <div className={styles.buttonGroup}>
          {step > 1 && <button className={styles.submitButton} type="button" onClick={prevStep}><SlArrowLeft className={styles.icon}/></button>}
          {step < 4 && <button className={styles.submitButton} type="button" onClick={nextStep}><SlArrowRight className={styles.icon}/></button>}
          {step === 4 && <button className={styles.submitButton} type="submit"><SlCheck className={styles.icon}/></button>}
          </div>

        </form>
      </div>
  );
}
