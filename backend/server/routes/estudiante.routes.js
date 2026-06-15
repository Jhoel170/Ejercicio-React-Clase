const EstudianteController = require("../controllers/estudiante.controllers")

module.exports = function(app) {
    app.get("/estudiantes", EstudianteController.getAllEstudiantes);
    app.get("/estudiantes/:id", EstudianteController.getEstudiante);
    app.post("/estudiantes", EstudianteController.createEstudiante);
    app.put("/estudiantes/:id", EstudianteController.updateEstudiante);
    app.delete("/estudiantes/:id", EstudianteController.deleteEstudiante);
}