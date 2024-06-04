import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { NavBar, Footer } from '../../components';
import { getActivities, getInstitution, getProvince } from "../../redux/actions";
import style from './Home.module.css';
import { Link } from "react-router-dom";

import Introduccion from '../../assets/Introduccion.jpg';

const Home = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const institution = useSelector(state => state.institution);

    useEffect(() => {
        if (!loading) {
            dispatch(getActivities('all', 'all'));
            dispatch(getInstitution());
            dispatch(getProvince());
            setLoading(true);
        }
    }, []);

    return (
        <div className={style.body}>

            <NavBar />

            <div className={style.biografia}>
                <div>
                    <img src={Introduccion} alt="Introduccion" />
                </div>
                <div className={style.biografiaText}>
                    <p>{institution.introduction}</p>
                </div>
            </div>

            <Link Link to='/activities' className={style.link}>
                <div>
                    <p>Imagen</p>
                    <p>Actividades</p>
                </div>
                <div>
                    <p>Imagen</p>
                    <p>Charlas</p>
                </div>
                <div>
                    <p>Imagen</p>
                    <p>Conferencias</p>
                </div>
                <div>
                    <p>Imagen</p>
                    <p>Jornadas de oracion</p>
                </div>
                <div>
                    <p>Ver mas</p>
                </div>
            </Link>

            <Footer />

        </div>
    );
};

export default Home;