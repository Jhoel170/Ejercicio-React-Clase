import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../utils/api";

const EstudianteForm = (props) => {
    
    const {onAgregar, onEditar} = props;
    const { id } = useParams();

    const [nuevoEstudiante, setNuevoEstudiante] = useState ({
        nombre: "",
        edad: 170,
        url: "",
    });
    const navegar = useNavigate();

    const editar = !!id;

    useEffect(() => {
        if (editar) {
            api.get(`/estudiantes/${id}`)
                .then(res => {
                    console.log("📦 Datos cargados para editar:", res.data);
                    setNuevoEstudiante(res.data);
                })
                .catch(err => console.log(err))
        }
    }, [id]);

    const [errorNombre, setErrorNombre] = useState("");
    const [errorEdad, setErrorEdad] = useState("");

    const handlerSubmit = (e) => {
        e.preventDefault();
        
        let valid = true;

        if(nuevoEstudiante.nombre.length < 8) {
            setErrorNombre("Nombre debe tener al menos 8 caracteres");
            valid = false;
        } else {
            setErrorNombre("");
        }

        if(nuevoEstudiante.edad < 18) {
            setErrorEdad("No menores de 18");
            valid = false;
        } else {
            setErrorEdad("");
        }

        if (valid) {
            if (editar) {
                console.log("✏️ Editando con _id:", nuevoEstudiante._id);
                // ✅ Ahora onEditar retorna una promesa
                onEditar(nuevoEstudiante)
                    .then(() => {
                        console.log("✅ Redirigiendo a lista...");
                        navegar("/estudiantes");
                    })
                    .catch(err => {
                        console.log("❌ Error al editar:", err);
                    });
            } else {
                onAgregar(nuevoEstudiante)
                    .then(() => {
                        console.log("✅ Redirigiendo a lista...");
                        navegar("/estudiantes");
                    })
                    .catch(err => {
                        console.log("❌ Error al agregar:", err);
                    });
            }
        }
    }

    return(
        <form onSubmit={handlerSubmit}>
            <div>
                <label htmlFor="est_nombre">Nombre: </label>
                <input 
                    type="text" 
                    name="est_nombre" 
                    id="est_nombre" 
                    value={nuevoEstudiante.nombre} 
                    onChange={(e) => setNuevoEstudiante(prev => ({...prev, nombre: e.target.value}))} 
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
                    onChange={(e) => setNuevoEstudiante(prev => ({...prev, edad: parseInt(e.target.value)}))} 
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
                    onChange={(e) => setNuevoEstudiante(prev => ({...prev, url: e.target.value}))} 
                    placeholder="Ingresa url" 
                />
            </div>
            <div>
                <input type="submit" value={editar ? "Actualizar" : "Agregar"}/>
                <button type="button" onClick={() => navegar("/estudiantes")}>Cancelar</button>
            </div>
        </form>
    )
}

export default EstudianteForm;