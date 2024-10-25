import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Map from "../Map/Map";
import introduccion from './../../assets/Introduccion.jpg';

import style from './Province.module.css';
import { getProvince } from "../../redux/actions";

const Province = () => {
    const dispatch = useDispatch();
    const [selectedProvince, setSelectedProvince] = useState("Buenos Aires");
    const province = useSelector(state => state.province);

    // Helper para asegurarse de que las URLs tengan el protocolo HTTP o HTTPS
    const ensureProtocol = (url) => {
        if (!url) return "#"; // Si no hay URL, devolvemos un valor predeterminado
        return url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`;
    };

    useEffect(() => {
        dispatch(getProvince(selectedProvince));
    }, [dispatch, selectedProvince]);

    return (
        <div className={style.mapConteiner}>
            <Map
                selectedProvince={selectedProvince}
                setSelectedProvince={setSelectedProvince}
            />
            <div className={style.provinceInfo}>
                <div className={style.provinceInfoName}>
                    <p>{province.name}</p>
                    <div className={style.provinceInfoImg}>
                        <div>
                            <img src={province.flag} alt="bandera" />
                            <p>Bandera de la provincia</p>
                        </div>
                        <div>
                            <img src={province.shield} alt="escudo" />
                            <p>Escudo de la provincia</p>
                        </div>
                    </div>
                </div>
                <div className={style.provinceInfoMinisterio}>
                    <p>Ministerio de Educacion</p>
                    <div className={style.provinceInfoMinisterioInformacion}>
                        <a
                            href={ensureProtocol(province.DepartmentEducation?.url)}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Pagina oficial
                        </a>
                        <img src={province.DepartmentEducation?.photo} alt="escudo" />
                    </div>
                    <div className={style.provinceInfoMinisterioLinks}>
                        <a
                            href={ensureProtocol(province.DepartmentEducation?.commission)}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Agenda Provincial
                        </a>
                        <a
                            href={ensureProtocol(province.DepartmentEducation?.commission)}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            URL comision provincial
                        </a>
                        <a
                            href={ensureProtocol(province.whatsapp)}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            URL grupo de whatsapp
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Province;
