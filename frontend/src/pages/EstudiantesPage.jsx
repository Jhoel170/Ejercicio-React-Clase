import Estudiante from "../components/Estudiante";
import { Navigate, useNavigate } from "react-router-dom";

//import { listaEstudiantes } from "../utils/data";
import EstudianteForm from "../components/EstudianteForm";
const EstudiantesPage = (props) => {
    const { estudiantes, onEliminar } = props;
    const navegar = useNavigate();
    return (
        <div>
            <button onClick={() => navegar("/estudiantes/nuevo")}>+</button>
            {
                Array.isArray(estudiantes) &&
                estudiantes.map((estudiante) => (
                    <div key={estudiante.id}>
                        <Estudiante
                            nombre={estudiante.nombre}
                            edad={estudiante.edad}
                            url={estudiante.url}
                        />
                        <button
                            onClick={() =>
                                navegar(`/estudiantes/${estudiante.id}/detalle`)
                            }
                        >
                            Detalle
                        </button>
                        <button onClick={() => onEliminar(estudiante.id)}>
                            Eliminar
                        </button>
                    </div>
                ))
            }


        </div>
    );
}
export default EstudiantesPage;