import { useLocation, useNavigate } from "react-router-dom";
import { updateUser } from "../../redux/actions";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavBar, Footer, PedirLocalStorage } from '../../components';
import style from "./UpdateUser.module.css";

const UpdateUser = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { state } = useLocation();

    useEffect(() => {
        if (!PedirLocalStorage('token')) {
            navigate("/login");
        }
        if (!state || !state.user) {
            window.alert("No se encontró información del usuario");
            navigate("/admin/user");
        }
    }, [navigate, state]);

    const { name, lastname, email, rol } = state?.user || {};

    const [user, setUser] = useState({
        name: name || "",
        lastname: lastname || "",
        rol: rol || "user",
        newEmail: email || "",
    });

    const changeHandler = (event) => {
        const property = event.target.name;
        const value = event.target.value;
        setUser((prevState) => ({ ...prevState, [property]: value }));
    };

    const sumbitHandler = (event) => {
        event.preventDefault();
        const newUser = {};
        if (user.name !== name) newUser.name = user.name;
        if (user.lastname !== lastname) newUser.lastname = user.lastname;
        if (user.newEmail !== email) newUser.newEmail = user.newEmail;
        if (user.rol !== rol) newUser.rol = user.rol;
        newUser.email = email;
        dispatch(updateUser(newUser));
        window.alert("El usuario se modificó correctamente");
    };

    const onClickBack = () => {
        navigate('/admin/user');
    };

    return (
        <div>
            <NavBar />

            <form onSubmit={sumbitHandler} className={style.conteinerForm}>
                <h1>Usuario</h1>

                <p>Nombre</p>
                <input
                    value={user.name}
                    onChange={changeHandler}
                    name='name'
                    placeholder="Nombre"
                />

                <p>Apellido</p>
                <input
                    value={user.lastname}
                    onChange={changeHandler}
                    name='lastname'
                    placeholder="Apellido"
                />

                <p>Email</p>
                <input
                    value={user.newEmail}
                    onChange={changeHandler}
                    name='newEmail'
                    placeholder="Email"
                />

                <p>Rol</p>
                <select
                    value={user.rol}
                    onChange={changeHandler}
                    name='rol'
                >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="superadmin">Superadmin</option>
                </select>

                <div className={style.bottons}>
                    <button type='submit'>Modificar</button>
                    <button onClick={onClickBack}>Atrás</button>
                </div>
            </form>

            <Footer />
        </div>
    );
};

export default UpdateUser;
