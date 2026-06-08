// Objetivo: Crear una instacia personalizado de axios para conectarnos a la API 
// con configuracion de nuestro interes

import axios from "axios";
export const api = axios.create( // Instancia personalizada (api)
    {
        baseURL: import.meta.env.VITE_URL_BASE,
    }
);