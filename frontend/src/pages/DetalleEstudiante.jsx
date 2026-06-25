import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../utils/api";
import { getId } from "../utils/normalizador"; // ✅ IMPORTA

const DetalleEstudiante = () => {
    const [estudiante, setEstudiante] = useState(null);
    const [cargando, setCargando] = useState(true);
    const { id } = useParams();
    const navegar = useNavigate();
    const token = localStorage.getItem("token");
    
    useEffect(() => {
        api.get(`/estudiantes/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                setEstudiante(res.data);
            })
            .catch(err => {
                console.log("❌ Error:", err);
                setEstudiante(null);
            })
            .finally(() => {
                setCargando(false);
            });
    }, [id]);

    if (cargando) {
        return <div>Cargando...</div>;
    }

    if (!estudiante) {
        return (
            <div>
                <h2>Estudiante no encontrado</h2>
                <button onClick={() => navegar("/estudiantes")}>Volver</button>
            </div>
        );
    }

    // ✅ USA getId() universal
    const estudianteId = getId(estudiante);

    return (
        <div>
            <h2>{estudiante.nombre}</h2>

            <h4>Edad: {estudiante.edad}</h4>

            <p>Email: {estudiante.email}</p>

            {estudiante.url ? (
                <a href={estudiante.url} target="_blank" rel="noopener noreferrer">
                    Home Page
                </a>
            ) : (
                <span>Home page no disponible</span>
            )}

            <div>
                <button onClick={() => navegar(`/estudiantes/${estudianteId}/editar`)}>
                    Editar
                </button>
                <button onClick={() => navegar("/estudiantes")}>
                    Volver
                </button>
            </div>
        </div>
    );
};

export default DetalleEstudiante;