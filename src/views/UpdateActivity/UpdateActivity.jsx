import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getActivity, getPrayerDay, resetActivity } from "../../redux/actions";
import { Footer, NavBar, PedirLocalStorage, UpActivity, UpPrayerDay } from "../../components";
import style from './UpdateActivity.module.css';

const UpdateActivity = () => {
    const dispatch = useDispatch();
    const { id, tipo } = useParams();
    const navigate = useNavigate();
    const activity = useSelector(state => state.activity);
    const [choose, setChoose] = useState(null);
    const tipos = [
        { name: "Congreso", value: 1 },
        { name: "Conferencia", value: 2 },
        { name: "Charla", value: 3 },
        { name: "Jornadas de Capacitacion", value: 4 },
        { name: "Jornadas de Oracion", value: 5 }
    ];

    useEffect(() => {
        if (!PedirLocalStorage('token')) navigate("/login");

        if (tipo !== '5') {
            dispatch(getActivity(id));
        } else {
            dispatch(getPrayerDay(id));
        }
        
        return () => {
            // dispatch(resetActivity());
            setChoose(null)
        };
    }, [dispatch, id, tipo, navigate]);

    useEffect(() => {
        if (activity || activity.tipo == '5') {
            activity.tipo ? setChoose(activity.tipo.toString()) : setChoose('5');
        }
    }, [activity]);

    const onChangeHandlerTipo = (event) => {
        const value = event.target.value;
        setChoose(value);
    };

    if (!activity || choose == undefined) {
        return <div>Cargando...</div>;
    }

    return (
        <div className={style.container}>
            <NavBar />
            <div className={style.formContainer}>
                <div className={style.form}>
                    <h1>Modificar actividad</h1>
                    <p>Tipo de actividad</p>
                    <select value={choose} onChange={onChangeHandlerTipo}>
                        {tipos.map((tipo) => {
                            return (
                                <option key={tipo.value} value={tipo.value}>
                                    {tipo.name}
                                </option>
                            );
                        })}
                    </select>
                    {choose == '5' ? (
                        <UpPrayerDay
                            key={activity.id}
                            id={activity.id}
                            title={activity.title}
                            tipo={5}
                            date={activity.date}
                            time={activity.time}
                            url={activity.url}
                            description={activity.description}
                            image={activity.image}
                            status={activity.status}
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
                            time={activity.time}
                            value_Inscription={activity.value_Inscription}
                            description={activity.description}
                            image={activity.image}
                            status={activity.status}
                        />
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default UpdateActivity;
