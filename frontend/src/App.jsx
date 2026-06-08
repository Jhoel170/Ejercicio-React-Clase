import EstudianteForm from "./components/EstudianteForm";
import EstudiantesPage from "./pages/EstudiantesPage";
import HomePage from "./pages/HomePage"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useEstudiante } from "./hooks/useEstudiante";  //1
import DetalleEstudiante from "./pages/DetalleEstudiante";

const App = () => {

  const { estudiantes, agregarEstudiante, eliminarEstudiante, editarEstudiante} = useEstudiante();  //2

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/estudiantes" element= {<EstudiantesPage estudiantes = {estudiantes} onEliminar = {eliminarEstudiante}/>}></Route> {/* 3 */ }
        <Route path="/estudiantes/nuevo" element= {<EstudianteForm onAgregar = {agregarEstudiante} />}></Route>
        <Route path= "/estudiantes/:id/detalle" element= {<DetalleEstudiante/>}></Route>
        <Route path="/estudiantes/:id/editar" element= {<EstudianteForm onEditar = {editarEstudiante} />}></Route>
        <Route path="/" element= {<HomePage/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;