import EstudianteForm from "./components/EstudianteForm";
import EstudiantesPage from "./pages/EstudiantesPage";
import HomePage from "./pages/HomePage"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useEstudiante } from "./hooks/useEstudiante";  //1
import DetalleEstudiante from "./pages/DetalleEstudiante";
import LoginEstudiante from "./pages/LoginEstudiante";
import RutaProtegida from "./components/RutaProtegida";
import RegistroEstudiante from "./pages/RegistroEstudiante";

const App = () => {

  const { estudiantes, agregarEstudiante, eliminarEstudiante, editarEstudiante } = useEstudiante();  //2

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/estudiantes" element={<RutaProtegida> <EstudiantesPage estudiantes={estudiantes} onEliminar={eliminarEstudiante} /> </RutaProtegida>} />
        <Route path="/estudiantes/nuevo" element={<RutaProtegida><EstudianteForm onAgregar={agregarEstudiante} /></RutaProtegida>}></Route>
        <Route path="/estudiantes/:id/detalle" element={<DetalleEstudiante />}></Route>
        <Route path="/estudiantes/:id/editar" element={<EstudianteForm onEditar={editarEstudiante} />}></Route>
        <Route path="/registro" element={<RegistroEstudiante onAgregar={agregarEstudiante} />} />
        <Route path="/estudiantes/login" element={<LoginEstudiante />}></Route>
        <Route path="/" element={<HomePage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;