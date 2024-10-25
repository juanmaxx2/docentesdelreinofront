import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteActivity, deletePrayerDay, getActivities } from "../../../redux/actions";
import { FaTrash, FaEdit } from "react-icons/fa";
import { PedirLocalStorage } from "../../LocalStorage/LocalStorage";
import { useNavigate } from "react-router-dom";
import NavBar from "../../NavBar/NavBar";
import Footer from "../../Footer/Footer";
import style from './ActivityAdmin.module.css'; // Importa el CSS

const ActivityAdmin = () => {
    const dispatch = useDispatch();
    const activities = useSelector(state => state.activities);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getActivities('all', 'all', 'all'));
        if (!PedirLocalStorage('token')) navigate("/login");
    }, [dispatch]);

    const onClickCreate = () => {
        navigate("/create");
    };

    const onClickBack = () => {
        navigate("/admin");
    }

    const handleDelete = (id, tipo = 5) => {
        if (tipo == 5) dispatch(deletePrayerDay(id));
        else dispatch(deleteActivity(id));
    };

    const handleEdit = (id, tipo = 5) => {
        navigate(`/updateactivity/${id}/${tipo}`);
    };

    return (
        <div>
            <NavBar />
            <div className={style.fatherContainer}>
                <div className={style.container}>
                    <p className={style.activityTitle}>Actividades</p>
                    <div className={style.buttonConteiner}>
                        <button className={style.addActivityButton} onClick={onClickBack}>
                            atras
                        </button>
                        <button className={style.addActivityButton} onClick={onClickCreate}>
                            Agregar una actividad
                        </button>
                    </div>

                    {
                        activities?.length ? (
                            <table className={style.activityTable}>
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Tipo</th>
                                        <th>Hora</th>
                                        <th>Fecha</th>
                                        <th>Lugar</th>
                                        <th>Valor</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {activities.map(activity => (
                                        <tr key={activity.id}>
                                            <td>{activity.title}</td>
                                            {activity.tipo ? (
                                                <td>{activity.tipo}</td>
                                            ) : (
                                                <td>5</td>
                                            )}
                                            <td>{activity.time}</td>
                                            <td>{activity.date.day}/{activity.date.month}/{activity.date.year}</td>
                                            {activity.city ? (
                                                <td>{activity.city},{activity.province}</td>
                                            ) : (
                                                <td>{activity.url}</td>
                                            )}
                                            {activity.value_Inscription ? (
                                                <td>{activity.value_Inscription}</td>
                                            ) : (
                                                <td>-</td>
                                            )}
                                            <td className={style.actionButtons}>
                                                <button className={style.actionButton} onClick={() => handleEdit(activity.id, activity.tipo)}>
                                                    <FaEdit className={style.editButton} />
                                                </button>
                                                <button className={style.actionButton} onClick={() => handleDelete(activity.id, activity.tipo)}>
                                                    <FaTrash />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div>
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
    );
};

export default ActivityAdmin;
