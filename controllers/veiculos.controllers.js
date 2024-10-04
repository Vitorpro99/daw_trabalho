const db = require("../models");
const Veiculos = db.veiculos;

exports.create = (req,res) =>{
    if(!req.body.nome){
        res.status(400).send({
            message: "Nome é obrigatório, não pode estar vazio"
        });
        const veiculo = {
            marca: req.body.marca,
            modelo: req.body.modelo,
            ano: req.body.ano,
            categoria: req.body.categoria,
            kilometragem: req.body.kilometragem,
            cor: req.body.cor,
            preco: req.body.preco,
            foto: req.body.foto
        };
        Veiculos.create(veiculo)
            .then((data) => {
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

    Veiculos.findAll({ where : condition})
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

    Veiculo.findByPk(id)
        .then((data) => {
            if(data){
                res,send;
            }else{
                res.status(404).send({
                    message: `Veiculo não encontrada com o id= ${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Erro ao tentar encontrar a Veiculo pelo id=" + id,
            });
        });
};

exports.update = (req,res) =>{
    const id = req.params.id;

    Veiculos.update(req.body,{
        where: {id: id},
    })
    .then((num) => {
        if(num == 1){
            res.send({
                message: "Veiculo atualizada com sucesso"
            });
        }
        else{
            res.send({
                message: `Não foi possível atualizar a Veiculo com id=${id} verifique se o  reqbody não está vazio ou não foi possivel encontrar o produto`
            });
        }
    })
    .catch((err) => {
        res.status(500).send({
            message: err.message || "Erro ao tentar atualizar a Veiculo com id=" + id,
        });
    });
};

exports.delete = (req,res) =>{
    const id = req.params.id;

    Veiculos.destroy({
        where: {id : id},
    })
        .then((num) =>{
            if(num == 1){
                res.send({
                    message: "Veiculo deletado com sucesso!"
                });
            }
            else{
                res.send({
                    message: `Não foi possível deletar o Veiculo com id=${id}, ele não foi encontrado`
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Erro ao tentar deletar o Veiculo com id=" + id,
            });
        });
}
exports.deleteAll = (req,res) =>{
    Veiculos.destroy({ where:{}, truncate: false,})
    .then((nums) =>{
        res.send({ message: `${nums} Veiculos foram deletados com sucesso!` });
    })
    .catch((err) => {
        res.status(500).send({
            message: err.message || "Erro ao tentar deletar todos as Veiculos",
        });
    });
};