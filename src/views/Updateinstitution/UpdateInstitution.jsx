import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavBar, Footer, PedirLocalStorage } from '../../components';
import style from "./UpdateInstitution.module.css";
import { updateInstitution } from "../../redux/actions";
import { Link, useNavigate } from "react-router-dom";

const UpdateInstitution = () => {
    const navigate = useNavigate();
    const [institution, setInstitution] = useState(PedirLocalStorage('institution'));
    const dispatch = useDispatch();
    const [previewLogo, setPreviewLogo] = useState(null);
    const [previewPicture, setPreviewPicture] = useState(null);

    useEffect(() => {
        if (!PedirLocalStorage('token')) navigate("/login");
    }, [dispatch]);

    const changeHandler = (event) => {
        const property = event.target.name;
        const value = event.target.value;
        setInstitution((prevState) => ({ ...prevState, [property]: value }));
    };

    const sumbitHandler = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('direction', institution.direction);
        formData.append('history', institution.history);
        formData.append('introduction', institution.introduction);
        formData.append('mail', institution.mail);
        formData.append('objetive', institution.objetive);
        formData.append('phone', institution.phone);
        formData.append('presentation', institution.presentation);
        formData.append('logo', institution.logo);
        formData.append('picture', institution.picture);

        dispatch(updateInstitution(institution.name, formData));
        window.alert("La institucion se modifico correctamente");
        navigate(`/admin/association`);
    };

    const changeHandlerLogo = (event) => {
        const file = event.target.files[0];
        setPreviewLogo(URL.createObjectURL(file));
        setInstitution((prevState) => ({ ...prevState, logo: file }));
    };

    const changeHandlerPicture = (event) => {
        const file = event.target.files[0];
        setPreviewPicture(URL.createObjectURL(file));
        setInstitution((prevState) => ({ ...prevState, picture: file }));
    };

    return (
        <div>
            <NavBar />
            <div className={style.conteiner}>
                <form onSubmit={sumbitHandler}>
                    <h1>Modificar Institucion</h1>
                    <p>{institution.name}</p>

                    <p>Logo</p>
                    <input type="file" accept="image/*" onChange={changeHandlerLogo} />
                    {previewLogo ? (
                        previewLogo && <img src={previewLogo} alt="Vista previa logo" style={{ width: '100px', height: '100px' }} />
                    ) : (
                        <img src={institution.logo} alt="logo" style={{ width: '100px', height: '100px' }} />
                    )}

                    <p>Imagen</p>
                    <input type="file" accept="image/*" onChange={changeHandlerPicture} />
                    {previewPicture ? (
                        previewPicture && <img src={previewPicture} alt="Vista previa logo" style={{ width: '100px', height: '100px' }} />
                    ) : (
                        <img src={institution.logo} alt="logo" style={{ width: '100px', height: '100px' }} />
                    )}

                    <p>telefono</p>
                    <input value={institution.phone} onChange={changeHandler} name='phone' placeholder={institution.phone} />

                    <p>mail</p>
                    <input value={institution.mail} onChange={changeHandler} name='mail' placeholder={institution.mail} />

                    <p>Presentacion</p>
                    <textarea value={institution.presentation} onChange={changeHandler} name='presentation' placeholder={institution.presentation} />

                    <p>Historia</p>
                    <textarea value={institution.history} onChange={changeHandler} name='history' placeholder={institution.history} />

                    <p>Introduccion</p>
                    <textarea value={institution.introduction} onChange={changeHandler} name='introduction' placeholder={institution.introduction} />

                    <p>Objetivo</p>
                    <textarea value={institution.objetive} onChange={changeHandler} name='objetive' placeholder={institution.objetive} />

                    <div className={style.button}>
                        <Link to='/admin/association'>atras</Link>
                        <button type='submit'>modificar</button>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    )
};

export default UpdateInstitution;
