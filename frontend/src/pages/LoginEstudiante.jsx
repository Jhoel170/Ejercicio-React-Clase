import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { api } from "../utils/api";
import { Link } from "react-router-dom";

const LoginEstudiante = (props) => {

    const [mostrarPassword, setMostrarPassword] = useState(false); // estado para poder mostrar o no la contraseña y la inicializo en falso para q no se pueda ver xdd
    const [errorLogin, setErrorLogin] = useState("");
    const navegar = useNavigate();

    const [estudiante, setEstudiante] = useState({
        email: "",
        password: ""
    });

    const [errorEmail, setErrorEmail] = useState("");

    const handlerSubmit = (e) => {
        e.preventDefault();

        let valid = true;

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(estudiante.email)) {
            setErrorEmail("Email debe tener el formato: example@xd.com");
            valid = false;
        } else {
            setErrorEmail("");
        }
        if (valid) {
            api.post("/estudiantes/login", estudiante)
                .then((res) => {
                    localStorage.setItem("logueado", "true");
                    navegar("/estudiantes");
                })
                .catch((err) => {
                    setErrorLogin("Credenciales incorrectas");
                });
        }
    }

    return (
        <form onSubmit={handlerSubmit}>
            <div>
                <h2><strong><em>LOGIN</em></strong></h2>
            </div>
            <div>
                <label htmlFor="est_email">Email: </label>
                <input
                    type="text"
                    name="est_email"
                    id="est_email"
                    placeholder="Ingresa email"
                    value={estudiante.email}
                    onChange={(e) => setEstudiante(prev => ({ ...prev, email: e.target.value }))}
                    required
                />
                <div style={{ color: "red" }}>{errorEmail}</div>
            </div>
            <div>
                <label htmlFor="est_passw">Password: </label>
                <input
                    type={mostrarPassword ? "text" : "password"}
                    name="est_passw"
                    id="est_passw"
                    placeholder="Ingresa password"
                    value={estudiante.password}
                    onChange={(e) => setEstudiante(prev => ({ ...prev, password: e.target.value }))}
                    required
                />
                <button
                    type="button"
                    onClick={() => setMostrarPassword(prev => !prev)}
                >
                    {mostrarPassword ? "Ocultar xd" : "Ver xd"}
                </button>
            </div>
            <div style={{ color: "red" }}>{errorLogin}</div>
            <br />
            <input type="submit" value={"Ingresar"} />
            <br />
            <Link to="/registro">
                ¿No tienes cuenta falso? Regístrate xd
            </Link>
        </form>
    )
}

export default LoginEstudiante;