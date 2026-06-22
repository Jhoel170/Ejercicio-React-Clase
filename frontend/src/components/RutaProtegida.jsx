import { Navigate } from "react-router-dom";

const RutaProtegida = ({ children }) => {

    const logueado = localStorage.getItem("logueado");

    if (logueado === "true") {
        return children;
    }

    return <Navigate to="/estudiantes/login" />;
}

export default RutaProtegida;