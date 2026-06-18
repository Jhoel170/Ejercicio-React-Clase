import { useNavigate, useParams } from "react-router-dom";

const LoginEstudiante = (props) => {


    const navegar = useNavigate();


    const handlerSubmit = (e) => {
        e.preventDefault();
        
        let valid = true;

        if() {
            setErrorEmail("Email debe este formato: example@xd.com");
            valid = false;
        } else {
            setErrorEmail("");
        }
    }

    return(
        <form>
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
                    required
                />
            </div>
            <div>
                <label htmlFor="est_passw">Password: </label>
                <input 
                    type="password" 
                    name="est_passw" 
                    id="est_passw" 
                    placeholder="Ingresa password" 
                    required
                />
            </div>
            <br />
            <input type="submit" value={"Registrar"} />
        </form>
    )
}

export default LoginEstudiante;