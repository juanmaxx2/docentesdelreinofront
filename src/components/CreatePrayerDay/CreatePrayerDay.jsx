import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import style from "./CreatePrayerDay.module.css";

const CreatePrayerDay = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [newActivity, setNewActivity] = useState({
        title: "",
        schedule: "",
        date: "",
        url: ""
    });

    const changeHandler = (event) => {
        const property = event.target.name;
        const value = event.target.value;
        setNewActivity((prevState) => ({ ...prevState, [property]: value }));
    };

    const sumbitHandler = (event) => {
        event.preventDefault();
        dispatch(createActivity(newActivity));
        window.alert("Actividad creada");
        navigate('/activities');
    };

    return (
        <form onSubmit={sumbitHandler}>
            <input value={newActivity.title} onChange={changeHandler} name='title' placeholder='nombre' />
            <textarea value={newActivity.description}  onChange={changeHandler} name='description' placeholder='descripcion' />
            <input value={newActivity.schedule} onChange={changeHandler} name='schedule' placeholder='hora' />
            <input value={newActivity.date} onChange={changeHandler} name='date' placeholder='dia/mes/anio' />
            <input value={newActivity.url} onChange={changeHandler} name='url' placeholder='url' />
            <div className={style.buttonCreate}>
                <Link to='/activities'>atras</Link>
                <button type='submit'>crear</button>
            </div>
        </form>
    );
}

export default CreatePrayerDay