import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProvince, updateActivity } from "../../redux/actions";
import { useNavigate, Link } from "react-router-dom";
import style from './UpActivity.module.css';
import { PedirLocalStorage } from "../LocalStorage/LocalStorage";

const UpActivity = ({ id, title, tipo, provinceName, city, date, schedule, value_Inscription, description }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const provinces = PedirLocalStorage('provinces')
    const [activity, setActivity] = useState({
        title,
        description,
        tipo,
        province:provinceName,
        city,
        date,
        schedule,
        value_Inscription
    });

    useEffect(() => {
        dispatch(getProvince());
    }, []);

    const changeHandler = (event) => {
        const property = event.target.name;
        const value = event.target.value;
        setActivity((prevState) => ({ ...prevState, [property]: value }));
    };

    const sumbitHandler = (event) => {
        event.preventDefault();
        const activityData = { ...activity, tipo };
        dispatch(updateActivity(id,activityData));
        window.alert("La actividad se modifico correctamente");
        navigate(`/activity/${id}`);
    };

    return (
        <div className={style.formContainer}>
            <form onSubmit={sumbitHandler}>
                <input onChange={changeHandler} value={activity.title} name='title' placeholder={activity.title} />
                <textarea onChange={changeHandler} value={activity.description}   name='description' placeholder={activity.description} />
                <select onChange={changeHandler} name='province'>
                    <option value="default" disabled>Eliga la provincia</option>
                    {
                        provinces[0].name ? (
                            provinces.map((province) => {
                                return (
                                    <option key={province.name} value={province.name}>{province.name}</option>
                                );
                            }
                            )
                        ) : (<></>)
                    }
                </select>
                <input onChange={changeHandler} value={activity.city} name='city' placeholder={activity.city} />
                <input onChange={changeHandler} value={activity.date} name='date' placeholder={activity.date} />
                <input onChange={changeHandler} value={activity.schedule} name='schedule' placeholder={activity.schedule} />
                <input onChange={changeHandler} value={activity.value_Inscription} name='value_Inscription' placeholder={activity.value_Inscription} />
                <div className={style.button}>
                    <Link to={`/activity/${id}`}>atras</Link>
                    <button type='submit'>modificar</button>
                </div>
            </form>
        </div>
    );
};

export default UpActivity;