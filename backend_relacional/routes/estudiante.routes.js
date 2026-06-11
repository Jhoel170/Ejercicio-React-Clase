const EstudianteController = require("../controllers/estudiante.controller");

module.exports = function(app){
    app.get("/estudiantes", EstudianteController.getAllEstudiantes);
    app.get("/estudiantes/:id", EstudianteController.getEstudiante);
    app.post("/estudiante", EstudianteController.createEstudiante);
    app.put("/estudiantes/:id", EstudianteController.updateEstudiante);
    app.delete("/estudiante/:id", EstudianteController.deleteEstudiante);
}