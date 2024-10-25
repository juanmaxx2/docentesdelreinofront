import NavBar from "../../NavBar/NavBar";
import Footer from "../../Footer/Footer";
import { PedirLocalStorage } from "../../LocalStorage/LocalStorage";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteUser, getAllUsers, getDeletedUsers, unDeleteUser } from "../../../redux/actions";
import { FaEdit, FaTrash } from "react-icons/fa";
import { IoMdCheckmarkCircle } from "react-icons/io";
import style from './UserAdmin.module.css';

const UserAdmin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const users = useSelector(state => state.users);
    const deletedUsers = useSelector(state => state.deletedUsers);

    useEffect(() => {
        dispatch(getAllUsers())
        dispatch(getDeletedUsers())
        if (!PedirLocalStorage('token')) navigate("/login");
    }, [dispatch]);

    const handleEdit = (user) => {
        navigate(`/admin/user/edit`, { state: { user } });
    };

    const handleDelete = (email) => {
        dispatch(deleteUser(email))
    };

    const handleUnDelete = (email) => {
        dispatch(unDeleteUser(email))
    };

    const onClickBack = () => {
        navigate("/admin");
    };

    return (
        <div>
            <NavBar />
            <div className={style.fatherConteiner}>
                <div className={style.conteiner}>
                    <p>Usuarios</p>
                    <button className={style.backButton} onClick={onClickBack}>atras</button>
                    {
                        users?.length ? (
                            <table>
                                <thead>
                                    <tr>
                                        <th>name</th>
                                        <th>lastname</th>
                                        <th>email</th>
                                        <th>rol</th>
                                        <th>acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(user => (
                                        <tr key={user.name}>
                                            <td>{user.name}</td>
                                            <td>{user.lastname}</td>
                                            <td>{user.email}</td>
                                            <td>{user.rol}</td>

                                            <td className={style.actionButtons}>
                                                <button className={style.actionButton} onClick={() => handleEdit({ name: user.name, lastname: user.lastname, email: user.email, rol: user.rol })}>
                                                    <FaEdit />
                                                </button>
                                                <button className={style.actionButton} onClick={() => handleDelete({ email: user.email })}>
                                                    <FaTrash />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className={style.conteinerLoaderFather}>
                                <div className={style.conteinerloader}>
                                    <div className={style.loader}></div>
                                </div>
                            </div>
                        )
                    }
                    <p>Usuario eliminados</p>
                    {
                        deletedUsers?.length ? (
                            <table>
                                <thead>
                                    <tr>
                                        <th>name</th>
                                        <th>lastname</th>
                                        <th>email</th>
                                        <th>rol</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {deletedUsers.map(user => (
                                        <tr key={user.name}>
                                            <td>{user.name}</td>
                                            <td>{user.lastname}</td>
                                            <td>{user.email}</td>
                                            <td>{user.rol}</td>

                                            <td>
                                                <button onClick={() => handleUnDelete(user.email)}>
                                                    <IoMdCheckmarkCircle />
                                                </button>
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className={style.conteinerLoaderFather}>
                                <div className={style.conteinerloader}>
                                    <div className={style.loader}></div>
                                </div>
                            </div>

                        )
                    }
                </div>
            </div>

            <Footer />
        </div>
    )
};

export default UserAdmin;