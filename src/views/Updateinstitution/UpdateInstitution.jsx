import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavBar, Footer, PedirLocalStorage } from '../../components';
import style from "./UpdateInstitution.module.css";
import { updateInstitution } from "../../redux/actions";
import { Link, useNavigate } from "react-router-dom";

const UpdateInstitution = () => {
    const navigate = useNavigate();
    const [institution, setInstitution] = useState(PedirLocalStorage('institution'));
    const dispatch = useDispatch();

    const changeHandler = (event) => {
        const property = event.target.name;
        const value = event.target.value;
        setInstitution((prevState) => ({ ...prevState, [property]: value }));
    };

    const sumbitHandler = (event) => {
        event.preventDefault();
        dispatch(updateInstitution(institution));
        window.alert("La institucion se modifico correctamente");
        navigate(`/institution`);
    };

    return (
        <div>
            <NavBar />
            <div className={style.conteiner}>
                <form onSubmit={sumbitHandler}>
                    <h1>Modificar Institucion</h1>
                    <p>{institution.name}</p>
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
                        <Link to='/institution'>atras</Link>
                        <button type='submit'>modificar</button>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    )
};

export default UpdateInstitution;
