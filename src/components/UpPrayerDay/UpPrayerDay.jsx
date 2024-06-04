import { useState } from "react";
import { useDispatch } from "react-redux";
import { updatePrayerDay } from "../../redux/actions";
import { useNavigate, Link } from "react-router-dom";
import style from './UpPrayerDay.module.css';

const UpPrayerDay = ({ id, title, tipo, date, schedule, url, description }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [activity, setActivity] = useState({
        title,
        description,
        tipo,
        date,
        schedule,
        url
    });

    const changeHandler = (event) => {
        const property = event.target.name;
        const value = event.target.value;
        setActivity((prevState) => ({ ...prevState, [property]: value }));
    };

    const sumbitHandler = (event) => {
        event.preventDefault();
        const activityData = { ...activity, tipo };
        dispatch(updatePrayerDay(id, activityData));
        window.alert("La actividad se modifico correctamente");
        navigate(`/prayerday/${id}`);
    };

    return (
        <div className={style.formContainer}>
            <form onSubmit={sumbitHandler}>
                <input onChange={changeHandler} value={activity.title} name='title' placeholder={activity.title} />
                <textarea onChange={changeHandler} value={activity.description} name='description' placeholder={activity.description} />
                <input onChange={changeHandler} value={activity.date} name='date' placeholder={activity.date} />
                <input onChange={changeHandler} value={activity.schedule} name='schedule' placeholder={activity.schedule} />
                <div className={style.button}>
                    <Link to={`/prayerday/${id}`}>atras</Link>
                    <button type='submit'>modificar</button>
                </div>
            </form>
        </div>
    );
};

export default UpPrayerDay;