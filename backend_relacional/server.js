require ("./config/sequelize.config")
const express = require("express")
const app = express()
const puerto = 8000
const allEstudianteRoutes = require("./routes/estudiante.routes");
/* res = es un objeto que contiene los metodos para responder a un la solicitud del cliente
_ para cuando no ocupamos alguno
Debe existir un cierre en el ciclo solicitud respuesta
*/
allEstudianteRoutes(app);
app.listen (puerto, ()=>console.log("El servidor esta escuchando en el puerto:", puerto))