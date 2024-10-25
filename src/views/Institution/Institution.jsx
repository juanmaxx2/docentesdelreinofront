import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Footer, NavBar, PedirLocalStorage } from "../../components";
import ADORALOGO from "../../assets/adoralogo.png";
import Introduccion from "../../assets/Introduccion.jpg";
import style from "./Institution.module.css";
import { getInstitution, resetInstitution } from "../../redux/actions";
import { useEffect, useState } from "react";

const Institution = () => {
    const dispatch = useDispatch();
    const institution = useSelector(state => state.institution)
    const { institutionName } = useParams();
    const navigate = useNavigate();
    const [admin, setAdmin] = useState(false);

    useEffect(() => {
        dispatch(getInstitution(institutionName))
        if (PedirLocalStorage('token')) setAdmin(true);
        return () => {
            // Al desmontar el componente, limpia el estado de institutions
            dispatch(resetInstitution());
        };
    }, [dispatch]);

    const onClickModify = () => {
        navigate(`/updateinstitution`);
    }

    return (
        <div>
            <NavBar />
            <div className={style.conteiner}>

            
            {institution?.name ? (
                <div className={style.intitutionbody}>
                    <div className={style.name}>
                        <p>{institution.name}</p>
                    </div>
                    <div className={style.introduction}>
                        <img src={ADORALOGO} alt="Logo" />
                        <div>
                            <p>{institution.introduction}</p>
                        </div>
                    </div>
                    <div className={style.informationBody}>
                        <p>Historia</p>
                        <div className={style.information}>
                            <img src={Introduccion} alt="Introduccion" />
                            <p>{institution.history}</p>
                        </div>
                    </div>
                    <div className={style.informationBody}>
                        <p>Objetivo</p>
                        <div className={style.information}>
                            <img src={Introduccion} alt="Introduccion" />
                            <p>{institution.objetive}</p>
                        </div>
                    </div>
                    <div className={style.info}>
                        <p>{institution.phone}</p>
                        <p>{institution.mail}</p>
                    </div>
                    {admin ? (
                        <div onClick={onClickModify}>
                            <button>Modificar</button>
                        </div>
                    ) : (
                        <div></div>
                    )}
                </div>
            ) : (
                <div className={style.intitutionbody}>
                    <p>loading...</p>
                </div>
            )}
            </div>
            <Footer />
        </div>
    );
};

export default Institution
