import { useDispatch, useSelector } from 'react-redux';
import { Activity, NavBar, PrayerDay, Filter, Footer, PedirLocalStorage } from '../../components';
import { getActivities } from '../../redux/actions';
import style from './Activities.module.css'
import { useEffect, useState } from 'react';

const Activities = () => {
    const dispatch = useDispatch();
    const activities = PedirLocalStorage('activities');

    useEffect(() => {
        dispatch(getActivities('all', 'all'));
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
                                                    schedule={activity.schedule}
                                                    date={activity.date}
                                                    city={activity.city}
                                                />
                                            ) : (
                                                <PrayerDay
                                                    key={activity.id + "prayerDay"}
                                                    id={activity.id}
                                                    title={activity.title}
                                                    schedule={activity.title}
                                                    date={activity.date}
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