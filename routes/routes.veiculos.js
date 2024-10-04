module.exports = (app) => {
    const veiculos = require("../controllers/veiculos.controller.js" );
    var router = require("express").Router();
    const multer = require("multer");
        const fs = require("fs");
        var path = require("path");

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/');
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '-' + path.extname(file.originalname));
        }
    });
    const upload = multer({
        storage: storage,
    })
    router.post("/upload/", upload.single("file"), async (req, res) =>
    {
        res.send({
            upload:true,
            file:req.file
        });
    });
    router.get("upload/:arquivo", (req, res) =>{
        const arquivo = path.dirname(__dirname)
        +`/uploads/veiculos + ${req.params.arquivo};`
        fs.readFile(arquivo,function(err, data){
            res,contentType("png");
            res.send(data);
        });
    });

    // Rota para criar um produto
    router.post("/", veiculos.create);
    // Rota que retorna todos os veiculos
    router.get("/", veiculos.findAll);
    // Rota que retorna um produto pelo id
    router.get("/:id", veiculos.findOne);
    // Rota que atualiza um produto pelo id
    router.put("/:id", veiculos.update);
    // Rota para deletar um produto pelo id
    router.delete("/:id", veiculos.delete);
    // Rota para deletar todos os veiculos
    router.delete("/", veiculos.deleteAll);
    // A linha abaixo informa que todas essas rotas são encontradas após o
    //veiculos. Isto é, localhost:8080/veiculos/rota
    app.use("/veiculos", router);
    };