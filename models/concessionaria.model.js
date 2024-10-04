module.exports = (sequelize,Sequelize) => {

    const concessionaria = sequelize.define("concessionaria",{
        nome: {type: Sequelize.STRING},
        endereco: {type: Sequelize.STRING},
        cnpj: {type: Sequelize.STRING},
        cidade: {type: Sequelize.STRING},
        foto:{type: Sequelize.STRING}
    },{freezeTableName: true}
);
return concessionaria

}