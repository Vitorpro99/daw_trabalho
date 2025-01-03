const { STRING } = require("sequelize");

module.exports = (sequelize, Sequelize) => {

    const veiculo = sequelize.define( "veiculo",{
        marca: {type: Sequelize.STRING},
        modelo: {type: Sequelize.STRING},
        ano: {type: Sequelize.INTEGER},
        categoria: {type: Sequelize.STRING},
        kilometragem: {type: Sequelize.BIGINT},        
        cor: {type: Sequelize.STRING},
        preco: {type: Sequelize.FLOAT},
        foto: {type : Sequelize.STRING},
        descricao: {type : Sequelize.STRING},
        chassi: {type: Sequelize.STRING},
        concessionariaId: {type : Sequelize.INTEGER},
    }, 
{ freezeTableName:true}
);
return veiculo;

}