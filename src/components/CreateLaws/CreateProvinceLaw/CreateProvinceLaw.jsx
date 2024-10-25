import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProvinces, createProvinceLaw } from "../../../redux/actions";
import { NavBar, Footer, PedirLocalStorage } from "../../";
import style from "./CreateProvinceLaw.module.css";

const CreateProvinceLaw = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        if (!PedirLocalStorage('token')) navigate("/login");
        dispatch(getProvinces());
    }, [dispatch]);

    // Estado local para la ley provincial
    const [law, setLaw] = useState({
        number: "",
        title: "",
        url: "",
        province: ""
    });

    // Obtener las provincias desde el estado global
    const provinces = useSelector(state => state.provinces);



    // Manejador del cambio de los inputs
    const changeHandler = (event) => {
        const property = event.target.name;
        const value = event.target.value;
        setLaw((prevState) => ({ ...prevState, [property]: value }));
    };

    // Manejador del envío del formulario
    const submitHandler = async (event) => {
        event.preventDefault();

        try {
            // Enviar la ley provincial al backend
            await dispatch(createProvinceLaw(law));
            window.alert("La ley provincial se creó correctamente");
            navigate("/admin/law"); // Redirigir a la lista de leyes
        } catch (error) {
            console.error("Error:", error);
            window.alert("Hubo un problema al crear la ley");
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
                    <h2>Crear Ley Provincial</h2>
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
                        <div>
                            <p>Provincia</p>
                            <select name="province" value={law.province} onChange={changeHandler}>
                                <option value="">Seleccione una provincia</option>
                                {provinces?.length ? (
                                    provinces.map((province) => (
                                        <option key={province.name} value={province.name}>
                                            {province.name}
                                        </option>
                                    ))
                                ) : (
                                    <></>
                                )}
                            </select>
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

export default CreateProvinceLaw;
