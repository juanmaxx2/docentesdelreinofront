import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getProvinces, updateActivity } from "../../redux/actions";
import { Link } from "react-router-dom";
import style from './UpActivity.module.css';
import { PedirLocalStorage } from "../LocalStorage/LocalStorage";

const UpActivity = ({ id, title, tipo, provinceName, city, date, time, value_Inscription, description, image, status }) => {

    const formatDate = (date) => {
        const year = date.year;
        const month = String(date.month).padStart(2, '0');
        const day = String(date.day).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const dispatch = useDispatch();
    const provinces = PedirLocalStorage('provinces');
    const [preview, setPreview] = useState(null);
    const [activity, setActivity] = useState({
        title,
        description,
        tipo,
        province: provinceName,
        city,
        date: date ? formatDate({ year: date.year, month: date.month, day: date.day }) : "",
        time,
        value_Inscription,
        image,
        status
    });
    const formattedDate = activity.date === date ? (formatDate(activity.date)) : (activity.date);

    useEffect(() => {
        dispatch(getProvinces());
    }, []);

    const changeHandler = (event) => {
        const property = event.target.name;
        const value = event.target.value;
        setActivity((prevState) => ({ ...prevState, [property]: value }));
    };

    const changeHandlerImage = (event) => {
        const file = event.target.files[0];
        setPreview(URL.createObjectURL(file));
        setActivity((prevState) => ({ ...prevState, image: file }));
    };

    const formatTime = (time) => {
        return `${time}:00`;
    };

    const sumbitHandler = (event) => {
        try {
            event.preventDefault();
            const activityData = { ...activity, tipo };
            const formData = new FormData();
            if (title != activityData.title) formData.append('title', activityData.title);
            if (description != activityData.description) formData.append('description', activityData.description);
            if (time != activityData.time) formData.append('time', formatTime(activity.time));
            if (city != activityData.city) formData.append('city', activityData.city);
            if (date != activityData.date) formData.append('date', formattedDate);
            if (value_Inscription != activityData.value_Inscription) formData.append('value_Inscription', activityData.value_Inscription);
            if (provinceName != activityData.province) formData.append('province', activityData.province);
            if (image != activityData.image) formData.append('image', activityData.image);
            formData.append('tipo', tipo);
            dispatch(updateActivity(id, formData));
            // window.alert("La actividad se modifico correctamente");
            // navigate(`/admin/activity`);
        } catch (error) {
            window.alert(`Error: ${error.message}`);
        }
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

                <p>Provincia</p>
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

                <input
                    onChange={changeHandler}
                    value={activity.city}
                    name='city'
                    placeholder={activity.city}
                />

                <div className={style.input}>
                    <div>
                        <p>Fecha</p>
                        <input
                            type="time"
                            value={formatTime(activity.time)}
                            onChange={changeHandler}
                            name='time'
                            placeholder='Hora'
                        />
                    </div>
                    <div>
                        <p>Hora</p>
                        <input
                            type="date"
                            onChange={changeHandler}
                            value={formattedDate}
                            name='date'
                            placeholder='Día/Mes/Año'
                        />
                    </div>
                </div>


                <p>Valor de Inscripción</p>
                <input
                    onChange={changeHandler}
                    value={activity.value_Inscription}
                    name='value_Inscription'
                    placeholder={activity.value_Inscription}
                />

                <div className={style.button}>
                    <Link to={`/admin/activity`}>atras</Link>
                    <button type='submit'>modificar</button>
                </div>

            </form>
        </div>
    );
};

export default UpActivity;