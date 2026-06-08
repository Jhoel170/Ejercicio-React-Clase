const express = require("express");
const app = express();
const puerto = 8000;

app.get("/", (req, res) => {
    console.log("Ejecutando endpoint")
    //res.json({"mensaje": "Hola mundo el OSCAR es demasiado FALSOOO!"})
    res.send("Hola Oscar Falso _ Probando el Doraemon!")
})

app.get("/estudiantes", (req, res) => {
    res.json({"mensaje": "Endpoint para obtener lista de estudiantes"})
})

app.get("/estudiantes/:id", (req, res) => {
    const {id} = req.params
    res.json({mensaje: `Endpoint para obtener estudiante con id ${id}`})
})

app.delete("/estudiantes/:id", (req, res) => {
    const {id} = req.params
    res.json({mensaje: `Endpoint para eliminar estudiante con id ${id}`})
})

app.listen(puerto, () => console.log("El servidor está escuchando en el puerto: ", puerto))