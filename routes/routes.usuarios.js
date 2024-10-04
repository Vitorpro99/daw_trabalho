module.exports = (app) => {
    const usuarios = require("../controllers/usuario.controller.js" );
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
        +`/uploads/usuarios + ${req.params.arquivo};`
        fs.readFile(arquivo,function(err, data){
            res,contentType("png");
            res.send(data);
        });
    });

    // Rota para criar um produto
    router.post("/", usuarios.create);
    // Rota que retorna todos os usuarios
    router.get("/", usuarios.findAll);
    // Rota que retorna um produto pelo id
    router.get("/:id", usuarios.findOne);
    // Rota que atualiza um produto pelo id
    router.put("/:id", usuarios.update);
    // Rota para deletar um produto pelo id
    router.delete("/:id", usuarios.delete);
    // Rota para deletar todos os usuarios
    router.delete("/", usuarios.deleteAll);
    // A linha abaixo informa que todas essas rotas são encontradas após o
    //usuarios. Isto é, localhost:8080/usuarios/rota
    app.use("/usuarios", router);
    };