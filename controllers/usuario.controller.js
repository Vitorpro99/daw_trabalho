const db = require("../models");
const Usuarios = db.usuarios;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
    const secretKey = 'concessionaria secret key'


exports.create = (req,res) =>{
    if(!req.body.nome){
        res.status(400).send({
            message: "Nome é obrigatório, não pode estar vazio"
        });
        const usuario = {
            nome: req.body.nome,
            email: req.body.email,
            senha: bcrypt.hashSync(req.body.senha,10),
            foto: req.body.foto
        }

        Usuarios.create(usuario)
    .then((data) =>{
        res.send(data);
    })
            .catch((err) => {
                res.status(500).send({
                    message: err.message || "Erro ao tentar cadastrar o veículo."
                });
            });
};
};
exports.findAll = (req,res) =>{
    const nome = req.query.nome;
    var condition = nome ? {nome : { [Op.iLike]: `%${nome}%`}}:null; 

    Usuarios.findAll({ where : condition})
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Erro ao ao procurar pela concessionária",
            });
        });
};

exports.findOne = (req,res) =>{
    const id = req.params.id;

    Usuario.findByPk(id)
        .then((data) => {
            if(data){
                res,send;
            }else{
                res.status(404).send({
                    message: `Usuário não encontrada com o id= ${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Erro ao tentar encontrar a Usuário pelo id=" + id,
            });
        });
};

exports.update = (req,res) =>{
    const id = req.params.id;

    Usuarios.update(req.body,{
        where: {id: id},
    })
    .then((num) => {
        if(num == 1){
            res.send({
                message: "Usuario atualizado com sucesso"
            });
        }
        else{
            res.send({
                message: `Não foi possível atualizar o Usuário com id=${id} verifique se o  reqbody não está vazio ou não foi possivel encontrar o produto`
            });
        }
    })
    .catch((err) => {
        res.status(500).send({
            message: err.message || "Erro ao tentar atualizar o Usuário com id=" + id,
        });
    });
};

exports.delete = (req,res) =>{
    const id = req.params.id;

    Usuarios.destroy({
        where: {id : id},
    })
        .then((num) =>{
            if(num == 1){
                res.send({
                    message: "Usuário deletado com sucesso!"
                });
            }
            else{
                res.send({
                    message: `Não foi possível deletar o Usuário com id=${id}, ele não foi encontrado`
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Erro ao tentar deletar o Usuŕio com id=" + id,
            });
        });
};
exports.deleteAll = (req,res) =>{
    Usuario.destroy({ where:{}, truncate: false,})
    .then((nums) =>{
        res.send({ message: `${nums} Usuários foram deletados com sucesso!` });
    })
    .catch((err) => {
        res.status(500).send({
            message: err.message || "Erro ao tentar deletar todos os Usuários",
        });
    });
};
exports.login = (req, res) =>{
    Usuario.findOne({
        where: {
        email: req.body.email,
        },
        })
    .then((usuario) =>{
        if(!usuario){
            return res.status(404).send({ message: 'Usuário não encontrado.' });
        }
        var passwordIsValid = bcrypt.compareSync(req.body.senha, usuario.senha);

        if(!passwordIsValid){
            return res.status(401).send({
                message: "Senha incorreta.",
            });
        }
        var token = jwt.sign({ id: usuario.id }, secretKey, { expiresIn: "1h"
        });
        res.status(200).send({ usuario: usuario, accessToken: token });
        })
        .catch((err) => res.status(500).send({ message: err.message }))};