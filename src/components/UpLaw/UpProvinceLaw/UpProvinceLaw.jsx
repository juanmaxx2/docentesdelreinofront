import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../../Footer/Footer";
import NavBar from "../../NavBar/NavBar";
import { updateProvinceLaw } from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import style from './UpProvinceLaw.module.css';
import { PedirLocalStorage } from "../../LocalStorage/LocalStorage";

const UpProvinceLaw = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { state } = useLocation();
    
    useEffect(() => {
        // Primero verifica si el token existe
        if (!PedirLocalStorage('token')) {
            navigate("/login");
        } else {
            // Luego verifica si existe la información de la ley
            if (!state || !state.law) {
                window.alert("No se encontró información de la ley");
                navigate("/admin/law");
            }
        }
    }, [navigate, state]);

    // Si no existe la información de la ley, no renderizar el componente
    if (!state || !state.law) return null;

    const { title, url, number, province } = state.law;
    const provinces = useSelector(state => state.provinces);
    const [provinceLaw, setProvinceLaw] = useState({
        title,
        url,
        number,
        newProvince: province,
        newNumber: number,
        province
    });

    const changeHandler = (event) => {
        const property = event.target.name;
        const value = event.target.value;
        setProvinceLaw((prevState) => ({ ...prevState, [property]: value }));
    };

    const submitHandler = (event) => {
        event.preventDefault();
        if (provinceLaw.newNumber === number) provinceLaw.newNumber = null;
        if (provinceLaw.newProvince === province) provinceLaw.newProvince = null;
        dispatch(updateProvinceLaw(number, province, provinceLaw));
    };

    const onClickBack = () => {
        navigate("/admin/law");
    }

    return (
        <div>
            <NavBar />
            <div className={style.conteiner}>
                <form onSubmit={submitHandler}>
                    <h2>Actualizar Ley Provincial</h2>
                    <div>
                        <label htmlFor="title">Título:</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={provinceLaw.title}
                            onChange={changeHandler}
                            placeholder="Título de la ley"
                        />
                    </div>

                    <div>
                        <label htmlFor="url">URL:</label>
                        <input
                            type="text"
                            id="url"
                            name="url"
                            value={provinceLaw.url}
                            onChange={changeHandler}
                            placeholder="URL de la ley"
                        />
                    </div>

                    <div>
                        <label htmlFor="newNumber">Nuevo número:</label>
                        <input
                            type="text"
                            id="newNumber"
                            name="newNumber"
                            value={provinceLaw.newNumber}
                            onChange={changeHandler}
                            placeholder="Nuevo número de la ley"
                        />
                    </div>

                    <label htmlFor="province">Elige la provincia:</label>
                    <div>
                        <select onChange={changeHandler} name='newProvince'>
                            <option value="default" disabled>Elige la provincia</option>
                            {provinces?.length && provinces.map(prov => (
                                prov.name === province ? (
                                    <option selected key={prov.name} value={prov.name}>{prov.name}</option>
                                ) : (
                                    <option key={prov.name} value={prov.name}>{prov.name}</option>
                                )
                            ))}
                        </select>
                    </div>

                    <div className={style.buttons}>
                        <button onClick={onClickBack}>Atrás</button>
                        <button type="submit">Actualizar Ley</button>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
}

export default UpProvinceLaw;
