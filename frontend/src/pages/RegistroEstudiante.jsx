import EstudianteForm from "../components/EstudianteForm";
import { useNavigate } from "react-router-dom";

const RegistroEstudiante = ({ onAgregar }) => {

    const navegar = useNavigate();

    const handleRegistro = (data) => {
        console.log("🔥 REGISTRO DATA:", data);
        return onAgregar(data)
            .then(() => {
                console.log("✅ PROMESA RESUELTA");
                navegar("/estudiantes/login");
            })
            .catch(err => {
                console.log("ERROR BACKEND:", err.response?.data);
            });
    };

    return (
        <div>
            <h2>Registro de Estudiante</h2>

            <EstudianteForm onAgregar={handleRegistro} />
        </div>
    );
};

export default RegistroEstudiante;