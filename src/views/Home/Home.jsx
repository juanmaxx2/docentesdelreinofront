import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavBar, Footer, Featured, Province } from '../../components';
import introduccion from '../../assets/Introduccion.jpg';
import style from './Home.module.css';
import { getActivities, getProvinces } from "../../redux/actions";

const Home = () => {
    const dispatch = useDispatch();
    const activities = useSelector(state => state.activities);

    useEffect(() => {
        dispatch(getProvinces());
        dispatch(getActivities('all', 'all', 'all'));
    }, [dispatch]);

    return (
        <div className={style.homeConteiner}>
            <NavBar />

            <div className={style.body}>
                <div className={style.video}>
                </div>

                <div className={style.opcionesInst}>
                    <div><Link to='/institution/docentesdelreino' className={style.link}>Docentes del reino</Link></div>
                    <div><Link to='/nationalagency' className={style.link}>Agenda nacional</Link></div>
                    <div><Link to='/action' className={style.link}>Acciones</Link></div>
                    <div><Link to='/institution/adora' className={style.link}>Adora</Link></div>
                    <div><Link to='/law' className={style.link}>Marco Legal</Link></div>
                </div>

                <div className={style.imgInst}>
                    <img src={introduccion} alt="introduccion" />
                </div>

                <Featured activities={activities}/>

                <Province />

            </div>

            <Footer />

        </div>
    );
};

export default Home;

