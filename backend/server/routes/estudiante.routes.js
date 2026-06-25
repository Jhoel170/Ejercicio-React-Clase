const EstudianteController = require("../controllers/estudiante.controllers")
const { protect } = require("../middleware/authentication_mw")
const { authorizeRoles } = require("../middleware/authorization_mw")

module.exports = function(app) {
    app.post("/estudiantes/login", EstudianteController.loginEstudiante);
    app.post("/estudiantes", authorizeRoles("admin"), EstudianteController.createEstudiante);

    app.get("/estudiantes", protect, authorizeRoles("visualizador"), EstudianteController.getAllEstudiantes);
    app.get("/estudiantes/:id", protect, authorizeRoles("visualizador"), EstudianteController.getEstudiante);
    app.put("/estudiantes/:id", protect, authorizeRoles("admin"), EstudianteController.updateEstudiante);
    app.delete("/estudiantes/:id", protect, authorizeRoles("admin"), EstudianteController.deleteEstudiante);
}






























































/* OwO */