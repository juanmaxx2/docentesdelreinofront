import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import style from "./CreatePrayerDay.module.css";
import { createPrayerDay } from "../../../redux/actions";


const CreatePrayerDay = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [newActivity, setNewActivity] = useState({
        title: "",
        time: "",
        date: "",
        url: "",
        description: "",
        image: null
    });
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        const today = new Date().toISOString().split("T")[0];
        setNewActivity((prevState) => ({ ...prevState, date: today }));
    }, []);

    const changeHandler = (event) => {
        const property = event.target.name;
        const value = event.target.value;
        setNewActivity((prevState) => ({ ...prevState, [property]: value }));
    };

    const changeHandlerImage = (event) => {
        const file = event.target.files[0];
        setPreview(URL.createObjectURL(file));
        setNewActivity((prevState) => ({ ...prevState, image: file }));
    };

    const sumbitHandler = (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append('title', newActivity.title);
            formData.append('time', newActivity.time);
            formData.append('date', newActivity.date);
            formData.append('description', newActivity.description);
            formData.append('url', newActivity.url);
            formData.append('image', newActivity.image);
            dispatch(createPrayerDay(formData));
            window.alert("Actividad creada");
            navigate('/admin/activity');
        } catch (error) {
            window.alert(`Error: ${error.message}`);
        }
    };

    return (
        <form onSubmit={sumbitHandler} className={style.conteiner}>
            <p>Titulo</p>
            <input
                value={newActivity.title}
                onChange={changeHandler}
                name='title'
                placeholder='Nombre'
            />

            <p>Imagen</p>
            <div>
                <input
                    type="file"
                    accept="image/*"
                    onChange={changeHandlerImage}
                />
                {preview && <img
                    src={preview}
                    alt="Vista previa"
                    style={{ width: '100px', height: '100px' }}
                />}
            </div>

            <p>Descripción</p>
            <textarea
                value={newActivity.description}
                onChange={changeHandler}
                name='description'
                placeholder='Descripcion'
            />

            <div className={style.input}>
                <div>
                    <p>Fecha</p>
                    <input
                        type="date"
                        value={newActivity.date}
                        onChange={changeHandler}
                        name="date"
                        min={new Date().toISOString().split("T")[0]} // Establecer la fecha mínima a hoy
                    />
                </div>

                <div>
                    <p>Hora</p>
                    <input
                        type="time"
                        value={newActivity.time}
                        onChange={changeHandler}
                        name='time'
                        placeholder='Hora'
                    />
                </div>

            </div>

            <p>URL</p>
            <input
                value={newActivity.url}
                onChange={changeHandler}
                name='url'
                placeholder='URL'
            />

            <div className={style.buttonCreate}>
                <Link to='/admin/activity'>atras</Link>
                <button type='submit'>crear</button>
            </div>
        </form>
    );
}

export default CreatePrayerDay