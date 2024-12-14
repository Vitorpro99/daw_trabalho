import api from "@/services/api";
import styles from "@/styles/estilocadastros.module.css";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { SlArrowRight, SlArrowLeft, SlCheck } from "react-icons/sl";

export default function EditarConcessionarias() {
  const router = useRouter();
  const { id } = router.query;  // Obtenha o ID da concessionária na URL
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

  // Carrega os dados da concessionária quando o ID é passado na URL
  useEffect(() => {
    if (id) {
      api
        .get(`/concessionaria/${id}`)
        .then((res) => {
          setFormConcessionaria(res.data);
        })
        .catch((err) => {
          console.error(err);
          alert("Erro ao carregar os dados da concessionária");
        });
    }
  }, [id]);

  // Função para atualizar os campos do formulário
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormConcessionaria({
      ...formConcessionaria,
      [name]: files ? files[0] : value,
    });
  };

  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const prevStep = () => setStep((prevStep) => prevStep - 1);

  // Função para enviar os dados do formulário
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
      .put(`/concessionaria/${id}`, salvarConcessionaria)
      .then((res) => {
        console.log(salvarConcessionaria);
        alert("Concessionária editada com sucesso!");
        router.push("/listar-concessionarias"); // Redireciona após salvar
      })
      .catch((err) => {
        console.error(err);
        alert("Erro ao editar a concessionária: " + err);
      });
  };

  return (
    <div className={styles.divCadastro} id="divCadastro">
      <h2 className={styles.h2}>Edição de Concessionárias</h2>
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
                disabled
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
