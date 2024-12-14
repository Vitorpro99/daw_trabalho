const multer = require("multer");
const fs = require("fs");
const path = require("path");

module.exports = (app) => {
  const veiculos = require("../controllers/veiculos.controllers.js");
  const router = require("express").Router();

  // Configuração do multer
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = path.join(__dirname, "../uploads/veiculos/"); // Define o diretório de uploads
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true }); // Cria a pasta 'veiculos' caso não exista
      }
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const timestamp = Date.now();
      const extension = path.extname(file.originalname);
      cb(null, `${timestamp}${extension}`); // Gera um nome único para o arquivo
    },
  });
  
  const upload = multer({ storage });
  
  // Rota de upload
  router.post("/upload/", upload.single("file"), async (req, res) => {
    if (!req.file) {
      return res.status(400).send({ upload: false, error: "Nenhum arquivo enviado" });
    }
  
    res.status(200).send({
      upload: true,
      file: req.file,
    });
  });
  
  // Rota para servir arquivos (acesso via URL)
  router.get("/upload/:arquivo", (req, res) => {
    const arquivoPath = path.join(__dirname, "../uploads/veiculos/", req.params.arquivo); // Caminho completo para a subpasta 'veiculos/'
  
    if (!fs.existsSync(arquivoPath)) {
      return res.status(404).send({ message: "Arquivo não encontrado!" });
    }
  
    res.type(path.extname(arquivoPath)); // Define o tipo MIME do arquivo
    res.sendFile(arquivoPath); // Envia o arquivo de volta ao cliente
  });
  

  // Rota para criar um veículo
  router.post("/", veiculos.create);

  // Rota que retorna todos os veículos
  router.get("/", veiculos.findAll);

  // Rota que retorna um veículo pelo id
  router.get("/:id", veiculos.findOne);

  // Rota que atualiza um veículo pelo id
  router.put("/:id", veiculos.update);

  // Rota para deletar um veículo pelo id
  router.delete("/:id", veiculos.delete);

  // Rota para deletar todos os veículos
  router.delete("/", veiculos.deleteAll);

  // Define todas as rotas com prefixo "/veiculos"
  app.use("/veiculos/", router);
};
