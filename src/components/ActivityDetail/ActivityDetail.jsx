import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getActivity } from '../../redux/actions';
import { useParams } from 'react-router-dom';
import { NavBar, Footer } from '../';
import style from './ActivityDetail.module.css';
import { Link } from "react-router-dom";

const ActivityDetail = () => {
    const dispatch = useDispatch();
    const activity = useSelector(state => state.activity);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        if (!loading) {
            dispatch(getActivity(id));
            setLoading(false);
        }
    }, [dispatch]);

    return (
        <div>
            <NavBar />
            <div className={style.bodyActivity}>
                <div className={style.IntroductionActivity}>
                    <div className={style.IntroductionActivityImg}>
                        <img src={activity.image} alt="Congreso" />
                    </div>
                    <div className={style.IntroductionActivityInfo}>
                        <div className={style.name}>
                            <p>{activity.title}</p>
                        </div>
                        <div className={style.description}>
                            {
                                activity.tipo=='1'?(<p>Congreso</p>):(
                                    activity.tipo=='2'?(<p>Conferencia</p>):(
                                        activity.tipo=='3'?(<p>Charla</p>):(
                                            <p>Jornada de Oracion</p>
                                        )
                                    )
                                )
                            }
                            <p>{activity.description}</p>
                        </div>
                    </div>
                </div>
                <div className={style.informationActivity}>
                    <div>
                        <p>Lugar:</p>
                        <p>{activity.ProvinceName}</p>
                        <p>{activity.city}</p>
                    </div>
                    <div>
                        <p>Fecha:</p>
                        {activity.date?(<p>{activity.date.day}/{activity.date.month}/{activity.date.year}</p>):(<></>)}
                        <p>{activity.time}</p>
                    </div>
                    <div>
                        <p>Valor de Inscripcion:</p>
                        <p>${activity.value_Inscription}</p>
                    </div>
                </div>
                <Link to={'/activities'}><div>atras</div></Link>
            </div>
            <Footer />
        </div>

    );
};

export default ActivityDetail;
