import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getActivity, getPrayerDay } from "../../redux/actions";
import { Footer, NavBar, UpActivity, UpPrayerDay } from "../../components";
import style from './UpdateActivity.module.css';

const UpdateActivity = () => {
    const dispatch = useDispatch();
    const { id, tipo } = useParams();
    const activity = useSelector(state => state.activity);
    const [choose, setChoose] = useState(activity.tipo ? (activity.tipo.toString()) : ('5'));
    const tipos = [{
        name: "Congreso",
        value: 1
    }, {
        name: "Conferencia",
        value: 2
    },
    {
        name: "Charla",
        value: 3
    },
    {
        name: "Jornadas de Capacitacion",
        value: 4
    },
    {
        name: "Jornadas de Oracion",
        value: 5
    }];

    useEffect(() => {
        tipo == 'activity' ? (dispatch(getActivity(id))) : (dispatch(getPrayerDay(id)))
    }, [dispatch]);

    const onChangeHandlerTipo = (event) => {
        const value = event.target.value;
        setChoose(value);
    };

    return (
        <div className={style.container}>
            <NavBar />
            <div className={style.formContainer}>
                <div className={style.form}>
                    <h1>Modificar actividad</h1>
                    <select onChange={onChangeHandlerTipo}>
                        {
                            tipos.map((tipo) => {
                                return (
                                    <option key={tipo.value} value={tipo.value}>{tipo.name}</option>
                                )
                            })
                        }
                    </select>
                    {choose == 5 ? (
                        <UpPrayerDay
                            key={activity.id}
                            id={activity.id}
                            title={activity.title}
                            tipo={activity.tipo}
                            date={activity.date}
                            schedule={activity.schedule}
                            url={activity.url}
                            description={activity.description}
                        />
                    ) : (
                        <UpActivity
                            key={activity.id}
                            id={activity.id}
                            title={activity.title}
                            tipo={choose}
                            provinceName={activity.ProvinceName}
                            city={activity.city}
                            date={activity.date}
                            schedule={activity.schedule}
                            value_Inscription={activity.value_Inscription}
                            description={activity.description}
                        />
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default UpdateActivity;
