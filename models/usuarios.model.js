module.exports = (sequelize,Sequelize) => {

    const usuarios = sequelize.define("usuarios",{
        nome:{type: Sequelize.STRING},
        email:{type: Sequelize.STRING},
        senha:{type: Sequelize.STRING},
        foto:{type: Sequelize.STRING},

    }, 
    {freezeTableName:true}
);
return usuarios;
}