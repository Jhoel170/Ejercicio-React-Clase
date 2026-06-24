const EstudianteController = require("../controllers/estudiante.controllers")
const { protect } = require("../middleware/authentication_mw")

module.exports = function(app) {
    app.post("/estudiantes/login", EstudianteController.loginEstudiante);
    app.post("/estudiantes", EstudianteController.createEstudiante);

    app.get("/estudiantes", protect, EstudianteController.getAllEstudiantes);
    app.get("/estudiantes/:id", protect, EstudianteController.getEstudiante);
    app.put("/estudiantes/:id", protect, EstudianteController.updateEstudiante);
    app.delete("/estudiantes/:id", protect, EstudianteController.deleteEstudiante);
}






























































/* OwO */