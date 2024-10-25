import style from './Featured.module.css';

const Featured = ({ activities }) => {
    return (
        <div className={style.destacados}>
            <p>Destacados</p>
            {
                activities?.length ? (
                    <div className={style.actividades}>
                        {activities.slice(0, 5).map((activity, index) => (
                            <div className={style.actividad} key={index}>
                                <div className={style.image}>
                                    <img src={activity.image} alt={`Actividad ${activity.title}`} />
                                </div>
                                <div className={style.info}>
                                    <p>{activity.title}</p>
                                    <p>{activity.city}</p>
                                    <p>{activity.date.day}/{activity.date.month}/{activity.date.year}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={style.conteinerloader}>
                        <div className={style.loader}></div>
                    </div>
                )
            }
        </div>
    );
};

export default Featured;
