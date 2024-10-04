const db = require("../models");
const Concessionaria = db.concessionaria;

exports.create = (req,res) =>{
if(!req.body.nome){
    res.status(400).send({
        message: "Nome é obrigatório, não pode estar vazio"
    });
    const concessionaria = {
        nome: req.body.nome,
        endereco: req.body.endereco,
        cnpj: req.body.cnpj,
        cidade: req.body.cidade,
        foto: req.body.foto
    }
    concessionaria.create(concessionaria)
        .then((data)=> {
            res.send(data)
        })
        .catch((err)=> {
            res.status(500).send({
                message: err.message || "Erro ao tentar cadastrar a concessionária."
            });
        });
}
};

exports.findAll = (req,res) =>{
   const nome = req.query.nome;
    var condition = nome ? {nome : { [Op.iLike]: `%${nome}%`}}:null; 

    Concessionaria.findAll({ where : condition})
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

    Concessionaria.findByPk(id)
        .then((data) => {
            if(data){
                res,send;
            }else{
                res.status(404).send({
                    message: `Concessionária não encontrada com o id= ${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Erro ao tentar encontrar a concessionária pelo id=" + id,
            });
        });
};

exports.update = (req,res) =>{
    const id = req.params.id;

    Concessionaria.update(req.body,{
        where: {id: id},
    })
    .then((num) => {
        if(num == 1){
            res.send({
                message: "Concessionária atualizada com sucesso"
            });
        }
        else{
            res.send({
                message: `Não foi possível atualizar a concessionária com id=${id} verifique se o  reqbody não está vazio ou não foi possivel encontrar o produto`
            });
        }
    })
    .catch((err) => {
        res.status(500).send({
            message: err.message || "Erro ao tentar atualizar a concessionária com id=" + id,
        });
    });
};

exports.delete = (req,res) =>{
    const id = req.params.id;

    Concessionaria.destroy({
        where: {id : id},
    })
        .then((num) =>{
            if(num == 1){
                res.send({
                    message: "Concessionária deletado com sucesso!"
                });
            }
            else{
                res.send({
                    message: `Não foi possível deletar o concessionária com id=${id}, ele não foi encontrado`
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Erro ao tentar deletar o concessionária com id=" + id,
            });
        });
};
exports.deleteAll = (req,res) =>{
    Concessionaria.destroy({ where:{}, truncate: false,})
    .then((nums) =>{
        res.send({ message: `${nums} Usuários foram deletadas com sucesso!` });
    })
    .catch((err) => {
        res.status(500).send({
            message: err.message || "Erro ao tentar deletar todos as concessionárias",
        });
    });
};