import api from "@/services/api";
import styles from "@/styles/estilocadastros.module.css";
import { useRouter } from "next/router";
import { useState } from "react";
import { SlArrowRight, SlArrowLeft, SlCheck } from "react-icons/sl";

export default function CadastroProdutos() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formConcessionaria, setFormConcessionaria] = useState({
    nome: "",
    endereco: "",
    telefone: "",
    email: "",
    cnpj: "",
    cidade: "",
    lat: "",
    long: "",
    usuarioId: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormConcessionaria({
      ...formConcessionaria,
      [name]: files ? files[0] : value,
    });
  };

  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const prevStep = () => setStep((prevStep) => prevStep - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    const salvarConcessionaria = {
      ...formConcessionaria,
      telefone: parseInt(formConcessionaria.telefone),
      cnpj: parseInt(formConcessionaria.cnpj),
      lat: parseFloat(formConcessionaria.lat),
      long: parseFloat(formConcessionaria.long),
      usuarioId: parseInt(formConcessionaria.usuarioId),
      
    };

    api
      .post("/concessionaria/", salvarConcessionaria)
      .then((res) => {
        console.log(salvarConcessionaria);
        alert("Concessionária salva com sucesso!");
      })
      .catch((err) => {
        console.error(err);
        alert("Erro ao salvar a concessionária: " + err);
      });
  };

  return (
    <div className={styles.divCadastro} id="divCadastro">
      <h2 className={styles.h2}>Cadastro de Concessionárias</h2>
      <form onSubmit={handleSubmit} className={styles.formCadastro}>
        {step === 1 && (
          <>
            <div className={styles.labelInputGroup}>
              <label className={styles.labels} htmlFor="nome">Nome</label>
              <input
                className={styles.inputCadastro}
                onChange={handleChange}
                type="text"
                name="nome"
                id="nome"
                value={formConcessionaria.nome}
              />
            </div>
            <br />
            <div className={styles.labelInputGroup}>
              <label className={styles.labels} htmlFor="endereco">Endereço</label>
              <input
                className={styles.inputCadastro}
                onChange={handleChange}
                type="text"
                name="endereco"
                id="endereco"
                value={formConcessionaria.endereco}
              />
            </div>
            <br />
            <div className={styles.labelInputGroup}>
              <label className={styles.labels} htmlFor="cnpj">CNPJ (somente números)</label>
              <input
                className={styles.inputCadastro}
                onChange={handleChange}
                type="text"
                name="cnpj"
                id="cnpj"
                value={formConcessionaria.cnpj}
              />
            </div>
            <br />
          </>
        )}
        {step === 2 && (
          <>
            <div className={styles.labelInputGroup}>
              <label className={styles.labels} htmlFor="cidade">Cidade</label>
              <input
                className={styles.inputCadastro}
                onChange={handleChange}
                type="text"
                name="cidade"
                id="cidade"
                value={formConcessionaria.cidade}
              />
            </div>
            <br />
            <div className={styles.labelInputGroup}>
              <label className={styles.labels} htmlFor="email">E-mail</label>
              <input
                className={styles.inputCadastro}
                onChange={handleChange}
                type="email"
                name="email"
                id="email"
                value={formConcessionaria.email}
              />
            </div>
            <br />
            <div className={styles.labelInputGroup}>
              <label className={styles.labels} htmlFor="telefone">Telefone</label>
              <input
                className={styles.inputCadastro}
                onChange={handleChange}
                type="text"
                name="telefone"
                id="telefone"
                value={formConcessionaria.telefone}
              />
            </div>
            <br />
          </>
        )}
        {step === 3 && (
          <>
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
          {step > 1 && (
            <button
              className={styles.submitButton}
              type="button"
              onClick={prevStep}
            >
              <SlArrowLeft className={styles.icon} />
            </button>
          )}
          {step < 3 && (
            <button
              className={styles.submitButton}
              type="button"
              onClick={nextStep}
            >
              <SlArrowRight className={styles.icon} />
            </button>
          )}
          {step === 3 && (
            <button className={styles.submitButton} type="submit">
              <SlCheck className={styles.icon} />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
