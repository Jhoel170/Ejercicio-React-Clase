const mongoose = require("mongoose");

const EstudianteSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [
            true,
            "Nombre es requerido"
        ]
    },
    edad: {
        type: Number,
        required: [
            true,
            "Edad es requerida"
        ]
    },
    url: {
        type: String,
        required: [
            false
        ]
    }
})

const Estudiante = mongoose.model("Estudiante", EstudianteSchema);

module.exports = Estudiante;