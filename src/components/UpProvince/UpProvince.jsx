import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import style from "./UpProvince.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { updateDepartment, updateProvince } from "../../redux/actions";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { PedirLocalStorage } from "../LocalStorage/LocalStorage";

const UpProvince = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { state } = useLocation();

    useEffect(() => {
        if (!PedirLocalStorage('token')) {
            navigate("/login");
        } else {
            if (!state || !state.provinceDept) {
                window.alert("No se encontró información de la provincia");
                navigate("/admin/province");
            }
        }
    }, [navigate, state]);

    if (!state || !state.provinceDept) {
        return null; // o un componente de carga si prefieres
    }

    const { name, whatsapp, flag, shield, commission, contact, photo, url, id } = state.provinceDept;
    const [previewFlag, setPreviewFlag] = useState(null);
    const [previewShield, setPreviewShield] = useState(null);
    const [previewPhoto, setPreviewPhoto] = useState(null);
    const [province, setProvince] = useState({
        name,
        whatsapp,
        flag,
        shield
    });
    const [department, setDepartment] = useState({
        province: name,
        url,
        commission,
        contact,
        id,
        photo
    });

    const changeHandlerProvince = (event) => {
        const property = event.target.name;
        const value = event.target.value;
        setProvince((prevState) => ({ ...prevState, [property]: value }));
    };

    const changeHandlerFlag = (event) => {
        const file = event.target.files[0];
        setPreviewFlag(URL.createObjectURL(file));
        setProvince((prevState) => ({ ...prevState, flag: file }));
    };

    const changeHandlerShield = (event) => {
        const file = event.target.files[0];
        setPreviewShield(URL.createObjectURL(file));
        setProvince((prevState) => ({ ...prevState, shield: file }));
    };

    const changeHandlerDepartment = (event) => {
        const property = event.target.name;
        const value = event.target.value;
        setDepartment((prevState) => ({ ...prevState, [property]: value }));
    };

    const changeHandlerPhoto = (event) => {
        const file = event.target.files[0];
        setPreviewPhoto(URL.createObjectURL(file));
        setDepartment((prevState) => ({ ...prevState, photo: file }));
    };

    const sumbitHandler = (event) => {
        event.preventDefault();

        const formDataProv = new FormData();
        if (province.name || name != province.name) formDataProv.append('name', province.name);
        if (province.whatsapp || whatsapp != province.whatsapp) formDataProv.append('whatsapp', province.whatsapp);
        if (province.flag || flag != province.flag) formDataProv.append('flag', province.flag);
        if (province.shield || shield != province.shield) formDataProv.append('shield', province.shield);

        const formDataDep = new FormData();

        if (department.url || url != department.url) formDataDep.append('url', department.url);
        if (department.commission || commission != department.commission) formDataDep.append('commission', department.commission);
        if (department.contact || contact != department.contact) formDataDep.append('contact', department.contact);
        if (department.id || id != department.id) formDataDep.append('id', department.id);
        if (department.photo || photo != department.photo) formDataDep.append('photo', department.photo);

        dispatch(updateProvince(formDataProv, name));
        dispatch(updateDepartment(formDataDep, department.id));
    };

    return (
        <div className={style.formContainer}>
            <NavBar />
            <div className={style.container}>
                <form onSubmit={sumbitHandler}>
                    <h2>Modificar Provincia de {province.name}</h2>

                    <p>Whatsapp</p>
                    <input
                        type="text"
                        name="whatsapp"
                        value={province.whatsapp}
                        onChange={changeHandlerProvince}
                        placeholder="Whatsapp"
                    />

                    <p>Bandera</p>
                    <input type="file" accept="image/*" onChange={changeHandlerFlag} />
                    {previewFlag ? (
                        <img src={previewFlag} alt="Vista previa bandera" style={{ width: '100px', height: '100px' }} />
                    ) : (
                        <img src={province.flag} alt="Bandera" style={{ width: '100px', height: '100px' }} />
                    )}

                    <p>Escudo</p>
                    <input type="file" accept="image/*" onChange={changeHandlerShield} />
                    {previewShield ? (
                        <img src={previewShield} alt="Vista previa escudo" style={{ width: '100px', height: '100px' }} />
                    ) : (
                        <img src={province.shield} alt="Escudo" style={{ width: '100px', height: '100px' }} />
                    )}

                    <h2>Modificar Departamento de Educación</h2>

                    <p>URL</p>
                    <input
                        type="text"
                        name="url"
                        value={department.url}
                        onChange={changeHandlerDepartment}
                        placeholder="URL"
                    />

                    <p>Comisión</p>
                    <input
                        type="text"
                        name="commission"
                        value={department.commission}
                        onChange={changeHandlerDepartment}
                        placeholder="Comisión"
                    />

                    <p>Contacto</p>
                    <input
                        type="text"
                        name="contact"
                        value={department.contact}
                        onChange={changeHandlerDepartment}
                        placeholder="Contacto"
                    />

                    <p>Foto</p>
                    <input type="file" accept="image/*" onChange={changeHandlerPhoto} />
                    {previewPhoto ? (
                        <img src={previewPhoto} alt="Vista previa foto" style={{ width: '100px', height: '100px' }} />
                    ) : (
                        <img src={department.photo} alt="Foto" style={{ width: '100px', height: '100px' }} />
                    )}

                    <div className={style.button}>
                        <Link to="/admin/province">Atrás</Link>
                        <button type="submit">Modificar</button>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default UpProvince;
