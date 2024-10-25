import { useDispatch, useSelector } from 'react-redux';
import { Activity, NavBar, PrayerDay, Filter, Footer, PedirLocalStorage } from '../../components';
import { getActivities } from '../../redux/actions';
import style from './Activities.module.css'
import { useEffect, useState } from 'react';

const Activities = () => {
    const dispatch = useDispatch();
    const activities = useSelector(state => state.activities)

    // activities.length?(null):(window.alert("No se encontraron actividades"))

    useEffect(() => {
        dispatch(getActivities('all', 'all', 'all'));
    }, []);

    return (
        <div className={style.bodyAct}>
            <NavBar />

            <div className={style.bodyActivities}>
                <Filter />

                <div className={style.activities}>
                    {activities?.length ? (
                        <div className={style.conteiner}>
                            {
                                activities.map((activity) => {
                                    return (
                                        <>
                                            {activity.city ? (
                                                <Activity
                                                    key={activity.id + "activitie"}
                                                    id={activity.id}
                                                    title={activity.title}
                                                    time={activity.time}
                                                    date={activity.date}
                                                    city={activity.city}
                                                    image={activity.image}
                                                />
                                            ) : (
                                                <PrayerDay
                                                    key={activity.id + "prayerDay"}
                                                    id={activity.id}
                                                    title={activity.title}
                                                    time={activity.time}
                                                    date={activity.date}
                                                    image={activity.image}
                                                />
                                            )
                                            }
                                        </>
                                    );
                                })
                            }
                        </div>
                    ) : (
                        <div className={style.conteinerloader}>
                            <div className={style.loader}></div>
                        </div>
                    )}
                </div>
            </div>

            <Footer />

        </div>
    );
};

export default Activities;