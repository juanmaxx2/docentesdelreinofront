import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../../Footer/Footer";
import NavBar from "../../NavBar/NavBar";
import { useDispatch } from "react-redux";
import { updateNationalLaw } from "../../../redux/actions";
import style from './UpNationalLaw.module.css';
import { PedirLocalStorage } from "../../LocalStorage/LocalStorage";

const UpNationalLaw = () => {
    const dispatch = useDispatch();
    const { state } = useLocation();
    const navigate = useNavigate();

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

    // Si state es nulo o indefinido, salta la creación del formulario
    if (!state || !state.law) return null;

    const { title, url, number } = state.law;
    const [nationalLaw, setNationalLaw] = useState({
        title,
        url,
        newNumber: number,
    });

    const changeHandler = (event) => {
        const property = event.target.name;
        const value = event.target.value;
        setNationalLaw((prevState) => ({ ...prevState, [property]: value }));
    };

    const submitHandler = (event) => {
        event.preventDefault();
        if (nationalLaw.newNumber === number) nationalLaw.newNumber = null;
        dispatch(updateNationalLaw(number, nationalLaw));
    };

    const onClickBack = () => {
        navigate("/admin/law");
    };

    return (
        <div>
            <NavBar />
            <div className={style.conteiner}>
                <form onSubmit={submitHandler}>
                    <h2>Actualizar Ley Nacional</h2>
                    <div>
                        <label htmlFor="title">Título:</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={nationalLaw.title}
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
                            value={nationalLaw.url}
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
                            value={nationalLaw.newNumber}
                            onChange={changeHandler}
                            placeholder="Nuevo número de la ley"
                        />
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
};

export default UpNationalLaw;
