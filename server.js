const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./models");

const app = express();

var corsOptions = {
    origin:
      "http://localhost:3001",
};
app.get("/", (req, res) =>{
    res.send("Rodando...");
})
    

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({  extended: true }));

db.sequelize
  .sync({alter : true})
  .then(() =>{
    console.log("Synced DB")
  })
  .catch((err) => {
    console.error("Erro ao sincronizar DB: ", err.message);
  });

  require("./routes/routes.concessionaria.js")(app);
  require("./routes/routes.usuarios.js")(app);
  require("./routes/routes.veiculos.js")(app);
  
app.listen(8000, function (req,res) {
    console.log("App rodando na porta 8000");
});