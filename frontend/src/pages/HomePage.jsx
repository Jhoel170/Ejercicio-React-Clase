import { Link } from "react-router-dom"

function HomePage() {
 return(
    <div>
        <h1><em><strong>Bienvenidos</strong></em></h1>
        <Link to={"/estudiantes"}>
            Ir a lista de estudiantes
        </ Link>
        <br />
        <Link to={"/estudiantes/nuevo"}>Agregar</Link>

        
    </div>
 )
}

export default HomePage;