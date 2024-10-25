import { useState } from "react";
import { useDispatch } from "react-redux";
import { createAcount } from "../../redux/actions"; // Importa tu acción de creación de usuario
import { useNavigate } from "react-router-dom";
import { NavBar, Footer } from '../../components';
import style from "./CreateUser.module.css";

const CreateUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "",
        lastname: "",
        email: "",
        password: ""
    });
    const [errorMessage, setErrorMessage] = useState("");

    const changeHandler = (event) => {
        const property = event.target.name;
        const value = event.target.value;
        setUser((prevState) => ({ ...prevState, [property]: value }));
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        const success = await dispatch(createAcount(user));
        if (!success.error) {
            navigate("/login");
        } else {
            setErrorMessage(success.error);
        }
    };

    const onClickBack = async () => {
        navigate("/login");
    }

    return (
        <div>
            <NavBar />
            <div className={style.createContainer}>
                <div className={style.createUserContainer}>
                    <h2>Crear Usuario</h2>
                    <form onSubmit={submitHandler} className={style.form}>
                        <label>
                            Nombre:
                            <input
                                type="text"
                                name="name"
                                value={user.name}
                                onChange={changeHandler}
                                required
                            />
                        </label>
                        <label>
                            Apellido:
                            <input
                                type="text"
                                name="lastname"
                                value={user.lastname}
                                onChange={changeHandler}
                                required
                            />
                        </label>
                        <label>
                            Correo Electrónico:
                            <input
                                type="email"
                                name="email"
                                value={user.email}
                                onChange={changeHandler}
                                required
                            />
                        </label>
                        <label>
                            Contraseña:
                            <input
                                type="password"
                                name="password"
                                value={user.password}
                                onChange={changeHandler}
                                required
                            />
                        </label>
                        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                        <div className={style.buttons}>
                            <button onClick={() => onClickBack()}>atras</button>
                            <button type="submit">Crear Cuenta</button>
                        </div>

                    </form>
                </div>
            </div>
            <Footer />
        </div>

    );
};

export default CreateUser;
