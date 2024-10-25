import { useEffect, useState } from "react";
import { NavBar, Footer, PedirLocalStorage, CreateActivity, CreatePrayerDay } from '../../components';
import style from "./Create.module.css"
import { useNavigate } from "react-router-dom";

const Create = () => {
    const tipos = [{
        name: "Congreso",
        value: 1
    }, {
        name: "Conferencia",
        value: 2
    },
    {
        name: "Charla",
        value: 3
    },
    {
        name: "Jornadas de Capacitacion",
        value: 4
    },
    {
        name: "Jornadas de Oracion",
        value: 5
    }];

    const [choose, setChoose] = useState('1');
    
    const navigate = useNavigate();

    useEffect(() => {
        if (!PedirLocalStorage('token')) navigate("/login");
    }, [PedirLocalStorage]);

    const onChangeHandlerTipo = (event) => {
        const value = event.target.value;
        setChoose(value);
    };

    return (
        <div>
            <NavBar />
            <div className={style.conteinercreate}>
                <div className={style.bodycreate}>
                    <h1>Crear Actividad</h1>
                    <p>Elija el tipo de actividad que desea crear?</p>

                    <select onChange={onChangeHandlerTipo}>
                        {
                            tipos.map((tipo) => {
                                return (
                                    <option key={tipo.value} value={tipo.value}>{tipo.name}</option>
                                )
                            })
                        }
                    </select>

                    {
                        choose == 5 ? (
                            <CreatePrayerDay />
                        ) : (
                            <CreateActivity tipo={choose} />
                        )
                    }
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Create;