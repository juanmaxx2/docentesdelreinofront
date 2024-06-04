import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createActivity } from '../../redux/actions';
import { Link, useNavigate } from "react-router-dom";
import style from './CreateActivity.module.css';
import { PedirLocalStorage } from '../LocalStorage/LocalStorage';

const CreateActivity = ({ tipo }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const provinces = PedirLocalStorage('provinces')
    const [newActivity, setNewActivity] = useState({
        title: "",
        description:"",
        schedule: "",
        city: provinces[0].name,
        date: "",
        value_Inscription: "",
        tipo: tipo,
        province: provinces[0].name
    });

    const changeHandler = (event) => {
        const property = event.target.name;
        const value = event.target.value;
        setNewActivity((prevState) => ({ ...prevState, [property]: value }));
    };

    const changeHandlerProvince = (event) => {
        setNewActivity((prevState) => ({ ...prevState, province: event.target.value }))
    };

    const sumbitHandler = (event) => {
        event.preventDefault();
        const activityData = { ...newActivity, tipo };
        dispatch(createActivity(activityData));
        window.alert("Actividad creada");
        navigate('/activities');
    };

    return (
        <form onSubmit={sumbitHandler}>
            <input value={newActivity.title} onChange={changeHandler} name='title' placeholder='nombre' />
            <textarea value={newActivity.description}  onChange={changeHandler} name='description' placeholder='descripcion' />
            <input value={newActivity.schedule} onChange={changeHandler} name='schedule' placeholder='hora' />
            <input value={newActivity.date} onChange={changeHandler} name='date' placeholder='dia/mes/anio' />
            <input value={newActivity.value_Inscription} onChange={changeHandler} name='value_Inscription' placeholder='valor inscripcion' />
            <select onChange={changeHandlerProvince}>
                <option value="default" disabled>Eliga la provincia</option>
                {provinces.map((province) => {
                    return (
                        <option key={province.name} value={province.name}>{province.name}</option>
                    );
                }
                )}
            </select>
            <div className={style.buttonCreate}>
                <Link to='/activities'>atras</Link>
                <button type='submit'>crear</button>
            </div>
        </form>
    );
}

export default CreateActivity