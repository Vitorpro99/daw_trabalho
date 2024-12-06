import styles from "@/styles/estilocadastros.module.css";

export default function cadastroProdutos() {
  return (
    <>
      
      <div className={styles.divCadastro} id="divCadastro">
      <h2>Cadastro de veiculos</h2>
        <form>
          <label htmlFor="marca">Marca</label>
          <input className={styles.inputCadastro} type="text" name="marca" id="name" />
          <br />
          <label htmlFor="name">Modelo</label>
          <input type="text" name="modelo" id="name" />
          <br />
          <label htmlFor="categoria">Categoria</label>
          <input type="text" name="categoria" id="categoria" />
          <br />
          <button type="submit">Enviar</button>
        </form>
      </div>
    </>
  );
}
