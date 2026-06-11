const { Estudiante } = require("../models/estudiante.model");

module.exports.getAllEstudiantes = (_, response) => {
    Estudiante.findAll()
        .then(estudiantes => response.json(estudiantes))
        .catch(err => response.json(err));
};

/*module.exports.getEstudianteById = (request, response) => {
    const { id } = request.params;
    Estudiante.findByPk(id)
        .then(estudiante => {
            if (!estudiante) return response.status(404).json({ msg: "Estudiante no encontrado" });
            response.json(estudiante);
        })
        .catch(err => response.json(err));
};

module.exports.createEstudiante = (request, response) => {
    const body = request.body;
    Estudiante.create(body)
        .then(estudiante => response.json(estudiante))
        .catch(err => response.json(err));
};

module.exports.updateEstudiante = (request, response) => {
    const { id } = request.params;
    const body = request.body;
    Estudiante.update(body, { where: { id } })
        .then(() => Estudiante.findByPk(id))
        .then(estudiante => response.json(estudiante))
        .catch(err => response.json(err));
};

module.exports.deleteEstudiante = (request, response) => {
    const { id } = request.params;
    Estudiante.destroy({ where: { id } })
        .then(() => response.json({ msg: "Estudiante eliminado correctamente" }))
        .catch(err => response.json(err));
};*/