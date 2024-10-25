import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../../redux/actions";
import style from "./Login.module.css";
import { GuardarLocalStorage, PedirLocalStorage } from "../../components/LocalStorage/LocalStorage";
import { NavBar, Footer } from '../../components';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (PedirLocalStorage('token')) navigate("/admin");
    }, [PedirLocalStorage()])

    const changeHandler = (event) => {
        const property = event.target.name;
        const value = event.target.value;
        setUser((prevState) => ({ ...prevState, [property]: value }));
    };

    const sumbitHandler = async (event) => {
        event.preventDefault();
        const response = await dispatch(loginAdmin(user));
        const time = Date.now();
        if (!response.error) {
            GuardarLocalStorage('token', response);
            GuardarLocalStorage('time', time);
            navigate('/admin');
        } else {
            setErrorMessage(response.error);
        }
    };

    const createUser = () => {
        navigate('/createuser');
    };

    return (
        <div>
            <NavBar />
            <div className={style.fatherConteiner}>
                <div className={style.conteiner}>
                    <p>Iniciar sesión</p>
                    <form onSubmit={sumbitHandler}>
                        <input
                            value={user.email}
                            onChange={changeHandler}
                            name='email'
                            placeholder='Correo Electrónico'
                        />
                        <input
                            type='password'
                            value={user.password}
                            onChange={changeHandler}
                            name='password'
                            placeholder='Contraseña'
                        />
                        <button type='submit'>Iniciar sesión</button>
                    </form>
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    <button onClick={createUser}>Crear Cuenta</button>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Login;
