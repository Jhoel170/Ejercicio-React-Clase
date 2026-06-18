const mongoose = require("mongoose");

const EstudianteSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "Nombre es requerido"]
    },
    edad: {
        type: Number,
        required: [true, "Edad es requerida"],
        min: [1, "Edad debe ser mayor a 0"],
        max: [120, "Edad debe ser menor a 120"]
    },
    url: {
        type: String,
        required: false,
        validate: {
            validator: function(v) {
                if (!v) return true;
                return /^https?:\/\/.+\..+/.test(v);
            },
            message: "URL no válida"
        }
    },
    email:{
        type: String,
        required: [true, "Pon el Email"]
    },
    password: {
        type: String,
        required: [ true, "Password is required"]
    },
}, {
    timestamps: true, // Guarda en cada registro un actualizado 
    versionKey: false   // Elimina el campo __v
});

const Estudiante = mongoose.model("Estudiante", EstudianteSchema);

module.exports = Estudiante;