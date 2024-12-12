import api from "@/services/api";
import styles from "@/styles/estilocadastros.module.css";
import { useRouter } from 'next/router';
import { useState } from "react";
import { SlArrowRight, SlArrowLeft, SlCheck } from "react-icons/sl"


export default function cadastroProdutos() {
  const router = useRouter();
  const [step, setStep] = useState(1)
  const [formUsuario, setformUsuario] = useState({
    nome: '',
    email: '',
    senha: '',
    foto: ''
})

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setformUsuario({
      ...formUsuario,
      [name]: files ? files[0] : value
    })
  }

  const nextStep = () => { setStep((prevStep) => prevStep + 1) }
  const prevStep = () => { setStep((prevStep) => prevStep - 1) }
  const handleSubmit = (e) => {
    e.preventDefault();
    const salvarUsuario = {
      ...formUsuario,
    //   senha: parseInt(formUsuario.senha),
    }
    //const {marca, modelo, ano, categoria, kilometragem, cor, preco,foto, concessionaria, descricao, chassi } = e.target;
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
      .post("/usuarios/", salvarUsuario)
      .then((res) => {
        console.log(salvarUsuario);
        alert("Usuário salvo com sucesso!");
      })
      .catch((err) => {
        console.error(err);
        alert("Erro ao salvar o Usuário!" + err);
      });
  }

  return (
    <div className={styles.divCadastro} id="divCadastro">
      <h2 className={styles.h2}>Cadastrar novo usuário</h2>
      <form onSubmit={handleSubmit} className={styles.formCadastro}>
        {step === 1 && (
          <>
            <div className={styles.labelInputGroup}>
              <label className={styles.labels} htmlFor="nome">Nome</label>
              <input className={styles.inputCadastro} onChange={handleChange} type="text" name="nome" id="nome" />
            </div>
            <br />
            <div className={styles.labelInputGroup}>
              <label className={styles.labels} htmlFor="modelo">email</label>
              <input
                className={styles.inputCadastro}
                onChange={handleChange}
                type="email"
                name="email"
                id="email" 
                value={formUsuario.email}
                />
            </div>
            <br />
            <div className={styles.labelInputGroup}>
              <label className={styles.labels} htmlFor="senha">Senha</label>
              <input className={styles.inputCadastro} onChange={handleChange}
                type="password"
                name="senha"
                id="senha" 
                value={formUsuario.senha}/>
            </div>
            <div className={styles.labelInputGroup}>
              <label className={styles.labels} htmlFor="foto">Foto</label>
              <input
                className={styles.inputFileCadastro}
                onChange={handleChange}
                type="file"
                name="foto"
                id="foto"
                accept={"image/png, image/jpg, image/jpeg"}
              />
            </div>
            <br />
          </>
        )}
        <div className={styles.buttonGroup}>
          {/* {step > 1 && <button className={styles.submitButton} type="button" onClick={prevStep}><SlArrowLeft className={styles.icon} /></button>}
          {step < 1 && <button className={styles.submitButton} type="button" onClick={nextStep}><SlArrowRight className={styles.icon} /></button>} */}
          {step === 1 && <button className={styles.submitButton} type="submit"><SlCheck className={styles.icon} /></button>}
        </div>

      </form>
    </div>
  );
}
