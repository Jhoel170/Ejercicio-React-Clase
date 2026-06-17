import { useEffect, useState } from "react";
import { api } from "../utils/api";
import { getId } from "../utils/normalizador"; // ✅ IMPORTA

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
        return api.post("/estudiantes", nuevoEstudiante)
            .then((res) => {
                setEstudiantes(prev => [...prev, res.data]);
                return res.data;
            })
            .catch((err) => {
                console.log("Error al agregar un estudiante", err);
                throw err;
            })
    }

    const editarEstudiante = (editadoEstudiante) => {
        // ✅ USA getId() universal
        const id = getId(editadoEstudiante);
        console.log("✏️ Editando ID:", id);
        
        if (!id) {
            console.error("❌ No se pudo obtener el ID del estudiante:", editadoEstudiante);
            return Promise.reject("ID no encontrado");
        }
        
        return api.put(`/estudiantes/${id}`, editadoEstudiante)
            .then(() => {
                console.log("✅ Editado, recargando lista...");
                return api.get("/estudiantes");
            })
            .then((res) => {
                setEstudiantes(res.data);
                return res.data;
            })
            .catch((err) => {
                console.log("❌ Error al editar:", err);
                throw err;
            });
    }

    const eliminarEstudiante = (id) => {
        console.log("🗑️ Eliminando:", id);
        
        return api.delete(`/estudiantes/${id}`)
            .then(() => {
                console.log("✅ Eliminado, recargando lista...");
                return api.get("/estudiantes");
            })
            .then((res) => {
                setEstudiantes(res.data);
                return res.data;
            })
            .catch((err) => {
                console.log("❌ Error:", err);
                throw err;
            });
    }

    return { estudiantes, agregarEstudiante, eliminarEstudiante, editarEstudiante };
};