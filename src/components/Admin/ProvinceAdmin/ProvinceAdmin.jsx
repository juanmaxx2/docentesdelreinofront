import { useNavigate } from "react-router-dom";
import { PedirLocalStorage } from "../../LocalStorage/LocalStorage";
import { useEffect } from "react";
import { getDepartment } from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { NavBar, Footer } from "../../";
import style from './ProvinceAdmin.module.css';

const ProvinceAdmin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const provinces = useSelector(state => state.departments);

    useEffect(() => {
        dispatch(getDepartment());
        if (!PedirLocalStorage('token')) navigate("/login");
    }, []);

    const onClickModificar = (name, whatsapp, flag, shield, commission, contact, photo, url, id) => {
        const provinceDept = { name, whatsapp, flag, shield, commission, contact, photo, url, id }
        navigate("/admin/province/update", { state: { provinceDept } });
    }

    const onClickBack = () => {
        navigate("/admin");
    }

    return (
        <div>
            <NavBar />
            <div className={style.fatherConteiner}>
                <div className={style.conteiner}>
                    <h1>Provincias</h1>
                    <button onClick={() => onClickBack()}>Atras</button>
                    <div>
                        {
                            provinces?.length ? (
                                provinces.map(prov => (
                                    <div className={style.conteinerProvince}>
                                        <h1>{prov.name}</h1>
                                        <p>{prov.whatsapp}</p>
                                        <img src={prov.flag} alt={prov.name} />
                                        <img src={prov.shield} alt={prov.name} />
                                        <h2>departamento</h2>
                                        <p>{prov.DepartmentEducation.commission}</p>
                                        <p>{prov.DepartmentEducation.contact}</p>
                                        <img src={prov.DepartmentEducation.photo} alt={prov.name} />
                                        <div><a href={prov.DepartmentEducation.url} target="_blank" rel="noopener noreferrer">URL:{prov.DepartmentEducation.url}</a> </div>
                                        <button onClick={() => onClickModificar(prov.name, prov.whatsapp, prov.flag, prov.shield, prov.DepartmentEducation.commission, prov.DepartmentEducation.contact, prov.DepartmentEducation.photo, prov.DepartmentEducation.url, prov.DepartmentEducation.id)}>Modificar</button>

                                    </div>
                                ))
                            ) : (
                                <div className={style.conteinerloader}>
                                    <div className={style.loader}></div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ProvinceAdmin;