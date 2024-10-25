import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createNationalLaw } from "../../../redux/actions";
import { useDispatch } from "react-redux";
import { NavBar, Footer, PedirLocalStorage } from "../../";
import style from "./CreateNationalLaw.module.css";

const CreateNationalLaw = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [law, setLaw] = useState({
        number: "",
        title: "",
        url: ""
    });

    useEffect(() => {
        if (!PedirLocalStorage('token')) navigate("/login");
    }, [PedirLocalStorage]);

    // Manejador del cambio de los inputs
    const changeHandler = (event) => {
        const property = event.target.name;
        const value = event.target.value;
        setLaw((prevState) => ({ ...prevState, [property]: value }));
    };

    // Manejador del envío del formulario
    const submitHandler = async (event) => {
        event.preventDefault();

        // Enviar los datos al backend (ajustar la URL según el endpoint del backend)
        try {
            await dispatch(createNationalLaw(law));
            window.alert("La ley nacional se creó correctamente");
            navigate("/admin/law"); // Redirigir a la lista de leyes o a otra página
        } catch (error) {
            console.error("Error:", error);
            window.alert("Hubo un problema con la solicitud");
        }
    };

    const onClickBack = () => {
        navigate("/admin/law");
    };

    return (
        <div>
            <NavBar />
            <div className={style.createNationalLawContainer}>
                <div className={style.createFormContainer}>
                    <h2>Crear Ley Nacional</h2>
                    <form onSubmit={submitHandler}>
                        <div>
                            <p>Número</p>
                            <input
                                type="text"
                                name="number"
                                value={law.number}
                                onChange={changeHandler}
                                placeholder="Número de la ley"
                            />
                        </div>
                        <div>
                            <p>Título</p>
                            <input
                                type="text"
                                name="title"
                                value={law.title}
                                onChange={changeHandler}
                                placeholder="Título de la ley"
                            />
                        </div>
                        <div>
                            <p>URL</p>
                            <input
                                type="text"
                                name="url"
                                value={law.url}
                                onChange={changeHandler}
                                placeholder="URL de la ley"
                            />
                        </div>
                        <div className={style.buttons}>
                            <button type="button" onClick={onClickBack}>Atrás</button>
                            <button type="submit">Crear Ley</button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CreateNationalLaw;
