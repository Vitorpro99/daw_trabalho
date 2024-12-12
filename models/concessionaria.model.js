module.exports = (sequelize,Sequelize) => {

    const concessionaria = sequelize.define("concessionaria",{
        nome: {type: Sequelize.STRING},
        endereco: {type: Sequelize.STRING},
        cnpj: {type: Sequelize.BIGINT},
        cidade: {type: Sequelize.STRING},
        foto:{type: Sequelize.STRING},
        usuarioId: {type: Sequelize.INTEGER},
        email:{type: Sequelize.STRING},
        telefone:{type: Sequelize.BIGINT},
        lat: {type: Sequelize.DOUBLE},
        long: {type: Sequelize.DOUBLE}
    },{freezeTableName: true}
);
return concessionaria

}