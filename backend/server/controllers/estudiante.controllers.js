const { response } = require("express")
const Estudiante = require("../models/estudiante.model")
const bcrypt = require("bcryptjs")
const { token } = require("jsonwebtoken")
const jwt = require("jsonwebtoken")
require("dotenv").config();


const passwordxd = "170";

module.exports.getAllEstudiantes = (_, response) => {
    console.log("Ejecucion del metodo")
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

module.exports.createEstudiante = async (req, response) => {
    const { nombre, edad, url, email, password } = req.body;
    if (!nombre || !edad || !url || !email || !password) {
        response.status(400).json({ message: "Mising fields, all are mandatory" });
    } else {
        const estudianteEncontrado = await Estudiante.findOne({ email });
        if (estudianteEncontrado) {
            response.status(400).json({ message: "User already exist" });
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            Estudiante.create({
                nombre, edad, url, email, password: hashedPassword
            })
                .then(estudiante => response.status(201).json({ nombre: estudiante.nombre, edad: estudiante.edad, url: estudiante.url, email: estudiante.email, _id: estudiante._id, token: generateToken(estudiante._id) }))
                .catch(err => response.status(400).json(err));
        }
    }
};

module.exports.loginEstudiante = async (req, res) => {
    const { email, password } = req.body;
    const estudianteFound = await Estudiante.findOne({ email });
    if (estudianteFound && (await bcrypt.compare(password, estudianteFound.password))) {
        res.json({ message: "Login exitoso xd", email: estudianteFound.email, nombre: estudianteFound.nombre, token: generateToken(estudianteFound._id) })
    } else {
        res.status(400).json({ message: "Login fallido xd" })
    }
}

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
                return response.status(404).json({ m });
            }
            response.json({ message: "Estudiante eliminado correctamente" });
        })
        .catch(err => response.status(400).json(err));
};

const generateToken = (id) => {
    return jwt.sign({ id }, passwordxd, { expiresIn: "30d" })
}

