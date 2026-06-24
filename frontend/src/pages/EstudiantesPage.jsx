import Estudiante from "../components/Estudiante";
import { useNavigate } from "react-router-dom";
import { getId } from "../utils/normalizador";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const EstudiantesPage = (props) => {
    const { estudiantes, onEliminar } = props;
    const navegar = useNavigate();
    const cerrarSesion = () => {
        localStorage.removeItem("token");
        navegar("/estudiantes/login");
    };

    if (!estudiantes || estudiantes.length === 0) {
        return (
            <div>
                <button onClick={() => navegar("/estudiantes/nuevo")}>+</button>
                <p>No hay estudiantes</p>
            </div>
        );
    }

    return (
        <div>
            <button onClick={cerrarSesion}>Cerrar sesión</button>
            <br />
            <button onClick={() => navegar("/estudiantes/nuevo")}>+</button>
            {estudiantes.map((estudiante) => {
                // USA getId() universal
                const id = getId(estudiante);
                return (
                    <div key={id}>
                        <Estudiante
                            nombre={estudiante.nombre}
                            edad={estudiante.edad}
                            url={estudiante.url}
                            email={estudiante.email}
                            password={estudiante.password}
                        />
                        <button
                            onClick={() =>
                                navegar(`/estudiantes/${id}/detalle`)
                            }
                        >
                            Detalle
                        </button>
                        <button onClick={() => onEliminar(id)}>
                            Eliminar
                        </button>
                    </div>
                );
            })}
        </div>
    );
};

export default EstudiantesPage;