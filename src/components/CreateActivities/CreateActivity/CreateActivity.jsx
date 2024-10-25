import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link, useNavigate } from "react-router-dom";
import style from './CreateActivity.module.css';
import { PedirLocalStorage } from '../../LocalStorage/LocalStorage';
import { createActivity, getActivities } from '../../../redux/actions';

const CreateActivity = ({ tipo }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const provinces = PedirLocalStorage('provinces')
    const [newActivity, setNewActivity] = useState({
        title: "",
        description: "",
        time: "",
        city: provinces[0].name,
        date: "",
        value_Inscription: "",
        tipo: tipo,
        province: provinces[0].name,
        image: null,
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

    const changeHandlerProvince = (event) => {
        setNewActivity((prevState) => ({ ...prevState, province: event.target.value }))
    };

    const sumbitHandler = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append('title', newActivity.title);
            formData.append('description', newActivity.description);
            formData.append('time', newActivity.time);
            formData.append('city', newActivity.city);
            formData.append('date', newActivity.date);
            formData.append('value_Inscription', newActivity.value_Inscription);
            formData.append('tipo', tipo);
            formData.append('province', newActivity.province);
            formData.append('image', newActivity.image);
            dispatch(createActivity(formData));
            window.alert("Actividad creada");
            dispatch(getActivities('all', 'all', 'all'));
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

            <p>Valor de Inscripción</p>
            <input
                value={newActivity.value_Inscription}
                onChange={changeHandler}
                name='value_Inscription'
                placeholder='Valor Inscripcion'
            />

            <p>Provincia</p>
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
                <Link to='/admin/activity'>atras</Link>
                <button type='submit'>crear</button>
            </div>

        </form>
    );
}

export default CreateActivity