import { useState } from "react";
import { useDispatch } from "react-redux";
import { updatePrayerDay } from "../../redux/actions";
import { useNavigate, Link } from "react-router-dom";
import style from './UpPrayerDay.module.css';

const UpPrayerDay = ({ id, title, tipo, date, time, url, description, image, status }) => {

    const formatDate = (date) => {
        const year = date.year;
        const month = String(date.month).padStart(2, '0');
        const day = String(date.day).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const dispatch = useDispatch();
    const [preview, setPreview] = useState(null);
    const [activity, setActivity] = useState({
        title,
        description,
        tipo,
        date: date ? formatDate({ year: date.year, month: date.month, day: date.day }) : "",
        time,
        url,
        image,
        status
    });

    const formattedDate = activity.date === date ? (formatDate(activity.date)) : (activity.date);

    const changeHandler = (event) => {
        const property = event.target.name;
        const value = event.target.value;
        setActivity((prevState) => ({ ...prevState, [property]: value }));
    };

    const formatTime = (time) => {
        return `${time}:00`;
    };

    const changeHandlerImage = (event) => {
        const file = event.target.files[0];
        setPreview(URL.createObjectURL(file));
        setActivity((prevState) => ({ ...prevState, image: file }));
    };

    const sumbitHandler = (event) => {
        event.preventDefault();
        const activityData = { ...activity, tipo };
        const formData = new FormData();
        if (title != activityData.title) formData.append('title', activityData.title);
        if (description != activityData.description) formData.append('description', activityData.description);
        if (time != activityData.time) formData.append('time', formatTime(activity.time));
        if (url != activityData.url) formData.append('url', formattedDate);
        if (date != activityData.date) formData.append('date', formattedDate);
        if (image != activityData.image) formData.append('image', activityData.image);
        dispatch(updatePrayerDay(id, formData));
    };

    return (
        <div className={style.formContainer}>
            <form onSubmit={sumbitHandler}>
                <p>Titulo</p>
                <input
                    onChange={changeHandler}
                    value={activity.title}
                    name='title'
                    placeholder={activity.title}
                />

                <p>Imagen</p>
                <div>
                    <input type="file" accept="image/*" onChange={changeHandlerImage} />
                    {preview ? (
                        preview && <img src={preview} alt="Vista previa" style={{ width: '100px', height: '100px' }} />
                    ) : (
                        <img src={activity.image} alt="Congreso" style={{ width: '100px', height: '100px' }} />
                    )}
                </div>

                <p>Descripción</p>
                <textarea
                    onChange={changeHandler}
                    value={activity.description}
                    name='description'
                    placeholder={activity.description}
                />

                <div className={style.input}>
                    <div>
                        <p>Fecha</p>
                        <input
                            type="date"
                            onChange={changeHandler}
                            value={formattedDate}
                            name='date'
                            placeholder='Día/Mes/Año'
                        />
                    </div>
                    <div>
                        <p>Hora</p>
                        <input
                            type="time"
                            value={formatTime(activity.time)}
                            onChange={changeHandler}
                            name='time'
                            placeholder='Hora'
                        />
                    </div>
                </div>


                <div className={style.button}>
                    <Link to={`/admin/activity`}>atras</Link>
                    <button type='submit'>modificar</button>
                </div>
            </form>
        </div>
    );
};

export default UpPrayerDay;