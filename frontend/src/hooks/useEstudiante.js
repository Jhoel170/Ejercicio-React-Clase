// Gestionar el estado y las conexiones a la API que afectan a ese estado
import { useEffect, useState } from "react";
import { api } from "../utils/api";

export const useEstudiante = () => {
    const [estudiantes, setEstudiantes] = useState([]);

    useEffect(() => {
        api.get("/estudiantes")
            .then((res) => {
                setEstudiantes(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    const agregarEstudiante = (nuevoEstudiante) => {

        api.post("/estudiantes", nuevoEstudiante)
            .then((res) => {
                setEstudiantes(prev => [...prev, res.data]);
            })
            .catch((err) => {
                console.log("Error al agregar un estudiante");
            })


        /*setEstudiantes(prev => ([...prev, estudianteFinal]))
        api.post("/estudiantes", estudianteFinal)
        .then((res) => {
            setEstudiantes(res.data)
        })
        .catch((err) => {
            console.log(err);
        })*/
    }

    const editarEstudiante = (editadoEstudiante) => {

        api.put(`/estudiantes/${editadoEstudiante.id}`, editadoEstudiante)
            .then(res => setEstudiantes(prev =>
                prev.map(e => e.id === editadoEstudiante.id ? res.data : e)
            ))
            .catch((err) => console.log(err))
    }

    const eliminarEstudiante = (id) => {

        api.delete(`/estudiantes/${id}`)
            .then(() => setEstudiantes(prev => prev.filter(e => e.id != id)))
            //.then(() => prev => estudiantes.filter(e => e.id != id))
            //.then(() => setEstudiantes(estudiantes.filter(e => e.id != id))) // Lo mismo de la linea de arriba
            .catch((err) => {
                console.log(err);
            })
    }

    return { estudiantes, agregarEstudiante, eliminarEstudiante, editarEstudiante }
}