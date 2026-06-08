const { response } = require("express")
const Estudiante = require("../models/estudiante.model")

module.exports.getAllEstudiantes = (_, response) => {
    Estudiante.find({})
    .then(estudiantes => response.json(estudiantes))
    .catch(err => response.json(err))
}