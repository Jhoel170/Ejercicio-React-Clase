const { Estudiante } = require("../models/estudiante.model");

module.exports.getAllEstudiantes = (_, response) => {
    Estudiante.findAll()
        .then(estudiantes => response.json(estudiantes))
        .catch(err => response.json(err));
};

module.exports.getEstudiante = (request, response) => {
    Estudiante.findOne({ where: { id: request.params.id } })
        .then(est => response.json(est))
        .catch(err => response.status(404).json(err));
}

module.exports.createEstudiante = (request, response) => {
    const body = request.body;
        console.log(body)
    Estudiante.create(body)
        .then(estudiante => response.json(estudiante))
        .catch(err => response.json(err));
};

module.exports.updateEstudiante = (request, response) => {
    const { id } = request.params;
    const body = request.body;
    console.log(body)
    Estudiante.update(body, { where: { id: request.params.id } })
        .then(() => Estudiante.findOne({ where: { id: request.params.id } }))
        .then(estudiante => response.json(estudiante))
        .catch(err => response.json(err));
};

module.exports.deleteEstudiante = (request, response) => {
    const { id } = request.params;
    Estudiante.destroy({ where: { id: request.params.id } })
        .then(() => response.json({ msg: "Estudiante eliminado correctamente" }))
        .catch(err => response.json(err));
}
