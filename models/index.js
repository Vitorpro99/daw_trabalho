const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
// const sequelize = new Sequelize(
//     config.DB,
//     config.USER,
//     config.PASSWORD,
//     config
// );


const sequelize = new Sequelize(
  "postgres://gmjphptq:i56thuIpPuHSeRIC1VEALTcDYEziMFVk@heffalump.db.elephantsql.com/gmjphptq"
);


const db = {};

db.Sequilize = Sequelize;
db.sequelize = sequelize;

db.veiculos = require("./veiculos.model.js") (sequelize, Sequelize);
db.concessionaria = require("./concessionaria.model.js") (sequelize, Sequelize);
db.usuarios = require("./usuarios.model.js") (sequelize, Sequelize);

db.usuarios.hasOne(db.concessionaria);
db.concessionaria.hasOne(db.usuarios);

db.concessionaria.hasMany(db.veiculos);
db.veiculos.hasOne(db.concessionaria);

module.exports = db;