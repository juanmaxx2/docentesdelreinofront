import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PedirLocalStorage } from "../../LocalStorage/LocalStorage";
import { getAllInstitution, getInstitution } from "../../../redux/actions";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import NavBar from "../../NavBar/NavBar";
import Footer from "../../Footer/Footer";
import style from './AssociationAdmin.module.css';

const AssociationAdmin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const institutions = useSelector(state => state.institutions);

    useEffect(() => {
        dispatch(getAllInstitution(['Escritores del Reino', 'Jubilados y Apasionados', 'Docentes del Reino', 'Adora', 'Sonar y Plantar escuelas', 'Asistentes del Reino', 'Jornadas de Oracion Nacional', 'Revision Curricular', 'ASI']));
        if (!PedirLocalStorage('token')) navigate("/login");
    }, [dispatch]);

    const handlerEdit = async (name) => {
        await dispatch(getInstitution(name));
        navigate(`/updateinstitution`);
    }

    const onClickBack = () => {
        navigate("/admin");
    }

    return (
        <div>
            <NavBar />
            <div className={style.associationConteiner}>
                <p className={style.title}>Instituciones</p>
                <button className={style.buttonBack} onClick={() => onClickBack()}>Atras</button>
                {institutions?.length ? (
                    <div className={style.institutionList}>
                        {institutions.map(inst => (
                            <div className={style.institutionItem} key={inst.name}>
                                <Link to={`/institution/${inst.name}`} className={style.institutionDetails}>
                                    <p className={style.institutionName}>{inst.name}</p>
                                    <div className={style.institutionInfo}>
                                        <img
                                            src={inst.logo}
                                            alt={inst.name}
                                            className={style.institutionLogo} // Puedes aplicar estilos adicionales aquí si deseas
                                        />
                                        <p className={style.institutionIntroduction}>{inst.introduction}</p>
                                    </div>

                                </Link>

                                <button className={style.editButton} onClick={() => handlerEdit(inst.name)}>
                                    <FaEdit />
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={style.conteinerloader}>
                        <div className={style.loader}></div>
                    </div>
                )}

            </div>
            <Footer />
        </div>
    );
};

export default AssociationAdmin;