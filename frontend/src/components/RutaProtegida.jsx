import { Navigate } from "react-router-dom";

const RutaProtegida = ({children}) => {

    const logueado = localStorage.getItem("token");

    if (token) {
        return children;
    }

    return <Navigate to="/estudiantes/login" />;
}

export default RutaProtegida;