import api from "@/services/api";
import styles from "@/styles/estilocadastros.module.css";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import { SlArrowRight, SlArrowLeft, SlCheck } from "react-icons/sl"

export default function cadastroveiculos() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [_id, setId] = useState(0);
  const [concessionarias, setConcessionarias] = useState([]);
  const [veiculo, setVeiculo] = useState({});
  
  // Inicializando formVeiculo com valores vazios
  const [formVeiculo, setFormVeiculo] = useState({
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
  });

  // Função para obter as concessionarias
  const getConcessionarias = () => {
    api
      .get("/concessionaria/")
      .then((res) => {
        setConcessionarias(res.data);
      })
      .catch((err) => {
        console.error(err);
        alert("Erro ao buscar as concessionarias!");
      });
  };

  // Função para obter o veículo com base no ID
  const getVeiculo = (id) => {
    api
      .get(`veiculos/${id}`)
      .then((res) => setVeiculo(res.data))
      .catch((err) => console.log(err));
  };

  // Atualizar formVeiculo assim que o veiculo for carregado
  useEffect(() => {
    const _id = Number(router.query.id);
    if (!isNaN(_id)) {
      getVeiculo(_id);
      setId(_id);
    }
  }, []);

  // Atualizando formVeiculo assim que o veiculo é carregado
  useEffect(() => {
    if (veiculo) {
      setFormVeiculo({
        marca: veiculo.marca || '',
        modelo: veiculo.modelo || '',
        ano: veiculo.ano || '',
        categoria: veiculo.categoria || '',
        kilometragem: veiculo.kilometragem || '',
        cor: veiculo.cor || '',
        preco: veiculo.preco || '',
        foto: veiculo.foto || '',
        concessionaria: veiculo.concessionariaId || '',
        descricao: veiculo.descricao || '',
        chassi: veiculo.chassi || ''
      });
    }
  }, [veiculo]);

  // Função para pegar a alteração do input
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormVeiculo({
      ...formVeiculo,
      [name]: files ? files[0] : value  // Para arquivos, pegamos o primeiro arquivo
    });
  };

  // Função para avançar no formulário
  const nextStep = () => setStep((prevStep) => prevStep + 1);

  // Função para voltar no formulário
  const prevStep = () => setStep((prevStep) => prevStep - 1);

  // Função para enviar o formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    const salvarVeiculo = {
      ...formVeiculo,
      ano: parseInt(formVeiculo.ano),
      kilometragem: parseInt(formVeiculo.kilometragem),
      preco: parseFloat(formVeiculo.preco),
      concessionariumId: parseInt(formVeiculo.concessionaria),
    };
    api
      .put(`/veiculos/${_id}`, salvarVeiculo)
      .then(() => {
        router.push("/listar-veiculos/");
      })
      .catch((err) => {
        console.error(err);
        alert("Erro ao editar o carro!" + err);
      });
  };

  // Carregar concessionarias na primeira renderização
  useEffect(() => {
    getConcessionarias();
  }, []);

  return (
    <div className={styles.divCadastro} id="divCadastro">
      <h2 className={styles.h2}>Editar veiculo</h2>
      <form onSubmit={handleSubmit} className={styles.formCadastro}>
        {step === 1 && (
          <>
            <div className={styles.labelInputGroup}>
              <label className={styles.labels} htmlFor="marca">Marca</label>
              <input
                className={styles.inputCadastro}
                value={formVeiculo.marca}
                onChange={handleChange}
                type="text"
                name="marca"
                id="marca"
              />
            </div>
            <br />
            <div className={styles.labelInputGroup}>
              <label className={styles.labels} htmlFor="modelo">Modelo</label>
              <input
                className={styles.inputCadastro}
                value={formVeiculo.modelo}
                onChange={handleChange}
                type="text"
                name="modelo"
                id="modelo"
              />
            </div>
            <br />
            <div className={styles.labelInputGroup}>
              <label className={styles.labels} htmlFor="ano">Ano</label>
              <input
                className={styles.inputCadastro}
                value={formVeiculo.ano}
                onChange={handleChange}
                type="number"
                min="1800"
                name="ano"
                id="ano"
              />
            </div>
            <br />
          </>
        )}
        {step === 2 && (
          <>
            <div className={styles.labelInputGroup}>
              <label className={styles.labels} htmlFor="categoria">Categoria</label>
              <input
                className={styles.inputCadastro}
                value={formVeiculo.categoria}
                onChange={handleChange}
                type="text"
                name="categoria"
                id="categoria"
              />
            </div>
            <br />
            <div className={styles.labelInputGroup}>
              <label className={styles.labels} htmlFor="kilometragem">Kilometragem</label>
              <input
                className={styles.inputCadastro}
                value={formVeiculo.kilometragem}
                onChange={handleChange}
                type="number"
                min="0"
                name="kilometragem"
                id="kilometragem"
              />
            </div>
            <br />
            <div className={styles.labelInputGroup}>
              <label className={styles.labels} htmlFor="cor">Cor</label>
              <input
                className={styles.inputCadastro}
                value={formVeiculo.cor}
                onChange={handleChange}
                type="text"
                name="cor"
                id="cor"
              />
            </div>
            <br />
          </>
        )}
        {step === 3 && (
          <>
            <div className={styles.labelInputGroup}>
              <label className={styles.labels} htmlFor="preco">Preço</label>
              <input
                className={styles.inputPrecoCadastro}
                value={formVeiculo.preco}
                onChange={handleChange}
                type="number"
                min="0"
                name="preco"
                id="preco"
              />
            </div>
            <br />
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
            <div className={styles.labelInputGroup}>
              <label className={styles.labels} htmlFor="descricao">Descrição</label>
              <textarea
                className={styles.textareaCadastro}
                value={formVeiculo.descricao}
                onChange={handleChange}
                name="descricao"
                id="descricao"
                cols="30"
                rows="10"
              ></textarea>
            </div>
            <br />
          </>
        )}
        {step === 4 && (
          <>
            <div className={styles.labelInputGroup}>
              <label className={styles.labels} htmlFor="concessionaria">Concessionária</label>
              <select
                className={styles.selectCadastro}
                value={formVeiculo.concessionaria}
                onChange={handleChange}
                name="concessionariaId"
                id="concessionariaId"
              >
                <option value="">Selecione uma concessionária</option>
                {concessionarias.length > 0 &&
                  concessionarias.map((concessionaria) => (
                    <option key={concessionaria.id} value={concessionaria.id}>
                      {concessionaria.nome}
                    </option>
                  ))}
              </select>
            </div>
            <br />
            <div className={styles.labelInputGroup}>
              <label className={styles.labels} htmlFor="chassi">Chassi</label>
              <input
                className={styles.inputCadastro}
                value={formVeiculo.chassi}
                onChange={handleChange}
                type="text"
                name="chassi"
                id="chassi"
              />
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
