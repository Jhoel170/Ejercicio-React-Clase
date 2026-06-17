const { response } = require("express")
const Estudiante = require("../models/estudiante.model")

module.exports.getAllEstudiantes = (_, response) => {
    console.log("Ejecucion dle metodo")
    Estudiante.find({})
    .then(estudiantes => response.json(estudiantes))
    .catch(err => response.json(err))
}

module.exports.getEstudiante = (req, response) => {

    Estudiante.findOne({ _id: req.params.id })
        .then(est => {
            if (!est) {
                return response.status(404).json({ message: "Estudiante no encontrado" });
            }
            response.json(est);
        })
        .catch(err => response.status(400).json(err));
};

module.exports.createEstudiante = (req, response) => {
    const body = req.body;
    console.log(body);
    
    Estudiante.create(body)
        .then(estudiante => response.status(201).json(estudiante))
        .catch(err => response.status(400).json(err));
};

module.exports.updateEstudiante = (req, response) => {
    const { id } = req.params;
    const body = req.body;
    console.log(body);
    
    Estudiante.findOneAndUpdate(
        { _id: id },  // Condición: buscar por id
        body,         // Datos a actualizar
        { new: true, runValidators: true }  // Opciones: retorna el documento actualizado
    )
        .then(estudiante => {
            if (!estudiante) {
                return response.status(404).json({ message: "Estudiante no encontrado" });
            }
            response.json(estudiante);
        })
        .catch(err => response.status(400).json(err));
};

module.exports.deleteEstudiante = (req, response) => {
    const { id } = req.params;
    
    Estudiante.deleteOne({ _id: id })
        .then(result => {
            if (result.deletedCount === 0) {
                return response.status(404).json({ m    });
            }
            response.json({ message: "Estudiante eliminado correctamente" });
        })
        .catch(err => response.status(400).json(err));
};