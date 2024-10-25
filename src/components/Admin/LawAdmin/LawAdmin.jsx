import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PedirLocalStorage } from "../../LocalStorage/LocalStorage";
import { deleteNationalLaw, deleteProvinceLaw, getDeletedNationalLaw, getDeletedProvinceLaw, getNationalLaw, getProvinceLaw, getProvinces, unDeleteNationalLaw } from "../../../redux/actions";
import NavBar from "../../NavBar/NavBar";
import Footer from "../../Footer/Footer";
import LawTable from "../../LawTable/LawTable";
import style from './LawAdmin.module.css';

const LawAdmin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [active, setActive] = useState(true);
    const [province, setProvince] = useState('Buenos Aires');
    const provinces = useSelector(state => state.provinces);
    const nationalLaw = useSelector(state => state.law);
    const provinceLaw = useSelector(state => state.provinceLaw);
    const nationalLawDeleted = useSelector(state => state.lawDeleted);
    const provinceLawDeleted = useSelector(state => state.provinceLawDeleted);

    useEffect(() => {
        dispatch(getProvinces());
        dispatch(getNationalLaw());
        dispatch(getProvinceLaw(province));
        dispatch(getDeletedNationalLaw());
        dispatch(getDeletedProvinceLaw(province));
        if (!PedirLocalStorage('token')) navigate("/login");
    }, [dispatch]);

    //!Buscar
    //Elijo la provincia
    const changeHandler = (event) => {
        const value = event.target.value;
        setProvince(value);
    };

    //Buscar ley provincial
    const onClickBuscar = () => {
        dispatch(getProvinceLaw(province));
    };

    //Buscar ley provincial eliminadas
    const onClickBuscarDeleted = () => {
        dispatch(getDeletedProvinceLaw(province));
    };

    //!Modificar leyes
    //Modificar ley Nacional
    const onClickEdit = ({ title, url, number }) => {
        const law = { title, url, number }
        console.log(title)
        navigate('/admin/law/updatelaw', { state: { law } });
    }

    //Modificar ley Provincial
    const onClickEditProvinceLaw = ({ title, url, number }) => {
        const law = { title, url, number, province }
        navigate('/admin/law/updateprovintiallaw', { state: { law } });
    }

    //!Creacion de provincias
    //Crear ley
    const onClickCreate = () => {
        navigate("/admin/law/createlaw");
    };

    //Crear ley provincial
    const onClickCreateProvinceLaw = () => {
        navigate("/admin/law/createprovintiallaw");
    };

    //!Eliminar ley
    //Eliminar ley Nacional
    const onClickDelete = (number) => {
        dispatch(deleteNationalLaw(number));
        dispatch(getNationalLaw());
        dispatch(getDeletedNationalLaw());
    };

    //Eliminar ley provincial
    const onClickDeleteProvinceLaw = (number) => {
        dispatch(deleteProvinceLaw(number, province));
        dispatch(getProvinceLaw(province));
        dispatch(getDeletedProvinceLaw(province));
    };

    //!Recuperar ley
    //Recuperar ley Nacional
    const onClickUnDeleteNationalLaw = (number) => {
        console.log("delete")
        dispatch(unDeleteNationalLaw(number));
        dispatch(getNationalLaw());
        dispatch(getDeletedNationalLaw());
    }

    //!Activar leyes eliminadas
    const deletedLaws = () => {
        setActive(!active);
    };

    //!Atras
    const onClickBack = () => {
        navigate("/admin");
    };

    return (
        <div>
            <NavBar />
            <div className={style.LawContainer}>
                <div className={style.container}>
                    <p className={style.title}>Leyes</p>
                    <button className={style.button} onClick={() => onClickBack()}>Atras</button>
                    <p className={style.littletitle}>Leyes Nacionales</p>
                    <button onClick={onClickCreate} className={style.button}>Agregar una ley nacional</button>
                    <LawTable
                        laws={nationalLaw}
                        onClickDelete={onClickDelete}
                        onClickEdit={onClickEdit}
                    />

                    <p className={style.littletitle}>Leyes Provinciales</p>
                    <button className={style.button} onClick={onClickCreateProvinceLaw}>Agregar una ley provincial</button>
                    <div className={style.shearch}>
                        <button className={style.button} onClick={onClickBuscar}>Buscar</button>
                        <select className={style.select} onChange={changeHandler} name='province'>
                            <option value="default" disabled>Eliga la provincia</option>
                            {provinces?.length && provinces.map(prov => (
                                <option key={prov.name} value={prov.name}>{prov.name}</option>
                            ))}
                        </select>
                    </div>
                    <LawTable
                        laws={provinceLaw}
                        onClickDelete={onClickDeleteProvinceLaw}
                        onClickEdit={onClickEditProvinceLaw}
                    />

                    {active ? (
                        <button className={style.button} onClick={deletedLaws}>Mostrar leyes eliminadas</button>
                    ) : (
                        <>
                            <button className={style.button} onClick={deletedLaws}>Esconder leyes eliminadas</button>

                            <p className={style.title}>Leyes Eliminadas</p>
                            <p className={style.littletitle}>Leyes Nacionales</p>
                            <LawTable
                                laws={nationalLawDeleted}
                                onClickDelete={onClickUnDeleteNationalLaw}
                                tipo={"eliminado"}
                            />
                            <p className={style.littletitle}>Leyes Provinciales</p>
                            <div className={style.shearch}>
                                <button className={style.button} onClick={onClickBuscarDeleted}>Buscar</button>
                                <select className={style.select} onChange={changeHandler} name='province'>
                                    <option value="default" disabled>Eliga la provincia</option>
                                    {provinces?.length && provinces.map(prov => (
                                        <option key={prov.name} value={prov.name}>{prov.name}</option>
                                    ))}
                                </select>
                            </div>

                            <LawTable
                                laws={provinceLawDeleted}
                                onClickDelete={onClickDeleteProvinceLaw}
                                tipo={"eliminado"}
                            />
                        </>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default LawAdmin;

