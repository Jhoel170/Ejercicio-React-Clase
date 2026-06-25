import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../utils/api";

const EstudianteForm = (props) => {

    const { onAgregar, onEditar } = props;
    const { id } = useParams();
    const modo = props.modo || "admin";
    const token = localStorage.getItem("token");

    const [nuevoEstudiante, setNuevoEstudiante] = useState({
        nombre: "",
        edad: 0,
        url: "",
        email: "",
        password: ""
    });

    const navegar = useNavigate();

    const editar = !!id;

    useEffect(() => {
        if (editar) {
            api.get(`/estudiantes/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(res => {
                    console.log("📦 Datos cargados para editar:", res.data);
                    setNuevoEstudiante(res.data);
                })
                .catch(err => console.log(err))
        }
    }, [id]);

    const [errorNombre, setErrorNombre] = useState("");
    const [errorEdad, setErrorEdad] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [mostrarPassword, setMostrarPassword] = useState(false);

    const handlerSubmit = (e) => {
        e.preventDefault();

        let valid = true;

        if (nuevoEstudiante.nombre.length < 8) {
            setErrorNombre("Nombre debe tener al menos 8 caracteres");
            valid = false;
        } else {
            setErrorNombre("");
        }

        if (nuevoEstudiante.edad < 18) {
            setErrorEdad("No menores de 18");
            valid = false;
        } else {
            setErrorEdad("");
        }

        if (!nuevoEstudiante.email) {
            setErrorEmail("Email es obligatorio");
            valid = false;
        } else {
            setErrorEmail("");
        }

        if (!nuevoEstudiante.password) {
            setErrorPassword("Password es obligatorio");
            valid = false;
        } else {
            setErrorPassword("");
        }

        if (valid) {
            if (editar) {
                // Ahora onEditar retorna una promesa
                onEditar(nuevoEstudiante)
                    .then(() => {
                        navegar("/estudiantes");
                    })
                    .catch(err => {
                        console.log("❌ Error al editar:", err);
                    });
            } else {
                onAgregar(nuevoEstudiante)
                    .then(() => {
                        if (modo === "registro") {
                            navegar("/estudiantes/login");
                        } else {
                            navegar("/estudiantes");
                        }
                    })
            }
        }
    }

    return (
        <form onSubmit={handlerSubmit}>
            <div>
                <label htmlFor="est_nombre">Nombre: </label>
                <input
                    type="text"
                    name="est_nombre"
                    id="est_nombre"
                    value={nuevoEstudiante.nombre}
                    onChange={(e) => setNuevoEstudiante(prev => ({ ...prev, nombre: e.target.value }))}
                    placeholder="Ingresa nombre"
                    required
                />
                <div style={{ color: "red" }}>{errorNombre}</div>
            </div>
            <div>
                <label htmlFor="est_edad">Edad: </label>
                <input
                    type="number"
                    name="est_edad"
                    id="est_edad"
                    value={nuevoEstudiante.edad}
                    onChange={(e) => setNuevoEstudiante(prev => ({ ...prev, edad: parseInt(e.target.value) }))}
                    placeholder="Ingresa edad"
                    required
                />
                <div style={{ color: "red" }}>{errorEdad}</div>
            </div>
            <div>
                <label htmlFor="est_url">URL: </label>
                <input
                    type="text"
                    name="est_url"
                    id="est_url"
                    value={nuevoEstudiante.url}
                    onChange={(e) => setNuevoEstudiante(prev => ({ ...prev, url: e.target.value }))}
                    placeholder="Ingresa url"
                />
            </div>
            <div>
                <label htmlFor="est_email">Email: </label>
                <input
                    type="text"
                    name="est_email"
                    id="est_email"
                    value={nuevoEstudiante.email}
                    onChange={(e) => setNuevoEstudiante(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="Ingresa email"
                    disabled={editar}
                />
                <div style={{ color: "red" }}>{errorEmail}</div>
            </div>
            {!editar && (
                <div>
                    <label htmlFor="est_passw">Password: </label>
                    <input
                        type={mostrarPassword ? "text" : "password"}
                        name="est_passw"
                        id="est_passw"
                        value={nuevoEstudiante.password}
                        onChange={(e) => setNuevoEstudiante(prev => ({ ...prev, password: e.target.value }))}
                        placeholder="Ingresa password"
                    />

                    <button
                        type="button"
                        onClick={() => setMostrarPassword(!mostrarPassword)}
                    >
                        {mostrarPassword ? "Ocultar xd" : "Ver xd"}
                    </button>

                    <div style={{ color: "red" }}>{errorPassword}</div>
                </div>
            )}
            <div>
                <input type="submit" value={editar ? "Actualizar" : "Agregar"} />
                <button type="button" onClick={() => navegar("/estudiantes")}>Cancelar</button>
            </div>
        </form>
    )
}

export default EstudianteForm;