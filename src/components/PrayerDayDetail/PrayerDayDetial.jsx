import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getPrayerDay } from '../../redux/actions';
import { useParams } from 'react-router-dom';
import { NavBar, Footer } from '../';
import style from './PrayerDayDetial.module.css';
import Congreso2 from '../../assets/Congreso2.jpg';
import { Link } from "react-router-dom";

const PrayerDayDetail = () => {
    const dispatch = useDispatch();
    const activity = useSelector(state => state.activity);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        if (!loading) {
            dispatch(getPrayerDay(id));
            setLoading(false);
        }
    }, [dispatch]);

    return (
        <div>
            <NavBar />
            <div className={style.bodyActivity}>
                <div className={style.IntroductionActivity}>
                    <div className={style.IntroductionActivityImg}>
                        <img src={Congreso2} alt="Congreso" />
                    </div>
                    <div className={style.IntroductionActivityInfo}>
                        <div className={style.name}>
                            <p>{activity.title}</p>
                        </div>
                        <div className={style.description}>
                            <p>Jornada de Oracion</p>
                            <p>{activity.description}</p>
                        </div>
                    </div>
                </div>
                <div className={style.informationActivity}>
                    <div>
                        <p>Url:</p>
                        <p>{activity.url}</p>
                    </div>
                    <div>
                        <p>Fecha:</p>
                        <p>{activity.date}</p>
                        <p>{activity.schedule}</p>
                    </div>
                </div>
                <Link to={`/updateactivity/${id}/prayerday`}><div>Modificar</div></Link>
                <Link to={'/activities'}><div>atras</div></Link>
            </div>
            <Footer />
        </div>
    );
};

export default PrayerDayDetail;