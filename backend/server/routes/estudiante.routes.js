const EstudianteController = require("../controllers/estudiante.controllers")

module.exports = function(app) {
    app.get("/estudiantes", EstudianteController.getAllEstudiantes)
}